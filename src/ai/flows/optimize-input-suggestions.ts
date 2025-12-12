'use server';

/**
 * @fileOverview A Genkit flow that provides smart suggestions and auto-complete options for flight details.
 *
 * - optimizeInputSuggestions - A function that handles the generation of input suggestions.
 * - OptimizeInputSuggestionsInput - The input type for the optimizeInputSuggestions function.
 * - OptimizeInputSuggestionsOutput - The return type for the optimizeInputSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeInputSuggestionsInputSchema = z.object({
  airline: z.string().optional().describe('The name of the airline.'),
  flightDuration: z.number().optional().describe('The duration of the flight in minutes.'),
  departureTime: z.string().optional().describe('The departure time in HH:MM format.'),
  departureDifference: z.number().optional().describe('The difference between scheduled and actual departure in minutes.'),
  weatherConditions: z.string().optional().describe('The weather conditions at the time of departure.'),
  airportCongestion: z.string().optional().describe('The congestion level at the airport (Low, Medium, High).'),
  distance: z.number().optional().describe('The distance of the flight in kilometers.'),
  originAirport: z.string().optional().describe('The origin airport.'),
  destinationAirport: z.string().optional().describe('The destination airport.'),
});
export type OptimizeInputSuggestionsInput = z.infer<typeof OptimizeInputSuggestionsInputSchema>;

const OptimizeInputSuggestionsOutputSchema = z.object({
  airlineSuggestions: z.array(z.string()).optional().describe('Suggestions for the airline.'),
  flightDurationSuggestions: z.array(z.number()).optional().describe('Suggestions for flight durations in minutes.'),
  departureTimeSuggestions: z.array(z.string()).optional().describe('Suggestions for departure times in HH:MM format.'),
  departureDifferenceSuggestions: z.array(z.number()).optional().describe('Suggestions for departure differences in minutes.'),
  weatherConditionsSuggestions: z.array(z.string()).optional().describe('Suggestions for weather conditions.'),
  airportCongestionSuggestions: z.array(z.string()).optional().describe('Suggestions for airport congestion levels.'),
  distanceSuggestions: z.array(z.number()).optional().describe('Suggestions for flight distances in kilometers.'),
  originAirportSuggestions: z.array(z.string()).optional().describe('Suggestions for origin airports.'),
  destinationAirportSuggestions: z.array(z.string()).optional().describe('Suggestions for destination airports.'),
});
export type OptimizeInputSuggestionsOutput = z.infer<typeof OptimizeInputSuggestionsOutputSchema>;

export async function optimizeInputSuggestions(input: OptimizeInputSuggestionsInput): Promise<OptimizeInputSuggestionsOutput> {
  return optimizeInputSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeInputSuggestionsPrompt',
  input: {schema: OptimizeInputSuggestionsInputSchema},
  output: {schema: OptimizeInputSuggestionsOutputSchema},
  prompt: `You are an AI assistant designed to provide smart suggestions and auto-complete options for flight details based on historical data and common patterns.

  Given the following (potentially incomplete) flight details, generate suggestions for each field to help the user quickly and accurately input the necessary information. Provide at most 5 suggestions per field.

  Flight Details:
  Airline: {{{airline}}}
  Flight Duration: {{{flightDuration}}}
  Departure Time: {{{departureTime}}}
  Departure Difference: {{{departureDifference}}}
  Weather Conditions: {{{weatherConditions}}}
  Airport Congestion: {{{airportCongestion}}}
  Distance: {{{distance}}}
  Origin Airport: {{{originAirport}}}
  Destination Airport: {{{destinationAirport}}}

  Suggestions (as a JSON object):
  `,
});

const optimizeInputSuggestionsFlow = ai.defineFlow(
  {
    name: 'optimizeInputSuggestionsFlow',
    inputSchema: OptimizeInputSuggestionsInputSchema,
    outputSchema: OptimizeInputSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
