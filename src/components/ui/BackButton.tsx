import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { cn } from '../../utils/cn';

interface BackButtonProps {
  to?: string;
  className?: string;
}

export function BackButton({ to, className }: BackButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) return; // Si 'to' est défini, le Link s'en occupera
    navigate(-1); // Sinon, on retourne à la page précédente
  };

  const content = (
    <div className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
      <ArrowLeft className="h-4 w-4" />
      <span>Retour</span>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className={cn("inline-flex", className)}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={handleClick} className={cn("inline-flex", className)}>
      {content}
    </button>
  );
}