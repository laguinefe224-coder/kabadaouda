
import Image from "next/image";

export default function Portfolio() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">

      {/* HERO */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center text-center bg-black text-white pt-24">
        <Image
            src="/images/hero-office.png"
            alt="Bureau professionnel"
            fill
            className="object-cover object-center"
        />
        <div className="relative z-10">
            <h1 className="text-5xl font-serif font-black">Daouda Kaba</h1>
            <p className="uppercase tracking-widest mt-4 text-lg">
            Consul Général Honoraire
            </p>
            <p className="mt-6 max-w-3xl mx-auto text-white/90">
            Diplomatie – Finance – Audit – Gouvernance – Relations internationales
            </p>
        </div>
      </section>

      {/* PROFIL */}
      <section className="max-w-7xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="font-serif text-2xl font-black mb-6">Profil personnel</h2>
          <p className="text-gray-700 leading-relaxed dark:text-gray-300">
            <b>Nom :</b> Daouda Kaba<br/>
            <b>Date de naissance :</b> 01 juin 1983 à Conakry<br/>
            <b>Nationalité :</b> Guinéenne<br/>
            <b>Situation :</b> Marié, père de 4 enfants<br/>
            <b>Email :</b> kabadaouda05@gmail.com<br/>
            <b>Téléphone :</b> +224 621 79 28 92 / +224 660 19 91 52
          </p>
        </div>

        <div className="bg-white p-10 shadow-xl border-l-4 border-primary dark:bg-gray-800">
          <h3 className="font-black mb-4 uppercase tracking-widest text-sm">
            Vision professionnelle
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Dirigeant, expert financier et diplomate engagé, Daouda Kaba œuvre pour
            une gouvernance efficace, une coopération internationale renforcée et
            la mise en place de structures de gestion modernes et performantes.
          </p>
        </div>
      </section>

      {/* COMPÉTENCES */}
      <section className="bg-gray-900 text-white py-20">
        <h2 className="text-center font-serif text-2xl font-black mb-12">
          Domaines de compétences
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-6">
          {[
            "Comptabilité générale",
            "Comptabilité analytique",
            "Contrôle de gestion",
            "Contrôle et audit interne",
            "Management en business",
            "Suivi et évaluation des marchés",
            "Procédures de passation de marchés",
            "Développement de manuels de procédures",
            "Technique bancaire",
            "Budgétisation",
            "Finance islamique",
            "Gestion des coûts et suivi budgétaire",
            "Gestion administrative institutionnelle"
          ].map((s,i)=>(
            <div key={i} className="bg-white/10 p-6 border border-white/20">
              {s}
            </div>
          ))}
        </div>
      </section>

      {/* EXPÉRIENCES */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="font-serif text-2xl font-black mb-12">Parcours professionnel</h2>

        <div className="space-y-10">

          <div className="border-l-4 border-primary pl-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">Décembre 2022 – Présent</p>
            <h3 className="font-black">Consul du Pakistan en Guinée</h3>
          </div>

          <div className="border-l-4 border-accent pl-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">2018 – 2022</p>
            <h3 className="font-black">PDG d’Excel Groupe Guinée</h3>
            <p>Représentant de Gigawatt Global en Afrique – Prix Nobel de l’Énergie</p>
          </div>

          <div className="border-l-4 border-green-700 pl-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">2014 – 2017</p>
            <h3 className="font-black">PDG – KK New Channel SARL</h3>
          </div>

          <div className="border-l-4 border-primary pl-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">Septembre 2014</p>
            <h3 className="font-black">CIPECO – Port Autonome de Conakry</h3>
            <p>
              Gestion de 3 chambres froides de 1000 tonnes chacune, suivi des stocks,
              facturation, rapports financiers.
            </p>
          </div>

          <div className="border-l-4 border-accent pl-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">2013 – 2014</p>
            <h3 className="font-black">BADAM – Officier Administratif CIPECO</h3>
            <p>
              Supervision de la réhabilitation de la SOGUIPECHE, suivi des travaux,
              contrats, dépenses et conformité.
            </p>
          </div>

          <div className="border-l-4 border-green-700 pl-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">2011 – 2012</p>
            <h3 className="font-black">Responsable Audit & Contrôle Interne – BADAM</h3>
            <p>
              Mise en place des procédures, stratégie d’audit, rapports à la direction,
              supervision de 3 agents.
            </p>
          </div>

        </div>
      </section>

      {/* FORMATIONS */}
      <section className="bg-gray-100 py-20 dark:bg-gray-800">
        <h2 className="text-center font-serif text-2xl font-black mb-10">
          Formation & Certifications
        </h2>

        <div className="max-w-5xl mx-auto space-y-6 px-6">
          <p>✔ Formation Audit & Conformité – Rabobank & FBME (Chypre)</p>
          <p>✔ Formation lutte anti-blanchiment – Logiciels MANTAS & World Check</p>
          <p>✔ Interprète pour l’État Néerlandais (2012)</p>
          <p>✔ Diplôme Gestion d’Entreprise – Université Erasmus Rotterdam</p>
          <p>✔ Bachelier Science Administrative et Gestion Publique</p>
        </div>
      </section>

      {/* LANGUES */}
      <section className="bg-gray-900 text-white py-20 text-center">
        <h2 className="font-serif text-2xl mb-10">Langues</h2>
        <p>Français • Anglais • Néerlandais • Malinké • Soussou</p>
      </section>

    </div>
  )
}
