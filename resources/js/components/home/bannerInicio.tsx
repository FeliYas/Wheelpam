import { Link, usePage } from '@inertiajs/react';

export default function BannerInicio() {
    const { contenido } = usePage().props;

    return (
        <div className="mb-16 h-[513px] w-full bg-black/50">
            <div className="mx-auto flex h-full w-[1200px] flex-row items-center text-white">
                <div className="flex w-2/3 flex-col">
                    <h2 className="text-[35px] font-semibold">{contenido?.garantia_title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: contenido?.garantia_text }} />
                </div>
                <div className="flex w-1/3 flex-col items-center">
                    <img src={contenido?.garantia_image} className="h-full w-full" alt="" />
                    <Link href="/garantia" className="bg-primary-color flex h-[38px] w-[184px] items-center justify-center rounded-full">
                        Más info
                    </Link>
                </div>
            </div>
        </div>
    );
}
