import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { User } from '../../types/auth';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: 'sme' | 'financial_institution';
  requiredPermissions?: string[];
}

export function ProtectedRoute({ 
  children, 
  requiredUserType,
  requiredPermissions = []
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user, refreshUser } = useAuth();
  const location = useLocation();

  // Vérifier périodiquement l'état d'authentification
  useEffect(() => {
    // Rafraîchir l'utilisateur au montage du composant
    refreshUser();
    
    // Rafraîchir l'utilisateur toutes les 5 minutes
    const interval = setInterval(() => {
      refreshUser();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [refreshUser]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }

  if (!isAuthenticated || !user) {
    // Sauvegarder l'URL actuelle pour y revenir après la connexion
    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />;
  }

  // Check user type if required
  if (requiredUserType && user.userType !== requiredUserType) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check permissions if required
  if (requiredPermissions.length > 0) {
    const hasRequiredPermissions = requiredPermissions.every(
      permission => user.permissions?.includes(permission)
    );
    if (!hasRequiredPermissions) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
}