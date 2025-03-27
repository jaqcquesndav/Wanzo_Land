import { X } from 'lucide-react';
import { categories } from '../data/categories';
import { equipmentConditions, financingTypes, priceRanges, leasingDurations } from '../data/filterOptions';

interface Filters {
  categories: string[];
  prices: string[];
  financing: string[];
  durations: string[];
  conditions: string[];
}

interface ActiveFiltersProps {
  filters: Filters;
  onRemoveFilter: (type: keyof Filters, value: string) => void;
  onClearAll: () => void;
}

export function ActiveFilters({ filters, onRemoveFilter, onClearAll }: ActiveFiltersProps) {
  const hasActiveFilters = Object.values(filters).some(f => f.length > 0);
  
  if (!hasActiveFilters) return null;

  const getFilterLabel = (type: keyof Filters, value: string): string => {
    switch (type) {
      case 'categories':
        // Recherche dans les catégories principales
        for (const [key, category] of Object.entries(categories)) {
          if (key === value) return category.name;
          // Recherche dans les sous-catégories
          const subcat = category.subcategories.find(sub => sub.id === value);
          if (subcat) return subcat.name;
        }
        return value;
      
      case 'conditions':
        return equipmentConditions.find(c => c.id === value)?.label || value;
      
      case 'financing':
        return financingTypes.find(f => f.id === value)?.label || value;
      
      case 'prices':
        return priceRanges.find(p => p.id === value)?.label || value;
      
      case 'durations':
        return leasingDurations.find(d => d.id === value)?.label || value;
      
      default:
        return value;
    }
  };

  return (
    <div className="bg-gray-50 px-4 py-3 mt-4 rounded-lg">
      <div className="flex flex-wrap items-center gap-2">
        {(Object.entries(filters) as [keyof Filters, string[]][]).map(([type, values]) =>
          values.map(value => (
            <span
              key={`${type}-${value}`}
              className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700"
            >
              {getFilterLabel(type, value)}
              <button
                type="button"
                onClick={() => onRemoveFilter(type, value)}
                className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-indigo-200"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Retirer le filtre {getFilterLabel(type, value)}</span>
              </button>
            </span>
          ))
        )}
        
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-sm font-medium text-primary hover:text-indigo-500"
          >
            Effacer tous les filtres
          </button>
        )}
      </div>
    </div>
  );
}