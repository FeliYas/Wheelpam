import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CustomReactQuill from '../customReactQuill';
import Switch from '../switch';

export default function ProductoAdminRow({ producto }) {
    const [edit, setEdit] = useState(false);
    const [imageView, setImageView] = useState(false);
    const [text, setText] = useState(producto?.recomendaciones || '');
    const [caracteristicas, setCaracteristicas] = useState(false);

    const updateForm = useForm({
        order: producto?.order,
        name: producto?.name,
        type: producto?.type,
        recomendaciones: producto?.recomendaciones,
        sub_categoria_id: producto?.sub_categoria_id,
        id: producto?.id,
    });

    const imageForm = useForm({
        producto_id: producto?.id,
    });

    const handleProdImage = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                toast.success('Producto actualizada correctamente');
                setEdit(false);
            },
            onError: (errors) => {
                toast.error('Error al actualizar producto');
                console.log(errors);
            },
        });
    };

    const deleteMarca = () => {
        if (confirm('¿Estas seguro de eliminar esta producto?')) {
            updateForm.delete(route('admin.marcas.destroy'), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Producto eliminada correctamente');
                },
                onError: (errors) => {
                    toast.error('Error al eliminar producto');
                    console.log(errors);
                },
            });
        }
    };

    const deleteImage = (imageId) => {
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

    return (
        <tr className={`border text-black odd:bg-gray-100 even:bg-white`}>
            <td className="align-middle">{producto?.order}</td>
            <td className="align-middle">{producto?.name}</td>
            <td className="align-middle">{producto?.type}</td>
            <td className="h-[90px] w-[90px] px-8">
                <button onClick={() => setImageView(true)} className="h-10 w-10 rounded-md border border-blue-500 px-2 py-1 text-white">
                    <FontAwesomeIcon icon={faPen} size="lg" color="#3b82f6" />
                </button>
            </td>
            <td className="align-middle">
                <div dangerouslySetInnerHTML={{ __html: producto?.recomendaciones }} />
            </td>

            <td className="h-[90px] w-[90px] px-8">
                <button onClick={() => setCaracteristicas(true)} className="h-10 w-10 rounded-md border border-blue-500 px-2 py-1 text-white">
                    <FontAwesomeIcon icon={faPen} size="lg" color="#3b82f6" />
                </button>
            </td>

            <td className="h-[90px] w-[90px] px-8">
                <button onClick={() => set(true)} className="h-10 w-10 rounded-md border border-blue-500 px-2 py-1 text-white">
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
                    <button onClick={deleteMarca} className="h-10 w-10 rounded-md border border-red-500 px-2 py-1 text-white">
                        <FontAwesomeIcon icon={faTrash} size="lg" color="#fb2c36" />
                    </button>
                </div>
            </td>
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

                                    <label htmlFor="type">
                                        Tipo <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                        type="text"
                                        name="type"
                                        id="type"
                                        value={updateForm?.data?.type}
                                        onChange={(e) => updateForm.setData('type', e.target.value)}
                                    />
                                    <label htmlFor="recom">
                                        Recomendaciones de uso <span className="text-red-500">*</span>
                                    </label>

                                    <CustomReactQuill value={text} onChange={setText} />

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
                                    {/* <select
                                    className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                    onChange={(e) => setEdit(e.target.value)}
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
                                    onChange={(e) => updateForm.setData('sub_categoria_id', e.target.value)}
                                    name=""
                                    id=""
                                >
                                    <option value="">Seleccione una sub-categoria</option>
                                    {subcategorias
                                        ?.filter((sub) => sub?.categoria_id == currentCategory)
                                        ?.map((subcategoria) => (
                                            <option key={subcategoria.id} value={subcategoria.id}>
                                                {subcategoria.title}
                                            </option>
                                        ))}
                                </select> */}

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
            <AnimatePresence>
                {imageView && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/50 text-left"
                    >
                        <form onSubmit={handleProdImage} method="POST" className="text-black">
                            <div className="max-h-[90vh] w-[500px] overflow-y-auto rounded-md bg-white p-4">
                                <h2 className="mb-4 text-2xl font-semibold">Imagenes de producto</h2>
                                <div className="flex w-full flex-row gap-2">
                                    {producto?.imagenes?.length > 0 ? (
                                        producto?.imagenes?.map((imagen) => (
                                            <div key={imagen.id} className="relative mb-4 flex h-[50px] w-[50px] flex-col gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => deleteImage(imagen.id)}
                                                    className="absolute top-0 flex h-full w-full items-center justify-center rounded-md bg-black/30"
                                                >
                                                    <FontAwesomeIcon icon={faTrash} color="#ef3620" size="lg" />
                                                </button>
                                                <img src={imagen?.image} alt={imagen?.name} className="h-full w-full rounded-md object-contain" />
                                            </div>
                                        ))
                                    ) : (
                                        <p className="pb-5">Sin Imagenes</p>
                                    )}
                                </div>
                                <h2 className="mb-4 text-2xl font-semibold">Cargar nueva imagen</h2>
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
            <AnimatePresence>
                {caracteristicas && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/50 text-left"
                    >
                        <div className="max-h-[90vh] w-fit overflow-y-auto rounded-md bg-white p-4">
                            {producto?.caracteristicas?.length > 0 ? (
                                producto?.caracteristicas?.map((caracteristica) => (
                                    <div key={caracteristica.id} className="mb-4 flex flex-col gap-2">
                                        <h3 className="text-lg font-semibold">{caracteristica?.name}</h3>
                                        <p className="text-sm">{caracteristica?.description}</p>
                                        <button
                                            onClick={() => deleteImage(caracteristica.id)}
                                            className="self-end rounded-md bg-red-500 px-2 py-1 text-white"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="pb-5">Sin Caracteristicas</p>
                            )}
                            <form className="flex flex-row gap-10" action="">
                                <div className="flex flex-col">
                                    <label htmlFor="orden">Orden</label>
                                    <input
                                        className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                        type="text"
                                        id="orden"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="imagen">Imagen</label>
                                    <input
                                        className="file:bg-primary-color h-full file:rounded-md file:px-4 file:py-2 file:text-white"
                                        type="file"
                                        id="imagen"
                                    />
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </tr>
    );
}
