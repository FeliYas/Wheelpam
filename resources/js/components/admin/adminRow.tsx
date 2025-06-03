import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function AdminRow({ admin }) {
    const [edit, setEdit] = useState(false);

    const updateForm = useForm({
        name: admin?.name,

        id: admin?.id,
    });

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateForm.post(route('admin.administradores.update'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Administrador actualizado correctamente');
                setEdit(false);
            },
            onError: (errors) => {
                toast.error('Error al actualizar administrador');
                console.log(errors);
            },
        });
    };

    const deleteMarca = () => {
        if (confirm('¿Estas seguro de eliminar esta medida?')) {
            updateForm.delete(route('admin.administradores.destroy'), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Admin eliminada correctamente');
                },
                onError: (errors) => {
                    toast.error('Error al eliminar admin');
                    console.log(errors);
                },
            });
        }
    };

    return (
        <tr className={`border text-black odd:bg-gray-100 even:bg-white`}>
            <td className="h-[90px] align-middle">{admin?.name}</td>

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
                                <h2 className="mb-4 text-2xl font-semibold">Crear Administrador</h2>
                                <div className="flex flex-col gap-4">
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

                                    <label htmlFor="contra">
                                        Contraseña <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                        type="password"
                                        name="contra"
                                        id="contra"
                                        onChange={(e) => updateForm.setData('password', e.target.value)}
                                    />
                                    {/* confirmar contrase */}
                                    <label htmlFor="confirmar_contra">
                                        Confirmar contraseña <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                        type="password"
                                        name="confirmar_contra"
                                        id="confirmar_contra"
                                        onChange={(e) => updateForm.setData('password_confirmation', e.target.value)}
                                    />

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
