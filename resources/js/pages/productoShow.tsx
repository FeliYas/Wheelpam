import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import circleCheck from '../../images/circle-check.png';
import logoProdcuto from '../../images/logoproductos.png';
import DefaultLayout from './defaultLayout';

export default function ProductoShow({ producto, categorias, subcategorias, categoria_id, subcategoria_id }) {
    const [currentImage, setCurrentImage] = useState(producto?.imagenes[0]?.image);

    const handleDownload = async () => {
        try {
            const filename = producto.archivo.split('/').pop();
            // Make a GET request to the download endpoint
            const response = await axios.get(`/descargar/archivo/${filename}`, {
                responseType: 'blob', // Important for file downloads
            });

            // Create a link element to trigger the download
            const fileType = response.headers['content-type'] || 'application/octet-stream';
            const blob = new Blob([response.data], { type: fileType });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = filename; // Descargar con el nombre original
            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);

            // Optional: show user-friendly error message
            alert('Failed to download the file. Please try again.');
        }
    };
    const handleDownloadFicha = async () => {
        try {
            const filename = producto.ficha.split('/').pop();
            // Make a GET request to the download endpoint
            const response = await axios.get(`/descargar/ficha/${filename}`, {
                responseType: 'blob', // Important for file downloads
            });

            // Create a link element to trigger the download
            const fileType = response.headers['content-type'] || 'application/octet-stream';
            const blob = new Blob([response.data], { type: fileType });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = filename; // Descargar con el nombre original
            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);

            // Optional: show user-friendly error message
            alert('Failed to download the file. Please try again.');
        }
    };

    return (
        <DefaultLayout>
            <Head>
                <title>{producto?.name}</title>
                <meta name="description" content={producto?.description} />
                <meta property="og:title" content={producto?.name} />
            </Head>
            <div className="mx-auto flex w-[1200px] flex-row gap-2 py-10">
                <Link href="/productos">Productos</Link> /<Link href={`/productos/${categoria_id}`}>{producto?.sub_categoria?.categoria?.title}</Link>
                /<Link href={`/productos/${categoria_id}/${subcategoria_id}`}>{producto?.sub_categoria?.title}</Link>/
                <Link className="font-bold" href={`/productos/${categoria_id}/${subcategoria_id}/${producto?.id}`}>
                    {producto?.name}
                </Link>
            </div>
            <div className="mx-auto flex w-[1200px] pb-10 flex-col">
                <div className="flex w-full flex-row gap-10">
                    <div className="flex w-1/4 flex-col">
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
                                                href={`/productos/${categoria.id}`}
                                                key={subcategoria.id}
                                                data={{ subcategoria: subcategoria.id }}
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
                    <div className="flex w-full flex-col gap-20">
                        <div className="flex flex-row gap-10">
                            <div className="flex w-full flex-col gap-4">
                                <div className="h-[392px] min-w-[392px] rounded-md border border-gray-200">
                                    <img src={currentImage} className="h-full w-full rounded-md object-contain" alt="" />
                                </div>
                                <div className="flex flex-row gap-4">
                                    {producto?.imagenes?.map((imagen, index) => (
                                        <button
                                            onClick={() => setCurrentImage(imagen?.image)}
                                            key={index}
                                            className={`outline-primary-color h-[70px] w-[70px] rounded-md ${
                                                currentImage === imagen?.image ? 'outline-2' : ''
                                            }`}
                                        >
                                            <img src={imagen?.image} className="h-full w-full rounded-md object-cover" alt="" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex w-full flex-col justify-between gap-2">
                                <div>
                                    <div className="flex flex-row items-center justify-between border-b border-gray-300">
                                        <div className="flex flex-col">
                                            <h2 className="text-primary-color text-[18px] font-bold uppercase">{producto?.sub_categoria?.title}</h2>
                                            <h2 className="text-[35px] font-semibold">{producto?.name}</h2>
                                        </div>
                                        <div className="h-[54px] w-[54px]">
                                            <img src={logoProdcuto} className="h-full w-full object-contain" alt="" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-15">
                                        {producto?.description && <div className="text-[16px] font-bold" dangerouslySetInnerHTML={{ __html: producto?.description }}></div>}
                                        {Number(producto?.confort) > 0 && Number(producto?.temperatura) > 0 && Number(producto?.desgaste) > 0 && (
                                            <div className="flex flex-col gap-2">
                                                <p className="text-[16px] font-bold">{producto?.dureza || 'Dureza de banda de rodadura 65 shore +- 5'}</p>
                                                <div className="grid grid-cols-2 grid-rows-3 items-center gap-y-2">
                                                    <p>{producto?.barra_uno || 'Resistencia a la temperatura'}</p>
                                                    <div className="relative h-2 rounded bg-gray-200">
                                                        <div
                                                            className="absolute h-2 rounded bg-red-600 transition-all duration-300"
                                                            style={{ width: `${Number(producto?.temperatura) * 10}%` }}
                                                        ></div>
                                                    </div>
                                                    <p>{producto?.barra_dos || 'Resistencia al desgaste'}</p>
                                                    <div className="relative h-2 rounded bg-gray-200">
                                                        <div
                                                            className="absolute h-2 rounded bg-red-600 transition-all duration-300"
                                                            style={{ width: `${Number(producto?.desgaste) * 10}%` }}
                                                        ></div>
                                                    </div>
                                                    <p>{producto?.barra_tres || 'Confort durante la marcha'}</p>
                                                    <div className="relative h-2 rounded bg-gray-200">
                                                        <div
                                                            className="absolute h-2 rounded bg-red-600 transition-all duration-300"
                                                            style={{ width: `${Number(producto?.confort) * 10}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex h-[38px] w-full flex-row gap-5">
                                    {producto?.archivo && (
                                        <button
                                            onClick={handleDownload}
                                            className="border-primary-color text-primary-color w-full rounded-full border font-bold"
                                        >
                                            Tabla de medidas
                                        </button>
                                    )}

                                    {producto?.ficha && (
                                        <button
                                            onClick={handleDownloadFicha}
                                            className="bg-primary-color flex w-full items-center justify-center rounded-full font-bold text-white"
                                        >
                                            Ficha técnica
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full flex-row gap-10">
                            <style>
                                {`
                                .custom-list ul {
                                    list-style: none;
                                    padding-left: 0rem;
                                    }

                                    .custom-list ul li {
                                    position: relative;
                                    padding-left: 1.5rem;
                                    margin-bottom: 0.2rem;
                                    }

                                    .custom-list ul li::before {
                                    content: '';
                                    position: absolute;
                                    left: 0;
                                    top: 0.4rem;
                                    width: 16px;
                                    height: 16px;
                                    background-image: url(${circleCheck}); /* tu imagen */
                                    background-size: contain;
                                    background-repeat: no-repeat;
                                    }
                                `}
                            </style>
                            {producto?.recomendaciones && producto.recomendaciones.trim() !== '<p><br></p>' && (
                                <div className="flex w-full flex-col">
                                    <h3 className="border-b pb-2 text-[30px] font-semibold">{producto?.subtitulo1 || 'Recomendaciones de uso'}</h3>
                                    <div
                                        className="custom-list prose prose-sm sm:prose lg:prose-lg xl:prose-xl pt-4"
                                        dangerouslySetInnerHTML={{ __html: producto?.recomendaciones }}
                                    />
                                </div>
                            )}

                            {producto?.caracteristicas != false && (
                                <div className="flex w-full flex-col">
                                    <h3 className="border-b pb-2 text-[30px] font-semibold">{producto?.subtitulo2 || 'Características'}</h3>
                                    <div className="flex flex-row gap-5 pt-4">
                                        {producto?.caracteristicas?.map((caracteristica, index) => (
                                            <div key={index} className="h-[80px] w-[115px] rounded-md">
                                                <img src={caracteristica?.image} className="h-full w-full rounded-md object-cover" alt="" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
