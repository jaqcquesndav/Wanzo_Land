import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { startAuth0PKCE } from '../../utils/auth0pkce';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CALLBACK_URL } from '../../config/auth0';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useUser();
  const location = useLocation();
  const [redirecting, setRedirecting] = useState(false);
  const [redirectAttempted, setRedirectAttempted] = useState(false);

  // Rediriger vers Auth0 si l'utilisateur n'est pas authentifié
  useEffect(() => {
    // Éviter les redirections en boucle ou trop fréquentes
    if (!isAuthenticated && !redirecting && !redirectAttempted) {
      setRedirecting(true);
      
      // Stocker l'emplacement actuel pour rediriger après connexion
      sessionStorage.setItem('auth0_redirect_after_login', location.pathname + location.search);
      
      // Courte temporisation pour éviter les redirections répétées trop rapides
      const redirectTimer = setTimeout(() => {
        // Rediriger vers Auth0 directement
        console.log('Redirection vers Auth0 pour authentification...');
        startAuth0PKCE('login', AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CALLBACK_URL);
        setRedirectAttempted(true);
      }, 300);
      
      return () => {
        clearTimeout(redirectTimer);
        setRedirecting(false);
      };
    }
  }, [isAuthenticated, redirecting, redirectAttempted, location]);

  // Pendant que la redirection est en cours ou si l'utilisateur est authentifié, afficher le contenu
  return isAuthenticated ? <>{children}</> : null;
}
