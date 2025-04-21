import Button from '@/Components/Button';
import ConfirmationDialog from '@/Components/ConfirmationDialog';
import { BaseTable } from '@/Components/Table/BaseTable';
import { TableColumn } from '@/Components/Table/types';
import { useDeleteDialog } from '@/hooks/useDeleteDialog';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { User } from '@/types/User';
import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
} from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { Head, Link } from '@inertiajs/react';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import BadgeList from './components/BadgeList';

interface Props {
    members: User[];
    communities: { id: number; name: string }[];
}

export default function MemberPage({ members, communities }: Props) {
    const [selectedCommunity, setSelectedCommunity] = useState<
        number | undefined
    >(undefined);
    const [query, setQuery] = useState('');

    const { deleteDialog, handleDelete, confirmDelete, closeDialog } =
        useDeleteDialog<User>({
            onDelete: () => {},
            routeName: 'members.destroy',
        });

    const filteredCommunities = useMemo(() => {
        if (query === '') {
            return communities;
        }
        return communities.filter((community) =>
            community.name.toLowerCase().includes(query.toLowerCase()),
        );
    }, [communities, query]);

    const filteredMembers = selectedCommunity
        ? members.filter((member) =>
              member.communities?.some((c) => c.id === selectedCommunity),
          )
        : members;

    const getCommunityData = (row: User) => {
        if (!selectedCommunity) return row.user_community?.[0];
        return row.user_community?.find(
            (uc) => uc.community_id === selectedCommunity,
        );
    };

    const columns: TableColumn<User>[] = [
        {
            name: 'Name',
            selector: (row: User) => row.user_detail?.fullname || '',
            sortable: true,
        },
        {
            name: 'Username',
            selector: (row: User) => row.username,
            sortable: true,
        },
        {
            name: 'Contact Info',
            cell: (row: User) => {
                const phone = row.user_detail?.wa || '';
                const ig = row.user_detail?.ig || '';
                return (
                    <div className="flex flex-col gap-1">
                        {phone && (
                            <a
                                href={`https://wa.me/${phone}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                {phone}
                            </a>
                        )}
                        {ig && (
                            <a
                                href={`https://instagram.com/${ig}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-pink-600 hover:underline"
                            >
                                {ig}
                            </a>
                        )}
                    </div>
                );
            },
        },
        {
            name: 'Favorite Position',
            selector: (row: User) =>
                getCommunityData(row)?.favorite_position || '-',
            sortable: true,
        },
        {
            name: 'Total Matches',
            selector: (row: User) => getCommunityData(row)?.total_matches || 0,
            sortable: true,
        },
        {
            name: 'Join Since',
            selector: (row: User) => {
                const joinDate = getCommunityData(row)?.joined_since;
                return joinDate ? new Date(joinDate).toLocaleDateString() : '-';
            },
            sortable: true,
        },
        {
            name: 'Experience Level',
            selector: (row: User) =>
                getCommunityData(row)?.experience_level || '-',
            sortable: true,
        },
        {
            name: 'Communities',
            cell: (row: User) => (
                <BadgeList badges={row.communities?.map((c) => c.name) || []} />
            ),
        },
        {
            name: 'Actions',
            cell: (row: User) => (
                <div className="flex space-x-2">
                    <Link
                        href={route('members.edit', row.id)}
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={() => handleDelete(row)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                        Delete
                    </button>
                </div>
            ),
            ignoreRowClick: true,
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Members
                    </h2>
                    <Link href={route('members.create')}>
                        <Button>Add New Member</Button>
                    </Link>
                </div>
            }
        >
            <Head title="Members" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="px-12">
                                <label
                                    htmlFor="community-filter"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Community
                                </label>
                                <Combobox
                                    value={selectedCommunity}
                                    onChange={(value) =>
                                        setSelectedCommunity(value ?? undefined)
                                    }
                                    onClose={() => setQuery('')}
                                >
                                    <div className="relative">
                                        <ComboboxInput
                                            className={clsx(
                                                'w-full rounded-lg border-none bg-white/5 py-1.5 pl-3 pr-8 text-sm/6 text-white',
                                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                                            )}
                                            displayValue={(id) => {
                                                if (!id) return '';
                                                return (
                                                    communities.find(
                                                        (c) => c.id === id,
                                                    )?.name || ''
                                                );
                                            }}
                                            onChange={(event) =>
                                                setQuery(event.target.value)
                                            }
                                            placeholder="Search communities..."
                                        />
                                        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                                            <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
                                        </ComboboxButton>
                                    </div>

                                    <ComboboxOptions
                                        anchor="bottom"
                                        transition
                                        className={clsx(
                                            'w-[var(--input-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                                            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0',
                                        )}
                                    >
                                        {filteredCommunities.map(
                                            (community) => (
                                                <ComboboxOption
                                                    key={community.id}
                                                    value={community.id}
                                                    className="bg-blue group flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10"
                                                >
                                                    <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                                                    <div className="text-sm/6 text-white">
                                                        {community.name}
                                                    </div>
                                                </ComboboxOption>
                                            ),
                                        )}
                                    </ComboboxOptions>
                                </Combobox>
                            </div>

                            <BaseTable
                                data={filteredMembers}
                                columns={columns}
                                title="Members"
                                searchPlaceholder="Search members..."
                            />
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmationDialog
                isOpen={deleteDialog.isOpen}
                onClose={closeDialog}
                onConfirm={confirmDelete}
                title="Delete Member"
                message={`Are you sure you want to delete "${deleteDialog.item?.user_detail?.fullname}"? This action cannot be undone.`}
            />
        </AuthenticatedLayout>
    );
}
