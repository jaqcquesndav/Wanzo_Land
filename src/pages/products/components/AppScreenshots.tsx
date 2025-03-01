import { App } from '../../../data/appGroups';

interface AppScreenshotsProps {
  app: App;
}

const mockScreenshots = [
  {
    title: 'Dashboard principal',
    description: 'Vue d\'ensemble avec les indicateurs clés',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80'
  },
  {
    title: 'Gestion des données',
    description: 'Interface intuitive pour la saisie et l\'analyse',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80'
  },
  {
    title: 'Rapports et analyses',
    description: 'Visualisations et tableaux de bord personnalisables',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80'
  },
  {
    title: 'Configuration',
    description: 'Options de personnalisation avancées',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80'
  }
];

export function AppScreenshots({ app }: AppScreenshotsProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Captures d'écran
      </h2>
      <p className="mt-2 text-lg text-gray-500">
        Découvrez l'interface intuitive de {app.name}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {mockScreenshots.map((screenshot, index) => (
          <div key={index} className="group relative">
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
              <img
                src={screenshot.image}
                alt={screenshot.title}
                className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900">
                {screenshot.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {screenshot.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg bg-gray-50 p-6">
        <h3 className="text-sm font-medium text-gray-900">
          Note importante
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          L'interface peut légèrement varier selon vos paramètres et personnalisations.
          Nos captures d'écran sont régulièrement mises à jour pour refléter les dernières fonctionnalités.
        </p>
      </div>
    </div>
  );
}