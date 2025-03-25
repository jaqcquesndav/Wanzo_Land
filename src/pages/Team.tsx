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
    name: 'Sarah Chen',
    role: 'CEO & Co-fondatrice',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    bio: "Experte en fintech avec plus de 15 ans d'expérience dans le secteur bancaire et les startups technologiques. Passionnée par l'inclusion financière en Afrique.",
    linkedin: 'https://linkedin.com/in/sarah-chen',
    email: 'sarah.chen@kiota.com',
    experience: [
      {
        company: 'Goldman Sachs',
        role: 'Vice President, Digital Banking',
        period: '2015-2020',
        description: 'Direction de la transformation numérique des services bancaires aux entreprises.'
      },
      {
        company: 'McKinsey & Company',
        role: 'Senior Consultant',
        period: '2010-2015',
        description: 'Conseil en stratégie pour les institutions financières en Afrique.'
      }
    ],
    education: [
      {
        school: 'Harvard Business School',
        degree: 'MBA',
        year: '2010'
      },
      {
        school: 'MIT',
        degree: 'BSc Computer Science',
        year: '2005'
      }
    ],
    skills: ['Leadership', 'Fintech', 'Stratégie', 'Innovation', 'Finance inclusive']
  },
  {
    id: '2',
    name: 'Jean-Paul Mugisha',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    bio: "Expert en intelligence artificielle et en développement de solutions cloud. Plus de 10 ans d'expérience dans la création de plateformes fintech innovantes.",
    linkedin: 'https://linkedin.com/in/jp-mugisha',
    email: 'jp.mugisha@kiota.com',
    experience: [
      {
        company: 'Microsoft',
        role: 'Senior Software Engineer',
        period: '2018-2022',
        description: 'Développement de solutions cloud pour le secteur financier.'
      },
      {
        company: 'Andela',
        role: 'Technical Team Lead',
        period: '2014-2018',
        description: 'Formation et direction d\'équipes de développeurs en Afrique.'
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
    name: 'Aminata Diallo',
    role: 'Directrice des Opérations',
    image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    bio: "Spécialiste des opérations avec une expertise particulière dans le développement de partenariats stratégiques en Afrique. Passionnée par l'impact social.",
    linkedin: 'https://linkedin.com/in/aminata-diallo',
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
              Une équipe passionnée combinant expertise technologique et connaissance approfondie du secteur financier africain.
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