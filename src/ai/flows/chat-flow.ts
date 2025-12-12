'use server';
/**
 * @fileOverview A Genkit flow for a conversational chatbot assistant.
 *
 * - chat - A function that handles the chatbot conversation.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.array(z.object({ text: z.string() })),
  })).optional().describe('The conversation history.'),
  message: z.string().describe('The latest user message.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  message: z.string().describe('The chatbot\'s response.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const { history, message } = input;

    const fullHistory = [
      ...(history || []),
      { role: 'user', content: [{ text: message }] },
    ];

    const response = await ai.generate({
      prompt: `You are DelayBot, a friendly and helpful airline operations assistant integrated into the DelaySense application. Your goal is to assist users with questions about flight delays, airline operations, and how to use the app. Be concise and helpful.

      Current conversation:
      `,
      history: fullHistory,
      model: 'googleai/gemini-2.5-flash',
    });

    return {
      message: response.text,
    };
  }
);
