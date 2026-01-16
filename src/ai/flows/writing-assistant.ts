'use server';
/**
 * @fileOverview An AI assistant for content writing and administrative tasks.
 * 
 * - writingAssistant - A function that takes a user prompt and generates content.
 * - WritingAssistantInput - The input type for the writingAssistant function.
 * - WritingAssistantOutput - The return type for the writingAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WritingAssistantInputSchema = z.object({
  prompt: z.string().describe('The user\'s request for content generation or assistance.'),
});
export type WritingAssistantInput = z.infer<typeof WritingAssistantInputSchema>;

const WritingAssistantOutputSchema = z.object({
  content: z.string().describe('The generated content from the AI assistant.'),
});
export type WritingAssistantOutput = z.infer<typeof WritingAssistantOutputSchema>;

export async function writingAssistant(input: WritingAssistantInput): Promise<WritingAssistantOutput> {
  return writingAssistantFlow(input);
}

const writingAssistantPrompt = ai.definePrompt({
  name: 'writingAssistantPrompt',
  input: {schema: WritingAssistantInputSchema},
  output: {schema: WritingAssistantOutputSchema},
  prompt: `Vous êtes un assistant de rédaction IA expert, spécialisé dans les domaines de la diplomatie, des relations internationales, de la finance et de la communication institutionnelle. Votre ton est professionnel, éloquent et précis. Répondez à la demande suivante de l'utilisateur.

Demande de l'utilisateur :
{{{prompt}}}

Contenu généré :`,
});

const writingAssistantFlow = ai.defineFlow(
  {
    name: 'writingAssistantFlow',
    inputSchema: WritingAssistantInputSchema,
    outputSchema: WritingAssistantOutputSchema,
  },
  async input => {
    const {output} = await writingAssistantPrompt(input);
    return output!;
  }
);
