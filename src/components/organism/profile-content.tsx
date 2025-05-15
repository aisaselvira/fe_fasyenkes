"use client";

import {ProfileInfo} from "@/components/molecules/profile-info";
import {ProfileSidebar} from "@/components/molecules/profile-sidebar";
import {ChangePasswordDialog} from "@/components/molecules/change-password-dialog";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useToast} from "@/hooks/use-toast";

// Mock user data - in a real app, this would come from an API or context
const mockUserData = {
    name: "Andini Prasetyowati",
    email: "andiniprasetyo@gmail.com",
    profession: "Tenaga Kesehatan",
    institution: "RS UGM",
    phoneNumber: "089778908908",
};

export function ProfileContent() {
    const router = useRouter();
    const {toast} = useToast();
    const [changePasswordOpen, setChangePasswordOpen] = useState(false);

    const handleChangePassword = () => {
        setChangePasswordOpen(true);
    };

    const handleLogout = () => {
        // In a real app, this would call a logout function
        toast({
            title: "Keluar",
            description: "Anda telah berhasil keluar.",
        });
        // Simulate logout redirect
        setTimeout(() => router.push("/login"), 1500);
    };

    const handleEditProfile = () => {
        // In a real app, this would navigate to the edit profile page
        toast({
            title: "Edit Profil",
            description: "Fitur ini akan segera tersedia.",
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                    <ProfileSidebar onChangePassword={handleChangePassword} onLogout={handleLogout} />
                </div>
                <div className="lg:col-span-3">
                    <ProfileInfo userData={mockUserData} onEdit={handleEditProfile} />
                </div>
            </div>

            <ChangePasswordDialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen} />
        </div>
    );
}
