import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Store, X, ShoppingCart } from 'lucide-react';
import { cn } from '../../utils/cn';
import { mockProducts } from '../../pages/leasing-store/data/mockProducts';

export function LeasingStoreShortcut() {
  const [isOpen, setIsOpen] = useState(true);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  // Détection des écrans mobiles
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Fetch equipment images from mock data with valid images
    const equipmentImages = mockProducts
      .filter((product) => product.image) // Ensure the product has an image
      .map((product) => product.image);
    setThumbnails(equipmentImages);
  }, []);

  useEffect(() => {
    // Automatically cycle through thumbnails every 3 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % thumbnails.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [thumbnails]);

  const visibleThumbnails = [
    thumbnails[(currentIndex - 1 + thumbnails.length) % thumbnails.length],
    thumbnails[currentIndex],
    thumbnails[(currentIndex + 1) % thumbnails.length],
  ];

  return (
    <div className="flex flex-col transform-gpu max-w-full">
      {isOpen ? (
        <div className={cn(
          "bg-white rounded-lg shadow-xl p-4 animate-fade-in",
          // Adaptation de la largeur selon la taille d'écran
          isMobile ? "w-full max-w-[280px]" : "w-64"
        )}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              Wanzo Store
              <ShoppingCart className="h-4 w-4 text-gray-500" />
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Carousel Section */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {visibleThumbnails.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Equipment ${index + 1}`}
                className={cn(
                  "object-cover rounded-md transition-transform",
                  index === 1 ? "h-16 w-16 scale-110" : "h-12 w-12 opacity-70"
                )}
              />
            ))}
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Découvrez notre sélection d'équipements disponibles. Achetez, louez, payez à votre rythme!
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
      ) : (
        // Bouton flottant compact pour réouvrir le widget
        <button 
          onClick={() => setIsOpen(true)}
          className={cn(
            "bg-primary text-white rounded-full p-3 shadow-lg",
            "hover:bg-primary-hover transition-colors"
          )}
          aria-label="Ouvrir Wanzo Store"
        >
          <Store className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}