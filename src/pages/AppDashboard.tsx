import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Calculator, LineChart, BarChart } from 'lucide-react';
import { Container } from '../components/ui/Container';

const apps = {
  sme: [
    {
      id: 'admin',
      name: 'Administration',
      description: 'Gérez votre profil entreprise et vos utilisateurs',
      icon: Settings,
      color: 'bg-blue-500',
    },
    {
      id: 'accounting',
      name: 'Comptabilité',
      description: 'Gérez votre comptabilité et vos finances',
      icon: Calculator,
      color: 'bg-green-500',
    },
    {
      id: 'portfolio',
      name: 'Gestion de Portefeuille',
      description: 'Suivez et optimisez vos investissements',
      icon: LineChart,
      color: 'bg-purple-500',
    },
  ],
  financial_institution: [
    {
      id: 'portfolio',
      name: 'Gestion de Portefeuille',
      description: 'Gérez les portefeuilles de vos clients PME',
      icon: BarChart,
      color: 'bg-indigo-500',
    },
  ],
};

export function AppDashboard() {
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  
  const userApps = apps.sme; // Par défaut, on affiche les applications SME

  return (
    <div className="relative overflow-hidden min-h-screen" style={{ background: 'linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%)' }}>
      {/* SVG curves for fluidity and section connection */}
      <svg className="absolute top-0 left-0 w-full h-32 z-0" viewBox="0 0 1440 160" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,80 C360,160 1080,0 1440,80 L1440,0 L0,0 Z" fill="#e5e7eb" />
      </svg>
      <svg className="absolute top-32 left-0 w-full h-24 z-0" viewBox="0 0 1440 96" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,48 C480,96 960,0 1440,48 L1440,0 L0,0 Z" fill="#f3f4f6" />
      </svg>
      <Container className="relative z-10 py-12 lg:py-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">
            Bienvenue
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Sélectionnez une application pour commencer
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {userApps.map((app) => (
            <motion.button
              key={app.id}
              onClick={() => setSelectedApp(app.id)}
              className={`relative flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-200 text-left ${
                selectedApp === app.id ? 'ring-2 ring-primary' : ''
              }`}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`absolute -right-4 -top-4 w-20 h-20 ${app.color} rounded-full opacity-10 blur-2xl`} />
              <div className={`inline-flex items-center justify-center rounded-xl ${app.color} p-3`}>
                <app.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{app.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{app.description}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {selectedApp && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 p-8 bg-white rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {userApps.find(app => app.id === selectedApp)?.name}
            </h2>
            <div className="prose max-w-none">
              <p>Contenu de l'application sélectionnée...</p>
            </div>
          </motion.div>
        )}
      </Container>
    </div>
  );
}