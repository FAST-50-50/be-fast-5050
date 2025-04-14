import DataTable, { TableColumn } from 'react-data-table-component';
import { defaultTableStyles } from './styles';

interface TableWrapperProps<T> {
    columns: TableColumn<T>[];
    data: T[];
    pagination?: boolean;
    paginationPerPage?: number;
    paginationRowsPerPageOptions?: number[];
}

export const TableWrapper = <T,>({
    columns,
    data,
    pagination = true,
    paginationPerPage = 10,
    paginationRowsPerPageOptions = [10, 25, 50, 100],
}: TableWrapperProps<T>) => {
    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-700">
            <DataTable
                columns={columns}
                data={data}
                pagination={pagination}
                paginationPerPage={paginationPerPage}
                paginationRowsPerPageOptions={paginationRowsPerPageOptions}
                customStyles={defaultTableStyles}
                highlightOnHover
                pointerOnHover
                responsive
                theme="dark"
                className="rounded-lg"
            />
        </div>
    );
};
