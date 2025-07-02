import { Quote } from 'lucide-react';
import { cn } from '../../../utils/cn';
import type { Testimonial } from './types';
import { Card } from '../../ui/Card';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="relative h-full pt-8">
      {/* Bulle de dialogue avec effet d'animation */}
      <motion.div
        className="relative bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{
          scale: 1.02,
          boxShadow:
            '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          backgroundColor: 'rgba(255, 255, 255, 1)',
        }}
      >
        {/* Icône de citation stylisée */}
        <div className="absolute -top-4 -left-2">
          <div className="bg-warning rounded-full p-2 shadow-md">
            <Quote className="h-5 w-5 text-white" />
          </div>
        </div>

        {/* Conteneur de texte avec espacement pour l'icône */}
        <div className="pl-4 pt-2">
          <p className="text-lg leading-relaxed text-gray-700 font-normal italic">
            {testimonial.content}
          </p>
        </div>

        {/* Triangle de la bulle de dialogue */}
        <div className="absolute -bottom-4 left-10 w-8 h-8 bg-white border-b border-r border-gray-100 transform rotate-45 shadow-md"></div>
      </motion.div>

      {/* Profil de l'auteur avec animation */}
      <motion.div
        className="flex items-center gap-x-4 ml-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="relative">
          <img
            className="h-14 w-14 rounded-full object-cover ring-2 ring-warning shadow-md"
            src={testimonial.image}
            alt={testimonial.author}
          />
          <motion.div
            className="absolute -bottom-1 -right-1 w-6 h-6 bg-warning rounded-full flex items-center justify-center shadow-md"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 6L9 17L4 12"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
        <div>
          <div className="font-semibold text-gray-900 text-base">
            {testimonial.author}
          </div>
          <div className="text-sm text-gray-600">{testimonial.role}</div>
          <div className="text-sm text-warning font-semibold">
            {testimonial.company}
          </div>
        </div>
      </motion.div>
    </div>
  );
}