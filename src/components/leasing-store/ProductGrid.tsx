import { ProductCard } from './ProductCard';
import { Product } from '../../types/product';
import { Skeleton } from '../ui/Skeleton';
import React from 'react';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products, loading = false }: ProductGridProps & { loading?: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {loading
        ? Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-4">
              <Skeleton width="100%" height={180} className="mb-4" />
              <Skeleton width="80%" height={20} className="mb-2" />
              <Skeleton width="60%" height={16} />
            </div>
          ))
        : products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
      {!loading && products.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500">Aucun produit ne correspond à vos critères.</p>
        </div>
      )}
    </div>
  );
}