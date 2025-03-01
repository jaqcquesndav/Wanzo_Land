import { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('mx-auto max-w-7xl px-6 lg:px-8', className)}>
      {children}
    </div>
  );
}