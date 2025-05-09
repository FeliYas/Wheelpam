import { Head } from '@inertiajs/react';
import DefaultLayout from './defaultLayout';

export default function Home() {
    return (
        <DefaultLayout>
            <Head>
                <title>Inicio</title>
            </Head>
            <div className="h-[40vh] w-full bg-black/50"></div>
        </DefaultLayout>
    );
}
