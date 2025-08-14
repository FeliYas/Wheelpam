import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function NuestrosProductosInicio() {
    const { productos } = usePage().props;

    const [hover, setHover] = useState(null);

    return (
        <div className="mx-auto flex w-[1200px] flex-col gap-5 pb-16">
            <div className="flex flex-row items-center justify-between">
                <h2 className="text-[35px] font-semibold">Productos destacados</h2>
                <Link
                    href="/productos"
                    className="text-primary-color border-primary-color hover:bg-primary-color flex h-[38px] w-[107px] items-center justify-center rounded-full border transition duration-300 hover:text-white"
                >
                    Ver todos
                </Link>
            </div>

            <div className="grid grid-cols-4 gap-5">
                {productos?.map((producto) => (
                    <Link
                        href={`/productos/${producto.sub_categoria.categoria_id}/${producto.sub_categoria.id}/${producto?.id}`}
                        className="flex h-[375px] w-[288px] flex-col rounded-md border"
                    >
                        <div className="relative flex min-h-[286px] items-end justify-center overflow-hidden rounded-t-md">
                            <img
                                src={producto?.imagenes?.find((img) => img.portada == true)?.image || producto?.imagenes[0]?.image}
                                className={`h-full w-full rounded-t-md object-cover transition duration-300 ${hover === producto.id ? 'scale-105' : ''}`}
                                alt=""
                                onMouseEnter={() => setHover(producto.id)}
                                onMouseLeave={() => setHover(null)}
                            />
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
    );
}
