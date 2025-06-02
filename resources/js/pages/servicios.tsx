import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import DefaultLayout from './defaultLayout';

export default function Nosotros() {
    const { servicios, banner } = usePage().props;

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

    return (
        <DefaultLayout>
            <Head>
                <title>Servicios</title>
            </Head>
            <div
                style={{
                    background:
                        'linear-gradient(180deg, rgba(0, 0, 0, 0.80) 27%, rgba(0, 0, 0, 0.00) 138.44%), url(<path-to-image>) lightgray -215.64px -286.999px / 121.977% 216.954% no-repeat',
                    mixBlendMode: 'multiply',
                }}
                className="relative flex h-[250px] w-full items-end justify-center sm:h-[300px] md:h-[400px]"
            >
                <div className="absolute top-16 z-40 mx-auto w-full max-w-[1200px] px-4 text-[12px] text-white sm:top-10 md:top-10 lg:px-0">
                    <Link className="font-bold" href={'/'}>
                        Inicio
                    </Link>{' '}
                    / <Link href={'/servicios'}>Servicios</Link>
                </div>
                <img className="absolute h-full w-full object-cover object-center" src={banner?.image} alt="Banner servicios" />
                <h2 className="absolute z-10 mx-auto w-[1200px] pb-20 text-3xl font-bold text-white sm:text-4xl">Servicios</h2>
            </div>

            <div className="mx-auto flex w-[1200px] flex-row gap-5 py-20">
                {servicios?.map((servicio) => (
                    <div className="flex w-[288px] flex-col justify-between gap-3">
                        <div className="flex flex-col gap-4">
                            <img src={servicio?.icon} className="h-[50px] w-[50px]" alt="" />
                            <h2 className="text-[24px] font-semibold">{servicio?.title}</h2>
                            <div style={{ fontSize: '14px' }} className="" dangerouslySetInnerHTML={{ __html: servicio?.text }} />
                        </div>

                        <Link
                            href="#"
                            className="border-primary-color text-primary-color mt-5 flex h-[38px] w-[187px] items-center justify-center rounded-full border text-[15px] font-medium"
                        >
                            Consultar
                        </Link>
                    </div>
                ))}
            </div>
        </DefaultLayout>
    );
}
