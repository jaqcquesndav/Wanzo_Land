import { Button } from '../../../components/ui/Button';
import type { App, AppGroup } from '../../../data/appGroups';

interface AppPricingProps {
  app: App;
  group: AppGroup;
}

export function AppPricing({ app, group }: AppPricingProps) {
  return (
    <div className="rounded-lg bg-gray-50 p-8">
      {app.isFree ? (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Version Gratuite</h3>
              <p className="mt-1 text-sm text-gray-500">Parfait pour démarrer</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">0€</p>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Gratuit jusqu'à {app.storageLimit} de stockage
          </p>
          <Button className="mt-6 w-full">Commencer gratuitement</Button>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Inclus dans {group.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Accès à toutes les fonctionnalités
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900">{group.monthlyPrice}€</p>
              <p className="text-sm text-gray-500">/mois</p>
            </div>
          </div>
          <Button className="mt-6 w-full">Essayer gratuitement</Button>
          <p className="mt-4 text-sm text-center text-gray-500">
            L'abonnement inclut l'accès à toutes les applications du groupe
          </p>
        </>
      )}
    </div>
  );
}