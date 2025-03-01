import { useAuthContext } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export function useAuth() {
  const { state, login, logout, fetchUser } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  // Écouter les événements d'authentification
  useEffect(() => {
    const handleAuthFailed = () => {
      // Rediriger vers la page de connexion en cas d'échec d'authentification
      handleLogout();
    };

    window.addEventListener('auth:failed', handleAuthFailed);
    
    return () => {
      window.removeEventListener('auth:failed', handleAuthFailed);
    };
  }, []);

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
    logout();
    navigate('/auth/login');
  };

  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    login: handleLogin,
    logout: handleLogout,
    refreshUser: fetchUser
  };
}