'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Globe, Shield, Landmark, MessageSquare } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <div className="bg-background overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center text-center bg-black text-white">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover opacity-60 scale-105"
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-background z-10" />
        </div>

        <div className="relative z-20 max-w-5xl px-6 pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest uppercase bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full text-primary-foreground"
            >
              Excellence & Diplomatie
            </motion.span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-tight">
              Daouda <span className="text-gradient">Kaba</span>
            </h1>
            <p className="text-xl md:text-2xl text-yellow-400 font-medium uppercase tracking-[0.3em] mb-8">
              Consul général honoraire
            </p>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 leading-relaxed mb-12">
              Bâtir des ponts entre les nations, protéger nos citoyens et promouvoir une coopération internationale durable.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="h-14 px-10 text-lg font-bold rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                <Link href="/a-propos">Notre Vision</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-10 text-lg font-bold rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white hover:text-black transition-all">
                <Link href="#about">En savoir plus</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
            <motion.div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="relative py-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-100/[0.03] -z-10" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="order-2 lg:order-1"
          >
            <motion.h2 variants={fadeIn} className="text-sm font-bold uppercase tracking-widest text-primary mb-4">
              Engagement Diplomatique
            </motion.h2>
            <motion.h3 variants={fadeIn} className="text-4xl md:text-5xl font-black mb-8 leading-tight">
              Une Mission au Service de l&apos;Excellence
            </motion.h3>
            <motion.p variants={fadeIn} className="text-lg text-muted-foreground leading-relaxed mb-10">
              En tant que Consul Général Honoraire, je m&apos;engage à porter une diplomatie de proximité, moderne et résolument tournée vers l&apos;avenir. Ma mission est de faciliter les échanges, de soutenir nos citoyens et de bâtir des ponts de coopération durables.
            </motion.p>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <motion.div variants={fadeIn}>
                <Card className="glass-card hover:border-primary/50 transition-colors group">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <Globe className="w-6 h-6" />
                    </div>
                    <p className="font-bold uppercase tracking-tight">International</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeIn}>
                <Card className="glass-card hover:border-green-500/50 transition-colors group">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-colors">
                      <Shield className="w-6 h-6" />
                    </div>
                    <p className="font-bold uppercase tracking-tight text-green-600 dark:text-green-400">Protection</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div variants={fadeIn}>
              <Button asChild size="lg" className="rounded-full px-8 group">
                <Link href="/a-propos">
                  Découvrir mon parcours
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-2xl -z-10" />
            <Image
              src="/images/consular-representation.png"
              alt="Représentation Consulaire"
              width={800}
              height={600}
              className="rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 object-cover aspect-[4/3]"
            />
          </motion.div>
        </div>
      </section>

      {/* DOMAINS SECTION */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Domaines d&apos;Intervention</h3>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Coopération",
                desc: "Développement de partenariats stratégiques et facilitation des échanges bilatéraux.",
                icon: Globe,
                color: "bg-blue-500"
              },
              {
                title: "Communauté",
                desc: "Soutien actif aux initiatives locales et accompagnement des citoyens.",
                icon: MessageSquare,
                color: "bg-primary"
              },
              {
                title: "Institutionnel",
                desc: "Médiation et conseil de haut niveau pour les relations inter-institutionnelles.",
                icon: Landmark,
                color: "bg-amber-500"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group">
                  <div className={`h-2 ${item.color}`} />
                  <CardContent className="p-10">
                    <div className={`w-14 h-14 rounded-2xl ${item.color}/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                      <item.icon className={`w-7 h-7 ${item.color.replace('bg-', 'text-')}`} />
                    </div>
                    <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT DIRECT SECTION */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-20 overflow-hidden relative shadow-3xl">
            {/* Decorative background for the dark card */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent -z-0" />
            
            <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center lg:items-start lg:text-left"
              >
                <div className="relative mb-10">
                  <div className="absolute -inset-4 bg-primary rounded-full blur-xl opacity-20 animate-pulse" />
                  <Image
                    src="/images/daouda-kaba-portrait.png"
                    alt="Portrait de Daouda Kaba"
                    width={200}
                    height={200}
                    className="w-48 h-48 object-cover rounded-full border-4 border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="text-4xl font-black text-white mb-2">Daouda Kaba</h3>
                <p className="text-primary uppercase tracking-[0.3em] font-bold text-sm mb-8">
                  Consul général honoraire
                </p>
                <Button asChild className="bg-green-600 hover:bg-green-700 text-white font-black px-10 py-6 rounded-full text-lg shadow-xl shadow-green-900/20 group">
                  <a href="https://wa.me/224621792892" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    Me contacter sur WhatsApp
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-white"
              >
                <h2 className="text-4xl font-black mb-6 leading-tight">
                  Un service diplomatique <br/><span className="text-primary">à votre écoute</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-10">
                  Mon cabinet est à votre entière disposition pour toute demande officielle, invitation ou médiation consulaire. Nous garantissons une réponse diligente et personnalisée à chaque sollicitation.
                </p>
                <Button asChild variant="outline" size="lg" className="rounded-full border-white/20 hover:bg-white hover:text-black transition-all px-10 py-6 text-lg">
                  <Link href="/contact">Utiliser le formulaire</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
