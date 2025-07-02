import { useState, useEffect } from 'react';
import { Building, Landmark } from 'lucide-react';
import { useUser } from '../hooks/useUser';
import { PageContainer } from '../components/layout/PageContainer';
import CompanyPage from './Company';
import FinancialInstitutionPage from './FinancialInstitution';

// Type pour le sélecteur de profil business
type BusinessProfileType = 'company' | 'financial_institution';

export default function BusinessProfile() {
  // Utiliser le hook useUser pour accéder aux données de l'utilisateur
  const { user, isLoading } = useUser();
  
  // Déterminer le profil à afficher par défaut
  const [currentProfile, setCurrentProfile] = useState<BusinessProfileType>('company');

  // Définir l'onglet par défaut en fonction du type d'utilisateur
  useEffect(() => {
    if (user) {
      if (user.userType === 'financial_institution' && user.financialInstitutionId) {
        setCurrentProfile('financial_institution');
      } else {
        // Pour les PME ou les utilisateurs sans type défini, on affiche le profil entreprise par défaut
        setCurrentProfile('company');
      }
    }
  }, [user]);

  // Afficher un indicateur de chargement si nécessaire
  if (isLoading && !user) {
    return (
      <PageContainer>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </PageContainer>
    );
  }

  const renderProfileContent = () => {
    switch (currentProfile) {
      case 'company':
        // Toujours rendre CompanyPage, qui gérera l'état (création/affichage)
        return <CompanyPage companyId={user?.companyId} />;
      case 'financial_institution':
        if (!user?.financialInstitutionId) {
          return (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Vous n'êtes associé à aucune institution financière</h2>
              <p className="text-gray-600 mb-6">
                Contactez votre administrateur pour obtenir l'accès à une institution financière.
              </p>
            </div>
          );
        }
        return <FinancialInstitutionPage financialInstitutionId={user.financialInstitutionId} />;
      default:
        return <CompanyPage companyId={user?.companyId} />;
    }
  };

  return (
    <PageContainer>
      <div className="p-4 md:p-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Profil Professionnel</h1>

        <div className="flex items-center border-b-2 border-gray-200 mb-6">
          {/* Toujours afficher l'onglet PME/Entreprise, car c'est le profil par défaut */}
          <button 
            onClick={() => setCurrentProfile('company')} 
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors duration-200 ease-in-out ${
              currentProfile === 'company' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-blue-600'
            }`}
          >
            <Building className="w-5 h-5" />
            <span>PME / Entreprise</span>
          </button>
          
          {/* Afficher l'onglet Institution Financière seulement si l'utilisateur est associé à une */}
          {user?.financialInstitutionId && (
            <button 
              onClick={() => setCurrentProfile('financial_institution')} 
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors duration-200 ease-in-out ${
                currentProfile === 'financial_institution' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              <Landmark className="w-5 h-5" />
              <span>Institution Financière</span>
            </button>
          )}
        </div>

        <div>
          {renderProfileContent()}
        </div>
      </div>
    </PageContainer>
  );
}
