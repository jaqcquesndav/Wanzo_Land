import { ReactNode } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../../../utils/cn';

interface FilterSectionProps {
  title: string;
  children: ReactNode;
}

export function FilterSection({ title, children }: FilterSectionProps) {
  return (
    <Disclosure as="div" className="border-b border-gray-200 py-6">
      {({ open }) => (
        <>
          <h3 className="-my-3 flow-root">
            <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
              <span className="font-medium text-gray-900">{title}</span>
              <span className="ml-6 flex items-center">
                <ChevronDown className={cn("h-5 w-5", open && "rotate-180")} />
              </span>
            </Disclosure.Button>
          </h3>
          <Disclosure.Panel className="pt-6">
            <div className="space-y-4">
              {children}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}