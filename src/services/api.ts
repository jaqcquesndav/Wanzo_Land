import { getToken } from '../utils/storage';

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.ksuit.app/v1';

/**
 * Generic API service for handling HTTP requests.
 */
class ApiService {
  private getAuthHeaders(isFormData = false): HeadersInit {
    const token = getToken(); // Assumes getToken retrieves the stored JWT
    const headers: HeadersInit = {};

    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }
    headers['Accept'] = 'application/json';

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorData: ApiError;
      try {
        const res = await response.json();
        errorData = {
          status: response.status,
          message: res.message || 'An unknown error occurred.',
          errors: res.errors,
        };
      } catch (e) {
        errorData = { status: response.status, message: response.statusText };
      }
      throw errorData;
    }

    if (response.status === 204) { // No Content
      return {} as T;
    }

    return response.json();
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    if (params) {
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    }
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<T>(response);
  }

  async patch<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<T>(response);
  }

  async upload<T>(endpoint: string, file: File, fieldName = 'file'): Promise<T> {
    const formData = new FormData();
    formData.append(fieldName, file);

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: this.getAuthHeaders(true), // isFormData = true
      body: formData,
    });

    return this.handleResponse<T>(response);
  }
}

export const apiService = new ApiService();
