"use client";

import type React from "react";

import {Button} from "@/components/atoms/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/atoms/dialog";
import {Input} from "@/components/atoms/input";
import {Label} from "@/components/atoms/label";
import {useState} from "react";
import {useToast} from "@/hooks/use-toast";

interface ChangePasswordDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ChangePasswordDialog({open, onOpenChange}: ChangePasswordDialogProps) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {toast} = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast({
                title: "Error",
                description: "Kata sandi baru dan konfirmasi kata sandi tidak cocok.",
                variant: "destructive",
            });
            return;
        }

        // In a real app, this would call an API to change the password
        toast({
            title: "Sukses",
            description: "Kata sandi Anda telah berhasil diubah.",
        });

        onOpenChange(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Password</DialogTitle>
                        <DialogDescription>Masukkan kata sandi lama dan kata sandi baru Anda.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-5 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="current-password">Kata Sandi Lama</Label>
                            <Input
                                id="current-password"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-password">Kata Sandi Baru</Label>
                            <Input
                                id="new-password"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="confirm-password">Konfirmasi Kata Sandi</Label>
                            <Input
                                id="confirm-password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            className="bg-red-600 hover:bg-red-800 text-white"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Batal
                        </Button>
                        <Button type="submit" className="bg-blue-800 hover:bg-blue-900 text-white">
                            Simpan
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
