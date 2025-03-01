import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        className={cn(
          'block w-full rounded-lg shadow-sm text-sm transition-colors duration-200',
          'border-gray-300 focus:border-primary focus:ring-primary',
          error && 'border-warning focus:border-warning focus:ring-warning',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';