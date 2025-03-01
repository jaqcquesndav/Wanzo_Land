import { financingTypes } from './filterOptions';
import { FilterSection } from './FilterSection';

interface FinancingFilterProps {
  selectedTypes: string[];
  onChange: (value: string) => void;
}

export function FinancingFilter({ selectedTypes, onChange }: FinancingFilterProps) {
  return (
    <FilterSection title="Type de Financement">
      {financingTypes.map((type) => (
        <div key={type.id} className="flex items-center">
          <input
            id={`financing-${type.id}`}
            type="checkbox"
            checked={selectedTypes.includes(type.id)}
            onChange={() => onChange(type.id)}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label
            htmlFor={`financing-${type.id}`}
            className="ml-3 text-sm text-gray-600"
          >
            {type.label}
          </label>
        </div>
      ))}
    </FilterSection>
  );
}