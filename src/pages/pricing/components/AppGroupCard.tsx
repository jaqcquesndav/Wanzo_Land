import { useAuthRedirect } from '../../../hooks/useAuthRedirect';

// ... autres imports

export function AppGroupCard({ group, price, billingPeriod }: AppGroupCardProps) {
  const { requireRegister } = useAuthRedirect();
  const { user } = useAuth();

  const handleSubscribe = () => {
    if (!user) {
      requireRegister('subscribe');
      return;
    }
    // Logique de souscription pour les utilisateurs connectés
    window.location.href = 'https://auth.kiota.com/subscription';
  };

  return (
    // ... reste du composant avec handleSubscribe comme gestionnaire onClick du bouton
  );
}