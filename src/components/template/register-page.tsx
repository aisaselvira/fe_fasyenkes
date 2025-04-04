import Navbar from "../organism/navbar-public";
import { Footer } from "../organism/footer";
import { useState } from "react";
import { Eye, EyeOff, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../atoms/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import { Label } from "@/components/atoms/label";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [openMenu, setOpenMenu] = useState({ profession: false });

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        profession: "",
        institution: "",
        phone: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleProfessionChange = (value: string) => {
        setFormData({ ...formData, profession: value });
    };

    return (
        <>
            <Navbar />
            <main className="flex flex-col items-center justify-center px-6 py-10">
                <div className="w-full max-w-md space-y-6 bg-white p-6 rounded-lg">
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-bold text-gray-900">Daftar Akun Anda</h1>
                        <p className="text-gray-600">Mulai perjalanan Anda!</p>
                    </div>

                    <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                        <div className="space-y-2">
                            <Label>Nama<span className="text-red-500">*</span></Label>
                            <Input
                                name="name"
                                placeholder="Masukkan nama"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Email<span className="text-red-500">*</span></Label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="Masukkan email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Password<span className="text-red-500">*</span></Label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Kata sandi"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="pr-12 w-full"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Profesi<span className="text-red-500">*</span></Label>
                            <DropdownMenu
                                open={openMenu.profession}
                                onOpenChange={(open) => setOpenMenu({ profession: open })}
                            >
                                <DropdownMenuTrigger asChild>
                                    <button
                                        type="button"
                                        className="w-full flex items-center justify-between bg-gray-100 text-gray-600 rounded-md py-2.5 px-4 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {formData.profession || "Pilih Profesi"}
                                        {openMenu.profession ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-full min-w-[var(--radix-dropdown-menu-trigger-width)]">
                                    {["Dokter", "Perawat", "Mahasiswa", "Lainnya"].map((opt, i) => (
                                        <DropdownMenuItem key={i} onSelect={() => handleProfessionChange(opt)}>
                                            {opt}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="space-y-2">
                            <Label>Nomor Telepon<span className="text-red-500">*</span></Label>
                            <Input
                                type="tel"
                                name="phone"
                                placeholder="Nomor telepon"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full"
                            />
                        </div>

                        <Button type="submit" className="w-full bg-[#4052B5] hover:bg-[#324090] text-white">
                            Simpan
                        </Button>

                        <Button type="button" variant="outline" className="w-full flex items-center justify-center gap-2">
                            <Image src="/assets/GOOGLE.png" alt="Google" width={20} height={20} />
                            Masuk dengan Google
                        </Button>

                        <p className="text-center text-sm text-gray-600">
                            Sudah punya akun?{" "}
                            <Link href="/login" className="text-[#4052B5] font-medium hover:underline">
                                Masuk
                            </Link>
                        </p>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
}
