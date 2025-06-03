import BannerInicio from '@/components/home/bannerInicio';
import CategoriasInicio from '@/components/home/categoriasInicio';
import NosotrosInicio from '@/components/home/nosotrosInicio';
import NovedadesInicio from '@/components/home/novedadesInicio';
import NuestrosProductosInicio from '@/components/home/nuestrosProductosInicio';
import SliderHome from '@/components/home/slider';
import { Head } from '@inertiajs/react';
import DefaultLayout from './defaultLayout';

export default function Home() {
    return (
        <DefaultLayout>
            <Head>
                <title>Inicio</title>
            </Head>
            <SliderHome />
            <CategoriasInicio />
            <NuestrosProductosInicio />
            <NosotrosInicio />
            <BannerInicio />
            <NovedadesInicio />
        </DefaultLayout>
    );
}
