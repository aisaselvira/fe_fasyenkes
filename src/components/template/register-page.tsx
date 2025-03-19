import Navbar from "../organism/navbar-public";
import { Footer } from "../organism/footer";
import { useState, useCallback } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../atoms/dropdown-menu"
import Link from "next/link";
import Image from "next/image"
import { ChevronDown, ChevronUp } from "lucide-react";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        profession: "",
        institution: "",
        phone: "",
    })

    const [isOpen, setIsOpen] = useState(false);

    const handleSelectProfession = useCallback((profession: string) => {
        setFormData((prevState) => ({ ...prevState, profession }));
        setIsOpen(false);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(formData)
    }
    return (
        <>
            <Navbar />
            <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
                <div className="w-full max-w-md space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-bold text-gray-900">Daftar akun anda</h1>
                        <p className="text-gray-600">Start your journey!</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Nama<span className="text-red-500">*</span>
                            </label>
                            <Input
                                name="name"
                                placeholder="Masukkan nama anda"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Email<span className="text-red-500">*</span>
                            </label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="Masukkan email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Password<span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Kata sandi"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="pr-10"
                                />
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
                            <label className="text-sm font-medium">
                                Profesi<span className="text-red-500">*</span>
                            </label>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="px-4 py-2 border rounded-md w-full text-left flex items-center justify-between">
                                    {formData.profession ? formData.profession : "Pilih Profesi"}
                                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-full min-w-[var(--radix-dropdown-menu-trigger-width)]">
                                    <DropdownMenuItem onSelect={() => handleSelectProfession("Dosen")}>
                                        Dosen
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => handleSelectProfession("Karyawan")}>
                                        Karyawan
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => handleSelectProfession("Mahasiswa")}>
                                        Mahasiswa
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Nomor Telepon<span className="text-red-500">*</span>
                            </label>
                            <Input
                                type="tel"
                                name="phone"
                                placeholder="Nomor telepon"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full bg-[#4052B5] hover:bg-[#324090] text-white">
                            Simpan
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => {
                            }}
                        >
                            <Image src="/assets/GOOGLE.png" alt="Google" width={20} height={20} className="mr-2" />
                            Masuk dengan Google
                        </Button>

                        <p className="text-center text-sm text-gray-600">
                            Sudah punya akun?{" "}
                            <Link href="/login" className="text-[#4052B5]">
                                Masuk
                            </Link>
                        </p>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    )
}