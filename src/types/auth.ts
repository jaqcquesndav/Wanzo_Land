import { UserType } from './common';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Subscription {
  id: string;
  status: 'active' | 'expired' | 'cancelled' | 'trial';
  plan: string;
  startDate: string;
  endDate: string;
  features: string[];
  allowedApps: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  companyId: string;
  userType: UserType;
  role: string;
  permissions: string[];
  subscription?: Subscription;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isOffline: boolean;
}

export interface Company {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  industry?: string;
  subscription?: Subscription;
  createdAt?: string;
  updatedAt?: string;
}

export type { UserType };
