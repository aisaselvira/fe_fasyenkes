"use client";

import {Button} from "@/components/atoms/button";
import {LogOut, Lock} from "lucide-react";

interface ProfileSidebarProps {
    onChangePassword: () => void;
    onLogout: () => void;
}

export function ProfileSidebar({onChangePassword, onLogout}: ProfileSidebarProps) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-800 text-white py-4 px-6">
                <h2 className="text-lg font-semibold">Profil Saya</h2>
            </div>

            <div className="p-4 space-y-3">
                <Button
                    variant="outline"
                    className="w-full justify-start border-gray-300 hover:bg-blue-50 hover:text-blue-800"
                    onClick={onChangePassword}
                >
                    <Lock className="mr-2 h-4 w-4" />
                    Ubah Kata Sandi
                </Button>

                <Button variant="destructive" className="w-full justify-start" onClick={onLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Keluar
                </Button>
            </div>
        </div>
    );
}
