import { AUTH0_CONFIG, API_ENDPOINTS } from '../config/auth';

class ApiService {
  private baseUrl: string;
  private authBaseUrl: string;

  constructor() {
    this.baseUrl = AUTH0_CONFIG.apiBaseUrl;
    this.authBaseUrl = AUTH0_CONFIG.authBaseUrl;
  }

  private async getHeaders() {
    return {
      'Content-Type': 'application/json',
    };
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

      if (response.status === 401) {
        const event = new CustomEvent('auth:failed');
        window.dispatchEvent(event);
      }

      throw new Error(errorData.message || errorData.error || 'Une erreur est survenue');
    }
    return response.json();
  }

  async getUserProfile() {
    const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.auth.me}`, {
      headers: await this.getHeaders(),
      credentials: 'include',
    });
    return this.handleResponse(response);
  }

  async updateUserProfile(data: any) {
    const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.users.profile}`, {
      method: 'PUT',
      headers: await this.getHeaders(),
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async getUserSettings() {
    const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.users.settings}`, {
      headers: await this.getHeaders(),
      credentials: 'include',
    });
    return this.handleResponse(response);
  }

  async getAppData(appName: string) {
    const endpoint = API_ENDPOINTS.apps?.[appName];
    if (!endpoint) {
      throw new Error('Application non trouvée');
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: await this.getHeaders(),
      credentials: 'include',
    });
    return this.handleResponse(response);
  }

  async exchangeAuthCode(code: string, codeVerifier: string, state?: string) {
    console.log("Échange du code d'autorisation contre des cookies");

    const isSignup = sessionStorage.getItem('auth_is_signup') === 'true';
    const exchangeId = Date.now().toString() + Math.random().toString(36).substring(2, 15);

    try {
      // Utiliser authBaseUrl pour l'échange de code
      const response = await fetch(`${this.authBaseUrl}${API_ENDPOINTS.auth.exchange}`, {
        method: 'POST',
        headers: await this.getHeaders(),
        credentials: 'include',
        body: JSON.stringify({
          code,
          code_verifier: codeVerifier,
          state,
          exchange_id: exchangeId,
          is_signup: isSignup
        }),
      });

      if (!response.ok) {
        throw new Error('Échec de l\'échange du code');
      }

      // Le backend définit maintenant les cookies httpOnly pour le token ET les infos utilisateur
      return this.handleResponse(response);
    } catch (error) {
      console.error("Erreur lors de l'échange du code:", error);
      throw error;
    } finally {
      sessionStorage.removeItem('auth_is_signup');
    }
  }

  async login(loginData: { email: string; password: string }) {
    // Utiliser authBaseUrl pour la connexion
    const response = await fetch(`${this.authBaseUrl}${API_ENDPOINTS.auth.login}`, {
      method: 'POST',
      headers: await this.getHeaders(),
      credentials: 'include', // Important pour recevoir et envoyer les cookies
      body: JSON.stringify(loginData),
    });

    // Le backend définit les cookies httpOnly pour le token ET les infos utilisateur
    return this.handleResponse(response);
  }

  async signup(signupData: {
    email: string;
    password: string;
    companyName: string;
    firstName: string;
    lastName: string;
  }) {
    // Utiliser authBaseUrl pour l'inscription
    const response = await fetch(`${this.authBaseUrl}${API_ENDPOINTS.auth.signup}`, {
      method: 'POST',
      headers: await this.getHeaders(),
      credentials: 'include', // Important pour recevoir et envoyer les cookies
      body: JSON.stringify(signupData),
    });

    // Le backend définit les cookies httpOnly pour le token ET les infos utilisateur
    return this.handleResponse(response);
  }

  async logout() {
    const response = await fetch(`${this.authBaseUrl}${API_ENDPOINTS.auth.logout}`, {
      method: 'POST',
      headers: await this.getHeaders(),
      credentials: 'include',
    });
    return this.handleResponse(response);
  }

  async inviteUser(inviteData: {
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    permissions: string[];
  }) {
    const response = await fetch(`${this.baseUrl}/users/invite`, {
      method: 'POST',
      headers: await this.getHeaders(),
      credentials: 'include',
      body: JSON.stringify(inviteData),
    });
    return this.handleResponse(response);
  }

  async createCompany(companyData: {
    name: string;
    address?: string;
    phone?: string;
    industry?: string;
  }) {
    const response = await fetch(`${this.baseUrl}/companies`, {
      method: 'POST',
      headers: await this.getHeaders(),
      credentials: 'include',
      body: JSON.stringify(companyData),
    });
    return this.handleResponse(response);
  }

  async getAllCompanies() {
    const response = await fetch(`${this.baseUrl}/companies`, {
      headers: await this.getHeaders(),
      credentials: 'include',
    });
    return this.handleResponse(response);
  }

  async getCompanyById(companyId: string) {
    const response = await fetch(`${this.baseUrl}/companies/${companyId}`, {
      headers: await this.getHeaders(),
      credentials: 'include',
    });
    return this.handleResponse(response);
  }

  async updateCompany(companyId: string, companyData: any) {
    const response = await fetch(`${this.baseUrl}/companies/${companyId}`, {
      method: 'PUT',
      headers: await this.getHeaders(),
      credentials: 'include',
      body: JSON.stringify(companyData),
    });
    return this.handleResponse(response);
  }

  async deleteCompany(companyId: string) {
    const response = await fetch(`${this.baseUrl}/companies/${companyId}`, {
      method: 'DELETE',
      headers: await this.getHeaders(),
      credentials: 'include',
    });
    return this.handleResponse(response);
  }
}

export const apiService = new ApiService();
