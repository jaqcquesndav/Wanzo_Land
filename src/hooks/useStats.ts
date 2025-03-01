import { useState, useEffect } from 'react';

interface Stats {
  connectedUsers: number;
  transactionVolume: number;
  dataVolume: number;
}

export function useStats() {
  const [stats, setStats] = useState<Stats>({
    connectedUsers: 0,
    transactionVolume: 0,
    dataVolume: 0
  });

  useEffect(() => {
    // Simuler une mise à jour en temps réel
    const interval = setInterval(() => {
      setStats(current => ({
        connectedUsers: current.connectedUsers + Math.floor(Math.random() * 5),
        transactionVolume: current.transactionVolume + Math.floor(Math.random() * 1000000),
        dataVolume: current.dataVolume + Math.floor(Math.random() * 10)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return stats;
}