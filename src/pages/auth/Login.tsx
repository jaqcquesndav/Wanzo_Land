import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { initiateAuth } from '../../utils/auth';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/ui/Button';
import { AuthLayout } from './components/AuthLayout';
import { AuthHeader } from './components/AuthHeader';
import { LoginMethodToggle } from './components/LoginMethodToggle';
import { LoginForm } from './components/LoginForm';
import { OAuthLogin } from './components/OAuthLogin';

export function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginMethod, setLoginMethod] = useState<'oauth' | 'direct'>('oauth');

  const userType = searchParams.get('userType') || 'sme';
  const appId = searchParams.get('appId') || 'admin';
  const registered = searchParams.get('registered') === 'true';
  const from = location.state?.from?.pathname || '/';

  const handleOAuthLogin = async (provider?: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Initiate authentication with PKCE
      await initiateAuth({
        userType,
        appId,
        provider
      });
    } catch (err) {
      console.error('OAuth login error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDirectLogin = async (email: string, password: string) => {
    if (!email || !password) {
      setError('Please enter your email and password');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Use the login function from useAuth hook
      const success = await login(email, password);
      
      if (success) {
        // Navigate to the page the user was trying to access, or to dashboard
        navigate(from, { replace: true });
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error('Direct login error:', err);
      setError(err instanceof Error ? err.message : 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthHeader 
        title="Kiota Suit"
        subtitle="Sign in to your account"
        error={error}
        successMessage={registered ? "Registration successful! You can now log in." : null}
      />

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginMethodToggle 
            loginMethod={loginMethod} 
            onToggle={setLoginMethod} 
          />

          {loginMethod === 'direct' ? (
            <LoginForm 
              onSubmit={handleDirectLogin}
              isLoading={isLoading}
            />
          ) : (
            <OAuthLogin 
              onLogin={handleOAuthLogin}
              isLoading={isLoading}
            />
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Don't have an account?</span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                variant="secondary"
                onClick={() => navigate('/auth/register')}
                className="w-full"
              >
                Create an account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}