export interface AppPlatform {
  web: boolean;
  desktop: boolean;
  mobile: boolean;
  downloadUrls?: {
    android?: string;
    ios?: string;
    windows?: string;
    mac?: string;
    linux?: string;
  };
}

export interface AppFeature {
  name: string;
  included: boolean;
  limit?: string;
}

export interface App {
  id: string;
  name: string;
  description: string;
  features: AppFeature[];
  isFree?: boolean;
  storageLimit?: string;
  platforms: AppPlatform;
}

export interface AppGroup {
  id: string;
  name: string;
  description: string;
  apps: App[];
  monthlyPrice: number;
  yearlyPrice: number;
  popular?: boolean;
}

export const appGroups: AppGroup[] = [
  {
    id: 'management',
    name: 'ERP',
    description: 'Suite complète pour la gestion de votre entreprise',
    monthlyPrice: 49.99,
    yearlyPrice: 499.99,
    apps: [
      {
        id: 'accounting',
        name: 'Comptabilité',
        description: 'Gestion comptable complète et simplifiée',
        isFree: true,
        storageLimit: '100 MB',
        platforms: {
          web: true,
          desktop: true,
          mobile: true,
        },
        features: [
          { name: 'Grand livre', included: true },
          { name: 'Journaux comptables', included: true },
          { name: 'Balance', included: true },
          { name: 'États financiers', included: true },
        ],
      },
      {
        id: 'sales',
        name: 'Gestion des Ventes',
        description: 'Suivi et optimisation des ventes',
        platforms: {
          web: true,
          desktop: false,
          mobile: true,
        },
        features: [
          { name: 'Devis et factures', included: true },
          { name: 'Gestion des clients', included: true },
          { name: 'Pipeline de vente', included: true },
          { name: 'Rapports de vente', included: true },
        ],
      },
      {
        id: 'inventory',
        name: 'Gestion des Stocks',
        description: 'Gestion optimale de vos stocks et approvisionnements',
        platforms: {
          web: true,
          desktop: true,
          mobile: true,
        },
        features: [
          { name: 'Suivi en temps réel', included: true },
          { name: 'Gestion des commandes', included: true },
          { name: 'Inventaire', included: true },
          { name: 'Alertes stock', included: true },
        ],
      },
    ],
  },
  {
    id: 'financing',
    name: 'Solutions de Financement',
    description: 'Solutions complètes pour le financement et l\'investissement',
    monthlyPrice: 79.99,
    yearlyPrice: 799.99,
    popular: true,
    apps: [
      {
        id: 'leasing',
        name: 'Gestion du Leasing',
        description: 'Gérez vos contrats de leasing et équipements',
        platforms: {
          web: true,
          desktop: true,
          mobile: true,
        },
        features: [
          { name: 'Suivi des contrats', included: true },
          { name: 'Gestion des échéances', included: true },
          { name: 'Simulation de leasing', included: true },
          { name: 'Documents numériques', included: true },
        ],
      },
      {
        id: 'funding',
        name: 'Recherche de Financement',
        description: 'Trouvez les meilleures options de financement',
        platforms: {
          web: true,
          desktop: false,
          mobile: true,
        },
        features: [
          { name: 'Comparaison des offres', included: true },
          { name: 'Dossier numérique', included: true },
          { name: 'Scoring automatique', included: true },
          { name: 'Suivi des demandes', included: true },
        ],
      },
      {
        id: 'portfolio',
        name: 'Gestion de Portefeuille',
        description: 'Optimisez la gestion de vos investissements',
        platforms: {
          web: true,
          desktop: true,
          mobile: true,
        },
        features: [
          { name: 'Suivi des investissements', included: true },
          { name: 'Analyse des performances', included: true },
          { name: 'Gestion des risques', included: true },
          { name: 'Rapports détaillés', included: true },
        ],
      },
    ],
  },
];