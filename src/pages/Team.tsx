import { useState } from "react";
import { Container } from "../components/ui/Container";
import { PageContainer } from "../components/layout/PageContainer";
import { Linkedin, Mail, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";

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
    thesis?: string;
  }>;
  skills: string[];
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Jacques NDAVARO",
    role: "Directeur Exécutif et Architecte d’Affaires",
    image:
      "https://res.cloudinary.com/daxvxdecv/image/upload/v1743090202/kiota_suit/Team/a9p17zju63rrht1sf9nl.jpg",
    bio: "Ingénieur civil en génie électrique et consultant en analyse de données et montage de projets industriels, avec une expertise en transformation numérique et inclusion financière.",
    linkedin: "https://www.linkedin.com/in/jacques-ndavaro-b02b25111",
    email: "jacquesndav@ikiotahub.com",
    experience: [
      {
        company: "i-Kiotahub",
        role: "Architecte d’Affaires",
        period: "2023-2024",
        description:
          "Conception de modèles d’affaires innovants basés sur l’analyse des données des PMEs, intégrant des technologies d’intelligence artificielle et de machine learning pour l’évaluation des risques. Supervision.",
      },
      {
        company: "Centre de Recherche et Transfert des Technologies (CRES)",
        role: "Coordinateur",
        period: "2020-présent",
        description:
          "Supervision des projets de recherche appliquée, gestion des activités de transfert technologique et développement de collaborations avec des institutions académiques et industrielles.",
      },

      {
        company: "Fonds Pour la Promotion de l’Industrie, PNUD RDC, CARITAS",
        role: "Consultant en Montage de Projets Industriels et Innovation",
        period: "2018-2023",
        description:
          "Élaboration de business plans pour des projets industriels, optimisation des processus de production et coordination avec les partenaires financiers pour la mobilisation de fonds.",
      },
    ],
    education: [
      {
        school: "Université Libre des Pays des Grands Lacs",
        degree: "Diplôme d’Ingénieur Civil en Génie Électrique",
        year: "2015-2022",
      },
      {
        school: "Programme de formation dSkills@EA",
        degree:
          "Programme de leadership et de gestion de la R&D pour les universités de l'EAC",
        year: "2024-2025",
      },
      {
        school:
          "African German Entrepreneurship Academy, Université de Leipzig",
        degree: "Formation continue en Entrepreneuriat",
        year: "2020-2022",
      },
      {
        school: "Institut de la Francophonie pour le Développement Durable",
        degree: "Formation en Technologies de l’Environnement",
        year: "2022",
      },
      {
        school: "Université Libre des Pays des Grands Lacs",
        degree: "Formation en Didactique Universitaire",
        year: "2019",
      },
    ],
    skills: [
      "Étude et analyse de projets industriels",
      "Gestion de projet",
      "Modélisation de systèmes d’affaires",
      "Inclusion financière numérique",
      "Optimisation des processus de production",
      "Leadership et gestion d’équipes",
      "Developpement des produits et Innovation",
      "Intelligence artificielle appliquée aux affaires",
      "Analyse de données",
    ],
  },
  {
    id: "2",
    name: "NEKA MBASA PhD",
    role: "Directeur des Investissements",
    image:
      "https://res.cloudinary.com/daxvxdecv/image/upload/v1743091820/kiota_suit/Team/n0zri3f1jxurxcev0afc.jpg",
    bio: "Professeur d'Université et expert en finance avec une expérience de plus de 15 ans dans le secteur bancaire, les institutions financières internationales et la recherche académique.",
    linkedin: "https://linkedin.com/in/jp-mugisha",
    email: "Neka.Mbasa@ikiotahub.com",
    experience: [
      {
        company: "i-Kiotahub",
        role: "Directeur des Investissements",
        period: "2023-présent",
        description:
          "Développement des partenariats financiers, structuration des offres de financement et gestion des portefeuilles d'investissement.",
      },
      {
        company: "OSISA & Université Libre des Pays des Grands Lacs",
        role: "Superviseur d’une enquête sur les économies alternatives",
        period: "2022-présent",
        description:
          "Supervision d’une enquête sur les économies alternatives en République Démocratique du Congo.",
      },
      {
        company: "PNUD",
        role: "Partenaire de recherche",
        period: "2020-présent",
        description:
          "Partenaire dans le cadre du projet « Collecte des Données pour la Consolidation de la Paix et la Restructuration en RDC ».",
      },
      {
        company: "Université Libre des Pays des Grands Lacs",
        role: "Chargé d’audit interne attaché au Rectorat",
        period: "2012-2014",
        description: "Audit interne pour le Rectorat.",
      },
      {
        company: "Université Libre des Pays des Grands Lacs",
        role: "Directeur du Centre Informatique et de Management d’Entreprise (CIME)",
        period: "2012-2014",
        description: "Gestion et direction du Centre Informatique.",
      },
      {
        company: "AMADI",
        role: "Animateur d’un Séminaire de formation",
        period: "20-23 septembre 2011",
        description:
          "Formation sur la Gestion des achats, de la chaine d’approvisionnement et la gestion des entreprises.",
      },
      {
        company: "Université Libre des Pays des Grands Lacs",
        role: "Secrétaire Académique de la Faculté des Sciences Economiques et de Gestion",
        period: "2008-2012",
        description: "Gestion académique et administrative.",
      },
    ],
    education: [
      {
        school: "Université de Douala (Cameroun)",
        degree: "Doctorat/Ph.D en Sciences de Gestion, Option : Finance",
        year: "2014-2019",
      },
      {
        school: "Université de Douala (Cameroun)",
        degree:
          "Diplôme des Etudes Approfondies en Sciences de Gestion, Option : Finance",
        year: "2006-2007",
      },
      {
        school: "ULPGL-Goma",
        degree: "Diplôme de Licence en Gestion des Entreprises",
        year: "2000-2003",
      },
      {
        school: "ULPGL-Goma",
        degree:
          "Diplôme de Graduat en Gestion et Administration des entreprises",
        year: "1996-2000",
      },
    ],
    skills: [
      "Finance",
      "Audit interne",
      "Gestion des entreprises",
      "Recherche académique",
      "Gestion de projets",
    ],
  },
  {
    id: "3",
    name: "Victoire KASEREKA",
    role: "Directeur des Opérations",
    image:
      "https://res.cloudinary.com/daxvxdecv/image/upload/v1743086266/kiota_suit/Team/nwy7nosyu5zww8y6g02m.jpg",
    bio: "Spécialiste en analyse d'affaires avec une expertise en analyse des données et gestion des projets de pilotage des performances",
    linkedin: "https://www.linkedin.com/in/victoire-kasereka-33603b20b/",
    email: "Victoire.Kasereka@ikiotahub.com",
    experience: [
      {
        company: "i-KiotaHub",
        role: "Responsable du département Ikiota-Expertise, d'analyse des données et de gestion d'information",
        period: "2022-Present",
        description:
          "Gestion des projets  de pilotage des performances des entreprises ",
      },
      {
        company: "Centre de Recherche et d'Expertise Scientifique",
        role: "Responsable du programme PAMOJA",
        period: "2021-2023",
        description:
          " Gestion des projets de développement des solutions innovantes pour les entreprises",
      },
    ],
    education: [
      {
        school: "ULPGL/Goma",
        degree: "Licence(Bac+6) en Polytecthnique",
        year: "2022",
      },
    ],
    skills: [
      "Gestion des opérations",
      "Gestion des projets",
      "Analyse des données",
      "Audits Techniques",
      "Analyse d'affaires",
      "pilotage des performances",
    ],
  },

  {
    id: "4",
    name: "Anthony RUBONEKA",
    role: "Directeur de communication",
    image:
      "https://res.cloudinary.com/daxvxdecv/image/upload/v1742916817/kiota_suit/Team/k3iq7ynuuxebkcl92o6t.jpg",
    bio: "Ingénieur en réseau et télécommunications. Chargé de communication expérimenté en gestion de l'image, création de contenus et coordination des communications internes et externes. Passionné par la créativité et l'innovation.",
    linkedin:
      "https://www.linkedin.com/in/anthony-wany-ab1a921bb?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    email: "anthonyrub@ikiotahub.com",
    experience: [
      {
        company: "i-Kiotahub",
        role: "Directeur Developpement Commercial et Croissance",
        period: "2022 à nos jours",
        description:
          "Gestion de l’image, création des contenus, relations médias, coordination des communications internes et externes.",
      },
      {
        company: "CRES",
        role: "Analyste informaticien",
        period: "2019-2020",
        description:
          "Analyse des besoins dans la création de bases de données restreintes.",
      },
    ],
    education: [
      {
        school: "ISIG Goma",
        degree: "Licence en Réseau et télécommunications",
        year: "2022",
      },
      {
        school: "ISIG Goma",
        degree: "Grade en Informatique de Gestion",
        year: "2020",
      },
    ],
    skills: [
      "Stratégie de communication",
      "Communication digitale",
      "Création des contenus",
      "Administration réseau",
      "Gestion informatique",
      "Outils de gestion de la croissance (Analyse et optimisation du parcours utilisateurs)",
      "Plateformes d'engagement utilisateurs (CRM)",
      "Analyse de données (Mixpanel, Google Analytics)",
    ],
  },
  {
    id: "5",
    name: "Stéphanie KAHINDO",
    role: "Responsable des relations publiques et inclusion sociale",
    image:
      "https://res.cloudinary.com/daxvxdecv/image/upload/v1743091820/kiota_suit/Team/placeholder.jpg", // Remplacez par l'URL de son image
    bio: "Consultante en marketing et communication, spécialisée dans les relations publiques et l'inclusion sociale, avec une expertise dans l'accompagnement des PMEs et Startups.",
    linkedin: "https://linkedin.com/in/stephanie-kahindo", // Remplacez par son lien LinkedIn si disponible
    email: "kelvinesteph@gmail.com",
    experience: [
      {
        company: "Ikiotahub",
        role: "Responsable des relations publiques et inclusion sociale",
        period: "Janv 2022-présent",
        description:
          "Accompagnement des PMEs et Startups dans l’élaboration et mise en œuvre de leurs stratégies marketing, tout en promouvant l'inclusion sociale.",
      },
      {
        company: "Troro ap",
        role: "Responsable marketing et communication",
        period: "Octobre-novembre 2020",
        description: "Gestion des campagnes marketing et communication.",
      },
      {
        company: "KALIBA Corporation",
        role: "Stage académique en communication et marketing",
        period: "Décembre 2019",
        description:
          "Participation aux activités de communication et marketing.",
      },
      {
        company: "PEV / Goma",
        role: "Commission vaccination contre le MVE",
        period: "Aut 2019-Janvier 2020",
        description:
          "Participation à la campagne de vaccination contre le MVE.",
      },
      {
        company: "RAJECOPOD Nord-Kivu",
        role: "Animatrice sociale",
        period: "Décembre 2018-Juillet 2019",
        description: "Animation sociale et sensibilisation communautaire.",
      },
      {
        company: "Virunga Business Radio",
        role: "Stage académique en journalisme",
        period: "Juillet 2017",
        description: "Production et diffusion de contenus journalistiques.",
      },
      {
        company: "GHOVODI – GOMA",
        role: "Animatrice sociale",
        period: "2015-2016",
        description: "Animation sociale et engagement communautaire.",
      },
    ],
    education: [
      {
        school: "Université de Goma",
        degree: "Licence en communication des organisations",
        year: "2019-2020",
      },
      {
        school: "Université de Goma",
        degree: "Graduat en science de l’information et de la communication",
        year: "2017-2018",
      },
      {
        school: "Institut Jikaze",
        degree: "Diplôme d'État",
        year: "2014-2015",
      },
      {
        school: "E.P Bukoma",
        degree: "Certificat d'Études primaires",
        year: "2007-2008",
      },
    ],
    skills: [
      "Relations publiques",
      "Inclusion sociale",
      "Marketing digital",
      "Communication sociale",
      "Leadership",
      "NTIC",
      "Réseaux sociaux",
    ],
  },
  {
    id: "6",
    name: "MBAMBU SYAYIGHANZA Edwige, PhD",
    role: "Responsable des Audits et Performance des PMEs",
    image:
      "https://res.cloudinary.com/daxvxdecv/image/upload/v1743091820/kiota_suit/Team/placeholder.jpg", // Remplacez par l'URL de son image
    bio: "Économiste et chercheuse spécialisée en audit, gestion financière et entrepreneuriat, avec une expertise dans l'amélioration des performances des PMEs et la recherche académique.",
    linkedin: "", // Ajoutez son lien LinkedIn si disponible
    email: "", // Ajoutez son email si disponible
    experience: [
      {
        company: "i-Kiotahub",
        role: "Responsable des Audits et Performance des PMEs",
        period: "2023-présent",
        description:
          "Supervision des audits et amélioration des performances des PMEs en RDC, avec un focus sur la gestion financière et l'optimisation des processus.",
      },
      {
        company: "Université Libre des Pays des Grands Lacs (ULPGL)",
        role: "Chef de Travaux et Chercheuse",
        period: "01/11/2015-présent",
        description:
          "Dispenser des cours en gestion, entreprenariat, comptabilité financière, audit, et évaluation économique des projets. Participation à des conférences et journées scientifiques.",
      },
      {
        company: "Université Libre des Pays des Grands Lacs (ULPGL)",
        role: "Assistante de cours",
        period: "2007-2009",
        description:
          "Assistance aux cours organisés au sein de la faculté et contribution aux recherches dans le domaine de gestion.",
      },
    ],
    education: [
      {
        school: "Université Protestante du Congo (UPC), Kinshasa/RDC",
        degree:
          "Doctorat en Administration des Affaires, Domaine d’Audit et Gestion Financière",
        year: "2023",
        thesis:
          "Qualité de l'audit et performance des PME en RDC : vérification empirique sur un panel des PME du Nord-Kivu.",
      },
      {
        school: "Université Libre de Kigali (ULK), Gisenyi/Rwanda",
        degree: "Master en Gestion Financière",
        year: "2017-2019",
      },
      {
        school: "Université Libre des Pays des Grands Lacs (ULPGL), Goma/RDC",
        degree: "Licence en Sciences Économiques et de Gestion",
        year: "2007-2009",
      },
      {
        school: "Université Libre des Pays des Grands Lacs (ULPGL), Goma/RDC",
        degree: "Grade en Sciences Économiques",
        year: "2002-2006",
      },
    ],
    skills: [
      "Audit et évaluation économique",
      "Gestion des entreprises",
      "Entrepreneuriat",
      "Budgétisation et prévision des flux de trésorerie",
      "Organisation et gestion administrative",
      "Communication",
      "Travail en équipe",
      "Coordination",
      "Capacité à travailler sous pression",
      "Microsoft Word, Excel, PowerPoint",
      "Internet et logiciels de gestion (SAGE)",
    ],
  },
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
              Une équipe passionnée combinant expertise technologique et
              connaissance approfondie du Marché local.
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
                            <p className="text-gray-500">
                              {selectedMember.role}
                            </p>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-8">
                          {selectedMember.bio}
                        </p>

                        <div className="space-y-8">
                          {/* Expérience */}
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">
                              Expérience
                            </h4>
                            <div className="space-y-4">
                              {selectedMember.experience.map((exp, index) => (
                                <div
                                  key={index}
                                  className="border-l-2 border-primary pl-4"
                                >
                                  <h5 className="font-medium text-gray-900">
                                    {exp.company}
                                  </h5>
                                  <p className="text-sm text-gray-600">
                                    {exp.role}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {exp.period}
                                  </p>
                                  <p className="mt-2 text-sm text-gray-600">
                                    {exp.description}
                                  </p>
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
                                  <h5 className="font-medium text-gray-900">
                                    {edu.school}
                                  </h5>
                                  <p className="text-sm text-gray-600">
                                    {edu.degree}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {edu.year}
                                  </p>
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
