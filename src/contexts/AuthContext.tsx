import { createContext, useContext, useReducer, ReactNode } from 'react';
import { apiService } from '../services/api';
import { useOnceEffect } from '../hooks/useOnceEffect';
import { User, AuthState } from '../types/auth';
import { UserType } from '../types/common';

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'FETCH_USER_START' }
  | { type: 'FETCH_USER_SUCCESS'; payload: User }
  | { type: 'FETCH_USER_ERROR'; payload: string }
  | { type: 'SET_OFFLINE'; payload: boolean };

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isOffline: false
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
      return { 
        ...state, 
        isLoading: false, 
        error: action.payload,
        // Ne pas déconnecter si offline
        isAuthenticated: state.isOffline ? state.isAuthenticated : false 
      };
    case 'LOGOUT':
      return { ...initialState };
    case 'SET_OFFLINE':
      return { ...state, isOffline: action.payload };
    default:
      return state;
  }
}

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  fetchUser: () => Promise<void>;
} | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Détecter l'état de la connexion
  useOnceEffect(() => {
    const updateOnlineStatus = () => {
      dispatch({ type: 'SET_OFFLINE', payload: !navigator.onLine });
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  });

  // Restaurer la session au démarrage
  useOnceEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      fetchUser();
    }
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await apiService.login({ email, password });

      if (response.tokens) {
        localStorage.setItem('access_token', response.tokens.access_token);
        if (response.tokens.refresh_token) {
          localStorage.setItem('refresh_token', response.tokens.refresh_token);
        }
      }

      if (response.user) {
        dispatch({ 
          type: 'LOGIN_SUCCESS', 
          payload: { ...response.user, userType: response.user.userType as UserType } 
        });
        return true;
      }

      const userProfile = await apiService.getUserProfile();
      dispatch({ type: 'LOGIN_SUCCESS', payload: userProfile });
      return true;
    } catch (error) {
      if (state.isOffline) {
        // En mode hors ligne, on restaure les données du localStorage
        const cachedUser = localStorage.getItem('cached_user');
        if (cachedUser) {
          const user = JSON.parse(cachedUser);
          dispatch({ type: 'LOGIN_SUCCESS', payload: user });
          return true;
        }
      }

      const errorMessage = error instanceof Error ? error.message : 'Failed to login';
      dispatch({ type: 'LOGIN_ERROR', payload: errorMessage });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('cached_user');
    dispatch({ type: 'LOGOUT' });
  };

  const fetchUser = async () => {
    dispatch({ type: 'FETCH_USER_START' });
    try {
      const userProfile = await apiService.getUserProfile();
      
      // Mettre en cache pour le mode hors ligne
      localStorage.setItem('cached_user', JSON.stringify(userProfile));
      
      dispatch({ type: 'FETCH_USER_SUCCESS', payload: userProfile });
    } catch (error) {
      if (state.isOffline) {
        // En mode hors ligne, utiliser les données en cache
        const cachedUser = localStorage.getItem('cached_user');
        if (cachedUser) {
          dispatch({ 
            type: 'FETCH_USER_SUCCESS', 
            payload: JSON.parse(cachedUser)
          });
          return;
        }
      }

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
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}