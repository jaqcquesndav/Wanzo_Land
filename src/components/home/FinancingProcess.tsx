import { motion } from 'framer-motion';
import { UserPlus, BarChart3, Clock, CreditCard } from 'lucide-react';
import { Container } from '../ui/Container';

const steps = [
  {
    icon: UserPlus,
    title: "1. Création de compte",
    description: "Créez votre compte entreprise gratuitement et complétez votre profil avec les informations essentielles de votre entreprise.",
  },
  {
    icon: BarChart3,
    title: "2. Utilisation des applications",
    description: "Utilisez régulièrement nos applications de base (comptabilité, ventes, production) pour générer des données sur votre activité.",
    apps: [
      "Application de comptabilité",
      "Application de gestion des ventes",
      "Application de gestion de production",
    ]
  },
  {
    icon: Clock,
    title: "3. Période d'évaluation",
    description: "Pendant 6 mois, nous analysons vos données d'utilisation pour établir votre cote de crédit basée sur vos performances réelles.",
    metrics: [
      "Volume des transactions",
      "Régularité des opérations",
      "Santé financière",
      "Croissance de l'activité"
    ]
  },
  {
    icon: CreditCard,
    title: "4. Accès au financement",
    description: "Si votre cote de crédit est favorable, accédez à diverses solutions de financement adaptées à vos besoins.",
    options: [
      "Crédit sans garantie matérielle",
      "Solutions de leasing",
      "Capital investissement",
      "Fonds de roulement"
    ]
  }
];

export function FinancingProcess() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Processus de Financement
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Comment obtenir un financement avec Kiota Suit ?
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Une approche innovante basée sur vos données réelles plutôt que sur des garanties traditionnelles.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex items-start gap-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600">
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-base text-gray-600">
                      {step.description}
                    </p>
                    
                    {step.apps && (
                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {step.apps.map((app) => (
                          <div key={app} className="rounded-lg bg-gray-50 p-4">
                            <p className="text-sm font-medium text-gray-900">{app}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {step.metrics && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900">Critères d'évaluation :</h4>
                        <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                          {step.metrics.map((metric) => (
                            <li key={metric} className="flex items-center text-sm text-gray-600">
                              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-600" />
                              {metric}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {step.options && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900">Solutions disponibles :</h4>
                        <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                          {step.options.map((option) => (
                            <li key={option} className="flex items-center text-sm text-gray-600">
                              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-600" />
                              {option}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}