import React from 'react';
import { FinancialInstitution } from '../../types/financialInstitution';
import { Building2, Globe, MapPin, Phone, Mail, Calendar, FileText, CreditCard } from 'lucide-react';

interface FinancialInstitutionSummaryProps {
  institution: FinancialInstitution;
}

const FinancialInstitutionSummary: React.FC<FinancialInstitutionSummaryProps> = ({ institution }) => {
  const formatAmount = (amount?: number, currency = 'USD') => {
    if (amount === undefined || amount === null) return 'N/A';
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency, 
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Transformer le type d'institution pour l'affichage
  const formatInstitutionType = (type: string) => {
    const types: Record<string, string> = {
      'BANQUE': 'Banque',
      'MICROFINANCE': 'Institution de Microfinance',
      'COOPEC': 'Coopérative d\'Épargne et de Crédit',
      'FONDS_INVESTISSEMENT': 'Fonds d\'Investissement',
      'ASSURANCE': 'Compagnie d\'Assurance',
      'AUTRE': 'Autre Institution Financière'
    };
    return types[type] || type;
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* En-tête avec logo et info de base */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-700 relative">
          {institution.logo && (
            <div className="absolute bottom-0 left-8 transform translate-y-1/2">
              <div className="w-20 h-20 rounded-lg bg-white p-1 shadow-md">
                <img 
                  src={institution.logo} 
                  alt={`Logo ${institution.name}`}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}
        </div>
        
        <div className={`${institution.logo ? 'pl-36' : 'pl-8'} pr-8 py-6`}>
          <div className="flex flex-col sm:flex-row justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{institution.name || 'Mon Institution'}</h1>
              <div className="mt-1 flex flex-wrap gap-2">
                {institution.type && (
                  <span className="inline-flex rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                    {formatInstitutionType(institution.type)}
                  </span>
                )}
                {institution.legalForm && (
                  <span className="inline-flex rounded-full bg-primary-50 px-2 py-1 text-xs font-medium text-primary-700">
                    {institution.legalForm}
                  </span>
                )}
              </div>
            </div>
            
            <div className="mt-4 sm:mt-0">
              {institution.website && (
                <a 
                  href={institution.website.startsWith('http') ? institution.website : `https://${institution.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700"
                >
                  <Globe className="w-4 h-4 mr-1" />
                  {institution.website}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Informations légales et réglementaires */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-primary-600" />
          Informations légales et réglementaires
        </h2>
        
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <div className="text-sm font-medium text-gray-500">N° d'agrément</div>
            <div className="text-sm text-gray-900">{institution.approvalNumber || 'N/A'}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Forme juridique</div>
            <div className="text-sm text-gray-900">{institution.legalForm || 'N/A'}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">RCCM</div>
            <div className="text-sm text-gray-900">{institution.rccm || 'N/A'}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">N° Impôt</div>
            <div className="text-sm text-gray-900">{institution.taxId || 'N/A'}</div>
          </div>
          
          <div>
            <div className="text-sm font-medium text-gray-500">ID National</div>
            <div className="text-sm text-gray-900">{institution.natId || 'N/A'}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Date de création</div>
            <div className="text-sm text-gray-900">
              {institution.creationDate 
                ? new Date(institution.creationDate).toLocaleDateString() 
                : 'N/A'}
            </div>
          </div>
          <div className="col-span-2">
            <div className="text-sm font-medium text-gray-500">Capital Social</div>
            <div className="text-sm text-gray-900">
              {institution.capital?.amount 
                ? formatAmount(institution.capital.amount, institution.capital.currency)
                : 'N/A'}
            </div>
          </div>
        </div>
      </div>
      
      {/* Activités */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Building2 className="w-5 h-5 mr-2 text-primary-600" />
          Activités
        </h2>
        
        <div>
          <div className="text-sm font-medium text-gray-500 mb-1">Activité principale</div>
          <div className="text-sm text-gray-900 mb-4">{institution.primaryActivity || 'N/A'}</div>
          
          {institution.secondaryActivities && institution.secondaryActivities.length > 0 && (
            <>
              <div className="text-sm font-medium text-gray-500 mb-1">Activités secondaires</div>
              <ul className="list-disc list-inside text-sm text-gray-900">
                {institution.secondaryActivities.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      
      {/* Adresse et contacts */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-primary-600" />
          Adresse et contacts
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Siège social</h3>
            {institution.headquartersAddress ? (
              <address className="not-italic text-sm text-gray-900">
                {institution.headquartersAddress.street}<br />
                {institution.headquartersAddress.city}
                {institution.headquartersAddress.province && `, ${institution.headquartersAddress.province}`}<br />
                {institution.headquartersAddress.country || 'République Démocratique du Congo'}
              </address>
            ) : (
              <p className="text-sm text-gray-500">Adresse non spécifiée</p>
            )}
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Personne de contact</h3>
            {institution.contactPerson ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-900 font-medium">{institution.contactPerson.name || 'N/A'}</p>
                {institution.contactPerson.role && (
                  <p className="text-sm text-gray-600">{institution.contactPerson.role}</p>
                )}
                {institution.contactPerson.email && (
                  <p className="text-sm text-gray-900 flex items-center">
                    <Mail className="w-4 h-4 mr-1 text-gray-400" />
                    <a href={`mailto:${institution.contactPerson.email}`} className="text-primary-600 hover:text-primary-700">
                      {institution.contactPerson.email}
                    </a>
                  </p>
                )}
                {institution.contactPerson.phone && (
                  <p className="text-sm text-gray-900 flex items-center">
                    <Phone className="w-4 h-4 mr-1 text-gray-400" />
                    <a href={`tel:${institution.contactPerson.phone}`} className="text-primary-600 hover:text-primary-700">
                      {institution.contactPerson.phone}
                    </a>
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Aucune personne de contact spécifiée</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialInstitutionSummary;
