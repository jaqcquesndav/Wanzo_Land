import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Container } from '../ui/Container';
import { Brain, Shield, LineChart } from 'lucide-react';

const plans = [
  {
    name: 'Démo',
    description: 'Découvrez gratuitement nos solutions de base',
    price: '0',
    features: [
      'Application de comptabilité',
      'Accès limité à Adha',
      'Conformité SYSCOHADA',
      'Support communautaire'
    ],
    highlighted: false,
    demo: true
  },
  {
    name: 'PME',
    description: 'Suite complète de gestion assistée par IA',
    price: '15',
    features: [
      'Application de comptabilité avancée',
      'Gestion de portefeuille PME',
      'Assistant IA Adha intégré',
      '1 Million de Tokens offerts',
      'Conformité SYSCOHADA et IFRS',
      'Audit automatique',
      'Support 24/7'
    ],
    tokenPrice: '5',
    tokenAmount: '1 Million'
  },
  {
    name: 'Institution Financière',
    description: 'Gestion optimale des risques et portefeuilles',
    price: '100',
    features: [
      'Accès à toutes les PME du réseau',
      'Analyse de risque avancée',
      'Prévision des crises',
      'Conformité Bâle III',
      'Assistant IA Adha Premium',
      '1 Million de Tokens offerts',
      'Support dédié 24/7'
    ],
    tokenPrice: '5',
    tokenAmount: '1 Million',
    highlighted: true
  }
];

export function Pricing() {
  const navigate = useNavigate();

  const handlePlanSelect = (plan: typeof plans[0]) => {
    if (plan.demo) {
      navigate('/auth/select?type=demo');
    } else if (plan.name === 'PME') {
      navigate('/auth/select?type=sme');
    } else {
      navigate('/auth/select?type=financial');
    }
  };

  return (
    <div className="bg-gray-50 py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Tarification
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Choisissez votre forfait
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ${
                plan.highlighted ? 'ring-primary' : plan.demo ? 'ring-success' : 'ring-gray-200'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary rounded-full opacity-10 blur-2xl" />
              )}
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {plan.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {plan.description}
                </p>
                <p className="mt-6">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-sm font-semibold text-gray-600">/mois</span>
                </p>
              </div>

              <ul className="flex-1 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <div className="flex-shrink-0">
                      <Brain className="h-5 w-5 text-primary" />
                    </div>
                    <span className="ml-3 text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              {!plan.demo && (
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-900">Tokens supplémentaires</span>
                    <span className="text-gray-500">
                      ${plan.tokenPrice} / {plan.tokenAmount}
                    </span>
                  </div>
                </div>
              )}

              <button 
                onClick={() => handlePlanSelect(plan)}
                className={`mt-8 w-full rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-sm ${
                  plan.demo ? 'bg-success hover:bg-success-600' : 'bg-primary hover:bg-primary-hover'
                }`}
              >
                {plan.demo ? 'Essayer gratuitement' : 'Commencer maintenant'}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 max-w-3xl mx-auto text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Pourquoi choisir Kiota Suit ?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="flex flex-col items-center">
              <Brain className="h-8 w-8 text-primary mb-4" />
              <h4 className="text-sm font-semibold">Adha, votre assistant IA</h4>
              <p className="mt-2 text-sm text-gray-500">Gestion assistée et analyse prédictive</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="h-8 w-8 text-success mb-4" />
              <h4 className="text-sm font-semibold">Conformité totale</h4>
              <p className="mt-2 text-sm text-gray-500">SYSCOHADA, IFRS, Bâle III</p>
            </div>
            <div className="flex flex-col items-center">
              <LineChart className="h-8 w-8 text-warning mb-4" />
              <h4 className="text-sm font-semibold">Inclusion financière</h4>
              <p className="mt-2 text-sm text-gray-500">Accès facilité au financement</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}