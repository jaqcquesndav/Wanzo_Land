import { useAuthContext } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function useAuth() {
  const { state, login, logout, fetchUser } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  // Add a flag to prevent multiple logout redirects
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  // Add a debounce flag for refresh operations
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Écouter les événements d'authentification
  useEffect(() => {
    const handleAuthFailed = () => {
      // Prevent multiple redirects
      if (!isLoggingOut) {
        setIsLoggingOut(true);
        // Rediriger vers la page de connexion en cas d'échec d'authentification
        handleLogout();
      }
    };

    window.addEventListener('auth:failed', handleAuthFailed);
    
    return () => {
      window.removeEventListener('auth:failed', handleAuthFailed);
    };
  }, [isLoggingOut]);

  const handleLogin = async (email: string, password: string) => {
    const success = await login(email, password);
    if (success) {
      // Rediriger vers la page précédente ou le tableau de bord
      const from = location.state?.from || '/dashboard';
      navigate(from, { replace: true });
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    // Nettoyer toutes les données d'authentification
    sessionStorage.removeItem('code_verifier');
    sessionStorage.removeItem('auth_state');
    sessionStorage.removeItem('auth_is_signup');
    sessionStorage.removeItem('auth_user_type');
    sessionStorage.removeItem('auth_app_id');
    sessionStorage.removeItem('auth_return_to');
    sessionStorage.removeItem('exchanged_codes');
    
    logout();
    navigate('/auth/login');
    
    // Reset the logging out flag after a delay
    setTimeout(() => {
      setIsLoggingOut(false);
    }, 1000);
  };

  // Add a debounced refresh function to prevent multiple rapid calls
  const refreshUser = async () => {
    // Use a simple debounce mechanism
    if (isRefreshing) {
      console.log('Already refreshing user, skipping duplicate call');
      return;
    }
    
    try {
      setIsRefreshing(true);
      await fetchUser();
    } catch (error) {
      console.error('Error refreshing user:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    login: handleLogin,
    logout: handleLogout,
    refreshUser
  };
}