import { useRef, useEffect } from 'react';

/**
 * Exécute `effect` une seule fois, même si le composant se démonte puis se remonte rapidement.
 */
export function useOnceEffect(effect: () => void) {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      effect();
    }
  }, [effect]);
}
