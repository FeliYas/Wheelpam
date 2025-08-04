import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import DefaultLayout from './defaultLayout';

export default function Novedad() {
    const { novedad } = usePage().props;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const images = novedad?.imagenes || [];
    const hasMultipleImages = images.length > 1;
    const autoSlideInterval = 4000; // 4 segundos

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToImage = (index) => {
        setCurrentImageIndex(index);
    };

    // Auto-slide effect
    useEffect(() => {
        if (!hasMultipleImages || isHovered) return;

        const interval = setInterval(() => {
            nextImage();
        }, autoSlideInterval);

        return () => clearInterval(interval);
    }, [currentImageIndex, hasMultipleImages, isHovered]);

    return (
        <DefaultLayout>
            <Head>
                <title>{novedad?.title}</title>
            </Head>

            {/* Hero Section with Image Slider */}
            <div
                className="relative flex h-[250px] w-full items-end justify-center sm:h-[300px] md:h-[400px]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Background Gradient Overlay */}
                <div
                    className="absolute inset-0 z-10"
                    style={{
                        background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.50) 27%, rgba(0, 0, 0, 0.00) 138.44%)',
                        mixBlendMode: 'multiply',
                    }}
                />

                {/* Image Container */}
                <div className="relative h-full w-full overflow-hidden">
                    {images.map((imagen, index) => (
                        <img
                            key={index}
                            className={`absolute h-full w-full object-cover object-center transition-opacity duration-500 ${
                                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                            src={imagen?.image}
                            alt={`Banner ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Navigation Arrows - Only show if multiple images */}
                {hasMultipleImages && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute top-1/2 left-4 z-20 -translate-y-1/2 rounded-full p-2 text-white transition-all"
                            aria-label="Imagen anterior"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            onClick={nextImage}
                            className="absolute top-1/2 right-4 z-20 -translate-y-1/2 rounded-full text-white transition-all"
                            aria-label="Imagen siguiente"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}

                {/* Dots Indicator - Only show if multiple images */}
                {hasMultipleImages && (
                    <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToImage(index)}
                                className={`h-1 w-6 transition-all ${index === currentImageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'}`}
                                aria-label={`Ir a imagen ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="mx-auto my-20 w-full max-w-[1200px] px-4">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col">
                        <p className="text-primary-color text-[16px] font-bold uppercase">{novedad?.type}</p>
                        <h2 className="text-3xl font-bold text-black sm:text-4xl">{novedad?.title}</h2>
                    </div>

                    <div dangerouslySetInnerHTML={{ __html: novedad?.text }} />
                </div>
            </div>
        </DefaultLayout>
    );
}
