import { AUTH0_CONFIG } from '../config/auth';

/**
 * Génère un code verifier aléatoire pour PKCE
 */
function generateCodeVerifier(): string {
  console.log('Génération du code verifier...');
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  const verifier = base64URLEncode(array);
  console.log('Code verifier généré:', verifier.substring(0, 10) + '...');
  return verifier;
}

/**
 * Encodage base64 URL-safe (remplace + / et supprime =)
 */
function base64URLEncode(buffer: ArrayBuffer | Uint8Array): string {
  // S'assurer qu'on traite un Uint8Array
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let encoded = btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  return encoded;
}

/**
 * Calcule le code challenge en SHA-256 du code verifier
 */
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
  // ⚠️ Retiré email & password d'ici pour éviter qu'ils transitent dans l’URL
  returnTo?: string;
  isSignup?: boolean; // permet de différencier signup et login
}

/**
 * Lance la redirection vers Auth0 en mode PKCE
 * - Stocke le code verifier et le state en sessionStorage
 * - Construit l’URL d’auth en incluant le code_challenge
 * - Redirige l’utilisateur
 */
export async function initiateAuth({
  userType,
  appId,
  provider,
  returnTo,
  isSignup = false,
}: AuthOptions) {
  console.log(`Démarrage de l'${isSignup ? 'inscription' : 'authentification'}...`, {
    userType,
    appId,
    provider,
  });

  try {
    // Nettoyer les valeurs précédentes
    sessionStorage.removeItem('code_verifier');
    sessionStorage.removeItem('auth_state');

    // 1. Générer et stocker le code verifier + state
    const codeVerifier = generateCodeVerifier();
    const state = crypto.randomUUID();

    console.log('Stockage des valeurs dans sessionStorage...');
    sessionStorage.setItem('code_verifier', codeVerifier);
    sessionStorage.setItem('auth_state', state);

    // 2. Stocker le retour si fourni
    if (returnTo) {
      sessionStorage.setItem('auth_return_to', returnTo);
    }

    // 3. Stocker le type d’utilisateur et l’ID de l’application
    sessionStorage.setItem('auth_user_type', userType);
    sessionStorage.setItem('auth_app_id', appId);

    // 4. Savoir si c’est un signup ou un login
    sessionStorage.setItem('auth_is_signup', isSignup ? 'true' : 'false');

    console.log('Valeurs stockées avec succès');

    // 5. Calculer le code challenge
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    // 6. Construire l’URL d’autorisation
    //    ⚠️ On inclut `offline_access` dans le scope pour récupérer un refresh_token
    const params = new URLSearchParams({
      client_id: AUTH0_CONFIG.clientId,
      redirect_uri: AUTH0_CONFIG.redirectUri,
      response_type: 'code',
      // Ajouter offline_access au scope si tu veux un refresh token
      scope: `${AUTH0_CONFIG.scope} offline_access`,
      audience: AUTH0_CONFIG.audience,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      state: state,
    });

    // Si on veut forcer un provider (ex: connection=github)
    if (provider) {
      params.append('connection', provider);
    }

    // 7. Mode signup ?
    if (isSignup) {
      params.append('screen_hint', 'signup');
    }

    // 8. Construire l’URL final et rediriger
    const domain = AUTH0_CONFIG.domain; // ex: "my-tenant.eu.auth0.com"
    const authUrl = `https://${domain}/authorize?${params.toString()}`;
    console.log("URL d'autorisation générée:", authUrl);

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
    const parts = token.split('.');
    if (parts.length !== 3) return false;

    const payload = JSON.parse(atob(parts[1]));

    // Vérifier l'expiration
    if (!payload.exp) return false; // pas d'exp => non valide
    const expiryTime = payload.exp * 1000; // Convertir en millisecondes
    if (Date.now() >= expiryTime) return false;

    return true;
  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error);
    return false;
  }
}

/**
 * Extrait le payload du token JWT
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
 * Vérifie si un token expire dans moins de 5 minutes
 */
export function isTokenExpiringSoon(token: string): boolean {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiryTime = payload.exp * 1000;
    return Date.now() >= expiryTime - 300000; // 5 minutes
  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error);
    return true;
  }
}
