"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export function Footer() {
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    const navLinks = [
        { href: "/", label: "Accueil" },
        { href: "/a-propos", label: "À propos" },
        { href: "/missions", label: "Missions" },
        { href: "/videos", label: "Vidéos" },
        { href: "/blog", label: "Blog" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <footer className="bg-ryg text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 px-6">
                <div>
                    <h3 className="font-headline text-xl font-black">Daouda Kaba</h3>
                    <p className="text-white/80 mt-3">
                        Diplomatie moderne et coopération internationale.
                    </p>
                </div>

                <div>
                    <h4 className="font-black uppercase text-xs mb-3 tracking-widest">Navigation</h4>
                    <nav className="space-y-2 text-sm flex flex-col items-start">
                        {navLinks.map(link => (
                            <Link key={link.href} href={link.href} className="hover:text-white/70 transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="text-xs text-white/60">
                    <p>© {year} Daouda Kaba</p>
                    <p>Créé par Yattara Ousmane</p>
                </div>
            </div>
        </footer>
    );
}
