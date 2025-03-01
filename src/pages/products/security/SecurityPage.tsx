import { Shield, Lock, FileCheck, Key } from 'lucide-react';
import { ProductHero } from '../components/ProductHero';
import { FeatureSection } from '../components/FeatureSection';

const features = [
  {
    title: 'Sécurité Blockchain',
    description: 'Protection de vos données avec une technologie blockchain de pointe.',
    icon: Shield,
  },
  {
    title: 'Contrôle d\'Accès',
    description: 'Gestion granulaire des accès et authentification multi-facteurs.',
    icon: Lock,
  },
  {
    title: 'Conformité RGPD',
    description: 'Respect total des normes de protection des données et de la vie privée.',
    icon: FileCheck,
  },
  {
    title: 'Chiffrement Avancé',
    description: 'Chiffrement de bout en bout de vos données sensibles.',
    icon: Key,
  },
];

export function SecurityPage() {
  return (
    <div>
      <ProductHero
        title="Sécurité & Conformité"
        description="Protégez vos données et assurez la conformité avec nos solutions de sécurité intégrées."
        image="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80"
      />
      <FeatureSection features={features} />
    </div>
  );
}