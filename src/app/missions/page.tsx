
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function MissionsPage() {
  const missions = [
    {
      title: "Facilitation des Échanges Économiques",
      description: "Promouvoir les opportunités d'investissement et de commerce, et accompagner les entreprises dans leur développement international."
    },
    {
      title: "Soutien à la Communauté",
      description: "Assister nos ressortissants dans leurs démarches administratives, leur protection et leur bien-être à l'étranger."
    },
    {
      title: "Coopération Culturelle et Éducative",
      description: "Bâtir des ponts entre les institutions culturelles et académiques pour encourager le partage des savoirs et des arts."
    },
    {
      title: "Représentation Institutionnelle",
      description: "Servir de relais officiel et défendre les intérêts de la nation auprès des autorités locales et des organisations."
    },
    {
      title: "Dialogue et Médiation",
      description: "Œuvrer à la résolution pacifique des différends et au renforcement des relations bilatérales par un dialogue constant."
    },
    {
      title: "Promotion du Tourisme",
      description: "Mettre en valeur le patrimoine et les atouts touristiques pour attirer les visiteurs et stimuler l'économie locale."
    }
  ];

  return (
    <div className="bg-background">
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center text-center bg-black text-white pt-24">
        <Image
            src="/images/missions-hero.png"
            alt="Nos missions"
            fill
            className="object-cover object-center"
        />
        <div className="relative z-10 max-w-4xl px-6">
            <h1 className="font-headline text-4xl md:text-5xl font-black text-white">Nos Missions</h1>
            <p className="text-center text-xl text-white/90 mt-4">Au cœur de notre action diplomatique et consulaire.</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto py-16 px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {missions.map((mission, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-8 w-8 text-primary"/>
                    <CardTitle className="font-headline text-lg">{mission.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{mission.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
