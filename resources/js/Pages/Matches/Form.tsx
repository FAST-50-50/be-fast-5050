import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Match } from '@/types/Match';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Props extends PageProps {
    match?: Match;
    sports?: { id: number; name: string }[];
    communities?: { id: number; name: string }[];
}

interface Position {
    [key: string]: string | number;
    position: string;
    quota: number;
}

type FormData = {
    name: string;
    description: string;
    community_id: string | number;
    game_type: string;
    venue: string;
    address: string;
    location_link: string;
    date: string;
    time: string;
    with_fg: boolean;
    with_vg: boolean;
    with_referee: boolean;
    with_linesman: boolean;
    max_players: number;
    min_players: number;
    price: number;
    social_link: { whatsapp?: string; telegram?: string };
    poster: string;
    positions: Position[];
};

export default function MatchForm({ match, communities }: Props) {
    const isEditing = !!match;
    const [positions, setPositions] = useState<Position[]>(
        match?.positions || [{ position: '', quota: 0 }],
    );

    const { data, setData, post, put, processing, errors, reset } =
        useForm<FormData>({
            name: match?.name || '',
            description: match?.description || '',
            community_id: match?.community_id || '',
            game_type: match?.game_type || '',
            venue: match?.venue || '',
            address: match?.address || '',
            location_link: match?.location_link || '',
            date: match?.date || '',
            time: match?.time || '',
            with_fg: match?.with_fg || false,
            with_vg: match?.with_vg || false,
            with_referee: match?.with_referee || false,
            with_linesman: match?.with_linesman || false,
            max_players: match?.max_players || 0,
            min_players: match?.min_players || 0,
            price: match?.price || 0,
            social_link: match?.social_link || { whatsapp: '', telegram: '' },
            poster: match?.poster || '',
            positions: positions.map((pos) => ({ ...pos })),
        });

    const addPosition = () => {
        setPositions([...positions, { position: '', quota: 0 }]);
    };

    const removePosition = (index: number) => {
        const newPositions = positions.filter((_, i) => i !== index);
        setPositions(newPositions);
        setData(
            'positions',
            newPositions.map((pos) => ({ ...pos })),
        );
    };

    const updatePosition = (
        index: number,
        field: keyof Position,
        value: string | number,
    ) => {
        const newPositions = positions.map((pos, i) =>
            i === index ? { ...pos, [field]: value } : pos,
        );
        setPositions(newPositions);
        setData(
            'positions',
            newPositions.map((pos) => ({ ...pos })),
        );
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            put(route('matches.update', match.id), {
                onSuccess: () => reset(),
            });
        } else {
            post(route('matches.store'), {
                onSuccess: () => reset(),
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {isEditing ? 'Edit Match' : 'Create New Match'}
                </h2>
            }
        >
            <Head title={isEditing ? 'Edit Match' : 'Create New Match'} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit}>
                                <div className="mt-4">
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="description"
                                        value="Description"
                                    />
                                    <TextInput
                                        id="description"
                                        type="text"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.description}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="community_id"
                                        value="Community"
                                    />
                                    <select
                                        id="community_id"
                                        name="community_id"
                                        value={data.community_id}
                                        onChange={(e) =>
                                            setData(
                                                'community_id',
                                                Number(e.target.value),
                                            )
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                        required
                                    >
                                        <option value="">
                                            Select a community
                                        </option>
                                        {communities?.map((community) => (
                                            <option
                                                key={community.id}
                                                value={community.id}
                                            >
                                                {community.name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError
                                        message={errors.community_id}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="game_type"
                                        value="Game Type"
                                    />
                                    <TextInput
                                        id="game_type"
                                        type="text"
                                        name="game_type"
                                        value={data.game_type}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData('game_type', e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.game_type}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="venue" value="Venue" />
                                    <TextInput
                                        id="venue"
                                        type="text"
                                        name="venue"
                                        value={data.venue}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData('venue', e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.venue}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="address"
                                        value="Address"
                                    />
                                    <TextInput
                                        id="address"
                                        type="text"
                                        name="address"
                                        value={data.address}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData('address', e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.address}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="location_link"
                                        value="Location Link"
                                    />
                                    <TextInput
                                        id="location_link"
                                        type="text"
                                        name="location_link"
                                        value={data.location_link}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                'location_link',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.location_link}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="date" value="Date" />
                                    <TextInput
                                        id="date"
                                        type="date"
                                        name="date"
                                        value={data.date}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData('date', e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.date}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="time" value="Time" />
                                    <TextInput
                                        id="time"
                                        type="time"
                                        name="time"
                                        value={data.time}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData('time', e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.time}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="max_players"
                                        value="Maximum Players"
                                    />
                                    <TextInput
                                        id="max_players"
                                        type="number"
                                        name="max_players"
                                        value={data.max_players}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                'max_players',
                                                Number(e.target.value),
                                            )
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.max_players}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="min_players"
                                        value="Minimum Players"
                                    />
                                    <TextInput
                                        id="min_players"
                                        type="number"
                                        name="min_players"
                                        value={data.min_players}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                'min_players',
                                                Number(e.target.value),
                                            )
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.min_players}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="price" value="Price" />
                                    <TextInput
                                        id="price"
                                        type="number"
                                        name="price"
                                        value={data.price}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                'price',
                                                Number(e.target.value),
                                            )
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.price}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="with_fg"
                                            checked={data.with_fg}
                                            onChange={(e) =>
                                                setData(
                                                    'with_fg',
                                                    e.target.checked,
                                                )
                                            }
                                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                            With Field Goal
                                        </span>
                                    </label>
                                </div>

                                <div className="mt-4">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="with_vg"
                                            checked={data.with_vg}
                                            onChange={(e) =>
                                                setData(
                                                    'with_vg',
                                                    e.target.checked,
                                                )
                                            }
                                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                            With Video Goal
                                        </span>
                                    </label>
                                </div>

                                <div className="mt-4">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="with_referee"
                                            checked={data.with_referee}
                                            onChange={(e) =>
                                                setData(
                                                    'with_referee',
                                                    e.target.checked,
                                                )
                                            }
                                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                            With Referee
                                        </span>
                                    </label>
                                </div>

                                <div className="mt-4">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="with_linesman"
                                            checked={data.with_linesman}
                                            onChange={(e) =>
                                                setData(
                                                    'with_linesman',
                                                    e.target.checked,
                                                )
                                            }
                                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                            With Linesman
                                        </span>
                                    </label>
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="poster"
                                        value="Poster URL"
                                    />
                                    <TextInput
                                        id="poster"
                                        type="text"
                                        name="poster"
                                        value={data.poster}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData('poster', e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.poster}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <div className="flex items-center justify-between">
                                        <InputLabel value="Positions" />
                                        <button
                                            type="button"
                                            onClick={addPosition}
                                            className="text-sm text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                        >
                                            Add Position
                                        </button>
                                    </div>
                                    {positions.map((position, index) => (
                                        <div
                                            key={index}
                                            className="mt-2 flex gap-2"
                                        >
                                            <div className="flex-1">
                                                <TextInput
                                                    type="text"
                                                    value={position.position}
                                                    onChange={(e) =>
                                                        updatePosition(
                                                            index,
                                                            'position',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Position name"
                                                    className="mt-1 block w-full"
                                                />
                                            </div>
                                            <div className="w-24">
                                                <TextInput
                                                    type="number"
                                                    value={position.quota}
                                                    onChange={(e) =>
                                                        updatePosition(
                                                            index,
                                                            'quota',
                                                            Number(
                                                                e.target.value,
                                                            ),
                                                        )
                                                    }
                                                    placeholder="Quota"
                                                    className="mt-1 block w-full"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removePosition(index)
                                                }
                                                className="mt-1 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <InputError
                                        message={errors.positions}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4 flex items-center justify-end">
                                    <PrimaryButton
                                        className="ml-4"
                                        disabled={processing}
                                    >
                                        {isEditing
                                            ? 'Update Match'
                                            : 'Create Match'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
