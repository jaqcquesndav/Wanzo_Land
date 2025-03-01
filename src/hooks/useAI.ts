import { useState, useCallback } from 'react';
import { aiService } from '../services/ai';

interface UseAIOptions {
  onError?: (error: Error) => void;
}

export function useAI(options: UseAIOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const chat = useCallback(async (messages: any[], config?: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await aiService.chat(messages, config);
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Une erreur est survenue');
      setError(error);
      options.onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  const transcribeAudio = useCallback(async (audioBlob: Blob) => {
    setIsLoading(true);
    setError(null);
    try {
      const text = await aiService.transcribeAudio(audioBlob);
      return text;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erreur de transcription');
      setError(error);
      options.onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  return {
    isLoading,
    error,
    chat,
    transcribeAudio
  };
}