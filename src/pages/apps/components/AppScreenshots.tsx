import { App } from '../../../data/appGroups';

interface AppScreenshotsProps {
  app: App;
}

export function AppScreenshots({ app }: AppScreenshotsProps) {
  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Ajoutez ici les captures d'écran de l'application */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
        <img
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80"
          alt="Screenshot 1"
          className="h-full w-full object-cover"
        />
      </div>
      {/* Ajoutez d'autres captures d'écran */}
    </div>
  );
}