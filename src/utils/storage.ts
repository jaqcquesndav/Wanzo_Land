// Clés de stockage sécurisées
const STORAGE_KEYS = {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
    USER: 'cached_user',
    STATE: 'auth_state',
    CODE_VERIFIER: 'code_verifier',
    USER_TYPE: 'auth_user_type',
    APP_ID: 'auth_app_id',
    RETURN_TO: 'auth_return_to',
  } as const;
  
  // Wrapper sécurisé pour localStorage
  export const secureStorage = {
    // Stockage avec encryption si nécessaire
    setItem(key: keyof typeof STORAGE_KEYS, value: string) {
      try {
        localStorage.setItem(STORAGE_KEYS[key], value);
      } catch (error) {
        console.error(`Error storing ${key}:`, error);
      }
    },
  
    // Récupération avec décryption si nécessaire  
    getItem(key: keyof typeof STORAGE_KEYS): string | null {
      try {
        return localStorage.getItem(STORAGE_KEYS[key]);
      } catch (error) {
        console.error(`Error retrieving ${key}:`, error);
        return null;
      }
    },
  
    // Suppression sécurisée
    removeItem(key: keyof typeof STORAGE_KEYS) {
      try {
        localStorage.removeItem(STORAGE_KEYS[key]);
      } catch (error) {
        console.error(`Error removing ${key}:`, error);
      }
    },
  
    // Nettoyage complet
    clear() {
      try {
        Object.values(STORAGE_KEYS).forEach(key => {
          localStorage.removeItem(key);
        });
      } catch (error) {
        console.error('Error clearing storage:', error);
      }
    }
  };
  
  // Session storage sécurisé
  export const secureSessionStorage = {
    setItem(key: keyof typeof STORAGE_KEYS, value: string) {
      try {
        sessionStorage.setItem(STORAGE_KEYS[key], value);
      } catch (error) {
        console.error(`Error storing ${key} in session:`, error);
      }
    },
  
    getItem(key: keyof typeof STORAGE_KEYS): string | null {
      try {
        return sessionStorage.getItem(STORAGE_KEYS[key]);
      } catch (error) {
        console.error(`Error retrieving ${key} from session:`, error);
        return null;
      }
    },
  
    removeItem(key: keyof typeof STORAGE_KEYS) {
      try {
        sessionStorage.removeItem(STORAGE_KEYS[key]);
      } catch (error) {
        console.error(`Error removing ${key} from session:`, error);
      }
    },
  
    clear() {
      try {
        sessionStorage.clear();
      } catch (error) {
        console.error('Error clearing session storage:', error);
      }
    }
  };

  export function getToken(): string | null {
    return secureStorage.getItem('ACCESS_TOKEN');
  }