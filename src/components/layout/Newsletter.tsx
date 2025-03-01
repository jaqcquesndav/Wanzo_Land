import { useState } from 'react';
import { Button } from '../ui/Button';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simuler un appel API
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <div className="mt-16 border-t border-white/10 pt-8">
      <h3 className="text-sm font-semibold leading-6 text-white">
        Abonnez-vous à notre newsletter
      </h3>
      <p className="mt-2 text-sm leading-6 text-gray-300">
        Recevez nos dernières actualités, guides et conseils directement dans votre boîte mail.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 sm:flex sm:max-w-md gap-x-4">
        <label htmlFor="email-address" className="sr-only">
          Adresse email
        </label>
        <input
          type="email"
          name="email-address"
          id="email-address"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full min-w-0 appearance-none rounded-md border-0 bg-white/5 px-3 py-1.5 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:w-64 sm:text-sm sm:leading-6"
          placeholder="Entrez votre email"
        />
        <Button
          type="submit"
          disabled={status === 'loading'}
          className="mt-4 sm:mt-0"
        >
          {status === 'loading' ? 'Inscription...' : 'S\'abonner'}
        </Button>
      </form>
      {status === 'success' && (
        <p className="mt-4 text-sm text-green-400">
          Merci pour votre inscription !
        </p>
      )}
      {status === 'error' && (
        <p className="mt-4 text-sm text-red-400">
          Une erreur est survenue. Veuillez réessayer.
        </p>
      )}
    </div>
  );
}