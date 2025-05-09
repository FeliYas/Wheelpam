import SliderRow from '@/components/admin/sliderRow';
import { useForm, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Dashboard from '../dashboard';

export default function SliderAdmin() {
    const { slider } = usePage().props;

    const [createView, setCreateView] = useState(false);

    const createForm = useForm({
        order: '',
        title: '',
        subtitle: '',
        media: '',
    });

    const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        // Mostrar toast de carga
        const loadingToast = toast.loading('Procesando solicitud...');

        createForm.post('store', {
            onSuccess: () => {
                // Actualizar el toast de carga a un toast de éxito
                toast.dismiss(loadingToast);
                toast.success('¡Registro creado correctamente!');

                setCreateView(false);
                createForm.reset();
            },
            onError: (errors) => {
                // Actualizar el toast de carga a un toast de error
                toast.dismiss(loadingToast);
                toast.error('Error al crear el registro');

                console.log(errors);
                // No necesitamos hacer nada más aquí porque useForm maneja automáticamente
                // los errores y los pone disponibles a través de createForm.errors
            },
        });
    };

    return (
        <Dashboard>
            <div className="flex h-screen flex-col items-center gap-4 p-6">
                <Toaster />
                <AnimatePresence>
                    {createView && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50"
                        >
                            <form onSubmit={onSubmit} className="flex h-fit w-fit flex-col justify-around gap-3 rounded-md bg-white p-4" action="">
                                <h2 className="py-5 text-[24px] font-bold">Crear Administrador</h2>
                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="user">Usuario</label>
                                        <input
                                            value={createForm.data.name}
                                            onChange={(ev) => createForm.setData('name', ev.target.value)}
                                            className={`h-[45px] w-[328px] border pl-2 ${createForm.errors.name ? 'border-red-500' : ''}`}
                                            type="text"
                                            name="user"
                                            id="user"
                                        />
                                        {createForm.errors.name && <div className="mt-1 text-sm text-red-500">{createForm.errors.name}</div>}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="password">Contraseña</label>
                                        <input
                                            value={createForm.data.password}
                                            onChange={(ev) => createForm.setData('password', ev.target.value)}
                                            className={`h-[45px] w-[328px] border pl-2 ${createForm.errors.password ? 'border-red-500' : ''}`}
                                            type="password"
                                            name="password"
                                            id="password"
                                        />
                                        {createForm.errors.password && <div className="mt-1 text-sm text-red-500">{createForm.errors.password}</div>}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="password_confirmation">Confirmar Contraseña</label>
                                        <input
                                            value={createForm.data.password_confirmation}
                                            onChange={(ev) => createForm.setData('password_confirmation', ev.target.value)}
                                            className={`h-[45px] w-[328px] border pl-2 ${
                                                createForm.errors.password_confirmation ? 'border-red-500' : ''
                                            }`}
                                            type="password"
                                            name="password_confirmation"
                                            id="password_confirmation"
                                        />
                                        {createForm.errors.password_confirmation && (
                                            <div className="mt-1 text-sm text-red-500">{createForm.errors.password_confirmation}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-row justify-end gap-2">
                                    <button
                                        onClick={() => setCreateView(false)}
                                        className="bg-primary-color my-5 self-center rounded-md px-2 py-1 text-white"
                                        type="button"
                                    >
                                        Cancelar
                                    </button>
                                    <button className="bg-primary-color self-center rounded-md px-2 py-1 text-white" type="submit">
                                        Registrar
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="border-primary-color flex w-full flex-row justify-between border-b-2 py-1">
                    <h2 className="border-primary-color text-primary-color text-bold w-full text-2xl">Slider</h2>
                    <button onClick={() => setCreateView(true)} className="bg-primary-color w-[300px] rounded-md px-2 py-1 text-white">
                        Agregar a slider
                    </button>
                </div>

                <table className="w-full border text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="bg-gray-300 text-sm font-medium text-black uppercase">
                        <tr>
                            <td className="text-center">ORDEN</td>
                            <td className="text-center">TITULO</td>
                            <td className="w-[400px] px-3 py-2 text-center">SUBTITULO</td>
                            <td className="text-center">MULTIMEDIA</td>
                            <td className="text-center">EDITAR</td>
                        </tr>
                    </thead>
                    <tbody className="border">
                        {slider.map((info) => (
                            <SliderRow key={info.id} sliderObject={info} />
                        ))}
                    </tbody>
                </table>
            </div>
        </Dashboard>
    );
}
