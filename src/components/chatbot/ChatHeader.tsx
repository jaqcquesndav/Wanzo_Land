import { X, Maximize2, Minimize2 } from 'lucide-react';

interface ChatHeaderProps {
  onClose: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  isDemoMode: boolean;
}

export function ChatHeader({ onClose, onToggleFullscreen, isFullscreen, isDemoMode }: ChatHeaderProps) {
  return (
    <div className="flex justify-between items-center p-4 border-b bg-white">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🤖</span>
        <div>
          <h3 className="text-sm font-semibold">Adha Public</h3>
          <p className="text-xs text-gray-500">Assistant IA {isDemoMode && '(Mode Démo)'}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleFullscreen}
          className="text-gray-500 hover:text-gray-700 p-1"
        >
          {isFullscreen ? (
            <Minimize2 className="h-5 w-5" />
          ) : (
            <Maximize2 className="h-5 w-5" />
          )}
        </button>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 p-1"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}