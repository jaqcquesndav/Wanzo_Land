import { Button } from '../../../components/ui/Button';

export function EnterpriseContact() {
  return (
    <div className="mt-24 rounded-2xl bg-gray-50 py-16 px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Besoin d'une solution sur mesure ?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
          Contactez notre équipe commerciale pour une offre personnalisée adaptée aux besoins spécifiques de votre entreprise.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button>Contacter l'équipe commerciale</Button>
          <Button variant="secondary">En savoir plus</Button>
        </div>
      </div>
    </div>
  );
}