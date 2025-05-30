import Footer from '@/components/defaultLayout/footer';
import NavBar from '@/components/defaultLayout/navBar';

export default function DefaultLayout({ children }) {
    return (
        <>
            <NavBar />
            {children}
            <Footer />
        </>
    );
}
