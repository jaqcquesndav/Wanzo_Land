import { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export function Section({ children, className }: SectionProps) {
  return (
    <section className={cn('py-24 sm:py-32', className)}>
      {children}
    </section>
  );
}