import { AUTH0_CONFIG, API_ENDPOINTS } from '../config/auth';

class ApiService {
  private baseUrl: string;
  private audience: string;
  // Add a flag to track refresh attempts
  private isRefreshing: boolean = false;
  // Add a counter to limit refresh attempts
  private refreshAttempts: number = 0;
  private maxRefreshAttempts: number = 3;

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
      if (response.status === 401 && this.refreshAttempts < this.maxRefreshAttempts) {
        this.refreshAttempts++;
        // Émettre un événement pour indiquer que le token est expiré
        const event = new CustomEvent('token:expired');
        window.dispatchEvent(event);
      } else if (response.status === 401) {
        // Si nous avons atteint le nombre maximum de tentatives, émettre un événement d'échec d'authentification
        console.error(`Nombre maximum de tentatives de rafraîchissement atteint (${this.maxRefreshAttempts})`);
        const event = new CustomEvent('auth:failed');
        window.dispatchEvent(event);
        // Réinitialiser le compteur après un certain temps
        setTimeout(() => {
          this.refreshAttempts = 0;
        }, 60000); // 1 minute
      }

      throw new Error(errorData.message || errorData.error || 'Une erreur est survenue');
    }
    // Réinitialiser le compteur en cas de succès
    this.refreshAttempts = 0;
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
    // Éviter les rafraîchissements simultanés
    if (this.isRefreshing) {
      console.log('Rafraîchissement déjà en cours, attente...');
      // Attendre un peu et retourner le token actuel
      await new Promise(resolve => setTimeout(resolve, 1000));
      return localStorage.getItem('access_token');
    }

    this.isRefreshing = true;

    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      // Pas de refresh token, on ne peut pas rafraîchir
      localStorage.removeItem('access_token');
      this.isRefreshing = false;
      return null;
    }

    try {
      const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.auth.refresh}`, {
        method: 'POST',
        headers: await this.getHeaders(),
        body: JSON.stringify({ refresh_token: refreshToken }),
        credentials: 'include',
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

      this.isRefreshing = false;
      return data.access_token;
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du token:', error);
      // En cas d'échec, supprimer les tokens et forcer la reconnexion
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');

      // Émettre un événement pour indiquer que l'authentification a échoué
      const event = new CustomEvent('auth:failed');
      window.dispatchEvent(event);

      this.isRefreshing = false;
      return null;
    }
  }

  /**
   * Récupère le profil de l'utilisateur avec un token valide
   */
  async getUserProfile(token?: string) {
    const validToken = token || (await this.getValidToken());
    if (!validToken) {
      throw new Error("Token d'authentification manquant ou invalide");
    }

    const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.auth.me}`, {
      headers: await this.getHeaders(validToken),
      credentials: 'include',
    });
    const data = await this.handleResponse(response);
    console.log('Profil utilisateur récupéré avec succès:', data);
    return data;
  }

  /**
   * Met à jour le profil utilisateur
   */
  async updateUserProfile(data: any, token?: string) {
    const validToken = token || (await this.getValidToken());
    if (!validToken) {
      throw new Error("Token d'authentification manquant ou invalide");
    }

    const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.users.profile}`, {
      method: 'PUT',
      headers: await this.getHeaders(validToken),
      body: JSON.stringify(data),
      credentials: 'include',
    });
    const responseData = await this.handleResponse(response);
    console.log('Profil utilisateur mis à jour avec succès:', responseData);
    return responseData;
  }

  /**
   * Récupère les paramètres utilisateur
   */
  async getUserSettings(token?: string) {
    const validToken = token || (await this.getValidToken());
    if (!validToken) {
      throw new Error("Token d'authentification manquant ou invalide");
    }

    const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.users.settings}`, {
      headers: await this.getHeaders(validToken),
      credentials: 'include',
    });
    const data = await this.handleResponse(response);
    console.log('Paramètres utilisateur récupérés avec succès:', data);
    return data;
  }

  /**
   * Récupère des données d'application en fonction de l'appName
   */
  async getAppData(appName: string, token?: string) {
    const endpoint = API_ENDPOINTS.apps[appName as keyof typeof API_ENDPOINTS.apps];
    if (!endpoint) {
      console.error('Application non trouvée:', appName);
      throw new Error('Application non trouvée');
    }

    const validToken = token || (await this.getValidToken());
    if (!validToken) {
      throw new Error("Token d'authentification manquant ou invalide");
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: await this.getHeaders(validToken),
      credentials: 'include',
    });
    const data = await this.handleResponse(response);
    console.log(`Données pour l'application ${appName} récupérées avec succès:`, data);
    return data;
  }

  /**
   * Échange le code d'autorisation contre des tokens
   * (Maintenant, on appelle le vrai endpoint backend /auth/exchange)
   */
  async exchangeAuthCode(code: string, codeVerifier: string, state?: string) {
    console.log("Échange du code d'autorisation contre des tokens");

    // Vérifier si c'est un signup ou un login
    const isSignup = sessionStorage.getItem('auth_is_signup') === 'true';
    console.log(`Mode d'authentification: ${isSignup ? 'Inscription' : 'Connexion'}`);

    try {
      // Créer un identifiant unique pour cette requête d'échange
      const exchangeId = Date.now().toString() + Math.random().toString(36).substring(2, 15);
      console.log(`ID d'échange: ${exchangeId}`);

      // Vérifier si le code a déjà été échangé
      const exchangedCodes = JSON.parse(sessionStorage.getItem('exchanged_codes') || '[]');
      if (exchangedCodes.includes(code)) {
        console.error('❌ Ce code a déjà été échangé');
        throw new Error("Code d'autorisation déjà utilisé");
      }

      // Ajouter le code à la liste des codes échangés
      exchangedCodes.push(code);
      sessionStorage.setItem('exchanged_codes', JSON.stringify(exchangedCodes));

      // ✨ APPEL RÉEL À TON BACKEND (NestJS) ✨
      //   - Ton backend doit lui-même appeler Auth0 pour récupérer de vrais tokens
      const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.auth.exchange}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          code,
          code_verifier: codeVerifier,
          state,
        }),
      });

      if (!response.ok) {
        console.error('❌ Échec de la requête /auth/exchange');
        let errorInfo;
        try {
          errorInfo = await response.json();
        } catch {
          //
        }
        throw new Error(errorInfo?.message || 'Une erreur est survenue lors de l\'échange du code');
      }

      const tokens = await response.json();
      console.log('Échange de code réussi, tokens reçus:', tokens);

      return tokens;
    } catch (error) {
      console.error("Erreur lors de l'échange du code:", error);
      throw error;
    } finally {
      // Nettoyer le flag is_signup
      sessionStorage.removeItem('auth_is_signup');

      // Nettoyer les codes échangés après un certain temps
      setTimeout(() => {
        try {
          const exchangedCodes = JSON.parse(sessionStorage.getItem('exchanged_codes') || '[]');
          if (exchangedCodes.length > 10) {
            // Ne garder que les 5 derniers codes
            sessionStorage.setItem('exchanged_codes', JSON.stringify(exchangedCodes.slice(-5)));
          }
        } catch (e) {
          // En cas d'erreur, simplement vider la liste
          sessionStorage.removeItem('exchanged_codes');
        }
      }, 60000); // Nettoyer après 1 minute
    }
  }

  /**
   * Crée un nouveau compte superadmin et une entreprise
   * (Partie de démo, reste inchangé)
   */
  async signup(signupData: {
    email: string;
    password: string;
    companyName: string;
    firstName: string;
    lastName: string;
  }) {
    console.log("Création d'un nouveau compte et entreprise");

    // Simuler une réponse réussie pour le développement
    // Dans un environnement de production, cette partie serait remplacée par un vrai appel API
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      success: true,
      user: {
        id: '123456',
        email: signupData.email,
        name: `${signupData.firstName} ${signupData.lastName}`,
        companyId: '789012',
        userType: 'sme',
        role: 'admin',
        permissions: ['read:all', 'write:all', 'admin:all'],
      },
      company: {
        id: '789012',
        name: signupData.companyName,
      },
    };
  }

  /**
   * Authentifie un utilisateur avec email/mot de passe (démonstration)
   */
  async login(loginData: { email: string; password: string }) {
    console.log('Authentification utilisateur');

    // Simuler une réponse réussie pour le développement
    // Dans un environnement de production, cette partie serait remplacée par un vrai appel API
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      success: true,
      tokens: {
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' +
          ' (ici c’est toujours un faux token de démo)',
        id_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' + ' (faux token de démo)',
        refresh_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' + ' (faux refresh token de démo)',
      },
      user: {
        id: '123456',
        email: loginData.email,
        name: 'John Doe',
        companyId: '789012',
        userType: 'sme',
        role: 'admin',
        permissions: ['read:all', 'write:all', 'admin:all'],
      },
    };
  }

  /**
   * Invite un nouvel utilisateur
   */
  async inviteUser(
    inviteData: {
      email: string;
      firstName: string;
      lastName: string;
      role: string;
      permissions: string[];
    },
    token?: string,
  ) {
    console.log("[ApiService] Invitation d'un nouvel utilisateur");

    // Simuler une réponse réussie pour le développement
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      success: true,
      invitation: {
        id: '123456',
        email: inviteData.email,
        role: inviteData.role,
        status: 'pending',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
    };
  }

  /**
   * Crée une nouvelle entreprise
   */
  async createCompany(
    companyData: {
      name: string;
      address?: string;
      phone?: string;
      industry?: string;
    },
    token?: string,
  ) {
    console.log("Création d'une nouvelle entreprise");

    // Simuler une réponse réussie
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      success: true,
      company: {
        id: '123456',
        name: companyData.name,
        address: companyData.address,
        phone: companyData.phone,
        industry: companyData.industry,
        createdAt: new Date().toISOString(),
      },
    };
  }

  /**
   * Récupère toutes les entreprises (admin système uniquement)
   */
  async getAllCompanies(token?: string) {
    console.log('Récupération de toutes les entreprises');

    // Simuler une réponse réussie
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      success: true,
      companies: [
        {
          id: '123456',
          name: 'Entreprise A',
          industry: 'Technology',
          createdAt: new Date().toISOString(),
        },
        {
          id: '789012',
          name: 'Entreprise B',
          industry: 'Finance',
          createdAt: new Date().toISOString(),
        },
      ],
    };
  }

  /**
   * Récupère une entreprise par son ID
   */
  async getCompanyById(companyId: string, token?: string) {
    console.log(`Récupération de l'entreprise ${companyId}`);

    // Simuler une réponse réussie
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      success: true,
      company: {
        id: companyId,
        name: 'Example Corp',
        industry: 'Technology',
        address: '123 Main St',
        phone: '+1234567890',
        createdAt: new Date().toISOString(),
      },
    };
  }

  /**
   * Met à jour une entreprise
   */
  async updateCompany(companyId: string, companyData: any, token?: string) {
    console.log(`Mise à jour de l'entreprise ${companyId}`);

    // Simuler une réponse réussie
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      success: true,
      company: {
        id: companyId,
        ...companyData,
        updatedAt: new Date().toISOString(),
      },
    };
  }

  /**
   * Supprime une entreprise
   */
  async deleteCompany(companyId: string, token?: string) {
    console.log(`Suppression de l'entreprise ${companyId}`);

    // Simuler une réponse réussie
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      success: true,
      message: `L'entreprise ${companyId} a été supprimée avec succès`,
    };
  }
}

export const apiService = new ApiService();
