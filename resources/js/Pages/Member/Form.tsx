import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { User } from '@/types/User';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Props extends PageProps {
    member?: User;
    communities?: { id: number; name: string }[];
}

export default function MemberForm({ member, communities }: Props) {
    const isEditing = !!member;
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, put, processing, errors, reset } = useForm({
        // User fields
        username: member?.username || '',
        phone: member?.phone || '',
        role: member?.role || 'MEMBER',
        password: '',
        password_confirmation: '',

        // UserDetail fields
        fullname: member?.user_detail?.fullname || '',
        nickname: member?.user_detail?.nickname || '',
        birth_year: member?.user_detail?.birth_year || '',
        wa: member?.user_detail?.wa || '',
        ig: member?.user_detail?.ig || '',
        telu_relation: member?.user_detail?.telu_relation || [],
        photo: member?.user_detail?.photo || '',
        skills: member?.user_detail?.skills || [],

        // UserCommunity fields
        community_ids: member?.communities?.map((c) => c.id) || [],
        joined_since: member?.user_community?.[0]?.joined_since || '',
        total_matches: member?.user_community?.[0]?.total_matches || 0,
        preferred_positions:
            member?.user_community?.[0]?.preferred_positions || [],
        favorite_position: member?.user_community?.[0]?.favorite_position || '',
        least_favorite_position:
            member?.user_community?.[0]?.least_favorite_position || [],
        game_types: member?.user_community?.[0]?.game_types || [],
        favorite_team: member?.user_community?.[0]?.favorite_team || '',
        experience_level:
            member?.user_community?.[0]?.experience_level || 'Club',
        owned_jerseys: member?.user_community?.[0]?.owned_jerseys || [],
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            put(route('members.update', member.id), {
                onSuccess: () => reset(),
            });
        } else {
            post(route('members.store'), {
                onSuccess: () => reset(),
            });
        }
    };

    const positions = [
        'Goalkeeper',
        'Center Back',
        'Right Back',
        'Left Back',
        'Defensive Midfielder',
        'Central Midfielder',
        'Right Midfielder',
        'Left Midfielder',
        'Attacking Midfielder',
        'Right Winger',
        'Left Winger',
        'Striker',
    ];

    const gameTypes = [
        'Friendly Match',
        'Tournament',
        'League',
        'Training',
        'Futsal',
        'Indoor',
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {isEditing ? 'Edit Member' : 'Create New Member'}
                </h2>
            }
        >
            <Head title={isEditing ? 'Edit Member' : 'Create New Member'} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit} className="space-y-8">
                                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                    {/* User Fields */}
                                    <div className="space-y-6 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                            User Information
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <InputLabel
                                                    htmlFor="username"
                                                    value="Username"
                                                />
                                                <TextInput
                                                    id="username"
                                                    type="text"
                                                    name="username"
                                                    value={data.username}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            'username',
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                />
                                                <InputError
                                                    message={errors.username}
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="phone"
                                                    value="Phone Number"
                                                />
                                                <TextInput
                                                    id="phone"
                                                    type="text"
                                                    name="phone"
                                                    value={data.phone}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            'phone',
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                />
                                                <InputError
                                                    message={errors.phone}
                                                    className="mt-2"
                                                />
                                            </div>

                                            {!isEditing && (
                                                <>
                                                    <div>
                                                        <InputLabel
                                                            htmlFor="password"
                                                            value="Password"
                                                        />
                                                        <div className="relative">
                                                            <TextInput
                                                                id="password"
                                                                type={
                                                                    showPassword
                                                                        ? 'text'
                                                                        : 'password'
                                                                }
                                                                name="password"
                                                                value={
                                                                    data.password
                                                                }
                                                                className="mt-1 block w-full"
                                                                onChange={(e) =>
                                                                    setData(
                                                                        'password',
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                required={
                                                                    !isEditing
                                                                }
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setShowPassword(
                                                                        !showPassword,
                                                                    )
                                                                }
                                                                className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                                            >
                                                                {showPassword
                                                                    ? 'Hide'
                                                                    : 'Show'}
                                                            </button>
                                                        </div>
                                                        <InputError
                                                            message={
                                                                errors.password
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>

                                                    <div>
                                                        <InputLabel
                                                            htmlFor="password_confirmation"
                                                            value="Confirm Password"
                                                        />
                                                        <TextInput
                                                            id="password_confirmation"
                                                            type={
                                                                showPassword
                                                                    ? 'text'
                                                                    : 'password'
                                                            }
                                                            name="password_confirmation"
                                                            value={
                                                                data.password_confirmation
                                                            }
                                                            className="mt-1 block w-full"
                                                            onChange={(e) =>
                                                                setData(
                                                                    'password_confirmation',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            required={
                                                                !isEditing
                                                            }
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.password_confirmation
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </>
                                            )}

                                            <div>
                                                <InputLabel
                                                    htmlFor="role"
                                                    value="Role"
                                                />
                                                <select
                                                    id="role"
                                                    name="role"
                                                    value={data.role}
                                                    onChange={(e) =>
                                                        setData(
                                                            'role',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                                    required
                                                >
                                                    <option value="MEMBER">
                                                        Member
                                                    </option>
                                                    <option value="ADMIN">
                                                        Admin
                                                    </option>
                                                </select>
                                                <InputError
                                                    message={errors.role}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* UserDetail Fields */}
                                    <div className="space-y-6 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                            Personal Information
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <InputLabel
                                                    htmlFor="fullname"
                                                    value="Full Name"
                                                />
                                                <TextInput
                                                    id="fullname"
                                                    type="text"
                                                    name="fullname"
                                                    value={data.fullname}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            'fullname',
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                />
                                                <InputError
                                                    message={errors.fullname}
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="nickname"
                                                    value="Nickname"
                                                />
                                                <TextInput
                                                    id="nickname"
                                                    type="text"
                                                    name="nickname"
                                                    value={data.nickname}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            'nickname',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <InputError
                                                    message={errors.nickname}
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="birth_year"
                                                    value="Birth Year"
                                                />
                                                <TextInput
                                                    id="birth_year"
                                                    type="text"
                                                    name="birth_year"
                                                    value={data.birth_year}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            'birth_year',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <InputError
                                                    message={errors.birth_year}
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="wa"
                                                    value="WhatsApp Number"
                                                />
                                                <TextInput
                                                    id="wa"
                                                    type="text"
                                                    name="wa"
                                                    value={data.wa}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            'wa',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <InputError
                                                    message={errors.wa}
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="ig"
                                                    value="Instagram"
                                                />
                                                <TextInput
                                                    id="ig"
                                                    type="text"
                                                    name="ig"
                                                    value={data.ig}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            'ig',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <InputError
                                                    message={errors.ig}
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="photo"
                                                    value="Photo URL"
                                                />
                                                <TextInput
                                                    id="photo"
                                                    type="text"
                                                    name="photo"
                                                    value={data.photo}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            'photo',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <InputError
                                                    message={errors.photo}
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="telu_relation"
                                                    value="Telkom University Relation"
                                                />
                                                <select
                                                    id="telu_relation"
                                                    name="telu_relation"
                                                    multiple
                                                    value={data.telu_relation}
                                                    onChange={(e) => {
                                                        const selectedOptions =
                                                            Array.from(
                                                                e.target
                                                                    .selectedOptions,
                                                            ).map(
                                                                (option) =>
                                                                    option.value,
                                                            );
                                                        setData(
                                                            'telu_relation',
                                                            selectedOptions,
                                                        );
                                                    }}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                                >
                                                    <option value="Student">
                                                        Student
                                                    </option>
                                                    <option value="Alumni">
                                                        Alumni
                                                    </option>
                                                    <option value="Lecturer">
                                                        Lecturer
                                                    </option>
                                                    <option value="Staff">
                                                        Staff
                                                    </option>
                                                </select>
                                                <InputError
                                                    message={
                                                        errors.telu_relation
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="skills"
                                                    value="Skills & Contributions"
                                                />
                                                <select
                                                    id="skills"
                                                    name="skills"
                                                    multiple
                                                    value={data.skills}
                                                    onChange={(e) => {
                                                        const selectedOptions =
                                                            Array.from(
                                                                e.target
                                                                    .selectedOptions,
                                                            ).map(
                                                                (option) =>
                                                                    option.value,
                                                            );
                                                        setData(
                                                            'skills',
                                                            selectedOptions,
                                                        );
                                                    }}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                                >
                                                    <option value="Photography">
                                                        Photography
                                                    </option>
                                                    <option value="Videography">
                                                        Videography
                                                    </option>
                                                    <option value="Social Media">
                                                        Social Media
                                                    </option>
                                                    <option value="Event Organization">
                                                        Event Organization
                                                    </option>
                                                    <option value="Coaching">
                                                        Coaching
                                                    </option>
                                                    <option value="Refereeing">
                                                        Refereeing
                                                    </option>
                                                </select>
                                                <InputError
                                                    message={errors.skills}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* UserCommunity Fields */}
                                    <div className="space-y-6 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                            Community Information
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <InputLabel
                                                    htmlFor="communities"
                                                    value="Communities"
                                                />
                                                <select
                                                    id="communities"
                                                    name="community_ids"
                                                    multiple
                                                    value={data.community_ids.map(
                                                        String,
                                                    )}
                                                    onChange={(e) => {
                                                        const selectedOptions =
                                                            Array.from(
                                                                e.target
                                                                    .selectedOptions,
                                                            ).map((option) =>
                                                                Number(
                                                                    option.value,
                                                                ),
                                                            );
                                                        setData(
                                                            'community_ids',
                                                            selectedOptions,
                                                        );
                                                    }}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                                    required
                                                >
                                                    {communities?.map(
                                                        (community) => (
                                                            <option
                                                                key={
                                                                    community.id
                                                                }
                                                                value={
                                                                    community.id
                                                                }
                                                            >
                                                                {community.name}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                                <InputError
                                                    message={
                                                        errors.community_ids
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="joined_since"
                                                    value="Joined Since"
                                                />
                                                <TextInput
                                                    id="joined_since"
                                                    type="date"
                                                    name="joined_since"
                                                    value={data.joined_since}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            'joined_since',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <InputError
                                                    message={
                                                        errors.joined_since
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="total_matches"
                                                    value="Total Matches"
                                                />
                                                <TextInput
                                                    id="total_matches"
                                                    type="number"
                                                    name="total_matches"
                                                    value={data.total_matches}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            'total_matches',
                                                            Number(
                                                                e.target.value,
                                                            ),
                                                        )
                                                    }
                                                />
                                                <InputError
                                                    message={
                                                        errors.total_matches
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="preferred_positions"
                                                    value="Preferred Positions (min 2)"
                                                />
                                                <select
                                                    id="preferred_positions"
                                                    name="preferred_positions"
                                                    multiple
                                                    value={
                                                        data.preferred_positions
                                                    }
                                                    onChange={(e) => {
                                                        const selectedOptions =
                                                            Array.from(
                                                                e.target
                                                                    .selectedOptions,
                                                            ).map(
                                                                (option) =>
                                                                    option.value,
                                                            );
                                                        setData(
                                                            'preferred_positions',
                                                            selectedOptions,
                                                        );
                                                    }}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                                    required
                                                >
                                                    {positions.map(
                                                        (position) => (
                                                            <option
                                                                key={position}
                                                                value={position}
                                                            >
                                                                {position}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                                <InputError
                                                    message={
                                                        errors.preferred_positions
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="favorite_position"
                                                    value="Favorite Position"
                                                />
                                                <select
                                                    id="favorite_position"
                                                    name="favorite_position"
                                                    value={
                                                        data.favorite_position
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            'favorite_position',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                                    required
                                                >
                                                    {positions.map(
                                                        (position) => (
                                                            <option
                                                                key={position}
                                                                value={position}
                                                            >
                                                                {position}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                                <InputError
                                                    message={
                                                        errors.favorite_position
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="least_favorite_position"
                                                    value="Least Favorite Position"
                                                />
                                                <select
                                                    id="least_favorite_position"
                                                    name="least_favorite_position"
                                                    multiple
                                                    value={
                                                        data.least_favorite_position
                                                    }
                                                    onChange={(e) => {
                                                        const selectedOptions =
                                                            Array.from(
                                                                e.target
                                                                    .selectedOptions,
                                                            ).map(
                                                                (option) =>
                                                                    option.value,
                                                            );
                                                        setData(
                                                            'least_favorite_position',
                                                            selectedOptions,
                                                        );
                                                    }}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                                >
                                                    {positions.map(
                                                        (position) => (
                                                            <option
                                                                key={position}
                                                                value={position}
                                                            >
                                                                {position}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                                <InputError
                                                    message={
                                                        errors.least_favorite_position
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="game_types"
                                                    value="Game Types"
                                                />
                                                <select
                                                    id="game_types"
                                                    name="game_types"
                                                    multiple
                                                    value={data.game_types}
                                                    onChange={(e) => {
                                                        const selectedOptions =
                                                            Array.from(
                                                                e.target
                                                                    .selectedOptions,
                                                            ).map(
                                                                (option) =>
                                                                    option.value,
                                                            );
                                                        setData(
                                                            'game_types',
                                                            selectedOptions,
                                                        );
                                                    }}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                                >
                                                    {gameTypes.map((type) => (
                                                        <option
                                                            key={type}
                                                            value={type}
                                                        >
                                                            {type}
                                                        </option>
                                                    ))}
                                                </select>
                                                <InputError
                                                    message={errors.game_types}
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="favorite_team"
                                                    value="Favorite Team"
                                                />
                                                <TextInput
                                                    id="favorite_team"
                                                    type="text"
                                                    name="favorite_team"
                                                    value={data.favorite_team}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            'favorite_team',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <InputError
                                                    message={
                                                        errors.favorite_team
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="experience_level"
                                                    value="Experience Level"
                                                />
                                                <select
                                                    id="experience_level"
                                                    name="experience_level"
                                                    value={
                                                        data.experience_level
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            'experience_level',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                                    required
                                                >
                                                    <option value="Club">
                                                        Club
                                                    </option>
                                                    <option value="League">
                                                        League
                                                    </option>
                                                    <option value="Pro">
                                                        Pro
                                                    </option>
                                                    <option value="Elite">
                                                        Elite
                                                    </option>
                                                </select>
                                                <InputError
                                                    message={
                                                        errors.experience_level
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="owned_jerseys"
                                                    value="Owned Jerseys"
                                                />
                                                <select
                                                    id="owned_jerseys"
                                                    name="owned_jerseys"
                                                    multiple
                                                    value={data.owned_jerseys}
                                                    onChange={(e) => {
                                                        const selectedOptions =
                                                            Array.from(
                                                                e.target
                                                                    .selectedOptions,
                                                            ).map(
                                                                (option) =>
                                                                    option.value,
                                                            );
                                                        setData(
                                                            'owned_jerseys',
                                                            selectedOptions,
                                                        );
                                                    }}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                                >
                                                    <option value="Home">
                                                        Home Jersey
                                                    </option>
                                                    <option value="Away">
                                                        Away Jersey
                                                    </option>
                                                    <option value="Third">
                                                        Third Jersey
                                                    </option>
                                                    <option value="Training">
                                                        Training Jersey
                                                    </option>
                                                </select>
                                                <InputError
                                                    message={
                                                        errors.owned_jerseys
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end">
                                    <PrimaryButton
                                        className="ml-4"
                                        disabled={processing}
                                    >
                                        {isEditing
                                            ? 'Update Member'
                                            : 'Create Member'}
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
