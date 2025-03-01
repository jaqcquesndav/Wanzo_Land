import { ArrowRight } from 'lucide-react';
import { AppGroup } from '../../../data/appGroups';

interface AppGroupOverviewProps {
  group: AppGroup;
  onSelectApp: (appId: string) => void;
}

export function AppGroupOverview({ group, onSelectApp }: AppGroupOverviewProps) {
  if (!group || !group.apps) return null;

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Applications incluses
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Une suite complète pour votre entreprise
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {group.description}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {group.apps.map((app) => (
            <div
              key={app.id}
              className="flex flex-col overflow-hidden rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              <div className="flex-1 bg-white p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {app.name}
                  </h3>
                  {app.isFree && (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Gratuit
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {app.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {app.features.slice(0, 3).map((feature) => (
                    <li key={feature.name} className="flex items-start">
                      <span className="h-1.5 w-1.5 mt-2 rounded-full bg-indigo-600 mr-2" />
                      <span className="text-sm text-gray-600">{feature.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <button
                  onClick={() => onSelectApp(app.id)}
                  className="group flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  En savoir plus
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}