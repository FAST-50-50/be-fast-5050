import Button from '@/Components/Button';
import ConfirmationDialog from '@/Components/ConfirmationDialog';
import { BaseTable } from '@/Components/Table/BaseTable';
import { TableColumn } from '@/Components/Table/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Sport } from '@/types/Sport';
import { Head, Link } from '@inertiajs/react';
import { useDeleteDialog } from '@/hooks/useDeleteDialog';

interface Props extends PageProps {
    sports: Sport[];
}

export default function Index({ sports }: Props) {
    const { deleteDialog, handleDelete, confirmDelete, closeDialog } = useDeleteDialog<Sport>({
        onDelete: () => {},
        routeName: 'sports.destroy',
    });

    const columns: TableColumn<Sport>[] = [
        {
            name: 'Name',
            selector: (row: Sport) => row.name,
            sortable: true,
        },
        {
            name: 'Description',
            selector: (row: Sport) => row.description,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row: Sport) => (
                <div className="flex space-x-2">
                    <Link
                        href={route('sports.edit', row.id)}
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
                        Sports
                    </h2>
                    <Link href={route('sports.create')}>
                        <Button>Add New Sport</Button>
                    </Link>
                </div>
            }
        >
            <Head title="Sports" />

            <BaseTable
                data={sports}
                columns={columns}
                title="Sports"
                createRoute={route('sports.create')}
                createButtonText="Add New Sport"
                searchPlaceholder="Search sports..."
            />

            <ConfirmationDialog
                isOpen={deleteDialog.isOpen}
                onClose={closeDialog}
                onConfirm={confirmDelete}
                title="Delete Sport"
                message={`Are you sure you want to delete "${deleteDialog.item?.name}"? This action cannot be undone.`}
            />
        </AuthenticatedLayout>
    );
}
