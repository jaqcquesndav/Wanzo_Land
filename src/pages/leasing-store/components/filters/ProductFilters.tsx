import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { CategoryFilter } from './CategoryFilter';
import { PriceFilter } from './PriceFilter';
import { FinancingFilter } from './FinancingFilter';
import { DurationFilter } from './DurationFilter';
import { ConditionFilter } from './ConditionFilter';

interface Filters {
  categories: string[];
  prices: string[];
  financing: string[];
  durations: string[];
  conditions: string[];
}

interface ProductFiltersProps {
  filters: Filters;
  onFilterChange: (filterType: keyof Filters, value: string) => void;
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: (open: boolean) => void;
}

export function ProductFilters({
  filters,
  onFilterChange,
  mobileFiltersOpen,
  setMobileFiltersOpen,
}: ProductFiltersProps) {
  const filterComponents = [
    <CategoryFilter
      key="categories"
      selectedCategories={filters.categories}
      onChange={(value) => onFilterChange('categories', value)} expandedCategories={[]} onToggleCategory={function (category: string): void {
        throw new Error('Function not implemented.');
      } }    />,
    <PriceFilter
      key="prices"
      selectedPrices={filters.prices}
      onChange={(value) => onFilterChange('prices', value)}
    />,
    <FinancingFilter
      key="financing"
      selectedTypes={filters.financing}
      onChange={(value) => onFilterChange('financing', value)}
    />,
    <DurationFilter
      key="durations"
      selectedDurations={filters.durations}
      onChange={(value) => onFilterChange('durations', value)}
    />,
    <ConditionFilter
      key="conditions"
      selectedConditions={filters.conditions}
      onChange={(value) => onFilterChange('conditions', value)}
    />,
  ];

  return (
    <>
      {/* Filtres mobiles */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filtres</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-4 px-4">
                {filterComponents}
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Filtres desktop */}
      <div className="hidden lg:block">
        {filterComponents}
      </div>
    </>
  );
}