import { leasingDurations } from '../../data/filterOptions';
import { FilterSection } from './FilterSection';

interface DurationFilterProps {
  selectedDurations: string[];
  onChange: (value: string) => void;
}

export function DurationFilter({ selectedDurations, onChange }: DurationFilterProps) {
  return (
    <FilterSection title="Durée du Leasing">
      {leasingDurations.map((duration) => (
        <div key={duration.id} className="flex items-center">
          <input
            id={`duration-${duration.id}`}
            type="checkbox"
            checked={selectedDurations.includes(duration.id)}
            onChange={() => onChange(duration.id)}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label
            htmlFor={`duration-${duration.id}`}
            className="ml-3 text-sm text-gray-600"
          >
            {duration.label}
          </label>
        </div>
      ))}
    </FilterSection>
  );
}