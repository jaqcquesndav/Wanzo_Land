import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Container } from '../components/ui/Container';
import { PageContainer } from '../components/layout/PageContainer';
import { apiService } from '../services/api';
import { Company } from '../types/auth';

export function Dashboard() {
  const { user, isLoading, refreshUser } = useAuth();
  const [companyData, setCompanyData] = useState<Company | null>(null);
  const [isCompanyLoading, setIsCompanyLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (user?.companyId) {
        setIsCompanyLoading(true);
        setError(null);
        try {
          const data = await apiService.getCompanyById(user.companyId);
          setCompanyData(data);
        } catch (error) {
          console.error('Error fetching company data:', error);
          setError(error instanceof Error ? error.message : 'Erreur lors de la récupération des données de l\'entreprise');
          
          // Si l'erreur est liée à l'authentification, rafraîchir l'utilisateur
          if (error instanceof Error && (error.message.includes('Token') || error.message.includes('authentification'))) {
            refreshUser();
          }
        } finally {
          setIsCompanyLoading(false);
        }
      }
    };

    fetchCompanyData();
  }, [user, refreshUser]);

  if (isLoading || isCompanyLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <PageContainer>
      <div className="bg-white py-12">
        <Container>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Dashboard</h2>
              <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
                Bienvenue, {user?.name}
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Voici votre tableau de bord Kiota Suit
              </p>
            </div>

            {error && (
              <div className="mt-8 rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Erreur</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-10">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Informations du profil
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Détails personnels et de l'entreprise
                  </p>
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Nom complet</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {user?.name}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {user?.email}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Type d'utilisateur</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {user?.userType === 'sme' ? 'PME' : 'Institution Financière'}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Rôle</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {user?.role}
                      </dd>
                    </div>
                    {companyData && (
                      <>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Entreprise</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {companyData.name}
                          </dd>
                        </div>
                        {companyData.industry && (
                          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Secteur d'activité</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {companyData.industry}
                            </dd>
                          </div>
                        )}
                      </>
                    )}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </PageContainer>
  );
}