import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CustomReactQuill from '../customReactQuill';

export default function ServiciosAdminRow({ servicio }) {
    const [edit, setEdit] = useState(false);

    const [text, setText] = useState(servicio?.text || '');

    const updateForm = useForm({
        title: servicio?.title,
        order: servicio?.order,
        id: servicio?.id,
    });

    useEffect(() => {
        updateForm.setData('text', text);
    }, [text]);

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateForm.post(route('admin.servicios.update'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Servicio actualizada correctamente');
                setEdit(false);
            },
            onError: (errors) => {
                toast.error('Error al actualizar servicio');
                console.log(errors);
            },
        });
    };

    const deleteMarca = () => {
        if (confirm('¿Estas seguro de eliminar esta servicio?')) {
            updateForm.delete(route('admin.servicios.destroy'), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Servicio eliminado correctamente');
                },
                onError: (errors) => {
                    toast.error('Error al eliminar servicio');
                    console.log(errors);
                },
            });
        }
    };

    return (
        <tr className={`border text-black odd:bg-gray-100 even:bg-white`}>
            <td className="align-middle">{servicio?.order}</td>
            <td className="h-[90px] w-[90px] px-8">
                <img className="min-h-[50px] min-w-[50px] object-contain" src={servicio?.icon} alt="" />
            </td>
            <td className="align-middle">{servicio?.title}</td>
            <td>
                <div dangerouslySetInnerHTML={{ __html: servicio?.text }} />
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
                        <form onSubmit={handleUpdate} method="POST" className="max-h-[90vh] overflow-y-auto text-black">
                            <div className="w-[500px] rounded-md bg-white p-4">
                                <h2 className="mb-4 text-2xl font-semibold">Actualizar Servicio</h2>
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
                                    <label htmlFor="imagenn">Icono</label>

                                    <span className="text-base font-normal">Resolucion recomendada: 501x181px</span>
                                    <div className="flex flex-row">
                                        <input
                                            type="file"
                                            name="imagen"
                                            id="imagenn"
                                            onChange={(e) => updateForm.setData('icon', e.target.files[0])}
                                            className="hidden"
                                        />
                                        <label
                                            className="border-primary-color text-primary-color hover:bg-primary-color cursor-pointer rounded-md border px-2 py-1 transition duration-300 hover:text-white"
                                            htmlFor="imagenn"
                                        >
                                            Elegir Icono
                                        </label>
                                        <p className="self-center px-2">{updateForm?.data?.icon?.name}</p>
                                    </div>
                                    <label htmlFor="nombree">
                                        Titulo <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        value={updateForm?.data?.title}
                                        className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                        type="text"
                                        name="nombree"
                                        id="nombree"
                                        onChange={(e) => updateForm.setData('title', e.target.value)}
                                    />

                                    <label htmlFor="nombree">
                                        Texto <span className="text-red-500">*</span>
                                    </label>
                                    <CustomReactQuill value={text} onChange={setText} />

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
                                            Actualizar
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
