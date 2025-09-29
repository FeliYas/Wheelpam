import NovedadesAdminRow from '@/components/admin/noveadadesAdminRow';
import CustomReactQuill from '@/components/customReactQuill';
import { useForm, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Dashboard from '../dashboard';

export default function NovedadesAdmin() {
    const { novedades } = usePage().props;

    const { data, setData, post, reset, errors } = useForm({
        title: '',
        type: '',
        images: [],
    });

    const [text, setText] = useState();
    const [imagePreviews, setImagePreviews] = useState([]);
    const [createView, setCreateView] = useState(false);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        // Actualizar el form data con los archivos
        setData('images', files);

        // Crear previews de las imágenes
        const previews = files.map((file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) =>
                    resolve({
                        file: file,
                        url: e.target.result,
                        name: file.name,
                        size: file.size,
                    });
                reader.readAsDataURL(file);
            });
        });

        // Actualizar el estado de previews
        Promise.all(previews).then(setImagePreviews);
    };

    const removeImage = (indexToRemove) => {
        const newImages = data.images.filter((_, index) => index !== indexToRemove);
        const newPreviews = imagePreviews.filter((_, index) => index !== indexToRemove);

        setData('images', newImages);
        setImagePreviews(newPreviews);
    };

    useEffect(() => {
        setData('text', text);
    }, [text]);

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('admin.novedades.store'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Novedad creada correctamente');
                reset();
                setCreateView(false);
            },
            onError: (errors) => {
                toast.error('Error al crear novedad');
                console.log(errors);
            },
        });
    };

    return (
        <Dashboard>
            <div className="flex w-full flex-col p-6">
                <AnimatePresence>
                    {createView && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50 text-left"
                        >
                            <form onSubmit={handleSubmit} method="POST" className="h-fit text-black">
                                <div className="max-h-[90vh] w-[500px] overflow-y-auto rounded-md bg-white p-4">
                                    <h2 className="mb-4 text-2xl font-semibold">Crear Novedad</h2>
                                    <div className="flex flex-col gap-4">
                                        <label htmlFor="ordennn">Orden</label>
                                        <input
                                            className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                            type="text"
                                            name="ordennn"
                                            id="ordennn"
                                            onChange={(e) => setData('order', e.target.value)}
                                        />
                                        <label htmlFor="type">
                                            Tipo <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                            type="text"
                                            name="type"
                                            id="type"
                                            onChange={(e) => setData('type', e.target.value)}
                                        />
                                        <label htmlFor="nombree">
                                            Titulo <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                            type="text"
                                            name="nombree"
                                            id="nombree"
                                            onChange={(e) => setData('title', e.target.value)}
                                        />
                                        <label htmlFor="nombree">
                                            Texto <span className="text-red-500">*</span>
                                        </label>
                                        <CustomReactQuill value={text} onChange={setText} />
                                        <label>Imágenes de la novedad</label>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="file:bg-primary-color w-full rounded border p-2 file:cursor-pointer file:rounded-full file:px-4 file:py-2 file:text-white"
                                        />
                                        {errors.images && <span className="text-red-500">{errors.images}</span>}
                                        {errors['images.*'] && <span className="text-red-500">{errors['images.*']}</span>}

                                        {/* Preview de imágenes */}
                                        {imagePreviews.length > 0 && (
                                            <div className="space-y-2">
                                                <h4>Imágenes seleccionadas ({imagePreviews.length})</h4>
                                                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                                    {imagePreviews.map((preview, index) => (
                                                        <div key={index} className="relative">
                                                            <img
                                                                src={preview.url}
                                                                alt={preview.name}
                                                                className="h-32 w-full rounded border object-cover"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => removeImage(index)}
                                                                className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm text-white hover:bg-red-600"
                                                            >
                                                                ×
                                                            </button>
                                                            <p className="mt-1 truncate text-xs text-gray-600">{preview.name}</p>
                                                            <p className="text-xs text-gray-500">{(preview.size / 1024 / 1024).toFixed(2)} MB</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex justify-end gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setCreateView(false)}
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
                <div className="mx-auto flex w-full flex-col gap-3">
                    <div className="flex h-fit w-full flex-row gap-5">
                        <h2 className="border-primary-color text-primary-color text-bold w-full border-b-2 text-2xl">Novedades</h2>
                        <button
                            onClick={() => setCreateView(true)}
                            className="bg-primary-color w-[200px] rounded px-4 py-1 font-bold text-white hover:bg-red-400"
                        >
                            Crear novedad
                        </button>
                    </div>

                    <div className="flex w-full justify-center">
                        <table className="w-full border text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                            <thead className="bg-gray-300 text-sm font-medium text-black uppercase">
                                <tr>
                                    <td className="text-center">ORDEN</td>
                                    <td className="text-center">TIPO</td>
                                    <td className="text-center">TITULO</td>
                                    <td className="w-[400px] px-3 py-2 text-center">IMAGEN</td>
                                    <td className="text-center">DESTACADA</td>
                                    <td className="text-center">EDITAR</td>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {novedades?.map((novedades) => <NovedadesAdminRow key={novedades.id} novedad={novedades} />)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Dashboard>
    );
}
