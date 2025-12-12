
'use server';

/**
 * @fileOverview This file defines a Genkit flow to explain the feature importance values
 * from a trained ML model in a user-friendly way.
 *
 * - explainFeatureImportance - A function that takes feature importance data and returns
 *   an explanation of which factors are most influential in predicting flight delays and why.
 * - ExplainFeatureImportanceInput - The input type for the explainFeatureImportance function.
 * - ExplainFeatureImportanceOutput - The return type for the explainFeatureImportance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainFeatureImportanceInputSchema = z.object({
  featureImportances: z.record(z.string(), z.number()).describe(
    'A map of feature names to their importance scores. Example: { distance: 0.4, weather: 0.2, ... }'
  ),
});
export type ExplainFeatureImportanceInput = z.infer<
  typeof ExplainFeatureImportanceInputSchema
>;

const ExplainFeatureImportanceOutputSchema = z.object({
  explanation: z
    .string()
    .describe(
      'A user-friendly explanation of which factors are most influential in predicting flight delays, and why.'
    ),
});
export type ExplainFeatureImportanceOutput = z.infer<
  typeof ExplainFeatureImportanceOutputSchema
>;

export async function explainFeatureImportance(
  input: ExplainFeatureImportanceInput
): Promise<ExplainFeatureImportanceOutput> {
  return explainFeatureImportanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainFeatureImportancePrompt',
  input: {schema: z.object({ featureImportancesString: z.string() })},
  output: {schema: ExplainFeatureImportanceOutputSchema},
  prompt: `You are an expert in explaining machine learning model results to non-technical users.

You are provided with a list of feature importances from a flight delay prediction model.

Explain in a concise and user-friendly way which factors are most influential in predicting flight delays, and provide a brief reason why these factors might be important.

Feature Importances: {{{featureImportancesString}}}`,
});

const explainFeatureImportanceFlow = ai.defineFlow(
  {
    name: 'explainFeatureImportanceFlow',
    inputSchema: ExplainFeatureImportanceInputSchema,
    outputSchema: ExplainFeatureImportanceOutputSchema,
  },
  async input => {
    const featureImportancesString = JSON.stringify(input.featureImportances);
    const {output} = await prompt({ featureImportancesString });
    return output!;
  }
);
