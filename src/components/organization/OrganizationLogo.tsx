import { ChangeEvent, useState } from 'react';
import { useCompany } from '../../hooks/useCompany';

interface OrganizationLogoProps {
  companyId: string;
  logo?: string;
  name: string;
  onLogoUpdate?: (success: boolean) => void;
}

export function OrganizationLogo({ companyId, logo, name, onLogoUpdate }: OrganizationLogoProps) {
  const { uploadLogo, loading: isUpdating } = useCompany(companyId);
  const [isHovering, setIsHovering] = useState(false);
  
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Vérifier le type et la taille du fichier
    if (!file.type.includes('image/')) {
      alert('Veuillez sélectionner une image.');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB max
      alert("L'image est trop volumineuse. La taille maximale est de 5MB.");
      return;
    }
    
    const result = await uploadLogo(file);
    if (onLogoUpdate) onLogoUpdate(!!result);
  };

  return (
    <div className="relative group">
      <div 
        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden relative border-2 border-gray-200 shadow-sm"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {logo ? (
          <img
            src={logo}
            alt={`Logo de ${name}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-700 text-2xl font-bold">
            {initials}
          </div>
        )}
        
        <div
          className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-200 ${
            isHovering ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <label
            htmlFor="logo-upload"
            className="text-white cursor-pointer px-2 py-1 text-xs sm:text-sm rounded-md hover:underline"
          >
            {isUpdating ? 'Chargement...' : 'Modifier'}
          </label>
          <input
            id="logo-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUpdating}
          />
        </div>
      </div>
      
      {isUpdating && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      )}
    </div>
  );
}
