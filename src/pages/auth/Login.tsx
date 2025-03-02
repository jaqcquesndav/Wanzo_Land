import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();
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
    }
  }, [searchParams]);

  const handleOAuthLogin = async (provider?: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Récupérer l'URL de retour si elle existe dans l'état de navigation
      const returnTo = location.state?.from || '/dashboard';
      
      // Initier l'authentification avec Auth0
      await initiateAuth({
        userType: 'sme', // Par défaut, on utilise le type PME
        appId: 'admin', // Par défaut, on utilise l'application admin
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