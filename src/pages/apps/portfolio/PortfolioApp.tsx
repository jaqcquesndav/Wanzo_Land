import { PageContainer } from '../../../components/layout/PageContainer';
import { Container } from '../../../components/ui/Container';
import { LineChart, PieChart, TrendingUp } from 'lucide-react';

export function PortfolioApp() {
  return (
    <PageContainer>
      <div className="bg-white py-12">
        <Container>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <LineChart className="mx-auto h-12 w-12 text-primary" />
              <h1 className="mt-3 text-3xl font-bold text-gray-900">Gestion de Portefeuille</h1>
              <p className="mt-3 max-w-md mx-auto text-lg text-gray-500">
                Suivez et optimisez vos investissements
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <LineChart className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Investissements
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            Suivi des investissements
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-primary hover:text-primary-hover">
                      Voir les investissements
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <PieChart className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Allocation
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            Allocation d'actifs
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-primary hover:text-primary-hover">
                      Gérer l'allocation
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Performance
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            Analyse de performance
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-primary hover:text-primary-hover">
                      Voir les performances
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