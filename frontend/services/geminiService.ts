import { GoogleGenAI, Chat } from '@google/genai';

let chatInstance: Chat | null = null;

/**
 * Initializes the chat session with the Gemini model.
 */
export const initChat = () => {
  // The API key must be provided via the environment variable.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY, vertexai: true });
  
  chatInstance = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: 'You are a helpful, concise, and friendly AI assistant.',
    },
  });
};

/**
 * Sends a message to the active chat session and returns the response.
 */
export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatInstance) {
    initChat();
  }

  if (!chatInstance) {
    throw new Error("Failed to initialize chat session.");
  }

  try {
    const response = await chatInstance.sendMessage({ message });
    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    throw new Error("Failed to get a response from the AI.");
  }
};
