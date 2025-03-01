import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { User } from '../types/auth';
import { apiService } from '../services/api';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'FETCH_USER_START' }
  | { type: 'FETCH_USER_SUCCESS'; payload: User }
  | { type: 'FETCH_USER_ERROR'; payload: string };

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  fetchUser: () => Promise<void>;
} | undefined>(undefined);

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
    case 'FETCH_USER_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
    case 'FETCH_USER_SUCCESS':
      return { ...state, isLoading: false, user: action.payload, isAuthenticated: true, error: null };
    case 'LOGIN_ERROR':
    case 'FETCH_USER_ERROR':
      return { ...state, isLoading: false, error: action.payload, isAuthenticated: false };
    case 'LOGOUT':
      return { ...initialState };
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is authenticated on mount
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      fetchUser();
    }
  }, []);

  // Listen for token expiration events
  useEffect(() => {
    const handleTokenExpired = () => {
      console.log('Token expiré, tentative de rafraîchissement...');
      fetchUser();
    };

    const handleAuthFailed = () => {
      console.log('Authentification échouée, déconnexion...');
      logout();
    };

    window.addEventListener('token:expired', handleTokenExpired);
    window.addEventListener('auth:failed', handleAuthFailed);

    return () => {
      window.removeEventListener('token:expired', handleTokenExpired);
      window.removeEventListener('auth:failed', handleAuthFailed);
    };
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await apiService.login({ email, password });
      
      // Store tokens
      if (response.tokens) {
        localStorage.setItem('access_token', response.tokens.access_token);
        if (response.tokens.id_token) {
          localStorage.setItem('id_token', response.tokens.id_token);
        }
        if (response.tokens.refresh_token) {
          localStorage.setItem('refresh_token', response.tokens.refresh_token);
        }
      }
      
      // Fetch user profile
      const userProfile = await apiService.getUserProfile(response.tokens.access_token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: userProfile });
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to login';
      dispatch({ type: 'LOGIN_ERROR', payload: errorMessage });
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('refresh_token');
    dispatch({ type: 'LOGOUT' });
  };

  // Fetch user profile
  const fetchUser = async () => {
    dispatch({ type: 'FETCH_USER_START' });
    try {
      const userProfile = await apiService.getUserProfile();
      dispatch({ type: 'FETCH_USER_SUCCESS', payload: userProfile });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user';
      dispatch({ type: 'FETCH_USER_ERROR', payload: errorMessage });
    }
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, login, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}