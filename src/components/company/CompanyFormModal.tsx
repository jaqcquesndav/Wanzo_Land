import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Company, Associate } from '../../types/user';
import { useCompany } from '../../hooks/useCompany';
import { Loader2 } from 'lucide-react';
import { LocationMapSelector } from '../map/LocationMapSelector';

interface CompanyFormModalProps {
  company: Company;
  isOpen: boolean;
  onClose: () => void;
}

const TOTAL_STEPS = 3;

// Initialise le formData à partir de l'objet company
const initializeFormData = (company: Company) => ({
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
  
  ownerName: company.owner?.name || '',
  ownerEmail: company.owner?.email || '',
  ownerPhone: company.owner?.phone || '',
  ownerHasOtherJob: company.owner?.hasOtherJob ?? false,
  ownerLinkedin: company.owner?.linkedin || '',
  ownerFacebook: company.owner?.facebook || '',
  
  associates: company.associates || [],
  
  primaryActivity: company.activities?.primary || '',
  secondaryActivities: company.activities?.secondary || [],
  
  capitalIsApplicable: company.capital?.isApplicable ?? true,
  capitalAmount: company.capital?.amount || 0,
  capitalCurrency: company.capital?.currency || 'USD',
  
  // Format d'adresse classique
  street: company.address?.street || '',
  commune: company.address?.commune || '',
  city: company.address?.city || '',
  province: company.address?.province || '',
  country: company.address?.country || 'République Démocratique du Congo',
  
  // Nouveau format d'emplacements avec coordonnées
  locations: company.locations || [],
  
  email: company.contacts?.email || '',
  phone: company.contacts?.phone || '',
  altPhone: company.contacts?.altPhone || '',
  
  cnss: company.affiliations?.cnss || '',
  inpp: company.affiliations?.inpp || '',
  onem: company.affiliations?.onem || '',
  
  logoFile: null as File | null,
  logoPreview: company.logo || '',
  cvFile: null as File | null,
  cvPreview: company.owner?.cv || '',
});

export function CompanyFormModal({ company, isOpen, onClose }: CompanyFormModalProps) {
  const { updateCompany, uploadLogo, uploadOwnerCV, isUpdating } = useCompany(company.id);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(() => initializeFormData(company));
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [newSecondaryActivity, setNewSecondaryActivity] = useState('');

  // Réinitialiser le formulaire si l'objet company change ou si le modal est rouvert
  useEffect(() => {
    if (isOpen) {
      setFormData(initializeFormData(company));
      setCurrentStep(1);
      setErrors({});
    }
  }, [company, isOpen]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ 
          ...prev, 
          logoFile: file,
          logoPreview: reader.result as string 
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCVChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ 
          ...prev, 
          cvFile: file,
          cvPreview: reader.result as string 
        }));
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
        setFormData(prev => ({ 
          ...prev, 
          cvFile: file,
          cvPreview: reader.result as string 
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // --- Gestion des associés ---
  const handleAddAssociate = () => {
    setFormData(prev => ({
      ...prev,
      associates: [...prev.associates, { name: '', role: '', shares: 0, email: '', phone: '' }]
    }));
  };

  const handleRemoveAssociate = (index: number) => {
    setFormData(prev => ({
      ...prev,
      associates: prev.associates.filter((_, i) => i !== index)
    }));
  };

  const handleAssociateChange = (index: number, field: keyof Associate, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      associates: prev.associates.map((assoc, i) => 
        i === index ? { ...assoc, [field]: value } : assoc
      )
    }));
  };

  // --- Gestion des activités secondaires ---
  const handleAddSecondaryActivity = () => {
    if (newSecondaryActivity.trim()) {
      setFormData(prev => ({
        ...prev,
        secondaryActivities: [...prev.secondaryActivities, newSecondaryActivity.trim()]
      }));
      setNewSecondaryActivity('');
    }
  };

  const handleRemoveSecondaryActivity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      secondaryActivities: prev.secondaryActivities.filter((_, i) => i !== index)
    }));
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = "Le nom de l'entreprise est requis.";
      
      // Validation d'URL pour le site web
      if (formData.website && !/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/.test(formData.website)) {
        newErrors.website = "L'URL du site web est invalide.";
      }
      
      // Validation d'URL pour la page Facebook
      if (formData.facebookPage && !/^(https?:\/\/)?(www\.)?(facebook\.com)\/[a-zA-Z0-9.]+/.test(formData.facebookPage)) {
        newErrors.facebookPage = "L'URL de la page Facebook est invalide. Elle doit être au format https://facebook.com/votrepage";
      }
    }
    
    if (currentStep === 2) {
      if (!formData.ownerName.trim()) newErrors.ownerName = "Le nom du propriétaire est requis.";
      
      // Validation des URL des réseaux sociaux du propriétaire
      if (formData.ownerLinkedin && !/^(https?:\/\/)?(www\.)?(linkedin\.com)\/in\/[a-zA-Z0-9_-]+/.test(formData.ownerLinkedin)) {
        newErrors.ownerLinkedin = "L'URL du profil LinkedIn est invalide. Elle doit être au format https://linkedin.com/in/username";
      }
      
      if (formData.ownerFacebook && !/^(https?:\/\/)?(www\.)?(facebook\.com)\/[a-zA-Z0-9.]+/.test(formData.ownerFacebook)) {
        newErrors.ownerFacebook = "L'URL du profil Facebook est invalide. Elle doit être au format https://facebook.com/username";
      }
    }
    
    if (currentStep === 3) {
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "L'adresse email de contact est invalide.";
        }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Valider la dernière étape avant de soumettre
    if (!validateStep()) {
      // Optionnel: Afficher une alerte ou un toast plus spécifique
      // pour informer l'utilisateur des champs manquants à la dernière étape.
      return;
    }

    try {
      let logoUrl = company.logo;
      if (formData.logoFile) {
        const uploadResult = await uploadLogo(formData.logoFile);
        if (uploadResult?.url) {
          logoUrl = uploadResult.url;
        }
      }

      let cvUrl = company.owner?.cv;
      if (formData.cvFile) {
        const uploadResult = await uploadOwnerCV(formData.cvFile);
        if (uploadResult?.url) {
          cvUrl = uploadResult.url;
        }
      }

      const companyDataToUpdate: Partial<Company> = {
        id: company.id,
        name: formData.name,
        legalForm: formData.legalForm,
        rccm: formData.rccm,
        taxId: formData.taxId,
        natId: formData.natId,
        industry: formData.industry,
        size: formData.size,
        website: formData.website,
        facebookPage: formData.facebookPage,
        description: formData.description,
        logo: logoUrl,
        owner: {
          id: company.owner?.id || '', // Conserver l'ID existant
          name: formData.ownerName,
          email: formData.ownerEmail,
          phone: formData.ownerPhone,
          hasOtherJob: formData.ownerHasOtherJob,
          linkedin: formData.ownerLinkedin,
          facebook: formData.ownerFacebook,
          cv: cvUrl,
        },
        associates: formData.associates,
        activities: {
          primary: formData.primaryActivity,
          secondary: formData.secondaryActivities,
        },
        capital: {
          isApplicable: formData.capitalIsApplicable,
          amount: Number(formData.capitalAmount),
          currency: formData.capitalCurrency as 'USD' | 'CDF' | 'EUR',
        },
        address: {
          street: formData.street,
          commune: formData.commune,
          city: formData.city,
          province: formData.province,
          country: formData.country,
        },
        contacts: {
          email: formData.email,
          phone: formData.phone,
          altPhone: formData.altPhone,
        },
        affiliations: {
          cnss: formData.cnss,
          inpp: formData.inpp,
          onem: formData.onem,
        },
      };

      await updateCompany(companyDataToUpdate);
      onClose();
      
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'entreprise:", error);
      // Gérer l'affichage de l'erreur à l'utilisateur
    }
  };

  if (!isOpen) return null;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Informations Générales
        return (
          <div className="space-y-5">
            {/* Logo upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Logo</label>
              <div className="mt-1 flex items-center space-x-4">
                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  {formData.logoPreview ? (
                    <img src={formData.logoPreview} alt="Aperçu du logo" className="h-full w-full object-cover" />
                  ) : company.logo ? (
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
            
            {/* ... Contenu du formulaire pour l'étape 1 ... */}
            {/* Name, LegalForm, Identifiers, Industry, Size, Website, Description */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nom de l'entreprise <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                  errors.name ? 'border-red-300' : ''
                }`}
                required
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="legalForm" className="block text-sm font-medium text-gray-700">
                Forme juridique
              </label>
              <select
                id="legalForm"
                name="legalForm"
                value={formData.legalForm}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                <option value="">Sélectionner une forme juridique</option>
                <option value="SARL">SARL</option>
                <option value="SA">SA</option>
                <option value="SAS">SAS</option>
                <option value="SASU">SASU</option>
                <option value="EI">Entreprise Individuelle</option>
                <option value="ONG">ONG/ASBL</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="rccm" className="block text-sm font-medium text-gray-700">
                  RCCM
                </label>
                <input
                  type="text"
                  name="rccm"
                  id="rccm"
                  value={formData.rccm}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="CD/KIN/RCCM/YY-X-NNNNN"
                />
              </div>
              
              <div>
                <label htmlFor="taxId" className="block text-sm font-medium text-gray-700">
                  N° Impôt
                </label>
                <input
                  type="text"
                  name="taxId"
                  id="taxId"
                  value={formData.taxId}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="natId" className="block text-sm font-medium text-gray-700">
                  ID National
                </label>
                <input
                  type="text"
                  name="natId"
                  id="natId"
                  value={formData.natId}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="NAT/KIN/YYYY/NNNNN"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                  Secteur d'activité
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option value="">Sélectionner un secteur</option>
                  <option value="Technologie">Technologie</option>
                  <option value="Finance">Finance</option>
                  <option value="Santé">Santé</option>
                  <option value="Éducation">Éducation</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Transport">Transport</option>
                  <option value="Énergie">Énergie</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                  Taille de l'entreprise
                </label>
                <select
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option value="">Sélectionner une taille</option>
                  <option value="1-10 employés">1-10 employés</option>
                  <option value="11-50 employés">11-50 employés</option>
                  <option value="50-200 employés">50-200 employés</option>
                  <option value="201-500 employés">201-500 employés</option>
                  <option value="501-1000 employés">501-1000 employés</option>
                  <option value="1000+ employés">1000+ employés</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                Site web
              </label>
              <input
                type="text"
                name="website"
                id="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://exemple.com"
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                  errors.website ? 'border-red-300' : ''
                }`}
              />
              {errors.website && <p className="mt-1 text-sm text-red-600">{errors.website}</p>}
            </div>
            
            <div>
              <label htmlFor="facebookPage" className="block text-sm font-medium text-gray-700">
                Page Facebook
              </label>
              <input
                type="text"
                name="facebookPage"
                id="facebookPage"
                value={formData.facebookPage}
                onChange={handleInputChange}
                placeholder="https://facebook.com/votrepage"
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                  errors.facebookPage ? 'border-red-300' : ''
                }`}
              />
              {errors.facebookPage && <p className="mt-1 text-sm text-red-600">{errors.facebookPage}</p>}
              <p className="mt-1 text-xs text-gray-500">Si vous n'avez pas de site web, vous pouvez indiquer votre page Facebook</p>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
          </div>
        );
      case 2: // Personnes & Activités
        return (
          <div className="space-y-5">
            {/* ... Contenu du formulaire pour l'étape 2 ... */}
            {/* Owner, Associates, Activities, Capital */}
            <div className="bg-blue-50 p-3 rounded-md mb-5 border border-blue-100">
              <h4 className="text-sm font-medium text-blue-800 mb-1">Propriétaire</h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">
                    Nom complet <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    id="ownerName"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                      errors.ownerName ? 'border-red-300' : ''
                    }`}
                    required
                  />
                  {errors.ownerName && <p className="mt-1 text-sm text-red-600">{errors.ownerName}</p>}
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="ownerPhone" className="block text-sm font-medium text-gray-700">
                    Téléphone
                  </label>
                  <input
                    type="text"
                    name="ownerPhone"
                    id="ownerPhone"
                    value={formData.ownerPhone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="ownerEmail" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="ownerEmail"
                    id="ownerEmail"
                    value={formData.ownerEmail}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                      errors.ownerEmail ? 'border-red-300' : ''
                    }`}
                  />
                  {errors.ownerEmail && <p className="mt-1 text-sm text-red-600">{errors.ownerEmail}</p>}
                </div>
                
                {/* Réseaux sociaux du propriétaire */}
                <div className="sm:col-span-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="ownerLinkedin" className="block text-sm font-medium text-gray-700">
                      Profil LinkedIn
                    </label>
                    <input
                      type="text"
                      name="ownerLinkedin"
                      id="ownerLinkedin"
                      value={formData.ownerLinkedin}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/username"
                      className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                        errors.ownerLinkedin ? 'border-red-300' : ''
                      }`}
                    />
                    {errors.ownerLinkedin && <p className="mt-1 text-sm text-red-600">{errors.ownerLinkedin}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="ownerFacebook" className="block text-sm font-medium text-gray-700">
                      Profil Facebook
                    </label>
                    <input
                      type="text"
                      name="ownerFacebook"
                      id="ownerFacebook"
                      value={formData.ownerFacebook}
                      onChange={handleInputChange}
                      placeholder="https://facebook.com/username"
                      className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                        errors.ownerFacebook ? 'border-red-300' : ''
                      }`}
                    />
                    {errors.ownerFacebook && <p className="mt-1 text-sm text-red-600">{errors.ownerFacebook}</p>}
                  </div>
                </div>
                
                {/* CV upload */}
                <div className="sm:col-span-3 border-t border-blue-100 pt-3 mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CV du dirigeant (PDF)
                  </label>
                  
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-md p-4 relative cursor-pointer hover:border-primary-500 transition-colors min-h-[120px] flex flex-col sm:flex-row items-center justify-center"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleCVDrop}
                    onClick={() => document.getElementById('cv-upload')?.click()}
                    role="button"
                    tabIndex={0}
                    aria-label="Télécharger CV (PDF)"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        document.getElementById('cv-upload')?.click();
                      }
                    }}
                  >
                    {formData.cvPreview ? (
                      <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
                        <svg className="h-8 w-8 text-red-500 mb-2 sm:mb-0 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-900">CV téléchargé - Cliquez ou déposez pour changer</span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="mt-1 text-sm text-gray-500">
                          Cliquez pour sélectionner ou déposez un fichier PDF ici
                        </p>
                      </div>
                    )}
                    <input 
                      id="cv-upload" 
                      name="cv-upload" 
                      type="file" 
                      className="sr-only" 
                      onChange={handleCVChange} 
                      accept="application/pdf" 
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Format PDF uniquement, max 5MB.</p>
                </div>
                
                {/* Autre emploi */}
                <div className="sm:col-span-3 flex items-start mt-2">
                  <div className="flex items-center h-5">
                    <input
                      id="ownerHasOtherJob"
                      name="ownerHasOtherJob"
                      type="checkbox"
                      checked={formData.ownerHasOtherJob}
                      onChange={handleCheckboxChange}
                      className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="ownerHasOtherJob" className="font-medium text-gray-700">
                      Le dirigeant a un autre emploi
                    </label>
                    <p className="text-gray-500">Cochez si le dirigeant exerce une autre activité professionnelle en parallèle</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-700">Associés</h4>
                <button
                  type="button"
                  onClick={handleAddAssociate}
                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Ajouter un associé
                </button>
              </div>
              
              {formData.associates.length === 0 ? (
                <p className="text-sm text-gray-500 italic">Aucun associé enregistré</p>
              ) : (
                <div className="space-y-4">
                  {formData.associates.map((associate: Associate, index: number) => (
                    <div key={index} className="p-3 border border-gray-200 rounded-md relative">
                      <button
                        type="button"
                        onClick={() => handleRemoveAssociate(index)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label className="block text-xs font-medium text-gray-700">Nom</label>
                          <input
                            type="text"
                            value={associate.name}
                            onChange={(e) => handleAssociateChange(index, 'name', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-xs"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-medium text-gray-700">Rôle</label>
                          <input
                            type="text"
                            value={associate.role || ''}
                            onChange={(e) => handleAssociateChange(index, 'role', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-xs"
                          />
                        </div>
                        <div className="sm:col-span-1">
                          <label className="block text-xs font-medium text-gray-700">Parts (%)</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={associate.shares || 0}
                            onChange={(e) => handleAssociateChange(index, 'shares', Number(e.target.value))}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-xs"
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <label className="block text-xs font-medium text-gray-700">Email</label>
                          <input
                            type="email"
                            value={associate.email || ''}
                            onChange={(e) => handleAssociateChange(index, 'email', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-xs"
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <label className="block text-xs font-medium text-gray-700">Téléphone</label>
                          <input
                            type="text"
                            value={associate.phone || ''}
                            onChange={(e) => handleAssociateChange(index, 'phone', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="pt-3 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Activités</h4>
              
              <div>
                <label htmlFor="primaryActivity" className="block text-sm font-medium text-gray-700">
                  Activité principale
                </label>
                <input
                  type="text"
                  name="primaryActivity"
                  id="primaryActivity"
                  value={formData.primaryActivity}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700">
                  Activités secondaires
                </label>
                <div className="mt-1 flex">
                  <input
                    type="text"
                    value={newSecondaryActivity}
                    onChange={(e) => setNewSecondaryActivity(e.target.value)}
                    className="block w-full border-gray-300 rounded-l-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Ajouter une activité secondaire"
                  />
                  <button
                    type="button"
                    onClick={handleAddSecondaryActivity}
                    disabled={!newSecondaryActivity.trim()}
                    className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50"
                  >
                    Ajouter
                  </button>
                </div>
                
                {formData.secondaryActivities.length > 0 && (
                  <ul className="mt-2 divide-y divide-gray-100 border border-gray-200 rounded-md overflow-hidden">
                    {formData.secondaryActivities.map((activity: string, index: number) => (
                      <li key={index} className="flex justify-between items-center p-2 hover:bg-gray-50">
                        <span className="text-sm text-gray-700">{activity}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSecondaryActivity(index)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            
            <div className="pt-3 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Capital</h4>
              
              <div className="flex items-start mb-3">
                <div className="flex items-center h-5">
                  <input
                    id="capitalIsApplicable"
                    name="capitalIsApplicable"
                    type="checkbox"
                    checked={formData.capitalIsApplicable}
                    onChange={handleCheckboxChange}
                    className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="capitalIsApplicable" className="font-medium text-gray-700">
                    Applicable
                  </label>
                  <p className="text-gray-500">Décocher pour les entreprises individuelles sans capital social</p>
                </div>
              </div>
              
              {formData.capitalIsApplicable && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="capitalAmount" className="block text-sm font-medium text-gray-700">
                      Montant
                    </label>
                    <input
                      type="number"
                      name="capitalAmount"
                      id="capitalAmount"
                      value={formData.capitalAmount}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="capitalCurrency" className="block text-sm font-medium text-gray-700">
                      Devise
                    </label>
                    <select
                      id="capitalCurrency"
                      name="capitalCurrency"
                      value={formData.capitalCurrency}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    >
                      <option value="USD">USD - Dollar américain</option>
                      <option value="CDF">CDF - Franc congolais</option>
                      <option value="EUR">EUR - Euro</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case 3: // Adresse & Contacts
        return (
          <div className="space-y-5">
            {/* ... Contenu du formulaire pour l'étape 3 ... */}
            {/* Address, Contacts, Affiliations */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Adresse</h4>
              
              <div className="space-y-3">
                <div>
                  <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                    Rue / Avenue
                  </label>
                  <input
                    type="text"
                    name="street"
                    id="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="commune" className="block text-sm font-medium text-gray-700">
                      Commune / Quartier
                    </label>
                    <input
                      type="text"
                      name="commune"
                      id="commune"
                      value={formData.commune}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      Ville
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="province" className="block text-sm font-medium text-gray-700">
                      Province
                    </label>
                    <input
                      type="text"
                      name="province"
                      id="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      Pays
                    </label>
                    <input
                      type="text"
                      name="country"
                      id="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sélecteur d'emplacements géographiques */}
            <div className="pt-5 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">Emplacements géographiques</h4>
              <p className="text-sm text-gray-500 mb-4">
                Sélectionnez les emplacements de votre entreprise sur la carte. Cliquez sur la carte pour ajouter un emplacement.
              </p>
              
              <LocationMapSelector 
                locations={formData.locations}
                onChange={(newLocations) => setFormData({ ...formData, locations: newLocations })}
                showList={true}
                singleLocation={false}
              />
            </div>
            
            <div className="pt-3 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">Contacts</h4>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                      errors.email ? 'border-red-300' : ''
                    }`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Téléphone principal
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="altPhone" className="block text-sm font-medium text-gray-700">
                    Téléphone secondaire
                  </label>
                  <input
                    type="text"
                    name="altPhone"
                    id="altPhone"
                    value={formData.altPhone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            
            <div className="pt-3 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">Affiliations</h4>
              
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <label htmlFor="cnss" className="block text-sm font-medium text-gray-700">
                    CNSS
                  </label>
                  <input
                    type="text"
                    name="cnss"
                    id="cnss"
                    value={formData.cnss}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="inpp" className="block text-sm font-medium text-gray-700">
                    INPP
                  </label>
                  <input
                    type="text"
                    name="inpp"
                    id="inpp"
                    value={formData.inpp}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="onem" className="block text-sm font-medium text-gray-700">
                    ONEM
                  </label>
                  <input
                    type="text"
                    name="onem"
                    id="onem"
                    value={formData.onem}
                    onChange={handleInputChange}
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
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-2 px-2 pb-10 text-center sm:pt-4 sm:px-4 sm:pb-20">
        {/* Overlay de fond avec animation */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
        
        {/* Centrage vertical pour les écrans moyens et grands */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        {/* Modal avec largeur responsive */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
          <form onSubmit={handleSubmit} className="flex flex-col h-full max-h-[90vh] md:max-h-[85vh] rounded-lg overflow-hidden border border-gray-200">
            {/* En-tête du modal */}
            <div className="bg-white px-4 pt-5 pb-2 sm:p-6 sm:pb-2 sticky top-0 z-10 border-b">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    {company.id ? 'Modifier' : 'Créer'} le profil de l'entreprise
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
                </div>
              </div>
            </div>
            
            {/* Contenu du formulaire avec scroll */}
            <div className="px-4 sm:px-6 flex-grow overflow-y-auto max-h-[calc(90vh-15rem)] md:max-h-[calc(85vh-15rem)] bg-white">
              <div className="py-4">
                {renderStepContent()}
              </div>
            </div>
            
            {/* Barre d'actions en bas */}
            <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-col sm:flex-row-reverse items-center sticky bottom-0 z-10 border-t shadow-inner rounded-b-lg">
              <div className="flex flex-col sm:flex-row w-full sm:w-auto space-y-2 sm:space-y-0">
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
                    disabled={isUpdating}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 className="animate-spin mr-2" /> 
                        Enregistrement...
                      </>
                    ) : 'Enregistrer'}
                  </button>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row w-full sm:w-auto mt-2 sm:mt-0 space-y-2 sm:space-y-0 order-first sm:order-none">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Précédent
                  </button>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
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
