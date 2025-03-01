export const categories = {
  informatique: {
    name: 'Informatique',
    subcategories: [
      { id: 'laptops', name: 'Ordinateurs Portables' },
      { id: 'desktops', name: 'Ordinateurs de Bureau' },
      { id: 'servers', name: 'Serveurs' },
      { id: 'peripherals', name: 'Périphériques' },
      { id: 'software', name: 'Logiciels' },
    ],
  },
  vehicules: {
    name: 'Véhicules',
    subcategories: [
      { id: 'utility', name: 'Véhicules Utilitaires' },
      { id: 'company_cars', name: 'Voitures de Société' },
      { id: 'motorcycles', name: 'Motos et Scooters' },
      { id: 'specialized', name: 'Équipements de Transport Spécialisés' },
    ],
  },
  machines: {
    name: 'Machines Industrielles',
    subcategories: [
      { id: 'production', name: 'Machines de Production' },
      { id: 'maintenance', name: 'Équipements de Maintenance' },
      { id: 'packaging', name: 'Machines de Conditionnement' },
      { id: 'manufacturing', name: 'Équipements de Fabrication' },
    ],
  },
  // ... autres catégories
};