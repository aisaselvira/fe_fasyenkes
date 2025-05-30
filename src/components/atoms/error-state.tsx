"use client";
import {AlertCircle} from "lucide-react";
import {Button} from "@/components/atoms/button";

interface ErrorStateProps {
    message?: string;
    onRetry?: () => void;
}

export function ErrorState({message = "Halaman tidak dapat dimuat", onRetry}: ErrorStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{message}</h3>
            {onRetry && (
                <Button onClick={onRetry} className="mt-4 bg-red-800 hover:bg-red-900 text-white">
                    Coba Lagi
                </Button>
            )}
        </div>
    );
}
