import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Transition, Disclosure } from '@headlessui/react';
import { X, ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';
import { NavigationItem } from './types';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CALLBACK_URL, AUTH0_LOGOUT_URL } from '../../config/auth0';
import { startAuth0PKCE } from '../../utils/auth0pkce';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavigationItem[];
}

export function MobileNavigation({ isOpen, onClose, navigation }: MobileNavigationProps) {
  // Lecture du profil utilisateur depuis localStorage
  const user = React.useMemo(() => {
    const stored = localStorage.getItem('auth0_user');
    return stored ? JSON.parse(stored) : null;
  }, [localStorage.getItem('auth0_user')]);

  // Fonction de déconnexion (identique à Header)
  function handleLogout() {
    localStorage.removeItem('auth0_user');
    localStorage.removeItem('auth0_token');
    localStorage.removeItem('auth0_id_token');
    localStorage.removeItem('auth0_refresh_token');
    localStorage.removeItem('auth0_expires_in');
    localStorage.removeItem('auth0_token_type');
    sessionStorage.removeItem('auth0_code_verifier');
    sessionStorage.removeItem('auth0_state');
    const domain = AUTH0_DOMAIN;
    const clientId = AUTH0_CLIENT_ID;
    const returnTo = AUTH0_LOGOUT_URL;
    window.location.href = `https://${domain}/v2/logout?client_id=${clientId}&returnTo=${encodeURIComponent(returnTo)}`;
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-end">
            <Transition.Child
              as={Fragment}
              enter="transition ease-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in duration-200 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative w-full max-w-sm bg-white p-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <Link to="/" className="text-xl font-bold text-primary" onClick={onClose}>
                    Kiota Suit
                  </Link>
                  <button
                    type="button"
                    className="rounded-md p-2.5 text-gray-700 hover:text-gray-900"
                    onClick={onClose}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-6 flow-root">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      item.children ? (
                        <Disclosure key={item.name} as="div" className="space-y-1">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                                <span>{item.name}</span>
                                <ChevronDown 
                                  className={cn(
                                    "h-5 w-5 text-gray-500 transition-transform duration-200",
                                    open && "rotate-180"
                                  )} 
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="space-y-1 px-3">
                                {item.children?.map((child) => (
                                  <Link
                                    key={child.name}
                                    to={child.href}
                                    className="block rounded-lg py-2 pl-6 pr-3 text-sm text-gray-600 hover:bg-gray-50"
                                    onClick={onClose}
                                  >
                                    <div>
                                      <p className="font-medium text-gray-900">{child.name}</p>
                                      <p className="mt-1 text-xs text-gray-500">{child.description}</p>
                                    </div>
                                  </Link>
                                ))}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ) : (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                          onClick={onClose}
                        >
                          {item.name}
                        </Link>
                      )
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    {/* Gestion de l'authentification mobile */}
                    {!user ? (
                      <div className="flex flex-col gap-3">
                        <button
                          className="text-base font-semibold underline underline-offset-2 text-primary hover:text-warning bg-transparent border-0 px-2 py-2 text-left"
                          style={{ background: 'none', border: 'none' }}
                          onClick={() => startAuth0PKCE('login', AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CALLBACK_URL)}
                        >
                          Se connecter
                        </button>
                        <button
                          className="text-base font-semibold rounded-full px-4 py-3 bg-warning text-white hover:bg-orange-500 transition"
                          onClick={() => startAuth0PKCE('signup', AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CALLBACK_URL)}
                        >
                          S’inscrire
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        {user.picture ? (
                          <img src={user.picture} alt={user.name} className="w-14 h-14 rounded-full border object-cover" />
                        ) : (
                          <svg className="w-14 h-14 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-6 8-6s8 2 8 6" /></svg>
                        )}
                        <span className="text-base font-medium text-gray-700 max-w-[160px] truncate text-center">{user.name || user.email}</span>
                        <button
                          className="w-full rounded-full bg-gray-300 text-gray-700 text-base font-semibold py-2 hover:bg-gray-400 transition"
                          onClick={handleLogout}
                        >
                          Déconnexion
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}