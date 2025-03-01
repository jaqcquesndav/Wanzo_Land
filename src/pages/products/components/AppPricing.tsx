import { App, AppGroup } from '../../../data/appGroups';
import { Button } from '../../../components/ui/Button';
import { Check } from 'lucide-react';

interface AppPricingProps {
  app: App;
  group: AppGroup;
}

export function AppPricing({ app, group }: AppPricingProps) {
  return (
    <div className="rounded-2xl bg-gray-50 p-8">
      {app.isFree ? (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Version Gratuite</h3>
              <p className="mt-2 text-sm text-gray-500">
                Parfait pour démarrer
              </p>
            </div>
            <p className="text-3xl font-bold tracking-tight text-gray-900">
              0€
            </p>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Gratuit jusqu'à {app.storageLimit} de stockage
          </p>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Inclus dans {group.name}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Accès complet à toutes les fonctionnalités
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold tracking-tight text-gray-900">
                {group.monthlyPrice}€
              </p>
              <p className="text-sm text-gray-500">/mois</p>
            </div>
          </div>
        </>
      )}

      <ul className="mt-8 space-y-4">
        {app.features.map((feature) => (
          <li key={feature.name} className="flex items-start">
            <Check className="h-5 w-5 flex-shrink-0 text-indigo-600" />
            <span className="ml-3 text-sm text-gray-700">
              {feature.name}
              {feature.limit && (
                <span className="text-gray-500"> (jusqu'à {feature.limit})</span>
              )}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Button className="w-full">
          {app.isFree ? "Commencer gratuitement" : "Essayer gratuitement"}
        </Button>
        <p className="mt-4 text-xs text-center text-gray-500">
          Pas de carte de crédit requise
        </p>
      </div>

      {!app.isFree && (
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500">
            Cette application fait partie du forfait {group.name}. 
            En vous abonnant, vous aurez également accès à toutes les autres applications incluses.
          </p>
        </div>
      )}
    </div>
  );
}