import { appGroups } from '../../../data/appGroups';
import { formatCurrency } from '../../../utils/currency';
import { Button } from '../../../components/ui/Button';
import { Check } from 'lucide-react';
import type { Currency } from '../../../utils/currency';
import type { BillingPeriod } from '../../../components/pricing/BillingToggle';

interface PricingPlansProps {
  type: 'management' | 'financing';
  currency: Currency;
  billingPeriod: BillingPeriod;
}

export function PricingPlans({ type, currency, billingPeriod }: PricingPlansProps) {
  const group = appGroups.find(g => g.id === type);

  if (!group) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Aucun forfait disponible pour le moment.</p>
      </div>
    );
  }

  const price = formatCurrency(
    billingPeriod === 'monthly' ? group.monthlyPrice : group.yearlyPrice,
    currency
  );

  return (
    <div className="mx-auto max-w-7xl">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900">{group.name}</h3>
        <p className="mt-4 text-lg text-gray-600">{group.description}</p>
        <p className="mt-4">
          <span className="text-4xl font-bold tracking-tight text-gray-900">
            {price}
          </span>
          <span className="text-lg text-gray-600">
            /{billingPeriod === 'monthly' ? 'mois' : 'an'}
          </span>
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {group.apps.map((app) => (
          <div key={app.id} className="relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {app.name}
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              {app.description}
            </p>

            <ul className="mt-8 space-y-3">
              {app.features.map((feature) => (
                <li key={feature.name} className="flex items-start">
                  <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="ml-3 text-sm text-gray-700">
                    {feature.name}
                    {feature.limit && (
                      <span className="text-gray-500"> (jusqu'à {feature.limit})</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <Button className="mt-8 w-full">
              {app.isFree ? "Commencer gratuitement" : "Essayer gratuitement"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}