
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {

  return (
    <div className="bg-background">
      {/* HERO */}
      <section className="relative h-[80vh] flex items-center justify-center text-center bg-black text-white pt-24">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute z-0 w-full h-full object-cover object-center inset-0"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la balise vidéo.
        </video>
        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-4xl md:text-5xl font-headline font-black" data-ai-id="hero-title">Daouda Kaba</h1>
          <p className="text-yellow-400 text-xl uppercase tracking-widest mt-4" data-ai-id="hero-subtitle">
            Consul général honoraire
          </p>
          <p className="mt-6 text-lg md:text-xl text-white/90">
            Un engagement d&apos;excellence pour le dialogue, la coopération internationale et le rayonnement des valeurs de solidarité.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-sky font-black uppercase tracking-widest px-8 py-4">
              <Link href="/a-propos">Notre Vision</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-black uppercase tracking-widest px-8 py-4">
              <Link href="#about">En savoir plus</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-7xl mx-auto py-24 px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="font-headline text-3xl font-black mb-6">
            Représentation Diplomatique
          </h2>
          <h3 className="text-lg font-bold mb-4 text-primary">
            Une Mission au Service de l&apos;Excellence
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            En tant que Consul Général Honoraire, je m&apos;engage à porter une diplomatie de proximité, moderne et résolument tournée vers l&apos;avenir. Ma mission est de faciliter les échanges, de soutenir nos citoyens et de bâtir des ponts de coopération durables.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <Card className="bg-red-50 dark:bg-red-900/20 shadow-md border-b-4 border-primary">
              <CardContent className="p-6">
                <p className="font-black uppercase text-primary">International</p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 dark:bg-green-900/20 shadow-md border-b-4 border-green-700">
               <CardContent className="p-6">
                <p className="font-black uppercase text-green-700">Protection</p>
              </CardContent>
            </Card>
          </div>

          <Button asChild className="mt-8 bg-sky px-8 py-4 font-black uppercase tracking-widest" size="lg">
            <Link href="/a-propos">Mon parcours</Link>
          </Button>
        </div>
        <Image
          src="/images/consular-representation.png"
          alt="Deux diplomates se serrant la main"
          width={600}
          height={400}
          className="shadow-2xl rounded-lg grayscale hover:grayscale-0 transition duration-300 object-cover object-center"
          data-ai-hint="political handshake"
        />
      </section>

      {/* DOMAINS */}
      <section className="bg-secondary py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center font-headline text-3xl font-black uppercase mb-16">
            Domaines d&apos;Intervention
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <Card className="bg-background/50 hover:bg-background transition group">
              <CardContent className="p-8">
                <h3 className="font-bold text-primary text-lg mb-4">Coopération</h3>
                <p className="text-muted-foreground group-hover:text-foreground">Développement de partenariats stratégiques et facilitation des échanges bilatéraux.</p>
              </CardContent>
            </Card>
            <Card className="bg-background/50 hover:bg-background transition group">
              <CardContent className="p-8">
                <h3 className="font-bold text-primary text-lg mb-4">Communauté</h3>
                <p className="text-muted-foreground group-hover:text-foreground">Soutien actif aux initiatives locales et accompagnement des citoyens.</p>
              </CardContent>
            </Card>
             <Card className="bg-background/50 hover:bg-background transition group">
              <CardContent className="p-8">
                <h3 className="font-bold text-primary text-lg mb-4">Institutionnel</h3>
                <p className="text-muted-foreground group-hover:text-foreground">Médiation et conseil de haut niveau pour les relations inter-institutionnelles.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CONTACT DIRECT */}
      <section className="max-w-7xl mx-auto py-24 px-6 grid md:grid-cols-2 gap-16 items-center">
        <Card className="p-12 shadow-2xl text-center">
          <CardContent className="p-0">
            <Image
              src="/images/daouda-kaba-portrait.png"
              alt="Portrait de Daouda Kaba"
              width={160}
              height={160}
              className="w-40 h-40 object-cover rounded-full mx-auto mb-6 grayscale"
               data-ai-hint="portrait man"
            />
            <h3 className="font-headline text-2xl font-black">Daouda Kaba</h3>
            <p className="text-primary uppercase tracking-widest text-sm font-semibold">
              Consul général honoraire
            </p>
            <div className="mt-8">
              <Button asChild className="py-3 font-black bg-green-700 hover:bg-green-800 text-white px-8">
                <a href="https://wa.me/224621792892" target="_blank">WhatsApp</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="font-headline text-3xl font-black mb-6">
            Contact Direct
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Mon cabinet est à votre entière disposition pour toute demande officielle, invitation ou médiation consulaire. Nous garantissons une réponse diligente et personnalisée à chaque sollicitation.
          </p>

          <Button asChild className="bg-sky px-10 py-4 font-black uppercase tracking-widest" size="lg">
            <Link href="/contact">Formulaire</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
