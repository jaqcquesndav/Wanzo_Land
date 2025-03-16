import { useState, useEffect } from 'react';
import { Product } from '../types';

// Simule un appel API
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'MacBook Pro M2',
    description: 'Ordinateur portable professionnel HP',
    image: 'https://res.cloudinary.com/daxvxdecv/image/upload/v1742142065/61Y0buQFOkL_thumpa.jpg',
    price: 2499,
    monthlyPayment: 89.99,
    category: 'informatique',
    subcategory: 'laptops',
    condition: 'Neuf',
    brand: 'HP',
    specifications: {
      processor: 'HP',
      ram: '16GB',
      storage: '512GB',
    },
    availableFinancing: ['operational_lease', 'financial_lease'],
    availableDurations: ['12', '24', '36'],
    stock: 10,
    rating: 4.8,
    reviews: 156,
  },

  // Catégorie Informatique - Serveurs
  {
    id: '2',
    name: 'Dell PowerEdge R750',
    description: 'Serveur rack 2U haute performance pour les charges de travail critiques',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    price: 5999,
    monthlyPayment: 199.99,
    category: 'informatique',
    subcategory: 'servers',
    condition: 'new',
    brand: 'Dell',
    specifications: {
      processor: '2x Intel Xeon Gold',
      ram: '128GB',
      storage: '4x 2TB SSD',
    },
    availableFinancing: ['financial_lease', 'loa'],
    availableDurations: ['24', '36', '48'],
    stock: 3,
  },

  // Catégorie Véhicules - Utilitaires
  {
    id: '3',
    name: 'Toyota Hilux Double Cabine',
    description: 'Pick-up robuste et polyvalent, parfait pour les chantiers et le transport',
    image: 'https://res.cloudinary.com/daxvxdecv/image/upload/v1742140933/Camion_oglcqa.jpg',
    price: 35000,
    monthlyPayment: 599.99,
    category: 'vehicules',
    subcategory: 'utility',
    condition: 'new',
    brand: 'Toyota',
    specifications: {
      moteur: '2.4L Diesel',
      puissance: '150ch',
      transmission: '4x4',
    },
    availableFinancing: ['financial_lease', 'loa', 'lld'],
    availableDurations: ['24', '36', '48'],
    stock: 3,
  },

  // Catégorie Machines - Conditionnement
  {
    id: '5',
    name: 'Ensacheuse Automatique',
    description: 'Machine d\'emballage automatique pour produits en vrac',
    image: 'https://res.cloudinary.com/daxvxdecv/image/upload/v1742140933/81LiSkEo3gL_n8qlor.jpg',
    price: 28000,
    monthlyPayment: 499.99,
    category: 'machines',
    subcategory: 'packaging',
    condition: 'new',
    brand: 'PackTech',
    specifications: {
      cadence: '60 sacs/min',
      capacité: '100g - 5kg',
      puissance: '5kW',
    },
    availableFinancing: ['operational_lease', 'financial_lease'],
    availableDurations: ['24', '36', '48'],
    stock: 2,
  },

  {
    id: '7',
    name: 'Solution de Stockage NAS Synology',
    description: 'Système de stockage en réseau pour PME avec redondance',
    image: 'https://res.cloudinary.com/daxvxdecv/image/upload/v1742141775/Synology-DS224-NAS-730x480_aoeztu.jpg',
    price: 3999,
    monthlyPayment: 129.99,
    category: 'informatique',
    subcategory: 'servers',
    condition: 'new',
    brand: 'Synology',
    specifications: {
      baies: '8',
      capacité: 'Jusqu\'à 80TB',
      raid: 'RAID 0,1,5,6,10',
    },
    availableFinancing: ['operational_lease', 'financial_lease'],
    availableDurations: ['24', '36'],
    stock: 5,
  },

  // Catégorie Véhicules - Transport
  {
    id: '9',
    name: 'Renault Master L3H2',
    description: 'Fourgon grand volume pour transport de marchandises',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    price: 32000,
    monthlyPayment: 549.99,
    category: 'vehicules',
    subcategory: 'utility',
    condition: 'new',
    brand: 'Renault',
    specifications: {
      volume: '13m³',
      charge: '1500kg',
      motorisation: '2.3L dCi',
    },
    availableFinancing: ['lld', 'loa'],
    availableDurations: ['24', '36', '48'],
    stock: 4,
  },

  // Catégorie Machines - Agroalimentaire
  {
    id: '10',
    name: 'Ligne de Conditionnement Alimentaire',
    description: 'Ligne complète pour le conditionnement de produits alimentaires',
    image: 'https://res.cloudinary.com/daxvxdecv/image/upload/v1742140932/Frigo_cocuyb.jpg',
    price: 45000,
    monthlyPayment: 799.99,
    category: 'machines',
    subcategory: 'food',
    condition: 'new',
    brand: 'FoodTech',
    specifications: {
      cadence: '1000 unités/h',
      matériaux: 'Inox 316L',
      conformité: 'HACCP',
    },
    availableFinancing: ['financial_lease', 'loa'],
    availableDurations: ['36', '48', '60'],
    stock: 1,
  },
  
  // Add more products here
];

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(mockProducts);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Une erreur est survenue'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, isLoading, error };
}