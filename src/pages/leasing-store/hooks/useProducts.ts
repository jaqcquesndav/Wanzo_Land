import { useState, useEffect } from 'react';
import { Product } from '../types';

// Simule un appel API
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'MacBook Pro M2',
    description: 'Ordinateur portable professionnel Apple',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    price: 2499,
    monthlyPayment: 89.99,
    category: 'informatique',
    subcategory: 'laptops',
    condition: 'Neuf',
    brand: 'Apple',
    specifications: {
      processor: 'Apple M2',
      ram: '16GB',
      storage: '512GB',
    },
    availableFinancing: ['operational_lease', 'financial_lease'],
    availableDurations: ['12', '24', '36'],
    stock: 10,
    rating: 4.8,
    reviews: 156,
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