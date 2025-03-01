import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { appGroups } from '../../data/appGroups';
import { AppFeatures } from './components/AppFeatures';
import { AppPricing } from './components/AppPricing';

export function AppDetails() {
  const { groupId, appId } = useParams();

  const group = appGroups.find(g => g.id === groupId);
  const app = group?.apps.find(a => a.id === appId);

  if (!group || !app) {
    return <div>Application non trouvée</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          to={`/products/${groupId}`}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{app.name}</h1>
            <p className="mt-4 text-lg text-gray-600">{app.description}</p>
            <AppFeatures app={app} />
          </div>
          <div>
            <AppPricing app={app} group={group} />
          </div>
        </div>
      </div>
    </div>
  );
}