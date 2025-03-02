export const AUTH0_CONFIG = {
  domain: 'dev-tezmln0tk0g1gouf.eu.auth0.com',
  clientId: 'LmG0NAGcv37KBb1IZk4uQefrbmx7ANi3',
  redirectUri: 'http://localhost:5173/auth/callback',
  //redirectUri: `${window.location.origin}/auth/callback`,
  scope: 'openid profile email offline_access',
  apiBaseUrl: 'http://localhost:3000',
  audience: 'https://dev-tezmln0tk0g1gouf.eu.auth0.com/api/v2/',
  applications: {
    sme: {
      admin: {
        clientId: 'LmG0NAGcv37KBb1IZk4uQefrbmx7ANi3',
        audience: 'https://api.kiota.com/sme',
      },
      accounting: {
        clientId: 'LmG0NAGcv37KBb1IZk4uQefrbmx7ANi3',
        audience: 'https://api.kiota.com/accounting',
      },
      portfolio: {
        clientId: 'LmG0NAGcv37KBb1IZk4uQefrbmx7ANi3',
        audience: 'https://api.kiota.com/portfolio',
      },
    },
    financial_institution: {
      portfolio: {
        clientId: 'jJubGNfK9nSPqwzbGRCJ1BRJGYjTWG3F',
        audience: 'https://api.kiota.com/fi',
      },
    },
  },
};

export const API_ENDPOINTS = {
  auth: {
    me: '/auth/me',
    refresh: '/auth/refresh',
    exchange: '/auth/exchange',
    signup: '/auth/signup',
    login: '/auth/login',
    inviteUser: '/auth/invite-user',
  },
  users: {
    profile: '/users/profile',
    settings: '/users/settings',
  },
  companies: {
    create: '/companies',
    getAll: '/companies',
    getById: (id: string) => `/companies/${id}`,
    update: (id: string) => `/companies/${id}`,
    delete: (id: string) => `/companies/${id}`,
  },
  apps: {
    admin: '/apps/admin',
    accounting: '/apps/accounting',
    portfolio: '/apps/portfolio',
  },
};