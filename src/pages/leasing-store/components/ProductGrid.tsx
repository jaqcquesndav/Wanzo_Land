import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Share2 } from 'lucide-react'; // Import de l'icône de partage

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onLeaseRequest: (product: Product) => void;
}

export function ProductGrid({ products }: ProductGridProps) {
  const handleShare = (product: Product) => {
    const shareData = {
      title: product.name,
      text: `Découvrez cet équipement : ${product.name} - Prix: $${product.price.toLocaleString('en-US')}`,
      url: `${window.location.origin}/leasing-store/product/${product.id}`,
    };
    if (navigator.share) {
      navigator.share(shareData).catch((error) => console.error('Erreur lors du partage:', error));
    } else {
      alert('Le partage n’est pas pris en charge sur ce navigateur.');
    }
  };

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <div key={product.id} className="group relative">
          <Link to={`/leasing-store/product/${product.id}`}>
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 relative">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
              <button
                onClick={(e) => {
                  e.preventDefault(); // Empêche la navigation lors du clic sur le bouton
                  handleShare(product);
                }}
                className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                aria-label="Partager"
              >
                <Share2 className="h-5 w-5 text-gray-700" />
              </button>
            </div>
            <div className="mt-4">
              <h3 className="text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{product.category}</p>
              <p className="text-xs text-gray-400">{product.condition}</p>
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-900">
                  Prix: ${product.price.toLocaleString('en-US')}
                </p>
                <p className="text-sm text-primary">
                  ou ${product.monthlyPayment.toLocaleString('en-US')}/mois en leasing
                </p>
              </div>
            </div>
          </Link>
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