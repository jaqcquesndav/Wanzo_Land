import { Check } from 'lucide-react';
import type { App } from '../../../data/appGroups';

interface AppFeaturesProps {
  app: App;
}

export function AppFeatures({ app }: AppFeaturesProps) {
  return (
    <div className="mt-12">
      <h2 className="text-lg font-semibold text-gray-900">Fonctionnalités</h2>
      <ul className="mt-6 space-y-4">
        {app.features.map((feature) => (
          <li key={feature.name} className="flex items-start">
            <Check className="h-5 w-5 text-indigo-600 mt-0.5" />
            <span className="ml-3 text-gray-600">{feature.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}