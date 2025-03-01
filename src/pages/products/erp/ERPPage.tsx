import { useState } from 'react';
import { appGroups } from '../../../data/appGroups';
import { AppGroupTabs } from '../components/AppGroupTabs';
import { AppGroupOverview } from '../components/AppGroupOverview';
import { AppDetails } from '../components/AppDetails';

const coverImages = {
  overview: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80',
  accounting: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80',
  sales: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80',
  inventory: 'https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80',
  hr: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80',
};

export function ERPPage() {
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const group = appGroups.find(g => g.id === 'erp')!;
  const selectedApp = selectedAppId ? group.apps.find(app => app.id === selectedAppId) : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Image de couverture */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={selectedApp ? coverImages[selectedApp.id] : coverImages.overview}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 flex items-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white">
            <h1 className="text-4xl font-bold tracking-tight">
              {selectedApp ? selectedApp.name : 'Suite ERP'}
            </h1>
            <p className="mt-4 text-xl text-gray-200 max-w-2xl">
              {selectedApp ? selectedApp.description : 'Une solution complète et intégrée pour gérer efficacement tous les aspects de votre entreprise'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation entre les applications */}
      <AppGroupTabs
        group={group}
        selectedAppId={selectedAppId}
        onSelectApp={setSelectedAppId}
      />

      {/* Contenu principal */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {selectedApp ? (
          <AppDetails
            app={selectedApp}
            group={group}
            onBack={() => setSelectedAppId(null)}
          />
        ) : (
          <AppGroupOverview
            group={group}
            onSelectApp={setSelectedAppId}
          />
        )}
      </div>
    </div>
  );
}