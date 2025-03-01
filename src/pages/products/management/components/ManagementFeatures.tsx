import { Server, BarChart3, Users, ShieldCheck } from 'lucide-react';
import { Container } from '../../../../components/ui/Container';

const features = [
  {
    name: 'Comptabilité Simplifiée',
    description: 'Gérez votre comptabilité facilement avec des outils intuitifs et automatisés.',
    icon: Server,
    features: [
      'Saisie automatique des écritures',
      'Rapports financiers en temps réel',
      'Gestion de la TVA',
      'Tableaux de bord personnalisables'
    ]
  },
  {
    name: 'Gestion des Ventes',
    description: 'Optimisez votre cycle de vente et améliorez vos performances commerciales.',
    icon: BarChart3,
    features: [
      'Suivi des opportunités',
      'Gestion des devis et factures',
      'Pipeline de vente',
      'Analyse des performances'
    ]
  },
  {
    name: 'Gestion des Stocks',
    description: 'Contrôlez vos stocks et optimisez votre chaîne d\'approvisionnement.',
    icon: Users,
    features: [
      'Suivi en temps réel',
      'Gestion des commandes',
      'Alertes de réapprovisionnement',
      'Inventaire simplifié'
    ]
  },
  {
    name: 'Sécurité et Conformité',
    description: 'Protection avancée de vos données et conformité aux normes.',
    icon: ShieldCheck,
    features: [
      'Chiffrement des données',
      'Contrôle d\'accès',
      'Audit trail',
      'Sauvegarde automatique'
    ]
  }
];

export function ManagementFeatures() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Fonctionnalités
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Une suite complète pour votre entreprise
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Des outils puissants et intégrés pour gérer efficacement tous les aspects de votre activité.
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