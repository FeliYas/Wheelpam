import { Link, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NavBar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { ziggy, logos } = usePage().props;

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Limpieza del event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    const defaultLinks = [
        { title: 'Nosotros', href: '/nosotros' },
        { title: 'Productos', href: '/productos' },
        { title: 'Servicios', href: '/servicios' },
        { title: 'Garantia', href: '/garantia' },
        { title: 'Novedades', href: '/novedades' },
        { title: 'Solicitud de presupuesto', href: '/solicitud-de-presupuesto' },
        { title: 'Contacto', href: '/contacto' },
    ];

    return (
        <div
            className={`fixed top-0 z-50 h-[70px] w-full transition-all duration-300 md:h-[100px] ${
                ziggy.location.includes('productos/') || ziggy.location.includes('busqueda') || ziggy.location.includes('privada')
                    ? 'sticky shadow-md'
                    : 'fixed'
            } ${
                scrolled || ziggy.location.includes('nosotros') || ziggy.location.includes('busqueda') || ziggy.location.includes('privada')
                    ? 'bg-black shadow-md'
                    : 'bg-transparent'
            }`}
        >
            <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-4 md:px-6 lg:px-0">
                <Link href={'/'} className="h-12 md:h-auto">
                    <img src={logos?.logo_principal} alt="" className="h-full object-contain" />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden h-full flex-row items-center gap-7 md:flex">
                    <div className="flex h-full flex-row items-center gap-5">
                        {ziggy.location.includes('privada')
                            ? privateLinks.map((link, index) => (
                                  <Link
                                      key={index}
                                      href={link.href}
                                      className={`text-[15px] ${ziggy.location.includes(link.title.toLowerCase()) ? 'font-bold' : ''} ${
                                          scrolled ||
                                          ziggy.location.includes('productos/') ||
                                          ziggy.location.includes('privada') ||
                                          ziggy.location.includes('busqueda')
                                              ? 'text-black hover:text-[#F2C94C]'
                                              : 'text-white hover:text-[#F2C94C]'
                                      }`}
                                  >
                                      {link.title}
                                  </Link>
                              ))
                            : defaultLinks.map((link, index) => (
                                  <Link
                                      key={index}
                                      href={link.href}
                                      className={`flex h-full items-center text-[15px] ${ziggy.location.includes(link.title.toLowerCase()) ? 'border-primary-color border-b-5 font-bold' : ''} ${
                                          scrolled ||
                                          ziggy.location.includes('productos/') ||
                                          ziggy.location.includes('privada') ||
                                          ziggy.location.includes('busqueda')
                                              ? 'text-black hover:text-[#F2C94C]'
                                              : 'text-white hover:text-[#F2C94C]'
                                      }`}
                                  >
                                      {link.title}
                                  </Link>
                              ))}
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="flex items-center md:hidden">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className={`p-2 ${
                            scrolled ||
                            ziggy.location.includes('productos/') ||
                            ziggy.location.includes('privada') ||
                            ziggy.location.includes('busqueda')
                                ? 'text-black'
                                : 'text-white'
                        }`}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="fixed top-[70px] right-0 left-0 z-40 overflow-hidden bg-white shadow-md"
                        >
                            <div className="flex flex-col p-4">
                                {ziggy.location.includes('privada')
                                    ? privateLinks.map((link, index) => (
                                          <Link
                                              key={index}
                                              href={link.href}
                                              className={`py-3 text-[16px] ${
                                                  ziggy.location.includes(link.title.toLowerCase()) ? 'font-bold' : ''
                                              } text-black hover:text-[#F2C94C]`}
                                              onClick={() => setMobileMenuOpen(false)}
                                          >
                                              {link.title}
                                          </Link>
                                      ))
                                    : defaultLinks.map((link, index) => (
                                          <Link
                                              key={index}
                                              href={link.href}
                                              className={`py-3 text-[16px] ${
                                                  ziggy.location.includes(link.title.toLowerCase()) ? 'font-bold' : ''
                                              } text-black hover:text-[#F2C94C]`}
                                              onClick={() => setMobileMenuOpen(false)}
                                          >
                                              {link.title}
                                          </Link>
                                      ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
