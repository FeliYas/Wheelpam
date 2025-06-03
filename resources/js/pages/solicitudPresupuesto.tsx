import { Head, Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import DefaultLayout from './defaultLayout';

export default function SolicitudPresupuesto() {
    const { banner, productos, medidas, producto_id } = usePage().props;

    const [archivos, setArchivos] = useState([{ id: Date.now(), file: null }]);

    const [formInfo, setFormInfo] = useState({
        nombre: '',
        email: '',
        telefono: '',
        razon: '',
        producto: producto_id || '',
        medida: '',
        cantidad: '',
        aclaraciones: '',
        tipo: '',
    });

    const agregarArchivo = () => {
        setArchivos([...archivos, { id: Date.now(), file: null }]);
    };

    const manejarCambioArchivo = (index, event) => {
        const nuevosArchivos = [...archivos];
        nuevosArchivos[index].file = event.target.files[0];
        setArchivos(nuevosArchivos);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Agregar campos normales (ajustá los valores según tu lógica)
        formData.append('nombre', formInfo.nombre);
        formData.append('email', formInfo.email);
        formData.append('telefono', formInfo.telefono);
        formData.append('razon', formInfo.razon);
        formData.append('producto', formInfo.producto);
        formData.append('medida', formInfo.medida);
        formData.append('cantidad', formInfo.cantidad);
        formData.append('aclaraciones', formInfo.aclaraciones);
        formData.append('tipo', formInfo.tipo);

        // ...

        // Adjuntar archivos
        archivos.forEach((archivo, index) => {
            if (archivo.file) {
                formData.append(`archivos[]`, archivo.file);
            }
        });

        toast.promise(
            axios.post(route('presupuesto.enviar'), formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            }),
            {
                loading: 'Enviando solicitud...',
                success: () => {
                    setFormInfo({
                        nombre: '',
                        email: '',
                        telefono: '',
                        razon: '',
                        producto: producto_id || '',
                        medida: '',
                        cantidad: '',
                        aclaraciones: '',
                        tipo: '',
                    });
                    setArchivos([{ id: Date.now(), file: null }]); // Resetear archivos
                    return 'Solicitud enviada';
                },
                error: 'Hubo un error al enviar',
            },
        );
    };

    return (
        <DefaultLayout>
            <Head>
                <title>Solicitud De presupuesto</title>
            </Head>
            <div
                style={{
                    background:
                        'linear-gradient(180deg, rgba(0, 0, 0, 0.80) 27%, rgba(0, 0, 0, 0.00) 138.44%), url(<path-to-image>) lightgray -215.64px -286.999px / 121.977% 216.954% no-repeat',
                    mixBlendMode: 'multiply',
                }}
                className="relative flex h-[250px] w-full items-end justify-center sm:h-[300px] md:h-[400px]"
            >
                <div className="absolute top-16 z-40 mx-auto w-full max-w-[1200px] px-4 text-[12px] text-white sm:top-10 md:top-10 lg:px-0">
                    <Link className="font-bold" href={'/'}>
                        Inicio
                    </Link>{' '}
                    / <Link href={'/solicitud-de-presupuesto'}>Solicitud de Presupuesto</Link>
                </div>
                <img className="absolute h-full w-full object-cover object-center" src={banner?.image} alt="Banner nosotros" />
                <h2 className="absolute z-10 mx-auto w-[1200px] pb-20 text-3xl font-bold text-white sm:text-4xl">Solicitud de Presupuesto</h2>
            </div>

            <form onSubmit={handleSubmit} className="mx-auto my-20 flex w-[1200px] flex-col gap-20">
                <div className="flex flex-col gap-5">
                    <h2 className="col-span-2 text-[24px] font-bold">Datos personales</h2>
                    <div className="grid grid-cols-2 grid-rows-2 gap-x-6 gap-y-8">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="nombre">Nombre y apellido *</label>
                            <input
                                value={formInfo.nombre}
                                onChange={(e) => setFormInfo({ ...formInfo, nombre: e.target.value })}
                                required
                                type="text"
                                id="nombre"
                                className="rounded-md border border-gray-300 p-2"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="razon">Razón social *</label>
                            <input
                                value={formInfo.razon}
                                onChange={(e) => setFormInfo({ ...formInfo, razon: e.target.value })}
                                required
                                type="text"
                                id="razon"
                                className="rounded-md border border-gray-300 p-2"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">E-mail *</label>
                            <input
                                value={formInfo.email}
                                onChange={(e) => setFormInfo({ ...formInfo, email: e.target.value })}
                                required
                                type="text"
                                id="email"
                                className="rounded-md border border-gray-300 p-2"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="telefono">Teléfono*</label>
                            <input
                                value={formInfo.telefono}
                                onChange={(e) => setFormInfo({ ...formInfo, telefono: e.target.value })}
                                required
                                type="text"
                                id="telefono"
                                className="rounded-md border border-gray-300 p-2"
                            />
                        </div>
                    </div>
                </div>

                <div className="h-[1px] w-full bg-gray-200" />

                <div className="flex flex-col gap-5">
                    <h2 className="col-span-2 text-[24px] font-bold">Consulta</h2>
                    <div className="grid grid-cols-4 grid-rows-4 gap-x-6 gap-y-8">
                        <div className="col-span-2 flex flex-col gap-2">
                            <label htmlFor="producto">Producto *</label>
                            <select
                                required
                                value={formInfo.producto}
                                onChange={(e) => setFormInfo({ ...formInfo, producto: e.target.value })}
                                id="producto"
                                className="rounded-md border border-gray-300 p-2"
                            >
                                <option value="">Seleccione un producto</option>
                                {productos?.map((producto) => (
                                    <option key={producto.id} value={producto.name}>
                                        {producto.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="medida">Medida</label>
                            <select
                                value={formInfo.medida}
                                onChange={(e) => setFormInfo({ ...formInfo, medida: e.target.value })}
                                id="medida"
                                className="rounded-md border border-gray-300 p-2"
                            >
                                <option value="">Seleccione una medida</option>
                                {medidas?.map((medida) => (
                                    <option key={medida.id} value={medida.name}>
                                        {medida.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="cantidad">Cantidad</label>
                            <input
                                value={formInfo.cantidad}
                                onChange={(e) => setFormInfo({ ...formInfo, cantidad: e.target.value })}
                                type="text"
                                id="cantidad"
                                className="rounded-md border border-gray-300 p-2"
                            />
                        </div>
                        <div className="col-span-2 row-span-3 flex flex-col gap-2">
                            <label htmlFor="aclaraciones">Aclaraciones*</label>
                            <textarea
                                value={formInfo.aclaraciones}
                                onChange={(e) => setFormInfo({ ...formInfo, aclaraciones: e.target.value })}
                                required
                                id="aclaraciones"
                                className="h-full w-full rounded-md border border-gray-300 p-2"
                            />
                        </div>
                        <div className="col-span-2 flex flex-col gap-2">
                            <label htmlFor="tipo">Tipo de uso</label>
                            <input
                                value={formInfo.tipo}
                                onChange={(e) => setFormInfo({ ...formInfo, tipo: e.target.value })}
                                type="text"
                                id="tipo"
                                className="rounded-md border border-gray-300 p-2"
                            />
                        </div>
                        <div className={`col-span-2 row-span-2 flex flex-col gap-4`}>
                            <label>Adjuntar archivo</label>

                            {archivos.map((archivo, index) => (
                                <div key={archivo.id} className="flex flex-row items-center justify-between rounded-md border border-gray-300 p-2">
                                    <input
                                        type="file"
                                        name={`archivo_${index}`}
                                        onChange={(e) => manejarCambioArchivo(index, e)}
                                        className="w-full file:cursor-pointer"
                                    />
                                </div>
                            ))}

                            <button type="button" onClick={agregarArchivo} className="text-primary-color w-fit self-end text-sm hover:underline">
                                + Adjuntar otro
                            </button>
                        </div>
                        <div className="col-span-2 col-start-3 w-full">
                            <p className="self-end">*Campos obligatorios</p>
                            <button type="submit" className="bg-primary-color h-[38px] w-full items-end self-end rounded-full font-bold text-white">
                                Enviar solicitud
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </DefaultLayout>
    );
}
