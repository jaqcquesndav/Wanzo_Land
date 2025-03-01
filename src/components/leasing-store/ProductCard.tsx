import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  monthlyPayment: number;
  category: string;
  condition: string;
  className?: string;
}

export function ProductCard({
  id,
  name,
  description,
  image,
  price,
  monthlyPayment,
  category,
  condition,
  className,
}: ProductCardProps) {
  const { user } = useAuth();
  const { addToCart } = useCart();

  const handleLeaseRequest = () => {
    if (!user) {
      window.location.href = 'https://auth.kiota.com/login';
      return;
    }

    addToCart({
      id,
      name,
      price,
    });
  };

  return (
    <div className={cn("group relative", className)}>
      <Link to={`/leasing-store/product/${id}`}>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <div className="mt-4">
          <h3 className="text-sm text-gray-700">{name}</h3>
          <p className="mt-1 text-sm text-gray-500">{category}</p>
          <p className="text-xs text-gray-400">{condition}</p>
          <div className="mt-2">
            <p className="text-sm font-medium text-gray-900">
              Prix: ${price.toLocaleString('en-US')}
            </p>
            <p className="text-sm text-indigo-600">
              ou ${monthlyPayment.toLocaleString('en-US')}/mois en leasing
            </p>
          </div>
        </div>
      </Link>
      <Button
        onClick={handleLeaseRequest}
        className="mt-4 w-full"
      >
        {user ? 'Ajouter au panier' : 'Se connecter pour commander'}
      </Button>
    </div>
  );
}