"use client";

import {cn} from "@/lib/utils";

interface TabButtonProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

export function TabButton({label, isActive, onClick}: TabButtonProps) {
    return (
        <button
            onClick={onClick}
            className={cn("py-3 text-lg font-bold", isActive ? "bg-primary text-white" : "bg-gray-200")}
        >
            {label}
        </button>
    );
}
