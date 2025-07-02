import { useState, useRef, useEffect } from 'react';
import { UserCircle, Edit3, Loader2, Phone, Mail, Briefcase, MapPin, CreditCard, CheckCircle, Shield } from 'lucide-react';
import { useUser } from '../hooks/useUser';
import { User } from '../types/user';
import { PageContainer } from '../components/layout/PageContainer';

// Fonction d'aide pour obtenir le profil initial depuis localStorage
function getInitialUserProfile(): Partial<User> {
  const stored = localStorage.getItem('auth0_user');
  if (!stored) return {};
  
  try {
    const parsedData = JSON.parse(stored);
    return {
      ...parsedData,
      // Mapper sub à id pour être conforme à notre interface User
      id: parsedData.sub || parsedData.id || '',
      // Extraire le rôle des formats potentiels d'Auth0
      role: (parsedData.roles && parsedData.roles[0]) || 
            parsedData['https://ksuit.app/roles']?.[0] || 
            parsedData.role || 
            ''
    };
  } catch (e) {
    console.error('Erreur lors de la lecture des données utilisateur:', e);
    return {};
  }
}

// Fonction pour afficher le statut de vérification d'identité
function IdStatusBadge({ status }: { status?: 'pending' | 'verified' | 'rejected' }) {
  if (!status) return <span className="text-gray-500">Non spécifié</span>;
  
  switch (status) {
    case 'verified':
      return (
        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" /> Vérifié
        </span>
      );
    case 'pending':
      return (
        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
          <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          En attente
        </span>
      );
    case 'rejected':
      return (
        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
          <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Rejeté
        </span>
      );
    default:
      return <span className="text-gray-500">Non spécifié</span>;
  }
}

export default function Profile() {
  // Utiliser le hook useUser pour les opérations liées au profil
  const { user, isUpdating, error, updateUserProfile, uploadProfilePhoto, loadUserProfile, isAuthenticated, isEnrichingData } = useUser();
  
  // États du profil
  const [editMode, setEditMode] = useState(false);
  const [initialProfile] = useState(() => getInitialUserProfile());
  const [photo, setPhoto] = useState<string | null>(initialProfile.picture || null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Champs du profil (initialisés avec les données locales)
  const [fields, setFields] = useState({
    name: initialProfile.name || '',
    email: initialProfile.email || '',
    phone: initialProfile.phone || '',
    role: initialProfile.role || '',
    address: initialProfile.address || '',
    idNumber: initialProfile.idNumber || '',
    idStatus: initialProfile.idStatus as 'pending' | 'verified' | 'rejected' | undefined || undefined,
  });

  // Effet pour charger les données du backend (enrichissement)
  useEffect(() => {
    // Si l'utilisateur est authentifié, charger les données du backend
    if (isAuthenticated) {
      loadUserProfile();
    }
  }, [isAuthenticated, loadUserProfile]);

  // Mettre à jour les champs lorsque user change (enrichissement depuis le backend)
  useEffect(() => {
    if (user) {
      setFields(prevFields => ({
        name: user.name || prevFields.name,
        email: user.email || prevFields.email,
        phone: user.phone || prevFields.phone,
        role: user.role || prevFields.role,
        address: user.address || prevFields.address,
        idNumber: user.idNumber || prevFields.idNumber,
        idStatus: user.idStatus || undefined,
      }));
      if (user.picture) {
        setPhoto(user.picture);
      }
    }
  }, [user]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    
    // Traitement spécial pour idStatus pour respecter le type
    if (name === 'idStatus') {
      setFields({
        ...fields,
        idStatus: value === '' ? undefined : value as 'pending' | 'verified' | 'rejected'
      });
    } else {
      setFields({ ...fields, [name]: value });
    }
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (file) {
      // Prévisualisation locale
      const reader = new FileReader();
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        if (ev.target && typeof ev.target.result === 'string') setPhoto(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleSave() {
    try {
      // Si un nouveau fichier photo a été sélectionné, l'envoyer au serveur
      if (fileInputRef.current?.files?.length) {
        const file = fileInputRef.current.files[0];
        await uploadProfilePhoto(file);
      } else if (photo !== user?.picture) {
        // Si l'URL de la photo a été changée mais qu'aucun fichier n'a été sélectionné
        await updateUserProfile({ picture: photo || undefined });
      }
      
      // Mettre à jour les données du profil
      await updateUserProfile(fields);
      
      // Désactiver le mode édition
      setEditMode(false);
    } catch (err) {
      console.error('Erreur lors de la sauvegarde du profil:', err);
      // Dans un environnement de production, on afficherait un message d'erreur à l'utilisateur
    }
  }
  
  function handleCancel() {
    // Réinitialiser les champs avec les données actuelles
    if (user) {
      setFields({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || '',
        address: user.address || '',
        idNumber: user.idNumber || '',
        idStatus: user.idStatus || undefined,
      });
      setPhoto(user.picture || null);
    }
    setEditMode(false);
  }

  // Afficher un indicateur de chargement ou message d'erreur si nécessaire
  if (!user && !initialProfile.email) {
    return (
      <PageContainer>
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </PageContainer>
    );
  }

  if (error && !initialProfile.email) {
    return (
      <PageContainer>
        <div className="bg-red-50 border-l-4 border-red-400 p-4 my-8 max-w-3xl mx-auto">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {error || "Impossible de charger les informations du profil."}
              </p>
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }

  // Données à afficher (priorité aux données enrichies du backend, sinon localStorage)
  const displayData = user || initialProfile;
  const displayName = fields.name || displayData.name || 'Utilisateur';
  
  const dataSource = isEnrichingData 
    ? 'Enrichissement des données en cours...' 
    : (user && user.id !== initialProfile.id)
      ? 'Profil enrichi avec les données du backend' 
      : 'Profil basé sur les données locales';
  
  return (
    <PageContainer>
      <div className="p-4 md:p-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Mon Profil</h1>

        <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10">
            {/* En-tête simple avec titre et bouton d'édition */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Profil Utilisateur</h1>
              {!editMode && (
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                >
                  <Edit3 className="-ml-0.5 mr-2 h-4 w-4" />
                  Modifier
                </button>
              )}
            </div>
              
            {/* Carte principale du profil - Inspirée de CompanySummary */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="h-32 bg-gradient-to-r from-primary to-primary-dark relative">
                <div className="absolute bottom-0 left-8 transform translate-y-1/2">
                  <div className="relative group">
                    <div className="w-20 h-20 rounded-full bg-white p-1 shadow-md">
                      {photo ? (
                        <img 
                          src={photo} 
                          alt={`Photo de ${displayName}`} 
                          className="w-full h-full rounded-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                          <UserCircle className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    {editMode && (
                      <button
                        type="button"
                        className="absolute inset-0 flex items-center justify-center bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => fileInputRef.current && fileInputRef.current.click()}
                        title="Changer la photo"
                      >
                        <Edit3 size={18} />
                        <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handlePhotoChange} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="pl-36 pr-8 py-6">
                <div className="flex flex-col sm:flex-row justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{displayName}</h2>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {fields.role && (
                        <span className="inline-flex rounded-full bg-primary-50 px-2 py-1 text-xs font-medium text-primary-700">
                          {fields.role}
                        </span>
                      )}
                      <span className="inline-flex rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                        {displayData.plan || 'Plan gratuit'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-4 sm:mt-0">
                    {fields.idStatus && <IdStatusBadge status={fields.idStatus} />}
                    <span className="text-xs text-gray-500 flex items-center">
                      {isEnrichingData && (
                        <svg className="animate-spin h-3 w-3 mr-1 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      )}
                      {dataSource}
                    </span>
                  </div>
                </div>
              </div>
            </div>
                
            {!editMode ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Colonne gauche - Informations personnelles */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <UserCircle className="w-5 h-5 mr-2 text-primary-600" />
                    Informations personnelles
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-500">Email</div>
                        <div className="text-sm text-gray-900">{fields.email || 'Non spécifié'}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-500">Téléphone</div>
                        <div className="text-sm text-gray-900">{fields.phone || 'Non spécifié'}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-500">Adresse</div>
                        <div className="text-sm text-gray-900">{fields.address || 'Non spécifié'}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Colonne droite - Identification et rôle */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-primary-600" />
                    Identification & Rôle
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CreditCard className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-500">N° Pièce d'identité</div>
                        <div className="text-sm text-gray-900">{fields.idNumber || 'Non spécifié'}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-500">Statut de vérification</div>
                        <div className="text-sm text-gray-900">
                          <IdStatusBadge status={fields.idStatus} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Briefcase className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-500">Fonction</div>
                        <div className="text-sm text-gray-900">{fields.role || 'Non spécifié'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Modifier votre profil</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Nom complet</label>
                    <input 
                      name="name" 
                      value={fields.name} 
                      onChange={handleChange} 
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" 
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                      name="email" 
                      type="email"
                      value={fields.email} 
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" 
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                    <input 
                      name="phone" 
                      value={fields.phone} 
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" 
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Fonction / Rôle</label>
                    <input 
                      name="role" 
                      value={fields.role} 
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" 
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Adresse</label>
                    <input 
                      name="address" 
                      value={fields.address} 
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" 
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">N° Pièce d'identité</label>
                    <input 
                      name="idNumber" 
                      value={fields.idNumber} 
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" 
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Statut de vérification</label>
                    <select 
                      name="idStatus" 
                      value={fields.idStatus || ''} 
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    >
                      <option value="">Non spécifié</option>
                      <option value="pending">En attente</option>
                      <option value="verified">Vérifié</option>
                      <option value="rejected">Rejeté</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 border-t border-gray-200 pt-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isUpdating}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={isUpdating}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                        Enregistrement...
                      </>
                    ) : (
                      'Enregistrer'
                    )}
                  </button>
                </div>
              </div>
            )}
        </div>
      </div>
    </PageContainer>
  );
}