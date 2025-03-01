import { AppCard } from './AppCard';
import type { AppGroup } from '../../../data/appGroups';
import type { BillingPeriod } from '../../../components/pricing/BillingToggle';

interface AppSectionProps {
  group: AppGroup;
  price: string;
  billingPeriod: BillingPeriod;
}

export function AppSection({ group, price, billingPeriod }: AppSectionProps) {
  return (
    <div className="py-16 first:pt-0 last:pb-0">
      <div className="border-l-4 border-indigo-600 pl-4">
        <h2 className="text-lg font-semibold text-gray-900">{group.name}</h2>
        <p className="mt-1 text-sm text-gray-500">{group.description}</p>
        <p className="mt-4">
          <span className="text-2xl font-bold tracking-tight text-gray-900">
            {price}
          </span>
          <span className="text-sm font-semibold text-gray-500">
            /{billingPeriod === 'monthly' ? 'mois' : 'an'}
          </span>
        </p>
      </div>

      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {group.apps.map((app) => (
          <AppCard
            key={app.id}
            app={app}
            isIncluded={!app.isFree}
          />
        ))}
      </div>
    </div>
  );
}