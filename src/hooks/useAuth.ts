import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { getAppConfig, getLogoutRedirectUrl } from '../config/auth';
import { useOnceEffect } from './useOnceEffect';

export function useAuth() {
  const { state, login, logout: contextLogout, fetchUser } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Écouter les événements d'authentification
  useOnceEffect(() => {
    const handleAuthFailed = () => {
      if (!isLoggingOut) {
        setIsLoggingOut(true);
        handleLogout();
      }
    };

    window.addEventListener('auth:failed', handleAuthFailed);
    return () => window.removeEventListener('auth:failed', handleAuthFailed);
  });

  const handleLogin = async (email: string, password: string) => {
    const success = await login(email, password);
    if (success) {
      const from = location.state?.from || '/dashboard';
      navigate(from, { replace: true });
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    // 1. Récupérer le type d'utilisateur et l'app en cours
    const userType = state.user?.userType || 'sme';
    const currentApp = sessionStorage.getItem('current_app') || 'admin';

    // 2. Nettoyer le storage
    sessionStorage.clear();
    localStorage.clear();

    // 3. Déconnexion du contexte
    contextLogout();

    // 4. Rediriger vers la page appropriée
    const redirectUrl = getLogoutRedirectUrl(userType, currentApp);
    navigate(redirectUrl);

    setTimeout(() => {
      setIsLoggingOut(false);
    }, 1000);
  };

  const refreshUser = async () => {
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