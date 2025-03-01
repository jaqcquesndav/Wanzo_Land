import { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn("pt-16", className)}>
      {children}
    </div>
  );
}