import Button from '@/Components/Button';
import ConfirmationDialog from '@/Components/ConfirmationDialog';
import { BaseTable } from '@/Components/Table/BaseTable';
import { TableColumn } from '@/Components/Table/types';
import { useDeleteDialog } from '@/hooks/useDeleteDialog';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Match } from '@/types/Match';
import { Head, Link } from '@inertiajs/react';

interface Props extends PageProps {
    matches: Match[];
}

export default function Index({ matches }: Props) {
    const { deleteDialog, handleDelete, confirmDelete, closeDialog } =
        useDeleteDialog<Match>({
            onDelete: () => {},
            routeName: 'matches.destroy',
        });

    const columns: TableColumn<Match>[] = [
        {
            name: 'Name',
            selector: (row: Match) => row.name,
            sortable: true,
        },
        {
            name: 'Community',
            sortable: true,
            cell: (row: Match) => (
                <span>
                    {row?.community?.name}{' '}
                    <sub>{row?.community?.sport?.name}</sub>
                </span>
            ),
        },
        {
            name: 'Game Type',
            selector: (row: Match) => row.game_type,
            sortable: true,
        },
        {
            name: 'Venue',
            selector: (row: Match) => row.venue,
            sortable: true,
        },
        {
            name: 'Date',
            selector: (row: Match) => row.date,
            sortable: true,
        },
        {
            name: 'Time',
            selector: (row: Match) => row.time,
            sortable: true,
        },
        {
            name: 'Players',
            cell: (row: Match) => (
                <div className="text-center">
                    {row.participants || 0} / {row.max_players}
                </div>
            ),
            sortable: true,
        },
        {
            name: 'Price',
            selector: (row: Match) => `Rp ${row.price.toLocaleString()}`,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row: Match) => (
                <div className="flex space-x-2">
                    <Link
                        href={route('matches.show', row.id)}
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                        View
                    </Link>
                    <Link
                        href={route('matches.edit', row.id)}
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
                        Matches
                    </h2>
                    <Link href={route('matches.create')}>
                        <Button>Add New Match</Button>
                    </Link>
                </div>
            }
        >
            <Head title="Matches" />

            <BaseTable
                data={matches}
                columns={columns}
                title="Matches"
                createRoute={route('matches.create')}
                createButtonText="Add New Match"
                searchPlaceholder="Search matches..."
            />

            <ConfirmationDialog
                isOpen={deleteDialog.isOpen}
                onClose={closeDialog}
                onConfirm={confirmDelete}
                title="Delete Match"
                message={`Are you sure you want to delete "${deleteDialog.item?.name}"? This action cannot be undone.`}
            />
        </AuthenticatedLayout>
    );
}
