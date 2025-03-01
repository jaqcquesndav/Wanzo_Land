import { Disclosure } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { pricingFAQ } from '../data/pricing';
import { cn } from '../../../utils/cn';

export function PricingFAQ() {
  return (
    <div className="mt-24">
      <h3 className="text-2xl font-bold text-gray-900">Questions fréquentes</h3>
      
      <dl className="mt-8 space-y-6 divide-y divide-gray-200">
        {pricingFAQ.map((faq) => (
          <Disclosure as="div" key={faq.question} className="pt-6">
            {({ open }) => (
              <>
                <dt>
                  <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                    <span className="text-base font-semibold">{faq.question}</span>
                    <span className="ml-6 flex h-7 items-center">
                      <ChevronDown className={cn("h-6 w-6", open && "rotate-180")} />
                    </span>
                  </Disclosure.Button>
                </dt>
                <Disclosure.Panel as="dd" className="mt-2 pr-12">
                  <p className="text-base text-gray-600">{faq.answer}</p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </dl>
    </div>
  );
}