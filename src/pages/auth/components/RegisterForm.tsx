import { useState } from 'react';
import { Button } from '../../../components/ui/Button';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  firstName: string;
  lastName: string;
}

interface RegisterFormProps {
  onSubmit: (data: Omit<RegisterFormData, 'confirmPassword'>) => Promise<void>;
  onOAuthSignup?: (provider?: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function RegisterForm({ onSubmit, onOAuthSignup, isLoading, error }: RegisterFormProps) {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    firstName: '',
    lastName: '',
  });
  const [validationError, setValidationError] = useState<string | null>(null);
  const [registerMethod, setRegisterMethod] = useState<'direct' | 'oauth'>('direct');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation basique
    if (formData.password !== formData.confirmPassword) {
      setValidationError('Les mots de passe ne correspondent pas');
      return;
    }
    
    if (formData.password.length < 8) {
      setValidationError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }
    
    setValidationError(null);
    
    // Appel à la fonction de soumission
    const { confirmPassword, ...submitData } = formData;
    await onSubmit(submitData);
  };

  const displayError = validationError || error;

  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      {displayError && (
        <div className="mb-4 rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Erreur</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{displayError}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mb-6 flex justify-center">
        <div className="flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={() => setRegisterMethod('direct')}
            className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-semibold ${
              registerMethod === 'direct' 
                ? 'bg-primary text-white' 
                : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
            }`}
          >
            Email/Password
          </button>
          <button
            type="button"
            onClick={() => setRegisterMethod('oauth')}
            className={`relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 text-sm font-semibold ${
              registerMethod === 'oauth' 
                ? 'bg-primary text-white' 
                : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
            }`}
          >
            OAuth
          </button>
        </div>
      </div>
      
      {registerMethod === 'direct' ? (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                Prénom
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
              Nom de l'entreprise
            </label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              required
              value={formData.companyName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirmer le mot de passe
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              J'accepte les{' '}
              <a href="#" className="font-medium text-primary hover:text-primary-hover">
                conditions d'utilisation
              </a>
            </label>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Création en cours...' : 'Créer mon compte'}
          </Button>
        </form>
      ) : (
        <div className="space-y-6">
          <p className="text-sm text-gray-600 text-center mb-4">
            Inscrivez-vous avec un de ces fournisseurs
          </p>
          
          <div className="space-y-3">
            <Button
              onClick={() => onOAuthSignup && onOAuthSignup('google-oauth2')}
              variant="secondary"
              className="w-full flex items-center justify-center"
              disabled={isLoading}
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
              Google
            </Button>
            <Button
              onClick={() => onOAuthSignup && onOAuthSignup('apple')}
              variant="secondary"
              className="w-full flex items-center justify-center"
              disabled={isLoading}
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M16.125,0.175c-0.124,0.1-2.392,1.328-2.392,4.075c0,3.167,2.763,4.292,2.842,4.292c-0.024,0.078-0.457,1.593-1.507,3.155c-0.91,1.328-1.854,2.656-3.335,2.656c-1.458,0-1.923-0.864-3.594-0.864c-1.718,0-2.258,0.864-3.669,0.864c-1.458,0-2.571-1.401-3.505-2.75C0.017,10.116,0,8.093,0,7.25c0-3.264,2.12-4.991,4.201-4.991c1.106,0,2.028,0.732,2.72,0.732c0.668,0,1.718-0.775,2.995-0.775C10.964,2.216,14.684,2.162,16.125,0.175z M12.982,1.866c-0.124-1.036,0.379-2.095,0.91-2.763c0.552-0.688,1.523-1.212,2.317-1.244C16.333-1.105,15.869,0,15.317,0.688C14.741,1.401,14.14,2.483,14.289,3.519L12.982,1.866z"
                />
              </svg>
              Apple
            </Button>
            <Button
              onClick={() => onOAuthSignup && onOAuthSignup('facebook')}
              variant="secondary"
              className="w-full flex items-center justify-center"
              disabled={isLoading}
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M24,12.073c0,5.989-4.394,10.954-10.13,11.855v-8.363h2.789l0.531-3.46H13.87V9.86c0-0.947,0.464-1.869,1.95-1.869h1.509V5.045c0,0-1.37-0.234-2.679-0.234c-2.734,0-4.52,1.657-4.52,4.656v2.637H7.091v3.46h3.039v8.363C4.395,23.025,0,18.061,0,12.073c0-6.627,5.373-12,12-12S24,5.445,24,12.073z"
                />
              </svg>
              Facebook
            </Button>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>
              En vous inscrivant, vous acceptez nos{' '}
              <a href="#" className="font-medium text-primary hover:text-primary-hover">
                conditions d'utilisation
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}