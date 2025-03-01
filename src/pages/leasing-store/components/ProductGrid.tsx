import { Product } from '../types';
import { Button } from '../../../components/ui/Button';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onLeaseRequest: (product: Product) => void;
}

export function ProductGrid({ products, onProductClick, onLeaseRequest }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <div key={product.id} className="group relative">
          <div 
            className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 cursor-pointer"
            onClick={() => onProductClick(product)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <div className="mt-4 flex flex-col">
            <h3 className="text-sm text-gray-700">
              <span onClick={() => onProductClick(product)} className="cursor-pointer">
                {product.name}
              </span>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{product.category}</p>
            <p className="text-xs text-gray-400">{product.condition}</p>
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-900">
                Prix: ${product.price.toLocaleString('en-US')}
              </p>
              <p className="text-sm text-indigo-600">
                ou ${product.monthlyPayment.toLocaleString('en-US')}/mois en leasing
              </p>
            </div>
            <Button
              onClick={() => onLeaseRequest(product)}
              className="mt-4"
            >
              Demander un leasing
            </Button>
          </div>
        </div>
      ))}
      {products.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500">Aucun produit ne correspond à vos critères.</p>
        </div>
      )}
    </div>
  );
}