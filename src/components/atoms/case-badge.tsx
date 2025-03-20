import {cn} from "@/lib/utils";

interface CaseBadgeProps {
    number: number;
    className?: string;
}

export function CaseBadge({number, className}: CaseBadgeProps) {
    return (
        <div
            className={cn(
                "bg-blue-800 text-white px-4 py-2 rounded-md font-medium w-full sm:w-auto text-center",
                className
            )}
        >
            Kasus {number}
        </div>
    );
}
