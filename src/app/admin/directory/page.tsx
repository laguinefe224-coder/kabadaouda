'use client';
import React, { useState } from 'react';
import { useCollection, useFirestore } from '@/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Trash2, Edit } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FaWhatsapp } from 'react-icons/fa';

const contactSchema = z.object({
  name: z.string().min(2, 'Le nom est requis.'),
  email: z.string().email("L'e-mail n'est pas valide."),
  phone: z.string().optional(),
  position: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;
type DirectoryContact = ContactFormValues & { id: string };

export default function DirectoryPage() {
  const firestore = useFirestore();
  const contactsCollection = firestore ? collection(firestore, 'directoryContacts') : null;
  const { data: contacts, loading } = useCollection<DirectoryContact>(contactsCollection);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<DirectoryContact | null>(null);
  
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const handleOpenDialog = (contact: DirectoryContact | null = null) => {
    setEditingContact(contact);
    reset(contact || { name: '', email: '', phone: '', position: '' });
    setIsDialogOpen(true);
  };

  const handleFormSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    if (!contactsCollection) return;
    try {
      if (editingContact) {
        await updateDoc(doc(firestore, 'directoryContacts', editingContact.id), data);
        toast({ title: 'Contact modifié', description: 'Les informations du contact ont été mises à jour.' });
      } else {
        await addDoc(contactsCollection, data);
        toast({ title: 'Contact ajouté', description: 'Le nouveau contact a été ajouté à l\'annuaire.' });
      }
      setIsDialogOpen(false);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Erreur', description: 'Impossible d\'enregistrer le contact.' });
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (!firestore) return;
    try {
      await deleteDoc(doc(firestore, 'directoryContacts', id));
      toast({ title: 'Contact supprimé' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Erreur', description: 'Impossible de supprimer le contact.' });
    }
  };

  return (
    <div className="p-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Annuaire de contacts</CardTitle>
          <Button onClick={() => handleOpenDialog()}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un contact
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Chargement de l'annuaire...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Fonction</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts?.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">{contact.name}</TableCell>
                    <TableCell>
                      <div>{contact.email}</div>
                      <div className="text-muted-foreground">{contact.phone || ''}</div>
                    </TableCell>
                    <TableCell>{contact.position || '-'}</TableCell>
                    <TableCell className="text-right space-x-1">
                      {contact.phone && (
                        <Button asChild variant="ghost" size="icon">
                          <a href={`https://wa.me/${contact.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                            <FaWhatsapp className="h-4 w-4 text-green-600" />
                          </a>
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(contact)}>
                        <Edit className="h-4 w-4" />
                      </Button>
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
                              Cette action est irréversible et supprimera définitivement ce contact.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteContact(contact.id)}>
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingContact ? 'Modifier le contact' : 'Nouveau contact'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Nom</Label>
              <Input id="name" {...register('name')} />
              {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" {...register('phone')} />
            </div>
            <div>
              <Label htmlFor="position">Fonction</Label>
              <Input id="position" {...register('position')} />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                 <Button type="button" variant="ghost">Annuler</Button>
              </DialogClose>
              <Button type="submit">Enregistrer</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
