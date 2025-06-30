import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ShoppingCart, Home, Grid, Briefcase, BarChart2, DollarSign, Layers, ShoppingBag, UserCircle } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Container } from '../ui/Container';
import { MobileNavigation } from './MobileNavigation';
import React from 'react';
import wanzoLogo from '../../assets/images/wanzo_logo.png';
// Import de la config Auth0 centralisée
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CALLBACK_URL, AUTH0_LOGOUT_URL } from '../../config/auth0';
import { startAuth0PKCE } from '../../utils/auth0pkce';

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
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const location = useLocation();
  const appsBtnRef = useRef<HTMLButtonElement>(null);
  const profileBtnRef = useRef<HTMLDivElement>(null);
  // Toujours lire le profil utilisateur depuis localStorage à chaque rendu
  const user = React.useMemo(() => {
    const stored = localStorage.getItem('auth0_user');
    return stored ? JSON.parse(stored) : null;
  }, [localStorage.getItem('auth0_user')]);

  // Fonction de déconnexion
  function handleLogout() {
    localStorage.removeItem('auth0_user');
    localStorage.removeItem('auth0_token');
    localStorage.removeItem('auth0_id_token');
    localStorage.removeItem('auth0_refresh_token');
    localStorage.removeItem('auth0_expires_in');
    localStorage.removeItem('auth0_token_type');
    sessionStorage.removeItem('auth0_code_verifier');
    sessionStorage.removeItem('auth0_state');
    // Redirection vers le logout Auth0 global
    const domain = AUTH0_DOMAIN;
    const clientId = AUTH0_CLIENT_ID;
    const returnTo = AUTH0_LOGOUT_URL;
    window.location.href = `https://${domain}/v2/logout?client_id=${clientId}&returnTo=${encodeURIComponent(returnTo)}`;
  }

  // Fermer le menu si clic en dehors
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileBtnRef.current && !profileBtnRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    }
    if (profileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileMenuOpen]);

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
                {item.name}
                {location.pathname === item.href && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-warning"></span>
                )}
              </Link>
            ))}
            {/* Bouton grille d'applications façon Google/Docker (desktop) */}
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
            </div>
          </div>
          {/* MOBILE: bouton apps + hamburger */}
          <div className="flex items-center gap-x-2 lg:hidden ml-auto">
            {/* Bouton apps visible sur mobile */}
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
            {/* Bouton hamburger mobile */}
            <button
              type="button"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
          {/* Section droite (profil, login, etc.) */}
          <div className="hidden lg:flex items-center gap-x-4 ml-auto">
            {user ? (
              <div ref={profileBtnRef} className="relative">
                <button
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 hover:bg-gray-200 transition focus:outline-none"
                  onClick={() => setProfileMenuOpen((v) => !v)}
                  aria-haspopup="true"
                  aria-expanded={profileMenuOpen}
                >
                  {user.picture ? (
                    <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full border object-cover" />
                  ) : (
                    <UserCircle className="w-8 h-8 text-gray-400" />
                  )}
                  <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">{user.name || user.email}</span>
                </button>
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-2 animate-fade-in">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Votre profil</Link>
                    <Link to="/company" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Votre entreprise</Link>
                    <Link to="/abonnement" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Abonnement</Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                      onClick={handleLogout}
                    >
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  className="text-sm font-semibold underline underline-offset-2 text-primary hover:text-warning bg-transparent border-0 px-2 py-1"
                  style={{ background: 'none', border: 'none' }}
                  onClick={() => startAuth0PKCE('login', AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CALLBACK_URL)}
                >
                  Se connecter
                </button>
                <button
                  className="text-sm font-semibold rounded-full px-4 py-2 bg-warning text-white hover:bg-orange-500 transition"
                  onClick={() => startAuth0PKCE('signup', AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CALLBACK_URL)}
                >
                  S’inscrire
                </button>
              </>
            )}
          </div>
        </nav>
        {/* Modal d'applications, unique et global (mobile + desktop) */}
        {appsOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/10 cursor-pointer"
              onClick={() => setAppsOpen(false)}
              aria-hidden="true"
            />
            <div
              className="fixed left-1/2 top-20 -translate-x-1/2 bg-white border border-gray-200 rounded-xl shadow-2xl p-4 w-[340px] max-h-[70vh] overflow-y-auto z-50 animate-fade-in"
              style={{ left: '50%', right: 'auto' }}
              onClick={e => e.stopPropagation()}
              tabIndex={0}
            >
              {/* Bouton de fermeture accessible */}
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-primary focus:outline-none"
                onClick={() => setAppsOpen(false)}
                aria-label="Fermer le menu des apps"
                tabIndex={1}
              >
                ✕
              </button>
              {/* APPS MODAL: Gestion */}
              <div className="mb-2">
                <div className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">Gestion</div>
                <div className="grid grid-cols-2 gap-2 min-h-[180px] items-start">
                  {/* Nouveautés */}
                  <Link to="/apps/accounting" onClick={() => setAppsOpen(false)} className="flex flex-col items-center p-2 hover:bg-blue-50 rounded-lg transition relative">
                    <span className="absolute top-1 right-1 bg-blue-500 text-white text-[9px] px-1 py-0.5 rounded-full font-bold">N</span>
                    <span className="bg-blue-100 text-blue-600 rounded-full p-2 mb-1"><BarChart2 className="w-6 h-6" /></span>
                    <span className="text-xs font-medium text-gray-700 text-center">Comptabilité</span>
                  </Link>
                  <Link to="/apps/business" onClick={() => setAppsOpen(false)} className="flex flex-col items-center p-2 hover:bg-green-50 rounded-lg transition relative">
                    <span className="absolute top-1 right-1 bg-green-500 text-white text-[9px] px-1 py-0.5 rounded-full font-bold">N</span>
                    <span className="bg-green-100 text-green-600 rounded-full p-2 mb-1"><Briefcase className="w-6 h-6" /></span>
                    <span className="text-xs font-medium text-gray-700 text-center">Gestion commerciale</span>
                  </Link>
                  <Link to="/leasing-store" onClick={() => setAppsOpen(false)} className="flex flex-col items-center p-2 hover:bg-pink-50 rounded-lg transition">
                    <span className="bg-pink-100 text-pink-600 rounded-full p-2 mb-1"><ShoppingBag className="w-6 h-6" /></span>
                    <span className="text-xs font-medium text-gray-700 text-center">Wanzo Store</span>
                  </Link>
                  {/* Apps à venir */}
                  <div className="flex flex-col items-center p-2 rounded-lg opacity-60 relative border border-dashed border-gray-200 bg-gray-50">
                    <span className="absolute top-1 right-1 bg-gray-400 text-white text-[9px] px-1 py-0.5 rounded-full font-bold">À venir</span>
                    <span className="bg-gray-200 text-gray-400 rounded-full p-2 mb-1"><BarChart2 className="w-6 h-6" /></span>
                    <span className="text-xs font-medium text-gray-500 text-center">Gestion de la production</span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-lg opacity-60 relative border border-dashed border-gray-200 bg-gray-50">
                    <span className="absolute top-1 right-1 bg-gray-400 text-white text-[9px] px-1 py-0.5 rounded-full font-bold">À venir</span>
                    <span className="bg-gray-200 text-gray-400 rounded-full p-2 mb-1"><BarChart2 className="w-6 h-6" /></span>
                    <span className="text-xs font-medium text-gray-500 text-center">Adha CREA</span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-lg opacity-60 relative border border-dashed border-gray-200 bg-gray-50">
                    <span className="absolute top-1 right-1 bg-gray-400 text-white text-[9px] px-1 py-0.5 rounded-full font-bold">À venir</span>
                    <span className="bg-gray-200 text-gray-400 rounded-full p-2 mb-1"><DollarSign className="w-6 h-6" /></span>
                    <span className="text-xs font-medium text-gray-500 text-center">Facturation</span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-lg opacity-60 relative border border-dashed border-gray-200 bg-gray-50">
                    <span className="absolute top-1 right-1 bg-gray-400 text-white text-[9px] px-1 py-0.5 rounded-full font-bold">À venir</span>
                    <span className="bg-gray-200 text-gray-400 rounded-full p-2 mb-1"><Layers className="w-6 h-6" /></span>
                    <span className="text-xs font-medium text-gray-500 text-center">Projet</span>
                  </div>
                </div>
              </div>
              {/* APPS MODAL: Financement */}
              <div>
                <div className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">Financement</div>
                <div className="grid grid-cols-2 gap-2 min-h-[180px] items-start">
                  <div className="flex flex-col items-center p-2 rounded-lg opacity-60 relative border border-dashed border-gray-200 bg-gray-50">
                    <span className="absolute top-1 right-1 bg-gray-400 text-white text-[9px] px-1 py-0.5 rounded-full font-bold">À venir</span>
                    <span className="bg-gray-200 text-gray-400 rounded-full p-2 mb-1"><Briefcase className="w-6 h-6" /></span>
                    <span className="text-xs font-medium text-gray-500 text-center">Gestion de Portefeuille</span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-lg opacity-60 relative border border-dashed border-gray-200 bg-gray-50">
                    <span className="absolute top-1 right-1 bg-gray-400 text-white text-[9px] px-1 py-0.5 rounded-full font-bold">À venir</span>
                    <span className="bg-gray-200 text-gray-400 rounded-full p-2 mb-1"><BarChart2 className="w-6 h-6" /></span>
                    <span className="text-xs font-medium text-gray-500 text-center">Analyse des risques</span>
                  </div>
                  {/* Apps existantes */}
                  
                </div>
              </div>
            </div>
          </>
        )}
      </Container>
      {/* MOBILE: menu de navigation principal */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navigation={navigation}
      />
    </header>
  );
}