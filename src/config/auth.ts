import { UserType } from '../types/auth';

// Configuration des sous-domaines pour chaque application
// Définir d'abord les types d'applications possibles
type AppName = 'admin' | 'accounting' | 'portfolio' | 'financial';

// Définir l'interface pour les endpoints d'API
interface ApiEndpoints {
  auth: {
    me: string;
    refresh: string;
    exchange: string;
    signup: string;
    login: string;
  };
  users: {
    profile: string;
    settings: string;
  };
  apps: Record<AppName, string>;
}

const APP_DOMAINS = {
  sme: {
    admin: 'http://localhost:4173',
    accounting: 'https://accounting.kiota.com',
    portfolio: 'https://portfolio.kiota.com',
  },
  financial_institution: {
    portfolio: 'https://fi.kiota.com',
  },
} as const;

// Define a type for the applications property
type ApplicationsConfig = {
  [key in UserType]: {
    [appId: string]: {
      clientId: string;
      audience: string;
      domain: string;
      logoutRedirect: string;
    };
  };
};

// Configuration Auth0
type Auth0ConfigType = {
  domain: string;
  clientId: string;
  redirectUri: string;
  scope: string;
  apiBaseUrl: string;
  audience: string;
  applications: ApplicationsConfig;
};

export const AUTH0_CONFIG: Auth0ConfigType = {
  domain: 'dev-tezmln0tk0g1gouf.eu.auth0.com',
  clientId: 'LmG0NAGcv37KBb1IZk4uQefrbmx7ANi3',
  redirectUri: 'http://localhost:5173/auth/callback',
  scope: 'openid profile email offline_access',
  apiBaseUrl: 'http://localhost:3000',
  audience: 'https://api.kiota.com',
  
  // Configuration par application
  applications: {
    sme: {
      admin: {
        clientId: 'LmG0NAGcv37KBb1IZk4uQefrbmx7ANi3',
        audience: 'https://api.kiota.com/sme',
        domain: APP_DOMAINS.sme.admin,
        logoutRedirect: '/apps/sme',
      },
      accounting: {
        clientId: 'LmG0NAGcv37KBb1IZk4uQefrbmx7ANi3',
        audience: 'https://api.kiota.com/accounting',
        domain: APP_DOMAINS.sme.accounting,
        logoutRedirect: '/apps/sme',
      },
      portfolio: {
        clientId: 'LmG0NAGcv37KBb1IZk4uQefrbmx7ANi3',
        audience: 'https://api.kiota.com/portfolio',
        domain: APP_DOMAINS.sme.portfolio,
        logoutRedirect: '/apps/sme',
      },
    },
    financial_institution: {
      portfolio: {
        clientId: 'jJubGNfK9nSPqwzbGRCJ1BRJGYjTWG3F',
        audience: 'https://api.kiota.com/fi',
        domain: APP_DOMAINS.financial_institution.portfolio,
        logoutRedirect: '/apps/financial',
      },
    },
  },
};

// Points d'API avec le typage correct
export const API_ENDPOINTS: ApiEndpoints = {
  auth: {
    me: '/auth/me',
    refresh: '/auth/refresh',
    exchange: '/auth/exchange',
    signup: '/auth/signup',
    login: '/auth/login',
  },
  users: {
    profile: '/users/profile',
    settings: '/users/settings',
  },
  apps: {
    admin: '/apps/admin',
    accounting: '/apps/accounting',
    portfolio: '/apps/portfolio',
    financial: '/apps/financial'
  }
};

// Fonction utilitaire pour obtenir la configuration d'une application
export function getAppConfig(userType: UserType, appId: string) {
  const config = AUTH0_CONFIG.applications[userType]?.[appId];
  if (!config) {
    throw new Error(`Configuration introuvable pour ${userType}/${appId}`);
  }
  return config;
}

// Fonction utilitaire pour obtenir l'URL de redirection après déconnexion
export function getLogoutRedirectUrl(userType: UserType, appId: string): string {
  const config = getAppConfig(userType, appId);
  return config.logoutRedirect;
}