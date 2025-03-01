import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { apiService } from '../../services/api';
import { AuthLayout } from './components/AuthLayout';
import { useAuth } from '../../hooks/useAuth';

export function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const { refreshUser } = useAuth();

  useEffect(() => {
    const handleAuth = async () => {
      console.log('Démarrage du traitement du callback...');
      console.log('Paramètres reçus:', Object.fromEntries(searchParams.entries()));

      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        
        if (!code) {
          console.error('❌ Code d\'autorisation manquant');
          throw new Error('Code d\'autorisation manquant');
        }

        // Vérifier que le state correspond
        const savedState = sessionStorage.getItem('auth_state');
        console.log('Vérification du state...');
        console.log('State reçu:', state);
        console.log('State sauvegardé:', savedState);
        
        if (state !== savedState) {
          console.error('❌ État de sécurité invalide');
          throw new Error('État de sécurité invalide');
        }

        // Récupérer et vérifier le code verifier
        const codeVerifier = sessionStorage.getItem('code_verifier');
        console.log('Vérification du code verifier...');
        if (!codeVerifier) {
          console.error('❌ Code verifier manquant');
          throw new Error('Code verifier manquant');
        }
        console.log('Code verifier trouvé:', codeVerifier.substring(0, 10) + '...');

        // Échanger le code contre des tokens via le service API
        console.log('Échange du code contre des tokens via apiService...');
        const tokens = await apiService.exchangeAuthCode(code, codeVerifier, state || undefined);
        
        // Stocker les tokens
        console.log('Stockage des tokens...');
        if (tokens.access_token) {
          localStorage.setItem('access_token', tokens.access_token);
        }
        if (tokens.id_token) {
          localStorage.setItem('id_token', tokens.id_token);
        }
        if (tokens.refresh_token) {
          localStorage.setItem('refresh_token', tokens.refresh_token);
        }
        console.log('✅ Tokens stockés avec succès');

        // Nettoyer le storage
        console.log('Nettoyage du sessionStorage...');
        sessionStorage.removeItem('code_verifier');
        sessionStorage.removeItem('auth_state');
        console.log('✅ SessionStorage nettoyé');

        // Récupérer les informations de l'utilisateur
        await refreshUser();

        // Rediriger vers la page appropriée en fonction du type d'utilisateur et de l'application
        const userType = sessionStorage.getItem('auth_user_type') || 'sme';
        const appId = sessionStorage.getItem('auth_app_id') || 'admin';
        
        // Nettoyer les informations d'application
        sessionStorage.removeItem('auth_user_type');
        sessionStorage.removeItem('auth_app_id');
        
        // Déterminer la redirection en fonction du type d'utilisateur et de l'application
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
        
        // Rediriger vers la page appropriée ou la page précédente
        const returnTo = sessionStorage.getItem('auth_return_to');
        sessionStorage.removeItem('auth_return_to');
        
        console.log('✅ Authentification réussie, redirection vers:', returnTo || redirectPath);
        navigate(returnTo || redirectPath);
      } catch (err) {
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