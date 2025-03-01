import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const theme = {
  colors: {
    primary: '#197ca8',
    primaryHover: '#1e90c3',
    success: '#015730',
    warning: '#ee872b',
  },
  
  // Fonction pour vérifier le contraste WCAG
  isAccessible: (backgroundColor: string, textColor: string): boolean => {
    // Conversion des couleurs en luminance relative
    const getLuminance = (color: string): number => {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16) / 255;
      const g = parseInt(hex.substr(2, 2), 16) / 255;
      const b = parseInt(hex.substr(4, 2), 16) / 255;
      
      const rs = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
      const gs = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
      const bs = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
      
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const l1 = getLuminance(backgroundColor);
    const l2 = getLuminance(textColor);
    
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    
    return ratio >= 4.5; // WCAG AA standard pour le texte normal
  },
};

// Utilitaire pour combiner les classes Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Types pour le thème
export type Theme = typeof theme;
export type ThemeColors = keyof typeof theme.colors;