import React, { useState, useEffect } from 'react';

interface TokenRingProps {
  used: number;
  total: number;
  size?: number;
  strokeWidth?: number;
}

const TokenRing: React.FC<TokenRingProps> = ({ 
  used, 
  total, 
  size = 100, 
  strokeWidth = 8 
}) => {
  // État pour l'animation
  const [animatedUsed, setAnimatedUsed] = useState(0);
  
  // Animation à l'entrée
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedUsed(used);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Mettre à jour l'animation quand les valeurs changent
  useEffect(() => {
    setAnimatedUsed(used);
  }, [used, total]);
  
  // Calculer le pourcentage utilisé
  const usedPercentage = Math.min(100, Math.max(0, (animatedUsed / total) * 100));
  const remainingPercentage = 100 - usedPercentage;
  
  // Paramètres du cercle
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const usedStrokeDasharray = (circumference * usedPercentage) / 100;
  const remainingStrokeDasharray = (circumference * remainingPercentage) / 100;
  
  // Couleurs
  const usedColor = '#EF4444'; // Rouge pour les tokens utilisés
  const remainingColor = '#2563EB'; // Bleu primary pour les tokens restants
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Cercle de fond */}
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
        {/* Cercle d'arrière-plan */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />
        
        {/* Anneau des tokens restants */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={remainingColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${remainingStrokeDasharray} ${usedStrokeDasharray}`}
          strokeDashoffset={0}
          style={{ transition: 'stroke-dasharray 0.8s ease-out' }}
        />
        
        {/* Anneau des tokens utilisés */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={usedColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${usedStrokeDasharray} ${remainingStrokeDasharray}`}
          strokeDashoffset={-usedStrokeDasharray}
          style={{ transition: 'stroke-dasharray 0.8s ease-out, stroke-dashoffset 0.8s ease-out' }}
        />
      </svg>
      
      {/* Texte au centre */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="text-lg font-semibold text-gray-900" style={{ transition: 'opacity 0.3s ease' }}>
          {Math.round(usedPercentage)}%
        </div>
        <div className="text-xs text-gray-500">utilisé</div>
      </div>
      
      {/* Tooltip sur hover */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 pointer-events-none transform translate-y-12">
          {(total - animatedUsed).toLocaleString()} tokens restants
        </div>
      </div>
    </div>
  );
};

export default TokenRing;
