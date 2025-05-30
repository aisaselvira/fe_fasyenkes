"use client";
import {Button} from "@/components/atoms/button";

interface ErrorDisplayProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
}

export function ErrorDisplay({
    title = "Halaman tidak dapat dimuat",
    message = "Mohon maaf, terjadi kesalahan saat memuat halaman. Silakan coba lagi nanti.",
    onRetry,
}: ErrorDisplayProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="mb-6">
                <svg
                    width="120"
                    height="120"
                    viewBox="0 0 120 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto"
                >
                    <circle cx="60" cy="60" r="60" fill="#F9FAFB" />
                    <path
                        d="M86 42H34C30.6863 42 28 44.6863 28 48V72C28 75.3137 30.6863 78 34 78H86C89.3137 78 92 75.3137 92 72V48C92 44.6863 89.3137 42 86 42Z"
                        fill="#E5E7EB"
                    />
                    <path
                        d="M34 42H86C89.3137 42 92 44.6863 92 48V72C92 75.3137 89.3137 78 86 78H34C30.6863 78 28 75.3137 28 72V48C28 44.6863 30.6863 42 34 42Z"
                        stroke="#9CA3AF"
                        strokeWidth="2"
                    />
                    <path d="M28 54H92" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="37" cy="48" r="2" fill="#9CA3AF" />
                    <circle cx="45" cy="48" r="2" fill="#9CA3AF" />
                    <circle cx="53" cy="48" r="2" fill="#9CA3AF" />
                    <path
                        d="M60 66C60 66 55 61 50 66"
                        stroke="#EF4444"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M70 66C70 66 75 61 80 66"
                        stroke="#EF4444"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M50 72C50 72 60 68 80 72"
                        stroke="#EF4444"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600 mb-6 max-w-md">{message}</p>
            {onRetry && (
                <Button onClick={onRetry} className="bg-red-800 hover:bg-red-900 text-white">
                    Coba Lagi
                </Button>
            )}
        </div>
    );
}
