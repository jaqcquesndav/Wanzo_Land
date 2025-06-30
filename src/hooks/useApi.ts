import { apiService } from '../services/api';
import { useState, useCallback } from 'react';

export function useApi() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const callApi = useCallback(async <T>(
    apiMethod: (token: string, ...args: any[]) => Promise<T>,
    ...args: any[]
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await apiMethod('', ...args);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Une erreur est survenue'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getUserProfile = useCallback(async () => {
    return callApi(apiService.getUserProfile);
  }, [callApi]);

  const updateUserProfile = useCallback(async (data: any) => {
    return callApi(apiService.updateUserProfile, data);
  }, [callApi]);

  const getUserSettings = useCallback(async () => {
    return callApi(apiService.getUserSettings);
  }, [callApi]);

  const getAppData = useCallback(async (appName: string) => {
    return callApi(apiService.getAppData, appName);
  }, [callApi]);

  return {
    isLoading,
    error,
    getUserProfile,
    updateUserProfile,
    getUserSettings,
    getAppData,
  };
}