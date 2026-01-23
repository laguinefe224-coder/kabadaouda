'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { useAuth } from '@/firebase';
import { signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Lock, Mail, Loader2, ArrowRight } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email("L'adresse e-mail n'est pas valide."),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères.'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (data: LoginFormValues) => {
    if (!auth) {
      toast({
        variant: 'destructive',
        title: "Erreur d'initialisation",
        description: "Le service d'authentification n'est pas disponible.",
      });
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur votre tableau de bord.",
      });
      router.push('/admin/news');
    } catch (error) {
      console.error(error);
      const authError = error as AuthError;
      let description = "Une erreur s'est produite. Veuillez réessayer.";
      if (authError.code === 'auth/invalid-credential' || authError.code === 'auth/user-not-found' || authError.code === 'auth/wrong-password') {
        description = 'Email ou mot de passe incorrect.';
      }
      toast({
        variant: 'destructive',
        title: 'Erreur de connexion',
        description,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-black p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="glass-card border-none shadow-2xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-primary via-blue-500 to-primary" />
          <CardHeader className="space-y-1 text-center pb-8 pt-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4"
            >
              <Lock className="w-8 h-8 text-primary" />
            </motion.div>
            <CardTitle className="text-3xl font-black tracking-tight text-gradient">Bienvenue</CardTitle>
            <CardDescription className="text-base">
              Espace d&apos;administration Daouda Kaba
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                            <Input 
                              type="email" 
                              placeholder="votre@email.com" 
                              className="pl-10 h-11 bg-background/50 focus-visible:ring-primary transition-all" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mot de passe</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                            <Input 
                              type="password" 
                              placeholder="••••••••" 
                              className="pl-10 h-11 bg-background/50 focus-visible:ring-primary transition-all" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg font-bold transition-all hover:scale-[1.02] active:scale-[0.98] group" 
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Se connecter
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Accès réservé au personnel autorisé.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <Button variant="link" onClick={() => router.push('/')} className="text-muted-foreground hover:text-primary transition-colors">
            ← Retour au site principal
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
