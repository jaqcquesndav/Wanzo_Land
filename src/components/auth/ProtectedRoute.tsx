import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useOnceEffect } from '../../hooks/useOnceEffect';
import { APPS_CONFIG, UserType } from '../../config/apps';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: UserType;
  requiredRole?: string;
  requiredPermissions?: string[];
  requiredSubscription?: boolean;
  appId?: keyof typeof APPS_CONFIG[UserType];
}

export function ProtectedRoute({ 
  children, 
  requiredUserType,
  requiredRole,
  requiredPermissions = [],
  requiredSubscription = true,
  appId
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user, refreshUser } = useAuth();
  const location = useLocation();

  // Rafraîchir le user périodiquement
  useOnceEffect(() => {
    const interval = setInterval(() => {
      refreshUser();
    }, 5 * 60 * 1000); // 5 minutes
    
    return () => clearInterval(interval);
  });

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }

  // Rediriger vers login si non authentifié
  if (!isAuthenticated || !user) {
    return <Navigate 
      to="/auth/login" 
      state={{ from: location.pathname }} 
      replace 
    />;
  }

  // Vérifier le type d'utilisateur
  if (requiredUserType && user.userType !== requiredUserType) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Vérifier le rôle
  if (requiredRole && user.role !== requiredRole && user.role !== 'superadmin') {
    return <Navigate to="/unauthorized" replace />;
  }

  // Vérifier les permissions
  if (requiredPermissions.length > 0) {
    const hasRequiredPermissions = requiredPermissions.every(
      permission => user.permissions?.includes(permission)
    );
    if (!hasRequiredPermissions) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Vérifier l'abonnement si requis
  if (requiredSubscription && user.subscription) {
    const { subscription } = user;

    // Vérifier si l'abonnement est actif
    if (subscription.status !== 'active' && subscription.status !== 'trial') {
      return <Navigate to="/subscription/expired" replace />;
    }

    // Vérifier si l'app est incluse dans l'abonnement
    if (appId && !subscription.allowedApps.includes(appId)) {
      return <Navigate to="/subscription/upgrade" replace />;
    }
  }

  // Si un appId est fourni, rediriger vers le sous-domaine approprié
  if (appId && user.userType) {
    const userApps = APPS_CONFIG[user.userType];
    if (userApps && appId in userApps) {
      const appConfig = userApps[appId];
      // Rediriger vers le sous-domaine avec le token d'accès
      const token = localStorage.getItem('access_token');
      window.location.href = `${appConfig.domain}?token=${token}`;
      return null;
    }
  }

  return <>{children}</>;
}