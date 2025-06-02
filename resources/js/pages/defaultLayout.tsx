import Footer from '@/components/defaultLayout/footer';
import NavBar from '@/components/defaultLayout/navBar';
import { Toaster } from 'react-hot-toast';

export default function DefaultLayout({ children }) {
    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <NavBar />
            {children}
            <Footer />
        </>
    );
}
