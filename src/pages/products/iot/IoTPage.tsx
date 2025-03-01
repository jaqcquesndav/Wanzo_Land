import { Wifi, Database, Bell, Activity } from 'lucide-react';
import { ProductHero } from '../components/ProductHero';
import { FeatureSection } from '../components/FeatureSection';

const features = [
  {
    title: 'Connectivité Temps Réel',
    description: 'Connectez et surveillez vos équipements en temps réel pour une visibilité totale.',
    icon: Wifi,
  },
  {
    title: 'Collecte de Données',
    description: 'Collectez et centralisez les données de vos capteurs pour une analyse approfondie.',
    icon: Database,
  },
  {
    title: 'Alertes Intelligentes',
    description: 'Recevez des notifications personnalisées basées sur des seuils prédéfinis.',
    icon: Bell,
  },
  {
    title: 'Maintenance Prédictive',
    description: 'Anticipez les besoins de maintenance grâce à l\'analyse des données en temps réel.',
    icon: Activity,
  },
];

export function IoTPage() {
  return (
    <div>
      <ProductHero
        title="IoT & Connectivité"
        description="Connectez vos équipements et optimisez vos opérations avec nos solutions IoT intégrées."
        image="https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80"
      />
      <FeatureSection features={features} />
    </div>
  );
}