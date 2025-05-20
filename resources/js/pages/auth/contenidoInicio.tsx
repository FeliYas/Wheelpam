import CustomReactQuill from '@/components/customReactQuill';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Dashboard from '../dashboard';

export default function ContenidoInicio() {
    const { contenidoInicio } = usePage().props;

    const [nosotrosText, setNosotrosText] = useState(contenidoInicio?.nosotros_text || '');
    const [garantiaText, setGarantiaText] = useState(contenidoInicio?.garantia_text || '');

    const { data, setData, post, reset, errors, processing } = useForm({
        nosotros_title: contenidoInicio?.nosotros_title || '',
        garantia_title: contenidoInicio?.garantia_title || '',
    });

    useEffect(() => {
        setData('nosotros_text', nosotrosText);
        setData('garantia_text', garantiaText);
    }, [nosotrosText, garantiaText]);

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('admin.contenidoInicio.update'), {
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
                    <h2 className="border-primary-color text-primary-color text-bold w-full border-b-2 text-2xl">Nosotros</h2>
                    <div className="w-full">
                        <label htmlFor="nosotros_image" className="block text-xl font-medium text-gray-900">
                            Logo Nosotros
                        </label>
                        <div className="mt-2 flex justify-between rounded-lg border shadow-lg">
                            <div className="h-[200px] w-1/2 bg-[rgba(0,0,0,0.2)]">
                                <img className="h-full w-full rounded-md object-contain" src={contenidoInicio?.nosotros_image} alt="" />
                            </div>
                            <div className="flex w-1/2 items-center justify-center">
                                <div className="h-fit items-center self-center text-center">
                                    <div className="relative mt-4 flex flex-col items-center text-sm/6 text-gray-600">
                                        <label
                                            htmlFor="nosotros_image"
                                            className="bg-primary-color relative cursor-pointer rounded-md px-2 py-1 font-semibold text-white"
                                        >
                                            <span>Cambiar Imagen</span>
                                            <input
                                                id="nosotros_image"
                                                name="nosotros_image"
                                                onChange={(e) => setData('nosotros_image', e.target.files[0])}
                                                type="file"
                                                className="sr-only"
                                            />
                                        </label>
                                        <p className="absolute top-10 max-w-[200px] break-words"> {data?.nosotros_image?.name} </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xl" htmlFor="nosotros_title">
                            Titulo
                        </label>
                        <input
                            className={`focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline ${
                                errors.nosotros_title ? 'outline-red-500' : ''
                            }`}
                            type="text"
                            name="nosotros_title"
                            id="nosotros_title"
                            value={contenidoInicio?.nosotros_title}
                            onChange={(e) => setData('nosotros_title', e.target.value)}
                        />
                        {errors.nosotros_title && <p className="mt-1 text-xs text-red-500">{errors.nosotros_title}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xl" htmlFor="nosotros_title">
                            Texto
                        </label>
                        <CustomReactQuill value={nosotrosText} onChange={setNosotrosText} />
                        {errors.nosotros_title && <p className="mt-1 text-xs text-red-500">{errors.nosotros_title}</p>}
                    </div>
                </div>

                <div className="flex w-full flex-col gap-4">
                    <h2 className="border-primary-color text-primary-color text-bold w-full border-b-2 text-2xl">Garantia</h2>
                    <div className="w-full">
                        <label htmlFor="nosotros_image" className="block text-xl font-medium text-gray-900">
                            Logo Garantia
                        </label>
                        <div className="mt-2 flex justify-between rounded-lg border shadow-lg">
                            <div className="h-[200px] w-1/2 bg-[rgba(0,0,0,0.2)]">
                                <img className="h-full w-full rounded-md object-contain" src={contenidoInicio?.garantia_image} alt="" />
                            </div>
                            <div className="flex w-1/2 items-center justify-center">
                                <div className="h-fit items-center self-center text-center">
                                    <div className="relative mt-4 flex flex-col items-center text-sm/6 text-gray-600">
                                        <label
                                            htmlFor="garantia"
                                            className="bg-primary-color relative cursor-pointer rounded-md px-2 py-1 font-semibold text-white"
                                        >
                                            <span>Cambiar Imagen</span>
                                            <input
                                                id="garantia"
                                                name="garantia"
                                                onChange={(e) => setData('garantia_image', e.target.files[0])}
                                                type="file"
                                                className="sr-only"
                                            />
                                        </label>
                                        <p className="absolute top-10 max-w-[200px] break-words"> {data?.garantia_image?.name} </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xl" htmlFor="garantia_title">
                            Titulo
                        </label>
                        <input
                            className={`focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline ${
                                errors.garantia_title ? 'outline-red-500' : ''
                            }`}
                            type="text"
                            name="garantia_title"
                            id="garantia_title"
                            value={contenidoInicio?.garantia_title}
                            onChange={(e) => setData('garantia_title', e.target.value)}
                        />
                        {errors.garantia_title && <p className="mt-1 text-xs text-red-500">{errors.garantia_title}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xl" htmlFor="garantia_text">
                            Texto
                        </label>
                        <CustomReactQuill value={garantiaText} onChange={setGarantiaText} />
                        {errors.garantia_text && <p className="mt-1 text-xs text-red-500">{errors.garantia_text}</p>}
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
