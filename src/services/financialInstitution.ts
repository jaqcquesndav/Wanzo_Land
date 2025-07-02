import { FinancialInstitution } from '@/types/financialInstitution';
import api from './api';

export type CreateFinancialInstitution = Omit<FinancialInstitution, 'id' | 'createdAt' | 'updatedAt'>;

const BASE_URL = '/financial-institutions';

/**
 * Récupère les données d'une institution financière par son ID.
 * @param institutionId - L'ID de l'institution financière.
 * @returns Les données de l'institution financière.
 */
export const getFinancialInstitution = async (institutionId: string): Promise<FinancialInstitution> => {
  return api.get<FinancialInstitution>(`${BASE_URL}/${institutionId}`);
};

/**
 * Crée une nouvelle institution financière.
 * @param institutionData - Les données de l'institution à créer.
 * @returns La nouvelle institution financière créée.
 */
export const createFinancialInstitution = async (institutionData: CreateFinancialInstitution): Promise<FinancialInstitution> => {
  return api.post<FinancialInstitution>(BASE_URL, institutionData);
};

/**
 * Met à jour les données d'une institution financière.
 * @param institutionId - L'ID de l'institution à mettre à jour.
 * @param updates - Les champs à mettre à jour.
 * @returns L'institution financière mise à jour.
 */
export const updateFinancialInstitution = async (institutionId: string, updates: Partial<FinancialInstitution>): Promise<FinancialInstitution> => {
  return api.patch<FinancialInstitution>(`${BASE_URL}/${institutionId}`, updates);
};

/**
 * Supprime une institution financière.
 * @param institutionId - L'ID de l'institution à supprimer.
 */
export const deleteFinancialInstitution = async (institutionId: string): Promise<void> => {
  await api.delete(`${BASE_URL}/${institutionId}`);
};

/**
 * Uploade le logo d'une institution financière.
 * @param institutionId - L'ID de l'institution.
 * @param logoFile - Le fichier du logo à uploader.
 * @returns L'URL du logo uploadé.
 */
export const uploadInstitutionLogo = async (institutionId: string, logoFile: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('file', logoFile);
    formData.append('institutionId', institutionId);

    // Utiliser la nouvelle méthode postFormData pour les uploads
    return api.postFormData<{ url: string }>(`${BASE_URL}/logo/upload`, formData);
};
