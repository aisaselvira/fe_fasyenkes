"use client";

import {useEffect} from "react";
import Image from "next/image";
import {X} from "lucide-react";

interface ImageModalProps {
    isOpen: boolean;
    imageSrc: string | null;
    onClose: () => void;
    alt?: string;
}

export function ImageModal({isOpen, imageSrc, onClose, alt = "Detail gambar"}: ImageModalProps) {
    // Handle ESC key to close modal
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleEsc);
        }

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !imageSrc) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl max-h-[90vh] w-full">
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-200 transition-colors"
                    aria-label="Tutup gambar"
                >
                    <X className="w-6 h-6" />
                </button>
                <div className="bg-white p-2 rounded-lg shadow-2xl">
                    <Image
                        src={imageSrc || "/placeholder.svg"}
                        alt={alt}
                        width={1200}
                        height={800}
                        className="object-contain max-h-[80vh] w-full"
                    />
                </div>
            </div>
        </div>
    );
}
