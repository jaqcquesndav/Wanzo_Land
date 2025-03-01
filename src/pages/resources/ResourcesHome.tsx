import { Link } from 'react-router-dom';
import { BookOpen, FileText, HelpCircle } from 'lucide-react';

const resources = [
  {
    name: 'Documentation',
    description: 'Guides détaillés et documentation technique',
    href: '/resources/docs',
    icon: BookOpen,
  },
  {
    name: 'Blog',
    description: 'Articles, actualités et conseils',
    href: '/resources/blog',
    icon: FileText,
  },
  {
    name: 'FAQ',
    description: 'Réponses aux questions fréquentes',
    href: '/resources/faq',
    icon: HelpCircle,
  },
];

export function ResourcesHome() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Centre de Ressources
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Découvrez nos ressources pour tirer le meilleur parti de Kiota Suit.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {resources.map((resource) => (
              <div key={resource.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <resource.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  {resource.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{resource.description}</p>
                  <p className="mt-6">
                    <Link
                      to={resource.href}
                      className="text-sm font-semibold leading-6 text-indigo-600"
                    >
                      En savoir plus <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}