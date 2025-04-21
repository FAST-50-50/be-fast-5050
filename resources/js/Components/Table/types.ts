import { ReactNode } from 'react';
import { TableColumn as RDTColumn } from 'react-data-table-component';

export type Primitive = string | number | boolean | null | undefined;

export type TableColumn<T> = RDTColumn<T> & {
    name: string;
    selector?: (row: T) => string | number | boolean;
    sortable?: boolean;
    cell?: (row: T) => ReactNode;
    ignoreRowClick?: boolean;
}; 