import { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200',
        {
          // Variants
          'bg-primary text-white hover:bg-primary-hover': variant === 'primary',
          'bg-white text-gray-900 ring-1 ring-gray-200 hover:bg-gray-50': variant === 'secondary',
          'bg-success text-white hover:bg-success-600': variant === 'success',
          'bg-warning text-white hover:bg-warning-600': variant === 'warning',
          // Sizes
          'px-3 py-2 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}