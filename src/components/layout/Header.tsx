import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ShoppingCart, Home, Grid, Briefcase, BarChart2, DollarSign, Layers, ShoppingBag } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Container } from '../ui/Container';
import { MobileNavigation } from './MobileNavigation';
import React from 'react';
import wanzoLogo from '../../assets/images/wanzo_logo.png';

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'À propos', href: '/about' },
  { name: 'Equipe', href: '/team' },
  { name: 'Tarification', href: '/tarification' },
  { name: 'FAQ', href: '/faq' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);
  const location = useLocation();
  const appsBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <Container>
        <nav className="flex h-16 items-center justify-between gap-x-8">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <img src={wanzoLogo} alt="Wanzo logo" className="h-10 w-auto object-contain" />
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
            {/* Bouton grille d'applications façon Google/Docker */}
            <div className="relative ml-4">
              <button
                ref={appsBtnRef}
                className="flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 transition-colors"
                onClick={() => setAppsOpen((v) => !v)}
                title="Applications"
                aria-haspopup="true"
                aria-expanded={appsOpen}
              >
                <span className="grid grid-cols-2 grid-rows-2 gap-0.5 w-4 h-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <span key={i} className="block w-1.5 h-1.5 bg-gray-700 rounded-sm"></span>
                  ))}
                </span>
              </button>
              {appsOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setAppsOpen(false)}
                    aria-hidden="true"
                  />
                  <div
                    className="absolute left-1/2 top-14 -translate-x-1/2 bg-white border border-gray-200 rounded-xl shadow-2xl p-4 w-[340px] max-h-[70vh] overflow-y-auto z-50 animate-fade-in"
                    style={{ left: '50%', right: 'auto' }}
                    onClick={e => e.stopPropagation()}
                  >
                    {/* APPS MODAL: Gestion */}
                    <div className="mb-2">
                      <div className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">Gestion</div>
                      <div className="grid grid-cols-2 gap-2 min-h-[180px] items-start">
                        {/* Nouveautés */}
                        <Link to="/apps/accounting" className="flex flex-col items-center p-2 hover:bg-blue-50 rounded-lg transition relative">
                          <span className="absolute top-1 right-1 bg-blue-500 text-white text-[9px] px-1 py-0.5 rounded-full font-bold">N</span>
                          <span className="bg-blue-100 text-blue-600 rounded-full p-2 mb-1"><BarChart2 className="w-6 h-6" /></span>
                          <span className="text-xs font-medium text-gray-700 text-center">Comptabilité</span>
                        </Link>
                        <Link to="/apps/business" className="flex flex-col items-center p-2 hover:bg-green-50 rounded-lg transition relative">
                          <span className="absolute top-1 right-1 bg-green-500 text-white text-[9px] px-1 py-0.5 rounded-full font-bold">N</span>
                          <span className="bg-green-100 text-green-600 rounded-full p-2 mb-1"><Briefcase className="w-6 h-6" /></span>
                          <span className="text-xs font-medium text-gray-700 text-center">Gestion commerciale</span>
                        </Link>
                        {/* Disponibles */}
                        <Link to="/leasing-store" className="flex flex-col items-center p-2 hover:bg-pink-50 rounded-lg transition">
                          <span className="bg-pink-100 text-pink-600 rounded-full p-2 mb-1"><ShoppingBag className="w-6 h-6" /></span>
                          <span className="text-xs font-medium text-gray-700 text-center">Wanzo Store</span>
                        </Link>
                        {/* À venir */}
                        <div className="flex flex-col items-center p-2 rounded-lg opacity-60 relative">
                          <span className="absolute top-1 right-1 bg-gray-400 text-white text-[9px] px-1 py-0.5 rounded-full font-bold">⏳</span>
                          <span className="bg-gray-100 text-gray-500 rounded-full p-2 mb-1"><Layers className="w-6 h-6" /></span>
                          <span className="text-xs font-medium text-gray-500 text-center">Adha Crea</span>
                        </div>
                        <div className="flex flex-col items-center p-2 rounded-lg opacity-60 relative">
                          <span className="absolute top-1 right-1 bg-gray-400 text-white text-[9px] px-1 py-0.5 rounded-full font-bold">⏳</span>
                          <span className="bg-gray-100 text-gray-500 rounded-full p-2 mb-1"><Layers className="w-6 h-6" /></span>
                          <span className="text-xs font-medium text-gray-500 text-center">Production</span>
                        </div>
                        <div className="flex flex-col items-center p-2 rounded-lg opacity-60 relative">
                          <span className="absolute top-1 right-1 bg-gray-400 text-white text-[9px] px-1 py-0.5 rounded-full font-bold">⏳</span>
                          <span className="bg-gray-100 text-gray-500 rounded-full p-2 mb-1"><Layers className="w-6 h-6" /></span>
                          <span className="text-xs font-medium text-gray-500 text-center">Somo (E-learning)</span>
                        </div>
                        <div className="flex flex-col items-center p-2 rounded-lg opacity-60 relative">
                          <span className="absolute top-1 right-1 bg-gray-400 text-white text-[9px] px-1 py-0.5 rounded-full font-bold">⏳</span>
                          <span className="bg-gray-100 text-gray-500 rounded-full p-2 mb-1"><Layers className="w-6 h-6" /></span>
                          <span className="text-xs font-medium text-gray-500 text-center">Projets</span>
                        </div>
                        <div className="flex flex-col items-center p-2 rounded-lg opacity-60 relative">
                          <span className="absolute top-1 right-1 bg-gray-400 text-white text-[9px] px-1 py-0.5 rounded-full font-bold">⏳</span>
                          <span className="bg-gray-100 text-gray-500 rounded-full p-2 mb-1"><Layers className="w-6 h-6" /></span>
                          <span className="text-xs font-medium text-gray-500 text-center">RH</span>
                        </div>
                        <div className="flex flex-col items-center p-2 rounded-lg opacity-60 relative">
                          <span className="absolute top-1 right-1 bg-gray-400 text-white text-[9px] px-1 py-0.5 rounded-full font-bold">⏳</span>
                          <span className="bg-gray-100 text-gray-500 rounded-full p-2 mb-1"><Layers className="w-6 h-6" /></span>
                          <span className="text-xs font-medium text-gray-500 text-center">Stockage</span>
                        </div>
                      </div>
                    </div>
                    {/* APPS MODAL: Financement */}
                    <div className="mt-4">
                      <div className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">Financement</div>
                      <div className="grid grid-cols-1 gap-2 min-h-[90px] items-start justify-items-start">
                        {/* À venir */}
                        <div className="flex flex-col items-center p-2 rounded-lg opacity-60 relative">
                          <span className="absolute top-1 right-1 bg-gray-400 text-white text-[9px] px-1 py-0.5 rounded-full font-bold">⏳</span>
                          <span className="bg-gray-100 text-gray-500 rounded-full p-2 mb-1"><Layers className="w-6 h-6" /></span>
                          <span className="text-xs font-medium text-gray-500 text-center">Financement PME</span>
                        </div>
                        <div className="flex flex-col items-center p-2 rounded-lg opacity-60 relative">
                          <span className="absolute top-1 right-1 bg-gray-400 text-white text-[9px] px-1 py-0.5 rounded-full font-bold">⏳</span>
                          <span className="bg-gray-100 text-gray-500 rounded-full p-2 mb-1"><Layers className="w-6 h-6" /></span>
                          <span className="text-xs font-medium text-gray-500 text-center">Gestion de Portefeuille</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <Link
              to="/auth/login"
              className="hidden lg:block text-warning underline text-sm font-semibold hover:text-warning-hover transition"
              style={{ textUnderlineOffset: '3px' }}
            >
              Se connecter
            </Link>
            <Link
              to="/auth/register"
              className="hidden lg:block rounded-full bg-warning px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-warning-hover transition"
            >
              Créer un compte
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