import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    throw new Error('VITE_GEMINI_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export interface ChatMessage {
    role: 'user' | 'model';
    parts: string;
}

export const geminiService = {
    async sendMessage(messages: ChatMessage[], newMessage: string): Promise<string> {
        try {
            const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

            // Convert messages to Gemini format
            const history = messages.map(msg => ({
                role: msg.role,
                parts: [{ text: msg.parts }],
            }));

            const chat = model.startChat({
                history,
                generationConfig: {
                    maxOutputTokens: 2048,
                    temperature: 0.9,
                    topP: 1,
                    topK: 1,
                },
            });

            const result = await chat.sendMessage(newMessage);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('Error sending message to Gemini:', error);
            throw new Error('Failed to get response from AI. Please try again.');
        }
    },

    async sendMessageStream(
        messages: ChatMessage[],
        newMessage: string,
        onChunk: (text: string) => void
    ): Promise<void> {
        try {
            const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

            const history = messages.map(msg => ({
                role: msg.role,
                parts: [{ text: msg.parts }],
            }));

            const chat = model.startChat({
                history,
                generationConfig: {
                    maxOutputTokens: 2048,
                    temperature: 0.9,
                    topP: 1,
                    topK: 1,
                },
            });

            const result = await chat.sendMessageStream(newMessage);

            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                onChunk(chunkText);
            }
        } catch (error) {
            console.error('Error streaming message from Gemini:', error);
            throw new Error('Failed to get response from AI. Please try again.');
        }
    },
};
