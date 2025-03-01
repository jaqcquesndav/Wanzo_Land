import { useState } from 'react';
import { newsletterService } from '../services/newsletter';

export function useNewsletter() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const subscribe = async (email: string) => {
    setStatus('loading');
    setError(null);

    try {
      await newsletterService.subscribe(email);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  const unsubscribe = async (email: string) => {
    setStatus('loading');
    setError(null);

    try {
      await newsletterService.unsubscribe(email);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  return {
    status,
    error,
    subscribe,
    unsubscribe,
  };
}