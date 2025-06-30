import { useState, useEffect } from 'react';

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
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Dans une vraie implémentation, charger les données depuis Kiota Auth
    setCompany({
      id: 'example-id',
      name: 'Example Corp',
      subscription: {
        plan: 'professional',
        status: 'active',
        expiresAt: '2024-12-31',
      },
    });
    setIsLoading(false);
  }, []);

  return { company, isLoading };
}