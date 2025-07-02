// Utilitaires PKCE pour Auth0
import { notifyAuthChange } from '../hooks/useUser';

export function base64UrlEncode(str: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(str)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function sha256(plain: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  const hash = await window.crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(hash);
}

export async function startAuth0PKCE(mode: 'login' | 'signup', domain: string, clientId: string, callbackUrl: string) {
  const codeVerifier = base64UrlEncode(window.crypto.getRandomValues(new Uint8Array(32)));
  const codeChallenge = await sha256(codeVerifier);
  // Génère un state aléatoire pour la sécurité
  const state = base64UrlEncode(window.crypto.getRandomValues(new Uint8Array(16)));
  sessionStorage.setItem('auth0_code_verifier', codeVerifier);
  sessionStorage.setItem('auth0_state', state);
  
  // Stocker la page actuelle pour y revenir après la connexion
  const currentPath = window.location.pathname + window.location.search;
  if (currentPath !== '/auth/callback') {
    sessionStorage.setItem('auth0_redirect_after_login', currentPath);
  }
  
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: callbackUrl,
    scope: 'openid profile email offline_access',
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
    state,
    ...(mode === 'signup' ? { screen_hint: 'signup' } : {})
  });
  
  // Notifier l'application que nous démarrons une authentification
  try {
    notifyAuthChange();
  } catch (e) {
    console.warn('Impossible de notifier le changement d\'état d\'authentification', e);
  }
  
  // Rediriger vers Auth0
  window.location.href = `https://${domain}/authorize?${params.toString()}`;
}
