import { useState } from 'react';
import { useCompany } from '../hooks/useCompany';
import { useUser } from '../hooks/useUser';
import { useFinancialInstitution } from '../hooks/useFinancialInstitution';
import CompanySummary from '../components/company/CompanySummary';
import { CompanyFormModal } from '../components/company/CompanyFormModal';
import { FinancialInstitutionFormModal } from '../components/financialInstitution/FinancialInstitutionFormModal';
import FinancialInstitutionSummary from '../components/financialInstitution/FinancialInstitutionSummary';
import { PageContainer } from '../components/layout/PageContainer';
import { Loader2, AlertTriangle, Edit, Building2 } from 'lucide-react';
import { Company } from '../types/user';
import { UserType } from '../types/common';
import { useNavigate } from 'react-router-dom';
import { FinancialInstitution } from '../types/financialInstitution';

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

// Objet par défaut pour une institution financière non trouvée ou non créée
const newInstitutionTemplate: FinancialInstitution = {
  id: '',
  userId: '',
  name: 'Mon Institution',
  type: 'BANQUE',
  approvalNumber: 'Non spécifié',
  taxId: 'Non spécifié',
  natId: 'Non spécifié',
  rccm: 'Non spécifié',
  legalForm: 'Non spécifié',
  creationDate: '',
  website: '',
  logo: '',
  capital: { amount: 0, currency: 'USD' },
  primaryActivity: 'Non spécifié',
  secondaryActivities: [],
  headquartersAddress: { 
    street: '', 
    city: 'Non spécifié', 
    country: 'République Démocratique du Congo'
  },
  contactPerson: {
    name: 'Non spécifié',
    email: '',
    phone: '',
    role: 'Non spécifié'
  },
  createdAt: '',
  updatedAt: ''
};

interface CompanyPageProps {
  companyId?: string;
}

export default function CompanyPage({ companyId: propCompanyId }: CompanyPageProps) {
  const { user, isLoading: isUserLoading, updateUserProfile } = useUser();
  const navigate = useNavigate();
  const companyId = propCompanyId || user?.companyId || 'comp-123'; // Fallback à l'ID de l'entreprise de démonstration
  
  // État pour suivre le type d'entité sélectionné (PME par défaut)
  const [entityType, setEntityType] = useState<UserType>(user?.userType || 'sme');
  const [isEditInstitutionModalOpen, setIsEditInstitutionModalOpen] = useState(false);

  const { company, loading, error } = useCompany(companyId, { enabled: !!companyId });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Charger les données de l'institution financière si nécessaire
  const financialInstitutionId = user?.financialInstitutionId;
  const { 
    institution, 
    loading: institutionLoading, 
    error: institutionError 
  } = useFinancialInstitution(financialInstitutionId);

  // Gérer le changement de type d'entité
  const handleEntityTypeChange = async (newType: UserType) => {
    setEntityType(newType);
    
    // Mettre à jour le type d'utilisateur dans le profil
    if (user) {
      try {
        await updateUserProfile({ userType: newType });
        
        // Rediriger vers la page appropriée si on est sur une institution financière
        if (newType === 'financial_institution' && user.financialInstitutionId) {
          navigate(`/financial-institution/${user.financialInstitutionId}`);
        }
      } catch (err) {
        console.error("Erreur lors de la mise à jour du type d'entité:", err);
      }
    }
  };

  // Afficher un indicateur de chargement si nécessaire
  if (isUserLoading || (loading && !!companyId) || (institutionLoading && entityType === 'financial_institution' && !!financialInstitutionId)) {
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

  if (institutionError) {
    console.error("Erreur lors du chargement de l'institution financière:", institutionError);
    // On pourrait afficher un toast ici
  }

  // On utilise les données de l'entreprise si elles existent, sinon le modèle par défaut
  const displayCompany = company || newCompanyTemplate;
  const displayInstitution = institution || newInstitutionTemplate;

  // Contenu à afficher pour les institutions financières
  const renderFinancialInstitutionContent = () => {
    // Afficher toujours le profil de l'institution financière (avec les données réelles ou les valeurs par défaut)
    return (
      <div className="mb-4">
        <FinancialInstitutionSummary institution={displayInstitution} />
        
        {/* Message d'information si l'utilisateur n'a pas encore d'institution associée */}
        {!user?.financialInstitutionId && (
          <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  Vous voyez actuellement un profil d'institution financière par défaut. Cliquez sur "Modifier le profil" pour compléter vos informations.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <PageContainer>
      <div className="py-8">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8 pb-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
                {entityType === 'sme' ? 'Profil de l\'entreprise' : 'Profil de l\'institution financière'}
              </h1>
              <button
                type="button"
                onClick={() => entityType === 'sme' ? setIsEditModalOpen(true) : setIsEditInstitutionModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                <Edit className="-ml-1 mr-2 h-5 w-5" />
                Modifier le profil
              </button>
            </div>
            
            {/* Sélecteur de type d'entité */}
            <div className="flex justify-center mb-4">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-l-lg ${
                    entityType === 'sme'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  } border border-gray-200`}
                  onClick={() => handleEntityTypeChange('sme')}
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  PME / Entreprise
                </button>
                <button
                  type="button"
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-r-lg ${
                    entityType === 'financial_institution'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  } border border-gray-200`}
                  onClick={() => handleEntityTypeChange('financial_institution')}
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  Institution Financière
                </button>
              </div>
            </div>
          </header>

          {error && entityType === 'sme' && (
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

          {institutionError && entityType === 'financial_institution' && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 my-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    {typeof institutionError === 'string' 
                      ? institutionError 
                      : "Impossible de charger les informations de l'institution financière."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {entityType === 'sme' ? (
            <CompanySummary company={displayCompany} />
          ) : (
            renderFinancialInstitutionContent()
          )}
        </div>
      </div>
      
      {isEditModalOpen && entityType === 'sme' && (
        <CompanyFormModal
          company={displayCompany}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      {isEditInstitutionModalOpen && entityType === 'financial_institution' && (
        <FinancialInstitutionFormModal
          institution={displayInstitution}
          isOpen={isEditInstitutionModalOpen}
          onClose={() => setIsEditInstitutionModalOpen(false)}
        />
      )}
    </PageContainer>
  );
}
