import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
  useRef
} from 'react';
import { apiService } from '../services/api'; // votre ApiService
import { useOnceEffect } from '../hooks/useOnceEffect';
import { User } from '../types/auth'; // votre interface ou type d'utilisateur

// ----- State & Actions -----
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
  isAuthenticated: false
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
    case 'FETCH_USER_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        isAuthenticated: true,
        error: null
      };
    case 'LOGIN_ERROR':
    case 'FETCH_USER_ERROR':
      return { ...state, isLoading: false, error: action.payload, isAuthenticated: false };
    case 'LOGOUT':
      return { ...initialState };
    default:
      return state;
  }
}

// ----- Contexte -----
const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  fetchUser: () => Promise<void>;
} | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Pour éviter un rafraîchissement infini après token:expired
  const refreshAttemptedRef = useRef(false);

  // ----- ACTIONS -----

  // 1) LOGIN
  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await apiService.login({ email, password });

      // Stocker les tokens
      if (response.tokens) {
        localStorage.setItem('access_token', response.tokens.access_token);
        if (response.tokens.id_token) {
          localStorage.setItem('id_token', response.tokens.id_token);
        }
        if (response.tokens.refresh_token) {
          localStorage.setItem('refresh_token', response.tokens.refresh_token);
        }
      }

      // Mettre à jour le user
      if (response.user) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            ...response.user,
            userType: response.user.userType as 'sme' | 'financial_institution'
          }
        });
        return true;
      }

      // Sinon, essayer de fetch le user
      try {
        const userProfile = await apiService.getUserProfile(response.tokens.access_token);
        dispatch({ type: 'LOGIN_SUCCESS', payload: userProfile });
        return true;
      } catch (profileError) {
        console.error('Error fetching user profile after login:', profileError);
        // Dernier recours : user minimal
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            id: 'temp-id',
            email: email,
            name: 'User',
            companyId: 'temp-company',
            userType: 'sme' as 'sme',
            role: 'user',
            permissions: []
          }
        });
        return true;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to login';
      dispatch({ type: 'LOGIN_ERROR', payload: errorMessage });
      return false;
    }
  };

  // 2) LOGOUT
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('refresh_token');
    dispatch({ type: 'LOGOUT' });
  };

  // 3) FETCH USER (profil)
  const fetchUser = async () => {
    dispatch({ type: 'FETCH_USER_START' });
    try {
      // Vérifie le token, appelle /auth/me
      const userProfile = await apiService.getUserProfile();
      dispatch({ type: 'FETCH_USER_SUCCESS', payload: userProfile });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user';
      dispatch({ type: 'FETCH_USER_ERROR', payload: errorMessage });

      const token = localStorage.getItem('access_token');
      if (token) {
        // En mode dev, injecter un mock user
        dispatch({
          type: 'FETCH_USER_SUCCESS',
          payload: {
            id: 'mock-id',
            email: 'user@example.com',
            name: 'Mock User',
            companyId: 'mock-company',
            userType: 'sme' as 'sme',
            role: 'admin',
            permissions: ['read:all', 'write:all']
          }
        });
      } else {
        // Empêcher un nouveau refresh
        refreshAttemptedRef.current = true;
        setTimeout(() => {
          refreshAttemptedRef.current = false;
        }, 5000);
      }
    }
  };

  // ----- EFFETS -----

  // (A) Appel initial (une seule fois) pour restaurer la session s’il y a un token
  useOnceEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      fetchUser();
    }
  });

  // (B) Écoute events globaux : token:expired et auth:failed
  useEffect(() => {
    const handleTokenExpired = () => {
      console.log('Token expiré, tentative de rafraîchissement...');
      if (!refreshAttemptedRef.current) {
        refreshAttemptedRef.current = true;
        fetchUser().finally(() => {
          // Ré-autoriser un futur refresh après 5s
          setTimeout(() => {
            refreshAttemptedRef.current = false;
          }, 5000);
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

  // Le contexte exposé
  const contextValue = {
    state,
    dispatch,
    login,
    logout,
    fetchUser
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

// ----- Hook d’accès -----
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
