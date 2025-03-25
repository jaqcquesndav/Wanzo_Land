import { useState, useEffect } from 'react';
import { Product } from '../types';
import { mockProducts } from '../data/mockProducts';




export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(mockProducts.map(product => ({
          ...product,
          specifications: Object.fromEntries(
            Object.entries(product.specifications).filter(([_, value]) => value !== undefined)
          )
        })));
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