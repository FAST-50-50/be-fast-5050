import Button from '@/Components/Button';
import { SearchInput } from '@/Components/Table/SearchInput';
import { TableWrapper } from '@/Components/Table/TableWrapper';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Community } from '@/types/Community';
import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';

interface Props extends PageProps {
    communities: Community[];
}

export default function Index({ communities }: Props) {
    const [filterText, setFilterText] = useState('');

    const columns = [
        {
            name: 'Name',
            selector: (row: Community) => row.name,
            sortable: true,
        },
        {
            name: 'Description',
            selector: (row: Community) => row.description,
            sortable: true,
        },
        {
            name: 'Contact',
            selector: (row: Community) => row.contact,
            sortable: true,
        },
        {
            name: 'Instagram',
            selector: (row: Community) => row.ig,
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
                    <Link
                        href={route('communities.destroy', row.id)}
                        method="delete"
                        as="button"
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                        Delete
                    </Link>
                </div>
            ),
            ignoreRowClick: true,
        },
    ];

    const filteredItems = useMemo(() => {
        return communities.filter(
            (item) =>
                item.name.toLowerCase().includes(filterText.toLowerCase()) ||
                item.description.toLowerCase().includes(filterText.toLowerCase()) ||
                item.contact.toLowerCase().includes(filterText.toLowerCase()) ||
                item.ig.toLowerCase().includes(filterText.toLowerCase()),
        );
    }, [communities, filterText]);

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

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <SearchInput
                                value={filterText}
                                onChange={setFilterText}
                                placeholder="Search communities..."
                            />
                            <TableWrapper
                                columns={columns}
                                data={filteredItems}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 