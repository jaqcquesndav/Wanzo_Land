import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Container } from '../ui/Container';
import { MobileNavigation } from './MobileNavigation';

const navigation = [
  { name: 'À propos', href: '/about' },
  { name: 'Produits', href: '/products' },
  { name: 'Tarifs', href: '/pricing' },
  { name: 'Blog', href: '/blog' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <Container>
        <nav className="flex h-16 items-center justify-between gap-x-8">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-warning">
              Kiota Suit
            </Link>
          </div>
          
          <div className="hidden lg:flex flex-1 justify-center gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "relative py-2 text-sm font-semibold transition-colors",
                  "text-gray-700 hover:text-warning"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-x-6">
            <Link
              to="/auth/select"
              className="hidden lg:block rounded-full bg-warning px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-warning-hover"
            >
              Commencer
            </Link>
            <button
              type="button"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </Container>

      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navigation={navigation}
      />
    </header>
  );
}