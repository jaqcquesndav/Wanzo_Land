export const priceRanges = [
  { id: '0-500', label: 'Moins de 500$', min: 0, max: 500 },
  { id: '500-1000', label: '500$ - 1 000$', min: 500, max: 1000 },
  { id: '1000-5000', label: '1 000$ - 5 000$', min: 1000, max: 5000 },
  { id: '5000-10000', label: '5 000$ - 10 000$', min: 5000, max: 10000 },
  { id: '10000-50000', label: '10 000$ - 50 000$', min: 10000, max: 50000 },
  { id: '50000-100000', label: '50 000$ - 100 000$', min: 50000, max: 100000 },
  { id: '100000-500000', label: '100 000$ - 500 000$', min: 100000, max: 500000 },
  { id: '500000+', label: 'Plus de 500 000$', min: 500000, max: null },
];

export const leasingDurations = [
  { id: '6', label: '6 Mois', months: 6 },
  { id: '12', label: '12 Mois', months: 12 },
  { id: '24', label: '24 Mois', months: 24 },
  { id: '36', label: '36 Mois', months: 36 },
  { id: '48', label: '48 Mois', months: 48 },
  { id: '48+', label: 'Plus de 48 Mois', months: null },
];

export const financingTypes = [
  { id: 'cash', label: 'Achat Comptant' },
  { id: 'operational_lease', label: 'Leasing Opérationnel' },
  { id: 'financial_lease', label: 'Leasing Financier' },
  { id: 'loa', label: 'Location avec Option d\'Achat (LOA)' },
  { id: 'lld', label: 'Location Longue Durée (LLD)' },
  { id: 'installment', label: 'Paiement Échelonné' },
];

export const equipmentConditions = [
  { id: 'new', label: 'Neuf' },
  { id: 'used', label: 'Occasion' },
  { id: 'refurbished', label: 'Reconditionné' },
];