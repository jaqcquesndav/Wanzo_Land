import { useState, useEffect, useCallback, useRef } from 'react';
import { User } from '../types/user';
import { userService } from '../services/user';

// Constantes pour les tentatives de récupération
const MAX_RETRIES = 2;
const RETRY_DELAY = 3000; // 3 secondes

// Créer un événement personnalisé pour notifier les changements d'authentification
export const AUTH_EVENT = 'auth_state_changed';

// Fonction utilitaire pour déclencher l'événement d'authentification
export function notifyAuthChange() {
  const event = new CustomEvent(AUTH_EVENT);
  window.dispatchEvent(event);
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isEnrichingData, setIsEnrichingData] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState(0);
  const userInitialized = useRef(false);

  // Fonction pour initialiser l'utilisateur avec les données Auth0
  const initializeUserFromAuth0 = useCallback(() => {
    const token = localStorage.getItem('auth0_token');
    const auth0UserData = localStorage.getItem('auth0_user');
    
    const isTokenValid = !!token;
    setIsAuthenticated(isTokenValid);
    
    // Initialiser immédiatement avec les données Auth0 si disponibles
    if (auth0UserData) {
      try {
        const auth0User = JSON.parse(auth0UserData);
        // Vérifier que les champs essentiels sont présents
        const userWithDefaults = {
          ...auth0User,
          // Mapper l'identifiant Auth0 vers notre champ id
          id: auth0User.sub || auth0User.id || '',
          // Garantir que ces champs existent toujours
          name: auth0User.name || auth0User.nickname || auth0User.email || 'Utilisateur',
          email: auth0User.email || 'N/A',
          picture: auth0User.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(auth0User.name || auth0User.email || 'U')}`,
        };
        setUser(userWithDefaults);
        return userWithDefaults;
      } catch (e) {
        console.error('Erreur lors de la lecture des données Auth0 du localStorage', e);
        return null;
      }
    }
    return null;
  }, []);

  // Initialisation des données utilisateur au démarrage
  useEffect(() => {
    const userData = initializeUserFromAuth0();
    if (userData) {
      console.log('Utilisateur initialisé avec données Auth0:', userData.name);
      userInitialized.current = true;
    }
  }, [initializeUserFromAuth0]);

  // Écouter les changements d'authentification
  useEffect(() => {
    const handleAuthChange = () => {
      console.log("Changement d'état d'authentification détecté");
      syncProfileAfterLogin();
    };
    
    // Ajouter l'écouteur d'événements
    window.addEventListener(AUTH_EVENT, handleAuthChange);
    
    // Nettoyer
    return () => {
      window.removeEventListener(AUTH_EVENT, handleAuthChange);
    };
  }, []);

  // Fonction pour charger le profil utilisateur enrichi depuis le backend avec retry
  const loadUserProfile = useCallback(async (retry = false) => {
    // Si on n'est pas déjà en train d'enrichir et qu'on a atteint le max de retries, on arrête
    if (isEnrichingData || (!retry && retryCount >= MAX_RETRIES)) return null;
    
    setIsEnrichingData(true);
    setError(null);
    
    try {
      const userData = await userService.getProfile();
      // Fusionner les données Auth0 avec les données backend
      const mergedUser = {
        ...user, // Conserver les données Auth0 comme base
        ...userData, // Ajouter les données du backend
        // Préserver certaines propriétés importantes d'Auth0 si elles sont présentes et non vides
        name: userData.name || user?.name || 'N/A',
        picture: userData.picture || user?.picture,
        email: userData.email || user?.email || 'N/A',
      };
      setUser(mergedUser);
      setRetryCount(0); // Réinitialiser le compteur de tentatives
      return mergedUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement du profil enrichi');
      console.warn('Erreur lors de l\'enrichissement des données utilisateur:', err);
      
      // Si c'est une tentative de retry, incrémenter le compteur
      if (retry) {
        setRetryCount(prev => prev + 1);
      }
      
      // On ne modifie pas l'utilisateur en cas d'erreur, on garde les données Auth0
      return null;
    } finally {
      setIsEnrichingData(false);
    }
  }, [user, isEnrichingData, retryCount]);

  // Enrichir les données depuis le backend si l'utilisateur est authentifié
  useEffect(() => {
    if (isAuthenticated && !isEnrichingData) {
      loadUserProfile();
    }
  }, [isAuthenticated, loadUserProfile, isEnrichingData]);

  // Système de retry automatique en cas d'échec
  useEffect(() => {
    if (error && retryCount < MAX_RETRIES) {
      const retryTimer = setTimeout(() => {
        console.log(`Tentative de récupération des données utilisateur (${retryCount + 1}/${MAX_RETRIES})...`);
        loadUserProfile(true);
      }, RETRY_DELAY);
      
      return () => clearTimeout(retryTimer);
    }
  }, [error, retryCount, loadUserProfile]);

  // Fonction pour synchroniser le profil après la connexion à Auth0
  const syncProfileAfterLogin = useCallback(async () => {
    console.log('Synchronisation du profil après connexion Auth0');
    // Réinitialiser l'état d'authentification basé sur le token
    const token = localStorage.getItem('auth0_token');
    setIsAuthenticated(!!token);
    
    // Réinitialiser l'utilisateur à partir des données Auth0 locales
    const auth0User = initializeUserFromAuth0();
    
    if (auth0User && token) {
      // Forcer un chargement immédiat du profil depuis le backend
      return await loadUserProfile();
    }
    
    return auth0User;
  }, [initializeUserFromAuth0, loadUserProfile]);

  // Fonction pour mettre à jour le profil utilisateur
  const updateUserProfile = async (userData: Partial<User>) => {
    setIsUpdating(true);
    setError(null);
    try {
      const updatedUser = await userService.updateProfile(userData);
      setUser(prev => ({
        ...prev,
        ...updatedUser,
        // Garantir la conservation des données critiques
        name: updatedUser.name || prev?.name || 'N/A',
        email: updatedUser.email || prev?.email || 'N/A',
        picture: updatedUser.picture || prev?.picture
      }));
      return updatedUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour du profil');
      return null;
    } finally {
      setIsUpdating(false);
    }
  };

  // Fonction pour mettre à jour la photo de profil
  const uploadProfilePhoto = async (file: File) => {
    setIsUpdating(true);
    setError(null);
    try {
      const result = await userService.uploadProfilePhoto(file);
      setUser(prev => (prev ? { ...prev, picture: result.url } : null));
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour de la photo de profil');
      return null;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    user,
    isLoading: false, // Toujours false car nous n'avons plus de chargement initial bloquant
    isUpdating,
    isEnrichingData,
    error,
    isAuthenticated,
    loadUserProfile,
    updateUserProfile,
    uploadProfilePhoto,
    syncProfileAfterLogin, // Exposer la nouvelle fonction
  };
}
