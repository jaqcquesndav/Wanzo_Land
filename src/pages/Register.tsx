import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { UserType } from '../types/common';

export function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
  });
  const [userType, setUserType] = useState<UserType>('sme');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // La logique d'inscription appellerait un service (ex: useAuth.register)
    const registrationData = {
      email: formData.email,
      password: formData.password,
      userType: userType,
      // Le nom de l'entité serait utilisé pour créer l'organisation ou l'institution associée
      entityName: formData.companyName, 
    };
    console.log('Données d\'inscription à envoyer:', registrationData);
    // Exemple: register(registrationData);
  };

  return (
    <div className="relative overflow-hidden min-h-screen" style={{ background: 'linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%)' }}>
      {/* SVG curves for fluidity and section connection */}
      <svg className="absolute top-0 left-0 w-full h-32 z-0" viewBox="0 0 1440 160" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,80 C360,160 1080,0 1440,80 L1440,0 L0,0 Z" fill="#e5e7eb" />
      </svg>
      <svg className="absolute top-32 left-0 w-full h-24 z-0" viewBox="0 0 1440 96" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,48 C480,96 960,0 1440,48 L1440,0 L0,0 Z" fill="#f3f4f6" />
      </svg>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Créez votre compte
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Vous êtes ?</label>
                <div className="mt-2 grid grid-cols-2 gap-2 rounded-md bg-gray-100 p-1">
                  <button
                    type="button"
                    onClick={() => setUserType('sme')}
                    className={`w-full px-3 py-2 text-sm font-semibold text-center rounded-md transition-colors ${
                      userType === 'sme' ? 'bg-white text-primary shadow-sm' : 'bg-transparent text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    PME
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType('financial_institution')}
                    className={`w-full px-3 py-2 text-sm font-semibold text-center rounded-md transition-colors ${
                      userType === 'financial_institution' ? 'bg-white text-primary shadow-sm' : 'bg-transparent text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Institution Financière
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                  {userType === 'sme' ? "Nom de l'entreprise" : "Nom de l'institution"}
                </label>
                <input
                  id="companyName"
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <Button type="submit" className="w-full">
                S'inscrire
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}