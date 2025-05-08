import NavBar from '@/components/defaultLayout/navBar';

export default function DefaultLayout({ children }) {
    return (
        <>
            <NavBar />
            {children}
        </>
    );
}
