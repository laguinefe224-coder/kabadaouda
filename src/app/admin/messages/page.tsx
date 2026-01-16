'use client';
import React, { useState } from 'react';
import { useCollection, useFirestore } from '@/firebase';
import { collection, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2 } from 'lucide-react';

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: { seconds: number; nanoseconds: number; };
  status: 'read' | 'unread';
};

export default function MessagesPage() {
  const firestore = useFirestore();
  const messagesCollection = firestore ? collection(firestore, 'messages') : null;
  const { data: messages, loading } = useCollection<Message>(messagesCollection);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const { toast } = useToast();

  const handleMarkAsRead = async (id: string) => {
    if (!firestore) return;
    try {
      await updateDoc(doc(firestore, 'messages', id), { status: 'read' });
    } catch (error) {
      console.error("Failed to mark as read", error);
    }
  };
  
  const handleDelete = async (id: string) => {
    if (!firestore) return;
    try {
      await deleteDoc(doc(firestore, 'messages', id));
      toast({ title: 'Message supprimé' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Erreur', description: 'Impossible de supprimer le message.' });
    }
  };

  const handleReply = (email: string) => {
    window.location.href = `mailto:${email}?subject=Réponse à votre message&body=${encodeURIComponent(replyContent)}`;
    toast({ title: 'Réponse envoyée', description: 'La réponse a été ouverte dans votre client de messagerie.' });
    setReplyingTo(null);
    setReplyContent('');
  };
  
  const sortedMessages = React.useMemo(() => {
    if (!messages) return [];
    return [...messages].sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
  }, [messages]);

  return (
    <div className="p-10">
      <Card>
        <CardHeader>
          <CardTitle>Messagerie</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Chargement des messages...</p>
          ) : (
            <Accordion type="multiple" className="w-full">
              {sortedMessages.map((message) => (
                <AccordionItem key={message.id} value={message.id}>
                  <AccordionTrigger onClick={() => handleMarkAsRead(message.id)}>
                    <div className="flex justify-between w-full pr-4 items-center">
                      <div className="flex items-center gap-4">
                        {message.status === 'unread' && <Badge>Nouveau</Badge>}
                        <span className={message.status === 'unread' ? 'font-bold' : ''}>{message.name}</span>
                        <span className="text-muted-foreground text-sm">{message.email}</span>
                      </div>
                      <span className="text-muted-foreground text-sm">
                        {format(new Date(message.createdAt.seconds * 1000), 'dd MMMM yyyy, HH:mm', { locale: fr })}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 bg-secondary/50 rounded-b-md">
                    <p className="mb-4 text-muted-foreground">{message.message}</p>
                    <div className="flex items-center justify-between">
                      {replyingTo === message.id ? (
                        <div className="mt-4 space-y-2 w-full">
                          <Textarea 
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Écrivez votre réponse ici..."
                          />
                          <div className="flex gap-2">
                            <Button onClick={() => handleReply(message.email)}>Envoyer la réponse</Button>
                            <Button variant="ghost" onClick={() => setReplyingTo(null)}>Annuler</Button>
                          </div>
                        </div>
                      ) : (
                        <Button onClick={() => setReplyingTo(message.id)}>Répondre</Button>
                      )}
                      
                      <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Cette action est irréversible et supprimera ce message.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(message.id)}>
                                Supprimer
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
