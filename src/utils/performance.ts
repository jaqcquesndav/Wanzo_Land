// Utilitaire pour la gestion des performances
export const withPerformance = <T extends (...args: any[]) => any>(
  fn: T,
  name: string
): T => {
  return ((...args: any[]) => {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${name} took ${end - start}ms`);
    }
    
    return result;
  }) as T;
};

// Utilitaire pour le lazy loading des composants
export const lazyWithPreload = (factory: () => Promise<any>) => {
  const Component = React.lazy(factory);
  let factoryPromise: Promise<any> | null = null;
  
  Component.preload = () => {
    if (!factoryPromise) {
      factoryPromise = factory();
    }
    return factoryPromise;
  };
  
  return Component;
};