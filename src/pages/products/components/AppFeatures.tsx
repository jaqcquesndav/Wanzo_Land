import { App } from '../../../data/appGroups';
import { Check } from 'lucide-react';

interface AppFeaturesProps {
  app: App;
}

export function AppFeatures({ app }: AppFeaturesProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Fonctionnalités
      </h2>
      
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="bg-gray-50 rounded-lg p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Fonctionnalités principales
          </h3>
          <ul className="space-y-4">
            {app.features.map((feature) => (
              <li key={feature.name} className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {feature.name}
                  </p>
                  {feature.limit && (
                    <p className="mt-1 text-sm text-gray-500">
                      Limite : {feature.limit}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-50 rounded-lg p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Avantages
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <Check className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  Mises à jour gratuites
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Accès aux dernières fonctionnalités
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <Check className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  Support technique
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Assistance par email et chat
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <Check className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  Formation incluse
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Vidéos et documentation détaillée
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 rounded-lg bg-indigo-50 p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Intégrations disponibles
        </h3>
        <p className="text-sm text-gray-600">
          Cette application s'intègre parfaitement avec les autres modules de {app.isFree ? 'la suite' : 'votre forfait'}, 
          vous permettant d'avoir une vue complète de votre activité.
        </p>
      </div>
    </div>
  );
}