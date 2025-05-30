"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/atoms/dialog";
import {Button} from "@/components/atoms/button";
import {LogOut} from "lucide-react";

interface LogoutConfirmationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
}

export function LogoutConfirmationDialog({open, onOpenChange, onConfirm}: LogoutConfirmationDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <LogOut className="h-5 w-5 text-red-500" />
                        Log Out
                    </DialogTitle>
                    <DialogDescription>Apakah Anda yakin ingin keluar dari aplikasi?</DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex space-x-2 sm:space-x-0 sm:justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="border-gray-300 mr-2"
                    >
                        Batal
                    </Button>
                    <Button type="button" variant="destructive" onClick={onConfirm}>
                        Keluar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
