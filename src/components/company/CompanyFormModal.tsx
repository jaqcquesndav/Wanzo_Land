import { useState, useEffect, ChangeEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Company, companySchema } from '../../types/user';
import { useCompany } from '../../hooks/useCompany';
import { Loader2 } from 'lucide-react';
import { LocationMapSelector, Location } from '../map/LocationMapSelector';

interface CompanyFormModalProps {
  company: Company;
  isOpen: boolean;
  onClose: () => void;
}

const TOTAL_STEPS = 3;

// Type fortement typé pour le formulaire basé sur le schéma Zod
type FormData = z.infer<typeof companySchema>;

export function CompanyFormModal({ company, isOpen, onClose }: CompanyFormModalProps) {
  const { updateCompany, uploadLogo, uploadOwnerCV, isUpdating } = useCompany(company.id);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [logoPreview, setLogoPreview] = useState(company?.logo || '');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [cvPreview, setCvPreview] = useState(company?.owner?.cv || '');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [locations, setLocations] = useState<Location[]>(company?.locations || []);
  const [newSecondaryActivity, setNewSecondaryActivity] = useState('');
  
  // Initialiser react-hook-form avec le schéma Zod
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset, 
    trigger,
    setValue,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(companySchema),
    defaultValues: mapCompanyToFormData(company),
  });

  // Fonction pour mapper l'objet company aux valeurs du formulaire
  function mapCompanyToFormData(company: Company): FormData {
    return {
      id: company.id,
      name: company.name || '',
      legalForm: company.legalForm || '',
      rccm: company.rccm || '',
      taxId: company.taxId || '',
      natId: company.natId || '',
      industry: company.industry || '',
      size: company.size || '',
      website: company.website || '',
      facebookPage: company.facebookPage || '',
      description: company.description || '',
      logo: company.logo || '',
      
      // Adresse
      address: {
        street: company.address?.street || '',
        commune: company.address?.commune || '',
        city: company.address?.city || '',
        province: company.address?.province || '',
        country: company.address?.country || 'République Démocratique du Congo',
      },
      
      // Emplacements
      locations: company.locations || [],
      
      // Contacts
      contacts: {
        email: company.contacts?.email || '',
        phone: company.contacts?.phone || '',
        altPhone: company.contacts?.altPhone || '',
      },
      
      // Dirigeant
      owner: {
        id: company.owner?.id || '',
        name: company.owner?.name || '',
        gender: company.owner?.gender || undefined,
        email: company.owner?.email || '',
        phone: company.owner?.phone || '',
        hasOtherJob: company.owner?.hasOtherJob ?? false,
        cv: company.owner?.cv || '',
        linkedin: company.owner?.linkedin || '',
        facebook: company.owner?.facebook || '',
      },
      
      // Associés
      associates: company.associates || [],
      
      // Activités
      activities: {
        primary: company.activities?.primary || '',
        secondary: company.activities?.secondary || [],
      },
      
      // Capital
      capital: {
        isApplicable: company.capital?.isApplicable ?? true,
        amount: company.capital?.amount || 0,
        currency: company.capital?.currency || 'USD',
      },
      
      // Affiliations
      affiliations: {
        cnss: company.affiliations?.cnss || '',
        inpp: company.affiliations?.inpp || '',
        onem: company.affiliations?.onem || '',
        intraCoop: company.affiliations?.intraCoop || '',
        interCoop: company.affiliations?.interCoop || '',
        partners: company.affiliations?.partners || [],
      },
    };
  }

  // Réinitialiser le formulaire si l'objet company change ou si le modal est rouvert
  useEffect(() => {
    if (isOpen) {
      reset(mapCompanyToFormData(company));
      setCurrentStep(1);
      setLogoPreview(company?.logo || '');
      setLogoFile(null);
      setCvPreview(company?.owner?.cv || '');
      setCvFile(null);
      setLocations(company?.locations || []);
    }
  }, [company, isOpen, reset]);

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleCVChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCvPreview(reader.result as string);
        setCvFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  // Pour le drag and drop du CV
  const handleCVDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCvPreview(reader.result as string);
        setCvFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- Gestion des associés ---
  const handleAddAssociate = () => {
    const currentAssociates = watch('associates') || [];
    setValue('associates', [...currentAssociates, { name: '', gender: undefined, role: '', shares: 0, email: '', phone: '' }]);
  };

  const handleRemoveAssociate = (index: number) => {
    const currentAssociates = watch('associates') || [];
    setValue('associates', currentAssociates.filter((_, i) => i !== index));
  };

  // --- Gestion des activités secondaires ---
  const handleAddSecondaryActivity = () => {
    if (newSecondaryActivity.trim()) {
      const currentActivities = watch('activities')?.secondary || [];
      setValue('activities.secondary', [...currentActivities, newSecondaryActivity.trim()]);
      setNewSecondaryActivity('');
    }
  };

  const handleRemoveSecondaryActivity = (index: number) => {
    const currentActivities = watch('activities')?.secondary || [];
    setValue('activities.secondary', currentActivities.filter((_, i) => i !== index));
  };

  const handleNext = async () => {
    const fieldsToValidate = [];
    
    // Déterminer les champs à valider en fonction de l'étape actuelle
    switch (currentStep) {
      case 1: // Informations générales
        fieldsToValidate.push(
          'name', 'legalForm', 'rccm', 'taxId', 'natId', 
          'industry', 'size', 'website', 'facebookPage', 'description'
        );
        break;
      case 2: // Dirigeant et associés
        fieldsToValidate.push(
          'owner.name', 'owner.email', 'owner.phone', 
          'owner.linkedin', 'owner.facebook', 'associates'
        );
        break;
      case 3: // Coordonnées et activités
        fieldsToValidate.push(
          'contacts.email', 'contacts.phone', 
          'address.street', 'address.city', 'address.province', 
          'activities.primary', 'capital.amount', 'capital.currency'
        );
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
      console.log("Formulaire soumis à l'étape:", currentStep);
      
      // Si nous ne sommes pas à la dernière étape, passez à l'étape suivante
      if (currentStep < TOTAL_STEPS) {
        handleNext();
        return;
      }
      
      // Sinon, soumettre le formulaire
      let logoUrl = company.logo;
      if (logoFile) {
        const uploadResult = await uploadLogo(logoFile);
        if (uploadResult?.url) {
          logoUrl = uploadResult.url;
        }
      }

      let cvUrl = company.owner?.cv;
      if (cvFile) {
        const uploadResult = await uploadOwnerCV(cvFile);
        if (uploadResult?.url) {
          cvUrl = uploadResult.url;
        }
      }

      // Mise à jour des données de l'entreprise avec les valeurs du formulaire
      await updateCompany({
        ...data,
        logo: logoUrl,
        owner: {
          id: company.owner?.id || '',
          name: data.owner?.name || '',
          gender: data.owner?.gender,
          email: data.owner?.email,
          phone: data.owner?.phone,
          hasOtherJob: data.owner?.hasOtherJob,
          cv: cvUrl,
          linkedin: data.owner?.linkedin,
          facebook: data.owner?.facebook
        },
        locations: locations // Utiliser les locations du state
      });
      
      onClose();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'entreprise:', error);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Informations générales
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 text-left">Logo</label>
              <div className="mt-1 flex items-center space-x-4">
                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Aperçu du logo" className="h-full w-full object-cover" />
                  ) : company?.logo ? (
                    <img src={company.logo} alt="Logo actuel" className="h-full w-full object-cover" />
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
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-left">
                  Nom de l'entreprise <span className="text-red-500">*</span>
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
                <label htmlFor="legalForm" className="block text-sm font-medium text-gray-700 text-left">
                  Forme Juridique
                </label>
                <select
                  id="legalForm"
                  {...register('legalForm')}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option value="">Sélectionner</option>
                  <option value="SARL">SARL</option>
                  <option value="SA">SA</option>
                  <option value="SAS">SAS</option>
                  <option value="SPRL">SPRL</option>
                  <option value="Entreprise Individuelle">Entreprise Individuelle</option>
                  <option value="Coopérative">Coopérative</option>
                  <option value="ONG">ONG</option>
                  <option value="ASBL">ASBL</option>
                  <option value="Autre">Autre</option>
                </select>
                {errors.legalForm && <p className="mt-1 text-sm text-red-600">{errors.legalForm.message}</p>}
              </div>

              <div>
                <label htmlFor="rccm" className="block text-sm font-medium text-gray-700">
                  RCCM
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
                <label htmlFor="taxId" className="block text-sm font-medium text-gray-700">
                  Numéro Impôt
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

              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                  Secteur d'activité
                </label>
                <input
                  id="industry"
                  type="text"
                  {...register('industry')}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
                {errors.industry && <p className="mt-1 text-sm text-red-600">{errors.industry.message}</p>}
              </div>

              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                  Taille de l'entreprise
                </label>
                <select
                  id="size"
                  {...register('size')}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option value="">Sélectionner</option>
                  <option value="1-10 employés">1-10 employés</option>
                  <option value="11-50 employés">11-50 employés</option>
                  <option value="51-200 employés">51-200 employés</option>
                  <option value="201-500 employés">201-500 employés</option>
                  <option value="501+ employés">501+ employés</option>
                </select>
                {errors.size && <p className="mt-1 text-sm text-red-600">{errors.size.message}</p>}
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                  Site Web
                </label>
                <input
                  id="website"
                  type="text"
                  {...register('website')}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="https://www.votrenom.com"
                />
                {errors.website && <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>}
              </div>

              <div>
                <label htmlFor="facebookPage" className="block text-sm font-medium text-gray-700">
                  Page Facebook
                </label>
                <input
                  id="facebookPage"
                  type="text"
                  {...register('facebookPage')}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="https://facebook.com/votrepage"
                />
                {errors.facebookPage && <p className="mt-1 text-sm text-red-600">{errors.facebookPage.message}</p>}
              </div>

              <div className="col-span-1 md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 text-left">
                  Description de l'entreprise
                </label>
                <textarea
                  id="description"
                  {...register('description')}
                  rows={3}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Décrivez votre entreprise en quelques phrases..."
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
              </div>
            </div>
          </div>
        );
      
      case 2: // Propriétaire et associés
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Dirigeant</h3>
              
              {/* Zone de dépôt du CV */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 text-left">
                  CV du dirigeant (PDF)
                </label>
                <div 
                  className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md min-h-[100px]"
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onDrop={handleCVDrop}
                >
                  <div className="space-y-1 text-center">
                    {cvPreview ? (
                      <div className="flex flex-col items-center">
                        <svg className="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm text-gray-600">CV téléchargé avec succès</p>
                      </div>
                    ) : (
                      <>
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label htmlFor="cv-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                            <span>Télécharger un fichier</span>
                            <input id="cv-upload" name="cv-upload" type="file" className="sr-only" onChange={handleCVChange} accept=".pdf" />
                          </label>
                          <p className="pl-1">ou glisser-déposer</p>
                        </div>
                        <p className="text-xs text-gray-500">PDF uniquement</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="owner.name" className="block text-sm font-medium text-gray-700">
                    Nom du dirigeant <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="owner.name"
                    type="text"
                    {...register('owner.name')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                  {errors.owner?.name && <p className="mt-1 text-sm text-red-600">{errors.owner.name.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="owner.gender" className="block text-sm font-medium text-gray-700">
                    Genre du dirigeant
                  </label>
                  <select
                    id="owner.gender"
                    {...register('owner.gender')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="male">Masculin</option>
                    <option value="female">Féminin</option>
                  </select>
                  {errors.owner?.gender && <p className="mt-1 text-sm text-red-600">{errors.owner.gender.message}</p>}
                </div>

                <div>
                  <label htmlFor="owner.email" className="block text-sm font-medium text-gray-700">
                    Email du dirigeant
                  </label>
                  <input
                    id="owner.email"
                    type="email"
                    {...register('owner.email')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                  {errors.owner?.email && <p className="mt-1 text-sm text-red-600">{errors.owner.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="owner.phone" className="block text-sm font-medium text-gray-700">
                    Téléphone du dirigeant
                  </label>
                  <input
                    id="owner.phone"
                    type="tel"
                    {...register('owner.phone')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                  {errors.owner?.phone && <p className="mt-1 text-sm text-red-600">{errors.owner.phone.message}</p>}
                </div>

                <div className="flex items-center mt-4 md:mt-0">
                  <input
                    id="owner.hasOtherJob"
                    type="checkbox"
                    {...register('owner.hasOtherJob')}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="owner.hasOtherJob" className="ml-2 block text-sm text-gray-700">
                    Le dirigeant a un autre emploi
                  </label>
                </div>

                <div>
                  <label htmlFor="owner.linkedin" className="block text-sm font-medium text-gray-700">
                    LinkedIn du dirigeant
                  </label>
                  <input
                    id="owner.linkedin"
                    type="text"
                    {...register('owner.linkedin')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="https://linkedin.com/in/username"
                  />
                  {errors.owner?.linkedin && <p className="mt-1 text-sm text-red-600">{errors.owner.linkedin.message}</p>}
                </div>

                <div>
                  <label htmlFor="owner.facebook" className="block text-sm font-medium text-gray-700">
                    Facebook du dirigeant
                  </label>
                  <input
                    id="owner.facebook"
                    type="text"
                    {...register('owner.facebook')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="https://facebook.com/username"
                  />
                  {errors.owner?.facebook && <p className="mt-1 text-sm text-red-600">{errors.owner.facebook.message}</p>}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Associés</h3>
                <button
                  type="button"
                  onClick={handleAddAssociate}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Ajouter un associé
                </button>
              </div>

              {watch('associates')?.map((_, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-md font-medium text-gray-700">Associé #{index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => handleRemoveAssociate(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Supprimer
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nom
                      </label>
                      <input
                        type="text"
                        {...register(`associates.${index}.name` as const)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                      {errors.associates?.[index]?.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.associates[index]?.name?.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Genre
                      </label>
                      <select
                        {...register(`associates.${index}.gender` as const)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="male">Masculin</option>
                        <option value="female">Féminin</option>
                      </select>
                      {errors.associates?.[index]?.gender && (
                        <p className="mt-1 text-sm text-red-600">{errors.associates[index]?.gender?.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Rôle
                      </label>
                      <input
                        type="text"
                        {...register(`associates.${index}.role` as const)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Parts (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        {...register(`associates.${index}.shares` as const, { valueAsNumber: true })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                      {errors.associates?.[index]?.shares && (
                        <p className="mt-1 text-sm text-red-600">{errors.associates[index]?.shares?.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        {...register(`associates.${index}.email` as const)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                      {errors.associates?.[index]?.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.associates[index]?.email?.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        {...register(`associates.${index}.phone` as const)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {!watch('associates')?.length && (
                <p className="text-sm text-gray-500 italic">Aucun associé enregistré.</p>
              )}
            </div>
          </div>
        );
      
      case 3: // Coordonnées et activités
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Coordonnées</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contacts.email" className="block text-sm font-medium text-gray-700">
                    Email de contact
                  </label>
                  <input
                    id="contacts.email"
                    type="email"
                    {...register('contacts.email')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                  {errors.contacts?.email && <p className="mt-1 text-sm text-red-600">{errors.contacts.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="contacts.phone" className="block text-sm font-medium text-gray-700">
                    Téléphone principal
                  </label>
                  <input
                    id="contacts.phone"
                    type="tel"
                    {...register('contacts.phone')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                  {errors.contacts?.phone && <p className="mt-1 text-sm text-red-600">{errors.contacts.phone.message}</p>}
                </div>

                <div>
                  <label htmlFor="contacts.altPhone" className="block text-sm font-medium text-gray-700">
                    Téléphone secondaire
                  </label>
                  <input
                    id="contacts.altPhone"
                    type="tel"
                    {...register('contacts.altPhone')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                  {errors.contacts?.altPhone && <p className="mt-1 text-sm text-red-600">{errors.contacts.altPhone.message}</p>}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Adresse</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <label htmlFor="address.street" className="block text-sm font-medium text-gray-700">
                    Rue
                  </label>
                  <input
                    id="address.street"
                    type="text"
                    {...register('address.street')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                  {errors.address?.street && <p className="mt-1 text-sm text-red-600">{errors.address.street.message}</p>}
                </div>

                <div>
                  <label htmlFor="address.commune" className="block text-sm font-medium text-gray-700">
                    Commune
                  </label>
                  <input
                    id="address.commune"
                    type="text"
                    {...register('address.commune')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                  {errors.address?.commune && <p className="mt-1 text-sm text-red-600">{errors.address.commune.message}</p>}
                </div>

                <div>
                  <label htmlFor="address.city" className="block text-sm font-medium text-gray-700">
                    Ville
                  </label>
                  <input
                    id="address.city"
                    type="text"
                    {...register('address.city')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                  {errors.address?.city && <p className="mt-1 text-sm text-red-600">{errors.address.city.message}</p>}
                </div>

                <div>
                  <label htmlFor="address.province" className="block text-sm font-medium text-gray-700">
                    Province
                  </label>
                  <input
                    id="address.province"
                    type="text"
                    {...register('address.province')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                  {errors.address?.province && <p className="mt-1 text-sm text-red-600">{errors.address.province.message}</p>}
                </div>

                <div>
                  <label htmlFor="address.country" className="block text-sm font-medium text-gray-700">
                    Pays
                  </label>
                  <input
                    id="address.country"
                    type="text"
                    {...register('address.country')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                  {errors.address?.country && <p className="mt-1 text-sm text-red-600">{errors.address.country.message}</p>}
                </div>
              </div>
              
              {/* Sélecteur de localisation géographique */}
              <div className="mt-6">
                <h4 className="text-md font-medium text-gray-700 mb-2">Emplacements géographiques</h4>
                <LocationMapSelector 
                  locations={locations}
                  onChange={setLocations}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Activités</h3>
              
              <div>
                <label htmlFor="activities.primary" className="block text-sm font-medium text-gray-700">
                  Activité principale
                </label>
                <textarea
                  id="activities.primary"
                  {...register('activities.primary')}
                  rows={2}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
                {errors.activities?.primary && <p className="mt-1 text-sm text-red-600">{errors.activities.primary.message}</p>}
              </div>
              
              <div>
                <div className="flex justify-between items-center">
                  <label htmlFor="newSecondaryActivity" className="block text-sm font-medium text-gray-700">
                    Activités secondaires
                  </label>
                </div>
                
                <div className="flex mt-1">
                  <input
                    id="newSecondaryActivity"
                    type="text"
                    value={newSecondaryActivity}
                    onChange={(e) => setNewSecondaryActivity(e.target.value)}
                    className="block w-full border-gray-300 rounded-l-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleAddSecondaryActivity}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-r-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Ajouter
                  </button>
                </div>
                
                <div className="mt-2 space-y-2">
                  {watch('activities')?.secondary?.map((activity, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded-md">
                      <span className="text-sm">{activity}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSecondaryActivity(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  
                  {!watch('activities')?.secondary?.length && (
                    <p className="text-sm text-gray-500 italic">Aucune activité secondaire enregistrée.</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Capital</h3>
              
              <div className="flex items-center">
                <input
                  id="capital.isApplicable"
                  type="checkbox"
                  {...register('capital.isApplicable')}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="capital.isApplicable" className="ml-2 block text-sm text-gray-700">
                  Capital applicable
                </label>
              </div>
              
              {watch('capital.isApplicable') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="capital.amount" className="block text-sm font-medium text-gray-700">
                      Montant du capital
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
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Affiliations</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="affiliations.cnss" className="block text-sm font-medium text-gray-700">
                    CNSS
                  </label>
                  <input
                    id="affiliations.cnss"
                    type="text"
                    {...register('affiliations.cnss')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="affiliations.inpp" className="block text-sm font-medium text-gray-700">
                    INPP
                  </label>
                  <input
                    id="affiliations.inpp"
                    type="text"
                    {...register('affiliations.inpp')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="affiliations.onem" className="block text-sm font-medium text-gray-700">
                    ONEM
                  </label>
                  <input
                    id="affiliations.onem"
                    type="text"
                    {...register('affiliations.onem')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full max-h-[90vh] overflow-y-auto">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-white px-4 py-5 border-b border-gray-200 rounded-t-lg sticky top-0 z-10 sm:px-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {company.id ? "Modifier les informations de l'entreprise" : "Ajouter une nouvelle entreprise"}
                    </h3>
                    <button
                      type="button"
                      className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      onClick={onClose}
                    >
                      <span className="sr-only">Fermer</span>
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
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
                </div>

                <div className="bg-white px-4 py-5 sm:p-6">
                  {renderStepContent()}
                </div>

                <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 rounded-b-lg sticky bottom-0 z-10 sm:px-6 sm:flex sm:flex-row-reverse sm:space-x-3 sm:space-x-reverse">
                  {currentStep === TOTAL_STEPS ? (
                    <button
                      type="button" 
                      onClick={handleSubmit(onSubmit)}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <>
                          <Loader2 className="animate-spin h-4 w-4 mr-2" />
                          Enregistrement...
                        </>
                      ) : (
                        'Enregistrer'
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={handleNext}
                    >
                      Suivant
                    </button>
                  )}
                  
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={currentStep === 1 ? onClose : handleBack}
                  >
                    {currentStep === 1 ? 'Annuler' : 'Précédent'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
