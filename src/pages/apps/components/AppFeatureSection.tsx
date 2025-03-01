import { App } from '../../../data/appGroups';

interface AppFeatureSectionProps {
  app: App;
}

export function AppFeatureSection({ app }: AppFeatureSectionProps) {
  return (
    <div className="space-y-16">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Ajoutez ici les sections de fonctionnalités détaillées */}
        <div className="relative">
          <h3 className="text-lg font-semibold text-gray-900">
            Fonctionnalités avancées
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Description détaillée des fonctionnalités avancées...
          </p>
        </div>
        {/* Ajoutez d'autres sections */}
      </div>
    </div>
  );
}