import { useState } from 'react';
import { Container } from '../components/ui/Container';
import { PageContainer } from '../components/layout/PageContainer';
import { Linkedin, Mail, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin: string;
  email: string;
  experience: Array<{
    company: string;
    role: string;
    period: string;
    description: string;
  }>;
  education: Array<{
    school: string;
    degree: string;
    year: string;
  }>;
  skills: string[];
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Jacques NDAVARO',
    role: 'Directeur Exécutif',
    image: 'https://res.cloudinary.com/daxvxdecv/image/upload/v1742917639/kiota_suit/Team/rmmyjayldublm9vxsta2.jpg',
    bio: "Experte dans l'accompagnement technique des PME en RDC. Passionnée par la revolution industrielle et l'inclusion financière en Afrique.",
    linkedin: 'https://www.linkedin.com/in/jacques-ndavaro-b02b25111',
    email: 'jacquesndav@ikiotahub.com',
    experience: [
      {
        company: 'i-KiotaHub',
        role: 'Directeur Exécutif, Business Architecte',
        period: '2023-présent',
        description: 'Analyse des besoins des PMEs, montage des projets Industriels et développement de solutions fintech innovantes.'
      },
      {
        company: 'CRES',
        role: 'Coordinateur',
        period: '2018-présent',
        description: 'Coordination des activités de recherche et développement, mise en place des programmes de renforcement des capacités dans le numérique, procédés de production, etc'
      }
    ],
    education: [
      {
        school: 'Université Libre des Pays des Grands Lacs',
        degree: 'Ingénieur Civil en Electro-énergétique',
        year: '2022'
      },
    ],
    skills: ['Leadership', 'Industrie', 'Stratégie', 'Innovation', 'Transition numérique']
  },
  {
    id: '2',
    name: 'NEKA MBASA PhD',
    role: 'Directeur des Investissements',
    image: 'https://res.cloudinary.com/daxvxdecv/image/upload/v1742917639/kiota_suit/Team/rmmyjayldublm9vxsta2.jpg',
    bio: "Professeur d'Université et expert en finance avec une expérience de plus de 15 ans dans le secteur bancaire et les institutions financières internationales.",
    linkedin: 'https://linkedin.com/in/jp-mugisha',
    email: 'Neka.Mbasa@ikiotahub.com',
    experience: [
      {
        company: 'i-Kiotahub',
        role: 'Directeur des Investissements',
        period: '2023-présent',
        description: 'Développement des partenariats financiers, structuration des offres de financement et gestion des portefeuilles d\'investissement.'
      },
      {
        company: 'Université Libre des Pays des Grands Lacs',
        role: 'Vice Doyen de la Recherche en Faculté des Sciences économiques et de Gestion',
        period: '2014-présent',
        description: 'Enseignement des cours de Finances des Entreprises, comptabilité, etc'
      }
    ],
    education: [
      {
        school: 'École Polytechnique de Paris',
        degree: 'MSc Computer Science',
        year: '2014'
      },
      {
        school: 'Université de Kinshasa',
        degree: 'BSc Génie Logiciel',
        year: '2012'
      }
    ],
    skills: ['AI/ML', 'Cloud Architecture', 'Blockchain', 'Leadership technique', 'Agilité']
  },
  {
    id: '3',
    name: 'Victoire KASEREKA',
    role: 'Directrice des Opérations',
    image: 'https://res.cloudinary.com/daxvxdecv/image/upload/v1742927082/kiota_suit/Team/wwvbbq1u6hkpynurkbv6.jpg',
    bio: "Spécialiste des opérations avec une expertise particulière dans le développement de partenariats stratégiques en Afrique. Passionnée par l'impact social.",
    linkedin: 'https://www.linkedin.com/in/victoire-kasereka-33603b20b/',
    email: 'aminata.diallo@kiota.com',
    experience: [
      {
        company: 'Orange Money',
        role: 'Directrice Régionale',
        period: '2016-2022',
        description: 'Supervision des opérations de mobile money en Afrique de l\'Ouest.'
      },
      {
        company: 'African Development Bank',
        role: 'Project Manager',
        period: '2012-2016',
        description: 'Gestion de projets d\'inclusion financière.'
      }
    ],
    education: [
      {
        school: 'HEC Paris',
        degree: 'Master en Management',
        year: '2012'
      },
      {
        school: 'ESP Dakar',
        degree: 'Licence en Gestion',
        year: '2010'
      }
    ],
    skills: ['Gestion des opérations', 'Développement commercial', 'Partenariats', 'Mobile Money']
  },
  {
    id: '3',
    name: 'Anthony WANNY',
    role: 'Directrice de la Communication',
    image: 'https://res.cloudinary.com/daxvxdecv/image/upload/v1742916817/kiota_suit/Team/k3iq7ynuuxebkcl92o6t.jpg',
    bio: "Spécialiste des opérations avec une expertise particulière dans le développement de partenariats stratégiques en Afrique. Passionnée par l'impact social.",
    linkedin: 'https://www.linkedin.com/in/victoire-kasereka-33603b20b/',
    email: 'aminata.diallo@kiota.com',
    experience: [
      {
        company: 'Orange Money',
        role: 'Directrice Régionale',
        period: '2016-2022',
        description: 'Supervision des opérations de mobile money en Afrique de l\'Ouest.'
      },
      {
        company: 'African Development Bank',
        role: 'Project Manager',
        period: '2012-2016',
        description: 'Gestion de projets d\'inclusion financière.'
      }
    ],
    education: [
      {
        school: 'HEC Paris',
        degree: 'Master en Management',
        year: '2012'
      },
      {
        school: 'ESP Dakar',
        degree: 'Licence en Gestion',
        year: '2010'
      }
    ],
    skills: ['Gestion des opérations', 'Développement commercial', 'Partenariats', 'Mobile Money']
  }
];

export function Team() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <PageContainer>
      <div className="bg-gradient-to-b from-gray-50">
        <Container className="py-24">
          {/* En-tête */}
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Notre équipe
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Une équipe passionnée combinant expertise technologique et connaissance approfondie du Marché local.
            </p>
          </div>

          {/* Grille des membres */}
          <div className="mt-24 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative group"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="mt-1 text-gray-300">{member.role}</p>
                  
                  <div className="mt-4 flex gap-3">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                    <button
                      onClick={() => setSelectedMember(member)}
                      className="text-sm bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors"
                    >
                      Voir le profil
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Modal de détails */}
          {selectedMember && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                  <div className="absolute right-0 top-0 pr-4 pt-4">
                    <button
                      onClick={() => setSelectedMember(null)}
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                        <div className="flex items-center gap-4 mb-6">
                          <img
                            src={selectedMember.image}
                            alt={selectedMember.name}
                            className="h-16 w-16 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                              {selectedMember.name}
                            </h3>
                            <p className="text-gray-500">{selectedMember.role}</p>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-8">{selectedMember.bio}</p>

                        <div className="space-y-8">
                          {/* Expérience */}
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">
                              Expérience
                            </h4>
                            <div className="space-y-4">
                              {selectedMember.experience.map((exp, index) => (
                                <div key={index} className="border-l-2 border-primary pl-4">
                                  <h5 className="font-medium text-gray-900">{exp.company}</h5>
                                  <p className="text-sm text-gray-600">{exp.role}</p>
                                  <p className="text-sm text-gray-500">{exp.period}</p>
                                  <p className="mt-2 text-sm text-gray-600">{exp.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Formation */}
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">
                              Formation
                            </h4>
                            <div className="space-y-4">
                              {selectedMember.education.map((edu, index) => (
                                <div key={index}>
                                  <h5 className="font-medium text-gray-900">{edu.school}</h5>
                                  <p className="text-sm text-gray-600">{edu.degree}</p>
                                  <p className="text-sm text-gray-500">{edu.year}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Compétences */}
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">
                              Compétences
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedMember.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <Button onClick={() => setSelectedMember(null)}>
                      Fermer
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </div>
    </PageContainer>
  );
}