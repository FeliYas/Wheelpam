import { Head, Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import DefaultLayout from './defaultLayout';

export default function SolicitudPresupuesto() {
    const { banner, informacion, provincias } = usePage().props;

    const [archivos, setArchivos] = useState([{ id: Date.now(), file: null }]);

    const [formInfo, setFormInfo] = useState({
        nombre: '',
        email: '',
        telefono: '',
        razon: '',
        aclaraciones: '',
        rubro: '',
        provincia: '',
        localidad: '',
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
        formData.append('aclaraciones', formInfo.aclaraciones);
        formData.append('rubro', formInfo.rubro);
        formData.append('provincia', formInfo.provincia);
        formData.append('localidad', formInfo.localidad);

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
                        rubro: '',
                        provincia: '',
                        localidad: '',
                        aclaraciones: '',
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
                <title>Ser distribuidor</title>
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
                    / <Link href={'/solicitud-de-presupuesto'}>Ser distribuidor</Link>
                </div>
                <img className="absolute h-full w-full object-cover object-center" src={banner?.image} alt="Banner nosotros" />
                <h2 className="absolute z-10 mx-auto w-[1200px] pb-20 text-3xl font-bold text-white sm:text-4xl">Ser distribuidor</h2>
            </div>

            <form onSubmit={handleSubmit} className="mx-auto my-20 flex w-[1200px] flex-col gap-20">
                <div className="flex flex-col gap-5">
                    <h2 className="col-span-2 text-[24px] font-bold">{informacion?.titulo}</h2>
                    <div dangerouslySetInnerHTML={{ __html: informacion?.text || '' }} className="break-words" />
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
                    <h2 className="col-span-2 text-[24px] font-bold">Sobre tu negocio</h2>
                    <div className="grid grid-cols-4 grid-rows-4 gap-x-6 gap-y-8">
                        <div className="col-span-2 flex flex-col gap-2">
                            <label htmlFor="producto">Rubro principal *</label>
                            <select
                                onChange={(e) => setFormInfo({ ...formInfo, rubro: e.target.value })}
                                required
                                id="producto"
                                className="rounded-md border border-gray-300 p-2"
                            >
                                <option value="">Seleccione un rubro</option>
                                <option value="Venta de neumáticos">Venta de neumáticos</option>
                                <option value="Alquiler de Autoelevadores">Alquiler de Autoelevadores</option>
                                <option value="Venta de repuestos">Venta de repuestos</option>
                                <option value="Reparación de Autoelevadores">Reparación de Autoelevadores</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="provincia">Provincia</label>
                            <select
                                value={formInfo?.provincia}
                                onChange={(e) => setFormInfo({ ...formInfo, provincia: e.target.value })}
                                id="provincia"
                                className="rounded-md border border-gray-300 p-2"
                            >
                                <option value="">Seleccione una provincia</option>
                                {provincias?.map((provincia) => (
                                    <option key={provincia?.id} value={provincia?.name}>
                                        {provincia?.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="localidad">Localidad</label>
                            <select
                                value={formInfo?.localidad}
                                onChange={(e) => setFormInfo({ ...formInfo, localidad: e.target.value })}
                                id="localidad"
                                className="rounded-md border border-gray-300 p-2"
                            >
                                <option value="">Seleccione una localidad</option>
                                {provincias
                                    ?.find((provincia) => provincia?.name == formInfo?.provincia)
                                    ?.localidades?.map((localidad) => (
                                        <option key={localidad?.id} value={localidad?.name}>
                                            {localidad?.name}
                                        </option>
                                    ))}
                            </select>
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

                        <div className={`col-span-2 row-span-2 flex flex-col gap-4`}>
                            <label>Adjuntar fotos o videos de su empresa</label>

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
