import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypePrismPlus from 'rehype-prism-plus';
import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism-tomorrow.css';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';
import { AudioSpectrum } from './AudioSpectrum';

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

interface ChatMessageProps {
  message: Message;
  onLike?: () => void;
  onDislike?: () => void;
  onCopy?: () => void;
}

export function ChatMessage({ message, onLike, onDislike, onCopy }: ChatMessageProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  const handleCopy = async () => {
    if (onCopy) {
      await onCopy();
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleAudioPlay = () => {
    setIsAudioPlaying((prev) => !prev);
    if (!isAudioPlaying) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 1;
        setAudioProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setIsAudioPlaying(false);
          setAudioProgress(0);
        }
      }, 100);
    }
  };

  return (
    <div className={cn(
      "flex w-full max-w-[100%] overflow-hidden relative z-40",
      message.isBot ? "justify-start" : "justify-end"
    )}>
      <div className={cn(
        "flex max-w-[80%] gap-3",
        message.isBot ? "flex-row" : "flex-row-reverse"
      )}>
        <div className={cn(
          "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full",
          message.isBot ? "bg-primary/10" : "bg-gray-100"
        )}>
          {message.isBot ? '🤖' : '👤'}
        </div>

        <div className="space-y-2">
          <div className={cn(
            "inline-block rounded-lg px-4 py-2",
            message.isBot ? "bg-gray-100" : "bg-primary text-white"
          )}>
            <div className="prose max-w-none dark:prose-invert">
              <ReactMarkdown
                remarkPlugins={[remarkMath, remarkGfm]}
                rehypePlugins={[rehypeKatex, rehypePrismPlus]}
                className={cn(
                  "text-sm leading-relaxed",
                  !message.isBot && "text-white"
                )}
              >
                {message.content}
              </ReactMarkdown>
            </div>

            {message.attachments?.map((attachment) => (
              <div
                key={attachment.id}
                className="mt-2 flex items-center gap-2 text-sm text-gray-500"
              >
                <a
                  href={attachment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {attachment.name}
                </a>
              </div>
            ))}

            {message.audioUrl && (
              <div className="mt-2">
                <AudioSpectrum
                  isPlaying={isAudioPlaying}
                  progress={audioProgress}
                />
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleAudioPlay}
                  className="mt-2"
                >
                  {isAudioPlaying ? 'Pause' : 'Écouter'}
                </Button>
              </div>
            )}
          </div>

          {message.isBot && (
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={onLike}
                className={cn(message.liked && "text-primary")}
              >
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={onDislike}
                className={cn(message.disliked && "text-warning")}
              >
                <ThumbsDown className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleCopy}
              >
                {isCopied ? (
                  <Check className="h-4 w-4 text-success" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}