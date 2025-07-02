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

  // Legal & Tax Identifiers
  rccm?: string;
  taxId?: string;
  natId?: string;

  // Address
  address?: {
    street?: string;
    city?: string;
    commune?: string;
    province?: string;
    country?: string;
  };

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
    email?: string;
    phone?: string;
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
