import { useState, useRef, ChangeEvent } from 'react';
import { Company, Associate } from '../../types/user';
import { useCompany } from '../../hooks/useCompany';
import { Camera } from 'lucide-react';

interface OrganizationFormModalProps {
  company: Company;
  isOpen: boolean;
  onClose: () => void;
}

export function OrganizationFormModal({ company, isOpen, onClose }: OrganizationFormModalProps) {
  const { updateCompany, uploadLogo, loading: isUpdating } = useCompany(company.id);
  const [currentStep, setCurrentStep] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // État pour stocker l'image prévisualisée
  const [previewLogo, setPreviewLogo] = useState<string | null>(company.logo || null);
  
  // État complet du formulaire avec toutes les propriétés nécessaires
  const [formData, setFormData] = useState({
    // Étape 1: Informations générales et légales
    name: company.name,
    legalForm: company.legalForm || '',
    rccm: company.rccm || '',
    taxId: company.taxId || '',
    natId: company.natId || '',
    industry: company.industry || '',
    size: company.size || '',
    website: company.website || '',
    description: company.description || '',
    
    // Étape 2: Propriétaire, associés, capital et activités
    ownerName: company.owner?.name || '',
    ownerEmail: company.owner?.email || '',
    ownerPhone: company.owner?.phone || '',
    
    // Associés (gérés séparément)
    associates: company.associates || [],
    
    // Activités
    primaryActivity: company.activities?.primary || '',
    secondaryActivities: company.activities?.secondary || [],
    
    // Capital
    capitalAmount: company.capital?.amount?.toString() || '',
    capitalCurrency: company.capital?.currency || 'USD',
    capitalIsApplicable: company.capital?.isApplicable !== false, // Par défaut à true
    
    // Étape 3: Adresse, contacts et affiliations
    street: company.address?.street || '',
    city: company.address?.city || '',
    commune: company.address?.commune || '',
    province: company.address?.province || '',
    country: company.address?.country || 'République Démocratique du Congo',
    
    email: company.contacts?.email || '',
    phone: company.contacts?.phone || '',
    altPhone: company.contacts?.altPhone || '',
    
    cnss: company.affiliations?.cnss || '',
    inpp: company.affiliations?.inpp || '',
    onem: company.affiliations?.onem || '',
  });
  
  // Pour gérer le champ d'activité secondaire temporaire
  const [newSecondaryActivity, setNewSecondaryActivity] = useState('');
  
  if (!isOpen) return null;

  // Gestion du changement d'étape
  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
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
      secondaryActivities: prev.secondaryActivities.filter((_: string, i: number) => i !== index)
    }));
  };
  
  const handleAddAssociate = () => {
    setFormData(prev => ({
      ...prev,
      associates: [...prev.associates, { name: '', role: '', shares: 0 }]
    }));
  };
  
  const handleRemoveAssociate = (index: number) => {
    setFormData(prev => ({
      ...prev,
      associates: prev.associates.filter((_: Associate, i: number) => i !== index)
    }));
  };
  
  const handleAssociateChange = (index: number, field: string, value: string | number) => {
    setFormData(prev => {
      const updatedAssociates = [...prev.associates];
      updatedAssociates[index] = { 
        ...updatedAssociates[index], 
        [field]: field === 'shares' ? Number(value) : value 
      };
      return {
        ...prev,
        associates: updatedAssociates
      };
    });
  };
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Prévisualisation du fichier
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  // Validation par étape
  const validateCurrentStep = () => {
    const newErrors: Record<string, string> = {};
    
    if (currentStep === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Le nom de l\'entreprise est obligatoire';
      }
      
      if (formData.website && !formData.website.match(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/)) {
        newErrors.website = 'Format d\'URL invalide';
      }
    }
    
    if (currentStep === 2) {
      if (!formData.ownerName.trim()) {
        newErrors.ownerName = 'Le nom du propriétaire est obligatoire';
      }
      
      if (formData.ownerEmail && !formData.ownerEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        newErrors.ownerEmail = 'Format d\'email invalide';
      }
    }
    
    if (currentStep === 3) {
      if (formData.email && !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        newErrors.email = 'Format d\'email invalide';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validate = () => {
    return validateCurrentStep();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    const updatedCompany: Partial<Company> = {
      // Étape 1
      name: formData.name,
      legalForm: formData.legalForm || undefined,
      rccm: formData.rccm || undefined,
      taxId: formData.taxId || undefined,
      natId: formData.natId || undefined,
      industry: formData.industry || undefined,
      size: formData.size || undefined,
      website: formData.website || undefined,
      description: formData.description || undefined,
      
      // Étape 2
      owner: {
        id: company.owner?.id || '', // Assurer que l'ID du propriétaire est conservé
        name: formData.ownerName,
        email: formData.ownerEmail || undefined,
        phone: formData.ownerPhone || undefined
      },
      associates: formData.associates.length > 0 ? formData.associates : undefined,
      activities: {
        primary: formData.primaryActivity || undefined,
        secondary: formData.secondaryActivities.length > 0 ? formData.secondaryActivities : undefined
      },
      capital: {
        amount: formData.capitalAmount ? Number(formData.capitalAmount) : undefined,
        currency: formData.capitalCurrency || undefined,
        isApplicable: formData.capitalIsApplicable
      },
      
      // Étape 3
      address: {
        street: formData.street || undefined,
        city: formData.city || undefined,
        commune: formData.commune || undefined,
        province: formData.province || undefined,
        country: formData.country || undefined
      },
      contacts: {
        email: formData.email || undefined,
        phone: formData.phone || undefined,
        altPhone: formData.altPhone || undefined
      },
      affiliations: {
        cnss: formData.cnss || undefined,
        inpp: formData.inpp || undefined,
        onem: formData.onem || undefined
      }
    };
    
    // Upload du logo si un nouveau fichier a été sélectionné
    if (fileInputRef.current?.files?.length) {
      const file = fileInputRef.current.files[0];
      try {
        await uploadLogo(file);
      } catch (error) {
        console.error('Failed to upload logo:', error);
        setErrors(prev => ({...prev, form: "L'envoi du logo a échoué."}))
        return; // Stop submission if logo upload fails
      }
    }

    try {
      await updateCompany(updatedCompany);
      setSuccessMessage('Informations mises à jour avec succès !');
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Failed to update company:', error);
      setErrors(prev => ({...prev, form: "La mise à jour a échoué."}))
    }
  };

  // Fonction pour rendre le contenu de chaque étape
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-5">
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
      
      case 2:
        return (
          <div className="space-y-5">
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
                            onChange={(e) => handleAssociateChange(index, 'shares', e.target.value)}
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
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">
                    Activités secondaires
                  </label>
                </div>
                
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
                
                {formData.secondaryActivities.length > 0 ? (
                  <ul className="mt-2 divide-y divide-gray-100 border border-gray-200 rounded-md overflow-hidden">
                    {formData.secondaryActivities.map((activity: string, index: number) => (
                      <li key={index} className="flex justify-between items-center p-2 hover:bg-gray-50">
                        <span className="text-sm">{activity}</span>
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
                ) : (
                  <p className="text-sm text-gray-500 italic mt-2">Aucune activité secondaire</p>
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
      
      case 3:
        return (
          <div className="space-y-5">
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
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 sm:mx-0 sm:h-16 sm:w-16 relative group">
                  {previewLogo ? (
                    <img
                      src={previewLogo || undefined}
                      alt="Aperçu du logo"
                      className="h-full w-full object-contain rounded-full"
                    />
                  ) : (
                    <svg className="h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                   <div 
                    className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center cursor-pointer transition-opacity"
                    onClick={handleUploadClick}
                  >
                    <Camera className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Modifier le profil de l'entreprise (Étape {currentStep}/3)
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {currentStep === 1 && 'Informations générales et légales'}
                      {currentStep === 2 && 'Propriétaire, associés, capital et activités'}
                      {currentStep === 3 && 'Adresse, contacts et affiliations'}
                    </p>
                  </div>
                </div>
              </div>

              {successMessage && (
                <div className="mt-4 p-3 bg-green-100 border border-green-200 text-green-800 rounded-md">
                  {successMessage}
                </div>
              )}

              <div className="mt-5 max-h-[60vh] overflow-y-auto pr-2">
                {renderStepContent()}
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse items-center">
              <button
                type={currentStep === 3 ? 'submit' : 'button'}
                onClick={currentStep < 3 ? nextStep : undefined}
                disabled={isUpdating}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
              >
                {isUpdating ? 'Sauvegarde...' : (currentStep === 3 ? 'Enregistrer' : 'Suivant')}
              </button>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Précédent
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm mr-auto"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
