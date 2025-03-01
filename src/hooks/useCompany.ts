import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

interface Company {
  id: string;
  name: string;
  subscription: {
    plan: string;
    status: string;
    expiresAt: string;
  };
}

export function useCompany() {
  const { user } = useAuth();
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.companyId) {
      // Dans une vraie implémentation, charger les données depuis Kiota Auth
      setCompany({
        id: user.companyId,
        name: 'Example Corp',
        subscription: {
          plan: 'professional',
          status: 'active',
          expiresAt: '2024-12-31',
        },
      });
    }
    setIsLoading(false);
  }, [user]);

  return { company, isLoading };
}