import { Brain, Cpu, LineChart, Zap } from 'lucide-react';
import { ProductHero } from '../components/ProductHero';
import { FeatureSection } from '../components/FeatureSection';

const features = [
  {
    title: 'Analyse Prédictive',
    description: 'Anticipez les tendances et prenez des décisions éclairées grâce à nos modèles prédictifs.',
    icon: Brain,
  },
  {
    title: 'Automatisation Intelligente',
    description: 'Automatisez vos processus métier avec des workflows intelligents et adaptatifs.',
    icon: Cpu,
  },
  {
    title: 'Scoring Avancé',
    description: 'Évaluez les risques et les opportunités avec nos algorithmes de scoring sophistiqués.',
    icon: LineChart,
  },
  {
    title: 'Optimisation en Temps Réel',
    description: 'Optimisez vos opérations en continu grâce à l\'apprentissage automatique.',
    icon: Zap,
  },
];

export function AIPage() {
  return (
    <div>
      <ProductHero
        title="Intelligence Artificielle"
        description="Transformez vos données en insights actionnables avec nos solutions d'IA intégrées."
        image="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80"
      />
      <FeatureSection features={features} />
    </div>
  );
}