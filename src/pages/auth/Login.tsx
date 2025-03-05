import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { initiateAuth } from '../../utils/auth';
import { AuthLayout } from './components/AuthLayout';
import { AuthHeader } from './components/AuthHeader';
import { LoginForm } from './components/LoginForm';
import { OAuthLogin } from './components/OAuthLogin';
import { LoginMethodToggle } from './components/LoginMethodToggle';

export function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginMethod, setLoginMethod] = useState<'oauth' | 'direct'>('oauth');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Check if user just registered
  useEffect(() => {
    const registered = searchParams.get('registered');
    if (registered === 'true') {
      setSuccessMessage('Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.');
      
      // Si l'utilisateur vient de s'inscrire, récupérer le type d'utilisateur et l'ID de l'application
      const userType = searchParams.get('userType') || sessionStorage.getItem('auth_user_type') || 'sme';
      const appId = searchParams.get('appId') || sessionStorage.getItem('auth_app_id') || 'admin';
      
      // Stocker ces valeurs dans sessionStorage pour les utiliser après la connexion
      sessionStorage.setItem('auth_user_type', userType);
      sessionStorage.setItem('auth_app_id', appId);
      
      // Initier automatiquement la connexion OAuth après un délai court
      setTimeout(() => {
        handleOAuthLogin();
      }, 1500);
    }
    
    // Check for auth errors
    const authError = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    if (authError) {
      setError(errorDescription || `Erreur d'authentification: ${authError}`);
    }

    // Check if user needs to create account first
    const needsSignup = searchParams.get('needs_signup');
    if (needsSignup === 'true') {
      setError('Vous devez d\'abord créer un compte avant de vous connecter.');
      // Rediriger vers la page d'inscription après un court délai
      setTimeout(() => {
        navigate('/auth/register', {
          state: {
            userType: searchParams.get('userType') || sessionStorage.getItem('auth_user_type'),
            appId: searchParams.get('appId') || sessionStorage.getItem('auth_app_id')
          }
        });
      }, 2000);
    }
  }, [searchParams, navigate]);

  const handleOAuthLogin = async (provider?: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Récupérer le type d'utilisateur et l'ID de l'application
      const userType = searchParams.get('userType') || sessionStorage.getItem('auth_user_type') || 'sme';
      const appId = searchParams.get('appId') || sessionStorage.getItem('auth_app_id') || 'admin';
      
      // Déterminer l'URL de retour en fonction du type d'utilisateur et de l'application
      let returnTo = '/dashboard';
      
      if (userType === 'sme') {
        switch (appId) {
          case 'admin':
            returnTo = '/apps/admin';
            break;
          case 'accounting':
            returnTo = '/apps/accounting';
            break;
          case 'portfolio':
            returnTo = '/apps/portfolio';
            break;
          default:
            returnTo = '/dashboard';
        }
      } else if (userType === 'financial_institution') {
        returnTo = '/apps/financial';
      }
      
      // Initier l'authentification avec Auth0
      await initiateAuth({
        userType,
        appId,
        provider,
        returnTo,
        isSignup: false // Spécifier explicitement que c'est un login
      });
    } catch (err) {
      console.error('Erreur de connexion:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      setIsLoading(false);
    }
  };

  const handleDirectLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const success = await login(email, password);
      if (success) {
        // La redirection est gérée dans le hook useAuth
      } else {
        setError('Identifiants invalides');
      }
    } catch (err) {
      console.error('Erreur de connexion:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthHeader 
        title="Connectez-vous à votre compte"
        error={error}
        successMessage={successMessage}
      />
      
      <div className="mt-2 text-center">
        <p className="text-sm text-gray-600">
          Ou{' '}
          <Link
            to="/auth/register"
            className="font-medium text-primary hover:text-primary-hover"
          >
            créez un nouveau compte
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginMethodToggle 
            loginMethod={loginMethod}
            onToggle={setLoginMethod}
          />
          
          {loginMethod === 'oauth' ? (
            <OAuthLogin 
              onLogin={handleOAuthLogin}
              isLoading={isLoading}
            />
          ) : (
            <LoginForm 
              onSubmit={handleDirectLogin}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </AuthLayout>
  );
}