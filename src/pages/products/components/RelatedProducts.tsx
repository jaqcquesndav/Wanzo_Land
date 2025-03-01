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

interface RelatedProductsProps {
  currentProduct: string;
}

export function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  const otherProducts = products.filter(product => !product.href.includes(currentProduct));

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Découvrez nos autres solutions
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Une suite complète pour votre entreprise
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:max-w-none lg:grid-cols-3">
          {otherProducts.slice(0, 3).map((product) => (
            <Link
              key={product.href}
              to={product.href}
              className="relative flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                <product.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                  {product.name}
                </h3>
                <p className="mt-2 text-base leading-7 text-gray-600">
                  {product.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}