import { User } from '../types/user';
import { apiService } from './api';

class UserService {
  /**
   * Récupère le profil de l'utilisateur connecté.
   * Combine les données d'Auth0 (localStorage) avec les données du backend.
   */
  async getProfile(): Promise<User> {
    const storedAuth0User = localStorage.getItem('auth0_user');
    const auth0User = storedAuth0User ? JSON.parse(storedAuth0User) : {};

    try {
      // In a real app, this would fetch from the backend.
      const backendUser = await apiService.get<User>('/users/me');
      return { ...auth0User, ...backendUser };
    } catch (error) {
      console.warn('Backend user profile fetch failed. Falling back to local data.', error);
      // Fallback to localStorage data, which is what the current Profile.tsx does.
      return {
        id: auth0User.sub || `local-${Date.now()}`,
        email: auth0User.email || '',
        name: auth0User.name || '',
        picture: auth0User.picture || '',
        phone: auth0User.phone || '',
        address: auth0User.address || '',
        role: (auth0User.roles && auth0User.roles[0]) || auth0User['https://ksuit.app/roles']?.[0] || '',
        idNumber: auth0User.idNumber || '',
        idStatus: auth0User.idStatus || '',
        createdAt: auth0User.updated_at || new Date().toISOString(),
      } as User;
    }
  }

  /**
   * Met à jour le profil de l'utilisateur (simulation).
   * @param data - Les données de l'utilisateur à mettre à jour.
   */
  async updateProfile(data: Partial<User>): Promise<User> {
    console.log('Updating profile with:', data);
    // In a real app: return apiService.patch<User>('/users/me', data);
    return new Promise(resolve => {
      setTimeout(() => {
        const stored = localStorage.getItem('auth0_user');
        const currentUser = stored ? JSON.parse(stored) : {};
        const updatedUser = { ...currentUser, ...data };
        localStorage.setItem('auth0_user', JSON.stringify(updatedUser));
        resolve(updatedUser as User);
      }, 500);
    });
  }

  /**
   * Télécharge une nouvelle photo de profil (simulation).
   * @param photoFile - Le fichier image à télécharger.
   */
  async uploadProfilePhoto(photoFile: File): Promise<{ url: string }> {
    console.log('Uploading photo:', photoFile.name);
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
            if (event.target && typeof event.target.result === 'string') {
                const url = event.target.result;
                const stored = localStorage.getItem('auth0_user');
                const currentUser = stored ? JSON.parse(stored) : {};
                currentUser.picture = url;
                localStorage.setItem('auth0_user', JSON.stringify(currentUser));
                resolve({ url });
            }
        };
        reader.readAsDataURL(photoFile);
    });
  }
}

export const userService = new UserService();
