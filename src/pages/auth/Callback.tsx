import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CALLBACK_URL } from '../../config/auth0';
import { useUser, notifyAuthChange } from '../../hooks/useUser';

export function Callback() {
  const navigate = useNavigate();
  const { syncProfileAfterLogin } = useUser();

  useEffect(() => {
    // Méthode de secours : rediriger après 15 secondes quoi qu'il arrive
    const timeoutId = setTimeout(() => {
      console.log('[Auth0 Callback] Redirection de secours après 15 secondes');
      if (window.location.pathname.includes('/auth/callback')) {
        navigate('/', { replace: true });
      }
    }, 15000);
    
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
    
    // Vérifier que les paramètres sont présents
    if (!code || !returnedState || !codeVerifier || returnedState !== storedState) {
      console.error('[Auth0 Callback] Paramètres manquants ou state invalide.');
      navigate('/', { replace: true });
      return () => clearTimeout(timeoutId);
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
      .then(res => {
        if (!res.ok) {
          throw new Error(`Erreur HTTP: ${res.status}`);
        }
        return res.json();
      })
      .then(async data => {
        console.log('[Auth0 Callback] Réponse /oauth/token:', data);
        
        // Vérifier si nous avons reçu une erreur de l'API
        if (data.error) {
          throw new Error(`Auth0 API error: ${data.error} - ${data.error_description}`);
        }
        
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
            
            // Vérifier et s'assurer que les champs minimaux sont présents
            const auth0User = {
              ...payload,
              // S'assurer que ces champs sont toujours présents, avec des valeurs par défaut si nécessaire
              id: payload.sub || payload.id || '', // Mapper le champ sub d'Auth0 vers id
              name: payload.name || payload.nickname || payload.email || 'Utilisateur',
              picture: payload.picture || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(payload.name || payload.nickname || payload.email || 'U'),
              email: payload.email || '',
            };
            
            localStorage.setItem('auth0_user', JSON.stringify(auth0User));
            
            // Si nous avons reçu les tokens et le profil utilisateur avec succès
            console.log('[Auth0 Callback] Authentification réussie, redirection vers l\'accueil');
            
            // Définir une variable pour indiquer que l'utilisateur vient de se connecter
            sessionStorage.setItem('auth0_just_logged_in', 'true');
            
            // Forcer la mise à jour du profil utilisateur pour rafraîchir le header
            await syncProfileAfterLogin();
            
            // Déclencher l'événement personnalisé pour informer toute l'application 
            // du changement d'authentification
            notifyAuthChange();
            
            // Redirection vers la page d'origine ou l'accueil
            const redirectPath = sessionStorage.getItem('auth0_redirect_after_login');
            if (redirectPath) {
              console.log('[Auth0 Callback] Redirection vers la page demandée:', redirectPath);
              sessionStorage.removeItem('auth0_redirect_after_login'); // Nettoyer après utilisation
              navigate(redirectPath, { replace: true });
            } else {
              console.log('[Auth0 Callback] Aucune redirection spécifique, retour à l\'accueil');
              navigate('/', { replace: true });
            }
          } catch (e) {
            console.error('[Auth0 Callback] Erreur décodage id_token:', e);
            navigate('/', { replace: true });
          }
        } else {
          console.error('[Auth0 Callback] Aucun id_token reçu');
          navigate('/', { replace: true });
        }
      })
      .catch(err => {
        console.error('[Auth0 Callback] Erreur lors de l\'échange du code:', err);
        
        // Afficher dans la console les paramètres utilisés pour déboguer
        console.log('[Auth0 Callback] Paramètres utilisés:', {
          domain: AUTH0_DOMAIN,
          client_id: AUTH0_CLIENT_ID,
          redirect_uri: AUTH0_CALLBACK_URL,
          code_length: code?.length
        });
        
        // Stocker une erreur dans le localStorage pour déboguer
        localStorage.setItem('auth0_error', JSON.stringify({
          message: err.message,
          timestamp: new Date().toISOString()
        }));
        
        // Rediriger vers la page d'accueil
        navigate('/', { replace: true });
      });
      
    // Nettoyer le timeout quand le composant est démonté
    return () => clearTimeout(timeoutId);
  }, [navigate, syncProfileAfterLogin]);

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
