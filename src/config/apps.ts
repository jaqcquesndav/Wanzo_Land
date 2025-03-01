export const USER_TYPES = {
  SME: 'sme',
  FINANCIAL_INSTITUTION: 'financial_institution',
} as const;

export type UserType = typeof USER_TYPES[keyof typeof USER_TYPES];

export const APPS_CONFIG = {
  [USER_TYPES.SME]: {
    admin: {
      id: 'admin',
      name: 'Administration',
      description: 'Gérez votre profil entreprise et vos utilisateurs',
      icon: 'Settings',
      path: '/admin',
    },
    accounting: {
      id: 'accounting',
      name: 'Comptabilité',
      description: 'Gérez votre comptabilité et vos finances',
      icon: 'Calculator',
      path: '/erp/accounting',
    },
    portfolio: {
      id: 'portfolio',
      name: 'Gestion de Portefeuille PME',
      description: 'Suivez et optimisez vos investissements',
      icon: 'LineChart',
      path: '/portfolio/sme',
    },
  },
  [USER_TYPES.FINANCIAL_INSTITUTION]: {
    portfolio: {
      id: 'portfolio',
      name: 'Gestion de Portefeuille',
      description: 'Gérez les portefeuilles de vos clients PME',
      icon: 'BarChart',
      path: '/portfolio/institution',
    },
  },
};