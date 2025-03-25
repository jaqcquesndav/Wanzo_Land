import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { ArrowRight, BarChart, Brain, Database, LineChart } from 'lucide-react';
import { Button } from '../ui/Button';

const steps = [
  {
    title: "Transition Numérique",
    description: "Adoptez nos outils de gestion (ERP) pour lancer votre aventure",
    duration: "0-6 mois",
    icon: Database,
    image: "https://res.cloudinary.com/daxvxdecv/image/upload/v1742912461/kiota_suit/yqkqyac7iu3tr68spznx.jpg",
    features: [
      "Demarrez votre parcour dès la formalisation de votre entreprise",
      "Gestion comptable assistée par l'Intelligence Artificielle",
      "Audits & Importation des anciens exercices comptables",
      "Digitalisation des processus de vente, production, etc.",
      "Accompagnement personnalisé"
    ]
  },
  {
    title: "Collecte et Analyse",
    description: "Nos experts analysent vos données, principalement les données des transactions, pour établir votre profil financier",
    duration: "6 mois",
    icon: Brain,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
    features: [
      "Analyse des performances",
      "Scoring crédit automatique basé sur les transactions et non les états financiers",
      "Vous n'avez pas besoin d'être rentable pour bénéficier de nos services",
      "Évaluation des risques et opportunités",
      "Montage des projets basés sur les réalités de votre PME",
      "Recommandations personnalisées",
      "Rapports détaillés assisté par l'Intelligence Artificielle"
    ]
  },
  {
    title: "Mise en Relation",
    description: "Bénéficiez des opportunité de financement illimitées. Accédez à notre réseau d'institutions financières partenaires",
    duration: "6+ mois",
    icon: LineChart,
    image: "https://res.cloudinary.com/daxvxdecv/image/upload/v1742930300/kiota_suit/wiyivnk9wgf6zvniyo0t.jpg",
    features: [
      "Resautage et Parainage des PME éligibles",
      "Visibilité auprès des investisseurs et Institutions financières",
      "Propositions de financement via l'outil de gestion de portefeuille PME",
      "Accès à des offres de financement compétitives",
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
            Votre Parcours vers la croissance
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
          Pour nous, il ne peut y avoir d’inclusion financière sans transition numérique. Les PME qui souhaitent bénéficier 
          d’un appui financier migrent vers nos outils digitaux (Kiota Suit). Après six mois d’utilisation active, l’entrepreneur peut 
          accéder à des offres de leasing (location d'équipements), de crédit, de subvention ou de capital-investissement.
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