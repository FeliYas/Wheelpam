import ProductoAdminRow from '@/components/admin/productoAdminRow';
import CustomReactQuill from '@/components/customReactQuill';
import { router, useForm, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Dashboard from '../dashboard';

export default function ProductosAdmin() {
    const { productos, categorias, sub_categorias, medidas } = usePage().props;

    const { data, setData, post, reset } = useForm({
        name: '',
        desgaste: '0',
        temperatura: '0',
        confort: '0',
    });

    const [currentCategory, setCurrentCategory] = useState();

    const [text, setText] = useState();

    useEffect(() => {
        setData('recomendaciones', text);
    }, [text]);
    const [searchTerm, setSearchTerm] = useState('');
    const [createView, setCreateView] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('admin.productos.store'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Producto creada correctamente');
                reset();
                setCreateView(false);
            },
            onError: (errors) => {
                toast.error('Error al crear producto');
                console.log(errors);
            },
        });
    };

    // Manejadores para la paginación del backend
    const handlePageChange = (page) => {
        router.get(
            route('admin.productos'),
            {
                page: page,
                search: searchTerm,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    // Función para realizar la búsqueda
    const handleSearch = () => {
        router.get(
            route('admin.productos'),
            {
                search: searchTerm,
                page: 1, // Resetear a la primera página al buscar
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
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
                            className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/50 text-left"
                        >
                            <form onSubmit={handleSubmit} method="POST" className="text-black">
                                <div className="max-h-[90vh] w-[500px] overflow-y-auto rounded-md bg-white p-4">
                                    <h2 className="mb-4 text-2xl font-semibold">Crear Producto</h2>
                                    <div className="flex flex-col gap-4">
                                        <label htmlFor="ordennn">Orden</label>
                                        <input
                                            className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                            type="text"
                                            name="ordennn"
                                            id="ordennn"
                                            onChange={(e) => setData('order', e.target.value)}
                                        />
                                        <label htmlFor="nombree">
                                            Nombre <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                            type="text"
                                            name="nombree"
                                            id="nombree"
                                            onChange={(e) => setData('name', e.target.value)}
                                        />

                                        <label htmlFor="descripcion">
                                            Descripcion <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                            type="text"
                                            name="descripcion"
                                            id="descripcion"
                                            onChange={(e) => setData('description', e.target.value)}
                                        />

                                        <label htmlFor="recom">
                                            Recomendaciones de uso <span className="text-red-500">*</span>
                                        </label>

                                        <CustomReactQuill value={text} onChange={setText} />

                                        <label className="">Resistencia a la temperatura</label>
                                        <input
                                            type="range"
                                            min={0}
                                            max={10}
                                            value={data.temperatura}
                                            onChange={(e) => setData('temperatura', e.target.value)}
                                            className="w-full cursor-pointer"
                                        />

                                        <label className="">Resistencia al desgaste</label>
                                        <input
                                            type="range"
                                            min={0}
                                            max={10}
                                            value={data.desgaste}
                                            onChange={(e) => setData('desgaste', e.target.value)}
                                            className="w-full cursor-pointer"
                                        />

                                        <label className="">Confort durante la marcha</label>
                                        <input
                                            type="range"
                                            min={0}
                                            max={10}
                                            value={data.confort}
                                            onChange={(e) => setData('confort', e.target.value)}
                                            className="w-full cursor-pointer"
                                        />

                                        <label htmlFor="archivo">
                                            Tabla de medidas <span className="text-red-500">*</span>
                                        </label>

                                        <input
                                            onChange={(e) => setData('archivo', e.target.files[0])}
                                            type="file"
                                            className="file:bg-primary-color file:cursor-pointer file:rounded-full file:border file:px-2 file:py-1 file:text-white"
                                            name=""
                                            id=""
                                        />

                                        <label htmlFor="categoria">Categoria</label>
                                        <select
                                            className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                            onChange={(e) => setCurrentCategory(e.target.value)}
                                            name=""
                                            id=""
                                        >
                                            <option value="">Seleccione una categoria</option>
                                            {categorias?.map((categoria) => (
                                                <option key={categoria.id} value={categoria.id}>
                                                    {categoria.title}
                                                </option>
                                            ))}
                                        </select>
                                        <label htmlFor="categoria">Sub-categoria</label>
                                        <select
                                            className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                            onChange={(e) => setData('sub_categoria_id', e.target.value)}
                                            name=""
                                            id=""
                                        >
                                            <option value="">Seleccione una sub-categoria</option>
                                            {sub_categorias
                                                ?.filter((sub) => sub?.categoria_id == currentCategory)
                                                ?.map((subcategoria) => (
                                                    <option key={subcategoria.id} value={subcategoria.id}>
                                                        {subcategoria.title}
                                                    </option>
                                                ))}
                                        </select>

                                        <label htmlFor="medida">Medida</label>
                                        <select
                                            className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                            onChange={(e) => setData('medida_id', e.target.value)}
                                            name=""
                                            id=""
                                        >
                                            <option value="">Seleccione una medida</option>
                                            {medidas?.map((medida) => (
                                                <option key={medida.id} value={medida.id}>
                                                    {medida.name}
                                                </option>
                                            ))}
                                        </select>

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
                    <h2 className="border-primary-color text-primary-color text-bold w-full border-b-2 text-2xl">Productos</h2>
                    <div className="flex h-fit w-full flex-row gap-5">
                        <input
                            type="text"
                            placeholder="Buscar producto..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3"
                        />
                        <button onClick={handleSearch} className="bg-primary-color w-[200px] rounded px-4 py-1 font-bold text-white hover:bg-red-400">
                            Buscar
                        </button>
                        <button
                            onClick={() => setCreateView(true)}
                            className="bg-primary-color w-[200px] rounded px-4 py-1 font-bold text-white hover:bg-red-400"
                        >
                            Crear producto
                        </button>
                    </div>

                    <div className="flex w-full justify-center">
                        <table className="w-full border text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                            <thead className="bg-gray-300 text-sm font-medium text-black uppercase">
                                <tr>
                                    <td className="text-center">ORDEN</td>
                                    <td className="text-center">NOMBRE</td>
                                    <td className="py-2 text-center">DESCRIPCION</td>
                                    <td className="text-center">MEDIDA</td>
                                    <td className="text-center">CARACTERISTICAS</td>
                                    <td className="text-center">TABLA DE MEDIDAS</td>
                                    <td className="text-center">IMAGENES</td>

                                    <td className="text-center">DESTACADO</td>

                                    <td className="text-center">EDITAR</td>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {productos.data?.map((producto) => <ProductoAdminRow key={producto.id} producto={producto} />)}
                            </tbody>
                        </table>
                    </div>

                    {/* Paginación con datos del backend */}
                    <div className="mt-4 flex justify-center">
                        {productos.links && (
                            <div className="flex items-center">
                                {productos.links.map((link, index) => (
                                    <button
                                        key={index}
                                        onClick={() => link.url && handlePageChange(link.url.split('page=')[1])}
                                        disabled={!link.url}
                                        className={`px-4 py-2 ${
                                            link.active
                                                ? 'bg-primary-color text-white'
                                                : link.url
                                                  ? 'bg-gray-300 text-black'
                                                  : 'bg-gray-200 text-gray-500 opacity-50'
                                        } ${index === 0 ? 'rounded-l-md' : ''} ${index === productos.links.length - 1 ? 'rounded-r-md' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Información de paginación */}
                    <div className="mt-2 text-center text-sm text-gray-600">
                        Mostrando {productos.from || 0} a {productos.to || 0} de {productos.total} resultados
                    </div>
                </div>
            </div>
        </Dashboard>
    );
}
