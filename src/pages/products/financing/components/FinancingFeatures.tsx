import { CreditCard, LineChart, Calculator, Building2 } from 'lucide-react';
import { Container } from '../../../../components/ui/Container';

const features = [
  {
    name: 'Gestion du Leasing',
    description: 'Gérez vos contrats de leasing et équipements professionnels.',
    icon: CreditCard,
    features: [
      'Suivi des contrats',
      'Gestion des échéances',
      'Simulation de leasing',
      'Documents numériques'
    ]
  },
  {
    name: 'Recherche de Financement',
    description: 'Trouvez les meilleures options de financement pour votre entreprise.',
    icon: Building2,
    features: [
      'Comparaison des offres',
      'Dossier numérique',
      'Scoring automatique',
      'Suivi des demandes'
    ]
  },
  {
    name: 'Gestion de Portefeuille',
    description: 'Optimisez la gestion de vos investissements.',
    icon: LineChart,
    features: [
      'Suivi des investissements',
      'Analyse des performances',
      'Gestion des risques',
      'Rapports détaillés'
    ]
  },
  {
    name: 'Simulation Financière',
    description: 'Simulez différents scénarios de financement.',
    icon: Calculator,
    features: [
      'Calcul des mensualités',
      'Comparaison des options',
      'Analyse de rentabilité',
      'Optimisation fiscale'
    ]
  }
];

export function FinancingFeatures() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Fonctionnalités
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Des solutions de financement innovantes
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Accédez à des solutions de financement adaptées à vos besoins et optimisez la gestion de vos ressources financières.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-indigo-600" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                  <ul className="mt-4 space-y-2">
                    {feature.features.map((item) => (
                      <li key={item} className="flex items-center text-sm">
                        <span className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </div>
  );
}