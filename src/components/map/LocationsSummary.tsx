import { MapPin, Navigation } from 'lucide-react';

export interface LocationSummaryProps {
  locations: {
    id: string;
    name: string;
    type: string;
    address?: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  }[];
}

// Mapper les types d'emplacements aux libellés affichables
const locationTypeLabels: Record<string, string> = {
  'headquarters': 'Siège social',
  'branch': 'Succursale',
  'store': 'Point de vente',
  'warehouse': 'Entrepôt',
  'factory': 'Unité de production',
  'other': 'Autre',
};

export function LocationsSummary({ locations }: LocationSummaryProps) {
  if (!locations || locations.length === 0) {
    return (
      <div className="text-sm text-gray-500 italic">
        Aucun emplacement enregistré
      </div>
    );
  }

  // Ouvrir Google Maps avec les coordonnées
  const openInMaps = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
  };

  return (
    <div className="space-y-4">
      {locations.map((location) => (
        <div key={location.id} className="border-t border-gray-200 pt-4 first:border-t-0 first:pt-0">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                <div className="font-medium text-gray-900">{location.name}</div>
              </div>
              <div className="text-xs text-gray-500 mt-1 ml-6">
                {locationTypeLabels[location.type] || location.type}
              </div>
              {location.address && (
                <div className="text-sm text-gray-700 mt-1 ml-6">
                  {location.address}
                </div>
              )}
              <div className="text-xs text-gray-500 mt-1 ml-6">
                Coordonnées: {location.coordinates.lat.toFixed(6)}, {location.coordinates.lng.toFixed(6)}
              </div>
            </div>
            <button
              type="button"
              onClick={() => openInMaps(location.coordinates.lat, location.coordinates.lng)}
              className="text-primary-600 hover:text-primary-800 text-xs flex items-center"
            >
              <Navigation className="h-3.5 w-3.5 mr-1" />
              Voir sur la carte
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
