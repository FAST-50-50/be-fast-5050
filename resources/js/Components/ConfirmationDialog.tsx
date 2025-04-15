import { Dialog } from '@headlessui/react';
import Button from './Button';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
}

export default function ConfirmationDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Delete',
    cancelText = 'Cancel',
}: Props) {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            className="relative z-50"
        >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6 dark:bg-gray-800">
                    <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {title}
                    </Dialog.Title>
                    <Dialog.Description className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {message}
                    </Dialog.Description>

                    <div className="mt-4 flex justify-end space-x-3">
                        <Button
                            onClick={onClose}
                            variant="secondary"
                        >
                            {cancelText}
                        </Button>
                        <Button
                            onClick={onConfirm}
                            variant="danger"
                        >
                            {confirmText}
                        </Button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
} 