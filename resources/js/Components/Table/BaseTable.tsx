import { TableColumn } from './types';
import { TableWrapper } from './TableWrapper';
import { SearchInput } from './SearchInput';
import { useMemo, useState } from 'react';

interface BaseTableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    title: string;
    createRoute?: string;
    createButtonText?: string;
    searchPlaceholder?: string;
}

export function BaseTable<T>({
    data,
    columns,
    title,
    createRoute,
    createButtonText = 'Add New',
    searchPlaceholder = 'Search...',
}: BaseTableProps<T>) {
    const [filterText, setFilterText] = useState('');

    const filteredItems = useMemo(() => {
        return data.filter((item) => {
            return Object.values(item).some((value) =>
                String(value).toLowerCase().includes(filterText.toLowerCase())
            );
        });
    }, [data, filterText]);

    return (
        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <SearchInput
                            value={filterText}
                            onChange={setFilterText}
                            placeholder={searchPlaceholder}
                        />
                        <TableWrapper
                            columns={columns}
                            data={filteredItems}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
} 