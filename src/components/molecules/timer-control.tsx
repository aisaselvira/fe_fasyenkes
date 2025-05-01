"use client";

import {useRouter, usePathname} from "next/navigation";
import {Button} from "@/components/atoms/button";
import {TimerDisplay} from "../atoms/timer-display";

interface TimerControlProps {
    isRunning: boolean;
    onToggle: () => void;
    caseType?: string;
    caseId?: number;
}

export function TimerControl({isRunning, onToggle, caseType, caseId}: TimerControlProps) {
    const router = useRouter();
    const pathname = usePathname();

    const handleFinish = () => {
        onToggle(); // Stop the timer

        // If caseType and caseId are provided, navigate to the results page
        if (caseType && caseId) {
            router.push(`/user/simulation/my-case-results/${caseType}/${caseId}`);
        } else {
            // Try to extract caseType and caseId from the current path
            const pathParts = pathname.split("/");
            const pathCaseType = pathParts[pathParts.length - 2];
            const pathCaseId = pathParts[pathParts.length - 1];

            if (pathCaseType && pathCaseId) {
                router.push(`/user/simulation/my-case-results/${pathCaseType}/${pathCaseId}`);
            } else {
                // Fallback to just toggling if we can't determine the case
                console.warn("Could not determine case type and ID for navigation");
            }
        }
    };

    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-lg shadow-sm">
                <span className="text-blue-900 font-semibold">Waktu : </span>
                <TimerDisplay isRunning={isRunning} />
            </div>
            <Button
                variant="outline"
                className="border-blue-800 text-blue-800 hover:bg-blue-50 bg-white/90 shadow-sm"
                onClick={isRunning ? handleFinish : onToggle}
            >
                {isRunning ? "Selesai" : "Mulai"}
            </Button>
        </div>
    );
}
