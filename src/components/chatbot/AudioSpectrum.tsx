import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface AudioSpectrumProps {
  isPlaying: boolean;
  progress: number;
}

export function AudioSpectrum({ isPlaying, progress }: AudioSpectrumProps) {
  const numPoints = 12;
  const points = Array.from({ length: numPoints });

  return (
    <div className="h-8 flex items-center justify-center gap-2">
      {points.map((_, index) => {
        const isActive = (index / numPoints) * 100 <= progress;
        
        return (
          <motion.div
            key={index}
            className={cn(
              "w-2 h-2 rounded-full",
              isActive ? "bg-primary" : "bg-gray-300"
            )}
            animate={isPlaying ? {
              scale: [1, 1.5, 1],
              opacity: [1, 0.8, 1],
            } : {
              scale: 1,
              opacity: 1
            }}
            transition={{
              duration: 0.8,
              repeat: isPlaying ? Infinity : 0,
              delay: index * 0.1
            }}
          />
        );
      })}
    </div>
  );
}