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
    description: "La naissance d'i-kiotahub repose autant sur l'expérience de ses fondateurs, eux-mêmes engagés depuis plusieurs années dans l'entrepreneuriat en RDC, que sur une observation attentive du terrain. Face au constat alarmant que moins de 10 % des PME congolaises ont accès au financement bancaire, nous avons ressenti le besoin d'aller plus loin, de comprendre en profondeur les causes de cette exclusion financière",
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80'
  },
  {
    year: '2024',
    title: 'Immersion Terrain',
    description: "Notre équipe passe 18 mois aux côtés de 50 PME locales, dont SOSEPE, une entreprise de Goma dirigée par des femmes et spécialisée dans les produits d'hygiène. Concrètement, l' équipe de recherche observe les processus de production ou de prestation de services, recueille les témoignages sur les difficultés liées aux opérations (par exemple, l'état des équipements de production, le manque de fonds de roulement ou la dépendance vis-à-vis des systèmes informels de crédit - tontines), et analyse la manière dont les entrepreneurs jonglent avec leurs obligations administratives et fiscales. Les informations récoltées permettent d'identifier très précisément les blocages qui freinent le développement de ces PME au quotidien et de mettre en lumière les leviers d'action qui pourraient leur faciliter l'accès à des financements adaptés.",
    
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80'
  },
  {
    year: '2024',
    title: 'Immersion Terrain et validations des hypothèses',
    description: "Après nos premiers constats sur le terrain, aux côtés des entrepreneurs, nous avons mené des entretiens approfondis avec les acteurs de developpement (Laboratoire d'accélération du PNUD), les responsables d'institutions financières locales comme SMICO et Bonne Moisson, les gestionnaires de fonds d'investissement comme Digital Africa et Lofty Inc, mais aussi des représentants de la Banque Centrale du Congo et des acteurs innovants du secteur Fintech, ainsi que les entrepises proposant des outils de gestion (odoo).",
    
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80'
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
    description: " Après un test pilote réussi avec 20 PME, la première version de Kiota Suit — anciennement KiotaData — sera lancée en mai 2025. Kiota Suit intègre l’Intelligence Artificielle dans ses différents outils, dont la comptabilité pour assister les utilisateurs dans le nettoyage des comptes, audits, et support intelligent. Le déploiement des apps de gestion de portefeuille suivra en septembre 2025 sur Lubumbashi, Butembo et Beni en République Démocratique du Congo.",
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80'
  },
  {
    year: '2025',
    title: 'Partenariats',
    description: " Parallèlement, nous poursuivons le développement de ces outils et menons des négociations actives avec des partenaires nationaux et internationaux — banques, microfinances, fonds de garantie, incubateurs, réseaux d’investisseurs, diaspora, etc. — afin de garantir des offres de financement compétitives et adaptées aux besoins réels des PME locales.",
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80'
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
      <div className="relative bg-gradient-to-b from-indigo-50 py-16 sm:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Notre Histoire
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
              Née au sein de l'accélérateur d'entreprises i-kiotahub en RDC, Kiota Suit est le fruit de deux années 
              d'immersion totale auprès des PME locales. Notre mission : révolutionner l'accès au 
              financement en Afrique grâce à une approche combinant inclusion financière et transition numérique.
            </p>
          </div>
        </Container>
      </div>

      {/* Notre Parcours */}
      <Container>
        <div className="py-16 sm:py-24">
          <h2 className="text-2xl font-bold text-center sm:text-3xl mb-12 sm:mb-16">
            Notre Parcours
          </h2>
          <div className="space-y-16 sm:space-y-24">
            {journey.map((step, index) => (
              <div
                key={step.year}
                className={`flex flex-col items-center gap-8 sm:gap-12 lg:gap-16 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
                }`}
              >
                <div className="flex-1">
                  <div className="text-indigo-600 font-semibold text-center lg:text-left">
                    {step.year}
                  </div>
                  <h3 className="text-xl font-bold mt-2 text-center lg:text-left sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-gray-600 leading-relaxed text-center lg:text-left">
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
                  <p className="text-sm text-indigo-600 mb-4">{story.location}</p>
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
                    <stat.icon className="h-8 w-8 text-indigo-600" />
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