import { Disclosure } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { Container } from '../ui/Container';
import { cn } from '../../utils/cn';

const faqs = [
  {
    question: "Qu'est-ce que Kiota Suit ?",
    answer: "Kiota Suit est un ensemble d'applications de gestion d'entreprises (ERP) et de portefeuille conçu pour accélérer la transition numérique et l'inclusion financière des PME en RDC. Elle cible les PME, Incubateurs, Institutions financières, Fonds de garantie et Investisseurs indépendants."
  },
  {
    question: "Quels outils sont disponibles dans Kiota Suit ?",
    answer: "Pour les PME : administration des comptes, comptabilité et gestion de portefeuille. Pour les Institutions financières : gestion de portefeuilles incluant crédits, leasing et capital-investissement."
  },
  {
    question: "Comment fonctionne l'intelligence artificielle dans Kiota Suit ?",
    answer: "Il s'agit d'un ensemble d'assistants spécialisés, tels qu'Adha, Adha Fisk, Adha Compta, etc., en comptabilité, fiscalité, droit des affaires, finance, analyste marché qui apportent aux entrepreneurs et gestionnaires de portefeuille un soutien précieux dans leur quotidien. Elle facilite l'analyse de données, la conception des projets, la production des rapports, etc."
  },
  {
    question: "Dans quelles villes Kiota Suit est-elle opérationnelle ?",
    answer: (
      <>
        Nous opérons dans les villes où nous trouvons des partenaires locaux tels que des incubateurs, cabinets d'audit, centres de PME, pépinières d'entreprises, etc. Actuellement, nous sommes présents à Lubumbashi, Butembo et Beni, et bientôt à Kinshasa, Mbuji-Mayi et Kisangani. Si vous souhaitez collaborer avec nous, vous pouvez{" "}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSc_4vpYUR8-mOQ89WHNDGbT-0mT79p1xASmmfMkwvuXfAVR6g/viewform"
          className="text-warning underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          devenir un partenaire local
        </a>.
      </>
    )
  },
  {
    question: "Quels sont les modes de paiement acceptés ?",
    answer: "Mobile money (M-PESA, Airtel Money, Orange Money), cartes bancaires et virements bancaires. Les paiements se font via l'application d'administration des comptes côté PME et directement dans l'application de gestion de portefeuille pour les autres."
  },
  {
    question: "Qu'est-ce que Kiota Store ?",
    answer: "Un espace de marché pour les équipements pris en charge par nos offres de leasing, d'achat par tranche et d'achat comptant. Kiota Store ne contient pas tous les équipements pris en charge. Vous pouvez également soumettre une demande personnalisée pour des équipements spécifiques."
  },
  {
    question: "Comment valider mon compte pour utiliser Kiota Suit ?",
    answer: "Remplissez le profil de votre entreprise dans l'application d'administration. La validation prend 2 jours ouvrables."
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer: "Oui, grâce à un chiffrement de niveau bancaire et une conformité aux normes internationales. Vous contrôlez le partage de vos données."
  },
  {
    question: "Comment fonctionne le support client ?",
    answer: "Support 24/7 par chat, email et téléphone, avec des formations personnalisées disponibles."
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