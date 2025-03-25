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

  const nextSlide = useCallback(() => {
    setCurrentIndex((current) => (current + 2) % testimonials.length);
  }, [testimonials.length]);

  const previousSlide = useCallback(() => {
    setCurrentIndex((current) => 
      current === 0 ? testimonials.length - 2 : current - 2
    );
  }, [testimonials.length]);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(timer);
  }, [nextSlide, autoPlayInterval, isPaused]);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden">
        <div className="flex gap-6">
          <AnimatePresence mode="wait">
            {[0, 1].map((offset) => {
              const index = (currentIndex + offset) % testimonials.length;
              return (
                <motion.div
                  key={`testimonial-${index}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 2 }}
                  className="w-full md:w-1/2 flex-shrink-0"
                >
                  <TestimonialCard testimonial={testimonials[index]} />
                </motion.div>
              );
            })}
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
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className={cn(
            "p-2 rounded-full bg-white shadow-lg text-primary hover:text-primary-hover pointer-events-auto transition-colors",
            "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          )}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {Array.from({ length: Math.ceil(testimonials.length / 2) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * 2)}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              index * 2 === currentIndex ? 'bg-primary' : 'bg-gray-300'
            )}
          />
        ))}
      </div>
    </div>
  );
}