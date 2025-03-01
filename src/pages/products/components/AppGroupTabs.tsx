import { Tab } from '@headlessui/react';
import { cn } from '../../../utils/cn';
import { AppGroup } from '../../../data/appGroups';

interface AppGroupTabsProps {
  group: AppGroup;
  selectedAppId: string | null;
  onSelectApp: (appId: string | null) => void;
}

export function AppGroupTabs({ group, selectedAppId, onSelectApp }: AppGroupTabsProps) {
  if (!group || !group.apps) return null;

  const tabs = [
    { id: null, name: 'Aperçu' },
    ...group.apps.map(app => ({ id: app.id, name: app.name })),
  ];

  const selectedIndex = tabs.findIndex(tab => 
    tab.id === selectedAppId
  );

  return (
    <div className="bg-white border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Tab.Group selectedIndex={selectedIndex === -1 ? 0 : selectedIndex}>
          <Tab.List className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <Tab
                key={tab.id ?? 'overview'}
                className={({ selected }) =>
                  cn(
                    'whitespace-nowrap py-4 px-1 border-b-2 text-sm font-medium outline-none',
                    selected
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  )
                }
                onClick={() => onSelectApp(tab.id)}
              >
                {tab.name}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>
      </div>
    </div>
  );
}