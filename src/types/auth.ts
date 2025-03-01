export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  companyId: string;
  userType: 'sme' | 'financial_institution';
  role: string;
  permissions: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface Company {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  industry?: string;
  createdAt?: string;
  updatedAt?: string;
}