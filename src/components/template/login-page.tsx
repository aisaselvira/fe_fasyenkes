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

import api from "@/config/api";
import { config } from "@/config";
import {useRouter} from "next/router";
import Cookies from "js-cookie";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await api.post(config.endpoints.auth.login, {
                email,
                password,
            });

            const {token, user} = res.data;

            Cookies.set(config.auth.tokenKey, token, {expires: config.auth.cookieExpires});
            localStorage.setItem(config.auth.tokenKey, token);
            Cookies.set(config.auth.roleKey, user.role?.toUpperCase(), {expires: config.auth.cookieExpires});

            if (user.role.toLowerCase() === "admin") {
                router.push(config.routes.admin.dashboard);
            } else {
                router.push(config.routes.user.home);
            }
        } catch (error) {
            console.error("Login gagal:", error);
            alert("Email atau password salah");
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
                            <Link href={config.routes.forgotPassword} className="text-sm text-[#4052B5]">
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
                            <Link href={config.routes.register} className="text-[#4052B5]">
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
