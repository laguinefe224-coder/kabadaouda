"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from './ui/button';

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
        <footer className="bg-slate-950 text-slate-200 pt-24 pb-12 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Identity */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-black text-xl">
                                DK
                            </div>
                            <span className="font-black text-xl text-white">Daouda <span className="text-primary">Kaba</span></span>
                        </Link>
                        <p className="text-slate-400 leading-relaxed">
                            Consul Général Honoraire engagé pour une diplomatie de proximité et le renforcement des liens internationaux.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { Icon: Facebook, label: "Facebook" },
                                { Icon: Twitter, label: "Twitter" },
                                { Icon: Instagram, label: "Instagram" },
                                { Icon: Linkedin, label: "Linkedin" }
                            ].map(({ Icon, label }, i) => (
                                <a key={i} href="#" aria-label={label} className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800 hover:bg-primary hover:border-primary transition-all group">
                                    <Icon className="w-5 h-5 group-hover:text-white" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-8">Navigation</h4>
                        <nav className="flex flex-col gap-4">
                            {navLinks.map(link => (
                                <Link key={link.href} href={link.href} className="text-slate-400 hover:text-primary transition-colors flex items-center group">
                                    <span className="w-0 group-hover:w-4 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all" />
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-8">Contact</h4>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center shrink-0 border border-slate-800">
                                    <Mail className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Email</p>
                                    <a href="mailto:contact@daoudakaba.com" className="hover:text-primary transition-colors">contact@daoudakaba.com</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center shrink-0 border border-slate-800">
                                    <Phone className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Téléphone</p>
                                    <a href="tel:+224621792892" className="hover:text-primary transition-colors">+224 621 792 892</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter/Action */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-8">Actualités</h4>
                        <p className="text-slate-400 mb-6">Restez informé de nos dernières missions et actions diplomatiques.</p>
                        <div className="relative">
                            <input 
                                type="email" 
                                placeholder="Votre email" 
                                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 focus:outline-none focus:border-primary transition-colors"
                            />
                            <Button size="sm" className="absolute right-1.5 top-1.5 rounded-lg">
                                OK
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-slate-500 italic">
                        © {year} Daouda Kaba. Tous droits réservés.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span>Conçu avec excellence par</span>
                        <span className="text-white font-bold">Yattara Ousmane</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
