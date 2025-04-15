import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Sport } from '@/types/Sport';
import { Head, useForm } from '@inertiajs/react';

interface Props extends PageProps {
    sport?: Sport;
}

export default function SportForm({ sport }: Props) {
    const isEditing = !!sport;
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: sport?.name || '',
        description: sport?.description || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            put(route('sports.update', sport.id), {
                onSuccess: () => reset(),
            });
        } else {
            post(route('sports.store'), {
                onSuccess: () => reset(),
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {isEditing ? 'Edit Sport' : 'Create New Sport'}
                </h2>
            }
        >
            <Head title={isEditing ? 'Edit Sport' : 'Create New Sport'} />

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

                                <div className="mt-4 flex items-center justify-end">
                                    <PrimaryButton
                                        className="ml-4"
                                        disabled={processing}
                                    >
                                        {isEditing
                                            ? 'Update Sport'
                                            : 'Create Sport'}
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
