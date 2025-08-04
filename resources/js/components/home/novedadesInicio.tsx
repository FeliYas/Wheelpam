import { Link, usePage } from '@inertiajs/react';

export default function NovedadesInicio() {
    const { novedades } = usePage().props;

    return (
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 px-4 pb-8 sm:gap-5 sm:px-6 sm:pb-12 lg:px-8 lg:pb-16 xl:px-0">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
                <h2 className="text-xl leading-tight font-semibold sm:text-2xl md:text-3xl lg:text-[35px]">Enterate de las últimas novedades</h2>
                <Link
                    href="/novedades"
                    className="text-primary-color border-primary-color hover:bg-primary-color flex h-[36px] w-[100px] flex-shrink-0 items-center justify-center rounded-full border text-sm transition duration-300 hover:text-white sm:h-[38px] sm:w-[107px] sm:text-base"
                >
                    Ver todos
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
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
        </div>
    );
}
