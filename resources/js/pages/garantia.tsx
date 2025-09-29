import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import DefaultLayout from './defaultLayout';

export default function Garantia() {
    const { banner, garantia } = usePage().props;

    const [showMore, setShowMore] = useState(false);

    return (
        <DefaultLayout>
            <Head>
                <title>Calidad</title>
            </Head>
            <div
                style={{
                    background:
                        'linear-gradient(180deg, rgba(0, 0, 0, 0.80) 27%, rgba(0, 0, 0, 0.00) 138.44%), url(<path-to-image>) lightgray -215.64px -286.999px / 121.977% 216.954% no-repeat',
                    mixBlendMode: 'multiply',
                }}
                className="relative flex h-[250px] w-full items-end justify-center sm:h-[300px] md:h-[400px]"
            >
                <div className="absolute top-16 z-40 mx-auto w-full max-w-[1200px] px-4 text-[12px] text-white">
                    <Link className="font-bold" href={'/'}>
                        Inicio
                    </Link>{' '}
                    / <Link href={'/garantia'}>Calidad</Link>
                </div>
                <img className="absolute h-full w-full object-cover object-center" src={banner?.image} alt="Banner calidad" />
                <h2 className="absolute z-10 mx-auto w-[1200px] pb-20 text-3xl font-bold text-white max-sm:max-w-[1200px] sm:text-4xl">Calidad</h2>
            </div>

            <div className="mx-auto my-20 flex max-w-[1200px] flex-row gap-10 max-sm:flex-col max-sm:items-center">
                <div className="flex w-full flex-col">
                    <h2 className="text-[35px] font-semibold">{garantia?.title}</h2>
                    <div className="text-[16px]" dangerouslySetInnerHTML={{ __html: garantia?.text }} />
                </div>
                <div className="h-full w-full rounded-md">
                    <img src={garantia?.image} className="h-full w-full rounded-md object-cover" alt="Imagen de garantia" />
                </div>
            </div>
            <div className="flex flex-col">
                <button
                    onClick={() => setShowMore(!showMore)}
                    className="border-primary-color mx-auto my-10 flex w-[1200px] flex-row items-center justify-between border-b-2 text-left"
                >
                    <h2 className="text-bold text-primary-color w-full text-2xl">Garantia</h2>

                    <FontAwesomeIcon
                        icon={faChevronUp}
                        color="#ef3620"
                        size="sm"
                        className={`transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`}
                    />
                </button>
                {showMore && (
                    <div className={`mx-auto mb-20 h-0 w-[1200px] text-[16px] transition-all duration-300 ${showMore ? 'h-auto' : 'h-0'}`}>
                        <div dangerouslySetInnerHTML={{ __html: garantia?.more_text }} />
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
}
