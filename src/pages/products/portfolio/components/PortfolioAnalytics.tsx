import { LineChart, BarChart, PieChart } from 'lucide-react';

const analytics = [
  {
    name: 'Performance en temps réel',
    description: 'Suivez la performance de vos investissements avec des mises à jour en temps réel',
    icon: LineChart,
  },
  {
    name: 'Analyse de risque',
    description: 'Évaluez et gérez les risques de votre portefeuille avec des outils avancés',
    icon: BarChart,
  },
  {
    name: 'Allocation d\'actifs',
    description: 'Visualisez et optimisez la répartition de vos investissements',
    icon: PieChart,
  },
];

export function PortfolioAnalytics() {
  return (
    <div className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Analytics</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Prenez des décisions éclairées
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Des outils d'analyse puissants pour optimiser vos investissements et maximiser vos rendements.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {analytics.map((analytic) => (
              <div key={analytic.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <analytic.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  {analytic.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{analytic.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}