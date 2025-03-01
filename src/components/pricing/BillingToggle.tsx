export type BillingPeriod = 'monthly' | 'yearly';

interface BillingToggleProps {
  period: BillingPeriod;
  onChange: (period: BillingPeriod) => void;
}

export function BillingToggle({ period, onChange }: BillingToggleProps) {
  return (
    <div className="relative flex items-center gap-8">
      <button
        onClick={() => onChange('monthly')}
        className={`text-sm font-semibold ${
          period === 'monthly' ? 'text-gray-900' : 'text-gray-500'
        }`}
      >
        Mensuel
      </button>
      
      <div 
        role="switch"
        aria-checked={period === 'yearly'}
        onClick={() => onChange(period === 'monthly' ? 'yearly' : 'monthly')}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          period === 'yearly' ? 'bg-indigo-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            period === 'yearly' ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </div>

      <button
        onClick={() => onChange('yearly')}
        className={`text-sm font-semibold ${
          period === 'yearly' ? 'text-gray-900' : 'text-gray-500'
        }`}
      >
        Annuel
        <span className="ml-1.5 text-green-500">-17%</span>
      </button>
    </div>
  );
}