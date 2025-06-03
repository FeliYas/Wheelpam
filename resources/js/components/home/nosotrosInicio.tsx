import { Link, usePage } from '@inertiajs/react';

export default function NosotrosInicio() {
    const { contenido } = usePage().props;

    return (
        <div className="mb-8 flex h-auto w-full flex-col sm:mb-12 sm:h-[500px] sm:flex-row md:h-[600px] lg:mb-16 lg:h-[650px]">
            <div className="order-2 h-[300px] w-full sm:order-1 sm:h-full sm:w-1/2">
                <img src={contenido?.nosotros_image} className="h-full w-full object-cover" alt={contenido?.nosotros_title || 'Nosotros'} />
            </div>
            <div className="order-1 flex h-auto w-full items-center justify-center bg-black text-white sm:order-2 sm:h-full sm:w-1/2">
                <div className="flex h-full w-full flex-col justify-between gap-6 px-6 py-8 sm:gap-0 sm:px-8 sm:py-10 md:px-10 lg:px-14">
                    <h2 className="text-2xl leading-tight font-semibold sm:text-3xl md:text-[32px] lg:text-[35px]">{contenido?.nosotros_title}</h2>

                    <div
                        className="flex-1 overflow-hidden text-sm leading-relaxed sm:flex-none sm:text-base"
                        dangerouslySetInnerHTML={{ __html: contenido?.nosotros_text }}
                    />

                    <Link
                        href="/nosotros"
                        className="bg-primary-color flex h-[36px] w-[160px] items-center justify-center self-start rounded-full text-sm font-medium transition-opacity duration-300 hover:opacity-90 sm:h-[38px] sm:w-[184px] sm:text-[15px]"
                    >
                        Más info
                    </Link>
                </div>
            </div>
        </div>
    );
}
