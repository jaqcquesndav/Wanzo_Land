import { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-sm p-6 border border-gray-200',
        hover && 'transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-primary-200',
        className
      )}
    >
      {children}
    </div>
  );
}