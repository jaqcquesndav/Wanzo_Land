import { useState, useEffect, useCallback } from 'react';
import { Company } from '../types/user';
import { CompanyService } from '../services/company';

const companyService = new CompanyService();

interface UseCompanyOptions {
  enabled?: boolean;
}

export function useCompany(companyId: string | undefined, options: UseCompanyOptions = { enabled: true }) {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState<boolean>(options.enabled ?? true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchCompany = useCallback(async () => {
    // Si aucun ID n'est fourni ou que options.enabled est false, on ne charge pas les données
    if (!companyId || !options.enabled) {
      setLoading(false);
      setCompany(null);
      return;
    }
    try {
      setLoading(true);
      const companyData = await companyService.getCompany(companyId);
      setCompany(companyData);
      setError(null);
    } catch (err) {
      const error = err as Error;
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [companyId, options.enabled]);

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
      setError(error);
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
      setError(error);
      throw err;
    } finally {
      setIsUpdating(false);
    }
  };

  return { company, loading, isUpdating, error, fetchCompany, updateCompany, uploadLogo };
}