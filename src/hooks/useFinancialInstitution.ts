import { useState, useEffect, useCallback } from 'react';
import { FinancialInstitution } from '@/types/financialInstitution';
import {
    getFinancialInstitution as fetchInstitution,
    createFinancialInstitution as createInstitution,
    updateFinancialInstitution as updateInstitution,
    uploadInstitutionLogo as uploadLogo,
    CreateFinancialInstitution,
} from '@/services/financialInstitution';
import { useToast } from '@/hooks/useToast';

export const useFinancialInstitution = (institutionId?: string) => {
    const [institution, setInstitution] = useState<FinancialInstitution | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { showToast } = useToast();

    const fetchInstitutionData = useCallback(async () => {
        if (!institutionId) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const data = await fetchInstitution(institutionId);
            setInstitution(data);
            setError(null);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue.';
            setError(errorMessage);
            showToast({ type: 'error', title: 'Erreur', message: `Erreur lors de la récupération de l'institution : ${errorMessage}` });
        } finally {
            setLoading(false);
        }
    }, [institutionId, showToast]);

    useEffect(() => {
        fetchInstitutionData();
    }, [fetchInstitutionData]);

    const createNewInstitution = async (institutionData: CreateFinancialInstitution) => {
        try {
            setLoading(true);
            const newInstitution = await createInstitution(institutionData);
            setInstitution(newInstitution);
            showToast({ type: 'success', title: 'Succès', message: 'Institution financière créée avec succès !' });
            return newInstitution;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue.';
            setError(errorMessage);
            showToast({ type: 'error', title: 'Erreur', message: `Erreur lors de la création de l'institution : ${errorMessage}` });
            return null;
        } finally {
            setLoading(false);
        }
    };

    const updateInstitutionData = async (updates: Partial<FinancialInstitution>) => {
        if (!institutionId) return null;

        try {
            setLoading(true);
            const updatedInstitution = await updateInstitution(institutionId, updates);
            setInstitution(updatedInstitution);
            showToast({ type: 'success', title: 'Succès', message: 'Informations mises à jour avec succès !' });
            return updatedInstitution;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue.';
            setError(errorMessage);
            showToast({ type: 'error', title: 'Erreur', message: `Erreur lors de la mise à jour : ${errorMessage}` });
            return null;
        } finally {
            setLoading(false);
        }
    };

    const uploadLogoFile = async (logoFile: File) => {
        if (!institutionId) return null;

        try {
            setLoading(true);
            const response = await uploadLogo(institutionId, logoFile);
            if (institution) {
                const updatedInstitution = { ...institution, logo: response.url };
                setInstitution(updatedInstitution);
                // Optionnellement, mettez à jour l'institution dans le backend également
                await updateInstitution(institutionId, { logo: response.url });
            }
            showToast({ type: 'success', title: 'Succès', message: 'Logo uploadé avec succès !' });
            return response.url;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue.';
            showToast({ type: 'error', title: 'Erreur', message: `Erreur lors de l'upload du logo : ${errorMessage}` });
            return null;
        } finally {
            setLoading(false);
        }
    };


    return {
        institution,
        loading,
        error,
        fetchInstitutionData,
        createNewInstitution,
        updateInstitutionData,
        uploadLogoFile,
    };
};
