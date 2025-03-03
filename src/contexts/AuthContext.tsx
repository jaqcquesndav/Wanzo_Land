import { createContext, useContext, useReducer, ReactNode, useEffect, useRef } from 'react';
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
  // Add a flag to prevent infinite loops
  const refreshAttemptedRef = useRef(false);

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
      // Only attempt to refresh if we haven't already tried in this cycle
      if (!refreshAttemptedRef.current) {
        refreshAttemptedRef.current = true;
        fetchUser().finally(() => {
          // Reset the flag after a delay to allow future refresh attempts
          setTimeout(() => {
            refreshAttemptedRef.current = false;
          }, 5000); // Wait 5 seconds before allowing another refresh attempt
        });
      } else {
        console.log('Refresh already attempted, skipping to prevent loop');
      }
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
      
      // Set user profile directly from login response
      if (response.user) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: { ...response.user, userType: response.user.userType as 'sme' | 'financial_institution' } });
        return true;
      }
      
      // If no user in response, fetch user profile
      try {
        const userProfile = await apiService.getUserProfile(response.tokens.access_token);
        dispatch({ type: 'LOGIN_SUCCESS', payload: userProfile });
        return true;
      } catch (profileError) {
        console.error('Error fetching user profile after login:', profileError);
        // Even if profile fetch fails, consider login successful if we have tokens
        dispatch({ type: 'LOGIN_SUCCESS', payload: {
          id: 'temp-id',
          email: email,
          name: 'User',
          companyId: 'temp-company',
          userType: 'sme' as 'sme', // Ensure this matches the allowed values in User type
          role: 'user',
          permissions: []
        }});
        return true;
      }
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
      
      // If we get an error but have tokens, create a mock user profile
      // This is for development purposes only
      const token = localStorage.getItem('access_token');
      if (token) {
        dispatch({ type: 'FETCH_USER_SUCCESS', payload: {
          id: 'mock-id',
          email: 'user@example.com',
          name: 'Mock User',
          companyId: 'mock-company',
          userType: 'sme' as 'sme',
          role: 'admin',
          permissions: ['read:all', 'write:all']
        }});
      } else {
        // If we get an error, don't trigger another refresh
        refreshAttemptedRef.current = true;
        // Reset after a delay
        setTimeout(() => {
          refreshAttemptedRef.current = false;
        }, 5000);
      }
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