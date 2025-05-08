import { Link, useForm } from '@inertiajs/react';
// Assuming logo import works in your environment
import logo from '../../../images/logo.png';

import { Head } from '@inertiajs/react';

export default function AdminLogin() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('adm'));
    };

    return (
        <div className="bg-opacity-50 fixed top-0 left-0 z-10 flex h-screen w-screen flex-col items-center justify-center gap-10 bg-black/50">
            <Head>
                <title>Admin</title>
            </Head>
            <div className="font-roboto-condensed top-10 right-10 z-20 flex h-fit flex-col rounded-lg bg-white p-5 shadow-md">
                <Link className="self-center py-5" href={'/'}>
                    <img src={logo} alt="Logo" />
                </Link>

                <form onSubmit={onSubmit} className="flex h-full w-full flex-col justify-around gap-8">
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold" htmlFor="user">
                                Usuario
                            </label>
                            <input
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className={`h-[45px] w-full rounded-full pl-3 transition duration-300 ${
                                    errors.email
                                        ? 'border-red-500 outline outline-red-500 focus:outline-red-500'
                                        : 'focus:outline-primary-color outline outline-gray-300'
                                }`}
                                type="text"
                                name="user"
                                id="user"
                            />
                            {errors.email && <div className="mt-1 pl-3 text-sm text-red-500">{errors.email}</div>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold" htmlFor="password">
                                Contraseña
                            </label>
                            <input
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className={`h-[45px] w-full rounded-full pl-3 transition duration-300 ${
                                    errors.password
                                        ? 'border-red-500 outline outline-red-500 focus:outline-red-500'
                                        : 'focus:outline-primary-color outline outline-gray-300'
                                }`}
                                type="password"
                                name="password"
                                id="password"
                            />
                            {errors.password && <div className="mt-1 pl-3 text-sm text-red-500">{errors.password}</div>}
                        </div>
                    </div>

                    <div className="h-[0.5px] w-full bg-gray-300"></div>

                    <button
                        className="bg-primary-color h-[47px] w-full self-center rounded-full font-bold text-white"
                        type="submit"
                        disabled={processing}
                    >
                        {processing ? 'Iniciando Sesion...' : 'Iniciar Sesion'}
                    </button>
                </form>
            </div>
        </div>
    );
}
