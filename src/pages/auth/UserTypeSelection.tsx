import { useNavigate } from 'react-router-dom';
import { Container } from '../../components/ui/Container';
import { USER_TYPES } from '../../config/apps';

export function UserTypeSelection() {
  const navigate = useNavigate();

  const handleUserTypeSelect = (type: string) => {
    // Stocker le type d'utilisateur dans sessionStorage
    sessionStorage.setItem('auth_user_type', type);
    
    navigate(`/auth/apps/${type}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Choisissez votre type de compte
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Sélectionnez le type d'utilisateur qui correspond à votre profil
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-2xl mx-auto">
          <button
            onClick={() => handleUserTypeSelect(USER_TYPES.SME)}
            className="relative flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-200 text-left group cursor-pointer"
          >
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary rounded-full opacity-10 blur-2xl" />
            <div className="relative">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary">PME</h3>
              <p className="mt-2 text-sm text-gray-500">
                Accédez à vos applications de gestion et de financement
              </p>
            </div>
          </button>

          <button
            onClick={() => handleUserTypeSelect(USER_TYPES.FINANCIAL_INSTITUTION)}
            className="relative flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-200 text-left group cursor-pointer"
          >
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-success rounded-full opacity-10 blur-2xl" />
            <div className="relative">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-success">Institution Financière</h3>
              <p className="mt-2 text-sm text-gray-500">
                Gérez les portefeuilles de vos clients PME
              </p>
            </div>
          </button>
        </div>
      </Container>
    </div>
  );
}