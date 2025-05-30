import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CustomReactQuill from '../../components/customReactQuill';
import Dashboard from '../dashboard';

export default function Valores() {
    const { valores } = usePage().props;

    const [firstText, setFirstText] = useState(valores?.first_text || '');
    const [secondText, setSecondText] = useState(valores?.first_text || '');
    const [thirdText, setThirdText] = useState(valores?.first_text || '');

    const { data, setData, processing, post, reset } = useForm({
        first_title: '',
        second_title: '',
        third_title: '',
    });

    useEffect(() => {
        setData('first_text', firstText);
        setData('second_text', secondText);
        setData('third_text', thirdText);
    }, [firstText, secondText, thirdText]);

    useEffect(() => {
        setData('first_title', valores?.first_title);
        setData('second_title', valores?.second_title);
        setData('third_title', valores?.third_title);
    }, [valores]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('admin.valores.update'), {
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
            <div className="flex flex-col gap-4 p-6">
                <h2 className="border-primary-color text-primary-color text-bold w-full border-b-2 text-2xl">Valores</h2>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit} action="">
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="first_title">Titulo:</label>
                            <input
                                type="text"
                                id="first_title"
                                value={data?.first_title}
                                onChange={(e) => setData('first_title', e.target.value)}
                                className="rounded-md border border-gray-300 p-2"
                            />
                            <label htmlFor="first_text">Texto:</label>
                            <CustomReactQuill onChange={setFirstText} value={firstText} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="second_title">Titulo:</label>
                            <input
                                type="text"
                                id="second_title"
                                value={data?.second_title}
                                onChange={(e) => setData('second_title', e.target.value)}
                                className="rounded-md border border-gray-300 p-2"
                            />
                            <label htmlFor="second_text">Texto:</label>
                            <CustomReactQuill onChange={setSecondText} value={secondText} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="third_title">Titulo:</label>
                            <input
                                type="text"
                                id="third_title"
                                value={data?.third_title}
                                onChange={(e) => setData('third_title', e.target.value)}
                                className="rounded-md border border-gray-300 p-2"
                            />
                            <label htmlFor="third_text">Texto:</label>
                            <CustomReactQuill onChange={setThirdText} value={thirdText} />
                        </div>
                    </div>

                    <h2 className="border-primary-color text-primary-color text-bold w-full border-b-2 text-2xl">Video</h2>
                    <div className="col-span-2 w-full">
                        <div className="mt-2 flex justify-between rounded-lg border shadow-lg">
                            <div className="h-[200px] w-2/3 bg-[rgba(0,0,0,0.2)]">
                                <video className="h-full w-full object-contain" controls muted autoPlay src={valores?.video}></video>
                            </div>
                            <div className="flex w-1/3 items-center justify-center">
                                <div className="h-fit items-center self-center text-center">
                                    <div className="relative mt-4 flex flex-col items-center text-sm/6 text-gray-600">
                                        <label
                                            htmlFor="bannerImage"
                                            className="bg-primary-red relative cursor-pointer rounded-md px-2 py-1 font-semibold text-black"
                                        >
                                            <span>Cambiar video</span>
                                            <input
                                                id="bannerImage"
                                                name="bannerImage"
                                                onChange={(e) => setData('video', e.target.files[0])}
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
                    <button
                        type="submit"
                        disabled={processing}
                        className="text-primary-color border-primary-color hover:bg-primary-color mt-4 w-fit rounded-full border px-4 py-2 font-semibold transition duration-300 hover:text-white"
                    >
                        {processing ? 'Actualizando...' : 'Actualizar'}
                    </button>
                </form>
            </div>
        </Dashboard>
    );
}
