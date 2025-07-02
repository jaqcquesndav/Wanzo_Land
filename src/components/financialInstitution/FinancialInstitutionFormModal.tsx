import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FinancialInstitution, financialInstitutionSchema } from '../../types/financialInstitution';
import { useFinancialInstitution } from '../../hooks/useFinancialInstitution';
import { Loader2 } from 'lucide-react';
import { LocationMapSelector, Location } from '../map/LocationMapSelector';

interface FinancialInstitutionFormModalProps {
  institution: FinancialInstitution;
  isOpen: boolean;
  onClose: () => void;
}

const TOTAL_STEPS = 5;

// Le schéma de validation Zod pour le formulaire
const formSchema = financialInstitutionSchema;

type FormData = z.infer<typeof formSchema>;

export function FinancialInstitutionFormModal({ institution, isOpen, onClose }: FinancialInstitutionFormModalProps) {
  const { createNewInstitution, updateInstitutionData, uploadLogoFile, loading } = useFinancialInstitution(institution?.id);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [logoPreview, setLogoPreview] = useState(institution?.logo || '');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [locations, setLocations] = useState<Location[]>(institution?.locations || []);
  
  const { register, handleSubmit, formState: { errors }, reset, trigger } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: institution || {},
  });

  // Réinitialiser le formulaire si l'objet institution change ou si le modal est rouvert
  useEffect(() => {
    if (isOpen) {
      reset(institution || {});
      setCurrentStep(1);
      setLogoPreview(institution?.logo || '');
      setLogoFile(null);
      setLocations(institution?.locations || []);
    }
  }, [institution, isOpen, reset]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        setLogoFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = async () => {
    const fieldsToValidate = [];
    
    // Déterminer les champs à valider en fonction de l'étape actuelle
    switch (currentStep) {
      case 1: // Identification & Légal
        fieldsToValidate.push('name', 'type', 'sector', 'legalForm', 'creationDate', 'website');
        break;
      case 2: // Infos Réglementaires
        fieldsToValidate.push('approvalNumber', 'taxId', 'rccm', 'natId');
        break;
      case 3: // Siège Social
        fieldsToValidate.push('headquartersAddress.street', 'headquartersAddress.city', 
          'headquartersAddress.province', 'headquartersAddress.country');
        break;
      case 4: // Personne de Contact
        fieldsToValidate.push('contactPerson.name', 'contactPerson.email', 
          'contactPerson.phone', 'contactPerson.role');
        break;
      case 5: // Activités & Finances
        fieldsToValidate.push('capital.amount', 'capital.currency', 'primaryActivity');
        break;
    }

    const isValid = await trigger(fieldsToValidate as any);
    if (isValid && currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // Exclure les champs gérés par le serveur lors de la création
      const { id, createdAt, updatedAt, ...creationData } = data;
  
      let logoUrl: string | undefined = institution?.logo;
      // Si un fichier logo a été sélectionné, le gérer
      if (logoFile) {
        logoUrl = await uploadLogoFile(logoFile) || undefined;
      }

      // Vérifier si c'est une mise à jour (ID existant et non vide) ou une création
      if (institution?.id && institution.id.trim() !== '') {
        await updateInstitutionData({
          ...data,
          logo: logoUrl || institution.logo,
          locations: locations
        });
      } else {
        await createNewInstitution({
          ...creationData,
          logo: logoUrl || undefined,
          locations: locations
        });
      }
      onClose();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'institution:', error);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Identification & Légal
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Logo</label>
              <div className="mt-1 flex items-center space-x-4">
                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Aperçu du logo" className="h-full w-full object-cover" />
                  ) : institution?.logo ? (
                    <img src={institution.logo} alt="Logo actuel" className="h-full w-full object-cover" />
                  ) : (
                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.997A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </span>
                <label
                  htmlFor="logo-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                >
                  <span>Changer le logo</span>
                  <input id="logo-upload" name="logo-upload" type="file" className="sr-only" onChange={handleLogoChange} accept="image/*" />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nom de l'institution <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name')}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Type d'institution <span className="text-red-500">*</span>
                </label>
                <select
                  id="type"
                  {...register('type')}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option value="">Sélectionner un type</option>
                  <option value="BANQUE">Banque</option>
                  <option value="MICROFINANCE">Microfinance</option>
                  <option value="COOPEC">Coopérative d'Épargne et de Crédit (COOPEC)</option>
                  <option value="FOND_GARANTIE">Fond de Garantie</option>
                  <option value="ENTREPRISE_FINANCIERE">Entreprise Financière</option>
                  <option value="FOND_CAPITAL_INVESTISSEMENT">Fond de Capital Investissement</option>
                  <option value="FOND_IMPACT">Fond d'Impact</option>
                  <option value="AUTRE">Autre</option>
                </select>
                {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>}
              </div>

              <div>
                <label htmlFor="sector" className="block text-sm font-medium text-gray-700">
                  Secteur
                </label>
                <select
                  id="sector"
                  {...register('sector')}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option value="">Sélectionner un secteur</option>
                  <option value="PRIVE">Privé</option>
                  <option value="PUBLIC">Public</option>
                  <option value="PUBLIC_PRIVE">Public-Privé</option>
                </select>
                {errors.sector && <p className="mt-1 text-sm text-red-600">{errors.sector.message}</p>}
              </div>

              <div>
                <label htmlFor="legalForm" className="block text-sm font-medium text-gray-700">
                  Forme Juridique
                </label>
                <select
                  id="legalForm"
                  {...register('legalForm')}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option value="">Sélectionner une forme juridique</option>
                  <option value="SA">SA - Société Anonyme</option>
                  <option value="SARL">SARL - Société à Responsabilité Limitée</option>
                  <option value="SAS">SAS - Société par Actions Simplifiée</option>
                  <option value="SNC">SNC - Société en Nom Collectif</option>
                  <option value="SCS">SCS - Société en Commandite Simple</option>
                  <option value="GIE">GIE - Groupement d'Intérêt Économique</option>
                  <option value="EP">EP - Établissement Public</option>
                  <option value="AUTRE">Autre</option>
                </select>
                {errors.legalForm && <p className="mt-1 text-sm text-red-600">{errors.legalForm.message}</p>}
              </div>

              <div>
                <label htmlFor="creationDate" className="block text-sm font-medium text-gray-700">
                  Date de création
                </label>
                <input
                  id="creationDate"
                  type="date"
                  {...register('creationDate')}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
                {errors.creationDate && <p className="mt-1 text-sm text-red-600">{errors.creationDate.message}</p>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                  Site Web
                </label>
                <input
                  id="website"
                  type="text"
                  {...register('website')}
                  placeholder="https://exemple.com"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
                {errors.website && <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>}
              </div>
            </div>
          </div>
        );
      case 2: // Infos Réglementaires
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="approvalNumber" className="block text-sm font-medium text-gray-700">
                Numéro d'agrément
              </label>
              <input
                id="approvalNumber"
                type="text"
                {...register('approvalNumber')}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
              {errors.approvalNumber && <p className="mt-1 text-sm text-red-600">{errors.approvalNumber.message}</p>}
            </div>
            <div>
              <label htmlFor="taxId" className="block text-sm font-medium text-gray-700">
                N° Impôt
              </label>
              <input
                id="taxId"
                type="text"
                {...register('taxId')}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
              {errors.taxId && <p className="mt-1 text-sm text-red-600">{errors.taxId.message}</p>}
            </div>
            <div>
              <label htmlFor="rccm" className="block text-sm font-medium text-gray-700">
                Numéro RCCM
              </label>
              <input
                id="rccm"
                type="text"
                {...register('rccm')}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
              {errors.rccm && <p className="mt-1 text-sm text-red-600">{errors.rccm.message}</p>}
            </div>
            <div>
              <label htmlFor="natId" className="block text-sm font-medium text-gray-700">
                ID National
              </label>
              <input
                id="natId"
                type="text"
                {...register('natId')}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
              {errors.natId && <p className="mt-1 text-sm text-red-600">{errors.natId.message}</p>}
            </div>
          </div>
        );
      case 3: // Siège Social
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Adresse légale</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="headquartersAddress.street" className="block text-sm font-medium text-gray-700">
                    Rue
                  </label>
                  <input
                    id="headquartersAddress.street"
                    type="text"
                    {...register('headquartersAddress.street')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                  {errors.headquartersAddress?.street && <p className="mt-1 text-sm text-red-600">{errors.headquartersAddress.street.message}</p>}
                </div>
                <div>
                  <label htmlFor="headquartersAddress.city" className="block text-sm font-medium text-gray-700">
                    Ville
                  </label>
                  <input
                    id="headquartersAddress.city"
                    type="text"
                    {...register('headquartersAddress.city')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                  {errors.headquartersAddress?.city && <p className="mt-1 text-sm text-red-600">{errors.headquartersAddress.city.message}</p>}
                </div>
                <div>
                  <label htmlFor="headquartersAddress.province" className="block text-sm font-medium text-gray-700">
                    Province
                  </label>
                  <input
                    id="headquartersAddress.province"
                    type="text"
                    {...register('headquartersAddress.province')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                  {errors.headquartersAddress?.province && <p className="mt-1 text-sm text-red-600">{errors.headquartersAddress.province.message}</p>}
                </div>
                <div>
                  <label htmlFor="headquartersAddress.country" className="block text-sm font-medium text-gray-700">
                    Pays
                  </label>
                  <input
                    id="headquartersAddress.country"
                    type="text"
                    {...register('headquartersAddress.country')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                  {errors.headquartersAddress?.country && <p className="mt-1 text-sm text-red-600">{errors.headquartersAddress.country.message}</p>}
                </div>
              </div>
            </div>
            
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700">Emplacements sur la carte</h3>
              <p className="text-sm text-gray-500">
                Ajoutez un ou plusieurs emplacements en cliquant sur la carte. Vous pouvez spécifier le type d'emplacement (siège social, succursale, etc.) et ajouter des détails complémentaires.
              </p>
              
              <LocationMapSelector 
                locations={locations} 
                onChange={setLocations} 
                defaultType="headquarters" 
                defaultName="Siège social"
              />
            </div>
          </div>
        );
      case 4: // Personne de Contact
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contactPerson.name" className="block text-sm font-medium text-gray-700">
                Nom complet
              </label>
              <input
                id="contactPerson.name"
                type="text"
                {...register('contactPerson.name')}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
              {errors.contactPerson?.name && <p className="mt-1 text-sm text-red-600">{errors.contactPerson.name.message}</p>}
            </div>
            <div>
              <label htmlFor="contactPerson.email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="contactPerson.email"
                type="email"
                {...register('contactPerson.email')}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
              {errors.contactPerson?.email && <p className="mt-1 text-sm text-red-600">{errors.contactPerson.email.message}</p>}
            </div>
            <div>
              <label htmlFor="contactPerson.phone" className="block text-sm font-medium text-gray-700">
                Téléphone
              </label>
              <input
                id="contactPerson.phone"
                type="text"
                {...register('contactPerson.phone')}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
              {errors.contactPerson?.phone && <p className="mt-1 text-sm text-red-600">{errors.contactPerson.phone.message}</p>}
            </div>
            <div>
              <label htmlFor="contactPerson.role" className="block text-sm font-medium text-gray-700">
                Rôle
              </label>
              <input
                id="contactPerson.role"
                type="text"
                {...register('contactPerson.role')}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
              {errors.contactPerson?.role && <p className="mt-1 text-sm text-red-600">{errors.contactPerson.role.message}</p>}
            </div>
          </div>
        );
      case 5: // Activités & Finances
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="capital.amount" className="block text-sm font-medium text-gray-700">
                Capital Social
              </label>
              <input
                id="capital.amount"
                type="number"
                {...register('capital.amount', { valueAsNumber: true })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
              {errors.capital?.amount && <p className="mt-1 text-sm text-red-600">{errors.capital.amount.message}</p>}
            </div>
            <div>
              <label htmlFor="capital.currency" className="block text-sm font-medium text-gray-700">
                Devise
              </label>
              <select
                id="capital.currency"
                {...register('capital.currency')}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                <option value="USD">USD</option>
                <option value="CDF">CDF</option>
                <option value="EUR">EUR</option>
              </select>
              {errors.capital?.currency && <p className="mt-1 text-sm text-red-600">{errors.capital.currency.message}</p>}
            </div>
            <div className="md:col-span-2">
              <label htmlFor="primaryActivity" className="block text-sm font-medium text-gray-700">
                Activité Principale
              </label>
              <input
                id="primaryActivity"
                type="text"
                {...register('primaryActivity')}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
              {errors.primaryActivity && <p className="mt-1 text-sm text-red-600">{errors.primaryActivity.message}</p>}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    {institution?.id ? 'Modifier' : 'Créer'} le profil de l'institution financière
                  </h3>
                  
                  {/* Barre de progression */}
                  <div className="my-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Étape {currentStep} sur {TOTAL_STEPS}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-4">
                    {renderStepContent()}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse items-center">
              {currentStep < TOTAL_STEPS && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Suivant
                </button>
              )}
              
              {currentStep === TOTAL_STEPS && (
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                >
                  {loading ? <><Loader2 className="animate-spin mr-2" /> Enregistrement...</> : 'Enregistrer'}
                </button>
              )}

              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Précédent
                </button>
              )}

              <div className="flex-grow sm:flex-grow-0">
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Annuler
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
