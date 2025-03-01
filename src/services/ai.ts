interface AIConfig {
  model: string;
  temperature: number;
  maxTokens: number;
  webSearch: boolean;
}

interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface AIResponse {
  id: string;
  content: string;
  sources?: Array<{
    title: string;
    url: string;
    snippet: string;
  }>;
}

export class AIService {
  private apiUrl: string;
  private config: AIConfig;

  constructor() {
    this.apiUrl = 'https://api.kiota.com/v1/ai';
    this.config = {
      model: 'adha-3',
      temperature: 0.7,
      maxTokens: 2000,
      webSearch: false
    };
  }

  async chat(messages: AIMessage[], config?: Partial<AIConfig>): Promise<AIResponse> {
    const response = await fetch(`${this.apiUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await this.getToken()}`
      },
      body: JSON.stringify({
        messages,
        config: { ...this.config, ...config }
      })
    });

    if (!response.ok) {
      throw new Error('Erreur de l\'API IA');
    }

    return response.json();
  }

  async transcribeAudio(audioBlob: Blob): Promise<string> {
    const formData = new FormData();
    formData.append('audio', audioBlob);

    const response = await fetch(`${this.apiUrl}/transcribe`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${await this.getToken()}`
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Erreur de transcription audio');
    }

    const { text } = await response.json();
    return text;
  }

  private async getToken(): Promise<string> {
    // TODO: Implement token management
    return 'dummy_token';
  }
}

export const aiService = new AIService();