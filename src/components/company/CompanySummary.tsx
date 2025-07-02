import { Company } from '../../types/user';
import { LocationsSummary } from '../map/LocationsSummary';
import { ExternalLink, FileText, Briefcase } from 'lucide-react';

interface CompanySummaryProps {
  company: Company;
}

const CompanySummary = ({ company }: CompanySummaryProps) => {
  const formatAmount = (amount?: number, currency = 'USD') => {
    if (amount === undefined || amount === null) return 'N/A';
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency, 
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Fonction pour formater les liens externes
  const renderExternalLink = (url?: string, label = "Voir") => {
    if (!url) return null;
    
    return (
      <a 
        href={url.startsWith('http') ? url : `https://${url}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center text-xs text-primary-600 hover:text-primary-800"
      >
        {label} <ExternalLink className="h-3 w-3 ml-1" />
      </a>
    );
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
                <div className="border-t border-gray-200 pt-4">
                  <div className="text-sm font-medium text-gray-500">Capital Social</div>
                  <div className="text-sm text-gray-900">
                    {formatAmount(company.capital?.amount, company.capital?.currency)}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Activités */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h2M9 7h6m-6 4h6m-6 4h6" />
              </svg>
              Activités
            </h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-500">Activité principale</div>
                <div className="text-sm text-gray-900">{company.activities?.primary || 'Non spécifié'}</div>
              </div>
              
              {company.activities?.secondary && company.activities.secondary.length > 0 && (
                <div className="border-t border-gray-200 pt-4">
                  <div className="text-sm font-medium text-gray-500">Activités secondaires</div>
                  <ul className="list-disc list-inside text-sm text-gray-900">
                    {company.activities.secondary.map((activity, index) => (
                      <li key={index}>{activity}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Présence web */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              Présence web
            </h2>
            <div className="space-y-4">
              {company.website ? (
                <div>
                  <div className="text-sm font-medium text-gray-500">Site web</div>
                  <div className="text-sm text-gray-900 flex items-center">
                    {company.website}
                    <span className="ml-2">{renderExternalLink(company.website, "Visiter")}</span>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-sm font-medium text-gray-500">Site web</div>
                  <div className="text-sm text-gray-500 italic">Non spécifié</div>
                </div>
              )}
              
              {company.facebookPage && (
                <div className="border-t border-gray-200 pt-4">
                  <div className="text-sm font-medium text-gray-500">Page Facebook</div>
                  <div className="text-sm text-gray-900 flex items-center">
                    {company.facebookPage}
                    <span className="ml-2">{renderExternalLink(company.facebookPage, "Visiter")}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Colonne droite */}
        <div className="space-y-6">
          {/* Coordonnées */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 01-2 2z" />
              </svg>
              Coordonnées
            </h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-500">Adresse</div>
                <div className="text-sm text-gray-900">
                  {company.address?.street}, {company.address?.commune}<br/>
                  {company.address?.city}, {company.address?.province}<br/>
                  {company.address?.country}
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="text-sm font-medium text-gray-500">Email</div>
                <div className="text-sm text-gray-900">{company.contacts?.email || 'Non spécifié'}</div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="text-sm font-medium text-gray-500">Téléphone</div>
                <div className="text-sm text-gray-900">{company.contacts?.phone || 'Non spécifié'}</div>
              </div>
              {company.contacts?.altPhone && (
                <div className="border-t border-gray-200 pt-4">
                  <div className="text-sm font-medium text-gray-500">Téléphone alternatif</div>
                  <div className="text-sm text-gray-900">{company.contacts.altPhone}</div>
                </div>
              )}
            </div>
          </div>

          {/* Emplacements géographiques */}
          {company.locations && company.locations.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Emplacements géographiques
              </h2>
              <LocationsSummary locations={company.locations} />
            </div>
          )}

          {/* Dirigeant */}
          {company.owner && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Dirigeant
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Nom</div>
                  <div className="text-sm text-gray-900">{company.owner.name}</div>
                </div>
                {company.owner.email && (
                  <div className="border-t border-gray-200 pt-4">
                    <div className="text-sm font-medium text-gray-500">Email</div>
                    <div className="text-sm text-gray-900">{company.owner.email}</div>
                  </div>
                )}
                {company.owner.phone && (
                  <div className="border-t border-gray-200 pt-4">
                    <div className="text-sm font-medium text-gray-500">Téléphone</div>
                    <div className="text-sm text-gray-900">{company.owner.phone}</div>
                  </div>
                )}
                
                {/* Statut d'emploi */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="text-sm font-medium text-gray-500">Statut d'emploi</div>
                  <div className="text-sm text-gray-900 flex items-center">
                    <Briefcase className="h-4 w-4 text-gray-500 mr-1" />
                    {company.owner.hasOtherJob 
                      ? "Occupe un autre emploi en parallèle" 
                      : "Se consacre uniquement à cette entreprise"
                    }
                  </div>
                </div>
                
                {/* CV */}
                {company.owner.cv && (
                  <div className="border-t border-gray-200 pt-4">
                    <div className="text-sm font-medium text-gray-500">CV</div>
                    <div className="flex items-center mt-1">
                      <FileText className="h-4 w-4 text-red-500 mr-1" />
                      <a 
                        href={company.owner.cv} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary-600 hover:text-primary-800"
                      >
                        Voir le CV
                      </a>
                    </div>
                  </div>
                )}
                
                {/* Réseaux sociaux */}
                {(company.owner.linkedin || company.owner.facebook) && (
                  <div className="border-t border-gray-200 pt-4">
                    <div className="text-sm font-medium text-gray-500 mb-2">Réseaux sociaux</div>
                    <div className="flex flex-col space-y-2">
                      {company.owner.linkedin && (
                        <div className="flex items-center">
                          <svg className="h-4 w-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                          <a 
                            href={company.owner.linkedin.startsWith('http') ? company.owner.linkedin : `https://${company.owner.linkedin}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-primary-600 hover:text-primary-800"
                          >
                            Profil LinkedIn
                          </a>
                        </div>
                      )}
                      {company.owner.facebook && (
                        <div className="flex items-center">
                          <svg className="h-4 w-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                          </svg>
                          <a 
                            href={company.owner.facebook.startsWith('http') ? company.owner.facebook : `https://${company.owner.facebook}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-primary-600 hover:text-primary-800"
                          >
                            Profil Facebook
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanySummary;
