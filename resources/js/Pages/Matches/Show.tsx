import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Match } from '@/types/Match';
import { Head } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface Props extends PageProps {
    match: Match;
}

export default function Show({ match }: Props) {
    const formatTime = (timeString: string) => {
        const [hours, minutes] = timeString.split(':');

        const date = new Date();
        date.setHours(parseInt(hours));
        date.setMinutes(parseInt(minutes));
        return format(date, 'HH:mm', { locale: id });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Match Details
                </h2>
            }
        >
            <Head title="Match Details" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* Match Poster */}
                            <div className="mb-8">
                                <img
                                    src={match.poster}
                                    alt={match.name}
                                    className="h-96 w-full rounded-lg object-cover"
                                />
                            </div>

                            {/* Match Information */}
                            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <h3 className="mb-4 text-2xl font-bold">
                                        {match.name}
                                    </h3>
                                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                                        {match.description}
                                    </p>

                                    <div className="space-y-2">
                                        <p>
                                            <span className="font-semibold">
                                                Game Type:
                                            </span>{' '}
                                            {match.game_type}
                                        </p>
                                        <p>
                                            <span className="font-semibold">
                                                Venue:
                                            </span>{' '}
                                            {match.venue}
                                        </p>
                                        <p>
                                            <span className="font-semibold">
                                                Address:
                                            </span>{' '}
                                            {match.address}
                                        </p>
                                        <p>
                                            <span className="font-semibold">
                                                Date:
                                            </span>{' '}
                                            {format(
                                                new Date(match.date),
                                                'MMMM d, yyyy',
                                                { locale: id },
                                            )}
                                        </p>
                                        <p>
                                            <span className="font-semibold">
                                                Time:
                                            </span>{' '}
                                            {formatTime(match.time)}
                                            {match.time}
                                        </p>
                                        <p>
                                            <span className="font-semibold">
                                                Price:
                                            </span>{' '}
                                            Rp {match.price.toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="mb-4 text-xl font-semibold">
                                        Community Information
                                    </h4>
                                    {match.community && (
                                        <div className="space-y-2">
                                            <p>
                                                <span className="font-semibold">
                                                    Community:
                                                </span>{' '}
                                                {match.community.name}
                                            </p>
                                            {match.community.sport && (
                                                <p>
                                                    <span className="font-semibold">
                                                        Sport:
                                                    </span>{' '}
                                                    {match.community.sport.name}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Positions and Quotas */}
                            <div className="mb-8">
                                <h4 className="mb-4 text-xl font-semibold">
                                    Positions and Quotas
                                </h4>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    {match.positions.map((position, index) => (
                                        <div
                                            key={index}
                                            className="rounded-lg bg-gray-100 p-4 dark:bg-gray-700"
                                        >
                                            <p className="font-semibold">
                                                {position.position}
                                            </p>
                                            <p>Quota: {position.quota}</p>
                                            <p>
                                                Participants:{' '}
                                                {match.participants}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Social Links */}
                            <div>
                                <h4 className="mb-4 text-xl font-semibold">
                                    Social Links
                                </h4>
                                <div className="flex space-x-4">
                                    {match.social_link.whatsapp && (
                                        <a
                                            href={match.social_link.whatsapp}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                                        >
                                            WhatsApp Group
                                        </a>
                                    )}
                                    {match.social_link.telegram && (
                                        <a
                                            href={match.social_link.telegram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                        >
                                            Telegram Group
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
