
export default function VideoGalleryPage() {
  return (
    <div className="bg-gray-900 text-white">
      {/* HERO SECTION */}
      <section className="relative h-[70vh] md:h-[80vh] w-full flex items-center justify-center text-center overflow-hidden bg-black pt-24">
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
          <h1 className="text-4xl md:text-5xl font-headline font-black">
            Galerie Vidéo
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/80">
            Plongez au cœur de l'action diplomatique.
          </p>
        </div>
      </section>

      {/* VIDEOS BODY */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="font-headline text-3xl font-black mb-12 text-center">
          Nos Archives
        </h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Vertical Video (TikTok format) */}
          <div className="flex flex-col items-center gap-4">
            <h3 className="font-headline text-xl font-bold">Format Court</h3>
            <div className="w-full max-w-sm mx-auto bg-gray-800 rounded-2xl p-2 border border-gray-700 shadow-2xl">
              <div className="aspect-w-9 aspect-h-16 rounded-xl overflow-hidden">
                <video controls playsInline className="w-full h-full object-cover">
                  <source src="/videos/tiktok-video.mp4" type="video/mp4" />
                  Votre navigateur ne supporte pas la balise vidéo.
                </video>
              </div>
            </div>
             <p className="text-center text-muted-foreground mt-2">
              Interventions rapides et messages clés sur les plateformes sociales.
            </p>
          </div>
          
          {/* Horizontal Video (Facebook/Standard format) */}
          <div className="flex flex-col items-center gap-4 mt-12 md:mt-0">
            <h3 className="font-headline text-xl font-bold">Reportages</h3>
            <div className="w-full bg-gray-800 rounded-lg p-2 border border-gray-700 shadow-2xl">
               <div className="aspect-square rounded-md overflow-hidden">
                <video controls playsInline className="w-full h-full object-cover">
                  <source src="/videos/facebook-video.mp4" type="video/mp4" />
                  Votre navigateur ne supporte pas la balise vidéo.
                </video>
              </div>
            </div>
             <p className="text-center text-muted-foreground mt-2">
              Retrouvez les reportages et les interviews complètes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
