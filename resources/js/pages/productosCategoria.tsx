import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import DefaultLayout from './defaultLayout';

export default function ProductosCategoria() {
    const { categorias, productos, categoria_id, subcategoria_id } = usePage().props;

    const [hover, setHover] = useState(null);

    return (
        <DefaultLayout>
            <Head>
                <title>Productos</title>
            </Head>
            <div className="mx-auto min-h-[60vh] w-[1200px] py-20">
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
                        {categorias
                            ?.find((categoria) => categoria?.id == categoria_id)
                            ?.subcategorias?.map((subcategoria) => (
                                <Link
                                    onMouseEnter={() => setHover(subcategoria.id)}
                                    onMouseLeave={() => setHover(null)}
                                    href={`/productos/${subcategoria.categoria_id}/${subcategoria.id}`}
                                    key={subcategoria.id}
                                    className="relative flex h-[300px] w-full max-w-[392px] justify-center overflow-hidden"
                                >
                                    <img
                                        src={subcategoria?.image}
                                        className={`duratyion-300 h-full w-full object-cover transition ${hover === subcategoria.id ? 'scale-110' : ''}`}
                                        alt=""
                                    />
                                    <div className={`absolute h-full w-full bg-black/50 transition duration-300`}></div>
                                    <h2 className="absolute bottom-5 z-30 text-[25px] font-semibold text-white">{subcategoria?.title}</h2>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
