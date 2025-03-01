export const pricingTiers = [
  {
    name: 'Starter',
    description: 'Parfait pour les petites entreprises qui démarrent',
    price: 29,
    featured: false,
    features: [
      "Jusqu'à 5 utilisateurs",
      'Gestion des factures',
      'Suivi des dépenses',
      'Support par email',
      'Mises à jour gratuites',
    ],
  },
  {
    name: 'Professional',
    description: 'Idéal pour les entreprises en croissance',
    price: 99,
    featured: true,
    features: [
      "Jusqu'à 20 utilisateurs",
      'Toutes les fonctionnalités Starter',
      'Gestion avancée des stocks',
      'Rapports personnalisés',
      'Support prioritaire',
      'Accès API',
    ],
  },
  {
    name: 'Enterprise',
    description: 'Pour les grandes entreprises avec des besoins spécifiques',
    price: 299,
    featured: false,
    features: [
      'Utilisateurs illimités',
      'Toutes les fonctionnalités Professional',
      'Support dédié 24/7',
      'Déploiement personnalisé',
      'Formation sur site',
      'SLA garanti',
    ],
  },
];

export const pricingFeatures = [
  {
    name: 'Gestion des factures',
    tiers: [true, true, true],
  },
  {
    name: 'Suivi des dépenses',
    tiers: [true, true, true],
  },
  {
    name: 'Support par email',
    tiers: [true, true, true],
  },
  {
    name: 'Gestion des stocks',
    tiers: [false, true, true],
  },
  {
    name: 'Rapports personnalisés',
    tiers: [false, true, true],
  },
  {
    name: 'Accès API',
    tiers: [false, true, true],
  },
  {
    name: 'Support 24/7',
    tiers: [false, false, true],
  },
  {
    name: 'Formation sur site',
    tiers: [false, false, true],
  },
  {
    name: 'SLA garanti',
    tiers: [false, false, true],
  },
];

export const pricingFAQ = [
  {
    question: 'Puis-je changer de plan à tout moment ?',
    answer: 'Oui, vous pouvez changer de plan à tout moment. La différence de prix sera calculée au prorata de votre utilisation.',
  },
  {
    question: 'Y a-t-il des frais cachés ?',
    answer: "Non, tous nos prix sont transparents. Il n'y a pas de frais cachés ou de coûts supplémentaires.",
  },
  {
    question: 'Proposez-vous des réductions pour les associations ?',
    answer: 'Oui, nous proposons des tarifs spéciaux pour les associations et les organisations à but non lucratif.',
  },
  {
    question: "Quelle est la durée minimale d'engagement ?",
    answer: "Il n'y a pas de durée minimale d'engagement. Vous pouvez annuler votre abonnement à tout moment.",
  },
  {
    question: "Comment fonctionne la période d'essai ?",
    answer: "La période d'essai gratuite de 14 jours vous donne accès à toutes les fonctionnalités du plan Professional.",
  },
];