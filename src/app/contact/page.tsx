
import { ContactForm } from "./contact-form";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="bg-background">
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center text-center bg-black text-white pt-24">
        <Image
          src="/images/contact-hero.png"
          alt="Contact"
          fill
          className="object-cover object-center"
        />
        <div className="relative z-10 max-w-4xl px-6">
            <h1 className="font-headline text-4xl md:text-5xl font-black text-white">Contactez-nous</h1>
            <p className="mt-4 text-lg text-white/90">Pour toute demande officielle, invitation ou médiation consulaire.</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto py-16 px-6">
        <div className="mt-12">
            <ContactForm />
        </div>
      </div>
    </div>
  );
}
