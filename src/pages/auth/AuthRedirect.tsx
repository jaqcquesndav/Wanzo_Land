import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export function AuthRedirect() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();
  const action = searchParams.get('action');
  const returnTo = searchParams.get('return_to');

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        await loginWithRedirect({
          appState: {
            returnTo: returnTo || '/',
            action,
          },
        });
      } catch (error) {
        console.error('Erreur de redirection:', error);
        navigate('/');
      }
    };

    handleRedirect();
  }, [loginWithRedirect, navigate, action, returnTo]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Redirection en cours...</h2>
        <p className="mt-2 text-gray-600">Vous allez être redirigé vers la page de connexion.</p>
      </div>
    </div>
  );
}