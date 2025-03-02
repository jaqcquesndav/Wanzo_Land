import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiService } from '../../services/api';
import { AuthLayout } from './components/AuthLayout';
import { AuthHeader } from './components/AuthHeader';
import { RegisterForm } from './components/RegisterForm';
import { initiateAuth } from '../../utils/auth';

export function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      
      // Rediriger vers la page de connexion
      navigate('/auth/login?registered=true');
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
        userType: 'sme', // Par défaut, on utilise le type PME
        appId: 'admin', // Par défaut, on utilise l'application admin
        provider,
        returnTo: '/dashboard',
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