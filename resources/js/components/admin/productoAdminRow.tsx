import { faDownload, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { router, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import CustomReactQuill from '../customReactQuill';
import Switch from '../switch';

// Mapa de órdenes por imagen
type OrdersMap = Record<number, string | number>;

export default function ProductoAdminRow({ producto }) {
    const [edit, setEdit] = useState(false);
    const [imageView, setImageView] = useState(false);
    const [text, setText] = useState(producto?.recomendaciones || '');
    const [caracteristicas, setCaracteristicas] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(producto?.sub_categoria?.categoria_id || '');

    // -----------------------------
    // NUEVO: Estado controlado por imagen
    // -----------------------------
    const [imageOrders, setImageOrders] = useState<OrdersMap>(() => {
        const map: OrdersMap = {};
        (producto?.imagenes || []).forEach((img) => {
            map[img.id] = img.order ?? '';
        });
        return map;
    });

    // Rehidratar cuando cambie el producto o se abra el modal de imágenes
    useEffect(() => {
        const map: OrdersMap = {};
        (producto?.imagenes || []).forEach((img) => {
            map[img.id] = img.order ?? '';
        });
        setImageOrders(map);
    }, [producto?.id, imageView]);

    const { categorias, sub_categorias, medidas } = usePage().props;

    const handleDownload = async (producto) => {
        try {
            if (!producto?.archivo) {
                toast.error('Este producto no tiene archivo asociado');
                return;
            }
            const filename = producto.archivo.split('/').pop();
            const response = await axios.get(`/descargar/archivo/${filename}`, { responseType: 'blob' });
            const fileType = response.headers['content-type'] || 'application/octet-stream';
            const blob = new Blob([response.data], { type: fileType });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename || 'archivo';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
            toast.error('No se pudo descargar el archivo.');
        }
    };

    const updateForm = useForm({
        order: producto?.order,
        name: producto?.name,
        recomendaciones: producto?.recomendaciones,
        sub_categoria_id: producto?.sub_categoria_id,
        description: producto?.description,
        temperatura: producto?.temperatura,
        confort: producto?.confort,
        desgaste: producto?.desgaste,
        medida_id: producto?.medida_id,
        barra_uno: producto?.barra_uno,
        barra_dos: producto?.barra_dos,
        barra_tres: producto?.barra_tres,
        id: producto?.id,
    });

    const imageForm = useForm({
        producto_id: producto?.id,
    });

    const caracForm = useForm({
        producto_id: producto?.id,
    });

    const handleProdImage = (e: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        imageForm.post(route('admin.imagenes.store'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Imagen agregada correctamente');
            },
            onError: (errors) => {
                toast.error('Error al agregar imagen');
                console.log(errors);
            },
        });
    };

    useEffect(() => {
        updateForm.setData('recomendaciones', text);
    }, [text]);

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateForm.post(route('admin.productos.update'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Producto actualizado correctamente');
                setEdit(false);
            },
            onError: (errors) => {
                toast.error('Error al actualizar producto');
                console.log(errors);
            },
        });
    };

    // -----------------------------
    // NUEVO: cambiar orden de UNA imagen
    // -----------------------------
    const handleOrderChange = (imageId: number, value: string) => {
        setImageOrders((prev) => ({ ...prev, [imageId]: value }));
    };

    const updateImage = (image_id: number) => {
        const order = imageOrders[image_id];

        // Si tu ruta es RESTful: PATCH /imagenes/{id}
        router.post(
            route('admin.imagenes.update', { id: image_id }),
            { order },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Imagen actualizada correctamente');
                },
                onError: (errors) => {
                    toast.error('Error al actualizar imagen');
                    console.log(errors);
                },
            },
        );

        // Si tu backend no acepta PATCH directamente, usa method spoofing:
        // router.post(route('admin.imagenes.update', { id: image_id }), { _method: 'PATCH', order }, { ...callbacks });
    };

    const deleteProducto = () => {
        if (confirm('¿Estas seguro de eliminar este producto?')) {
            updateForm.delete(route('admin.productos.destroy'), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Producto eliminado correctamente');
                },
                onError: (errors) => {
                    toast.error('Error al eliminar producto');
                    console.log(errors);
                },
            });
        }
    };

    const deleteImage = (imageId: number) => {
        if (confirm('¿Estas seguro de eliminar esta imagen?')) {
            imageForm.delete(route('admin.imagenes.destroy', { id: imageId }), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Imagen eliminada correctamente');
                },
                onError: (errors) => {
                    toast.error('Error al eliminar imagen');
                    console.log(errors);
                },
            });
        }
    };

    const agregarCarac = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        caracForm.post(route('admin.caracteristicas.store'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Característica agregada correctamente');
            },
            onError: (errors) => {
                toast.error('Error al agregar característica');
                console.log(errors);
            },
        });
    };

    // Orden visual de la grilla según el valor actual (editado o original)
    const imagenesOrdenadas = useMemo(() => {
        const list = [...(producto?.imagenes || [])];
        return list.sort((a, b) => {
            const oa = Number(imageOrders[a.id] ?? a.order ?? 0);
            const ob = Number(imageOrders[b.id] ?? b.order ?? 0);
            return oa - ob;
        });
    }, [producto?.imagenes, imageOrders]);

    return (
        <tr className={`border text-black odd:bg-gray-100 even:bg-white`}>
            <td className="align-middle">{producto?.order}</td>
            <td className="align-middle">{producto?.name}</td>
            <td>{producto?.description}</td>

            <td className="align-middle">{producto?.medida?.name || 'Sin medida'}</td>

            <td className="h-[90px] w-[90px] px-8">
                <button onClick={() => setCaracteristicas(true)} className="h-10 w-10 rounded-md border border-blue-500 px-2 py-1 text-white">
                    <FontAwesomeIcon icon={faPen} size="lg" color="#3b82f6" />
                </button>
            </td>

            <td className="h-[90px] w-[90px] px-8">
                {producto?.archivo ? (
                    <button onClick={() => handleDownload(producto)} className="h-10 w-10 rounded-md border border-blue-500 px-2 py-1 text-white">
                        <FontAwesomeIcon icon={faDownload} size="lg" color="#3b82f6" />
                    </button>
                ) : (
                    <span className="text-red-500">Sin archivo</span>
                )}
            </td>

            <td className="h-[90px] w-[90px] px-8">
                <button onClick={() => setImageView(true)} className="h-10 w-10 rounded-md border border-blue-500 px-2 py-1 text-white">
                    <FontAwesomeIcon icon={faPen} size="lg" color="#3b82f6" />
                </button>
            </td>

            <td className="flex h-[90px] items-center justify-center">
                <Switch status={producto?.featured == 1} id={producto?.id} routeName={'admin.productos.changeFeatured'} />
            </td>

            <td className="w-[140px] text-center">
                <div className="flex flex-row justify-center gap-3">
                    <button onClick={() => setEdit(true)} className="h-10 w-10 rounded-md border border-blue-500 px-2 py-1 text-white">
                        <FontAwesomeIcon icon={faPen} size="lg" color="#3b82f6" />
                    </button>
                    <button onClick={deleteProducto} className="h-10 w-10 rounded-md border border-red-500 px-2 py-1 text-white">
                        <FontAwesomeIcon icon={faTrash} size="lg" color="#fb2c36" />
                    </button>
                </div>
            </td>

            {/* Modal de edición de producto */}
            <AnimatePresence>
                {edit && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/50 text-left"
                    >
                        <form onSubmit={handleUpdate} method="POST" className="text-black">
                            <div className="max-h-[90vh] w-[500px] overflow-y-auto rounded-md bg-white p-4">
                                <h2 className="mb-4 text-2xl font-semibold">Crear Producto</h2>
                                <div className="flex flex-col gap-4">
                                    <label htmlFor="ordennn">Orden</label>
                                    <input
                                        className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                        type="text"
                                        name="ordennn"
                                        id="ordennn"
                                        value={updateForm?.data?.order}
                                        onChange={(e) => updateForm.setData('order', e.target.value)}
                                    />
                                    <label htmlFor="nombree">
                                        Nombre <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                        type="text"
                                        name="nombree"
                                        id="nombree"
                                        value={updateForm?.data?.name}
                                        onChange={(e) => updateForm.setData('name', e.target.value)}
                                    />

                                    <label htmlFor="descripcion">
                                        Descripcion <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                        type="text"
                                        name="descripcion"
                                        id="descripcion"
                                        value={updateForm?.data?.description}
                                        onChange={(e) => updateForm.setData('description', e.target.value)}
                                    />

                                    <label htmlFor="recom">
                                        Recomendaciones de uso <span className="text-red-500">*</span>
                                    </label>

                                    <CustomReactQuill value={text} onChange={setText} />

                                    <label className="">Barra 1</label>
                                    <input
                                        className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                        type="text"
                                        placeholder="Introduzca el nombre de la barra 1"
                                        name="barra_uno"
                                        id="barra_uno"
                                        value={updateForm.data.barra_uno}
                                        onChange={(e) => updateForm.setData('barra_uno', e.target.value)}
                                    />
                                    <input
                                        type="range"
                                        min={0}
                                        max={10}
                                        value={updateForm.data.temperatura}
                                        onChange={(e) => updateForm.setData('temperatura', e.target.value)}
                                        className="w-full cursor-pointer"
                                    />

                                    <label className="">Barra 2</label>
                                    <input
                                        className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                        type="text"
                                        placeholder="Introduzca el nombre de la barra 2"
                                        name="barra_dos"
                                        id="barra_dos"
                                        onChange={(e) => updateForm.setData('barra_dos', e.target.value)}
                                        value={updateForm.data.barra_dos}
                                    />
                                    <input
                                        type="range"
                                        min={0}
                                        max={10}
                                        value={updateForm.data.desgaste}
                                        onChange={(e) => updateForm.setData('desgaste', e.target.value)}
                                        className="w-full cursor-pointer"
                                    />

                                    <label className="">Barra 3</label>
                                    <input
                                        className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                        type="text"
                                        placeholder="Introduzca el nombre de la barra 3"
                                        name="barra_tres"
                                        id="barra_tres"
                                        value={updateForm.data.barra_tres}
                                        onChange={(e) => updateForm.setData('barra_tres', e.target.value)}
                                    />
                                    <input
                                        type="range"
                                        min={0}
                                        max={10}
                                        value={updateForm.data.confort}
                                        onChange={(e) => updateForm.setData('confort', e.target.value)}
                                        className="w-full cursor-pointer"
                                    />

                                    <label htmlFor="archivo">
                                        Tabla de medidas <span className="text-red-500">*</span>
                                    </label>

                                    <input
                                        onChange={(e) => updateForm.setData('archivo', e.target.files[0])}
                                        type="file"
                                        className="file:border"
                                        name=""
                                        id=""
                                    />

                                    <label htmlFor="categoria">Categoria</label>
                                    <select
                                        className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                        value={currentCategory}
                                        onChange={(e) => setCurrentCategory(e.target.value)}
                                        name=""
                                        id=""
                                    >
                                        <option value="">Seleccione una categoria</option>
                                        {categorias?.map((categoria) => (
                                            <option key={categoria.id} value={categoria.id}>
                                                {categoria.title}
                                            </option>
                                        ))}
                                    </select>
                                    <label htmlFor="categoria">Sub-categoria</label>
                                    <select
                                        className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                        value={updateForm.data.sub_categoria_id}
                                        onChange={(e) => updateForm.setData('sub_categoria_id', e.target.value)}
                                        name=""
                                        id=""
                                    >
                                        <option value="">Seleccione una sub-categoria</option>
                                        {sub_categorias
                                            ?.filter((sub) => sub?.categoria_id == currentCategory)
                                            ?.map((subcategoria) => (
                                                <option key={subcategoria.id} value={subcategoria.id}>
                                                    {subcategoria.title}
                                                </option>
                                            ))}
                                    </select>

                                    <label htmlFor="medida">Medida</label>
                                    <select
                                        className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                        value={updateForm.data.medida_id}
                                        onChange={(e) => updateForm.setData('medida_id', e.target.value)}
                                        name=""
                                        id=""
                                    >
                                        <option value="">Seleccione una medida</option>
                                        {medidas?.map((medida) => (
                                            <option key={medida.id} value={medida.id}>
                                                {medida.name}
                                            </option>
                                        ))}
                                    </select>

                                    <div className="flex justify-end gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setEdit(false)}
                                            className="border-primary-color text-primary-color hover:bg-primary-color rounded-md border px-2 py-1 transition duration-300 hover:text-white"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="border-primary-color text-primary-color hover:bg-primary-color rounded-md border px-2 py-1 transition duration-300 hover:text-white"
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal de imágenes */}
            <AnimatePresence>
                {imageView && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/50 text-left"
                    >
                        <form onSubmit={handleProdImage} method="POST" className="text-black">
                            <div className="max-h-[90vh] w-[640px] overflow-y-auto rounded-md bg-white p-4">
                                <h2 className="mb-4 text-2xl font-semibold">Imagenes de producto</h2>
                                <div className="w-full">
                                    <div className="grid w-full grid-cols-4 bg-gray-200 py-1 text-center">
                                        <p>ORDEN</p>
                                        <p>IMAGEN</p>
                                        <p>PORTADA</p>
                                        <p>OPERACIONES</p>
                                    </div>

                                    {producto?.imagenes?.length > 0 ? (
                                        imagenesOrdenadas.map((imagen) => (
                                            <div
                                                key={imagen.id}
                                                className="grid w-full grid-cols-4 items-center justify-items-center py-2 text-center"
                                            >
                                                <input
                                                    type="text"
                                                    className="w-[60px] rounded-md border px-1 py-0.5 text-center outline-none"
                                                    value={imageOrders[imagen.id] ?? ''}
                                                    onChange={(e) => handleOrderChange(imagen.id, e.target.value)}
                                                />
                                                <img
                                                    src={imagen?.image}
                                                    alt={imagen?.name || 'imagen'}
                                                    className="h-[50px] w-[50px] rounded-md object-contain"
                                                />
                                                <p>
                                                    <Switch status={imagen?.portada == 1} id={imagen.id} routeName="admin.imagenes.changePortada" />
                                                </p>
                                                <div className="flex flex-row gap-2">
                                                    <button type="button" onClick={() => updateImage(imagen.id)} className="text-blue-500">
                                                        Guardar
                                                    </button>
                                                    /
                                                    <button type="button" onClick={() => deleteImage(imagen.id)} className="text-red-500">
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="pb-5">Sin Imagenes</p>
                                    )}
                                </div>

                                <h2 className="mt-6 mb-4 text-2xl font-semibold">Cargar nueva imagen</h2>
                                <div className="flex flex-col gap-4">
                                    <label htmlFor="ordennn">Orden</label>
                                    <input
                                        className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                        type="text"
                                        name="ordennn"
                                        id="ordennn"
                                        onChange={(e) => imageForm.setData('order', e.target.value)}
                                    />
                                    <label htmlFor="imageges">
                                        Imagen<span className="text-red-500">*</span>
                                    </label>
                                    <span className="text-base font-normal">Resolucion recomendada: 501x181px</span>
                                    <div className="flex flex-col">
                                        <div className="flex flex-row">
                                            <input
                                                type="file"
                                                name="imagen"
                                                id="imageges"
                                                onChange={(e) => imageForm.setData('image', e.target.files[0])}
                                                className="hidden"
                                            />
                                            <label
                                                className={`border-primary-color text-primary-color hover:bg-primary-color cursor-pointer rounded-md border px-2 py-1 transition duration-300 hover:text-white ${
                                                    imageForm.errors.image ? 'border-red-500 text-red-500' : ''
                                                }`}
                                                htmlFor="imageges"
                                            >
                                                Elegir Imagen
                                            </label>
                                            <p className="self-center px-2">{imageForm.data?.image?.name}</p>
                                        </div>
                                        {imageForm.errors.image && <p className="mt-1 text-xs text-red-500">{imageForm.errors.image}</p>}
                                    </div>

                                    <div className="flex justify-end gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setImageView(false)}
                                            className="border-primary-color text-primary-color hover:bg-primary-color rounded-md border px-2 py-1 transition duration-300 hover:text-white"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="border-primary-color text-primary-color hover:bg-primary-color rounded-md border px-2 py-1 transition duration-300 hover:text-white"
                                        >
                                            Agregar imagen
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal de características */}
            <AnimatePresence>
                {caracteristicas && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/50 text-left"
                    >
                        <div className="relative max-h-[90vh] w-fit overflow-y-auto rounded-md bg-white p-4">
                            <button
                                className="absolute top-0 right-0 m-2 rounded-md bg-red-500 p-2 text-white"
                                onClick={() => setCaracteristicas(false)}
                            >
                                <X color="#fff" />
                            </button>
                            <h2 className="text-lg font-semibold">Características</h2>
                            {producto?.caracteristicas?.length > 0 ? (
                                <table className="my-10 w-full border text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                                    <thead className="bg-gray-300 text-sm font-medium text-black uppercase">
                                        <tr>
                                            <th className="px-4 py-2 text-center">Orden</th>
                                            <th className="px-4 py-2 text-center">Imagen</th>
                                            <th className="px-4 py-2 text-center">Operaciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {producto?.caracteristicas?.map((caracteristica) => (
                                            <tr key={caracteristica.id}>
                                                <td className="px-4 py-2 text-center">{caracteristica?.order}</td>
                                                <td className="flex items-center justify-center px-4 py-2">
                                                    <img src={caracteristica?.image} alt={caracteristica?.name} className="h-12 w-12 object-cover" />
                                                </td>
                                                <td className="px-4 py-2 text-center">
                                                    <button
                                                        onClick={() => deleteImage(caracteristica.id)}
                                                        className="self-end rounded-md bg-red-500 px-2 py-1 text-white"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <p className="pb-5">Sin Caracteristicas</p>
                                </div>
                            )}
                            <form onSubmit={agregarCarac} className="flex flex-row gap-10" action="">
                                <div className="flex flex-col">
                                    <label htmlFor="orden">Orden</label>
                                    <input
                                        className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                        type="text"
                                        id="orden"
                                        value={caracForm.order}
                                        onChange={(e) => caracForm.setData('order', e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="imagen">Imagen</label>
                                    <input
                                        className="file:bg-primary-color h-full file:cursor-pointer file:rounded-md file:px-4 file:py-2 file:text-white"
                                        type="file"
                                        id="imagen"
                                        onChange={(e) => caracForm.setData('image', e.target.files[0])}
                                    />
                                </div>
                                <button className="bg-primary-color self-end rounded-md px-4 py-2 text-white">Agregar</button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </tr>
    );
}
