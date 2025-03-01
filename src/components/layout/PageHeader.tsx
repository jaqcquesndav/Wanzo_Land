import { ReactNode } from 'react';
import { BackButton } from '../ui/BackButton';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
  showBackButton?: boolean;
  backTo?: string;
}

export function PageHeader({ 
  title, 
  description, 
  children,
  showBackButton,
  backTo
}: PageHeaderProps) {
  return (
    <div className="bg-white border-b">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {showBackButton && (
          <div className="mb-4">
            <BackButton to={backTo} />
          </div>
        )}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {title}
            </h1>
            {description && (
              <p className="mt-2 text-sm text-gray-600">
                {description}
              </p>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}