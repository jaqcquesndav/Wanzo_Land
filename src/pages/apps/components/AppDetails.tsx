import { App } from '../../../data/appGroups';
import { AppFeatures } from './AppFeatures';
import { AppAvailability } from './AppAvailability';

interface AppDetailsProps {
  app: App;
}

export function AppDetails({ app }: AppDetailsProps) {
  return (
    <div className="space-y-8">
      <AppFeatures app={app} />
      <AppAvailability platforms={app.platforms} />
    </div>
  );
}