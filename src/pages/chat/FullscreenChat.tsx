import { useEffect, useState } from "react";
import { ChatHeader } from "../../components/chatbot/ChatHeader";
import { ChatInput } from "../../components/chatbot/ChatInput";
import { ChatMessage } from "../../components/chatbot/ChatMessage";

export function FullscreenChat() {
  const [availableHeight, setAvailableHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setAvailableHeight(window.innerHeight); // Ajuste la hauteur disponible
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="flex flex-col bg-white"
      style={{ height: availableHeight }} // Ajuste dynamiquement la hauteur
    >
      <div className="flex flex-col flex-1 overflow-hidden">
        <ChatHeader
          onClose={() => window.history.back()}
          onToggleFullscreen={() => {}}
          isFullscreen={true}
          isDemoMode={false}
        />
        <div className="flex-1 overflow-y-auto p-4">
          {/* Exemple de messages */}
          <ChatMessage
            message={{
              id: "1",
              content: "Bonjour, comment puis-je vous aider ?",
              isBot: true,
              timestamp: new Date(),
            }}
          />
        </div>
      </div>
      <ChatInput
        onSend={(message) => console.log("Message envoyé :", message)}
        className="mt-auto sticky bottom-0 bg-white"
      />
    </div>
  );
}
