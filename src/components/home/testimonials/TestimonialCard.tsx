import { Quote } from 'lucide-react';
import { cn } from '../../../utils/cn';
import type { Testimonial } from './types';
import { Card } from '../../ui/Card';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card hover className="h-full">
      <Quote className="h-8 w-8 text-warning mb-4 opacity-50" />
      <p className="text-lg leading-8 text-gray-600 mb-6">
        {testimonial.content}
      </p>
      <div className="flex items-center gap-x-4">
        <img
          className="h-12 w-12 rounded-full object-cover ring-2 ring-warning/10"
          src={testimonial.image}
          alt={testimonial.author}
        />
        <div>
          <div className="font-semibold text-gray-900">
            {testimonial.author}
          </div>
          <div className="text-sm text-gray-600">
            {testimonial.role}
          </div>
          <div className="text-sm text-warning">
            {testimonial.company}
          </div>
        </div>
      </div>
    </Card>
  );
}