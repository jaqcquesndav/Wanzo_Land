import { equipmentConditions } from '../../data/filterOptions';
import { FilterSection } from './FilterSection';

interface ConditionFilterProps {
  selectedConditions: string[];
  onChange: (value: string) => void;
}

export function ConditionFilter({ selectedConditions, onChange }: ConditionFilterProps) {
  return (
    <FilterSection title="État de l'Équipement">
      {equipmentConditions.map((condition) => (
        <div key={condition.id} className="flex items-center">
          <input
            id={`condition-${condition.id}`}
            type="checkbox"
            checked={selectedConditions.includes(condition.id)}
            onChange={() => onChange(condition.id)}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label
            htmlFor={`condition-${condition.id}`}
            className="ml-3 text-sm text-gray-600"
          >
            {condition.label}
          </label>
        </div>
      ))}
    </FilterSection>
  );
}