import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { Calculator, LineChart, Brain, Shield } from 'lucide-react';

const features = [
  {
    name: 'Gestion Intelligente',
    description: 'Comptabilité et audit automatisés avec Adha, conformes aux normes SYSCOHADA et IFRS.',
    icon: Calculator,
    color: 'bg-primary',
  },
  {
    name: 'Accès au Financement',
    description: 'Connectez-vous directement aux institutions financières et accédez à des financements adaptés.',
    icon: LineChart,
    color: 'bg-warning',
  },
  {
    name: 'Adha - IA Avancée',
    description: 'Assistant IA pour l\'analyse prédictive, la détection des fraudes et l\'automatisation.',
    icon: Brain,
    color: 'bg-warning',
  },
  {
    name: 'Conformité Totale',
    description: 'Respect des normes SYSCOHADA, IFRS, Bâle III et de la réglementation RDC.',
    icon: Shield,
    color: 'bg-primary',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Solutions Complètes
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Tout ce dont vous avez besoin pour réussir
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Une suite d'outils intégrés conçue pour les PME modernes
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
            {features.map((feature) => (
              <motion.div
                key={feature.name}
                variants={item}
                className="relative"
              >
                <div className="relative rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                  <div className={`absolute -top-4 -right-4 w-20 h-20 ${feature.color} rounded-full opacity-10 blur-2xl transition-all duration-200 group-hover:opacity-20`} />
                  
                  <div className="inline-flex items-center justify-center rounded-xl bg-primary p-2">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>

                  <h3 className="mt-4 text-xl font-semibold text-gray-900">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </div>
  );
}