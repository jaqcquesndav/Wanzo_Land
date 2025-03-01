import { Link } from 'react-router-dom';
import { Server, LineChart, Building2, Brain, Wifi, Shield } from 'lucide-react';

const products = [
  {
    name: 'Suite ERP',
    href: '/products/erp',
    icon: Server,
    description: 'Gestion intégrée de votre entreprise',
  },
  {
    name: 'Gestion de Portefeuille',
    href: '/products/portfolio',
    icon: LineChart,
    description: 'Optimisation de vos investissements',
  },
  {
    name: 'Solutions de Financement',
    href: '/products/financing',
    icon: Building2,
    description: 'Options de financement flexibles',
  },
  {
    name: 'Intelligence Artificielle',
    href: '/products/ai',
    icon: Brain,
    description: 'Automatisation et prédiction',
  },
  {
    name: 'IoT & Connectivité',
    href: '/products/iot',
    icon: Wifi,
    description: 'Surveillance en temps réel',
  },
  {
    name: 'Sécurité & Conformité',
    href: '/products/security',
    icon: Shield,
    description: 'Protection de vos données',
  },
];

export function ProductNavigation() {
  return (
    <nav className="bg-gray-50 py-8">
      <div className="container">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {products.map((product) => (
            <Link
              key={product.href}
              to={product.href}
              className="group flex flex-col items-center p-4 text-center rounded-lg hover:bg-white hover:shadow-md transition-all duration-200"
            >
              <product.icon className="h-6 w-6 text-indigo-600 mb-2" />
              <span className="text-sm font-medium text-gray-900 group-hover:text-indigo-600">
                {product.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}