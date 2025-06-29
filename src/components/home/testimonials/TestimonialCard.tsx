import { Quote } from 'lucide-react';
import { cn } from '../../../utils/cn';
import type { Testimonial } from './types';
import { Card } from '../../ui/Card';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card hover className="h-full bg-white/90 shadow-xl border-0 px-6 py-8 flex flex-col justify-between transition-transform duration-300 hover:scale-105">
      <Quote className="h-8 w-8 text-warning mb-4 opacity-50" />
      <p className="text-lg leading-8 text-gray-600 mb-6 italic">
        {testimonial.content}
      </p>
      <div className="flex items-center gap-x-4 mt-auto">
        <img
          className="h-14 w-14 rounded-full object-cover ring-2 ring-warning/20 shadow"
          src={testimonial.image}
          alt={testimonial.author}
        />
        <div>
          <div className="font-semibold text-gray-900 text-base">
            {testimonial.author}
          </div>
          <div className="text-sm text-gray-600">
            {testimonial.role}
          </div>
          <div className="text-sm text-warning font-semibold">
            {testimonial.company}
          </div>
        </div>
      </div>
    </Card>
  );
}