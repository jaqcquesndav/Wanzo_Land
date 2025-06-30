import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CALLBACK_URL } from '../../config/auth0';

export function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Récupère le code et le state dans l'URL
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const returnedState = params.get('state');
    const storedState = sessionStorage.getItem('auth0_state');
    const codeVerifier = sessionStorage.getItem('auth0_code_verifier');

    console.log('[Auth0 Callback] code:', code);
    console.log('[Auth0 Callback] state (reçu):', returnedState);
    console.log('[Auth0 Callback] state (stocké):', storedState);
    console.log('[Auth0 Callback] code_verifier:', codeVerifier);

    if (!code || !returnedState || !codeVerifier || returnedState !== storedState) {
      console.error('[Auth0 Callback] Paramètres manquants ou state invalide.');
      navigate('/', { replace: true });
      return;
    }

    // Échange le code contre les tokens
    fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: AUTH0_CLIENT_ID,
        code_verifier: codeVerifier,
        code,
        redirect_uri: AUTH0_CALLBACK_URL,
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log('[Auth0 Callback] Réponse /oauth/token:', data);
        const { access_token, id_token, refresh_token, expires_in, token_type } = data;
        if (access_token) localStorage.setItem('auth0_token', access_token);
        if (id_token) localStorage.setItem('auth0_id_token', id_token);
        if (refresh_token) localStorage.setItem('auth0_refresh_token', refresh_token);
        if (expires_in) localStorage.setItem('auth0_expires_in', expires_in.toString());
        if (token_type) localStorage.setItem('auth0_token_type', token_type);
        // Extraction du profil utilisateur depuis id_token (JWT)
        if (id_token) {
          try {
            const payload = JSON.parse(atob(id_token.split('.')[1]));
            console.log('[Auth0 Callback] Profil extrait du id_token:', payload);
            localStorage.setItem('auth0_user', JSON.stringify(payload));
          } catch (e) {
            console.error('[Auth0 Callback] Erreur décodage id_token:', e);
          }
        }
        navigate('/', { replace: true });
      })
      .catch(err => {
        console.error('[Auth0 Callback] Erreur lors de l\'échange du code:', err);
        navigate('/', { replace: true });
      });
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-center gap-2 mb-2">
        <svg className="animate-spin h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        <span className="text-lg font-semibold">Connexion en cours…</span>
      </div>
      <div className="text-gray-500">Merci de patienter pendant l'authentification.</div>
    </div>
  );
}
