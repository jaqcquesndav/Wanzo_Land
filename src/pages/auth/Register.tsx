import { useState } from 'react';
import { useNavigate, Link, useSearchParams, useLocation } from 'react-router-dom';
import { apiService } from '../../services/api';
import { AuthLayout } from './components/AuthLayout';
import { AuthHeader } from './components/AuthHeader';
import { RegisterForm } from './components/RegisterForm';
import { initiateAuth } from '../../utils/auth';

export function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for auth errors
  const authError = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');
  if (authError && !error) {
    setError(errorDescription || `Erreur d'inscription: ${authError}`);
  }

  const handleSubmit = async (formData: {
    email: string;
    password: string;
    companyName: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Appel à l'API pour créer le compte
      const response = await apiService.signup(formData);
      
      console.log('Compte créé avec succès:', response);
      
      // Récupérer le type d'utilisateur et l'ID de l'application
      const userType = location.state?.userType || sessionStorage.getItem('auth_user_type') || 'sme';
      const appId = location.state?.appId || sessionStorage.getItem('auth_app_id') || 'admin';
      
      // Rediriger vers la page de connexion avec les paramètres nécessaires
      navigate(`/auth/login?registered=true&userType=${userType}&appId=${appId}`);
    } catch (err) {
      console.error('Erreur lors de la création du compte:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de la création du compte');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignup = async (provider?: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Initier l'authentification avec Auth0 en mode signup
      await initiateAuth({
        userType: location.state?.userType || 'sme',
        appId: location.state?.appId || 'admin',
        provider,
        returnTo: '/auth/login?registered=true',
        isSignup: true // Spécifier explicitement que c'est un signup
      });
    } catch (err) {
      console.error('Erreur d\'inscription:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthHeader 
        title="Créez votre compte Kiota Suit"
        error={error}
      />
      
      <div className="mt-2 text-center">
        <p className="text-sm text-gray-600">
          Ou{' '}
          <Link
            to="/auth/login"
            className="font-medium text-primary hover:text-primary-hover"
          >
            connectez-vous à votre compte existant
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <RegisterForm 
          onSubmit={handleSubmit}
          onOAuthSignup={handleOAuthSignup}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </AuthLayout>
  );
}