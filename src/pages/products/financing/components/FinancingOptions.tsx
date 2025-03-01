import { Coins, Building2, PiggyBank, Calculator } from 'lucide-react';

const options = [
  {
    name: 'Leasing Professionnel',
    description: 'Solutions de leasing adaptées pour vos équipements professionnels',
    icon: Building2,
    features: [
      'Taux avantageux',
      'Durées flexibles',
      'Option d\'achat',
      'Maintenance incluse',
    ],
  },
  {
    name: 'Financement de Projet',
    description: 'Financez vos projets de développement et d\'expansion',
    icon: Coins,
    features: [
      'Analyse rapide',
      'Montants importants',
      'Remboursement adapté',
      'Accompagnement dédié',
    ],
  },
  {
    name: 'Gestion de Trésorerie',
    description: 'Optimisez vos flux de trésorerie et votre fonds de roulement',
    icon: PiggyBank,
    features: [
      'Prévisions précises',
      'Alertes personnalisées',
      'Tableaux de bord',
      'Rapports détaillés',
    ],
  },
  {
    name: 'Simulation Financière',
    description: 'Simulez différents scénarios de financement',
    icon: Calculator,
    features: [
      'Comparaison des options',
      'Calcul des mensualités',
      'Analyse de rentabilité',
      'Optimisation fiscale',
    ],
  },
];

export function FinancingOptions() {
  return (
    <div className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Solutions</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Des solutions de financement sur mesure
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Découvrez nos options de financement flexibles pour soutenir la croissance de votre entreprise.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
          {options.map((option) => (
            <div
              key={option.name}
              className="flex flex-col rounded-2xl bg-white p-8 ring-1 ring-gray-200 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center gap-x-3">
                <option.icon className="h-6 w-6 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-900">{option.name}</h3>
              </div>
              <p className="mt-4 text-sm text-gray-600">{option.description}</p>
              <ul className="mt-8 space-y-3">
                {option.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}