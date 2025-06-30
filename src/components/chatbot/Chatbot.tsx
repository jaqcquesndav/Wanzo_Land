import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Maximize2, Minimize2, Mic, Globe } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAI } from '../../hooks/useAI';
import { ChatHeader } from './ChatHeader';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Button } from '../ui/Button';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  liked?: boolean;
  disliked?: boolean;
  attachments?: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
  }>;
  audioUrl?: string;
}

// Exemples de démonstration
const demoResponses = {
  code: "```python\n# Calcul du mouvement brownien\ndef calculate_brownian_motion(n, dt):\n    positions = [0]\n    for i in range(1, n):\n        random_step = random.random() - 0.5\n        positions.append(positions[-1] + math.sqrt(dt) * random_step)\n    return positions\n```",
  latex: "La formule du mouvement brownien :\n```latex\n\\begin{equation}\ndX_t = \\mu dt + \\sigma dW_t\n\\end{equation}\n```",
  math: "Le mouvement brownien est décrit par l'équation différentielle stochastique :\n```math\ndX_t = \\mu dt + \\sigma dW_t\n```\noù :\n- $\\mu$ est le coefficient de dérive\n- $\\sigma$ est la volatilité\n- $W_t$ est un processus de Wiener"
};

const initialMessages: Message[] = [
  {
    id: '1',
    content: "👋 Bonjour ! Je suis Adha, votre assistant IA. Je peux vous aider avec :\n\n- La gestion de votre entreprise\n- L'analyse financière\n- Les calculs et simulations\n\nEssayez ces commandes de démo :\n- `code` pour voir un exemple de code\n- `latex` pour voir une équation\n- `math` pour voir des formules mathématiques",
    isBot: true,
    timestamp: new Date(),
  }
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isWebSearchEnabled, setIsWebSearchEnabled] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { chat, transcribeAudio } = useAI();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (content: string, attachments?: File[]) => {
    if (!isDemoMode) {
      // login();
      return;
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content,
      isBot: false,
      timestamp: new Date(),
      attachments: attachments?.map(file => ({
        id: crypto.randomUUID(),
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file)
      }))
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      let response: Message;

      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Gérer les commandes de démo
        if (content.toLowerCase() === 'code') {
          response = {
            id: crypto.randomUUID(),
            content: demoResponses.code,
            isBot: true,
            timestamp: new Date()
          };
        } else if (content.toLowerCase() === 'latex') {
          response = {
            id: crypto.randomUUID(),
            content: demoResponses.latex,
            isBot: true,
            timestamp: new Date()
          };
        } else if (content.toLowerCase() === 'math') {
          response = {
            id: crypto.randomUUID(),
            content: demoResponses.math,
            isBot: true,
            timestamp: new Date()
          };
        } else {
          response = {
            id: crypto.randomUUID(),
            content: "Je suis en mode démo. Essayez les commandes `code`, `latex` ou `math` pour voir des exemples.",
            isBot: true,
            timestamp: new Date()
          };
        }
      } else {
        const aiResponse = await chat([
          { role: 'user', content }
        ], {
          webSearch: isWebSearchEnabled
        });

        response = {
          id: crypto.randomUUID(),
          content: aiResponse.content,
          isBot: true,
          timestamp: new Date()
        };
      }

      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        content: "Désolé, une erreur est survenue. Veuillez réessayer.",
        isBot: true,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, liked: !msg.liked, disliked: false }
        : msg
    ));
  };

  const handleDislike = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, disliked: !msg.disliked, liked: false }
        : msg
    ));
  };

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      // TODO: Show success toast
    } catch (error) {
      console.error('Erreur lors de la copie:', error);
    }
  };

  const handleVoiceInput = () => {
    if (isDemoMode) {
      handleSendMessage("Cette fonctionnalité n'est pas disponible en mode démo.");
      return;
    }
    setIsRecording(!isRecording);
  };

  const handleWebSearch = () => {
    if (isDemoMode) {
      handleSendMessage("Cette fonctionnalité n'est pas disponible en mode démo.");
      return;
    }
    setIsWebSearchEnabled(!isWebSearchEnabled);
  };

  const containerClass = cn(
    "fixed z-50 transition-all duration-300",
    isFullscreen 
      ? "inset-0 bg-white" 
      : "bottom-4 right-4 w-96 rounded-lg shadow-xl bg-white"
  );

  return (
    <>
      {isOpen ? (
        <div className={containerClass}>
          <ChatHeader 
            onClose={() => setIsOpen(false)}
            onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
            isFullscreen={isFullscreen}
            isDemoMode={isDemoMode}
          />
          
          <div className={cn(
            "flex flex-col",
            isFullscreen ? "h-[calc(100vh-64px)]" : "h-[500px]"
          )}>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <ChatMessage 
                  key={message.id}
                  message={message}
                  onLike={() => handleLike(message.id)}
                  onDislike={() => handleDislike(message.id)}
                  onCopy={() => handleCopy(message.content)}
                />
              ))}
              {isLoading && (
                <div className="flex justify-center">
                  <div className="animate-pulse text-gray-400">...</div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleVoiceInput}
                  className={cn(isRecording && "text-warning")}
                  disabled={isDemoMode}
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleWebSearch}
                  className={cn(isWebSearchEnabled && "text-primary")}
                  disabled={isDemoMode}
                >
                  <Globe className="h-4 w-4" />
                </Button>
                {isDemoMode && (
                  <span className="text-xs text-gray-500">
                    Mode démo - Fonctionnalités limitées
                  </span>
                )}
              </div>
              <ChatInput 
                onSend={handleSendMessage}
                isLoading={isLoading}
                isRecording={isRecording}
                isWebSearchEnabled={isWebSearchEnabled}
                isDemoMode={isDemoMode}
              />
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className={cn(
            "fixed bottom-4 right-4 z-50",
            "bg-primary text-white rounded-full p-3 shadow-lg",
            "hover:bg-primary-hover transition-colors",
            "flex items-center gap-2"
          )}
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Ouvrir le chat</span>
        </button>
      )}
    </>
  );
}