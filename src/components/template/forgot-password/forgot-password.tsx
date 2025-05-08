// app/forgot-password/page.tsx

import Navbar from "../../organism/navbar-public";
import { Footer } from "../../organism/footer";
import { useState } from "react";
import { Mail, Key } from "lucide-react";
import { Input } from "../../atoms/input";
import { Button } from "../../atoms/button";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const router = useRouter();

    const handleSendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: Panggil API kirim email
        console.log("Kirim kode ke email:", email);
    };

    const handleVerifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: Panggil API verifikasi kode
        console.log("Verifikasi kode:", code);
        router.push("/reset-password");
    };

    return (
        <>
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
                                    />
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <Button type="submit" className="w-full bg-[#4052B5] hover:bg-[#324090] text-white">
                                Kirim Kode Verifikasi
                            </Button>
                        </form>
                    </div>

                    {/* Form Verifikasi Kode */}
                    <div className="space-y-4">
                        <div className="text-center space-y-2">
                            <h2 className="text-xl font-semibold text-gray-900">Verifikasi Kode</h2>
                            <p className="text-gray-600">
                                Masukkan kode yang dikirim ke email Anda.
                            </p>
                        </div>

                        <form onSubmit={handleVerifyCode} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Kode Verifikasi<span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        type="text"
                                        placeholder="123456"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        required
                                        className="pl-10"
                                    />
                                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <Button type="submit" className="w-full bg-[#4052B5] hover:bg-[#324090] text-white">
                                Verifikasi dan Ubah Password
                            </Button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
