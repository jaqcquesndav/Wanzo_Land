import { Tab } from '@headlessui/react';
import { cn } from '../../../utils/cn';

interface PricingTabsProps {
  selectedTab: 'management' | 'financing';
  onTabChange: (tab: 'management' | 'financing') => void;
}

export function PricingTabs({ selectedTab, onTabChange }: PricingTabsProps) {
  return (
    <div className="border-b border-gray-200">
      <Tab.Group selectedIndex={selectedTab === 'management' ? 0 : 1} onChange={(index) => onTabChange(index === 0 ? 'management' : 'financing')}>
        <Tab.List className="flex space-x-8">
          <Tab className={({ selected }) =>
            cn(
              'whitespace-nowrap py-4 px-1 border-b-2 text-sm font-medium outline-none',
              selected
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            )
          }>
            ERP
          </Tab>
          <Tab className={({ selected }) =>
            cn(
              'whitespace-nowrap py-4 px-1 border-b-2 text-sm font-medium outline-none',
              selected
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            )
          }>
            Apps de Financement
          </Tab>
        </Tab.List>
      </Tab.Group>
    </div>
  );
}