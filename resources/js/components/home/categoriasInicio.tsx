import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function CategoriasInicio() {
    const { categorias } = usePage().props;

    const [hoveredId, setHoveredId] = useState(null);

    return (
        <div className="flex w-full flex-row py-16">
            {categorias?.map((categoria) => (
                <Link
                    href={`/productos/${categoria.id}`}
                    onMouseEnter={() => setHoveredId(categoria.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    key={categoria.id}
                    className="relative flex h-[450px] w-full items-end justify-center"
                >
                    <img src={categoria?.image} className="absolute inset-0 h-full w-full object-cover object-center" alt="" />
                    <div className={`absolute z-10 h-full w-full transition-all duration-300 ${hoveredId === categoria.id ? '' : 'bg-black/50'}`} />
                    <h2 className="absolute bottom-8 z-20 text-[35px] font-semibold text-white">{categoria?.title}</h2>
                </Link>
            ))}
        </div>
    );
}
