"use client";

import {Button} from "@/components/atoms/button";
import {useRouter} from "next/navigation";

interface AuthErrorDisplayProps {
    title?: string;
    message?: string;
    errorCode?: string;
    onRetry?: () => void;
    onLogin?: () => void;
}

export function AuthErrorDisplay({
    title = "Autentikasi Diperlukan",
    message = "Silakan login untuk mengakses halaman ini.",
    errorCode,
    onRetry,
    onLogin,
}: AuthErrorDisplayProps) {
    const router = useRouter();

    const handleLogin = () => {
        if (onLogin) {
            onLogin();
        } else {
            router.push("/login");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center max-w-md mx-auto">
            <div className="mb-8 relative w-64 h-64">
                <svg
                    width="256"
                    height="256"
                    viewBox="0 0 256 256"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto"
                >
                    <circle cx="128" cy="128" r="128" fill="#F0F7FF" />
                    <rect x="78" y="82" width="100" height="130" rx="8" fill="#E2E8F0" />
                    <rect x="78" y="82" width="100" height="130" rx="8" stroke="#94A3B8" strokeWidth="2" />
                    <circle cx="128" cy="142" r="12" fill="#94A3B8" />
                    <path d="M128 154V170" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
                    <rect x="98" y="102" width="60" height="10" rx="2" fill="#94A3B8" />
                    <rect x="98" y="118" width="60" height="6" rx="2" fill="#94A3B8" />
                    <path
                        d="M128 82V58M128 58H108M128 58H148"
                        stroke="#94A3B8"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <circle cx="128" cy="58" r="24" fill="#3B82F6" fillOpacity="0.2" />
                    <path
                        d="M116 58L124 66L140 50"
                        stroke="#3B82F6"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <circle cx="128" cy="58" r="24" stroke="#3B82F6" strokeWidth="2" />
                    <path
                        d="M172 128L196 128M196 128V108M196 128V148"
                        stroke="#EF4444"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <circle cx="196" cy="128" r="24" fill="#EF4444" fillOpacity="0.2" />
                    <path
                        d="M188 120L204 136M204 120L188 136"
                        stroke="#EF4444"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <circle cx="196" cy="128" r="24" stroke="#EF4444" strokeWidth="2" />
                </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600 mb-2">{message}</p>

            {errorCode && (
                <div className="bg-gray-100 px-4 py-2 rounded-md text-sm text-gray-600 font-mono mb-6">{errorCode}</div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button onClick={handleLogin} className="bg-blue-600 hover:bg-blue-700">
                    Login
                </Button>
                {onRetry && (
                    <Button onClick={onRetry} variant="outline">
                        Coba Lagi
                    </Button>
                )}
            </div>
        </div>
    );
}
