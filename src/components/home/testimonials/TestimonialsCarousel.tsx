import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TestimonialCard } from './TestimonialCard';
import type { Testimonial } from './types';
import { cn } from '../../../utils/cn';

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  autoPlayInterval?: number;
}

export function TestimonialsCarousel({ 
  testimonials,
  autoPlayInterval = 20000
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Détecter les changements de taille d'écran
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    if (isMobile) {
      setCurrentIndex((current) => (current + 1) % testimonials.length);
    } else {
      setCurrentIndex((current) => {
        // Assurez-vous que currentIndex + 2 ne dépasse pas testimonials.length
        const nextIndex = (current + 2) % testimonials.length;
        // Si nous avons un nombre impair de témoignages et que nous sommes au dernier,
        // retourner à 0 pour éviter un index hors limites
        return nextIndex + 1 > testimonials.length ? 0 : nextIndex;
      });
    }
  }, [testimonials.length, isMobile]);

  const previousSlide = useCallback(() => {
    if (isMobile) {
      setCurrentIndex((current) => 
        current === 0 ? testimonials.length - 1 : current - 1
      );
    } else {
      setCurrentIndex((current) => {
        if (current === 0) {
          // Si le nombre de témoignages est impair, ajuster l'index
          return testimonials.length % 2 === 1 
            ? testimonials.length - 2 
            : testimonials.length - 2;
        }
        return current - 2;
      });
    }
  }, [testimonials.length, isMobile]);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(timer);
  }, [nextSlide, autoPlayInterval, isPaused, isMobile]);

  // Calculer les témoignages à afficher
  const visibleTestimonials = isMobile 
    ? [testimonials[currentIndex]] 
    : [
        testimonials[currentIndex],
        testimonials[(currentIndex + 1) % testimonials.length]
      ];

  return (
    <div 
      className="relative w-full max-w-6xl mx-auto mt-8 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden">
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={`testimonials-slide-${currentIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-8 md:gap-12 w-full`}
            >
              {visibleTestimonials.map((testimonial, idx) => (
                <div 
                  key={`testimonial-${testimonial.id}`}
                  className={`${isMobile ? 'w-full' : 'w-1/2'} flex-shrink-0`}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none px-4">
        <button
          onClick={previousSlide}
          className={cn(
            "p-2 rounded-full bg-white shadow-lg text-primary hover:text-primary-hover pointer-events-auto transition-colors",
            "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          )}
          aria-label="Témoignage précédent"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className={cn(
            "p-2 rounded-full bg-white shadow-lg text-primary hover:text-primary-hover pointer-events-auto transition-colors",
            "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          )}
          aria-label="Témoignage suivant"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {Array.from({ 
          // Sur mobile, un indicateur par témoignage. Sur desktop, un indicateur pour deux témoignages
          length: isMobile ? testimonials.length : Math.ceil(testimonials.length / 2) 
        }).map((_, index) => {
          const isActive = isMobile 
            ? index === currentIndex
            : index * 2 === currentIndex || (index * 2 === testimonials.length - 1 && currentIndex === 0);
          
          return (
            <button
              key={index}
              onClick={() => setCurrentIndex(isMobile ? index : index * 2)}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                isActive ? 'bg-primary' : 'bg-gray-300'
              )}
              aria-label={`Aller au témoignage ${index + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}