import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Chatbot } from '../chatbot/Chatbot';
import { LeasingStoreShortcut } from '../leasing-store/LeasingStoreShortcut';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isLeasingStorePage = location.pathname.startsWith('/leasing-store');
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      <Header />
      <main className="flex-grow relative">
        {children}
      </main>
      <div className="floating-container space-y-4 items-end">
        {!isLeasingStorePage && <LeasingStoreShortcut />}
        <Chatbot />
      </div>
      <Footer className="relative z-10 w-full footer-container" />
    </div>
  );
}