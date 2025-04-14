import { TableStyles } from 'react-data-table-component';

export const defaultTableStyles: TableStyles = {
    table: {
        style: {
            backgroundColor: 'transparent',
        },
    },
    rows: {
        style: {
            minHeight: '72px',
            backgroundColor: 'var(--bg-color)',
            color: 'var(--text-color)',
            borderBottom: '1px solid var(--border-color)',
            '&:hover': {
                backgroundColor: 'var(--hover-bg-color)',
                transition: 'background-color 0.2s ease',
            },
        },
    },
    headCells: {
        style: {
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingTop: '16px',
            paddingBottom: '16px',
            backgroundColor: 'rgb(55 65 81 / var(--tw-bg-opacity, 1))',
            color: 'var(--text-color)',
            fontWeight: '600',
            fontSize: '0.875rem',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.05em',
            borderBottom: '2px solid var(--border-color)',
        },
    },
    cells: {
        style: {
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingTop: '16px',
            paddingBottom: '16px',
            fontSize: '0.875rem',
            color: 'var(--text-color)',
        },
    },
    pagination: {
        style: {
            backgroundColor: 'var(--bg-color)',
            color: 'var(--text-color)',
            borderTop: '1px solid var(--border-color)',
            padding: '16px',
        },
        pageButtonsStyle: {
            borderRadius: '50%',
            height: '40px',
            width: '40px',
            padding: '8px',
            margin: '0 4px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            backgroundColor: 'transparent',
            '&:hover': {
                backgroundColor: 'var(--hover-bg-color)',
            },
            '&:disabled': {
                cursor: 'not-allowed',
            },
        },
    },
};
