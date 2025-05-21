"use client";

import {ProfileField} from "@/components/atoms/profile-field";
import {Button} from "@/components/atoms/button";
import {ProfileAvatar} from "@/components/atoms/profile-avatar";
import {Edit} from "lucide-react";

interface ProfileInfoProps {
    userData: {
        name: string;
        email: string;
        profession: string;
        institution: string;
        phoneNumber: string;
        imageUrl?: string;
    };
    onEdit: () => void;
}

export function ProfileInfo({userData, onEdit}: ProfileInfoProps) {
    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center mb-8">
                <div className="mb-6 md:mb-0 md:mr-8">
                    <ProfileAvatar imageUrl={userData.imageUrl} name={userData.name} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Profil Saya</h1>
                    <p className="text-gray-500">Informasi personal dan kontak Anda</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <ProfileField label="Nama" value={userData.name} />
                <ProfileField label="Email" value={userData.email} />
                <ProfileField label="Profesi" value={userData.profession} />
                <ProfileField label="Instansi" value={userData.institution} />
                <ProfileField label="Nomor Telepon" value={userData.phoneNumber} />
            </div>

            <div className="mt-8">
                <Button className="bg-blue-800 hover:bg-blue-900 text-white" onClick={onEdit}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profil
                </Button>
            </div>
        </div>
    );
}
