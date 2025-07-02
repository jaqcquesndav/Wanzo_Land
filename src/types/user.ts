import * as z from 'zod';
import { UserType } from './common';

export const addressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  commune: z.string().optional(),
  province: z.string().optional(),
  country: z.string().optional(),
});

export type Address = z.infer<typeof addressSchema>;

export const contactPersonSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  role: z.string().optional(),
});

export type ContactPerson = z.infer<typeof contactPersonSchema>;

export interface User {
  id: string;
  email: string;
  emailVerified?: boolean;
  name?: string;
  givenName?: string;
  familyName?: string;
  picture?: string;
  phone?: string;
  phoneVerified?: boolean;
  address?: string; // Simplified to string to match Profile.tsx UI
  idNumber?: string;
  idType?: 'passport' | 'national_id' | 'driver_license' | 'other';
  idStatus?: 'pending' | 'verified' | 'rejected';
  role?: string;
  birthdate?: string;
  bio?: string;
  
  // The user's entity type, determining which profile is active.
  userType?: UserType; // 'sme' (for PME/Company) | 'financial_institution'

  // A user is linked to ONE of the following entities, based on userType.
  companyId?: string; // Link to the PME/Company profile
  financialInstitutionId?: string; // Link to the Financial Institution profile

  isCompanyOwner?: boolean;
  createdAt: string;
  updatedAt?: string;
  settings?: UserSettings;
  language?: 'fr' | 'en';
  permissions?: string[];
  plan?: string; // From Abonnement.tsx
  tokenBalance?: number; // From Abonnement.tsx
  tokenTotal?: number; // From Abonnement.tsx
}

// UserAddress is no longer needed as a separate type for the user profile.

export interface UserSettings {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  security: {
    twoFactorEnabled: boolean;
    twoFactorMethod?: 'sms' | 'app';
    lastPasswordChange?: string;
  };
  preferences: {
    theme?: 'light' | 'dark' | 'system';
    language?: 'fr' | 'en';
    currency?: 'USD' | 'CDF' | 'EUR';
  };
}

export interface Associate {
  id?: string;
  name: string;
  gender?: 'male' | 'female';
  role?: string;
  shares?: number;
  email?: string;
  phone?: string;
}

// Company types are now included here for cohesion
export interface Company {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  legalForm?: string;
  industry?: string;
  size?: string;
  website?: string;
  facebookPage?: string;

  // Legal & Tax Identifiers
  rccm?: string;
  taxId?: string;
  natId?: string;

  // Address (legacy format)
  address?: {
    street?: string;
    city?: string;
    commune?: string;
    province?: string;
    country?: string;
  };
  
  // Locations (new format with coordinates)
  locations?: {
    id: string;
    name: string;
    type: 'headquarters' | 'branch' | 'store' | 'warehouse' | 'factory' | 'other';
    address?: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  }[];

  // Contact Information
  contacts?: {
    email?: string;
    phone?: string;
    altPhone?: string;
  };

  // People
  owner?: {
    id: string;
    name: string;
    gender?: 'male' | 'female';
    email?: string;
    phone?: string;
    hasOtherJob?: boolean;
    cv?: string; // URL du CV sur Cloudinary
    linkedin?: string;
    facebook?: string;
  };
  associates?: Associate[];

  // Business Activities
  activities?: {
    primary?: string;
    secondary?: string[];
  };

  // Financial Information
  capital?: {
    isApplicable?: boolean;
    amount?: number;
    currency?: 'USD' | 'CDF' | 'EUR';
  };
  financials?: {
    revenue?: number;
    netIncome?: number;
    totalAssets?: number;
    equity?: number;
  };

  // Affiliations
  affiliations?: {
    cnss?: string;
    inpp?: string;
    onem?: string;
    intraCoop?: string;
    interCoop?: string;
    partners?: string[];
  };

  // Subscription details (as seen in the UI)
  subscription?: {
    plan?: {
      name: string;
    };
    status: 'active' | 'inactive' | 'pending' | 'expired';
    currentPeriodEnd?: string;
  };
}

// Schéma de validation Zod pour Company
export const companySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Le nom de l'entreprise doit contenir au moins 2 caractères."),
  logo: z.string().url().optional().or(z.literal('')),
  description: z.string().optional(),
  legalForm: z.string().optional(),
  industry: z.string().optional(),
  size: z.string().optional(),
  website: z.string().url("L'URL du site web est invalide.").optional().or(z.literal('')),
  facebookPage: z.string().url("L'URL de la page Facebook est invalide.").regex(/facebook\.com/, "L'URL doit être une page Facebook valide.").optional().or(z.literal('')),
  
  // Legal & Tax Identifiers
  rccm: z.string().optional(),
  taxId: z.string().optional(),
  natId: z.string().optional(),
  
  // Address
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    commune: z.string().optional(),
    province: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
  
  // Locations
  locations: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      type: z.enum(['headquarters', 'branch', 'store', 'warehouse', 'factory', 'other']),
      address: z.string().optional(),
      coordinates: z.object({
        lat: z.number(),
        lng: z.number(),
      }),
    })
  ).optional(),
  
  // Contacts
  contacts: z.object({
    email: z.string().email("L'adresse email est invalide.").optional().or(z.literal('')),
    phone: z.string().optional(),
    altPhone: z.string().optional(),
  }).optional(),
  
  // Owner
  owner: z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Le nom du dirigeant est requis."),
    gender: z.enum(['male', 'female']).optional(),
    email: z.string().email("L'email du dirigeant est invalide.").optional().or(z.literal('')),
    phone: z.string().optional(),
    hasOtherJob: z.boolean().optional(),
    cv: z.string().url().optional().or(z.literal('')),
    linkedin: z.string().url("L'URL LinkedIn est invalide.").regex(/linkedin\.com\/in\//, "L'URL LinkedIn doit être au format linkedin.com/in/...").optional().or(z.literal('')),
    facebook: z.string().url("L'URL Facebook est invalide.").regex(/facebook\.com/, "L'URL doit être un profil Facebook valide.").optional().or(z.literal('')),
  }).optional(),
  
  // Associates
  associates: z.array(
    z.object({
      id: z.string().optional(),
      name: z.string(),
      gender: z.enum(['male', 'female']).optional(),
      role: z.string().optional(),
      shares: z.number().min(0).max(100).optional(),
      email: z.string().email("L'email de l'associé est invalide.").optional().or(z.literal('')),
      phone: z.string().optional(),
    })
  ).optional(),
  
  // Activities
  activities: z.object({
    primary: z.string().optional(),
    secondary: z.array(z.string()).optional(),
  }).optional(),
  
  // Capital
  capital: z.object({
    isApplicable: z.boolean().optional(),
    amount: z.number().optional(),
    currency: z.enum(['USD', 'CDF', 'EUR']).optional(),
  }).optional(),
  
  // Affiliations
  affiliations: z.object({
    cnss: z.string().optional(),
    inpp: z.string().optional(),
    onem: z.string().optional(),
    intraCoop: z.string().optional(),
    interCoop: z.string().optional(),
    partners: z.array(z.string()).optional(),
  }).optional(),
});

// Clean up old, unused types
// export interface Plan { ... }
// export interface Subscription { ... }
// export interface Invoice { ... }
// export interface TokenPurchase { ... }
// export interface Payment { ... }

// --- NEW TYPES BASED ON UI --- //

/**
 * Details for processing a payment, from the form in Abonnement.tsx.
 */
export interface PaymentDetails {
  paymentMethod: 'card' | 'mobile' | 'manual';
  amount?: number | string; // For token recharges
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  mobileMoneyNumber?: string;
  mobileMoneyProvider?: string;
  transactionId?: string; // For manual proof
  proofScreenshot?: File | null; // For manual proof
}

/**
 * Represents a record in the payment history table in Abonnement.tsx.
 */
export interface PaymentRecord {
  id: string;
  date: string;
  amount: number;
  method: string;
  plan: string;
  status: 'Payé' | 'En attente' | 'Échoué';
  receiptUrl?: string;
}

/**
 * Aggregates all data needed for the Abonnement page.
 */
export interface SubscriptionData {
  id: string;
  userId: string;
  currentPlan: string;
  tokenBalance: number;
  tokenTotal: number;
  paymentHistory: PaymentRecord[];
}

/**
 * Represents a pricing plan as defined in the UI.
 */
export interface PricingPlan {
    name: string;
    description: string;
    price: string;
    features: string[];
    highlighted?: boolean;
    demo?: boolean;
    tokenPrice?: string;
    tokenAmount?: string;
}
