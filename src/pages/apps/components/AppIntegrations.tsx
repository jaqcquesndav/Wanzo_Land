import { App } from '../../../data/appGroups';

interface AppIntegrationsProps {
  app: App;
}

export function AppIntegrations({ app }: AppIntegrationsProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Ajoutez ici les intégrations disponibles */}
        <div className="rounded-lg border border-gray-200 p-6">
          <h4 className="text-sm font-semibold text-gray-900">
            Intégration exemple
          </h4>
          <p className="mt-2 text-sm text-gray-500">
            Description de l'intégration...
          </p>
        </div>
        {/* Ajoutez d'autres intégrations */}
      </div>
    </div>
  );
}