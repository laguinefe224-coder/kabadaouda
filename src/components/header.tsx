'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from './ui/sheet';
import { useUser } from '@/firebase';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/missions', label: 'Missions' },
  { href: '/videos', label: 'Vidéos' },
  { href: '/blog', label: 'Blog' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, loading } = useUser();
  const pathname = usePathname();
  const [clientLoaded, setClientLoaded] = useState(false);

  useEffect(() => {
    setClientLoaded(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dashboardLink = { href: '/admin/news', label: 'Dashboard' };
  const loginLink = { href: '/login', label: 'Connexion' };

  const showDashboardLink = clientLoaded && !!user && !pathname.startsWith('/admin');
  const showLoginLink = clientLoaded && !user && !loading;

  const mobileNavLinks = [
    ...navLinks,
    ...(showDashboardLink ? [dashboardLink] : []),
    ...(showLoginLink ? [loginLink] : [])
  ].filter(Boolean);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-black text-xl group-hover:scale-110 transition-transform">
            DK
          </div>
          <span className={cn(
            "font-black text-xl tracking-tighter transition-colors",
            scrolled ? "text-slate-900 dark:text-white" : "text-white"
          )}>
            Daouda <span className="text-primary">Kaba</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className={cn(
                    "text-sm font-bold uppercase tracking-widest transition-all hover:text-primary relative group",
                    scrolled ? "text-slate-600 dark:text-slate-300" : "text-white/90"
                  )}
                >
                  {link.label}
                  <span className={cn(
                    "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full",
                    pathname === link.href && "w-full"
                  )} />
                </Link>
              </li>
            ))}
          </ul>

          <div className="h-6 w-px bg-slate-300/30 mx-2" />

          <div className="flex items-center gap-4">
            {showDashboardLink && (
              <Link 
                href={dashboardLink.href} 
                className={cn(
                  "text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors",
                  scrolled ? "text-slate-600 dark:text-slate-300" : "text-white"
                )}
              >
                {dashboardLink.label}
              </Link>
            )}
            {showLoginLink && (
              <Link 
                href={loginLink.href} 
                className={cn(
                  "text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors",
                  scrolled ? "text-slate-600 dark:text-slate-300" : "text-white"
                )}
              >
                {loginLink.label}
              </Link>
            )}
            <Button asChild className="rounded-full px-6 font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
              <Link href="/contact">Contact</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn(
                "rounded-full transition-colors",
                scrolled ? "text-slate-900 dark:text-white" : "text-white hover:bg-white/10"
              )}>
                <Menu className="w-6 h-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white dark:bg-slate-950 p-0 border-l-0 w-full sm:max-w-sm">
              <SheetHeader className="p-6 flex flex-row justify-between items-center border-b dark:border-slate-800">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white font-black">
                    DK
                  </div>
                  <span className="font-black text-lg">Daouda Kaba</span>
                </Link>
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">Navigation principale</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col h-full overflow-y-auto">
                <nav className="flex flex-col p-6 gap-2">
                  {clientLoaded && mobileNavLinks.map((link) => (
                    <Link 
                      key={link!.href} 
                      href={link!.href} 
                      className={cn(
                        "flex items-center justify-between py-4 px-4 rounded-xl text-lg font-bold transition-all hover:bg-slate-100 dark:hover:bg-slate-900",
                        pathname === link!.href ? "text-primary bg-primary/5" : "text-slate-600 dark:text-slate-400"
                      )} 
                      onClick={() => setIsOpen(false)}
                    >
                      {link!.label}
                      <ChevronRight className="w-5 h-5 opacity-50" />
                    </Link>
                  ))}
                  <div className="mt-8">
                    <Button asChild className="w-full h-14 rounded-2xl text-lg font-bold" onClick={() => setIsOpen(false)}>
                      <Link href="/contact">Prendre Contact</Link>
                    </Button>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
