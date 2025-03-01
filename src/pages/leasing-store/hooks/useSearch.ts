import { useState, useMemo } from 'react';
import { Product } from '../types';

export function useSearch(products: Product[]) {
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return products;

    const query = searchQuery.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.brand?.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
  };
}