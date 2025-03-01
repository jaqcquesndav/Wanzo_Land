import { App } from '../../../data/appGroups';
import { Disclosure } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface AppFAQProps {
  app: App;
}

export function AppFAQ({ app }: AppFAQProps) {
  const faqs = [
    {
      question: "Question fréquente 1",
      answer: "Réponse détaillée à la question fréquente 1..."
    },
    // Ajoutez d'autres questions/réponses
  ];

  return (
    <div className="space-y-8">
      <dl className="space-y-6 divide-y divide-gray-200">
        {faqs.map((faq, index) => (
          <Disclosure as="div" key={index} className="pt-6">
            {({ open }) => (
              <>
                <dt>
                  <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                    <span className="text-base font-semibold">{faq.question}</span>
                    <span className="ml-6 flex h-7 items-center">
                      <ChevronDown
                        className={cn("h-6 w-6", open && "rotate-180")}
                        aria-hidden="true"
                      />
                    </span>
                  </Disclosure.Button>
                </dt>
                <Disclosure.Panel as="dd" className="mt-2 pr-12">
                  <p className="text-base text-gray-500">{faq.answer}</p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </dl>
    </div>
  );
}