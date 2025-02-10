import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const [secretClickCount, setSecretClickCount] = useState(0);

    const onPressSecretPage = () => {
        setSecretClickCount(secretClickCount + 1);
        if (secretClickCount < 10) return;
        window.location.href = route(auth.user ? 'dashboard' : 'login');
    };

    return (
        <>
            <Head title="Welcome" />

            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <img
                    id="background"
                    className="absolute w-full"
                    src="https://i.ibb.co.com/Gvvck9cq/PEATIMES-0001.jpg"
                />
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:col-start-2 lg:justify-center">
                                <img
                                    onClick={onPressSecretPage}
                                    className="h-32"
                                    src="https://i.ibb.co.com/60XqWn04/Official-Logo.png"
                                    alt="Laravel Logo"
                                />
                            </div>
                        </header>
                        {/* <p className="py-16 text-center text-sm text-black dark:text-white/70">
                            FAST 50:50 Bandung - 2025
                        </p> */}
                    </div>
                </div>
            </div>
        </>
    );
}
