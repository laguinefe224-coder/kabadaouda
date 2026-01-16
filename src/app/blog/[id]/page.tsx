
'use client';
import { useDoc } from '@/firebase';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Timestamp } from 'firebase/firestore';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Skeleton } from '@/components/ui/skeleton';

type NewsArticle = {
  id: string;
  title: string;
  content: string;
  author: string;
  imageUrl?: string;
  published: boolean;
  createdAt: Timestamp;
};

export default function ArticlePage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { data: article, loading } = useDoc<NewsArticle>(id ? `news/${id}` : '');
  
  if (loading) {
    return (
        <div className="bg-background">
            <Skeleton className="h-[70vh] w-full" />
            <div className="max-w-3xl mx-auto py-16 px-6">
                <Skeleton className="h-6 w-full mb-4" />
                <Skeleton className="h-6 w-full mb-4" />
                <Skeleton className="h-6 w-5/6 mb-4" />
            </div>
        </div>
    )
  }

  if (!article) {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-2xl font-bold">Article non trouvé</h1>
                <p className="text-muted-foreground">Cet article n'existe pas ou a été supprimé.</p>
            </div>
        </div>
    );
  }

  return (
    <div className="bg-background">
        <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center text-center bg-black text-white pt-24">
            {article.imageUrl ? (
                <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover object-center"
                priority
                />
            ) : (
                <div className="absolute inset-0 bg-slate-900"/>
            )}
            <div className="relative z-10 max-w-4xl px-6">
                <h1 className="font-headline text-3xl md:text-4xl font-black text-white">{article.title}</h1>
                <p className="mt-4 text-lg text-white/90">
                    Par {article.author} • {format(article.createdAt.toDate(), 'dd MMMM yyyy', { locale: fr })}
                </p>
            </div>
        </section>
        
        <div className="max-w-3xl mx-auto py-16 px-6 space-y-6">
            {article.content.split('\n').filter(p => p.trim() !== '').map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed md:text-lg">
                    {paragraph}
                </p>
            ))}
        </div>

    </div>
  );
}
