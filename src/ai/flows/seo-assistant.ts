// src/ai/flows/seo-assistant.ts
'use server';
/**
 * @fileOverview A flow for generating SEO-friendly page titles and descriptions based on the page content.
 *
 * - seoAssistant - A function that takes page content as input and returns SEO title and description suggestions.
 * - SEOAssistantInput - The input type for the seoAssistant function.
 * - SEOAssistantOutput - The return type for the seoAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SEOAssistantInputSchema = z.object({
  pageContent: z.string().describe('The content of the page for which SEO suggestions are needed.'),
});
export type SEOAssistantInput = z.infer<typeof SEOAssistantInputSchema>;

const SEOAssistantOutputSchema = z.object({
  title: z.string().describe('Suggested SEO-friendly title for the page.'),
  description: z.string().describe('Suggested SEO-friendly description for the page.'),
});
export type SEOAssistantOutput = z.infer<typeof SEOAssistantOutputSchema>;

export async function seoAssistant(input: SEOAssistantInput): Promise<SEOAssistantOutput> {
  return seoAssistantFlow(input);
}

const seoAssistantPrompt = ai.definePrompt({
  name: 'seoAssistantPrompt',
  input: {schema: SEOAssistantInputSchema},
  output: {schema: SEOAssistantOutputSchema},
  prompt: `You are an SEO expert. Generate an SEO-friendly title and description for the following page content.

Page Content: {{{pageContent}}}

Title:
Description:`,
});

const seoAssistantFlow = ai.defineFlow(
  {
    name: 'seoAssistantFlow',
    inputSchema: SEOAssistantInputSchema,
    outputSchema: SEOAssistantOutputSchema,
  },
  async input => {
    const {output} = await seoAssistantPrompt(input);
    return output!;
  }
);
