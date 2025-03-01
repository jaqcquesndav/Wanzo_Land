import { useEffect, useRef } from 'react';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  onClose: () => void;
}

// Grouper les emojis par catégorie pour une meilleure organisation
const emojiCategories = [
  {
    name: 'Expressions',
    emojis: ['😊', '😄', '😂', '🤔', '😍', '🤗', '😎', '🥳']
  },
  {
    name: 'Gestes',
    emojis: ['👋', '👍', '🙌', '👏', '💪', '🤝', '✌️', '👌']
  },
  {
    name: 'Business',
    emojis: ['💼', '📊', '💡', '🎯', '📈', '💰', '🚀', '⭐']
  },
  {
    name: 'Tech',
    emojis: ['💻', '📱', '⚡', '🔍', '🔧', '🛠️', '📝', '✨']
  }
];

export function EmojiPicker({ onEmojiSelect, onClose }: EmojiPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div 
      ref={containerRef}
      className="absolute bottom-full mb-2 bg-white rounded-lg shadow-lg border border-gray-200 p-3 w-[280px] sm:w-[320px]"
    >
      <div className="space-y-3">
        {emojiCategories.map((category) => (
          <div key={category.name}>
            <h3 className="text-xs font-medium text-gray-500 mb-1">{category.name}</h3>
            <div className="grid grid-cols-8 gap-1">
              {category.emojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => onEmojiSelect(emoji)}
                  className="w-8 h-8 flex items-center justify-center text-xl hover:bg-gray-100 rounded transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}