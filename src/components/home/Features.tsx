import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { ArrowRight,  Brain, Database, LineChart } from 'lucide-react';
import { Button } from '../ui/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//BarChart,

const steps = [
  {
    title: "Transition Numérique",
    description: "Avant d’aller loin, il faut être bien préparé. Nos outils de gestion sont votre première étape pour mieux organiser votre activité, comprendre la situation actuelle, assainir les comptes et faire grandir votre entreprise en toute confiance.",
    duration: "0-6 mois",
    icon: Database,
    image: "https://res.cloudinary.com/daxvxdecv/image/upload/v1742912461/kiota_suit/yqkqyac7iu3tr68spznx.jpg",
    features: [
      "Demarrez votre parcour dès la formalisation de votre entreprise",
      "Nos partenaires locaux vous accompagnent dans cette transition",
      "Formation et sensibilisation de votre personnel",
      "Passez facilement vos écritures comptables et engagez des discussions avec vos données grâce à l'IA",
      "Importez facilement vos anciens exercices comptables",
      "Digitalisez vos processus de vente, production, etc.",
      "Béneficiez d'un Accompagnement personnalisé"
    ]
  },
  {
    title: "Collecte et Analyse",
    description: "Nos experts analysent vos données, principalement les données des transactions, pour établir votre profil financier.",
    duration: "6 mois",
    icon: Brain,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
    features: [
      "Vous n'avez pas besoin d'être rentable pour bénéficier de nos services",
      "Nos experts Analysent vos données comptables et financières",
      "Pilotage de la performance de votre entreprise",
      "Obtenez votre note ESG et côte crédit automatiquement, cette dernière sera basée sur les transactions et non les états financiers",
      "Montage des projets basés sur les réalités de votre PME",
    ]
  },
  {
    title: "Accès au Financement & Economie d'Usage",
    description: "Bénéficiez des opportunités de financement illimitées. Accédez à notre réseau des partenaires financiers et notre store d'équipements et matériels de production disponibles en location, achat echelonné, etc.",
    duration: "6+ mois",
    icon: LineChart,
    image: "https://res.cloudinary.com/daxvxdecv/image/upload/v1742930300/kiota_suit/wiyivnk9wgf6zvniyo0t.jpg",
    features: [
      "Visibilité auprès des investisseurs, fonds de garanties et Institutions financières",
      "Accès intégral aux instruments de financement via l'outil de gestion de portefeuille PME",
      "Facilitation de l'acquisitions des matériels et équipements de production par des mécanisme d'économie d'usage",
      "Via Kiota Store, Achetez, louez, payez ces équipements à votre rythme",
      "Accès aux instruments de financement diversifiés: Crédits, Leasing, Capital Investissement, etc.",
    ]
  }
];

export function Features() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const navigate = useNavigate(); // Add navigation hook

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
          Pour nous, il ne peut y avoir d’inclusion financière effective sans transition numérique.
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

                    {expandedStep === index && (
                      <div className="bg-primary/10 p-4 rounded-lg">
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
                    )}

                    <button
                      onClick={() =>
                        setExpandedStep(expandedStep === index ? null : index)
                      }
                      className="text-primary font-medium"
                    >
                      {expandedStep === index ? 'Lire moins' : 'Lire plus'}
                    </button>
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
          <Button
            size="lg"
            className="inline-flex items-center gap-2"
            onClick={() => navigate('/auth/select')} // Update button click handler
          >
            Commencer votre transition numérique
            <ArrowRight className="h-5 w-5" />
          </Button>
        </motion.div>
      </Container>
    </div>
  );
}