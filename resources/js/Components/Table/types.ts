import { ReactNode } from 'react';

export type Primitive = string | number | boolean | null | undefined;

export interface TableColumn<T> {
    name: string;
    selector?: (row: T) => string | number | boolean | null | undefined;
    cell?: (row: T) => ReactNode;
    sortable?: boolean;
    ignoreRowClick?: boolean;
    width?: string;
    grow?: number;
    right?: boolean;
    center?: boolean;
    compact?: boolean;
    wrap?: boolean;
    hide?: number | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    format?: (row: T) => string;
    button?: boolean;
    allowOverflow?: boolean;
    minWidth?: string;
    maxWidth?: string;
} 