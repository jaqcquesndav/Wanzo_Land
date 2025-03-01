import { PageContainer } from '../../../components/layout/PageContainer';
import { Container } from '../../../components/ui/Container';
import { BarChart2, Users, Building } from 'lucide-react';

export function FinancialApp() {
  return (
    <PageContainer>
      <div className="bg-white py-12">
        <Container>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Building className="mx-auto h-12 w-12 text-primary" />
              <h1 className="mt-3 text-3xl font-bold text-gray-900">Institution Financière</h1>
              <p className="mt-3 max-w-md mx-auto text-lg text-gray-500">
                Gérez les portefeuilles de vos clients PME
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Clients
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            Gestion des clients PME
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-primary hover:text-primary-hover">
                      Voir les clients
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <BarChart2 className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Portefeuilles
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            Gestion des portefeuilles
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-primary hover:text-primary-hover">
                      Gérer les portefeuilles
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Building className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Risques
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            Analyse des risques
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-primary hover:text-primary-hover">
                      Évaluer les risques
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </PageContainer>
  );
}