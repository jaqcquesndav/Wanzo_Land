import { AUTH0_CONFIG } from '../config/auth';

// Fonction pour générer un code verifier aléatoire
function generateCodeVerifier(): string {
  console.log('Génération du code verifier...');
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  const verifier = base64URLEncode(array);
  console.log('Code verifier généré:', verifier.substring(0, 10) + '...');
  return verifier;
}

// Fonction pour encoder en base64URL
function base64URLEncode(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// Fonction pour calculer le code challenge
async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  console.log('Calcul du code challenge...');
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const hash = await crypto.subtle.digest('SHA-256', data);
  const challenge = base64URLEncode(hash);
  console.log('Code challenge généré:', challenge.substring(0, 10) + '...');
  return challenge;
}

interface AuthOptions {
  userType: string;
  appId: string;
  provider?: string;
  email?: string;
  password?: string;
  returnTo?: string;
}

export async function initiateAuth({ userType, appId, provider, email, password, returnTo }: AuthOptions) {
  console.log('Démarrage de l\'authentification...', { userType, appId, provider });
  
  try {
    // Générer et stocker le code verifier
    const codeVerifier = generateCodeVerifier();
    const state = crypto.randomUUID();
    
    console.log('Stockage des valeurs dans sessionStorage...');
    sessionStorage.setItem('code_verifier', codeVerifier);
    sessionStorage.setItem('auth_state', state);
    
    // Stocker l'URL de retour si fournie
    if (returnTo) {
      sessionStorage.setItem('auth_return_to', returnTo);
    }
    
    // Stocker le type d'utilisateur et l'ID de l'application pour la redirection après authentification
    sessionStorage.setItem('auth_user_type', userType);
    sessionStorage.setItem('auth_app_id', appId);
    
    console.log('Valeurs stockées avec succès');

    // Calculer le code challenge
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    // Construire l'URL d'autorisation
    const params = new URLSearchParams({
      client_id: AUTH0_CONFIG.clientId,
      redirect_uri: AUTH0_CONFIG.redirectUri,
      response_type: 'code',
      scope: AUTH0_CONFIG.scope,
      audience: AUTH0_CONFIG.audience,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      state: state
    });

    // Ajouter le provider si spécifié
    if (provider) {
      params.append('connection', provider);
    }

    // Ajouter les identifiants si fournis (pour le mode username-password-authentication)
    if (email && password) {
      params.append('username', email);
      params.append('password', password);
    }

    const authUrl = `https://${AUTH0_CONFIG.domain}/authorize?${params.toString()}`;
    console.log('URL d\'autorisation générée:', authUrl);
    
    console.log('Redirection vers Auth0...');
    window.location.href = authUrl;
  } catch (error) {
    console.error('❌ Erreur lors de l\'initiation de l\'authentification:', error);
    throw error;
  }
}

/**
 * Vérifie si un token JWT est valide et non expiré
 */
export function isTokenValid(token: string): boolean {
  if (!token) return false;
  
  try {
    // Vérifier la structure du token
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    // Décoder le payload
    const payload = JSON.parse(atob(parts[1]));
    
    // Vérifier l'expiration
    const expiryTime = payload.exp * 1000; // Convertir en millisecondes
    if (Date.now() >= expiryTime) return false;
    
    return true;
  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error);
    return false;
  }
}

/**
 * Extrait les informations du token JWT
 */
export function decodeToken(token: string): any {
  if (!token) return null;
  
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    return JSON.parse(atob(parts[1]));
  } catch (error) {
    console.error('Erreur lors du décodage du token:', error);
    return null;
  }
}

/**
 * Vérifie si un token expire bientôt (dans les 5 minutes)
 */
export function isTokenExpiringSoon(token: string): boolean {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiryTime = payload.exp * 1000; // Convertir en millisecondes
    return Date.now() >= expiryTime - 300000; // 5 minutes avant expiration
  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error);
    return true;
  }
}