import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Transition, Disclosure } from '@headlessui/react';
import { X, ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';
import { NavigationItem } from './types';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavigationItem[];
}

export function MobileNavigation({ isOpen, onClose, navigation }: MobileNavigationProps) {
  const { requireRegister } = useAuthRedirect();

  const handleStartClick = () => {
    onClose();
    requireRegister('start');
  };

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
                  <Link to="/" className="text-xl font-bold text-indigo-600" onClick={onClose}>
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
                                {item.children.map((child) => (
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
                    <button
                      onClick={handleStartClick}
                      className="block w-full rounded-lg bg-indigo-600 px-3 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-500"
                    >
                      Commencer
                    </button>
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