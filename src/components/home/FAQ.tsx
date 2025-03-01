import { Disclosure } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { Container } from '../ui/Container';
import { cn } from '../../utils/cn';

const faqs = [
  {
    question: "Comment fonctionne Kiota Suit ?",
    answer: "Kiota Suit est une suite d'applications intégrées qui combine gestion d'entreprise et solutions de financement. Notre assistant IA Adha vous guide dans toutes vos opérations."
  },
  {
    question: "Quels sont les avantages d'utiliser Adha ?",
    answer: "Adha, notre assistant IA, automatise vos tâches comptables, détecte les anomalies, et vous aide à prendre de meilleures décisions grâce à l'analyse prédictive."
  },
  {
    question: "Comment accéder au financement ?",
    answer: "Utilisez nos applications de gestion pendant 6 mois pour générer un score de crédit basé sur vos données réelles, puis accédez à des financements adaptés."
  },
  {
    question: "Quelles normes comptables sont supportées ?",
    answer: "Nous supportons les normes SYSCOHADA et IFRS, avec une conformité totale aux réglementations locales et internationales."
  },
  {
    question: "Quelle est la durée d'engagement ?",
    answer: "Il n'y a pas de durée minimale d'engagement. Vous pouvez commencer avec notre version gratuite et évoluer selon vos besoins."
  }
];

export function FAQ() {
  return (
    <div className="bg-white py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-warning">FAQ</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Questions fréquemment posées
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <dl className="space-y-8">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="border-b border-gray-200 pb-8">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left">
                        <span className="text-base font-semibold leading-7 text-gray-900">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          <ChevronDown
                            className={cn(
                              "h-6 w-6 transform text-warning transition-transform duration-200",
                              open && "rotate-180"
                            )}
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-4 pr-12">
                      <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </Container>
    </div>
  );
}