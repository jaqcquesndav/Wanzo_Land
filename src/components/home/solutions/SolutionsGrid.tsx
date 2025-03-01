import { Server, Shield, LineChart, Building2, Database, Cpu } from 'lucide-react';
import { SolutionCard } from './SolutionCard';

const solutions = [
  {
    name: 'Suite ERP',
    description: 'Gestion complète et intégrée de votre entreprise',
    icon: Server,
    href: '/products/erp',
    features: ['Comptabilité', 'Gestion des stocks', 'Ressources humaines', 'CRM'],
  },
  {
    name: 'Gestion de Portefeuille',
    description: 'Optimisez vos investissements avec des outils avancés',
    icon: LineChart,
    href: '/products/portfolio',
    features: ['Analyse en temps réel', 'Reporting avancé', 'Gestion des risques', 'Prévisions'],
  },
  {
    name: 'Solutions de Financement',
    description: 'Accédez à des options de financement flexibles',
    icon: Building2,
    href: '/products/financing',
    features: ['Leasing', 'Crédit-bail', 'Financement de projet', 'Affacturage'],
  },
  {
    name: 'Intelligence Artificielle',
    description: 'Automatisez et optimisez vos processus',
    icon: Cpu,
    href: '/products/ai',
    features: ['Analyse prédictive', 'Automatisation', 'Machine Learning', 'Aide à la décision'],
  },
  {
    name: 'IoT & Connectivité',
    description: 'Connectez et surveillez vos équipements',
    icon: Database,
    href: '/products/iot',
    features: ['Surveillance en temps réel', 'Maintenance prédictive', 'Tableaux de bord', 'Alertes'],
  },
  {
    name: 'Sécurité & Conformité',
    description: 'Protégez vos données et respectez les normes',
    icon: Shield,
    href: '/products/security',
    features: ['Chiffrement', 'Audit', 'Conformité RGPD', "Contrôle d'accès"],
  },
];

export function SolutionsGrid() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 bg-gray-50">
      <div className="mx-auto max-w-2xl lg:text-center mb-16">
        <h2 className="text-base font-semibold leading-7 text-indigo-600">Solutions</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Une suite complète d'outils pour votre entreprise
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {solutions.map((solution) => (
          <SolutionCard key={solution.name} {...solution} />
        ))}
      </div>
    </div>
  );
}