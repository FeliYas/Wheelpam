import { Link, usePage } from '@inertiajs/react';

export default function NosotrosInicio() {
    const { contenido } = usePage().props;

    return (
        <div className="mb-16 flex h-[650px] w-full flex-row">
            <div className="h-full w-full">
                <img src={contenido?.nosotros_image} className="h-full w-full object-cover" alt="" />
            </div>
            <div className="flex h-full w-full items-center justify-center bg-black text-white">
                <div className="flex h-full w-full flex-col justify-between px-14 py-10">
                    <h2 className="text-[35px] font-semibold">{contenido?.nosotros_title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: contenido?.nosotros_text }} />
                    <Link
                        href="/nosotros"
                        className="bg-primary-color flex h-[38px] w-[184px] items-center justify-center rounded-full text-[15px] font-medium"
                    >
                        Más info
                    </Link>
                </div>
            </div>
        </div>
    );
}
