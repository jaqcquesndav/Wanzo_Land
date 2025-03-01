import { useState } from 'react';
import { appGroups } from '../../../data/appGroups';
import { AppGroupTabs } from '../components/AppGroupTabs';
import { AppGroupOverview } from '../components/AppGroupOverview';
import { AppDetails } from '../components/AppDetails';
import { PortfolioAnalytics } from './components/PortfolioAnalytics';

const coverImages = {
  overview: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80',
  'investment-tracking': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80',
  'risk-management': 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80',
  'investment-planning': 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80',
};

export function PortfolioPage() {
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const portfolioGroup = appGroups.find(g => g.id === 'portfolio');
  const selectedApp = selectedAppId && portfolioGroup ? 
    portfolioGroup.apps.find(app => app.id === selectedAppId) : null;

  if (!portfolioGroup) {
    return <div>Groupe non trouvé</div>;
  }

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
              {selectedApp ? selectedApp.name : 'Gestion de Portefeuille'}
            </h1>
            <p className="mt-4 text-xl text-gray-200 max-w-2xl">
              {selectedApp ? selectedApp.description : 'Solutions avancées pour optimiser vos investissements et maximiser vos rendements'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation entre les applications */}
      <AppGroupTabs
        group={portfolioGroup}
        selectedAppId={selectedAppId}
        onSelectApp={setSelectedAppId}
      />

      {/* Contenu principal */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {selectedApp ? (
          <AppDetails
            app={selectedApp}
            group={portfolioGroup}
            onBack={() => setSelectedAppId(null)}
          />
        ) : (
          <>
            <AppGroupOverview
              group={portfolioGroup}
              onSelectApp={setSelectedAppId}
            />
            <PortfolioAnalytics />
          </>
        )}
      </div>
    </div>
  );
}