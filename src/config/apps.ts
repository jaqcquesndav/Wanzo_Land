export const USER_TYPES = {
  SME: 'sme',
  FINANCIAL_INSTITUTION: 'financial_institution',
} as const;

export type UserType = typeof USER_TYPES[keyof typeof USER_TYPES];

type AppId = 'admin' | 'accounting' | 'portfolio';

interface AppConfig {
  id: AppId;
  name: string;
  description: string;
  icon: string;
  domain: string;
  requiredRole: string;
}

// Configuration des sous-domaines pour chaque application
export const APP_DOMAINS = {
  [USER_TYPES.SME]: {
    admin: 'http://localhost:4173/',
    accounting: 'http://localhost:3030/',
    portfolio: 'https://portfolio.kiota.com',
  },
  [USER_TYPES.FINANCIAL_INSTITUTION]: {
    portfolio: 'https://fi.kiota.com',
  },
} as const;

export const APPS_CONFIG: Record<UserType, Record<AppId, AppConfig>> = {
  [USER_TYPES.SME]: {
    admin: {
      id: 'admin',
      name: 'Administration',
      description: 'Gérez votre profil entreprise et vos utilisateurs',
      icon: 'Settings',
      domain: APP_DOMAINS[USER_TYPES.SME].admin,
      requiredRole: 'admin',
    },
    accounting: {
      id: 'accounting',
      name: 'Comptabilité',
      description: 'Gérez votre comptabilité et vos finances',
      icon: 'Calculator',
      domain: APP_DOMAINS[USER_TYPES.SME].accounting,
      requiredRole: 'user',
    },
    portfolio: {
      id: 'portfolio',
      name: 'Gestion de Portefeuille PME',
      description: 'Sollicitez des crédits, gérez les remboursements, les leasings, et profitez du capital investissement',
      icon: 'LineChart',
      domain: APP_DOMAINS[USER_TYPES.SME].portfolio,
      requiredRole: 'user',
    },
  },
  [USER_TYPES.FINANCIAL_INSTITUTION]: {
    portfolio: {
      id: 'portfolio',
      name: 'Gestion de Portefeuille',
      description: 'Gérez les portefeuilles de vos clients PME',
      icon: 'BarChart',
      domain: APP_DOMAINS[USER_TYPES.FINANCIAL_INSTITUTION].portfolio,
      requiredRole: 'user',
    },
  } as Record<AppId, AppConfig>,
};