import { AUTH0_CONFIG, API_ENDPOINTS } from '../config/auth';

class ApiService {
  private baseUrl: string;
  private audience: string;

  constructor() {
    this.baseUrl = AUTH0_CONFIG.apiBaseUrl;
    this.audience = AUTH0_CONFIG.audience;
  }

  private async getHeaders(token?: string) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { message: `Erreur HTTP ${response.status}` };
      }
      console.error('Erreur dans la réponse API:', errorData);
      
      // Si le token est expiré (401), déclencher un événement pour rafraîchir le token
      if (response.status === 401) {
        // Émettre un événement pour indiquer que le token est expiré
        const event = new CustomEvent('token:expired');
        window.dispatchEvent(event);
      }
      
      throw new Error(errorData.message || errorData.error || 'Une erreur est survenue');
    }
    return response.json();
  }

  /**
   * Récupère un token valide, en le rafraîchissant si nécessaire
   */
  private async getValidToken(): Promise<string | null> {
    const token = localStorage.getItem('access_token');
    if (!token) return null;
    
    // Vérifier si le token est expiré
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiryTime = payload.exp * 1000; // Convertir en millisecondes
      
      // Si le token expire dans moins de 5 minutes, le rafraîchir
      if (Date.now() > expiryTime - 300000) {
        return await this.refreshToken();
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du token:', error);
      // En cas d'erreur de parsing, on considère le token comme invalide
      return await this.refreshToken();
    }
    
    return token;
  }

  /**
   * Rafraîchit le token d'accès en utilisant le refresh token
   */
  private async refreshToken(): Promise<string | null> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      // Pas de refresh token, on ne peut pas rafraîchir
      localStorage.removeItem('access_token');
      return null;
    }
    
    try {
      const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.auth.refresh}`, {
        method: 'POST',
        headers: await this.getHeaders(),
        body: JSON.stringify({ refresh_token: refreshToken }),
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Échec du rafraîchissement du token');
      }
      
      const data = await response.json();
      
      // Mettre à jour les tokens dans le localStorage
      localStorage.setItem('access_token', data.access_token);
      if (data.refresh_token) {
        localStorage.setItem('refresh_token', data.refresh_token);
      }
      
      return data.access_token;
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du token:', error);
      // En cas d'échec, supprimer les tokens et forcer la reconnexion
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      
      // Émettre un événement pour indiquer que l'authentification a échoué
      const event = new CustomEvent('auth:failed');
      window.dispatchEvent(event);
      
      return null;
    }
  }

  async getUserProfile(token?: string) {
    const validToken = token || await this.getValidToken();
    if (!validToken) {
      throw new Error('Token d\'authentification manquant ou invalide');
    }
    
    const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.auth.me}`, {
      headers: await this.getHeaders(validToken),
      credentials: 'include'
    });
    const data = await this.handleResponse(response);
    console.log('Profil utilisateur récupéré avec succès:', data);
    return data;
  }

  async updateUserProfile(data: any, token?: string) {
    const validToken = token || await this.getValidToken();
    if (!validToken) {
      throw new Error('Token d\'authentification manquant ou invalide');
    }
    
    const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.users.profile}`, {
      method: 'PUT',
      headers: await this.getHeaders(validToken),
      body: JSON.stringify(data),
      credentials: 'include'
    });
    const responseData = await this.handleResponse(response);
    console.log('Profil utilisateur mis à jour avec succès:', responseData);
    return responseData;
  }

  async getUserSettings(token?: string) {
    const validToken = token || await this.getValidToken();
    if (!validToken) {
      throw new Error('Token d\'authentification manquant ou invalide');
    }
    
    const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.users.settings}`, {
      headers: await this.getHeaders(validToken),
      credentials: 'include'
    });
    const data = await this.handleResponse(response);
    console.log('Paramètres utilisateur récupérés avec succès:', data);
    return data;
  }

  async getAppData(appName: string, token?: string) {
    const endpoint = API_ENDPOINTS.apps[appName as keyof typeof API_ENDPOINTS.apps];
    if (!endpoint) {
      console.error('Application non trouvée:', appName);
      throw new Error('Application non trouvée');
    }
    
    const validToken = token || await this.getValidToken();
    if (!validToken) {
      throw new Error('Token d\'authentification manquant ou invalide');
    }
    
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: await this.getHeaders(validToken),
      credentials: 'include'
    });
    const data = await this.handleResponse(response);
    console.log(`Données pour l'application ${appName} récupérées avec succès:`, data);
    return data;
  }

  /**
   * Échange le code d'autorisation contre des tokens
   */
  async exchangeAuthCode(code: string, codeVerifier: string, state?: string) {
    console.log('Échange du code d\'autorisation contre des tokens');
    const url = `${this.baseUrl}${API_ENDPOINTS.auth.exchange}`;
    
    // Vérifier si c'est un signup ou un login
    const isSignup = sessionStorage.getItem('auth_is_signup') === 'true';
    console.log(`Mode d'authentification: ${isSignup ? 'Inscription' : 'Connexion'}`);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: await this.getHeaders(),
        body: JSON.stringify({
          code,
          code_verifier: codeVerifier,
          state,
          is_signup: isSignup
        }),
        credentials: 'include'
      });
      
      const data = await this.handleResponse(response);
      console.log('Échange de code réussi');
      return data.tokens || data;
    } catch (error) {
      console.error('Erreur lors de l\'échange du code:', error);
      throw error;
    } finally {
      // Nettoyer le flag is_signup
      sessionStorage.removeItem('auth_is_signup');
    }
  }

  /**
   * Crée un nouveau compte superadmin et une entreprise
   */
  async signup(signupData: {
    email: string;
    password: string;
    companyName: string;
    firstName: string;
    lastName: string;
  }) {
    console.log('Création d\'un nouveau compte et entreprise');
    const url = `${this.baseUrl}${API_ENDPOINTS.auth.signup}`;
    
    // Adapter le format des données pour correspondre à ce qu'attend le backend
    const requestData = {
      adminName: `${signupData.firstName} ${signupData.lastName}`,
      adminEmail: signupData.email,
      adminPassword: signupData.password,
      companyName: signupData.companyName,
      companyDetails: {
        // Vous pouvez ajouter des détails supplémentaires ici si nécessaire
        industry: '',
        size: '',
        country: '',
        city: ''
      }
    };

    console.log('Données envoyées (requestData):', JSON.stringify(requestData));
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: await this.getHeaders(),
        body: JSON.stringify(requestData),
        credentials: 'include'
      });
      
      const data = await this.handleResponse(response);
      console.log('Compte créé avec succès');
      return data;
    } catch (error) {
      console.error('Erreur lors de la création du compte:', error);
      throw error;
    }
  }

  /**
   * Authentifie un utilisateur avec email/mot de passe
   */
  async login(loginData: { email: string; password: string }) {
    console.log('Authentification utilisateur');
    const url = `${this.baseUrl}${API_ENDPOINTS.auth.login}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: await this.getHeaders(),
        body: JSON.stringify(loginData),
        credentials: 'include'
      });
      
      const data = await this.handleResponse(response);
      console.log('Authentification réussie');
      return data;
    } catch (error) {
      console.error('Erreur lors de l\'authentification:', error);
      throw error;
    }
  }

  /**
   * Invite un nouvel utilisateur dans l'entreprise
   */
  async inviteUser(inviteData: {
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    permissions: string[];
  }, token?: string) {
    console.log('[ApiService] Invitation d\'un nouvel utilisateur');
    const url = `${this.baseUrl}${API_ENDPOINTS.auth.inviteUser}`;
    
    const validToken = token || await this.getValidToken();
    if (!validToken) {
      throw new Error('Token d\'authentification manquant ou invalide');
    }
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: await this.getHeaders(validToken),
        body: JSON.stringify(inviteData),
        credentials: 'include'
      });
      
      const data = await this.handleResponse(response);
      console.log('[ApiService] Invitation envoyée avec succès');
      return data;
    } catch (error) {
      console.error('[ApiService] Erreur lors de l\'invitation de l\'utilisateur:', error);
      throw error;
    }
  }

  /**
   * Crée une nouvelle entreprise
   */
  async createCompany(companyData: {
    name: string;
    address?: string;
    phone?: string;
    industry?: string;
  }, token?: string) {
    console.log('Création d\'une nouvelle entreprise');
    const url = `${this.baseUrl}${API_ENDPOINTS.companies.create}`;
    
    const validToken = token || await this.getValidToken();
    if (!validToken) {
      throw new Error('Token d\'authentification manquant ou invalide');
    }
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: await this.getHeaders(validToken),
        body: JSON.stringify(companyData),
        credentials: 'include'
      });
      
      const data = await this.handleResponse(response);
      console.log('Entreprise créée avec succès');
      return data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'entreprise:', error);
      throw error;
    }
  }

  /**
   * Récupère toutes les entreprises (admin système uniquement)
   */
  async getAllCompanies(token?: string) {
    console.log('Récupération de toutes les entreprises');
    const url = `${this.baseUrl}${API_ENDPOINTS.companies.getAll}`;
    
    const validToken = token || await this.getValidToken();
    if (!validToken) {
      throw new Error('Token d\'authentification manquant ou invalide');
    }
    
    try {
      const response = await fetch(url, {
        headers: await this.getHeaders(validToken),
        credentials: 'include'
      });
      
      const data = await this.handleResponse(response);
      console.log('Entreprises récupérées avec succès');
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des entreprises:', error);
      throw error;
    }
  }

  /**
   * Récupère une entreprise par son ID
   */
  async getCompanyById(companyId: string, token?: string) {
    console.log(`Récupération de l'entreprise ${companyId}`);
    const url = `${this.baseUrl}${API_ENDPOINTS.companies.getById(companyId)}`;
    
    const validToken = token || await this.getValidToken();
    if (!validToken) {
      throw new Error('Token d\'authentification manquant ou invalide');
    }
    
    try {
      const response = await fetch(url, {
        headers: await this.getHeaders(validToken),
        credentials: 'include'
      });
      
      const data = await this.handleResponse(response);
      console.log('Entreprise récupérée avec succès');
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'entreprise:', error);
      throw error;
    }
  }

  /**
   * Met à jour une entreprise
   */
  async updateCompany(companyId: string, companyData: any, token?: string) {
    console.log(`Mise à jour de l'entreprise ${companyId}`);
    const url = `${this.baseUrl}${API_ENDPOINTS.companies.update(companyId)}`;
    
    const validToken = token || await this.getValidToken();
    if (!validToken) {
      throw new Error('Token d\'authentification manquant ou invalide');
    }
    
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: await this.getHeaders(validToken),
        body: JSON.stringify(companyData),
        credentials: 'include'
      });
      
      const data = await this.handleResponse(response);
      console.log('Entreprise mise à jour avec succès');
      return data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'entreprise:', error);
      throw error;
    }
  }

  /**
   * Supprime une entreprise
   */
  async deleteCompany(companyId: string, token?: string) {
    console.log(`Suppression de l'entreprise ${companyId}`);
    const url = `${this.baseUrl}${API_ENDPOINTS.companies.delete(companyId)}`;
    
    const validToken = token || await this.getValidToken();
    if (!validToken) {
      throw new Error('Token d\'authentification manquant ou invalide');
    }
    
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: await this.getHeaders(validToken),
        credentials: 'include'
      });
      
      const data = await this.handleResponse(response);
      console.log('Entreprise supprimée avec succès');
      return data;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'entreprise:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();