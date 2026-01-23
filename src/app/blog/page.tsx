'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Button } from '@/components/ui/button';

type Article = {
  id: string;
  title: string;
  author: string;
  createdAt: string; 
  imageUrl: string;
  content: string;
  imageHint: string;
};

const staticArticles: Article[] = [
    {
    id: '1',
    title: "L'Innovation au service de la Diplomatie Moderne",
    author: "Daouda Kaba",
    createdAt: "2024-07-20T10:00:00Z",
    imageUrl: "/images/blog-innovation-diplomacy.png",
    content: "La technologie redéfinit les relations internationales. Des plateformes de négociation virtuelles à l'analyse de données pour anticiper les crises, les outils numériques offrent une efficacité et une portée sans précédent. La diplomatie moderne doit embrasser cette transformation pour rester pertinente et proactive face aux défis mondiaux.\nL'intelligence artificielle (IA) permet désormais d'analyser des milliers de sources d'information en temps réel pour détecter les signaux faibles de conflits potentiels. Le Big Data aide à modéliser les impacts des changements climatiques sur les migrations, offrant aux diplomates des outils prédictifs pour une action préventive. Cependant, cette numérisation rapide soulève également de nouveaux défis, notamment en matière de cybersécurité et de souveraineté numérique. La protection des infrastructures critiques et la lutte contre la désinformation deviennent des priorités absolues pour la sécurité nationale et la stabilité internationale. La blockchain commence aussi à être explorée pour sécuriser les traités et les votes internationaux, garantissant une transparence et une immuabilité jamais atteintes auparavant. Les diplomates de demain devront être des 'techno-diplomates', capables de naviguer dans cet écosystème complexe.",
    imageHint: "technology innovation"
  },
  {
    id: '2',
    title: "Le Futur Numérique de l'Afrique : Une Opportunité Globale",
    author: "Daouda Kaba",
    createdAt: "2024-07-18T14:30:00Z",
    imageUrl: "/images/blog-digital-africa.png",
    content: "L'Afrique est au cœur d'une révolution numérique. Avec une population jeune et connectée, le continent devient un hub d'innovation pour la finance mobile, l'e-gouvernement et les solutions technologiques durables. Investir dans l'infrastructure numérique africaine, c'est investir dans la croissance économique mondiale de demain.\nDes start-ups à Nairobi, Lagos ou Accra développent des solutions qui répondent à des besoins locaux avec une agilité remarquable. Le paiement mobile a déjà transformé l'inclusion financière pour des millions de personnes. Mais pour libérer tout ce potentiel, des investissements massifs sont nécessaires dans la connectivité (fibre optique, 5G), les data centers et la formation aux compétences numériques. La coopération internationale est clé pour financer ces infrastructures et créer un cadre réglementaire harmonisé qui favorise l'innovation tout en protégeant les données des citoyens. Le développement de l'e-santé, de l'ed-tech et de l'agri-tech montre que le numérique est un levier de développement pour tous les secteurs clés du continent.",
    imageHint: "digital africa"
  },
  {
    id: '3',
    title: "Énergies Vertes : Le Nouveau Paradigme de la Coopération Internationale",
    author: "Daouda Kaba",
    createdAt: "2024-07-15T09:00:00Z",
    imageUrl: "/images/blog-green-energy.png",
    content: "La transition énergétique n'est pas seulement un impératif écologique, c'est aussi un puissant vecteur de coopération. Les projets d'énergies renouvelables transfrontaliers, le partage de technologies propres et les financements verts créent des liens de dépendance positive et de solidarité entre les nations, bâtissant un avenir plus sûr et durable.\nL'Afrique, avec son potentiel solaire exceptionnel, peut devenir un leader mondial de l'énergie verte. Des projets comme le Grand Inga en RDC ou les parcs solaires géants au Sahara pourraient non seulement alimenter le continent, mais aussi exporter de l'hydrogène vert vers l'Europe. Ce nouveau paradigme énergétique redessine les alliances géopolitiques, basées non plus sur les hydrocarbures mais sur les technologies vertes, les minéraux critiques et les réseaux électriques partagés. La diplomatie a un rôle crucial à jouer pour faciliter ces partenariats complexes et garantir un partage équitable des bénéfices, en évitant les erreurs du passé liées à l'exploitation des ressources.",
    imageHint: "green energy"
  },
  {
    id: '4',
    title: "Construire des Ponts : Le Rôle Clé de la Coopération Sud-Sud",
    author: "Daouda Kaba",
    createdAt: "2024-07-12T11:00:00Z",
    imageUrl: "/images/blog-global-cooperation.png",
    content: "La coopération entre les pays du Sud est essentielle pour un développement équilibré. En partageant des expériences et des solutions adaptées à des contextes similaires, ces nations peuvent accélérer leur croissance, renforcer leur résilience et parler d'une seule voix sur la scène internationale, redéfinissant ainsi l'équilibre mondial.\nLes modèles de développement 'prêts à l'emploi' venus du Nord ont souvent montré leurs limites. La coopération Sud-Sud permet un échange de bonnes pratiques plus pertinent, que ce soit dans l'agriculture, la santé publique ou la transformation numérique. Des institutions comme la Banque Africaine de Développement ou la Nouvelle Banque de Développement (banque des BRICS) jouent un rôle croissant dans le financement de projets structurants. En renforçant leurs échanges commerciaux et leurs investissements mutuels, les pays du Sud créent un nouveau pôle de croissance économique qui contribue à un ordre mondial plus multipolaire et équilibré. Cette coopération favorise également une meilleure représentation des intérêts du Sud dans les instances de gouvernance mondiale.",
    imageHint: "global cooperation"
  },
  {
    id: '6',
    title: "L'Échange Culturel comme Pilier des Relations Internationales",
    author: "Daouda Kaba",
    createdAt: "2024-07-08T08:00:00Z",
    imageUrl: "/images/blog-cultural-exchange.png",
    content: "Au-delà des traités et des accords commerciaux, la véritable compréhension entre les peuples naît de l'échange culturel. L'art, la musique, l'éducation et le sport sont des langages universels qui transcendent les barrières politiques. Promouvoir ces échanges est un investissement essentiel pour la paix et la stabilité à long terme.\nLe 'soft power' culturel est un outil diplomatique puissant. Un film, une chanson ou une exposition peuvent faire plus pour l'image d'un pays qu'une campagne de communication coûteuse. En finançant des résidences d'artistes, des programmes d'échanges universitaires comme Erasmus, ou en organisant des événements sportifs internationaux, les États créent des liens humains durables. Cette diplomatie d'influence, basée sur l'attraction et le dialogue, est indispensable pour construire la confiance et dénouer les tensions dans un monde de plus en plus fragmenté. Chaque échange est une graine plantée pour un futur de compréhension mutuelle.",
    imageHint: "cultural exchange art"
  }
];

export default function BlogPage() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <div className="bg-background">
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center text-center bg-black text-white">
        <Image
          src="/images/international-cooperation.png"
          alt="Blog"
          fill
          className="w-full h-full object-cover object-center"
          data-ai-hint="innovation technology"
        />
        <div className="absolute inset-0 bg-black/50" />
      </section>

      <div className="max-w-7xl mx-auto py-16 px-6">
        <h1 className="font-headline text-3xl font-black mb-12 text-center">Blog & Actualités</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {staticArticles.map((article) => (
            <div key={article.id} className="group">
              <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 rounded-none">
                <div className="relative w-full aspect-square flex-shrink-0">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    width={500}
                    height={500}
                    className="object-cover w-full h-full"
                    data-ai-hint={article.imageHint}
                  />
                </div>
                <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                        <h2 className="font-headline text-lg font-bold mb-2 group-hover:text-primary line-clamp-2">{article.title}</h2>
                        <p className="text-sm text-muted-foreground mb-4">
                            Par {article.author} • {format(new Date(article.createdAt), 'dd MMMM yyyy', { locale: fr })}
                        </p>
                        <p className="text-muted-foreground text-sm line-clamp-3">
                            {article.content}
                        </p>
                    </div>
                    <div className="mt-4">
                        <Button variant="link" className="p-0 h-auto text-primary font-bold" onClick={() => setSelectedArticle(article)}>
                            Lire plus
                        </Button>
                    </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {selectedArticle && (
        <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col p-0">
            <div className="p-6 border-b flex-shrink-0">
                <DialogTitle className="text-xl font-headline font-bold">{selectedArticle.title}</DialogTitle>
                <DialogDescription>
                    Par {selectedArticle.author} • {format(new Date(selectedArticle.createdAt), 'dd MMMM yyyy', { locale: fr })}
                </DialogDescription>
            </div>
            <div className="flex-1 overflow-y-auto">
                <div className='p-6'>
                    <div className="relative w-full aspect-video mb-6">
                        <Image src={selectedArticle.imageUrl} alt={selectedArticle.title} fill className="object-cover rounded-none" />
                    </div>
                    <div className="text-muted-foreground space-y-4">
                        {selectedArticle.content.split('\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
