import { faFacebook, faInstagramSquare, faLinkedin, faSquareWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm, usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';
import Dashboard from '../dashboard';
export default function ContactoAdmin() {
    const { contacto } = usePage().props;

    const { data, setData, post } = useForm({
        location: contacto?.location,
        phone: contacto?.phone,
        email: contacto?.email,
        whatsapp: contacto?.whatsapp,
        facebook: contacto?.facebook,
        instagram: contacto?.instagram,
        linkedin: contacto?.linkedin,
        youtube: contacto?.youtube,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.contacto.update'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Contacto actualizado correctamente');
            },
            onError: (errors) => {
                toast.error('Error al actualizar el contacto');
                console.log(errors);
            },
        });
    };

    return (
        <Dashboard>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6" action="">
                <h2 className="border-primary-color text-primary-color text-bold w-full border-b-2 text-2xl">Contacto</h2>
                <div className="grid grid-cols-2 grid-rows-2 gap-x-6 gap-y-8 max-sm:grid-cols-1">
                    <div className="flex w-full flex-row gap-2">
                        <div className="w-full">
                            <label htmlFor="username" className="flex flex-row items-center gap-2 text-sm/6 font-medium text-gray-900">
                                <FontAwesomeIcon color="#ef3620" icon={faEnvelope} size="lg" />
                                <p>Mail</p>
                            </label>
                            <div className="mt-2">
                                <div className="focus-within:outline-primary-color flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2">
                                    <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6"></div>
                                    <input
                                        value={data.email}
                                        onChange={(ev) => {
                                            setData('email', ev.target.value);
                                        }}
                                        id="username"
                                        name="username"
                                        type="text"
                                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <label htmlFor="wp" className="flex flex-row items-center gap-2 text-sm/6 font-medium text-gray-900">
                            <FontAwesomeIcon icon={faSquareWhatsapp} size="xl" color="#ef3620" />
                            <p>WhatsApp</p>
                        </label>
                        <div className="mt-2">
                            <div className="focus-within:outline-primary-color flex items-center rounded-md bg-white pl-3 outline -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2">
                                <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6"></div>
                                <input
                                    value={data?.whatsapp}
                                    onChange={(ev) => {
                                        setData('whatsapp', ev.target.value);
                                    }}
                                    id="wp"
                                    name="username"
                                    type="text"
                                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-4">
                        <div className="w-full">
                            <label htmlFor="telefono" className="flex flex-row items-center gap-2 text-sm/6 font-medium text-gray-900">
                                <FontAwesomeIcon color="#ef3620" icon={faPhone} size={'lg'} />
                                <p>Telefono</p>
                            </label>
                            <div className="mt-2">
                                <div className="focus-within:outline-primary-color flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2">
                                    <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6"></div>
                                    <input
                                        value={data.phone}
                                        onChange={(ev) => {
                                            setData('phone', ev.target.value);
                                        }}
                                        id="telefono"
                                        name="username"
                                        type="text"
                                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-4">
                        <div className="w-full">
                            <label htmlFor="location" className="flex flex-row items-center gap-2 text-sm/6 font-medium text-gray-900">
                                <FontAwesomeIcon color="#ef3620" icon={faLocationDot} size={'lg'} />
                                <p>Ubicacion</p>
                            </label>
                            <div className="mt-2">
                                <div className="focus-within:outline-primary-color flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2">
                                    <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6"></div>
                                    <input
                                        value={data.location}
                                        onChange={(ev) => {
                                            setData('location', ev.target.value);
                                        }}
                                        id="location"
                                        name="username"
                                        type="text"
                                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-4">
                        <div className="w-full">
                            <label htmlFor="fb" className="flex flex-row items-center gap-2 text-sm/6 font-medium text-gray-900">
                                <FontAwesomeIcon color="#ef3620" icon={faFacebook} size={'lg'} />
                                <p>Facebook</p>
                            </label>
                            <div className="mt-2">
                                <div className="focus-within:outline-primary-color flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2">
                                    <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6"></div>
                                    <input
                                        value={data.facebook}
                                        onChange={(ev) => {
                                            setData('facebook', ev.target.value);
                                        }}
                                        id="fb"
                                        name="username"
                                        type="text"
                                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-4">
                        <div className="w-full">
                            <label htmlFor="ig" className="flex flex-row items-center gap-2 text-sm/6 font-medium text-gray-900">
                                <FontAwesomeIcon color="#ef3620" icon={faInstagramSquare} size={'lg'} />
                                <p>Instagram</p>
                            </label>
                            <div className="mt-2">
                                <div className="focus-within:outline-primary-color flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2">
                                    <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6"></div>
                                    <input
                                        value={data.instagram}
                                        onChange={(ev) => {
                                            setData('instagram', ev.target.value);
                                        }}
                                        id="ig"
                                        name="username"
                                        type="text"
                                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-4">
                        <div className="w-full">
                            <label htmlFor="youtube" className="flex flex-row items-center gap-2 text-sm/6 font-medium text-gray-900">
                                <FontAwesomeIcon color="#ef3620" icon={faYoutube} size={'lg'} />
                                <p>YouTube</p>
                            </label>
                            <div className="mt-2">
                                <div className="focus-within:outline-primary-color flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2">
                                    <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6"></div>
                                    <input
                                        value={data.youtube}
                                        onChange={(ev) => {
                                            setData('youtube', ev.target.value);
                                        }}
                                        id="youtube"
                                        name="username"
                                        type="text"
                                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-4">
                        <div className="w-full">
                            <label htmlFor="linkedin" className="flex flex-row items-center gap-2 text-sm/6 font-medium text-gray-900">
                                <FontAwesomeIcon color="#ef3620" icon={faLinkedin} size={'lg'} />
                                <p>LinkedIn</p>
                            </label>
                            <div className="mt-2">
                                <div className="focus-within:outline-primary-color flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2">
                                    <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6"></div>
                                    <input
                                        value={data.linkedin}
                                        onChange={(ev) => {
                                            setData('linkedin', ev.target.value);
                                        }}
                                        id="linkedin"
                                        name="username"
                                        type="text"
                                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <button className="text-primary-color border-primary-color hover:bg-primary-color rounded-full border px-4 py-2 font-bold transition duration-300 hover:text-white">
                        Actualizar
                    </button>
                </div>
            </form>
        </Dashboard>
    );
}
