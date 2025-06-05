"use client";

import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../../organism/navbar-public";
import { Footer } from "../../organism/footer";
import { useState } from "react";
import { Mail } from "lucide-react";
import { Input } from "../../atoms/input";
import { Button } from "../../atoms/button";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loadingSendEmail, setLoadingSendEmail] = useState(false);
    const [loadingResetPassword, setLoadingResetPassword] = useState(false);
    const router = useRouter();

    const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:19200";

    // Kirim kode ke email
    const handleSendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoadingSendEmail(true);
        try {
            await axios.post(`${API_BASE_URL}/auth/requestPasswordReset`, { email });
            await Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Kode verifikasi telah dikirim ke email Anda.",
                timer: 3000,
                timerProgressBar: true,
            });
        } catch (error) {
            console.error(error);
            await Swal.fire({
                icon: "error",
                title: "Gagal",
                text: "Gagal mengirim kode verifikasi. Silakan coba lagi.",
            });
        } finally {
            setLoadingSendEmail(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!token) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Token harus diisi",
            });
            return;
        }

        if (password !== confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Password dan konfirmasi password tidak sama",
            });
            return;
        }

        setLoadingResetPassword(true);

        try {
            const fullTokenUrl = token.trim();
            const urlObj = new URL(fullTokenUrl);
            const pathSegments = urlObj.pathname.split("/").filter(Boolean);
            const userIdFromUrl = pathSegments[2];
            const tokenFromUrl = pathSegments[3];

            if (!userIdFromUrl || !tokenFromUrl) {
                throw new Error("Format token URL tidak valid");
            }

            const formData = new FormData();
            formData.append("password", password);

            await axios.post(
                `${API_BASE_URL}/auth/resetpassword/${userIdFromUrl}/${tokenFromUrl}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Password berhasil diubah, silakan login ulang.",
            });

            router.push("/login");
        } catch (error: unknown) {
            if (error instanceof Error) {
                Swal.fire({
                    icon: "error",
                    title: "Gagal",
                    text: error.message,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Gagal",
                    text: "Terjadi kesalahan saat reset password",
                });
            }
        } finally {
            setLoadingResetPassword(false);
        }
    };

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
                    <div className="w-full max-w-md space-y-10">

                        {/* Form Kirim Email */}
                        <div className="space-y-4">
                            <div className="text-center space-y-2">
                                <h1 className="text-2xl font-bold text-gray-900">Lupa Kata Sandi</h1>
                                <p className="text-gray-600">
                                    Masukkan email anda dan kami akan kirimkan kode verifikasi.
                                </p>
                            </div>

                            <form onSubmit={handleSendEmail} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Email<span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Input
                                            type="email"
                                            placeholder="Masukkan email anda"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="pl-10"
                                            disabled={loadingSendEmail}
                                        />
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-[#4052B5] hover:bg-[#324090] text-white"
                                    disabled={loadingSendEmail}
                                >
                                    {loadingSendEmail ? "Mengirim..." : "Kirim Kode Verifikasi"}
                                </Button>
                            </form>
                        </div>

                        {/* Form Reset Password */}
                        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                            <h1 className="text-2xl font-bold mb-6">Ubah Password Baru</h1>

                            <form onSubmit={handleResetPassword} className="space-y-4">
                                <div>
                                    <label htmlFor="token" className="block font-medium mb-1">
                                        Token (URL Reset Password)<span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="token"
                                        type="text"
                                        placeholder="Masukkan URL token reset password lengkap"
                                        value={token}
                                        onChange={(e) => setToken(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block font-medium mb-1">
                                        Password Baru<span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength={6}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block font-medium mb-1">
                                        Konfirmasi Password<span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        minLength={6}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loadingResetPassword}
                                    className="w-full bg-[#4052B5] hover:bg-[#324090] text-white"
                                >
                                    {loadingResetPassword ? "Memproses..." : "Reset Password"}
                                </Button>
                            </form>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}
