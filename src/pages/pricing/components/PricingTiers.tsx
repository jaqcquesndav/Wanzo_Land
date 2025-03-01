import { AppSection } from './AppSection';
import { PaymentMethods } from '../../../components/pricing/PaymentMethods';
import { appGroups } from '../../../data/appGroups';
import { formatCurrency } from '../../../utils/currency';
import type { Currency } from '../../../utils/currency';
import type { BillingPeriod } from '../../../components/pricing/BillingToggle';

interface PricingTiersProps {
  currency: Currency;
  billingPeriod: BillingPeriod;
}

export function PricingTiers({ currency, billingPeriod }: PricingTiersProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="divide-y divide-gray-200">
        {appGroups.map((group) => (
          <AppSection
            key={group.id}
            group={group}
            price={formatCurrency(
              billingPeriod === 'monthly' ? group.monthlyPrice : group.yearlyPrice,
              currency
            )}
            billingPeriod={billingPeriod}
          />
        ))}
      </div>

      <PaymentMethods />

      <div className="mt-8 rounded-2xl bg-gray-50 p-6">
        <h3 className="text-sm font-medium text-gray-900">Notes importantes :</h3>
        <ul className="mt-4 space-y-2 text-sm text-gray-500">
          <li>• L'application de comptabilité est gratuite jusqu'à 100 MG de stockage par an</li>
          <li>• Tous les prix sont hors taxes</li>
          <li>• La facturation annuelle inclut 2 mois gratuits</li>
          <li>• Support technique inclus pour tous les forfaits</li>
        </ul>
      </div>
    </div>
  );
}