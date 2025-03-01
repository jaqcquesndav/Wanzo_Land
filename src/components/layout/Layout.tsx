import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Chatbot } from '../chatbot/Chatbot';
import { LeasingStoreShortcut } from '../leasing-store/LeasingStoreShortcut';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <div className="fixed bottom-4 right-4 z-50 space-y-4">
        <LeasingStoreShortcut />
        <Chatbot />
      </div>
      <Footer />
    </div>
  );
}