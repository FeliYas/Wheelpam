import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import DefaultLayout from './defaultLayout';

export default function SubproductosProductos() {
    const { categorias, productos, categoria_id, subcategoria_id } = usePage().props;

    const [hover, setHover] = useState(null);

    return (
        <DefaultLayout>
            <Head>
                <title>Productos</title>
            </Head>

            <div className="mx-auto flex w-[1200px] flex-row gap-2 py-10">
                <Link href="/productos">Productos</Link> /
                <Link href={`/productos/${categoria_id}`}>{categorias?.find((cat) => cat?.id == categoria_id)?.title}</Link>/
                <Link href={`/productos/${categoria_id}/${subcategoria_id}`}>
                    {categorias?.find((cat) => cat?.id == categoria_id)?.subcategorias?.find((subcat) => subcat?.id == subcategoria_id)?.title}
                </Link>
            </div>
            <div className="mx-auto min-h-[60vh] w-[1200px]">
                <div className="flex w-full flex-row gap-20">
                    <div className="flex w-1/3 flex-col">
                        {categorias?.map((categoria) => (
                            <div className="relative flex flex-col gap-1 border-y py-2">
                                <Link
                                    href={`/productos/${categoria.id}`}
                                    key={categoria.id}
                                    className={`text-[16px] ${categoria?.id == categoria_id ? 'font-bold' : ''}`}
                                >
                                    {categoria?.title}
                                </Link>
                                {categoria?.id == categoria_id && (
                                    /* mostrar subcategorias de esa categoria */
                                    <div className="ml-2 flex flex-col gap-1">
                                        {categoria?.subcategorias?.map((subcategoria) => (
                                            <Link
                                                href={`/productos/${categoria.id}/${subcategoria.id}`}
                                                key={subcategoria.id}
                                                className={`text-[14px] ${subcategoria?.id == subcategoria_id ? 'font-bold' : ''}`}
                                            >
                                                {subcategoria?.title}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="grid w-full grid-cols-3 gap-5">
                        {productos?.map((producto) => (
                            <Link
                                href={`/productos/${categoria_id}/${subcategoria_id}/${producto.id}`}
                                className="flex h-[375px] flex-col rounded-md border"
                            >
                                <div className="relative flex min-h-[286px] items-end justify-center overflow-hidden rounded-t-md">
                                    <img
                                        src={producto?.imagenes[0]?.image}
                                        className={`h-full min-h-[286px] w-full rounded-t-md object-cover transition duration-300 ${hover === producto.id ? 'scale-105' : ''}`}
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
            </div>
        </DefaultLayout>
    );
}
