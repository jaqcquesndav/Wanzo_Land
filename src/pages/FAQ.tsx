import { Container } from '../components/ui/Container';
import { PageContainer } from '../components/layout/PageContainer';
import { Disclosure } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';

const faqs = [
  {
    question: "Comment démarrer avec Kiota Suit ?",
    answer: "Créez votre compte gratuitement et suivez notre guide de démarrage rapide. Notre équipe vous accompagne dans la configuration initiale."
  },
  {
    question: "Quels sont les modes de paiement acceptés ?",
    answer: "Nous acceptons les cartes bancaires, les virements bancaires et les principaux services de mobile money en Afrique."
  },
  {
    question: "Puis-je essayer Kiota Suit gratuitement ?",
    answer: "Oui, nous proposons une période d'essai gratuite de 14 jours avec accès à toutes les fonctionnalités."
  },
  {
    question: "Comment fonctionne le support client ?",
    answer: "Notre équipe de support est disponible 24/7 par chat, email et téléphone. Nous proposons également des formations personnalisées."
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer: "Oui, nous utilisons un chiffrement de niveau bancaire et sommes conformes aux normes de sécurité internationales."
  }
];

export function FAQ() {
  return (
    <PageContainer>
      <div className="bg-white py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
              Questions fréquemment posées
            </h2>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Vous ne trouvez pas la réponse que vous cherchez ?{' '}
              <a href="/contact" className="font-semibold text-primary hover:text-indigo-500">
                Contactez notre équipe
              </a>
            </p>
            <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
              {faqs.map((faq) => (
                <Disclosure as="div" key={faq.question} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt>
                        <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                          <span className="text-base font-semibold leading-7">
                            {faq.question}
                          </span>
                          <span className="ml-6 flex h-7 items-center">
                            <ChevronDown
                              className={cn("h-6 w-6 transform", open && "rotate-180")}
                              aria-hidden="true"
                            />
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="mt-2 pr-12">
                        <p className="text-base leading-7 text-gray-600">
                          {faq.answer}
                        </p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </Container>
      </div>
    </PageContainer>
  );
}