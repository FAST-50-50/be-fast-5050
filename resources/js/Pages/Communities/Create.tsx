import Button from '@/Components/Button';
import Input from '@/Components/Input';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

interface Props extends PageProps {
    organizations: { id: number; name: string }[];
    sports: { id: number; name: string }[];
}

export default function Create({ organizations, sports }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        logo: '',
        contact: '',
        ig: '',
        organization_id: '',
        sport_id: '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route('communities.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Create New Community
                </h2>
            }
        >
            <Head title="Create Community" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <Input
                                        label="Name"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        error={errors.name}
                                        required
                                    />
                                </div>

                                <div>
                                    <Input
                                        label="Description"
                                        name="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        error={errors.description}
                                        required
                                    />
                                </div>

                                <div>
                                    <Input
                                        label="Logo URL"
                                        name="logo"
                                        value={data.logo}
                                        onChange={(e) => setData('logo', e.target.value)}
                                        error={errors.logo}
                                        required
                                    />
                                </div>

                                <div>
                                    <Input
                                        label="Contact"
                                        name="contact"
                                        value={data.contact}
                                        onChange={(e) => setData('contact', e.target.value)}
                                        error={errors.contact}
                                        required
                                    />
                                </div>

                                <div>
                                    <Input
                                        label="Instagram"
                                        name="ig"
                                        value={data.ig}
                                        onChange={(e) => setData('ig', e.target.value)}
                                        error={errors.ig}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Organization
                                    </label>
                                    <select
                                        name="organization_id"
                                        value={data.organization_id}
                                        onChange={(e) => setData('organization_id', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:text-sm"
                                        required
                                    >
                                        <option value="">Select an organization</option>
                                        {organizations.map((org) => (
                                            <option key={org.id} value={org.id}>
                                                {org.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.organization_id && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                            {errors.organization_id}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Sport
                                    </label>
                                    <select
                                        name="sport_id"
                                        value={data.sport_id}
                                        onChange={(e) => setData('sport_id', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:text-sm"
                                        required
                                    >
                                        <option value="">Select a sport</option>
                                        {sports.map((sport) => (
                                            <option key={sport.id} value={sport.id}>
                                                {sport.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.sport_id && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                            {errors.sport_id}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center justify-end">
                                    <Button type="submit" disabled={processing}>
                                        Create Community
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 