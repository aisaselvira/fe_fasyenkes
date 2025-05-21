"use client";

import type React from "react";

import {useState} from "react";
import {Input} from "@/components/atoms/input";
import {Label} from "@/components/atoms/label";
import {Button} from "@/components/atoms/button";
import {useToast} from "@/hooks/use-toast";
import {Loader2} from "lucide-react";

interface ProfileData {
    name: string;
    email: string;
    profession: string;
    institution: string;
    phoneNumber: string;
}

interface EditProfileFormProps {
    initialData: ProfileData;
    onSave: (data: ProfileData) => void;
    onCancel: () => void;
}

export function EditProfileForm({initialData, onSave, onCancel}: EditProfileFormProps) {
    const {toast} = useToast();
    const [formData, setFormData] = useState<ProfileData>(initialData);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // This will call the onSave function which handles the API call
            await onSave(formData);
        } catch (error: unknown) {
            console.error("Error updating profile:", error);
            toast({
                title: "Gagal memperbarui profil",
                description: "Terjadi kesalahan saat memperbarui profil. Silakan coba lagi.",
                variant: "destructive",
            });
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Edit Profil</h1>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                        Nama <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                        Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full"
                        disabled
                    />
                    <p className="text-xs text-gray-500">Email tidak dapat diubah</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="profession" className="text-sm font-medium">
                        Profesi <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="profession"
                        name="profession"
                        value={formData.profession}
                        onChange={handleChange}
                        required
                        className="w-full"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="institution" className="text-sm font-medium">
                        Instansi <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="institution"
                        name="institution"
                        value={formData.institution}
                        onChange={handleChange}
                        required
                        className="w-full"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-sm font-medium">
                        Nomor Telepon <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                        <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                            className="w-full pr-10"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                            <span className="text-sm">👁️</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex space-x-4 pt-4">
                <Button type="submit" className="bg-blue-800 hover:bg-blue-900 text-white" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menyimpan...
                        </>
                    ) : (
                        "Simpan"
                    )}
                </Button>
                <Button type="button" variant="destructive" onClick={onCancel} disabled={isSubmitting}>
                    Batal
                </Button>
            </div>
        </form>
    );
}
