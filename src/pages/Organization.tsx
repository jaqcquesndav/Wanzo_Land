/**
 * @deprecated Ce fichier est obsolète et remplacé par Company.tsx.
 * Ne pas utiliser ce fichier pour de nouveaux développements.
 * Il est conservé temporairement pour des raisons de compatibilité.
 */

import { useState } from 'react';
import { useCompany } from '../hooks/useCompany';
import { useUser } from '../hooks/useUser';
import CompanySummary from '../components/company/CompanySummary';
import { CompanyFormModal } from '../components/company/CompanyFormModal';
import { PageContainer } from '../components/layout/PageContainer';
import { Loader2, AlertTriangle, Edit } from 'lucide-react';
import { Company } from '../types/user';

// Objet par défaut pour une entreprise non trouvée ou non créée
const newCompanyTemplate: Company = {
  id: '',
  name: 'Mon Entreprise',
  industry: 'Non spécifié',
  legalForm: 'Non spécifié',
  rccm: 'Non spécifié',
  taxId: 'Non spécifié',
  natId: 'Non spécifié',
  address: { street: '', city: '', country: '' },
  contacts: { email: '', phone: '' },
  capital: { amount: 0, currency: 'USD', isApplicable: true },
  logo: ''
};

export default function OrganizationLegacy() {
  const { user } = useUser();
  const companyId = user?.companyId;

  const { company, loading, error } = useCompany(companyId, { enabled: !!companyId });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Si aucune donnée n'est disponible, afficher un loader
  if (!user && !companyId && loading) {
    return (
      <PageContainer>
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
        </div>
      </PageContainer>
    );
  }

  // Si une erreur survient, on l'affiche mais on permet quand même de voir la page
  if (error) {
    console.error("Erreur lors du chargement de l'entreprise:", error);
    // On pourrait afficher un toast ici
  }

  // On utilise les données de l'entreprise si elles existent, sinon le modèle par défaut
  const displayCompany = company || newCompanyTemplate;

  return (
    <PageContainer>
      <div className="py-8">
        <div className="max-w-5xl mx-auto">
          <header className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-4 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Profil de l'entreprise</h1>
            <button
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              <Edit className="-ml-1 mr-2 h-5 w-5" />
              {company ? 'Modifier le profil' : 'Créer le profil'}
            </button>
          </header>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 my-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    {typeof error === 'string' 
                      ? error
                      : "Impossible de charger les informations de l'entreprise."}
                  </p>
                </div>
              </div>
            </div>
          )}

          <CompanySummary company={displayCompany} />
        </div>
      </div>
      
      {isEditModalOpen && (
        <CompanyFormModal
          company={displayCompany}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </PageContainer>
  );
}
