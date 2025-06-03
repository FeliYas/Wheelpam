import Footer from '@/components/defaultLayout/footer';
import NavBar from '@/components/defaultLayout/navBar';
import { usePage } from '@inertiajs/react';
import { Mail } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import wp from '../../images/whatsapp.png';

export default function DefaultLayout({ children }) {
    const { contacto } = usePage().props;

    const soloNumeros = (str) => {
        return str?.replace(/\D/g, '');
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <NavBar />
            {children}
            <Footer />

            <a
                href={`mailto:${contacto.email}`}
                rel="noopener noreferrer"
                className="bg-primary-color fixed bottom-5 left-5 z-50 flex h-[64px] w-[64px] items-center justify-center rounded-full"
            >
                <Mail color="#fff" />
            </a>

            <div className="fixed right-0 bottom-0 z-50 flex items-center justify-center">
                <a href={`https://wa.me/${soloNumeros(contacto.whatsapp)}`} target="_blank" rel="noopener noreferrer">
                    <img src={wp} className="" alt="" />
                </a>
            </div>
        </>
    );
}
