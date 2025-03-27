import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '../../components/ui/Container';
import { APPS_CONFIG } from '../../config/apps';
import { Settings, Calculator, LineChart, BarChart } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const icons = {
  Settings,
  Calculator,
  LineChart,
  BarChart,
};

export function AppSelection() {
  const { userType } = useParams<{ userType: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!userType || !APPS_CONFIG[userType as keyof typeof APPS_CONFIG]) {
    navigate('/auth/select');
    return null;
  }

  const apps: { [key: string]: { id: string; name: string; description: string; icon: string; domain: string; requiredRole: string } } = APPS_CONFIG[userType as keyof typeof APPS_CONFIG];

  const handleAppSelect = (appId: string) => {
    const appConfig = apps[appId];
    
    if (!user) {
      // Stocker le type d'utilisateur et l'ID de l'application dans sessionStorage
      sessionStorage.setItem('auth_user_type', userType);
      sessionStorage.setItem('auth_app_id', appId);
      
      // Rediriger vers la page de connexion
      navigate(`/auth/login?userType=${userType}&appId=${appId}`);
      return;
    }

    // Si l'utilisateur est déjà connecté, rediriger vers le sous-domaine
    const token = localStorage.getItem('access_token');
    window.location.href = `${appConfig.domain}?token=${token}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="mt-12 lg-mt-12 text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Choisissez votre application
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Sélectionnez l'application que vous souhaitez utiliser
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {Object.entries(apps).map(([appId, app]) => {
            const Icon = icons[app.icon as keyof typeof icons];
            return (
              <button
                key={appId}
                onClick={() => handleAppSelect(appId)}
                className="relative flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-200 text-left group cursor-pointer"
              >
                <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary rounded-full opacity-10 blur-2xl" />
                <div className="inline-flex items-center justify-center rounded-xl bg-primary p-2">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary">
                    {app.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">{app.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/auth/select')}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Changer de type de compte
          </button>
        </div>
      </Container>
    </div>
  );
}