import { Head, Link, usePage } from '@inertiajs/react';
import { Upload } from 'lucide-react';
import DefaultLayout from './defaultLayout';

export default function SolicitudPresupuesto() {
    const { banner } = usePage().props;

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

            <div className="mx-auto my-20 flex w-[1200px] flex-col gap-20">
                <div className="flex flex-col gap-5">
                    <h2 className="col-span-2 text-[24px] font-bold">Datos personales</h2>
                    <div className="grid grid-cols-2 grid-rows-2 gap-x-6 gap-y-8">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="nombre">Nombre y apellido *</label>
                            <input type="text" id="nombre" className="rounded-md border border-gray-300 p-2" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="razon">Razón social *</label>
                            <input type="text" id="razon" className="rounded-md border border-gray-300 p-2" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">E-mail *</label>
                            <input type="text" id="email" className="rounded-md border border-gray-300 p-2" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="telefono">Teléfono*</label>
                            <input type="text" id="telefono" className="rounded-md border border-gray-300 p-2" />
                        </div>
                    </div>
                </div>

                <div className="h-[1px] w-full bg-gray-200" />

                <div className="flex flex-col gap-5">
                    <h2 className="col-span-2 text-[24px] font-bold">Consulta</h2>
                    <div className="grid grid-cols-4 grid-rows-4 gap-x-6 gap-y-8">
                        <div className="col-span-2 flex flex-col gap-2">
                            <label htmlFor="producto">Producto *</label>
                            <input type="text" id="producto" className="rounded-md border border-gray-300 p-2" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="medida">Medida*</label>
                            <input type="text" id="medida" className="rounded-md border border-gray-300 p-2" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="cantidad">Cantidad*</label>
                            <input type="text" id="cantidad" className="rounded-md border border-gray-300 p-2" />
                        </div>
                        <div className="col-span-2 row-span-3 flex flex-col gap-2">
                            <label htmlFor="aclaraciones">Aclaraciones*</label>
                            <textarea id="aclaraciones" className="h-full w-full rounded-md border border-gray-300 p-2" />
                        </div>
                        <div className="col-span-2 flex flex-col gap-2">
                            <label htmlFor="tipo">Tipo de uso</label>
                            <input type="text" id="tipo" className="rounded-md border border-gray-300 p-2" />
                        </div>
                        <div className="col-span-2 flex flex-col gap-2">
                            <label htmlFor="archivo">Adjuntar archivo</label>
                            <div className="flex flex-row justify-between rounded-md border border-gray-300 p-2">
                                <input type="file" id="archivo" className="file:cursor-pointer" />
                                <button>
                                    <Upload color="#1a181c" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
