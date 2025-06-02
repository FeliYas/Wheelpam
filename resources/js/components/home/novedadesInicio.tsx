import { Link, usePage } from '@inertiajs/react';

export default function NovedadesInicio() {
    const { novedades } = usePage().props;

    return (
        <div className="mx-auto flex w-[1200px] flex-col gap-5 pb-16">
            <div className="flex flex-row items-center justify-between">
                <h2 className="text-[35px] font-semibold">Enterate de las últimas novedades</h2>
                <Link
                    href="/novedades"
                    className="text-primary-color border-primary-color hover:bg-primary-color flex h-[38px] w-[107px] items-center justify-center rounded-full border transition duration-300 hover:text-white"
                >
                    Ver todos
                </Link>
            </div>

            <div className="flex flex-row gap-5">
                {novedades?.map((novedad) => (
                    <Link href={`/novedades/${novedad?.id}`} className="flex h-[488px] w-[392px] flex-col rounded-md border">
                        <div className="relative flex min-h-[260px] items-end justify-center">
                            <img src={novedad?.image} className="h-full w-full rounded-t-md object-cover" alt="" />
                        </div>
                        <div className="flex h-full flex-col justify-between p-5">
                            <div className="flex flex-col">
                                <p className="text-primary-color text-[16px] font-bold uppercase">{novedad?.type}</p>
                                <h2 className="text-[25px] font-medium">{novedad?.title}</h2>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: novedad?.text }} />
                            <Link href={`/novedades/${novedad?.slug}`} className="text-[16px] font-medium">
                                Leer mas
                            </Link>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
