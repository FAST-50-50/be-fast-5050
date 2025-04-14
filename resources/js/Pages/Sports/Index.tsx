import Button from '@/Components/Button';
import { SearchInput } from '@/Components/Table/SearchInput';
import { TableWrapper } from '@/Components/Table/TableWrapper';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Sport } from '@/types/Sport';
import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';

interface Props extends PageProps {
    sports: Sport[];
}

export default function Index({ sports }: Props) {
    const [filterText, setFilterText] = useState('');

    const columns = [
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
                    <Link
                        href={route('sports.destroy', row.id)}
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
        return sports.filter(
            (item) =>
                item.name.toLowerCase().includes(filterText.toLowerCase()) ||
                item.description
                    .toLowerCase()
                    .includes(filterText.toLowerCase()),
        );
    }, [sports, filterText]);

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

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <SearchInput
                                value={filterText}
                                onChange={setFilterText}
                                placeholder="Search sports..."
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
