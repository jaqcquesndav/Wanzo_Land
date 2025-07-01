import { useState, useEffect, useCallback } from 'react';
import { Company } from '../types/user';
import { CompanyService } from '../services/company';

const companyService = new CompanyService();

export function useCompany(companyId: string) {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCompany = useCallback(async () => {
    if (!companyId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const companyData = await companyService.getCompany(companyId);
      setCompany(companyData);
      setError(null);
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Erreur lors du chargement de l\'entreprise');
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    fetchCompany();
  }, [fetchCompany]);

  const updateCompany = async (companyData: Partial<Company>) => {
    if (!companyId) return;
    setIsUpdating(true);
    setError(null);
    try {
      const updatedCompany = await companyService.updateCompany(companyId, companyData);
      setCompany(updatedCompany);
      return updatedCompany;
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Erreur lors de la mise à jour de l\'entreprise');
      throw err; // Re-throw to be caught in the component
    } finally {
      setIsUpdating(false);
    }
  };

  const uploadLogo = async (file: File) => {
    if (!companyId) return null;
    setIsUpdating(true);
    setError(null);
    try {
      const result = await companyService.uploadLogo(companyId, file);
      setCompany(prev => prev ? { ...prev, logo: result.url } : null);
      return result;
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Erreur lors de l\'envoi du logo');
      throw err;
    } finally {
      setIsUpdating(false);
    }
  };

  return { company, loading, isUpdating, error, fetchCompany, updateCompany, uploadLogo };
}