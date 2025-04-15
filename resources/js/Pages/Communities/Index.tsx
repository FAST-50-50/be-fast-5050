import Button from '@/Components/Button';
import ConfirmationDialog from '@/Components/ConfirmationDialog';
import { BaseTable } from '@/Components/Table/BaseTable';
import { TableColumn } from '@/Components/Table/types';
import { useDeleteDialog } from '@/hooks/useDeleteDialog';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Community } from '@/types/Community';
import { Head, Link } from '@inertiajs/react';

interface Props extends PageProps {
    communities: Community[];
}

export default function Index({ communities }: Props) {
    const { deleteDialog, handleDelete, confirmDelete, closeDialog } =
        useDeleteDialog<Community>({
            onDelete: () => {},
            routeName: 'communities.destroy',
        });

    const columns: TableColumn<Community>[] = [
        {
            name: 'Name',
            selector: (row: Community) => row.name,
            cell: (row: Community) => (
                <div className="flex items-center space-x-3">
                    <img
                        src={row.logo}
                        alt={`${row.name} logo`}
                        className="h-8 w-8 rounded-full object-cover"
                    />
                    <span>{row.name}</span>
                </div>
            ),
            sortable: true,
        },
        {
            name: 'Organization',
            selector: (row: Community) => row.organization_name || '',
            sortable: true,
        },
        {
            name: 'Members',
            selector: (row: Community) => row.member_count || 0,
            sortable: true,
        },
        {
            name: 'Contact',
            selector: (row: Community) => row.contact,
            cell: (row: Community) => (
                <a
                    href={row.contact_wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                    {row.contact}
                </a>
            ),
            sortable: true,
        },
        {
            name: 'Instagram',
            selector: (row: Community) => row.ig,
            cell: (row: Community) => (
                <a
                    href={row.ig_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                    {row.ig}
                </a>
            ),
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row: Community) => (
                <div className="flex space-x-2">
                    <Link
                        href={route('communities.edit', row.id)}
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
                        Communities
                    </h2>
                    <Link href={route('communities.create')}>
                        <Button>Add New Community</Button>
                    </Link>
                </div>
            }
        >
            <Head title="Communities" />

            <BaseTable
                data={communities}
                columns={columns}
                title="Communities"
                createRoute={route('communities.create')}
                createButtonText="Add New Community"
                searchPlaceholder="Search communities..."
            />

            <ConfirmationDialog
                isOpen={deleteDialog.isOpen}
                onClose={closeDialog}
                onConfirm={confirmDelete}
                title="Delete Community"
                message={`Are you sure you want to delete "${deleteDialog.item?.name}"? This action cannot be undone.`}
            />
        </AuthenticatedLayout>
    );
}
