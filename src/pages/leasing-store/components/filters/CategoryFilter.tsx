import { categories } from '../../data/categories';
import { FilterSection } from './FilterSection';

interface CategoryFilterProps {
  selectedCategories: string[];
  expandedCategories: string[];
  onToggleCategory: (category: string) => void;
  onChange: (value: string) => void;
}

export function CategoryFilter({ selectedCategories, expandedCategories, onToggleCategory, onChange }: CategoryFilterProps) {
  return (
    <FilterSection title="Catégories">
      {Object.entries(categories).map(([key, category]) => (
        <div key={key} className="space-y-2">
          <div className="flex items-center">
            <input
              id={`category-${key}`}
              type="checkbox"
              checked={selectedCategories.includes(key)}
              onChange={() => onChange(key)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-indigo-500"
            />
            <label
              htmlFor={`category-${key}`}
              className="ml-3 text-sm font-medium text-gray-700"
            >
              {category.name}
            </label>
            <button
              type="button"
              onClick={() => onToggleCategory(key)}
              className="ml-2 text-sm text-gray-500"
            >
              {expandedCategories.includes(key) ? '-' : '+'}
            </button>
          </div>
          {expandedCategories.includes(key) && (
            <div className="ml-6 space-y-2">
              {category.subcategories.map((sub) => (
                <div key={sub.id} className="flex items-center">
                  <input
                    id={`subcategory-${sub.id}`}
                    type="checkbox"
                    checked={selectedCategories.includes(sub.id)}
                    onChange={() => onChange(sub.id)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={`subcategory-${sub.id}`}
                    className="ml-3 text-sm text-gray-600"
                  >
                    {sub.name}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </FilterSection>
  );
}