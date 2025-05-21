"use client";

import {ProfileInfo} from "@/components/molecules/profile-info";
import {ProfileSidebar} from "@/components/molecules/profile-sidebar";
import {ChangePasswordDialog} from "@/components/molecules/change-password-dialog";
import {EditProfileForm} from "@/components/molecules/edit-profile-form";
import {LogoutConfirmationDialog} from "@/components/molecules/logout-confirmation-dialog";
import {AuthErrorDisplay} from "@/components/molecules/auth-error-display";
import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {useToast} from "@/hooks/use-toast";
import {Card} from "@/components/atoms/card";
import {Button} from "@/components/atoms/button";
import {profileService, type ProfileData, type UpdateProfileData} from "@/services/profile/index";
import {Loader2} from "lucide-react";
import {removeAuthToken} from "@/lib/utils";

// Define UI profile data interface
interface UIProfileData {
    name: string;
    email: string;
    profession: string;
    institution: string;
    phoneNumber: string;
}

// Map API data to UI format
const mapProfileDataToUI = (profileData: ProfileData | null): UIProfileData | null => {
    if (!profileData) return null;

    return {
        name: profileData.name,
        email: profileData.email,
        profession: profileData.profesion || "",
        institution: profileData.institute || "",
        phoneNumber: profileData.phone_number,
    };
};

// Map UI data to API format
const mapUIDataToAPI = (uiData: UIProfileData): UpdateProfileData => {
    return {
        name: uiData.name,
        profesion: uiData.profession,
        institute: uiData.institution,
        phone_number: uiData.phoneNumber,
    };
};

export function ProfileContent() {
    const router = useRouter();
    const {toast} = useToast();
    const [changePasswordOpen, setChangePasswordOpen] = useState(false);
    const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState<UIProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [authError, setAuthError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            setError(null);
            setAuthError(null);

            try {
                const response = await profileService.getProfile();
                if (response) {
                    setUserData(mapProfileDataToUI(response.data));
                } else {
                    setError("Failed to fetch profile data");
                }
            } catch (err) {
                // Check if it's an authentication error
                const errorMessage = err instanceof Error ? err.message : String(err);

                if (errorMessage.includes("authentication") || errorMessage.includes("token")) {
                    setAuthError(errorMessage);
                } else {
                    setError("An error occurred while fetching profile data");
                }
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChangePassword = () => {
        setChangePasswordOpen(true);
    };

    const handleLogoutClick = () => {
        setLogoutConfirmOpen(true);
    };

    const handleLogoutConfirm = () => {
        // Remove token and logout
        removeAuthToken();
        toast({
            title: "Keluar",
            description: "Anda telah berhasil keluar.",
        });
        // Redirect to login
        setTimeout(() => router.push("/login"), 1500);
    };

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSaveProfile = async (updatedData: UIProfileData) => {
        setLoading(true);

        try {
            const apiData = mapUIDataToAPI(updatedData);
            const response = await profileService.updateProfile(apiData);

            if (response && response.user) {
                setUserData(mapProfileDataToUI(response.user));
                toast({
                    title: "Profil berhasil diperbarui",
                    description: response.message || "Informasi profil Anda telah berhasil diperbarui.",
                });
            } else {
                throw new Error("Failed to update profile");
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);

            if (errorMessage.includes("authentication") || errorMessage.includes("token")) {
                setAuthError(errorMessage);
            } else {
                toast({
                    title: "Gagal memperbarui profil",
                    description: "Terjadi kesalahan saat memperbarui profil. Silakan coba lagi.",
                    variant: "destructive",
                });
            }
            console.error(error);
        } finally {
            setLoading(false);
            setIsEditing(false);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleRetry = () => {
        window.location.reload();
    };

    const handleLogin = () => {
        router.push("/login");
    };

    if (authError) {
        return (
            <div className="container mx-auto px-4 py-8">
                <AuthErrorDisplay
                    title="Autentikasi Diperlukan"
                    message="Sesi Anda telah berakhir atau tidak valid. Silakan login kembali untuk melanjutkan."
                    errorCode={authError}
                    onRetry={handleRetry}
                    onLogin={handleLogin}
                />
            </div>
        );
    }

    if (loading && !userData) {
        return (
            <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500 mb-4" />
                    <p className="text-gray-500">Memuat profil...</p>
                </div>
            </div>
        );
    }

    if (error || !userData) {
        return (
            <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
                <div className="text-center">
                    <div className="text-red-500 mb-4 text-5xl">⚠️</div>
                    <h2 className="text-xl font-semibold mb-2">Gagal memuat profil</h2>
                    <p className="text-gray-500 mb-4">{error || "Data profil tidak ditemukan"}</p>
                    <Button
                        onClick={() => window.location.reload()}
                        className="bg-blue-800 hover:bg-blue-900 text-white"
                    >
                        Coba Lagi
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                    <ProfileSidebar onChangePassword={handleChangePassword} onLogout={handleLogoutClick} />
                </div>
                <div className="lg:col-span-3">
                    <Card className="overflow-hidden">
                        {loading ? (
                            <div className="p-6 flex justify-center items-center min-h-[300px]">
                                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                            </div>
                        ) : isEditing ? (
                            <div className="p-6">
                                <EditProfileForm
                                    initialData={userData}
                                    onSave={handleSaveProfile}
                                    onCancel={handleCancelEdit}
                                />
                            </div>
                        ) : (
                            <ProfileInfo userData={userData} onEdit={handleEditProfile} />
                        )}
                    </Card>
                </div>
            </div>

            <ChangePasswordDialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen} />
            <LogoutConfirmationDialog
                open={logoutConfirmOpen}
                onOpenChange={setLogoutConfirmOpen}
                onConfirm={handleLogoutConfirm}
            />
        </div>
    );
}
