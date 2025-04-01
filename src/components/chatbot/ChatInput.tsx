import { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';

interface ChatInputProps {
  onSend: (message: string, attachments?: File[]) => void;
  isLoading?: boolean;
  isRecording?: boolean;
  isWebSearchEnabled?: boolean;
  isDemoMode?: boolean;
  className?: string; // Add the className prop
}

export function ChatInput({ 
  onSend, 
  isLoading, 
  isRecording, 
  isWebSearchEnabled,
  isDemoMode,
  className // Destructure the className prop
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsKeyboardOpen(window.innerHeight < 500); // Détecte si le clavier est ouvert
    };

    handleResize(); // Vérification initiale
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSend(message.trim(), attachments); // Appelle la fonction onSend avec le message et les pièces jointes
      setMessage(''); // Réinitialise l'input après l'envoi
      setAttachments([]);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachments((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleMicroClick = () => {
    console.log("Microphone button clicked"); // Ajoutez ici la logique pour gérer l'enregistrement audio
  };

  return (
    <div className={cn("space-y-2 bg-white border-t border-gray-200 p-2 relative", isKeyboardOpen ? 'pb-16' : '', className)}>
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {attachments.map((file, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1 text-sm"
            >
              <Paperclip className="h-4 w-4" />
              <span>{file.name}</span>
              <button
                onClick={() => setAttachments(prev => prev.filter((_, i) => i !== index))}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-end gap-2">
        <div className="flex-1">
          <textarea
            value={message} // Affiche le message dans l'input
            onChange={(e) => setMessage(e.target.value)} // Met à jour le message
            onKeyPress={handleKeyPress}
            placeholder={
              isRecording ? "Enregistrement en cours..." : 
              isWebSearchEnabled ? "Rechercher sur internet..." :
              isDemoMode ? "Mode démo - Posez une question..." :
              "Écrivez votre message..."
            }
            className={cn(
              "w-full p-2.5 text-sm rounded-lg resize-none",
              "bg-gray-50 border border-gray-300",
              "focus:ring-primary focus:border-primary",
              "min-h-[44px] max-h-[120px] overflow-hidden"
            )}
            rows={1}
            disabled={isLoading || isRecording}
          />
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          className="hidden"
          disabled={isDemoMode}
        />

        <Button
          variant="secondary"
          size="sm"
          onClick={() => fileInputRef.current?.click()} // Ouvre le sélecteur de fichiers
          disabled={isLoading || isRecording || isDemoMode}
        >
          <Paperclip className="h-4 w-4" />
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleMicroClick} // Gère le clic sur le bouton micro
          disabled={isLoading || isRecording}
        >
          🎤
        </Button>

        <Button
          onClick={handleSend} // Gère l'envoi du message
          disabled={!message.trim() || isLoading || isRecording}
          size="sm"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}