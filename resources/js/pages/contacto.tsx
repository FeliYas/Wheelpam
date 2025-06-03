import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Mail, MapPin, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import DefaultLayout from './defaultLayout';

export default function Contacto() {
    const { contacto, metadatos, banner, servicio } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        celular: '',
        empresa: '',
        mensaje: '',
    });

    const handleMail = (e) => {
        e.preventDefault();
        post(route('contacto.enviar'), {
            onSuccess: () => {
                toast.success('Consulta enviada');
                reset();
            },
        });
    };

    const datos = [
        {
            name: contacto?.location,
            icon: <MapPin color="#ef3620" />,
            href: `https://maps.google.com/?q=${encodeURIComponent(contacto?.location || '')}`,
            target: '_blank',
        },
        {
            name: contacto?.phone,
            icon: <Phone color="#ef3620" />,
            href: `tel:${contacto?.phone?.replace(/\s/g, '')}`,
        },

        {
            name: contacto?.email,
            icon: <Mail color="#ef3620" />,
            href: `mailto:${contacto?.email}`,
        },
    ];

    return (
        <DefaultLayout>
            <Head>
                <title>Contacto</title>
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
                    / <Link href={'/contacto'}>Contacto</Link>
                </div>
                <img className="absolute h-full w-full object-cover object-center" src={banner?.image} alt="Banner contacto" />
                <h2 className="absolute z-10 mx-auto w-[1200px] pb-20 text-3xl font-bold text-white sm:text-4xl">Contacto</h2>
            </div>

            {/* Main content - responsive container */}
            <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-4 py-10 md:gap-10 md:px-0 md:py-20">
                {/* Contact info and form - responsive layout */}
                <div className="flex flex-col gap-8 md:flex-row md:gap-0">
                    {/* Contact details */}
                    <div className="mb-6 flex w-full flex-col gap-4 md:mb-0 md:w-1/3">
                        {datos.map((dato, index) => (
                            <a
                                key={index}
                                href={dato.href}
                                target={dato.target}
                                className="flex flex-row items-center gap-3 transition-opacity hover:opacity-80"
                            >
                                {dato.icon}
                                <p className="max-w-[350px] text-base text-[16px] text-[#74716A] sm:text-[18px]">{dato?.name}</p>
                            </a>
                        ))}
                    </div>

                    {/* Contact form - responsive grid */}
                    <form onSubmit={handleMail} className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-10 md:w-2/3">
                        <div className="flex flex-col gap-2 sm:gap-3">
                            <label htmlFor="name" className="text-base text-[#74716A]">
                                Nombre y Apellido*
                            </label>
                            <input
                                required
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                type="text"
                                id="name"
                                className="h-[44px] w-full rounded-md border border-[#EEEEEE] pl-3"
                            />
                        </div>

                        <div className="flex flex-col gap-2 sm:gap-3">
                            <label htmlFor="email" className="text-base text-[#74716A]">
                                Email*
                            </label>
                            <input
                                value={data.email}
                                required
                                onChange={(e) => setData('email', e.target.value)}
                                type="text"
                                id="email"
                                className="h-[44px] w-full rounded-md border border-[#EEEEEE] pl-3"
                            />
                        </div>

                        <div className="flex flex-col gap-2 sm:gap-3">
                            <label htmlFor="celular" className="text-base text-[#74716A]">
                                Celular*
                            </label>
                            <input
                                value={data.celular}
                                required
                                onChange={(e) => setData('celular', e.target.value)}
                                type="text"
                                id="celular"
                                className="h-[44px] w-full rounded-md border border-[#EEEEEE] pl-3"
                            />
                        </div>

                        <div className="flex flex-col gap-2 sm:gap-3">
                            <label htmlFor="empresa" className="text-base text-[#74716A]">
                                Empresa*
                            </label>
                            <input
                                value={data.empresa}
                                required
                                onChange={(e) => setData('empresa', e.target.value)}
                                type="text"
                                id="empresa"
                                className="h-[44px] w-full rounded-md border border-[#EEEEEE] pl-3"
                            />
                        </div>

                        {/* Message textarea - spans full width on mobile, row-span-2 on larger screens */}
                        <div className="flex flex-col gap-2 sm:col-span-2 sm:row-span-2 sm:gap-3 md:col-span-1">
                            <label htmlFor="Mensaje" className="text-base text-[#74716A]">
                                Mensaje*
                            </label>
                            <textarea
                                rows={6}
                                defaultValue={servicio}
                                value={data.mensaje}
                                required
                                onChange={(e) => setData('mensaje', e.target.value)}
                                id="Mensaje"
                                className="h-[150px] w-full rounded-md border border-[#EEEEEE] pt-2 pl-3 sm:h-full"
                            />
                        </div>

                        {/* Submit section - spans full width on mobile, row-span-2 on larger screens */}
                        <div className="flex flex-col justify-end gap-3 sm:col-span-2 sm:row-span-2 md:col-span-1">
                            <p className="text-base text-[#74716A]">*Campos obligatorios</p>

                            <button className="bg-primary-color rounded-full py-2 font-bold text-white" type="submit" disabled={processing}>
                                Enviar consulta
                            </button>
                        </div>
                    </form>
                </div>

                {/* Map - responsive */}
                <div className="mt-4 w-full">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.4434847629723!2d-58.3871563!3d-34.668755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccc518d1fafb1%3A0x49b21b23b0d9c48a!2sWheelpam%20SA!5e0!3m2!1ses-419!2sar!4v1748878793893!5m2!1ses-419!2sar"
                        width="100%"
                        height="300"
                        className="h-[300px] sm:h-[450px] md:h-[665px]"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </DefaultLayout>
    );
}
