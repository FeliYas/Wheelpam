import { useForm, usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';
import Dashboard from '../dashboard';

export default function GarantiaBanner() {
    const { garantia } = usePage().props;

    const { data, setData, processing, post, reset } = useForm();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('admin.garantia.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast.success('Contenido actualizado correctamente');
            },
            onError: (errors) => {
                toast.error('Error al actualizar contenido');
                console.log(errors);
            },
        });
    };

    return (
        <Dashboard>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6">
                <h2 className="border-primary-color text-primary-color text-bold w-full border-b-2 text-2xl">Banner</h2>

                <div className="col-span-2 w-full">
                    <label htmlFor="logoprincipal" className="block font-semibold text-gray-900">
                        Banner:
                        <br />
                        <span className="text-base font-normal">Resolucion recomendada: 1654x216 px</span>
                    </label>
                    <div className="mt-2 flex justify-between rounded-lg border shadow-lg">
                        <div className="h-[200px] w-2/3 bg-[rgba(0,0,0,0.2)]">
                            <img className="h-full w-full rounded-md object-cover" src={garantia?.banner} alt="" />
                        </div>
                        <div className="flex w-1/3 items-center justify-center">
                            <div className="h-fit items-center self-center text-center">
                                <div className="relative mt-4 flex flex-col items-center text-sm/6 text-gray-600">
                                    <label
                                        htmlFor="bannerImage"
                                        className="bg-primary-red relative cursor-pointer rounded-md px-2 py-1 font-semibold text-black"
                                    >
                                        <span>Cambiar Imagen</span>
                                        <input
                                            id="bannerImage"
                                            name="bannerImage"
                                            onChange={(e) => setData('banner', e.target.files[0])}
                                            type="file"
                                            className="sr-only"
                                        />
                                    </label>
                                    <p className="absolute top-10 max-w-[200px] break-words"> {data?.banner?.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20 flex w-full justify-end">
                    <button className="hover:bg-primary-color text-primary-color border-primary-color rounded-full border px-4 py-2 font-bold transition hover:text-white">
                        Actualizar
                    </button>
                </div>
            </form>
        </Dashboard>
    );
}
