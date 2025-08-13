import { Link, usePage } from '@inertiajs/react';

export default function BannerInicio() {
    const { contenido } = usePage().props;

    return (
        <div style={{ backgroundImage: `url(${contenido?.garantia_bg})` }} className="mb-16 h-[513px] w-full bg-cover bg-center bg-no-repeat">
            <div className="mx-auto flex h-full w-[1200px] flex-row items-center text-white">
                <div className="flex w-2/3 flex-col">
                    <h2 className="text-[35px] font-semibold">{contenido?.garantia_title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: contenido?.garantia_text }} />
                </div>
                <div className="flex w-1/3 flex-col items-center">
                    <Link
                        href="/solicitud-de-presupuesto"
                        className="bg-primary-color flex h-[38px] w-[184px] items-center justify-center rounded-full"
                    >
                        Más info
                    </Link>
                </div>
            </div>
        </div>
    );
}
