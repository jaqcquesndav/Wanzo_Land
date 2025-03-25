import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { ArrowRight, BarChart, Brain, Database, LineChart } from 'lucide-react';
import { Button } from '../ui/Button';

const steps = [
  {
    title: "Transition Numérique",
    description: "Adoptez nos outils ERP pour digitaliser vos opérations",
    duration: "0-6 mois",
    icon: Database,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
    features: [
      "Gestion comptable automatisée",
      "Suivi des opérations en temps réel",
      "Digitalisation des processus",
      "Accompagnement personnalisé"
    ]
  },
  {
    title: "Collecte et Analyse",
    description: "Nous analysons vos données pour établir votre profil financier",
    duration: "6 mois",
    icon: Brain,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
    features: [
      "Analyse des performances",
      "Scoring automatique",
      "Évaluation des risques",
      "Rapports détaillés"
    ]
  },
  {
    title: "Mise en Relation",
    description: "Accédez à notre réseau d'institutions financières partenaires",
    duration: "6+ mois",
    icon: LineChart,
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
    features: [
      "Visibilité auprès des investisseurs",
      "Propositions de financement",
      "Instruments financiers diversifiés: Crédits, Leasing, Capital Investissement, etc.",
      "Négociation facilitée",
      "Accompagnement dédié"
    ]
  }
];

export function Features() {
  return (
    <div className="relative overflow-hidden bg-white py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Notre Approche
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Votre Parcours vers le Financement
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Un processus innovant basé sur les données pour faciliter l'accès au financement des PMEs
          </p>
        </div>

        <div className="mt-16 space-y-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                <div className="relative">
                  <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent" />
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
                    <p className="text-sm font-medium text-primary">
                      Durée : {step.duration}
                    </p>
                  </div>
                </div>

                <div className="relative">
                  {index < steps.length - 1 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 hidden lg:block"
                    >
                      <ArrowRight className="h-12 w-12 text-primary/20 rotate-90" />
                    </motion.div>
                  )}

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                        <step.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-lg text-gray-600">{step.description}</p>

                    <ul className="space-y-3">
                      {step.features.map((feature) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 }}
                          className="flex items-center gap-3 text-gray-600"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button size="lg" className="inline-flex items-center gap-2">
            Commencer votre transition numérique
            <ArrowRight className="h-5 w-5" />
          </Button>
        </motion.div>
      </Container>
    </div>
  );
}