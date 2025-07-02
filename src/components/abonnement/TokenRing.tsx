import React, { useState, useEffect } from 'react';

interface TokenRingProps {
  tokenBalance: number;
  tokenTotal: number;
  size?: number;
  strokeWidth?: number;
  showLabels?: boolean;
  className?: string;
}

const TokenRing: React.FC<TokenRingProps> = ({ 
  tokenBalance, 
  tokenTotal, 
  size = 80, 
  strokeWidth = 4,
  showLabels = false,
  className = ""
}) => {
  // État pour l'animation (utilisation future)
  const [, setAnimatedBalance] = useState(0);
  
  // Animation à l'entrée
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedBalance(tokenBalance);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [tokenBalance]);
  
  // Cette fonction peut être utilisée pour animer le graphique dans le futur
  
  const total = tokenTotal === 0 ? 1 : tokenTotal;
  const balance = Math.max(0, Math.min(tokenBalance, total));
  const used = total - balance;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  const balancePercentage = balance / total;
  const usedPercentage = used / total;

  const balanceStrokeDasharray = circumference * balancePercentage;
  const usedStrokeDasharray = circumference * usedPercentage;
  
  // Formater les nombres pour l'affichage
  const formatNumber = (num: number) => {
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1) + 'M';
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  // Si le graphique est très petit (utilisé comme icône), n'affichons pas le texte interne
  const showInnerText = size > 30;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className={`relative flex items-center justify-center ${size <= 30 ? 'filter drop-shadow-sm' : ''}`} style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90 transform">
          {/* Anneau de fond */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className="stroke-gray-200"
            fill="transparent"
          />
          {/* Anneau des tokens utilisés (rouge) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className="stroke-red-500 transition-all duration-700 ease-out"
            fill="transparent"
            strokeDasharray={`${usedStrokeDasharray} ${circumference}`}
            strokeLinecap="round"
          />
          {/* Anneau des tokens restants (bleu) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className="stroke-primary transition-all duration-700 ease-out"
            fill="transparent"
            strokeDasharray={`${balanceStrokeDasharray} ${circumference}`}
            strokeDashoffset={-usedStrokeDasharray}
            strokeLinecap="round"
          />
        </svg>
        {showInnerText && (
          <div className="absolute flex flex-col items-center justify-center">
            <span className={`${size >= 60 ? 'text-lg' : 'text-base'} font-bold text-primary`}>
              {formatNumber(balance)}
            </span>
            <span className={`${size >= 60 ? 'text-sm' : 'text-xs'} font-medium text-gray-500 -mt-0.5`}>tokens</span>
          </div>
        )}
      </div>
      
      {showLabels && (
        <div className="flex justify-between w-full mt-2 text-xs">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-primary inline-block mr-1.5"></span>
            <span className="text-gray-700">{Math.round(balancePercentage * 100)}% disponible</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block mr-1.5"></span>
            <span className="text-gray-700">{Math.round(usedPercentage * 100)}% utilisé</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenRing;
