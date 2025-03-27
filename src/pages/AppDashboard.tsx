import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Calculator, LineChart, BarChart } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { useAuth0 } from '@auth0/auth0-react';
import { User } from '../types/auth';

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
  const { user } = useAuth0<User>();
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  
  const userApps = user?.userType === 'financial_institution' ? apps.financial_institution : apps.sme;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">
            Bienvenue, {user?.name}
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