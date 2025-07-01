import { useState } from 'react';
import { useCompany } from '../hooks/useCompany';
import { OrganizationSummary } from '../components/organization/OrganizationSummary';
import { OrganizationFormModal } from '../components/organization/OrganizationFormModal';
import { PageContainer } from '../components/layout/PageContainer';
import { Loader2, AlertTriangle, Edit } from 'lucide-react';

// TODO: Replace with actual user/auth context logic to get companyId
const MOCK_COMPANY_ID = 'comp-123';

export default function Organization() {
  const { company, loading, error } = useCompany(MOCK_COMPANY_ID);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (loading) {
    return (
      <PageContainer>
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
        </div>
      </PageContainer>
    );
  }

  if (error || !company) {
    return (
      <PageContainer>
        <div className="bg-red-50 border-l-4 border-red-400 p-4 my-8 max-w-3xl mx-auto">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {error || "Impossible de charger les informations de l'entreprise."}
              </p>
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }

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
              Modifier le profil
            </button>
          </header>

          <OrganizationSummary company={company} />
        </div>
      </div>
      
      {isEditModalOpen && company && (
        <OrganizationFormModal
          company={company}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </PageContainer>
  );
}
