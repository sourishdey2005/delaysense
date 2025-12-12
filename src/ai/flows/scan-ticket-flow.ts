'use server';
/**
 * @fileOverview An AI flow to scan and extract details from a flight ticket image.
 * 
 * - scanTicket - A function that handles the ticket scanning process.
 * - ScanTicketInput - The input type for the scanTicket function.
 * - ScanTicketOutput - The return type for the scanTicket function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ScanTicketInputSchema = z.object({
  ticketImage: z.string().describe(
    "A photo of a flight ticket, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
  ),
});
export type ScanTicketInput = z.infer<typeof ScanTicketInputSchema>;

const ScanTicketOutputSchema = z.object({
  passengerName: z.string().describe('The full name of the passenger.'),
  flightNumber: z.string().describe('The flight number (e.g., AI 101).'),
  departureAirport: z.string().describe('The three-letter IATA code for the departure airport (e.g., DEL).'),
  arrivalAirport: z.string().describe('The three-letter IATA code for the arrival airport (e.g., JFK).'),
  seat: z.string().describe('The passenger\'s seat number (e.g., 24A).'),
  gate: z.string().describe('The departure gate (e.g., B7).'),
  boardingTime: z.string().describe('The boarding time in HH:MM format.'),
  departureDate: z.string().describe('The departure date in a common format (e.g., 24 Oct 2024).'),
});
export type ScanTicketOutput = z.infer<typeof ScanTicketOutputSchema>;

export async function scanTicket(input: ScanTicketInput): Promise<ScanTicketOutput> {
  return scanTicketFlow(input);
}

const prompt = ai.definePrompt({
  name: 'scanTicketPrompt',
  input: { schema: ScanTicketInputSchema },
  output: { schema: ScanTicketOutputSchema },
  prompt: `You are an expert travel assistant. Your task is to accurately scan the provided flight ticket image and extract the key details.

Return the information as a structured JSON object. If a piece of information is not present on the ticket, return an empty string for that field.

Ticket Image: {{media url=ticketImage}}`,
});

const scanTicketFlow = ai.defineFlow(
  {
    name: 'scanTicketFlow',
    inputSchema: ScanTicketInputSchema,
    outputSchema: ScanTicketOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
