import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFinancialInstitution } from '@/hooks/useFinancialInstitution';
import { FinancialInstitutionFormModal } from '@/components/financialInstitution/FinancialInstitutionFormModal';
import { Button } from '@/components/ui/Button';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';

interface Props {
    financialInstitutionId?: string;
}

const FinancialInstitutionPage: React.FC<Props> = ({ financialInstitutionId }) => {
    const { institutionId: institutionIdFromUrl } = useParams<{ institutionId: string }>();
    const institutionId = financialInstitutionId || institutionIdFromUrl;
    const { institution, loading, error } = useFinancialInstitution(institutionId);
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (loading) return <PageContainer><p>Chargement...</p></PageContainer>;
    if (error) return <PageContainer><p>Erreur: {error}</p></PageContainer>;
    if (!institution) return <PageContainer><p>Aucune institution trouvée.</p></PageContainer>;

    return (
        <PageContainer>
            <PageHeader title={institution.name}>
                Profil de l'institution financière
            </PageHeader>
            
            <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-end mb-4">
                    <Button onClick={() => setIsModalOpen(true)}>Modifier les informations</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Informations Générales</h3>
                        <p><strong>Type:</strong> {institution.type}</p>
                        <p><strong>Numéro d'agrément:</strong> {institution.approvalNumber}</p>
                        {institution.creationDate && <p><strong>Date de création:</strong> {new Date(institution.creationDate).toLocaleDateString()}</p>}
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Contact</h3>
                        <p><strong>Email:</strong> {institution.contactPerson?.email}</p>
                        <p><strong>Téléphone:</strong> {institution.contactPerson?.phone}</p>
                        {institution.headquartersAddress && <p><strong>Adresse:</strong> {`${institution.headquartersAddress.street}, ${institution.headquartersAddress.city}, ${institution.headquartersAddress.country}`}</p>}
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Données Financières</h3>
                        <p><strong>Capital Social:</strong> {institution.capital?.amount} {institution.capital?.currency}</p>
                    </div>
                </div>
            </div>

            <FinancialInstitutionFormModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                institution={institution} 
            />
        </PageContainer>
    );
};

export default FinancialInstitutionPage;
