import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const breadcrumbsMap: Record<string, string> = {
  products: 'Produits',
  erp: 'Suite ERP',
  portfolio: 'Gestion de Portefeuille',
  financing: 'Solutions de Financement',
  ai: 'Intelligence Artificielle',
  iot: 'IoT & Connectivité',
  security: 'Sécurité & Conformité',
};

export function Breadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <nav className="bg-white border-b" aria-label="Breadcrumb">
      <div className="container py-4">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="text-gray-500 hover:text-gray-700">
              <Home className="h-4 w-4" />
              <span className="sr-only">Accueil</span>
            </Link>
          </li>
          {pathSegments.map((segment, index) => {
            const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const isLast = index === pathSegments.length - 1;

            return (
              <li key={path} className="flex items-center">
                <ChevronRight className="h-4 w-4 text-gray-400" />
                {isLast ? (
                  <span className="ml-2 text-sm font-medium text-gray-900">
                    {breadcrumbsMap[segment] || segment}
                  </span>
                ) : (
                  <Link
                    to={path}
                    className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    {breadcrumbsMap[segment] || segment}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}