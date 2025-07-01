import { useState, useEffect, useCallback } from 'react';
import { User } from '../types/user';
import { userService } from '../services/user';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour charger le profil utilisateur
  const loadUserProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await userService.getProfile();
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement du profil');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Charger le profil au montage du composant
  useEffect(() => {
    loadUserProfile();
  }, [loadUserProfile]);

  // Fonction pour mettre à jour le profil utilisateur
  const updateUserProfile = async (userData: Partial<User>) => {
    setIsUpdating(true);
    setError(null);
    try {
      const updatedUser = await userService.updateProfile(userData);
      setUser(updatedUser);
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
    isLoading,
    isUpdating,
    error,
    loadUserProfile,
    updateUserProfile,
    uploadProfilePhoto,
  };
}
