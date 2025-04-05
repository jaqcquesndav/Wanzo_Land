import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/Button';

const navigation = {
  solutions: [
    { name: 'ERP', href: 'auth/apps/sme' },
    { name: 'Gestion de portefeuille IF', href: '/auth/apps/financial_institution' },
    { name: 'Kiota Store', href: '/leasing-store' },
    { name: 'Tarification', href: '/under-development' },
  ],
  support: [
    { name: 'Documentation', href: '/under-development' },
    { name: 'Guides', href: '/under-development' },
    { name: 'FAQ', href: '/under-development' },
    { name: 'Contact', href: '/under-development' },
  ],
  company: [
    { name: 'À propos', href: '/about' },
    { name: 'Blog', href: '/under-development' },
    { name: 'Équipe', href: '/team' },
    { name: 'Carrière', href: '/under-development' },
    { name: 'Partenaires', href: '/under-development' },
  ],
  legal: [
    { name: 'Confidentialité', href: '/under-development' },
    { name: 'CGU', href: '/under-development' },
  ],
  social: [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/i-kiotahub/', icon: Linkedin },
    { name: 'Instagram', href: '#', icon: Instagram },
  ],
};

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscriptionStatus('loading');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscriptionStatus('success');
      setEmail('');
    } catch (error) {
      setSubscriptionStatus('error');
    }
  };

  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <Container className="pb-8 pt-16 sm:pt-24">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link to="/" className="text-white text-2xl font-bold">
              i-kiotaHub
            </Link>
            <p className="text-sm leading-6 text-gray-300">
              Le numérique au service de l'inclusion financière des PMEs
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="h-5 w-5" />
                <span className="text-sm">RDC/Nord-Kivu/Goma, Commune de Goma, Quartier Lac Vert, Avenue Kabanda</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="h-5 w-5" />
                <span className="text-sm">+243 123 456 789</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="h-5 w-5" />
                <span className="text-sm">contact@kiota.com</span>
              </div>
            </div>
            /*
            <div className="space-y-2 text-sm text-gray-400">
              <p>RCCM: CD/GOMA/RCCM/23-B-00196</p>
              <p>ID NAT: 19-H5300-N40995F</p>
              <p>NIF: A2321658S</p>
            </div>
            
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Solutions</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <Link to={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <Link to={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Entreprise</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link to={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Légal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link to={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <h3 className="text-sm font-semibold leading-6 text-white">
            Abonnez-vous à notre newsletter
          </h3>
          <p className="mt-2 text-sm leading-6 text-gray-300">
            Recevez nos dernières actualités, guides et conseils directement dans votre boîte mail.
          </p>
          <form onSubmit={handleSubscribe} className="mt-6 sm:flex sm:max-w-md gap-x-4">
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
              className="w-full min-w-0 appearance-none rounded-md border-0 bg-white/5 px-3 py-1.5 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:w-64 sm:text-sm sm:leading-6"
              placeholder="Entrez votre email"
            />
            <Button
              type="submit"
              disabled={subscriptionStatus === 'loading'}
              className="mt-4 sm:mt-0"
            >
              {subscriptionStatus === 'loading' ? 'Inscription...' : 'S\'abonner'}
            </Button>
          </form>
          {subscriptionStatus === 'success' && (
            <p className="mt-4 text-sm text-green-400">
              Merci pour votre inscription !
            </p>
          )}
          {subscriptionStatus === 'error' && (
            <p className="mt-4 text-sm text-red-400">
              Une erreur est survenue. Veuillez réessayer.
            </p>
          )}
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            {navigation.social.map((item) => (
              <Link
                key={item.name}
                to="/under-development"
                className="text-gray-400 hover:text-gray-300"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </Link>
            ))}
          </div>
          <p className="mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">
            &copy; {new Date().getFullYear()} i-kiotaHub. Tous droits réservés.
          </p>
        </div>
      </Container>
    </footer>
  );
}