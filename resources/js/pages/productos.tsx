import { Head, Link } from '@inertiajs/react';
import DefaultLayout from './defaultLayout';

export default function Productos({ categorias, banner }) {
    return (
        <DefaultLayout>
            <Head title="Productos" />
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
                    / <Link href={'/productos'}>Productos</Link>
                </div>
                <img className="absolute h-full w-full object-cover object-center" src={banner?.image} alt="Banner productos" />
                <h2 className="absolute z-10 mx-auto w-[1200px] pb-20 text-3xl font-bold text-white sm:text-4xl">Productos</h2>
            </div>
            <h1>Productos</h1>
        </DefaultLayout>
    );
}
