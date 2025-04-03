import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import { Share2 } from 'lucide-react';

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
  paymentPeriods?: string; // Nouvelle propriété
  installmentPayment?: { amount: number; period: string }; // Nouvelle propriété
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
  paymentPeriods, // Nouvelle propriété
  installmentPayment, // Nouvelle propriété
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

  const handleShare = () => {
    const shareData = {
      title: name,
      text: `${name} - ${description}\nPrix: $${price.toLocaleString('en-US')} ou $${monthlyPayment.toLocaleString('en-US')}/mois en leasing`,
      url: `${window.location.origin}/leasing-store/product/${id}`, // Ensure the link is included
    };

    if (navigator.share) {
      navigator.share(shareData).catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Le partage n’est pas pris en charge sur ce navigateur.');
    }
  };

  return (
    <div className={cn("group relative", className)}>
      <Link to={`/leasing-store/product/${id}`}>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 relative">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <div className="mt-4 relative">
          <h3 className="text-sm text-gray-700">{name}</h3>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleShare();
            }}
            className="absolute top-0 right-0 p-2 bg-primary-600 rounded-full shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            aria-label="Partager"
          >
            <Share2 className="h-5 w-5 text-white" /> {/* Adjusted size for better fit */}
          </button>
          <p className="mt-1 text-sm text-gray-500">{category}</p>
          <p className="text-xs text-gray-400">{condition}</p>
          <div className="mt-2">
            <p className="text-sm font-medium text-gray-900">
              Prix: ${price.toLocaleString('en-US')}
            </p>
            <p className="text-sm text-primary-600">
              ou ${monthlyPayment.toLocaleString('en-US')}/mois en leasing
            </p>
          </div>
        </div>
      </Link>
      <div className="mt-4">
        <h4 className="text-sm font-semibold text-gray-900">Mode de paiement ou financement :</h4>
        <ul className="mt-2 text-sm text-gray-700">
          <li>Prix Cash : ${price.toLocaleString('en-US')}</li>
          <li>Mensualité Leasing : ${monthlyPayment.toLocaleString('en-US')} / mois</li>
          {installmentPayment && (
            <li>
              Paiement échelonné : ${installmentPayment.amount.toLocaleString('en-US')} / {installmentPayment.period}
            </li>
          )}
        </ul>
        {paymentPeriods && (
          <p className="mt-1 text-xs text-gray-500">Périodes disponibles : {paymentPeriods}</p>
        )}
      </div>
      <Button
        onClick={handleLeaseRequest}
        className="mt-4 w-full"
      >
        {user ? 'Ajouter au panier' : 'Se connecter pour commander'}
      </Button>
    </div>
  );
}