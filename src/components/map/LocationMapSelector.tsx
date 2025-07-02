import { useState, useEffect, useRef } from 'react';
import { MapPin, Plus, Trash } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Types pour les coordonnées et emplacements
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Location {
  id: string;
  name: string;
  type: LocationType;
  address?: string;
  coordinates: Coordinates;
}

export type LocationType = 'headquarters' | 'branch' | 'store' | 'warehouse' | 'factory' | 'other';

interface LocationMapSelectorProps {
  locations: Location[];
  onChange: (locations: Location[]) => void;
  showList?: boolean;
  singleLocation?: boolean;
  defaultType?: LocationType;
  defaultName?: string;
}

// Données pour les types d'emplacements
const locationTypes: { value: LocationType; label: string; icon: JSX.Element }[] = [
  { value: 'headquarters', label: 'Siège social', icon: <MapPin className="w-4 h-4" /> },
  { value: 'branch', label: 'Succursale', icon: <MapPin className="w-4 h-4" /> },
  { value: 'store', label: 'Point de vente', icon: <MapPin className="w-4 h-4" /> },
  { value: 'warehouse', label: 'Entrepôt', icon: <MapPin className="w-4 h-4" /> },
  { value: 'factory', label: 'Unité de production', icon: <MapPin className="w-4 h-4" /> },
  { value: 'other', label: 'Autre', icon: <MapPin className="w-4 h-4" /> },
];

// Composant pour gérer les événements de la carte
function MapEvents({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  
  return null;
}

export function LocationMapSelector({
  locations = [],
  onChange,
  showList = true,
  singleLocation = false,
  defaultType = 'headquarters',
  defaultName = 'Siège social'
}: LocationMapSelectorProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  // Coordonnées de la RDC comme position par défaut
  const defaultPosition: [number, number] = [-4.0383, 21.7587];
  const defaultZoom = 6;

  // Créer un ID unique
  const generateId = () => `loc_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  // Correctif pour l'icône par défaut de Leaflet (problème connu)
  useEffect(() => {
    // Fix pour les icônes Leaflet en React
    // Solution contournée pour TypeScript
    const icon = L.Icon.Default.prototype as any;
    delete icon._getIconUrl;
    
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);

  // Gérer le clic sur la carte
  const handleMapClick = (lat: number, lng: number) => {
    if (singleLocation && locations.length > 0) {
      // Si en mode emplacement unique, remplacer l'emplacement existant
      const updatedLocation = {
        ...locations[0],
        coordinates: { lat, lng },
      };
      onChange([updatedLocation]);
    } else if (!singleLocation || locations.length === 0) {
      // Ajouter un nouvel emplacement
      addNewLocation(lat, lng);
    }
  };

  // Ajouter un nouvel emplacement
  const addNewLocation = (lat: number, lng: number) => {
    const newLocation: Location = {
      id: generateId(),
      name: singleLocation ? defaultName : `Emplacement ${locations.length + 1}`,
      type: defaultType,
      coordinates: { lat, lng },
    };

    const updatedLocations = singleLocation ? [newLocation] : [...locations, newLocation];
    onChange(updatedLocations);
    setSelectedLocation(newLocation);
  };

  // Supprimer un emplacement
  const removeLocation = (id: string) => {
    const updatedLocations = locations.filter(loc => loc.id !== id);
    onChange(updatedLocations);
    setSelectedLocation(null);
  };

  // Mettre à jour un emplacement
  const updateLocation = (id: string, updates: Partial<Location>) => {
    const updatedLocations = locations.map(loc => {
      if (loc.id === id) {
        return { ...loc, ...updates };
      }
      return loc;
    });
    onChange(updatedLocations);
  };

  // Centrer la carte sur un emplacement spécifique
  const focusOnLocation = (location: Location) => {
    if (mapRef.current) {
      mapRef.current.setView(
        [location.coordinates.lat, location.coordinates.lng],
        defaultZoom
      );
    }
  };

  // Calculer le centre de la carte en fonction des emplacements
  const getMapCenter = (): [number, number] => {
    if (locations.length === 0) {
      return defaultPosition;
    }
    
    if (locations.length === 1) {
      return [locations[0].coordinates.lat, locations[0].coordinates.lng];
    }
    
    // Si plusieurs emplacements, calculer le centre
    const bounds = new L.LatLngBounds(
      locations.map(loc => [loc.coordinates.lat, loc.coordinates.lng])
    );
    
    return [
      bounds.getCenter().lat,
      bounds.getCenter().lng
    ];
  };

  return (
    <div className="space-y-4">
      {/* Carte Leaflet */}
      <div className="w-full h-[300px] sm:h-[400px] rounded-lg border border-gray-300 overflow-hidden">
        <MapContainer
          center={getMapCenter()}
          zoom={defaultZoom}
          style={{ height: "100%", width: "100%" }}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={[location.coordinates.lat, location.coordinates.lng]}
              draggable={true}
              eventHandlers={{
                click: () => setSelectedLocation(location),
                dragend: (e) => {
                  const marker = e.target;
                  const position = marker.getLatLng();
                  updateLocation(location.id, {
                    coordinates: { 
                      lat: position.lat, 
                      lng: position.lng 
                    }
                  });
                },
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-medium">{location.name}</h3>
                  <p className="text-xs text-gray-500">
                    {locationTypes.find(t => t.value === location.type)?.label || location.type}
                  </p>
                  {location.address && (
                    <p className="text-xs mt-1">{location.address}</p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
          
          <MapEvents onMapClick={handleMapClick} />
        </MapContainer>
      </div>

      {/* Liste des emplacements */}
      {showList && locations.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Emplacements</h3>
          <div className="space-y-2">
            {locations.map(location => (
              <div 
                key={location.id} 
                className={`p-3 border rounded-lg flex items-center justify-between ${
                  selectedLocation?.id === location.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                }`}
                onClick={() => {
                  setSelectedLocation(location);
                  focusOnLocation(location);
                }}
              >
                <div className="flex items-center space-x-3">
                  {locationTypes.find(t => t.value === location.type)?.icon}
                  <div>
                    <div className="font-medium">{location.name}</div>
                    <div className="text-xs text-gray-500">
                      {location.address || `${location.coordinates.lat.toFixed(6)}, ${location.coordinates.lng.toFixed(6)}`}
                    </div>
                  </div>
                </div>
                <button 
                  type="button" 
                  className="text-gray-400 hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeLocation(location.id);
                  }}
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Formulaire pour l'emplacement sélectionné */}
      {selectedLocation && (
        <div className="mt-4 p-4 border border-gray-200 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Détails de l'emplacement</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700">Nom</label>
              <input
                type="text"
                value={selectedLocation.name}
                onChange={(e) => updateLocation(selectedLocation.id, { name: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700">Type</label>
              <select
                value={selectedLocation.type}
                onChange={(e) => updateLocation(selectedLocation.id, { type: e.target.value as LocationType })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                {locationTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700">Adresse</label>
              <input
                type="text"
                value={selectedLocation.address || ''}
                onChange={(e) => updateLocation(selectedLocation.id, { address: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Adresse physique (facultatif)"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700">Latitude</label>
                <input
                  type="text"
                  value={selectedLocation.coordinates.lat}
                  readOnly
                  className="mt-1 block w-full bg-gray-50 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">Longitude</label>
                <input
                  type="text"
                  value={selectedLocation.coordinates.lng}
                  readOnly
                  className="mt-1 block w-full bg-gray-50 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bouton d'ajout (si multiple locations est activé) */}
      {!singleLocation && (
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            onClick={() => {
              if (mapRef.current) {
                const center = mapRef.current.getCenter();
                addNewLocation(center.lat, center.lng);
              }
            }}
          >
            <Plus className="-ml-0.5 mr-2 h-4 w-4" />
            Ajouter un emplacement
          </button>
        </div>
      )}
    </div>
  );
}
