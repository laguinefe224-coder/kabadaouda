'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from './ui/sheet';
import { useUser } from '@/firebase';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/missions', label: 'Missions' },
  { href: '/videos', label: 'Vidéos' },
  { href: '/blog', label: 'Blog' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useUser();
  const pathname = usePathname();
  const [clientLoaded, setClientLoaded] = useState(false);

  useEffect(() => {
    setClientLoaded(true);
  }, []);

  const dashboardLink = { href: '/admin/news', label: 'Dashboard' };
  const loginLink = { href: '/login', label: 'Login' };

  const showDashboardLink = clientLoaded && !!user && !pathname.startsWith('/admin');
  const showLoginLink = clientLoaded && !user && !loading;

  const mobileNavLinks = [
    ...navLinks,
    ...(showDashboardLink ? [dashboardLink] : []),
    ...(showLoginLink ? [loginLink] : [])
  ].filter(Boolean);

  return (
    <header className="w-full bg-ryg shadow-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-white font-headline text-2xl font-black">
          DK
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-white font-bold text-sm uppercase tracking-widest">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white/80 transition-colors">
              {link.label}
            </Link>
          ))}
          {showDashboardLink && (
            <Link href={dashboardLink.href} className="hover:text-white/80 transition-colors">
              {dashboardLink.label}
            </Link>
          )}
          {showLoginLink && (
            <Link href={loginLink.href} className="hover:text-white/80 transition-colors">
              {loginLink.label}
            </Link>
          )}
          <Button asChild variant="ghost" className="bg-white text-gray-900 px-4 py-2 hover:bg-white/90 hover:text-gray-900">
            <Link href="/contact">Contact</Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white">
                <Menu />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-gray-900 text-white p-0 w-3/4 border-r-0">
              <SheetHeader className="p-4 flex flex-row justify-between items-center border-b border-gray-700 space-y-0">
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <SheetDescription className="sr-only">Main navigation menu</SheetDescription>
                  <Link href="/" className="text-white font-headline text-2xl font-black" onClick={() => setIsOpen(false)}>
                      DK
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                      <X />
                      <span className="sr-only">Close menu</span>
                  </Button>
              </SheetHeader>
              <div className="flex flex-col h-full">
                <nav className="flex flex-col items-start gap-4 p-4 mt-4">
                  {clientLoaded && mobileNavLinks.map((link) => (
                    <Link key={link!.href} href={link!.href} className="text-lg w-full p-2 rounded-md hover:bg-gray-800 transition-colors" onClick={() => setIsOpen(false)}>
                      {link!.label}
                    </Link>
                  ))}
                  <Button asChild variant="ghost" className="bg-white text-gray-900 px-4 py-2 w-full justify-start text-lg mt-4 hover:bg-white/90 hover:text-gray-900" onClick={() => setIsOpen(false)}>
                    <Link href="/contact">Contact</Link>
                  </Button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
