import { Check } from 'lucide-react';
import type { Product } from '../types';

interface ProductSpecsProps {
  product: Product;
}

export function ProductSpecs({ product }: ProductSpecsProps) {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900">Spécifications techniques</h2>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {/* Spécifications principales */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Caractéristiques principales
          </h3>
          <dl className="space-y-4">
            {Object.entries(product.specifications || {}).map(([key, value]) => (
              <div key={key} className="flex items-start">
                <dt className="w-1/3 text-sm text-gray-600">{key}</dt>
                <dd className="w-2/3 text-sm font-medium text-gray-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Informations de leasing */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Options de financement
          </h3>
          <ul className="space-y-4">
            {product.availableFinancing?.map((type) => (
              <li key={type} className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm text-gray-600">{type}</span>
              </li>
            ))}
          </ul>

          <h4 className="text-sm font-medium text-gray-900 mt-6 mb-4">
            Durées disponibles
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {product.availableDurations?.map((duration) => (
              <div key={duration} className="text-sm text-gray-600 bg-white rounded-lg p-3 text-center">
                {duration} mois
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}