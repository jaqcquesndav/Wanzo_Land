import { useState, useMemo } from 'react';
import { Product } from '../types/product';

interface Filters {
  categories: string[];
  prices: string[];
  financing: string[];
  durations: string[];
  conditions: string[];
}

export function useFilters(products: Product[]) {
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    prices: [],
    financing: [],
    durations: [],
    conditions: [],
  });

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setFilters(prev => {
      const current = prev[filterType];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      
      return {
        ...prev,
        [filterType]: updated,
      };
    });
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Vérifie les catégories
      if (filters.categories.length > 0 && 
          !filters.categories.includes(product.category) &&
          !filters.categories.includes(product.subcategory)) {
        return false;
      }

      // Vérifie les conditions
      if (filters.conditions.length > 0 &&
          !filters.conditions.includes(product.condition)) {
        return false;
      }

      // Vérifie le financement
      if (filters.financing.length > 0 &&
          !filters.financing.some(f => product.availableFinancing?.includes(f))) {
        return false;
      }

      // Vérifie les durées
      if (filters.durations.length > 0 &&
          !filters.durations.some(d => product.availableDurations?.includes(d))) {
        return false;
      }

      // Vérifie les prix
      if (filters.prices.length > 0) {
        const priceMatches = filters.prices.some(range => {
          const [min, max] = range.split('-').map(Number);
          if (max) {
            return product.price >= min && product.price <= max;
          }
          return product.price >= min;
        });
        if (!priceMatches) return false;
      }

      return true;
    });
  }, [products, filters]);

  return {
    filters,
    filteredProducts,
    handleFilterChange,
  };
}