import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function SubcategoriaAdminRow({ subcategoria }) {
    const [edit, setEdit] = useState(false);

    const { categorias } = usePage().props;

    const updateForm = useForm({
        order: subcategoria?.order,
        title: subcategoria?.title,
        categoria_id: subcategoria?.categoria_id,
        id: subcategoria?.id,
    });

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateForm.post(route('admin.subcategorias.update'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Sub-categoria actualizada correctamente');
                setEdit(false);
            },
            onError: (errors) => {
                toast.error('Error al actualizar sub-categorias');
                console.log(errors);
            },
        });
    };

    const deleteMarca = () => {
        if (confirm('¿Estas seguro de eliminar esta sub-categoria?')) {
            updateForm.delete(route('admin.subcategorias.destroy'), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Sub-categoria eliminada correctamente');
                },
                onError: (errors) => {
                    toast.error('Error al eliminar sub-categoria');
                    console.log(errors);
                },
            });
        }
    };

    return (
        <tr className={`border text-black odd:bg-gray-100 even:bg-white`}>
            <td className="align-middle">{subcategoria?.order}</td>
            <td className="align-middle">{subcategoria?.title}</td>
            <td className="h-[90px] align-middle">
                {subcategoria?.image ? (
                    <img src={subcategoria?.image} alt={subcategoria?.title} className="h-full w-full object-cover" />
                ) : (
                    <span>No hay imagen</span>
                )}
            </td>
            <td className="h-[90px] align-middle">{categorias?.find((categoria) => categoria?.id == subcategoria?.categoria_id)?.title}</td>

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
                            <div className="w-[500px] rounded-md bg-white p-4">
                                <h2 className="mb-4 text-2xl font-semibold">Crear Sub-categoria</h2>
                                <div className="flex flex-col gap-4">
                                    <label htmlFor="ordennn">Orden</label>
                                    <input
                                        className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                        type="text"
                                        name="ordennn"
                                        id="ordennn"
                                        defaultValue={subcategoria?.order}
                                        onChange={(e) => updateForm.setData('order', e.target.value)}
                                    />
                                    <label htmlFor="nombree">
                                        Titulo <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                        type="text"
                                        name="nombree"
                                        id="nombree"
                                        defaultValue={subcategoria?.title}
                                        onChange={(e) => updateForm.setData('title', e.target.value)}
                                    />
                                    <span className="text-base font-normal">Resolucion recomendada: 501x181px</span>
                                    <div className="flex flex-row">
                                        <input
                                            type="file"
                                            name="imagen"
                                            id="imagenn"
                                            onChange={(e) => updateForm.setData('image', e.target.files[0])}
                                            className="hidden"
                                        />
                                        <label
                                            className="border-primary-color text-primary-color hover:bg-primary-color cursor-pointer rounded-md border px-2 py-1 transition duration-300 hover:text-white"
                                            htmlFor="imagenn"
                                        >
                                            Elegir imagen
                                        </label>
                                        <p className="self-center px-2">{updateForm?.data?.image?.name}</p>
                                    </div>
                                    <label htmlFor="categoria">
                                        Categoria <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        defaultValue={subcategoria?.categoria_id}
                                        className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                        onChange={(e) => updateForm.setData('categoria_id', e.target.value)}
                                        name=""
                                        id=""
                                    >
                                        {categorias?.map((categoria) => (
                                            <option key={categoria.id} value={categoria.id}>
                                                {categoria.title}
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
        </tr>
    );
}
