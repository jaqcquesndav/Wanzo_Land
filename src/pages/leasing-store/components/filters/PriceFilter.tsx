import { priceRanges } from '../../data/filterOptions';
import { FilterSection } from './FilterSection';

interface PriceFilterProps {
  selectedPrices: string[];
  onChange: (value: string) => void;
}

export function PriceFilter({ selectedPrices, onChange }: PriceFilterProps) {
  return (
    <FilterSection title="Prix">
      {priceRanges.map((range) => (
        <div key={range.id} className="flex items-center">
          <input
            id={`price-${range.id}`}
            type="checkbox"
            checked={selectedPrices.includes(range.id)}
            onChange={() => onChange(range.id)}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label
            htmlFor={`price-${range.id}`}
            className="ml-3 text-sm text-gray-600"
          >
            {range.label}
          </label>
        </div>
      ))}
    </FilterSection>
  );
}