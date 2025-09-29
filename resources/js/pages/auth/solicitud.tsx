import CustomReactQuill from '@/components/customReactQuill';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Dashboard from '../dashboard';

export default function SolicitudAdmin() {
    const { solicitud } = usePage().props;
    const [solicitudText, setSolicitudText] = useState(solicitud?.text || '');
    const [titulo, setTitulo] = useState(solicitud?.titulo || '');

    const { data, setData, post, reset, errors, processing } = useForm({
        titulo: solicitud?.titulo || '',
        text: solicitud?.text || '',
    });

    useEffect(() => {
        setData('titulo', titulo);
        setData('text', solicitudText);
    }, [solicitudText, titulo]);

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('admin.solicitud.update'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Actualizado correctamente');
                reset();
            },
            onError: (errors) => {
                toast.error(`Error al actualizar: \n${Object.values(errors).join('\n')}`);
                console.log(errors);
            },
        });
    };

    return (
        <Dashboard>
            <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5 p-6">
                <div className="flex w-full flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="titulo" className="font-bold">Título de la Solicitud</label>
                        <input
                            type="text"
                            id="titulo"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            className="w-full rounded border border-gray-300 bg-white px-3 py-2 focus:border-primary-color focus:outline-none"
                        />
                        <CustomReactQuill value={solicitudText} onChange={setSolicitudText} />
                        {errors.text && <p className="mt-1 text-xs text-red-500">{errors.text}</p>}
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className={`${
                            processing ? 'cursor-not-allowed opacity-50' : ''
                        } bg-primary-color hover:bg-primary-color/80 rounded px-4 py-2 font-bold text-white focus:outline-none`}
                        disabled={processing}
                    >
                        {processing ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </div>
            </form>
        </Dashboard>
    );
}
