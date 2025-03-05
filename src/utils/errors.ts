// Types d'erreurs spécifiques
export class AuthError extends Error {
    constructor(message: string, public code?: string) {
      super(message);
      this.name = 'AuthError';
    }
  }
  
  export class NetworkError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'NetworkError';
    }
  }
  
  export class SubscriptionError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'SubscriptionError';
    }
  }
  
  // Gestionnaire d'erreurs global
  export function handleError(error: unknown): Error {
    if (error instanceof Error) {
      return error;
    }
    return new Error(typeof error === 'string' ? error : 'Une erreur est survenue');
  }
  
  // Helpers pour les messages d'erreur
  export const ErrorMessages = {
    NETWORK_OFFLINE: 'Vous êtes hors ligne. Certaines fonctionnalités peuvent être limitées.',
    AUTH_EXPIRED: 'Votre session a expiré. Veuillez vous reconnecter.',
    SUBSCRIPTION_REQUIRED: 'Un abonnement actif est requis pour accéder à cette fonctionnalité.',
    UNAUTHORIZED: 'Vous n\'avez pas les permissions nécessaires.',
  } as const;