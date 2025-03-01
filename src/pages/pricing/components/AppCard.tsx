import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { App } from '../../../data/appGroups';

interface AppCardProps {
  app: App;
  price?: string;
  isIncluded?: boolean;
}

export function AppCard({ app, price, isIncluded }: AppCardProps) {
  return (
    <div className="relative flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900">{app.name}</h3>
        <p className="mt-2 text-sm text-gray-500">{app.description}</p>
        
        {app.isFree ? (
          <div className="mt-4">
            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
              Gratuit jusqu'à {app.storageLimit}
            </span>
          </div>
        ) : price ? (
          <p className="mt-4 text-sm font-medium text-gray-900">
            À partir de {price}
          </p>
        ) : isIncluded && (
          <p className="mt-4 text-sm font-medium text-indigo-600">
            Inclus dans le forfait
          </p>
        )}
      </div>

      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-900">Fonctionnalités incluses :</h4>
        <ul className="mt-4 space-y-3">
          {app.features.map((feature) => (
            <li 
              key={feature.name}
              className={`flex items-center text-sm ${
                feature.included ? 'text-gray-900' : 'text-gray-500 line-through'
              }`}
            >
              <span className="mr-2">•</span>
              {feature.name}
              {feature.limit && (
                <span className="ml-1 text-xs text-gray-500">
                  ({feature.limit})
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <Link
        to={`/products/${app.id}`}
        className="mt-8 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
      >
        En savoir plus
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
}