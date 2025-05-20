import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Match } from '@/types/Match';
import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useState } from 'react';

interface Props extends PageProps {
    match: Match;
}

export default function Show({ match }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('ALL');
    const [positionFilter, setPositionFilter] = useState<string>('ALL');

    const formatTime = (timeString: string) => {
        const [hours, minutes] = timeString.split(':');

        const date = new Date();
        date.setHours(parseInt(hours));
        date.setMinutes(parseInt(minutes));
        return format(date, 'HH:mm', { locale: id });
    };

    const filteredParticipants = match.participants.filter((participant) => {
        const matchesSearch =
            !searchQuery ||
            participant.user?.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            participant.user?.nickname
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

        const matchesStatus =
            statusFilter === 'ALL' || participant.status === statusFilter;
        const matchesPosition =
            positionFilter === 'ALL' || participant.position === positionFilter;

        return matchesSearch && matchesStatus && matchesPosition;
    });

    const handleStatusChange = (
        participantId: number,
        newStatus: 'JOINED' | 'PENDING' | 'CANCELED',
    ) => {
        router.put(
            route('matches.participants.update', {
                match: match.id,
                participant: participantId,
            }),
            {
                status: newStatus,
            },
            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    const getStatusIcon = (status: 'JOINED' | 'PENDING' | 'CANCELED') => {
        switch (status) {
            case 'JOINED':
                return (
                    <svg
                        className="h-4 w-4 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                );
            case 'PENDING':
                return (
                    <svg
                        className="h-4 w-4 text-yellow-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                );
            case 'CANCELED':
                return (
                    <svg
                        className="h-4 w-4 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                );
        }
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
                            <div className="mb-12">
                                <div className="mb-6">
                                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Team Positions
                                    </h4>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                        Current status of each position and
                                        their required quotas
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                                    {match.positions.map((position, index) => {
                                        const totalParticipantJoinedBasedOnPositions =
                                            match.participants.filter(
                                                (p) =>
                                                    p.position ===
                                                    position.position,
                                            ).length;

                                        const getStatusLabel = () => {
                                            if (
                                                totalParticipantJoinedBasedOnPositions ==
                                                position.quota
                                            ) {
                                                return (
                                                    <span className="mt-3 inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20">
                                                        Position Filled
                                                    </span>
                                                );
                                            } else if (
                                                totalParticipantJoinedBasedOnPositions >
                                                position.quota
                                            ) {
                                                return (
                                                    <span className="mt-3 inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20">
                                                        {totalParticipantJoinedBasedOnPositions -
                                                            position.quota}{' '}
                                                        Extra Player
                                                        {totalParticipantJoinedBasedOnPositions -
                                                            position.quota >
                                                        1
                                                            ? 's'
                                                            : ''}
                                                    </span>
                                                );
                                            } else {
                                                return (
                                                    <span className="mt-3 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-500/20">
                                                        {position.quota -
                                                            totalParticipantJoinedBasedOnPositions}{' '}
                                                        Slot
                                                        {position.quota -
                                                            totalParticipantJoinedBasedOnPositions >
                                                        1
                                                            ? 's'
                                                            : ''}{' '}
                                                        Available
                                                    </span>
                                                );
                                            }
                                        };

                                        return (
                                            <div
                                                key={index}
                                                className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700"
                                            >
                                                <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    {position.position}
                                                </h5>
                                                <div className="mt-4 space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                                            Required
                                                        </span>
                                                        <span className="font-medium text-gray-900 dark:text-white">
                                                            {position.quota}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                                            Registered
                                                        </span>
                                                        <span className="font-medium text-gray-900 dark:text-white">
                                                            {
                                                                totalParticipantJoinedBasedOnPositions
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                                {getStatusLabel()}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Participant Statistics */}
                            <div className="mb-12">
                                <div className="mb-6">
                                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Match Participants
                                    </h4>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                        Current status and participation metrics
                                        for this match
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                            Total Registered
                                        </p>
                                        <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                            {
                                                match.participants.filter(
                                                    (p) =>
                                                        p.status === 'JOINED' ||
                                                        p.status === 'PENDING',
                                                ).length
                                            }{' '}
                                            / {match.max_players}
                                        </p>
                                    </div>
                                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                            Confirmed Players
                                        </p>
                                        <p className="mt-2 text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                                            {
                                                match.participants.filter(
                                                    (p) =>
                                                        p.status === 'JOINED',
                                                ).length
                                            }
                                        </p>
                                    </div>
                                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                            Awaiting Confirmation
                                        </p>
                                        <p className="mt-2 text-3xl font-bold text-amber-600 dark:text-amber-400">
                                            {
                                                match.participants.filter(
                                                    (p) =>
                                                        p.status === 'PENDING',
                                                ).length
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-2">
                                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                            Cancellations
                                        </p>
                                        <p className="mt-2 text-3xl font-bold text-rose-600 dark:text-rose-400">
                                            {
                                                match.participants.filter(
                                                    (p) =>
                                                        p.status === 'CANCELED',
                                                ).length
                                            }
                                        </p>
                                    </div>
                                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                            Available Slots
                                        </p>
                                        <p className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
                                            {match.max_players -
                                                match.participants.filter(
                                                    (p) =>
                                                        p.status === 'JOINED' ||
                                                        p.status === 'PENDING',
                                                ).length}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            {/* <div>
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
                            </div> */}

                            {/* Participants List */}
                            <div className="mt-8">
                                <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                                    <h4 className="text-2xl font-semibold">
                                        Participants
                                    </h4>
                                    <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Search participants..."
                                                value={searchQuery}
                                                onChange={(e) =>
                                                    setSearchQuery(
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-64 rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                                            />
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <svg
                                                    className="h-5 w-5 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <select
                                            value={statusFilter}
                                            onChange={(e) =>
                                                setStatusFilter(e.target.value)
                                            }
                                            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="ALL">
                                                All Status
                                            </option>
                                            <option value="JOINED">
                                                Joined
                                            </option>
                                            <option value="PENDING">
                                                Pending
                                            </option>
                                            <option value="CANCELED">
                                                Canceled
                                            </option>
                                        </select>
                                        <select
                                            value={positionFilter}
                                            onChange={(e) =>
                                                setPositionFilter(
                                                    e.target.value,
                                                )
                                            }
                                            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="ALL">
                                                All Positions
                                            </option>
                                            {match.positions.map((position) => (
                                                <option
                                                    key={position.position}
                                                    value={position.position}
                                                >
                                                    {position.position}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {filteredParticipants.map((participant) => (
                                        <div
                                            key={participant.id}
                                            className="flex items-center space-x-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-700"
                                        >
                                            {participant.user?.photo ? (
                                                <img
                                                    src={participant.user.photo}
                                                    alt={participant.user.name}
                                                    className="h-12 w-12 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600">
                                                    <span className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                                                        {participant.user?.name
                                                            ?.charAt(0)
                                                            .toUpperCase()}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <p className="font-semibold">
                                                    {participant.user?.name}
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {participant.user?.nickname}
                                                </p>
                                                <div className="mt-1 flex items-center space-x-2">
                                                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                        {participant.position}
                                                    </span>
                                                    <span
                                                        className={`flex items-center space-x-1 rounded-full px-2 py-1 text-xs font-medium ${
                                                            participant.status ===
                                                            'JOINED'
                                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                                : participant.status ===
                                                                    'PENDING'
                                                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                        }`}
                                                    >
                                                        {getStatusIcon(
                                                            participant.status,
                                                        )}
                                                        <span>
                                                            {participant.status}
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="relative">
                                                <select
                                                    value={participant.status}
                                                    onChange={(e) =>
                                                        handleStatusChange(
                                                            participant.id,
                                                            e.target.value as
                                                                | 'JOINED'
                                                                | 'PENDING'
                                                                | 'CANCELED',
                                                        )
                                                    }
                                                    className={`flex items-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white`}
                                                >
                                                    <option
                                                        value="PENDING"
                                                        className="flex items-center space-x-2"
                                                    >
                                                        PENDING
                                                    </option>
                                                    <option
                                                        value="JOINED"
                                                        className="flex items-center space-x-2"
                                                    >
                                                        JOINED
                                                    </option>
                                                    <option
                                                        value="CANCELED"
                                                        className="flex items-center space-x-2"
                                                    >
                                                        CANCELED
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {filteredParticipants.length === 0 && (
                                    <div className="mt-4 text-center text-gray-500 dark:text-gray-400">
                                        No participants found matching your
                                        search.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
