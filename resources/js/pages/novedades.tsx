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
                    <Link href={`/novedades/${novedad?.id}`} className="flex h-[488px] w-full max-w-[392px] flex-col rounded-md border">
                        <div className="relative flex min-h-[260px] items-end justify-center">
                            <img src={novedad?.image} className="h-full w-full rounded-t-md object-cover" alt="" />
                        </div>
                        <div className="flex h-full flex-col justify-between p-5">
                            <div className="flex flex-col">
                                <p className="text-primary-color text-[16px] font-bold uppercase">{novedad?.type}</p>
                                <h2 className="text-[25px] font-medium">{novedad?.title}</h2>
                            </div>
                            <div className="overflow-hidden" dangerouslySetInnerHTML={{ __html: novedad?.text }} />
                            <Link href={`/novedades/${novedad?.slug}`} className="text-[16px] font-medium">
                                Leer mas
                            </Link>
                        </div>
                    </Link>
                ))}
            </div>
        </DefaultLayout>
    );
}
