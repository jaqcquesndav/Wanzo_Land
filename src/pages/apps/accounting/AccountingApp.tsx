import { PageContainer } from '../../../components/layout/PageContainer';
import { Container } from '../../../components/ui/Container';
import { Calculator, FileText, BarChart2, DollarSign, PieChart, Clock } from 'lucide-react';
import { useState } from 'react';

export function AccountingApp() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <PageContainer>
      <div className="bg-white py-12">
        <Container>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Calculator className="mx-auto h-12 w-12 text-primary" />
              <h1 className="mt-3 text-3xl font-bold text-gray-900">Comptabilité</h1>
              <p className="mt-3 max-w-md mx-auto text-lg text-gray-500">
                Gérez votre comptabilité et vos finances avec simplicité et précision
              </p>
            </div>

            {/* Navigation tabs */}
            <div className="mt-8 border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'dashboard', name: 'Tableau de bord' },
                  { id: 'transactions', name: 'Transactions' },
                  { id: 'reports', name: 'Rapports' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Main content */}
            <div className="mt-8">
              {activeTab === 'dashboard' && (
                <>
                  {/* Stats overview */}
                  <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <DollarSign className="h-6 w-6 text-green-500" />
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-gray-500 truncate">
                                Revenus (ce mois)
                              </dt>
                              <dd className="text-lg font-medium text-gray-900">
                                15 250 €
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <DollarSign className="h-6 w-6 text-red-500" />
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-gray-500 truncate">
                                Dépenses (ce mois)
                              </dt>
                              <dd className="text-lg font-medium text-gray-900">
                                8 430 €
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <DollarSign className="h-6 w-6 text-primary" />
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-gray-500 truncate">
                                Bénéfice net
                              </dt>
                              <dd className="text-lg font-medium text-gray-900">
                                6 820 €
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main modules */}
                  <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <FileText className="h-6 w-6 text-primary" />
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-gray-500 truncate">
                                Factures
                              </dt>
                              <dd>
                                <div className="text-lg font-medium text-gray-900">
                                  Gestion des factures
                                </div>
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-5 py-3">
                        <div className="text-sm">
                          <a href="#" className="font-medium text-primary hover:text-primary-hover">
                            Voir les factures
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <Calculator className="h-6 w-6 text-primary" />
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-gray-500 truncate">
                                Comptabilité
                              </dt>
                              <dd>
                                <div className="text-lg font-medium text-gray-900">
                                  Grand livre
                                </div>
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-5 py-3">
                        <div className="text-sm">
                          <a href="#" className="font-medium text-primary hover:text-primary-hover">
                            Accéder au grand livre
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
                                Rapports
                              </dt>
                              <dd>
                                <div className="text-lg font-medium text-gray-900">
                                  Rapports financiers
                                </div>
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-5 py-3">
                        <div className="text-sm">
                          <a href="#" className="font-medium text-primary hover:text-primary-hover">
                            Générer des rapports
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'transactions' && (
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                  <ul className="divide-y divide-gray-200">
                    {[
                      { id: 1, date: '2025-03-15', description: 'Paiement client ABC', amount: 1250, type: 'credit' },
                      { id: 2, date: '2025-03-12', description: 'Achat fournitures', amount: 350, type: 'debit' },
                      { id: 3, date: '2025-03-10', description: 'Paiement client XYZ', amount: 2800, type: 'credit' },
                      { id: 4, date: '2025-03-05', description: 'Loyer mensuel', amount: 1200, type: 'debit' },
                      { id: 5, date: '2025-03-01', description: 'Salaires', amount: 4500, type: 'debit' },
                    ].map((transaction) => (
                      <li key={transaction.id}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-primary truncate">
                              {transaction.description}
                            </p>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                transaction.type === 'credit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {transaction.type === 'credit' ? '+' : '-'}{transaction.amount} €
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <p className="flex items-center text-sm text-gray-500">
                                <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                {transaction.date}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'reports' && (
                <div className="space-y-8">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Rapports disponibles</h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {[
                        { id: 'income', name: 'Compte de résultat', icon: BarChart2 },
                        { id: 'balance', name: 'Bilan', icon: PieChart },
                        { id: 'vat', name: 'Déclaration TVA', icon: Calculator },
                        { id: 'cashflow', name: 'Flux de trésorerie', icon: DollarSign },
                      ].map((report) => (
                        <div key={report.id} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                          <div className="flex items-center">
                            <report.icon className="h-5 w-5 text-primary mr-2" />
                            <span className="text-sm font-medium">{report.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Période</h3>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      {['Ce mois', 'Trimestre en cours', 'Année en cours', 'Personnalisé'].map((period) => (
                        <div key={period} className="border rounded-lg p-3 text-center hover:bg-gray-50 cursor-pointer">
                          <span className="text-sm">{period}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </PageContainer>
  );
}
