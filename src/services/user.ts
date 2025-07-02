import { User } from '../types/user';
import api from './api';

/**
 * Délai maximal pour les requêtes API (en ms)
 */
const API_TIMEOUT = 10000;

class UserService {
  /**
   * Récupère le profil de l'utilisateur connecté.
   * Combine les données d'Auth0 (localStorage) avec les données du backend.
   * Garantit qu'un échec de l'API ne bloque pas l'accès aux fonctionnalités.
   */
  async getProfile(): Promise<User> {
    // Récupérer immédiatement les données Auth0 du localStorage
    const storedAuth0User = localStorage.getItem('auth0_user');
    const auth0User = storedAuth0User ? JSON.parse(storedAuth0User) : {};
    
    // Construire un utilisateur de base à partir des données Auth0
    const baseUser: User = {
      id: auth0User.sub || auth0User.id || `local-${Date.now()}`,
      email: auth0User.email || 'N/A',
      name: auth0User.name || auth0User.nickname || auth0User.email || 'Utilisateur',
      picture: auth0User.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(auth0User.name || auth0User.email || 'U')}`,
      phone: auth0User.phone || 'N/A',
      address: auth0User.address || 'N/A',
      role: (auth0User.roles && auth0User.roles[0]) || auth0User['https://ksuit.app/roles']?.[0] || '',
      idNumber: auth0User.idNumber || 'N/A',
      idStatus: auth0User.idStatus || undefined,
      createdAt: auth0User.updated_at || new Date().toISOString(),
    };
    
    // Vérifier si nous avons un token d'accès pour appeler le backend
    const token = localStorage.getItem('auth0_token');
    if (!token) {
      console.log('Pas de token disponible, utilisation des données Auth0 uniquement');
      return baseUser;
    }
    
    try {
      // Créer une promesse avec timeout pour éviter de bloquer l'UI
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Timeout')), API_TIMEOUT);
      });
      
      // Tenter de récupérer les données enrichies du backend avec timeout
      const backendUserPromise = api.get<User>('/users/me');
      const backendUser = await Promise.race([backendUserPromise, timeoutPromise]) as User;
      
      console.log('Profil enrichi depuis le backend:', backendUser);
      
      // Vérifier si l'image du profil existe et est valide
      if (backendUser.picture) {
        try {
          // Vérifier si l'URL est valide
          new URL(backendUser.picture);
        } catch (e) {
          console.warn('URL de profil invalide dans les données backend, utilisation de Auth0', e);
          backendUser.picture = auth0User.picture || '';
        }
      }
      
      // Si le backend ne fournit pas de photo mais Auth0 oui, utiliser celle d'Auth0
      if (!backendUser.picture && auth0User.picture) {
        backendUser.picture = auth0User.picture;
      }
      
      // Fusionner les données avec priorité au backend pour la plupart des champs
      // mais en gardant certaines données Auth0 comme fallback
      const mergedUser = { 
        ...baseUser, 
        ...backendUser,
        // S'assurer que des champs critiques ne sont pas perdus ou vides
        id: backendUser.id || baseUser.id,
        name: backendUser.name || baseUser.name,
        email: backendUser.email || baseUser.email,
        picture: backendUser.picture || baseUser.picture,
        // S'assurer que le role est correctement extrait
        role: backendUser.role || baseUser.role
      };
      
      // Mettre à jour le localStorage avec les données fusionnées
      localStorage.setItem('auth0_user', JSON.stringify(mergedUser));
      
      return mergedUser;
    } catch (error) {
      console.warn('Backend user profile fetch failed. Using Auth0 data only.', error);
      // En cas d'erreur, on retourne quand même les données Auth0 pour ne pas bloquer l'app
      return baseUser;
    }
  }

  /**
   * Met à jour le profil de l'utilisateur.
   * Sauvegarde en localStorage et tente d'envoyer au backend si connecté.
   * @param data - Les données de l'utilisateur à mettre à jour.
   */
  async updateProfile(data: Partial<User>): Promise<User> {
    console.log('Updating profile with:', data);
    
    // Sauvegarde locale d'abord (toujours disponible)
    const stored = localStorage.getItem('auth0_user');
    const currentUser = stored ? JSON.parse(stored) : {};
    const updatedUser = { ...currentUser, ...data };
    
    // S'assurer que les champs essentiels ne sont pas écrasés par des valeurs undefined
    if (data.picture === undefined && currentUser.picture) {
      updatedUser.picture = currentUser.picture;
    }
    if (data.name === undefined && currentUser.name) {
      updatedUser.name = currentUser.name;
    }
    
    // Sauvegarder en localStorage pour une disponibilité immédiate dans le Header
    localStorage.setItem('auth0_user', JSON.stringify(updatedUser));
    
    // Tenter d'envoyer au backend si connecté
    try {
      const token = localStorage.getItem('auth0_token');
      if (token) {
        // Créer une promesse avec timeout pour éviter de bloquer l'UI
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error('Timeout')), API_TIMEOUT);
        });
        
        // Tenter d'envoyer au backend avec timeout
        const backendPromise = api.patch<User>('/users/me', data);
        const backendResponse = await Promise.race([backendPromise, timeoutPromise]) as User;
        
        console.log('Profile updated on backend:', backendResponse);
        
        // Fusion des données du backend avec les données locales
        const finalUser = { 
          ...updatedUser, 
          ...backendResponse,
          // S'assurer que les champs importants ne sont pas perdus
          name: backendResponse.name || updatedUser.name,
          picture: backendResponse.picture || updatedUser.picture,
          email: backendResponse.email || updatedUser.email
        };
        
        // Mettre à jour le localStorage avec les données finales
        localStorage.setItem('auth0_user', JSON.stringify(finalUser));
        
        // On retourne les données du backend qui sont plus à jour
        return finalUser;
      }
    } catch (error) {
      console.error('Failed to update profile on backend:', error);
      // En cas d'erreur, on continue avec les données locales
    }
    
    // Retourner les données locales mises à jour
    return updatedUser as User;
  }

  /**
   * Télécharge une nouvelle photo de profil.
   * Sauvegarde en localStorage et tente d'envoyer au backend si connecté.
   * @param photoFile - Le fichier image à télécharger.
   */
  async uploadProfilePhoto(photoFile: File): Promise<{ url: string }> {
    console.log('Uploading photo:', photoFile.name);
    
    // Lecture locale du fichier pour prévisualisation
    const url = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target && typeof event.target.result === 'string') {
          resolve(event.target.result);
        }
      };
      reader.readAsDataURL(photoFile);
    });
    
    // Mise à jour du localStorage
    const stored = localStorage.getItem('auth0_user');
    const currentUser = stored ? JSON.parse(stored) : {};
    currentUser.picture = url;
    localStorage.setItem('auth0_user', JSON.stringify(currentUser));
    
    // Tenter d'envoyer au backend si connecté
    try {
      const token = localStorage.getItem('auth0_token');
      if (token) {
        // Préparer les données de formulaire
        const formData = new FormData();
        formData.append('profilePhoto', photoFile);
        
        // Créer une promesse avec timeout pour éviter de bloquer l'UI
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error('Timeout')), API_TIMEOUT * 2); // Plus long pour l'upload de fichier
        });
        
        // Envoyer au backend avec un timeout
        const uploadPromise = api.postFormData<{ url: string }>('/users/me/photo', formData);
        const response = await Promise.race([uploadPromise, timeoutPromise]) as { url: string };
        
        console.log('Photo uploaded to backend:', response);
        
        // Mettre à jour le localStorage avec l'URL du backend
        const updatedStoredData = localStorage.getItem('auth0_user');
        const updatedUser = updatedStoredData ? JSON.parse(updatedStoredData) : currentUser;
        updatedUser.picture = response.url;
        localStorage.setItem('auth0_user', JSON.stringify(updatedUser));
        
        return response;
      }
    } catch (error) {
      console.error('Failed to upload photo to backend:', error);
      // En cas d'erreur, on continue avec la version locale
    }
    
    // Retourner l'URL de prévisualisation locale
    return { url };
  }
}

export const userService = new UserService();
