import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import type { Product } from '../types';

interface SimilarProductsProps {
  currentProduct: Product;
}

export function SimilarProducts({ currentProduct }: SimilarProductsProps) {
  const { products } = useProducts();

  const similarProducts = products
    .filter(p => 
      p.id !== currentProduct.id && 
      (p.category === currentProduct.category || p.subcategory === currentProduct.subcategory)
    )
    .slice(0, 4);

  if (similarProducts.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900">Produits similaires</h2>

      <div className="mt-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
        {similarProducts.map((product) => (
          <Link
            key={product.id}
            to={`/leasing-store/product/${product.id}`}
            className="group"
          >
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{product.category}</p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                ${product.price.toLocaleString('en-US')}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}