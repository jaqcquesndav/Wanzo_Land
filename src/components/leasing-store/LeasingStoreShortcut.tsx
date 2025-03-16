import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Store, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export function LeasingStoreShortcut() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl p-4 w-64 animate-fade-in">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-900">Boutique Leasing</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            Découvrez notre sélection d'équipements disponibles en leasing
          </p>
          
          <Link
            to="/leasing-store"
            className={cn(
              "flex items-center justify-center gap-2 w-full",
              "bg-primary text-white rounded-lg px-4 py-2",
              "text-sm font-semibold",
              "hover:bg-primary-hover transition-colors"
            )}
          >
            <Store className="h-4 w-4" />
            Visiter la boutique
          </Link>
        </div>
      )}
    </div>
  );
}