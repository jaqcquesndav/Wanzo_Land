import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const partners = [
  { name: 'Microsoft', logo: 'https://images.unsplash.com/photo-1583321500900-82807e458f3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
  { name: 'Oracle', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
  { name: 'SAP', logo: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
  { name: 'IBM', logo: 'https://images.unsplash.com/photo-1578598336003-1514a96268a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
  { name: 'Salesforce', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
  { name: 'Amazon', logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
];

export function PartnerLogos() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    const maxScroll = scrollWidth - clientWidth;

    const scroll = () => {
      if (!container) return;
      
      const currentScroll = container.scrollLeft;
      if (currentScroll >= maxScroll) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += 1;
      }
    };

    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
          Ils nous font confiance
        </h2>
        <div className="relative mt-10">
          <div 
            ref={containerRef}
            className="flex overflow-hidden space-x-12 py-4"
          >
            <motion.div 
              className="flex space-x-12 animate-scroll"
              style={{ gap: '3rem' }}
            >
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="relative h-16 w-32 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-200"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-12 w-full object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white" />
        </div>
      </div>
    </div>
  );
}