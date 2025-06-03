import { Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const SliderHome = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const { slider, medidas } = usePage().props;

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

    const handleMedidaChange = (medida) => {
        router.get(`/medidas/${medida}`);
    };

    return (
        <div className="relative h-[400px] w-full overflow-hidden bg-gray-900 sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[768px]">
            {/* Slider Container */}
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
                        <div className="absolute inset-0 mx-auto flex w-full max-w-[1200px] items-center justify-start px-4 sm:px-6 md:px-8 lg:px-12 xl:px-0">
                            <div className="flex flex-col gap-8 text-white sm:gap-12 md:gap-16 lg:gap-20">
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-2xl leading-tight font-semibold sm:text-3xl md:text-4xl lg:text-5xl xl:text-[64px]">
                                        {slide.title}
                                    </h1>
                                    <p className="max-w-[280px] text-sm leading-tight sm:max-w-[350px] sm:text-base md:max-w-[450px] md:text-lg lg:max-w-[560px] lg:text-xl xl:text-[24px]">
                                        {slide.subtitle}
                                    </p>
                                </div>

                                <Link
                                    href={slide.link}
                                    className="bg-primary-color flex h-[32px] w-[140px] items-center justify-center rounded-full text-sm font-semibold text-white transition-colors duration-300 hover:bg-red-600 sm:h-[35px] sm:w-[160px] sm:text-base md:h-[38px] md:w-[185px]"
                                >
                                    Mas info
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Indicadores */}
            <div className="absolute bottom-[120px] left-1/2 z-20 flex -translate-x-1/2 space-x-2 sm:bottom-[140px] md:bottom-[160px] lg:bottom-[180px] xl:bottom-[200px]">
                {slider.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-[3px] w-6 rounded transition-all duration-300 sm:h-[4px] sm:w-8 md:w-9 ${
                            index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
                        }`}
                    />
                ))}
            </div>

            {/* Barra de medidas */}
            <div className="bg-primary-color absolute bottom-4 left-1/2 z-20 flex h-[60px] w-[95%] max-w-[1200px] -translate-x-1/2 items-center justify-center rounded-lg text-white shadow-lg sm:bottom-6 sm:h-[70px] sm:w-[90%] md:bottom-8 md:h-[80px] md:w-[85%] lg:bottom-10 lg:h-[90px] lg:w-[80%] xl:h-[100px] xl:w-[1200px]">
                <div className="flex w-full flex-col items-center justify-between gap-2 px-4 sm:flex-row sm:gap-4 sm:px-6 md:px-8 lg:px-12 xl:px-24">
                    <p className="text-center text-xs font-medium sm:text-left sm:text-sm md:text-base lg:text-lg xl:text-[20px]">
                        Encuentre el neumático ideal para su vehículo
                    </p>
                    <select
                        onChange={(e) => handleMedidaChange(e.target.value)}
                        className="h-[35px] w-full rounded-lg border px-2 text-sm text-white sm:h-[38px] sm:w-[250px] sm:px-3 sm:text-base md:h-[42px] md:w-[300px] md:px-4 lg:h-[45px] lg:w-[350px] xl:w-[392px]"
                        name=""
                    >
                        <option className="text-black" value="" defaultValue="">
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
