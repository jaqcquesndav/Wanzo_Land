import { Container } from '../components/ui/Container';
import {  Users, Globe2, Target } from 'lucide-react';

//Building2,

const stats = [
  { name: 'Part d\'entreprises gerées par les femmes', value: '50%', icon: Users },
  { name: 'PME Accompagnées', value: '50+', icon: Users },
  { name: 'Pays Couverts', value: '1', icon: Globe2 },
  { name: "Taux de Satisfaction", value: '98%', icon: Target },
];

const journey = [
  {
    year: '2023',
    title: 'La Genèse',
    description: "La naissance de Kiota Suit est bien plus qu’un projet technologique. C’est l’aboutissement d’années d’engagement aux côtés des jeunes entrepreneurs en RDC. Nos fondateurs, eux-mêmes issus de l’écosystème entrepreneurial local, ont passé des années à accompagner, écouter, former et analyser.Sur le terrain, à Goma comme ailleurs, nous sommes confrontés à une réalité implacable : moins de 10 % des PMEs congolaises ont accès aux instruments de financement formel — qu’il s’agisse de crédit bancaire avec ou sans garantie, de leasing ou de capital-investissement. Pire encore, plus de 85 % demeurent enfermées dans un statut d’éternelles micro-entreprises informelles, sans accès aux outils, aux ressources ni aux perspectives de croissance.",
    image: 'https://res.cloudinary.com/daxvxdecv/image/upload/v1743090232/kiota_suit/uejl8wcke1cctgelkwgn.jpg'
  },
  {
    year: '2024',
    title: 'Immersion Terrain',
    description: "Notre équipe passe 18 mois aux côtés de 50 PME locales, dont SOSEPE, une entreprise de Goma dirigée par des femmes et spécialisée dans les produits d'hygiène. Concrètement, l' équipe de recherche participe à la formulation des nouveaux produits ou services, observe les processus de production ou de prestation de services, constate les difficultés liées aux opérations (par exemple, l'état des équipements de production, les aides publiques sporadiques et incomplètes, le manque de fonds de roulement ou la dépendance vis-à-vis des systèmes informels de crédit - tontines), et analyse la manière dont les entrepreneurs jonglent avec leurs obligations administratives et fiscales. Les informations récoltées permettent d'identifier très précisément les blocages qui freinent le développement de ces PME au quotidien et de mettre en lumière les leviers d'action qui pourraient leur faciliter l'accès à des financements adaptés.",
    
    image: 'https://res.cloudinary.com/daxvxdecv/image/upload/v1743085450/kiota_suit/z4dxuxwbkqq7xvfwxxni.jpg'
  }, 
  {
    year: '2024',
    title: 'Immersion Terrain et validations des hypothèses',
    description: "Après nos premiers constats sur le terrain, aux côtés des entrepreneurs, nous avons mené des entretiens approfondis avec les acteurs de developpement (Laboratoire d'accélération du PNUD), les responsables d'institutions financières locales comme SMICO et Bonne Moisson, les gestionnaires de fonds d'investissement comme Digital Africa et Lofty Inc, mais aussi des représentants de la Banque Centrale du Congo et des acteurs innovants du secteur Fintech, ainsi que les entrepises proposant des outils de gestion (odoo).",
    
    image: 'https://res.cloudinary.com/daxvxdecv/image/upload/v1743073969/kiota_suit/az4pccpaeiex2isq8smw.jpg'
  },
  {
    year: '2024',
    title: 'Reconnaissance internationale',
    description: "La formulation de notre approche a reçu une reconnaissance internationale lors du concours Just Imagine if..., organisé par l’University of Reading au Royaume-Uni, pour son potentiel dans la transition numérique et l’inclusion financière des PME.",
    
    image: 'https://res.cloudinary.com/daxvxdecv/image/upload/v1742912581/kiota_suit/Aristide/acswb2x2rbxbxuc577tx.jpg'
  },
  {
    year: '2025',
    title: 'Innovation & Tests',
    description: " Après un test pilote réussi avec 20 PME, la première version de Kiota Suit — anciennement KiotaData — sera lancée en mai 2025. Kiota Suit intègre l’Intelligence Artificielle dans ses différents outils, dont la comptabilité pour assister les utilisateurs dans le nettoyage des comptes, passage des écritures avec le language naturel, et support intelligent. Le déploiement des apps de gestion de portefeuille suivra en septembre 2025 sur Lubumbashi, Butembo et Beni en République Démocratique du Congo.",
    image: 'https://res.cloudinary.com/daxvxdecv/image/upload/v1742918110/kiota_suit/x7dshq0jwbibdjzx4yqr.jpg'
  },
  {
    year: '2025',
    title: 'Partenariats',
    description: " Enfin, nous poursuivons le développement de ces outils, les ateliers de co-création avec les PME locales, et menons des négociations actives avec des partenaires nationaux et internationaux — banques, microfinances, fonds de garantie, fonds d'impact, incubateurs, réseaux d’investisseurs, diaspora, etc. — afin de garantir des offres de financement compétitives et adaptées aux besoins réels des PME locales.",
    image: 'https://res.cloudinary.com/daxvxdecv/image/upload/v1743086219/kiota_suit/hayxezsmo4agdq4ywnkh.jpg'
  },
];

{/*

const successStories = [
  {
    name: 'SOSEPE',
    location: 'Goma, RDC',
    description: "Entreprise de produits d'hygiène dirigée par des femmes. Grâce à Kiota Suit, SAFESAN a obtenu un financement de $50,000 pour moderniser sa ligne de production.",
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Free Joy',
    location: 'Lubumbashi/Goma RDC',
    description: "Startup agro-alimentaire qui a multiplié par 3 son chiffre d'affaires après avoir adopté notre solution de gestion et obtenu un leasing pour ses équipements.",
    image: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  }
];
 */}

export function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div
        className="relative bg-gradient-to-b from-primary-600 py-16 sm:py-24"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(238, 242, 255, 0.6), rgba(255, 255, 255, 0.6)), url('https://res.cloudinary.com/daxvxdecv/image/upload/v1742930300/kiota_suit/wiyivnk9wgf6zvniyo0t.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold tracking-tight text-primary-600 sm:text-4xl lg:text-5xl">
              Notre Histoire
            </h1>
          </div>
        </Container>
      </div>

      {/* Notre Parcours */}
      <Container>
        <div className="py-16 sm:py-24">
          <h3 className="text-primary-600 text-2xl font-bold text-center sm:text-3xl mb-12 sm:mb-16">
          Des vies, des ambitions, des espoirs partagés…
          </h3>
          <div className="space-y-16 sm:space-y-24">
            {journey.map((step, index) => (
              <div
                key={step.year}
                className={`flex flex-col items-center gap-8 sm:gap-12 lg:gap-16 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
                }`}
              >
                <div className="flex-1">
                  <div className="text-primary font-semibold text-center lg:text-left">
                    {step.year}
                  </div>
                  <h3 className="text-xl font-bold mt-2 text-center lg:text-left sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-gray-600 leading-relaxed lg:text-left text-justify">
                    {step.description}
                  </p>
                </div>
                <div className="flex-1">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="rounded-2xl shadow-xl w-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

         {/* Success Stories 

         /*
        <div className="py-24 bg-gray-50 -mx-8 px-8">
          <h2 className="text-3xl font-bold text-center mb-16">
            Histoires de Réussite
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {successStories.map((story) => (
              <div key={story.name} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold">{story.name}</h3>
                  <p className="text-sm text-primary mb-4">{story.location}</p>
                  <p className="text-gray-600">{story.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        */}

        {/* Stats */}
        <div className="py-24">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  <div className="flex items-center justify-center gap-x-2">
                    <stat.icon className="h-8 w-8 text-primary" />
                    <span>{stat.value}</span>
                  </div>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </div>
  );
}