import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Community } from '@/types/Community';
import { Head, useForm } from '@inertiajs/react';

interface Props extends PageProps {
    community?: Community;
    organizations?: { id: number; name: string }[];
    sports?: { id: number; name: string }[];
}

export default function CommunityForm({
    community,
    organizations,
    sports,
}: Props) {
    const isEditing = !!community;
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: community?.name || '',
        description: community?.description || '',
        logo: community?.logo || '',
        contact: community?.contact || '',
        ig: community?.ig || '',
        organization_id: community?.organization_id || '',
        sport_id: community?.sport_id || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            put(route('communities.update', community.id), {
                onSuccess: () => reset(),
            });
        } else {
            post(route('communities.store'), {
                onSuccess: () => reset(),
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {isEditing ? 'Edit Community' : 'Create New Community'}
                </h2>
            }
        >
            <Head
                title={isEditing ? 'Edit Community' : 'Create New Community'}
            />

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
                                        htmlFor="logo"
                                        value="Logo URL"
                                    />
                                    <TextInput
                                        id="logo"
                                        type="text"
                                        name="logo"
                                        value={data.logo}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData('logo', e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.logo}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="contact"
                                        value="Contact"
                                    />
                                    <TextInput
                                        id="contact"
                                        type="text"
                                        name="contact"
                                        value={data.contact}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData('contact', e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.contact}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
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
                                            setData('ig', e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.ig}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="organization_id"
                                        value="Organization"
                                    />
                                    <select
                                        id="organization_id"
                                        name="organization_id"
                                        value={data.organization_id}
                                        onChange={(e) =>
                                            setData(
                                                'organization_id',
                                                Number(e.target.value),
                                            )
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                        required
                                    >
                                        <option value="">
                                            Select an organization
                                        </option>
                                        {organizations?.map((org) => (
                                            <option key={org.id} value={org.id}>
                                                {org.name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError
                                        message={errors.organization_id}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="sport_id"
                                        value="Sport"
                                    />
                                    <select
                                        id="sport_id"
                                        name="sport_id"
                                        value={data.sport_id}
                                        onChange={(e) =>
                                            setData(
                                                'sport_id',
                                                Number(e.target.value),
                                            )
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                        required
                                    >
                                        <option value="">Select a sport</option>
                                        {sports?.map((sport) => (
                                            <option
                                                key={sport.id}
                                                value={sport.id}
                                            >
                                                {sport.name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError
                                        message={errors.sport_id}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4 flex items-center justify-end">
                                    <PrimaryButton
                                        className="ml-4"
                                        disabled={processing}
                                    >
                                        {isEditing
                                            ? 'Update Community'
                                            : 'Create Community'}
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
