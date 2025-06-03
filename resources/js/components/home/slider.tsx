import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const SliderHome = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const { slider, medidas } = usePage().props;

    // Datos de ejemplo - reemplaza con tus propios datos

    // Auto-play functionality
    useEffect(() => {
        if (isAutoPlaying) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % slider.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [isAutoPlaying, slider.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const goToPrevious = () => {
        setCurrentSlide((prev) => (prev - 1 + slider.length) % slider.length);
    };

    const goToNext = () => {
        setCurrentSlide((prev) => (prev + 1) % slider.length);
    };

    const toggleAutoPlay = () => {
        setIsAutoPlaying(!isAutoPlaying);
    };

    return (
        <div className="relative h-[768px] w-full overflow-hidden bg-gray-900">
            {/* slider Container */}
            <div className="flex h-full transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slider.map((slide, index) => (
                    <div key={slide.id} className="relative h-full w-full flex-shrink-0">
                        {/* Background Media */}
                        {slide.type === 'image' ? (
                            <img src={slide.media} alt={slide.title} className="h-full w-full object-cover" />
                        ) : (
                            <video
                                src={slide.media}
                                poster={slide.poster}
                                className="h-full w-full object-cover"
                                autoPlay={index === currentSlide}
                                muted
                                loop
                            />
                        )}

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black/50"></div>

                        {/* Content */}
                        <div className="absolute inset-0 mx-auto flex w-[1200px] items-center justify-start">
                            <div className="flex flex-col gap-20 text-white">
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-[64px] leading-tight font-semibold md:text-5xl lg:text-6xl">{slide.title}</h1>
                                    <p className="max-w-[560px] text-[24px] leading-tight">{slide.subtitle}</p>
                                </div>

                                <button className="bg-primary-color h-[38px] w-[185px] rounded-full font-semibold text-white transition-colors duration-300 hover:bg-red-600">
                                    Mas info
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Indicadores */}
            <div className="absolute bottom-[200px] left-1/2 z-20 flex -translate-x-1/2 space-x-2">
                {slider.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-[4px] w-9 rounded transition-all duration-300 ${
                            index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
                        }`}
                    />
                ))}
            </div>

            {/* Barra de medidas */}
            <div className="bg-primary-color absolute bottom-10 left-1/2 z-20 flex h-[100px] w-[1200px] -translate-x-1/2 items-center justify-center rounded-lg text-white shadow-lg">
                <div className="flex w-full items-center justify-between px-24">
                    <p className="text-[20px] font-medium">Encuentre el neumático ideal para su vehículo</p>
                    <select className="h-[45px] w-[392px] rounded-lg border px-4 text-white" name="">
                        <option className="text-black" value="" selected>
                            Seleccionar medida
                        </option>
                        {medidas.map((medida) => (
                            <option className="text-black" key={medida.id} value={medida.id}>
                                {medida.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default SliderHome;
