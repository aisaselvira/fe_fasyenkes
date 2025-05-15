import Image from "next/image";
import {Button} from "@/components/atoms/button";

interface ErrorDisplayProps {
    message?: string;
    onRetry?: () => void;
}

export function ErrorDisplay({message = "Halaman tidak dapat dimuat", onRetry}: ErrorDisplayProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="mb-6 relative w-64 h-64">
                <Image
                    src="/assets/error-illustration.svg"
                    alt="Error illustration"
                    fill
                    className="object-contain"
                    priority
                />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{message}</h2>
            <p className="text-gray-600 mb-6 max-w-md">
                Mohon maaf atas ketidaknyamanan ini. Silakan coba lagi nanti atau hubungi administrator.
            </p>
            {onRetry && (
                <Button onClick={onRetry} className="bg-red-800 hover:bg-red-900 text-white">
                    Coba Lagi
                </Button>
            )}
        </div>
    );
}
