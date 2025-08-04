import { Head, Link, usePage } from '@inertiajs/react';
import DefaultLayout from './defaultLayout';

export default function Novedades() {
    const { banner, novedades } = usePage().props;

    return (
        <DefaultLayout>
            <Head>
                <title>Novedades</title>
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
                    / <Link href={'/novedades'}>Novedades</Link>
                </div>
                <img className="absolute h-full w-full object-cover object-center" src={banner?.image} alt="Banner nosotros" />
                <h2 className="absolute z-10 mx-auto w-[1200px] pb-20 text-3xl font-bold text-white max-sm:max-w-[1200px] sm:text-4xl">Novedades</h2>
            </div>

            <div className="mx-auto my-20 grid max-w-[1200px] grid-cols-3 gap-5 max-sm:grid-cols-1 max-sm:items-center">
                {novedades?.map((novedad) => (
                    <Link
                        key={novedad.id}
                        href={`/novedades/${novedad?.id}`}
                        className="group flex h-auto min-h-[400px] w-full flex-col rounded-md border transition-shadow duration-300 hover:shadow-lg sm:min-h-[450px] lg:min-h-[488px]"
                    >
                        <div className="relative flex h-fit items-end justify-center overflow-hidden sm:min-h-[220px] lg:min-h-[260px]">
                            <img
                                src={novedad?.imagenes[0]?.image}
                                className="h-full max-h-[273px] w-full overflow-hidden rounded-t-md object-cover transition-transform duration-300 group-hover:scale-105"
                                alt={novedad?.title || 'Novedad'}
                            />
                        </div>
                        <div className="flex h-full flex-col justify-between p-4 sm:p-5">
                            <div className="mb-3 flex flex-col">
                                <p className="text-primary-color mb-1 text-sm font-bold uppercase sm:text-[16px]">{novedad?.type}</p>
                                <h2 className="mb-2 text-lg leading-tight font-medium sm:text-xl lg:text-[25px]">{novedad?.title}</h2>
                            </div>

                            <div
                                className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600 sm:text-base"
                                dangerouslySetInnerHTML={{ __html: novedad?.text }}
                            />

                            <Link
                                href={`/novedades/${novedad?.id}`}
                                className="text-primary-color self-start text-sm font-medium hover:underline sm:text-[16px]"
                            >
                                Leer más
                            </Link>
                        </div>
                    </Link>
                ))}
            </div>
        </DefaultLayout>
    );
}
