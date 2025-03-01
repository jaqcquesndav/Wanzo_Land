import { App, AppGroup } from '../../../data/appGroups';
import { AppFeatures } from './AppFeatures';
import { AppPricing } from './AppPricing';
import { AppAvailability } from './AppAvailability';

interface AppDetailsProps {
  app: App;
  group: AppGroup;
  onBack: () => void;
}

export function AppDetails({ app, group }: AppDetailsProps) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-12">
          {/* Informations principales */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{app.name}</h1>
            <p className="mt-2 text-gray-600">{app.description}</p>
            
            {app.isFree && (
              <span className="mt-4 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                Gratuit jusqu'à {app.storageLimit}
              </span>
            )}

            <AppFeatures app={app} />
            <AppAvailability platforms={app.platforms} />
          </div>

          {/* Tarification et CTA */}
          <div>
            <AppPricing app={app} group={group} />
          </div>
        </div>
      </div>
    </div>
  );
}