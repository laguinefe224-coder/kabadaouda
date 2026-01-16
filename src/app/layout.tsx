
'use client';

import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { FirebaseProvider } from '@/firebase';
import { WhatsAppWidget } from '@/components/whatsapp-widget';
import { usePathname } from 'next/navigation';

const metadata: Metadata = {
  title: 'Daouda Kaba – Consul Général Honoraire',
  description: 'Diplomatie, coopération internationale, représentation consulaire.',
  openGraph: {
    title: 'Daouda Kaba – Consul Général Honoraire',
    description: 'Diplomatie, coopération internationale, représentation consulaire.',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context":"https://schema.org",
          "@type":"Person",
          "name":"Daouda Kaba",
          "jobTitle":"Consul général honoraire"
        })}} />
      </head>
      <body className="font-body bg-background text-foreground antialiased">
        <FirebaseProvider>
            {!isAdminPage && <Header />}
            <main>{children}</main>
            {!isAdminPage && <Footer />}
            <Toaster />
            {!isAdminPage && <WhatsAppWidget phoneNumber="+224621792892" />}
        </FirebaseProvider>
      </body>
    </html>
  );
}
