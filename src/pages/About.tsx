import { Container } from '../components/ui/Container';
import { Building2, Users, Globe2, Target } from 'lucide-react';

const stats = [
  { name: 'Entreprises Partenaires', value: '500+', icon: Building2 },
  { name: 'PME Accompagnées', value: '2,000+', icon: Users },
  { name: 'Pays Couverts', value: '15', icon: Globe2 },
  { name: "Taux de Satisfaction", value: '98%', icon: Target },
];

const journey = [
  {
    year: '2020',
    title: 'La Genèse',
    description: 'Face au constat que moins de 10% des PME en RDC ont accès au financement bancaire, i-kiotahub lance une étude approfondie sur le terrain.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80'
  },
  {
    year: '2021',
    title: 'Immersion Terrain',
    description: 'Notre équipe passe 18 mois aux côtés de 50 PME locales, dont SAFESAN, une entreprise de Goma dirigée par des femmes et spécialisée dans les produits d\'hygiène.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80'
  },
  {
    year: '2022',
    title: 'Innovation & Tests',
    description: 'Développement de la première version de Kiota Suit, inspirée par le modèle de la Banque Asiatique de Développement. Tests pilotes avec 20 PME sélectionnées.',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80'
  },
  {
    year: '2023',
    title: 'Lancement & Impact',
    description: 'Lancement officiel de Kiota Suit. En 6 mois, plus de 200 PME obtiennent un financement grâce à notre approche basée sur les données.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80'
  }
];

const successStories = [
  {
    name: 'SAFESAN',
    location: 'Goma, RDC',
    description: 'Entreprise de produits d\'hygiène dirigée par des femmes. Grâce à Kiota Suit, SAFESAN a obtenu un financement de $50,000 pour moderniser sa ligne de production.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'AgroTech',
    location: 'Lubumbashi, RDC',
    description: 'Startup agro-alimentaire qui a multiplié par 3 son chiffre d\'affaires après avoir adopté notre solution de gestion et obtenu un leasing pour ses équipements.',
    image: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  }
];

export function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-indigo-50 py-24">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Notre Histoire
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-600">
              Née au sein de l'accélérateur i-kiotahub en RDC, Kiota Suit est le fruit de deux années 
              d'immersion totale auprès des PME locales. Notre mission : révolutionner l'accès au 
              financement en Afrique grâce à une approche innovante basée sur les données.
            </p>
          </div>
        </Container>
      </div>

      {/* Notre Parcours */}
      <Container>
        <div className="py-24">
          <h2 className="text-3xl font-bold text-center mb-16">Notre Parcours</h2>
          <div className="space-y-24">
            {journey.map((step, index) => (
              <div key={step.year} className={`flex items-center gap-12 ${
                index % 2 === 1 ? 'flex-row-reverse' : ''
              }`}>
                <div className="flex-1">
                  <div className="text-indigo-600 font-semibold">{step.year}</div>
                  <h3 className="text-2xl font-bold mt-2">{step.title}</h3>
                  <p className="mt-4 text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="flex-1">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="rounded-2xl shadow-xl"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
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