import { Company } from '../../types/user';

interface OrganizationSummaryProps {
  company: Company;
}

export function OrganizationSummary({ company }: OrganizationSummaryProps) {
  const formatAmount = (amount?: number, currency = 'USD') => {
    if (amount === undefined || amount === null) return 'N/A';
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency, 
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* En-tête avec logo et info de base */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-700 relative">
          {company.logo && (
            <div className="absolute bottom-0 left-8 transform translate-y-1/2">
              <div className="w-20 h-20 rounded-lg bg-white p-1 shadow-md">
                <img 
                  src={company.logo} 
                  alt={`Logo ${company.name}`}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}
        </div>
        
        <div className={`${company.logo ? 'pl-36' : 'pl-8'} pr-8 py-6`}>
          <div className="flex flex-col sm:flex-row justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
              <div className="mt-1 flex flex-wrap gap-2">
                {company.legalForm && (
                  <span className="inline-flex rounded-full bg-primary-50 px-2 py-1 text-xs font-medium text-primary-700">
                    {company.legalForm}
                  </span>
                )}
                {company.industry && (
                  <span className="inline-flex rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                    {company.industry}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-4 sm:mt-0">
              {company.subscription?.plan?.name && (
              <span className="inline-flex rounded-full bg-primary-100 px-2 py-1 text-xs font-medium text-primary-800">
                {company.subscription.plan.name.charAt(0).toUpperCase() + company.subscription.plan.name.slice(1)}
              </span>
              )}
              <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                {company.subscription?.status === 'active' ? 'Actif' : company.subscription?.status}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Colonne gauche */}
        <div className="space-y-6">
          {/* Informations juridiques */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Informations juridiques
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Forme juridique</div>
                  <div className="text-sm text-gray-900">{company.legalForm || 'Non spécifié'}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">RCCM</div>
                  <div className="text-sm text-gray-900">{company.rccm || 'Non spécifié'}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">N° Impôt</div>
                  <div className="text-sm text-gray-900">{company.taxId || 'Non spécifié'}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">ID National</div>
                  <div className="text-sm text-gray-900">{company.natId || 'Non spécifié'}</div>
                </div>
              </div>
              
              {company.capital?.isApplicable !== false && (
                <div>
                  <div className="text-sm font-medium text-gray-500">Capital social</div>
                  <div className="text-sm text-gray-900">
                    {company.capital?.amount 
                      ? formatAmount(company.capital.amount, company.capital.currency) 
                      : 'Non spécifié'}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Activités */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 01-2 2z" />
              </svg>
              Activités
            </h2>
            
            <div className="space-y-4">
              {company.activities?.primary && (
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Activité principale</div>
                  <div className="text-sm text-gray-900 p-3 bg-primary-50 rounded-md">
                    {company.activities.primary}
                  </div>
                </div>
              )}
              
              {company.activities?.secondary && company.activities.secondary.length > 0 && (
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Activités secondaires</div>
                  <ul className="space-y-1">
                    {company.activities.secondary.map((activity: string, index: number) => (
                      <li key={index} className="text-sm text-gray-900 p-2 bg-gray-50 rounded-md">
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          {/* Affiliations */}
          {company.affiliations && Object.values(company.affiliations).some(Boolean) && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 002 12a12.02 12.02 0 001.382 5.618A11.955 11.955 0 0112 21.056a11.955 11.955 0 008.618-3.04A12.02 12.02 0 0022 12a12.02 12.02 0 00-1.382-5.618z" />
                </svg>
                Affiliations
              </h2>
              
              <div className="space-y-4">
                {company.affiliations?.intraCoop && (
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Groupe intra-coopératif</div>
                    <div className="text-sm text-gray-900 p-3 bg-green-50 rounded-md">
                      {company.affiliations.intraCoop}
                    </div>
                  </div>
                )}
                
                {company.affiliations?.interCoop && (
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Inter-coopération</div>
                    <div className="text-sm text-gray-900 p-3 bg-blue-50 rounded-md">
                      {company.affiliations.interCoop}
                    </div>
                  </div>
                )}
                
                {company.affiliations?.partners && company.affiliations.partners.length > 0 && (
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Partenaires</div>
                    <ul className="space-y-1">
                      {company.affiliations.partners.map((partner: string, index: number) => (
                        <li key={index} className="text-sm text-gray-900 p-2 bg-gray-50 rounded-md">
                          {partner}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Colonne droite - Résumé financier */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18h18M9 9h6M9 15h6" />
            </svg>
            Résumé financier
          </h2>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium text-gray-900">Chiffre d'affaires</div>
              <div className="text-gray-700">
                {formatAmount(company.financials?.revenue, 'EUR')}
              </div>
            </div>
            
            <div>
              <div className="font-medium text-gray-900">Résultat net</div>
              <div className="text-gray-700">
                {formatAmount(company.financials?.netIncome, 'EUR')}
              </div>
            </div>
            
            <div>
              <div className="font-medium text-gray-900">Total bilan</div>
              <div className="text-gray-700">
                {formatAmount(company.financials?.totalAssets, 'EUR')}
              </div>
            </div>
            
            <div>
              <div className="font-medium text-gray-900">Capitaux propres</div>
              <div className="text-gray-700">
                {formatAmount(company.financials?.equity, 'EUR')}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Détails de l'abonnement */}
      <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-500">
          <div>
            {company.subscription?.plan?.name && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800 mr-2">
              {company.subscription.plan.name.charAt(0).toUpperCase() + company.subscription.plan.name.slice(1)}
            </span>
            )}
            {company.subscription?.currentPeriodEnd && (
            <span>
              Expire le {new Date(company.subscription.currentPeriodEnd).toLocaleDateString('fr-FR')}
            </span>
            )}
          </div>
          
          <div className="mt-2 sm:mt-0 text-xs text-gray-500">
            {company.subscription?.status === 'active' ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Actif
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                {company.subscription?.status}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
