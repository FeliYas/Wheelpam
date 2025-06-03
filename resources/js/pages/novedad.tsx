import { Head, usePage } from '@inertiajs/react';
import DefaultLayout from './defaultLayout';

export default function Novedad() {
    const { novedad } = usePage().props;

    return (
        <DefaultLayout>
            <Head>
                <title>{novedad?.title}</title>
            </Head>
            <div
                style={{
                    background:
                        'linear-gradient(180deg, rgba(0, 0, 0, 0.80) 27%, rgba(0, 0, 0, 0.00) 138.44%), url(<path-to-image>) lightgray -215.64px -286.999px / 121.977% 216.954% no-repeat',
                    mixBlendMode: 'multiply',
                }}
                className="relative flex h-[250px] w-full items-end justify-center sm:h-[300px] md:h-[400px]"
            >
                <img className="absolute h-full w-full object-cover object-center" src={novedad?.image} alt="Banner nosotros" />
            </div>
            <div className="mx-auto my-20 w-[1200px]">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col">
                        <p className="text-primary-color text-[16px] font-bold uppercase">{novedad?.type}</p>
                        <h2 className="z-10 mx-auto w-[1200px] text-3xl font-bold text-black sm:text-4xl">{novedad?.title}</h2>
                    </div>

                    <div dangerouslySetInnerHTML={{ __html: novedad?.text }} />
                </div>
            </div>
        </DefaultLayout>
    );
}
