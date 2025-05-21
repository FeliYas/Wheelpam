import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CustomReactQuill from '../customReactQuill';

export default function ProductoAdminRow({ producto }) {
    const [edit, setEdit] = useState(false);

    const [text, setText] = useState();

    const updateForm = useForm({
        order: producto?.order,
        name: producto?.name,
        type: producto?.type,
        recomendaciones: producto?.recomendaciones,
        sub_categoria_id: producto?.sub_categoria_id,
        id: producto?.id,
    });

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

    return (
        <tr className={`border text-black odd:bg-gray-100 even:bg-white`}>
            <td className="align-middle">{producto?.order}</td>
            <td className="align-middle">{producto?.name}</td>
            <td className="align-middle">{producto?.type}</td>
            <td className="align-middle">
                <div dangerouslySetInnerHTML={{ __html: producto?.recomendaciones }} />
            </td>
            <td>archivo</td>

            <td className="h-[90px] w-[90px] px-8">
                <img className="h-full w-full object-contain" src={producto?.image} alt="" />
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
        </tr>
    );
}
