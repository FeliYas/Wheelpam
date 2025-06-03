import { Head, Link } from '@inertiajs/react';
import DefaultLayout from './defaultLayout';

export default function ProductosPorMedida({ productos }) {
    return (
        <DefaultLayout>
            <Head>
                <title>Busqueda</title>
            </Head>
            <div className="mx-auto my-20 flex min-h-[60vh] w-[1200px] flex-col">
                <div className="border-primary-color border-b-2 py-2">
                    <h2 className="text-xl font-bold">Resultados de busqueda:</h2>
                </div>
                <div className="grid grid-cols-4 gap-y-10 py-10">
                    {productos?.map((producto) => (
                        <Link
                            href={`/productos/${producto.sub_categoria.categoria_id}/${producto?.id}`}
                            className="flex h-[375px] min-w-[288px] flex-col rounded-md border"
                        >
                            <div className="relative flex h-[286px] items-end justify-center">
                                <img src={producto?.imagenes[0]?.image} className="h-full w-full rounded-t-md object-cover" alt="" />
                                <div className="bg-primary-color absolute -bottom-[2px] h-[2px] w-[25px]"></div>
                            </div>
                            <div className="flex h-full flex-col items-center justify-center">
                                <h3 className="text-primary-color text-[14px] font-semibold uppercase">{producto?.sub_categoria?.title}</h3>
                                <h2 className="text-[18px] text-black">{producto?.name}</h2>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </DefaultLayout>
    );
}
