import { Currency } from '../../utils/currency';
import { Button } from '../ui/Button';

interface CurrencyToggleProps {
  currency: Currency;
  onChange: (currency: Currency) => void;
}

export function CurrencyToggle({ currency, onChange }: CurrencyToggleProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-1">
      <Button
        size="sm"
        variant={currency === 'USD' ? 'primary' : 'secondary'}
        onClick={() => onChange('USD')}
        className="w-20"
      >
        USD
      </Button>
      <Button
        size="sm"
        variant={currency === 'CDF' ? 'primary' : 'secondary'}
        onClick={() => onChange('CDF')}
        className="w-20"
      >
        CDF
      </Button>
    </div>
  );
}