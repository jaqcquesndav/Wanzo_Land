import { Link } from 'react-router-dom';
import { ArrowRight, Server, Shield, LineChart } from 'lucide-react';

const products = [
  {
    name: 'Suite ERP',
    description: 'Gestion complète de votre entreprise avec des modules intégrés.',
    icon: Server,
    href: '/products/erp',
  },
  {
    name: 'Gestion de Portefeuille',
    description: 'Suivez et optimisez vos investissements en temps réel.',
    icon: LineChart,
    href: '/products/portfolio',
  },
  {
    name: 'Solutions de Sécurité',
    description: 'Protection avancée de vos données et transactions.',
    icon: Shield,
    href: '/products/security',
  },
];

export function Products() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Nos Solutions
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Des outils puissants pour votre entreprise
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Découvrez notre gamme complète de solutions conçues pour optimiser 
            la gestion et la croissance de votre entreprise.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {products.map((product) => (
              <div key={product.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <product.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  {product.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{product.description}</p>
                  <p className="mt-6">
                    <Link
                      to={product.href}
                      className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                      En savoir plus <ArrowRight className="inline-block h-4 w-4" />
                    </Link>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}