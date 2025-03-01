import { Construction } from 'lucide-react';
import { Container } from './Container';

interface UnderDevelopmentProps {
  pageName: string;
  description?: string;
}

export function UnderDevelopment({ pageName, description }: UnderDevelopmentProps) {
  return (
    <div className="min-h-[60vh] bg-gray-50 flex items-center">
      <Container>
        <div className="text-center">
          <Construction className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {pageName}
          </h1>
          <p className="mt-4 text-base leading-7 text-gray-600">
            {description || "Cette page est en cours de développement. Revenez bientôt !"}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <div className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              <span className="hidden md:inline">
                Découvrez nos autres fonctionnalités en attendant
              </span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}