// app/reset-password/page.tsx

import Navbar from "../../organism/navbar-public";
import { Footer } from "../../organism/footer";
import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Input } from "../../atoms/input";
import { Button } from "../../atoms/button";

export default function ResetPasswordPage() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Kata sandi tidak cocok");
            return;
        }

        // TODO: Panggil API reset password
        console.log("Password baru:", newPassword);
        // Redirect ke halaman login atau tampilkan pesan berhasil
    };

    return (
        <>
            <Navbar />
            <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
                <div className="w-full max-w-md space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-bold text-gray-900">Atur Ulang Kata Sandi</h1>
                        <p className="text-gray-600">Silakan masukkan kata sandi baru anda di bawah ini.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Kata Sandi Baru<span className="text-red-500">*</span></label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Kata sandi baru"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    className="pr-10 pl-10"
                                />
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Konfirmasi Kata Sandi<span className="text-red-500">*</span></label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Ulangi kata sandi"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="pl-10 pr-10"
                                />
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>
                        </div>

                        <Button type="submit" className="w-full bg-[#4052B5] hover:bg-[#324090] text-white">
                            Simpan Kata Sandi Baru
                        </Button>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
}
