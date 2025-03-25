import { UserType } from '../types/auth';

type AppConfig = {
  clientId: string;
  audience: string;
  domain: string;
  logoutRedirect: string;
};

type Applications = {
  sme: {
    admin: AppConfig;
    accounting: AppConfig;
    portfolio: AppConfig;
  };
  financial_institution: {
    portfolio: AppConfig;
  };
};

// Configuration des sous-domaines pour chaque application
const APP_DOMAINS = {
  sme: {
    admin: 'https://admin.kiota.com',
    accounting: 'https://accounting.kiota.com',
    portfolio: 'https://portfolio.kiota.com',
  },
  financial_institution: {
    portfolio: 'https://fi.kiota.com',
  },
} as const;

// Configuration Auth0
export const AUTH0_CONFIG = {
  domain: 'dev-tezmln0tk0g1gouf.eu.auth0.com',
  clientId: 'LmG0NAGcv37KBb1IZk4uQefrbmx7ANi3',
  redirectUri: 'http://localhost:5173/auth/callback',
  scope: 'openid profile email offline_access',
  apiBaseUrl: 'http://localhost:3000', // Point d'entrée de l'API Gateway
  authBaseUrl: 'http://localhost:3000', // Service d'authentification interne
  audience: 'https://dev-tezmln0tk0g1gouf.eu.auth0.com/api/v2/',
  
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

// Points d'API
export const API_ENDPOINTS = {
  auth: {
    me: '/auth/me',
    refresh: '/auth/refresh',
    exchange: '/auth/exchange',
    signup: '/auth/signup',
    login: '/auth/login',
    logout: '/auth/logout',
  },
  users: {
    profile: '/users/profile',
    settings: '/users/settings',
  },
  apps: {} as Record<string, string>,
};

// Fonction utilitaire pour obtenir la configuration d'une application
export function getAppConfig(userType: UserType, appId: keyof Applications[UserType]) {
  const config = AUTH0_CONFIG.applications[userType]?.[appId];
  if (!config) {
    throw new Error(`Configuration introuvable pour ${userType}/${appId}`);
  }
  return config;
}

// Fonction utilitaire pour obtenir l'URL de redirection après déconnexion
export function getLogoutRedirectUrl(userType: UserType, appId: keyof Applications[UserType]): string {
  const config = getAppConfig(userType, appId);
  return config.logoutRedirect;
}