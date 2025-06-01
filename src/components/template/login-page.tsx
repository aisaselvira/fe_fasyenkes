"use client";

import type React from "react";

import Navbar from "../organism/navbar-public";
import {Footer} from "../organism/footer";
import {useState} from "react";
import {Eye, EyeOff, User} from "lucide-react";
import {Input} from "../atoms/input";
import {Button} from "../atoms/button";
import {Checkbox} from "../atoms/checkbox";
import Link from "next/link";

import axios from "axios";
import {useRouter} from "next/router";
import Cookies from "js-cookie";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Fix: Provide fallback URL if environment variable is not set
    const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:19300";

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        // Debug: Log the API URL to console
        console.log("API_BASE_URL:", API_BASE_URL);

        try {
            const res = await axios.post(`${API_BASE_URL}/auth/login`, {
                email,
                password,
            });

            const {token, user} = res.data;

            // Store token in both cookies and localStorage for compatibility
            Cookies.set("token", token, {expires: 1});
            localStorage.setItem("token", token);
            Cookies.set("role", user.role?.toUpperCase(), {expires: 1});

            // Arahkan sesuai role
            if (user.role.toLowerCase() === "admin") {
                router.push("/admin/dashboard");
            } else {
                router.push("/user/home-page");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || "Email atau password salah";
                alert(message);
                console.error("Login gagal:", message);
            } else {
                alert("Terjadi kesalahan.");
                console.error("Unexpected error:", error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
                <div className="w-full max-w-md space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-bold text-gray-900">Masuk akun anda</h1>
                        <p className="text-gray-600">Selamat datang! mohon masukan alamat akun anda di bawah</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
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
                                    disabled={isLoading}
                                />
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Password<span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Kata sandi"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="pr-10"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                    disabled={isLoading}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="remember" disabled={isLoading} />
                                <label htmlFor="remember" className="text-sm text-gray-600">
                                    Remember me
                                </label>
                            </div>
                            <Link href="/forgot-password" className="text-sm text-[#4052B5]">
                                Lupa Kata Sandi
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-[#4052B5] hover:bg-[#324090] text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? "Memproses..." : "Masuk"}
                        </Button>
                        <p className="text-center text-sm text-gray-600">
                            Tidak punya akun?{" "}
                            <Link href="/register" className="text-[#4052B5]">
                                Daftar
                            </Link>
                        </p>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
}
