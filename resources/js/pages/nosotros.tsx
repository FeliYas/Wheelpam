import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import poster from '../../images/poster.png';
import DefaultLayout from './defaultLayout';

export default function Nosotros() {
    const { valores, nosotros, banner } = usePage().props;

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
                <title>Nosotros</title>
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
                    / <Link href={'/nosotros'}>Nosotros</Link>
                </div>
                <img className="absolute h-full w-full object-cover object-center" src={banner?.image} alt="Banner nosotros" />
                <h2 className="absolute z-10 mx-auto w-[1200px] pb-20 text-3xl font-bold text-white sm:text-4xl">Nosotros</h2>
            </div>

            <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-4 py-10 sm:gap-8 sm:py-16 lg:flex-row lg:gap-10 lg:px-0 lg:py-20">
                <div className="h-auto w-full lg:h-[476px]">
                    <img className="h-full w-full object-cover" src={nosotros?.image} alt="Imagen nosotros" />
                </div>
                <div className="h-full w-full py-4 lg:py-10">
                    <div className="flex flex-col gap-4 lg:gap-6">
                        <h2 className="text-2xl font-bold sm:text-3xl">{nosotros?.title}</h2>
                        <div className="" dangerouslySetInnerHTML={{ __html: nosotros?.text }} />
                    </div>
                </div>
            </div>

            <div className="w-full bg-black py-8 sm:py-10">
                <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-4 lg:px-0">
                    <div className="flex flex-col">
                        <p className="text-primary-color text-[18px] font-bold">NUESTROS VALORES</p>
                        <h2 className="text-2xl font-semibold text-white sm:text-[30px]">¿Por qué elegirnos?</h2>
                    </div>

                    <div className="grid grid-cols-3 gap-5">
                        {valores.map((item, index) => (
                            <div
                                key={index}
                                className="flex h-[392px] w-full flex-col items-center gap-4 rounded-lg bg-white py-10 sm:min-h-[350px] sm:py-16 md:min-h-[410px] md:py-20"
                            >
                                <img src={item.image} className="max-h-[81px]" alt="" />
                                <h2 className="text-xl font-bold sm:text-2xl">{item.title}</h2>
                                <div className="px-4 text-center sm:px-6 md:px-10" dangerouslySetInnerHTML={{ __html: item.text }} />
                            </div>
                        ))}
                    </div>

                    <div className="h-full w-full">
                        <video className="h-[690px]" src={nosotros?.video} controls muted autoPlay poster={poster}></video>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
