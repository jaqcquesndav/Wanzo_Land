export type UserType = 'sme' | 'financial_institution';

export interface AppConfig {
  clientId: string;
  audience: string;
  domain: string;
  logoutRedirect: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  id_token?: string;
  expires_in: number;
}