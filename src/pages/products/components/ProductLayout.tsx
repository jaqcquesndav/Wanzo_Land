import { ReactNode } from 'react';
import { Breadcrumbs } from '../../../components/layout/Breadcrumbs';
import { ProductNavigation } from '../../../components/layout/ProductNavigation';

interface ProductLayoutProps {
  children: ReactNode;
}

export function ProductLayout({ children }: ProductLayoutProps) {
  return (
    <div>
      <Breadcrumbs />
      <ProductNavigation />
      {children}
    </div>
  );
}