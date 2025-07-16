import { usePage } from '@inertiajs/react';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Footer() {
    const { contacto, logos } = usePage().props;
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
            setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
        };

        // Inicializar
        handleResize();

        // Agregar listener
        window.addEventListener('resize', handleResize);

        // Limpiar
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const links = [
        { name: 'Nosotros', href: '/nosotros' },
        { name: 'Productos', href: '/productos' },
        { name: 'Servicios', href: '/servicios' },
        { name: 'Garantia', href: '/garantia' },
        { name: 'Novedades', href: '/novedades' },
        { name: 'Solicitud de presupuesto', href: '/solicitud-de-presupuesto' },
        { name: 'Contacto', href: '/contacto' },
    ];

    const datos = [
        {
            name: contacto?.location,
            icon: <MapPin color="#ef3620" />,
            href: `https://maps.google.com/?q=${encodeURIComponent(contacto?.location || '')}`,
            target: '_blank',
        },
        {
            name: contacto?.phone,
            icon: <Phone color="#ef3620" />,
            href: `tel:${contacto?.phone?.replace(/\s/g, '')}`,
        },
        {
            name: contacto?.email,
            icon: <Mail color="#ef3620" />,
            href: `mailto:${contacto?.email}`,
        },
    ];

    return (
        <div className="flex h-fit w-full flex-col bg-black">
            <div className="mx-auto flex h-full w-full max-w-[1200px] flex-col items-center justify-between gap-10 px-4 py-10 lg:flex-row lg:items-start lg:gap-0 lg:px-0 lg:py-26">
                {/* logo redes */}
                <div className="flex h-full flex-col items-center gap-4">
                    <img src={logos?.logo_principal} alt="Logo secundario" className="max-h-[72px] max-w-[200px] sm:max-w-full" />
                    <div className="flex flex-row items-center justify-center gap-4 sm:gap-2">
                        {contacto?.instagram && (
                            <a target="_blank" rel="noopener noreferrer" href={contacto?.instagram} aria-label="Facebook">
                                <Instagram color="#ffffff" />
                            </a>
                        )}
                        {contacto?.facebook && (
                            <a target="_blank" rel="noopener noreferrer" href={contacto?.facebook} aria-label="Instagram">
                                <Facebook color="#ffffff" />
                            </a>
                        )}
                        {contacto?.linkedin && (
                            <a target="_blank" rel="noopener noreferrer" href={contacto?.linkedin} aria-label="Instagram">
                                <Linkedin color="#ffffff" />
                            </a>
                        )}
                        {contacto?.youtube && (
                            <a target="_blank" rel="noopener noreferrer" href={contacto?.youtube} aria-label="Instagram">
                                <Youtube color="#ffffff" />
                            </a>
                        )}
                    </div>
                </div>

                {/* Secciones y newsletter en tablet: una columna, dos filas */}
                <div className={`${isTablet ? 'flex flex-col items-center gap-6' : 'hidden flex-col gap-6 lg:flex'}`}>
                    <h2 className="text-lg font-bold text-white">Secciones</h2>
                    <div className="grid h-fit grid-flow-col grid-cols-2 grid-rows-4 gap-x-10 gap-y-2">
                        {links.map((link, index) => (
                            <a key={index} href={link.href} className="text-[15px] text-white/80">
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Secciones en mobile */}
                <div className={`${isMobile ? 'flex flex-col items-center gap-6' : 'hidden'}`}>
                    <h2 className="text-lg font-bold text-white">Secciones</h2>
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-4">
                        {links.map((link, index) => (
                            <a key={index} href={link.href} className="text-[15px] text-white/80">
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Datos de contacto */}
                <div className="flex h-full flex-col items-center gap-6 lg:items-start lg:gap-6">
                    <h2 className="text-lg font-bold text-white">Datos de contacto</h2>
                    <div className="flex flex-col justify-center gap-4">
                        {datos.map((dato, index) => (
                            <a
                                key={index}
                                href={dato.href}
                                target={dato.target}
                                className="flex flex-row items-center gap-2 transition-opacity hover:opacity-80"
                            >
                                {dato?.icon}
                                <p className="max-w-[250px] text-base break-words text-white/80">{dato?.name}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex min-h-[67px] w-full flex-col items-center justify-center bg-[#FFFFFF0D] px-4 py-4 text-[14px] text-white/80 sm:flex-row sm:justify-between sm:px-6 lg:px-0">
                <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-center gap-2 text-center sm:flex-row sm:justify-between sm:gap-0 sm:text-left">
                    <p>© Copyright 2025 Wheelpam. Todos los derechos reservados</p>
                    <a target="_blank" rel="noopener noreferrer" href="https://osole.com.ar/" className="mt-2 sm:mt-0">
                        By <span className="font-bold">Osole</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
