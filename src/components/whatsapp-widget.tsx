'use client';

import { FaWhatsapp } from 'react-icons/fa';

export function WhatsAppWidget({ phoneNumber }: { phoneNumber: string }) {
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors z-50"
            aria-label="Contacter sur WhatsApp"
        >
            <FaWhatsapp size={32} />
        </a>
    );
}
