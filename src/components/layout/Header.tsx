import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ShoppingCart, Home } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Container } from '../ui/Container';
import { MobileNavigation } from './MobileNavigation';
import React from 'react';

const navigation = [
  { name: 'Accueil', href: '/', icon: <Home className="inline-block mr-2 h-5 w-5 text-blue-500" /> },
  { name: 'À propos', href: '/about' },
  { name: 'Equipe', href: '/team' },
  { name: 'Applications', href: '/auth/select' },
  { name: 'Apprendre', href: '/under-development' },
  { name: 'Kiota Store', href: '/leasing-store', icon: <ShoppingCart className="inline-block ml-2 h-5 w-5 text-blue-500" /> },
  
  //{ name: 'FAQ', href: '/faq' },
  //{ name: 'Contact', href: '/contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation(); // Récupère l'URL actuelle

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
                  "text-gray-700 hover:text-warning",
                  location.pathname === item.href && "text-warning"
                )}
              >
                {item.icon && React.cloneElement(item.icon, {
                  className: cn(
                    "inline-block mr-2 h-5 w-5",
                    location.pathname === item.href ? "text-warning" : "text-gray-700"
                  )
                })}
                {item.name}
                {location.pathname === item.href && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-warning"></span>
                )}
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
        navigation={navigation.map((item) => ({
          ...item,
          icon: item.icon
            ? React.cloneElement(item.icon, {
                className: cn(
                  "inline-block mr-2 h-5 w-5",
                  location.pathname === item.href ? "text-warning" : "text-gray-700"
                )
              })
            : null,
        }))}
      />
    </header>
  );
}