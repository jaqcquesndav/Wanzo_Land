import { Container } from '../components/ui/Container';
import { PageContainer } from '../components/layout/PageContainer';
import { Disclosure } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';

const faqs = [
  {
    question: "Qu'est-ce que Kiota Suit ?",
    answer: "Kiota Suit n'est pas une bourse, c'est un ensemble d'applications de gestion ERP et de gestion de portefeuille conçu pour accélérer la transition numérique et l'inclusion financière des PMEs. Elle est adressée aux Nouvelles entreprises, PMEs, les Incubateurs et Institutions financières, Fonds de garanties et Investisseurs indépendants en RDC. La solution a été développée par l'accélérateur d'entreprises i-Kiotahub ayant son siège en RDC."
  },
  {
    question: "Quels outils sont disponibles dans Kiota Suit ?",
    answer: "Pour les PMEs, nous proposons une application d'administration des comptes, une application de comptabilité et une application de gestion de portefeuille. Pour les Institutions financières, nous avons une application de gestion de portefeuille permettant de gérer différents types de portefeuilles comme les crédits traditionnels, le leasing et le capital investissement."
  },
  {
    question: "Comment fonctionne l'intelligence artificielle dans Kiota Suit ?",
    answer: "Adha, l'intelligence artificielle utilisée dans nos outils, fait recours à des modèles établis comme ceux d'OpenAI, Meta et Atropic. Elle utilise également des couches métier basées sur le RAG & CAG et des agents IA spécialisés."
  },
  {
    question: "Dans quelles villes Kiota Suit est-elle opérationnelle ?",
    answer: "La solution est actuellement opérationnelle dans les villes de Lubumbashi, Butembo et Beni, et sera bientôt disponible à Kinshasa, Mbujimai et Kisangani."
  },
  {
    question: "Quels sont les modes de paiement acceptés ?",
    answer: "Nous privilégions le mobile money (M-PESA, Airtel Money et Orange Money), mais nous acceptons également les cartes bancaires et les virements bancaires."
  },
  {
    question: "Qu'est-ce que Kiota Store ?",
    answer: "Kiota Store est un espace de marché qui présente les équipements pris en charge par nos offres de leasing, d'achat par tranche et d'achat comptant."
  },
  {
    question: "Comment valider mon compte pour utiliser Kiota Suit ?",
    answer: "Votre compte doit être validé pour utiliser le système. Cette validation s'opère après avoir rempli le profil de votre entreprise dans l'application d'administration. Vous recevrez votre validation dans un délai de 2 jours ouvrables."
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer: "Oui, nous utilisons un chiffrement de niveau bancaire et sommes conformes aux normes de sécurité internationales. C'est l'entrepreneur qui choisit à quelle institution partager ses données. Il peut ne pas partager, mais cela limiterait son accès aux offres de financement."
  },
  {
    question: "Comment fonctionne le support client ?",
    answer: "Notre équipe de support est disponible 24/7 par chat, email et téléphone. Nous proposons également des formations personnalisées."
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