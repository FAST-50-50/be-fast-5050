import Button from '@/Components/Button';
import Input from '@/Components/Input';
import { PageProps } from '@/types';
import { Community } from '@/types/Community';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

export interface CommunityFormData {
    name: string;
    description: string;
    logo: string;
    contact: string;
    ig: string;
    organization_id: number | string;
    sport_id: number | string;
}

interface Props extends PageProps {
    community?: Community;
    organizations: { id: number; name: string }[];
    sports: { id: number; name: string }[];
    onSubmit: (data: CommunityFormData) => void;
    processing: boolean;
    errors: Record<string, string>;
}

export default function CommunityForm({
    community,
    organizations,
    sports,
    onSubmit,
    processing,
    errors,
}: Props) {
    const { data, setData } = useForm({
        name: community?.name || '',
        description: community?.description || '',
        logo: community?.logo || '',
        contact: community?.contact || '',
        ig: community?.ig || '',
        organization_id: community?.organization_id || '',
        sport_id: community?.sport_id || '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(data as CommunityFormData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
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
                    onChange={(e) =>
                        setData(
                            'organization_id',
                            Number(e.target.value)
                        )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
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
                    onChange={(e) =>
                        setData(
                            'sport_id',
                            Number(e.target.value)
                        )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
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
                    {community ? 'Update Community' : 'Create Community'}
                </Button>
            </div>
        </form>
    );
} 