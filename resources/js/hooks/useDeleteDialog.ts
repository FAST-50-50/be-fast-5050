import { router } from '@inertiajs/react';
import { useState } from 'react';

interface DeleteDialogState<T> {
    isOpen: boolean;
    item: T | null;
}

interface UseDeleteDialogOptions<T> {
    onDelete: (item: T) => void;
    routeName: string;
}

export function useDeleteDialog<T>({
    onDelete,
    routeName,
}: UseDeleteDialogOptions<T>) {
    const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState<T>>({
        isOpen: false,
        item: null,
    });

    const handleDelete = (item: T) => {
        setDeleteDialog({
            isOpen: true,
            item,
        });
    };

    const confirmDelete = () => {
        if (deleteDialog.item) {
            onDelete(deleteDialog.item);
            router.delete(route(routeName, deleteDialog.item));
        }
        setDeleteDialog({
            isOpen: false,
            item: null,
        });
    };

    const closeDialog = () => {
        setDeleteDialog({
            isOpen: false,
            item: null,
        });
    };

    return {
        deleteDialog,
        handleDelete,
        confirmDelete,
        closeDialog,
    };
}
