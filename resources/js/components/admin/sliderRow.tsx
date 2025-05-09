import { faPen, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function SliderRow({ sliderObject }) {
    const [edit, setEdit] = useState(false);

    const updateForm = useForm({
        name: sliderObject.name,
        password: '',
        password_confirmation: '',
    });

    const update = (ev) => {
        ev.preventDefault();

        // Crear un objeto con solo los datos que queremos enviar
        const dataToSend = {
            name: updateForm.data.name,
        };

        // Añadir campos de contraseña solo si no están vacíos
        if (updateForm.data.password) {
            dataToSend.password = updateForm.data.password;
        }

        if (updateForm.data.password_confirmation) {
            dataToSend.password_confirmation = updateForm.data.password_confirmation;
        }

        // Usar el método post directamente con los datos filtrados
        router.put(route('admin.update', sliderObject?.id), dataToSend, {
            onSuccess: () => {
                toast.success('Administrador actualizado correctamente');
                setEdit(false);
            },
            onError: (errors) => {
                toast.error('Error al actualizar el administrador');
                console.log(errors);
            },
        });
    };

    const deleteAdmin = () => {
        router.delete(route('admin.destroy', sliderObject?.id), {
            onSuccess: () => {
                toast.success('Administrador eliminado correctamente');
            },
            onError: (errors) => {
                toast.error('Error al eliminar el administrador');
            },
        });
        setEdit(false);
    };

    return (
        <>
            <tr className={`h-[134px] border-b text-black ${sliderObject?.id % 2 === 0 ? 'bg-gray-200' : 'bg-white'}`}>
                <td className="max-w-[340px] overflow-x-auto px-6 py-4 text-center font-medium whitespace-nowrap text-black">{sliderObject.name}</td>
                <td className="text-center">
                    <div className="flex flex-row justify-center gap-3">
                        <button onClick={() => setEdit(true)} className="h-10 w-10 rounded-md border border-blue-500 px-2 py-1 text-white">
                            <FontAwesomeIcon icon={faPen} size="lg" color="#3b82f6" />
                        </button>
                        <button type="button" onClick={deleteAdmin} className="h-10 w-10 rounded-md border border-[#bc1d31] px-2 py-1 text-white">
                            <FontAwesomeIcon icon={faTrash} size="lg" color="#bc1d31" />
                        </button>
                    </div>
                </td>
            </tr>
            {edit && (
                <>
                    <div className="fixed top-0 left-0 z-50 h-screen w-screen bg-black opacity-50"></div>
                    <div className="font-roboto-condensed fixed top-1/2 right-10 left-1/2 z-50 mb-20 flex h-fit w-fit -translate-x-1/2 -translate-y-1/2 transform flex-col gap-2 border bg-white p-5 text-black shadow-md">
                        <button onClick={() => setEdit(!edit)} className="self-end">
                            <FontAwesomeIcon icon={faXmark} size="lg" />
                        </button>
                        <h2 className="py-5 text-[24px] font-bold">Actualizar Administrador</h2>
                        <form onSubmit={update} className="flex h-full w-fit flex-col justify-around gap-3" action="">
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="user">Usuario</label>
                                    <input
                                        value={updateForm.data.name}
                                        onChange={(ev) => updateForm.setData('name', ev.target.value)}
                                        className={`h-[45px] w-[328px] border pl-2 ${updateForm.errors.name ? 'border-red-500' : ''}`}
                                        type="text"
                                        name="user"
                                        id="user"
                                    />
                                    {updateForm.errors.name && <div className="mt-1 text-sm text-red-500">{updateForm.errors.name}</div>}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="password">Contraseña</label>
                                    <input
                                        value={updateForm.data.password}
                                        onChange={(ev) => updateForm.setData('password', ev.target.value)}
                                        className={`h-[45px] w-[328px] border pl-2 ${updateForm.errors.password ? 'border-red-500' : ''}`}
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Dejar en blanco para mantener la contraseña actual"
                                    />
                                    {updateForm.errors.password && (
                                        <div className="mt-1 max-w-[340px] text-sm break-words text-red-500">{updateForm.errors.password}</div>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="password_confirmation">Confirmar Contraseña</label>
                                    <input
                                        value={updateForm.data.password_confirmation}
                                        onChange={(ev) => updateForm.setData('password_confirmation', ev.target.value)}
                                        className={`h-[45px] w-[328px] border pl-2 ${
                                            updateForm.errors.password_confirmation ? 'border-red-500' : ''
                                        }`}
                                        type="password"
                                        name="password_confirmation"
                                        id="password_confirmation"
                                        placeholder="Dejar en blanco para mantener la contraseña actual"
                                    />
                                    {updateForm.errors.password_confirmation && (
                                        <div className="mt-1 text-sm text-red-500">{updateForm.errors.password_confirmation}</div>
                                    )}
                                </div>
                            </div>

                            <button className="bg-primary-orange my-5 h-[47px] w-[325px] self-center text-white" type="submit">
                                Actualizar
                            </button>
                        </form>
                    </div>
                </>
            )}
        </>
    );
}
