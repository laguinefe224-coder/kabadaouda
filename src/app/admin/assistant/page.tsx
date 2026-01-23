'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { writingAssistant } from '@/ai/flows/writing-assistant';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Loader2 } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const assistantSchema = z.object({
  prompt: z.string().min(10, { message: "Veuillez décrire votre demande (10 caractères minimum)." }),
});

type AssistantFormValues = z.infer<typeof assistantSchema>;

export default function AssistantPage() {
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<AssistantFormValues>({
    resolver: zodResolver(assistantSchema),
  });

  const onSubmit: SubmitHandler<AssistantFormValues> = async (data) => {
    setIsLoading(true);
    setGeneratedContent('');
    try {
      const result = await writingAssistant({ prompt: data.prompt });
      setGeneratedContent(result.content);
    } catch (error) {
      console.error("Assistant Error:", error);
      toast({
        variant: "destructive",
        title: "Erreur de l'assistant",
        description: "Une erreur est survenue lors de la génération du contenu. Veuillez réessayer.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-10 grid gap-8 md:grid-cols-2">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Assistant de Rédaction IA</CardTitle>
          <CardDescription>
            Décrivez votre besoin (ex: "Rédige un discours sur la coopération Sud-Sud", "Écris un e-mail à l'ambassadeur pour..."). L'IA vous assistera.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="prompt" className="sr-only">Votre demande</Label>
                    <FormControl>
                      <Textarea
                        id="prompt"
                        placeholder="Ex: Rédige un article de blog sur l'avenir du numérique en Afrique..."
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Génération en cours...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Générer le contenu
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Contenu Généré</CardTitle>
          <CardDescription>
            Le résultat de votre demande apparaîtra ici. Vous pouvez le copier et le coller où vous le souhaitez.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
             <div className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse w-5/6"></div>
                <div className="h-4 bg-muted rounded animate-pulse w-full"></div>
                <div className="h-4 bg-muted rounded animate-pulse w-4/5"></div>
                <div className="h-4 bg-muted rounded animate-pulse w-full"></div>
             </div>
          )}
          {generatedContent && (
            <div className="prose prose-sm dark:prose-invert max-w-none bg-secondary/50 p-4 rounded-md">
                <pre className="whitespace-pre-wrap font-body text-sm text-foreground">
                    {generatedContent}
                </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
