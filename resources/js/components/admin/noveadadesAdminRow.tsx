import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CustomReactQuill from '../customReactQuill';
import Switch from '../switch';

export default function NovedadesAdminRow({ novedad }) {
    const [edit, setEdit] = useState(false);

    const updateForm = useForm({
        order: novedad?.order,
        type: novedad?.type,
        title: novedad?.title,
        id: novedad?.id,
    });

    const [text, setText] = useState(novedad?.text || '');
    const [existingImages, setExistingImages] = useState(novedad.imagenes || []);
    const [newImagePreviews, setNewImagePreviews] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);

    useEffect(() => {
        updateForm.setData('text', text);
    }, [text]);

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateForm.post(route('admin.novedades.update'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Novedad actualizada correctamente');
                setEdit(false);
            },
            onError: (errors) => {
                toast.error('Error al actualizar novedad');
                console.log(errors);
            },
        });
    };

    const deleteMarca = () => {
        if (confirm('¿Estas seguro de eliminar esta novedad?')) {
            updateForm.delete(route('admin.novedades.destroy'), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Novedad eliminada correctamente');
                },
                onError: (errors) => {
                    toast.error('Error al eliminar novedad');
                    console.log(errors);
                },
            });
        }
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        // Actualizar el form data con los archivos nuevos
        updateForm.setData('new_images', files);

        // Crear previews de las nuevas imágenes
        const previews = files.map((file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) =>
                    resolve({
                        file: file,
                        url: e.target.result,
                        name: file.name,
                        size: file.size,
                        isNew: true,
                    });
                reader.readAsDataURL(file);
            });
        });

        Promise.all(previews).then(setNewImagePreviews);
    };

    const removeExistingImage = (indexToRemove) => {
        const imageToDelete = existingImages[indexToRemove];

        // Agregar al array de imágenes a eliminar
        setImagesToDelete((prev) => [...prev, imageToDelete.id]);

        // Remover de imágenes existentes
        const newExistingImages = existingImages.filter((_, index) => index !== indexToRemove);
        setExistingImages(newExistingImages);

        // Actualizar form data
        updateForm.setData('images_to_delete', [...imagesToDelete, imageToDelete.id]);
    };

    const removeNewImage = (indexToRemove) => {
        const newImages = updateForm.data.new_images?.filter((_, index) => index !== indexToRemove) || [];
        const newPreviews = newImagePreviews.filter((_, index) => index !== indexToRemove);

        updateForm.setData('new_images', newImages);
        setNewImagePreviews(newPreviews);
    };

    return (
        <tr className={`border text-black odd:bg-gray-100 even:bg-white`}>
            <td className="align-middle">{novedad?.order}</td>
            <td className="align-middle">{novedad?.type}</td>
            <td className="align-middle">{novedad?.title}</td>
            <td className="align-middle">
                <div dangerouslySetInnerHTML={{ __html: novedad?.text }} />
            </td>

            <td className="h-[90px] w-[90px] px-8">
                <img className="h-full w-full object-contain" src={novedad?.imagenes[0]?.image} alt="" />
            </td>

            <td className="flex h-[90px] items-center justify-center">
                <Switch id={novedad?.id} routeName={'admin.novedades.changeFeatured'} status={novedad?.featured == 1} />
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
                        className="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50 text-left"
                    >
                        <form onSubmit={handleUpdate} method="POST" className="h-fit text-black">
                            <div className="max-h-[90vh] w-[500px] overflow-y-auto rounded-md bg-white p-4">
                                <h2 className="mb-4 text-2xl font-semibold">Actualizar Novedad</h2>
                                <div className="flex flex-col gap-4">
                                    <label htmlFor="ordennn">Orden</label>
                                    <input
                                        className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                        type="text"
                                        name="ordennn"
                                        id="ordennn"
                                        defaultValue={novedad?.order}
                                        onChange={(e) => updateForm.setData('order', e.target.value)}
                                    />
                                    <label htmlFor="type">
                                        Tipo <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                        type="text"
                                        name="type"
                                        id="type"
                                        defaultValue={novedad?.type}
                                        onChange={(e) => updateForm.setData('type', e.target.value)}
                                    />
                                    <label htmlFor="nombree">
                                        Titulo <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                        type="text"
                                        name="nombree"
                                        id="nombree"
                                        defaultValue={novedad?.title}
                                        onChange={(e) => updateForm.setData('title', e.target.value)}
                                    />
                                    <label htmlFor="nombree">
                                        Texto <span className="text-red-500">*</span>
                                    </label>
                                    <CustomReactQuill value={text} onChange={setText} />
                                    <label htmlFor="imagenn">Imagen</label>

                                    <span className="text-base font-normal">Resolucion recomendada: 501x181px</span>
                                    <label>Imágenes del Producto</label>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="file:bg-primary-color w-full rounded border p-2 file:cursor-pointer file:rounded-full file:px-4 file:py-2 file:text-white"
                                    />

                                    {/* Mostrar imágenes existentes */}
                                    {existingImages.length > 0 && (
                                        <div className="mt-4 space-y-2">
                                            <h4>Imágenes actuales ({existingImages.length})</h4>
                                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                                {existingImages.map((image, index) => (
                                                    <div key={image.id} className="relative">
                                                        <img
                                                            src={image.image || image.path} // Ajusta según tu estructura
                                                            alt={image.name || `Imagen ${index + 1}`}
                                                            className="h-32 w-full rounded border object-cover"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeExistingImage(index)}
                                                            className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm text-white hover:bg-red-600"
                                                        >
                                                            ×
                                                        </button>
                                                        <p className="mt-1 truncate text-xs text-gray-600">{image.name || `Imagen ${index + 1}`}</p>
                                                        <span className="inline-block rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
                                                            Existente
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Mostrar nuevas imágenes */}
                                    {newImagePreviews.length > 0 && (
                                        <div className="mt-4 space-y-2">
                                            <h4>Nuevas imágenes ({newImagePreviews.length})</h4>
                                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                                {newImagePreviews.map((preview, index) => (
                                                    <div key={index} className="relative">
                                                        <img
                                                            src={preview.url}
                                                            alt={preview.name}
                                                            className="h-32 w-full rounded border object-cover"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeNewImage(index)}
                                                            className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm text-white hover:bg-red-600"
                                                        >
                                                            ×
                                                        </button>
                                                        <p className="mt-1 truncate text-xs text-gray-600">{preview.name}</p>
                                                        <p className="text-xs text-gray-500">{(preview.size / 1024 / 1024).toFixed(2)} MB</p>
                                                        <span className="inline-block rounded bg-green-100 px-2 py-1 text-xs text-green-800">
                                                            Nueva
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Mostrar total de imágenes */}
                                    <div className="mt-2 text-sm text-gray-600">
                                        Total de imágenes: {existingImages.length + newImagePreviews.length}
                                    </div>

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
