import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { apiService } from '../../services/api'; // <-- ton ApiService corrigé
import { AuthLayout } from './components/AuthLayout';
import { useAuth } from '../../hooks/useAuth';

/**
 * Composant qui gère la callback après authentification via Auth0 (PKCE).
 */
export function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  /**
   * `refreshUser()` est la méthode exposée par `useAuth()`
   * qui va récupérer le profil utilisateur (et potentiellement rafraîchir le token).
   */
  const { refreshUser } = useAuth();

  // Permet d'éviter que l'effet se relance en boucle
  const hasRun = useRef(false);

  useEffect(() => {
    // Empêche un déclenchement multiple du callback (doublons, re-render, etc.)
    if (hasRun.current) return;
    hasRun.current = true;

    const handleAuth = async () => {
      console.log('Démarrage du traitement du callback...');
      console.log('Paramètres reçus:', Object.fromEntries(searchParams.entries()));

      try {
        // 1. Récupérer le code et le state
        const code = searchParams.get('code');
        const state = searchParams.get('state');

        if (!code) {
          console.error("❌ Code d'autorisation manquant");
          throw new Error("Code d'autorisation manquant");
        }

        // 2. Vérifier le state
        const savedState = sessionStorage.getItem('auth_state');
        console.log('Vérification du state...');
        console.log('State reçu:', state);
        console.log('State sauvegardé:', savedState);

        if (state !== savedState) {
          console.error('❌ État de sécurité invalide');
          throw new Error('État de sécurité invalide');
        }

        // 3. Récupérer le code verifier
        const codeVerifier = sessionStorage.getItem('code_verifier');
        console.log('Vérification du code verifier...');
        if (!codeVerifier) {
          console.error('❌ Code verifier manquant');
          throw new Error('Code verifier manquant');
        }
        console.log('Code verifier trouvé:', codeVerifier.substring(0, 10) + '...');

        // 4. Échanger le code contre des tokens via l'apiService (endpoint /auth/exchange)
        console.log("Échange du code contre des tokens via apiService...");
        const tokens = await apiService.exchangeAuthCode(code, codeVerifier, state || undefined);

        // 5. Stocker les tokens localement (ou laisser le backend mettre l'access_token en cookie)
        console.log('Stockage des tokens...');
        if (tokens?.tokens?.access_token) {
          localStorage.setItem('access_token', tokens.tokens.access_token);
        } else if (tokens?.access_token) {
          // Selon comment ton backend renvoie la réponse
          localStorage.setItem('access_token', tokens.access_token);
        }
        if (tokens?.tokens?.refresh_token) {
          localStorage.setItem('refresh_token', tokens.tokens.refresh_token);
        } else if (tokens?.refresh_token) {
          localStorage.setItem('refresh_token', tokens.refresh_token);
        }

        console.log('✅ Tokens stockés avec succès');

        // 6. Nettoyer le sessionStorage
        console.log('Nettoyage du sessionStorage...');
        sessionStorage.removeItem('code_verifier');
        sessionStorage.removeItem('auth_state');
        console.log('✅ SessionStorage nettoyé');

        // 7. Récupérer l'utilisateur
        //    -> Cela appelle `apiService.getUserProfile()`,
        //       qui utilisera le token qu'on vient de stocker
        await refreshUser();

        // 8. Déterminer la redirection en fonction de l'application ou de l'utilisateur
        const userType = sessionStorage.getItem('auth_user_type') || 'sme';
        const appId = sessionStorage.getItem('auth_app_id') || 'admin';

        // Nettoyer les infos d'application
        sessionStorage.removeItem('auth_user_type');
        sessionStorage.removeItem('auth_app_id');

        // Choix par défaut
        let redirectPath = '/dashboard';

        if (userType === 'sme') {
          switch (appId) {
            case 'admin':
              redirectPath = '/apps/admin';
              break;
            case 'accounting':
              redirectPath = '/apps/accounting';
              break;
            case 'portfolio':
              redirectPath = '/apps/portfolio';
              break;
            default:
              redirectPath = '/dashboard';
          }
        } else if (userType === 'financial_institution') {
          redirectPath = '/apps/financial';
        }

        // 9. Si une URL de retour a été stockée, la prioriser
        const returnTo = sessionStorage.getItem('auth_return_to');
        sessionStorage.removeItem('auth_return_to');

        console.log('✅ Authentification réussie, redirection vers:', returnTo || redirectPath);
        navigate(returnTo || redirectPath, { replace: true });
      } catch (err) {
        // 10. Gestion d'erreur : on redirige l'utilisateur vers /auth/login
        console.error('❌ Erreur lors du callback:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        console.log('Redirection vers la page de connexion dans 3 secondes...');
        setTimeout(() => navigate('/auth/login'), 3000);
      }
    };

    handleAuth();
  }, [searchParams, navigate, refreshUser]);

  if (error) {
    return (
      <AuthLayout>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">Erreur d'authentification</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <p className="mt-2 text-sm text-gray-500">Redirection vers la page de connexion...</p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="text-center">
        <h2 className="text-xl font-semibold">Authentification en cours...</h2>
        <p className="mt-2 text-gray-600">Veuillez patienter...</p>
        <div className="mt-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
        </div>
      </div>
    </AuthLayout>
  );
}
