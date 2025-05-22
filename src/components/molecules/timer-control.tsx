"use client";

import {useRouter, usePathname} from "next/navigation";
import {useState} from "react";
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
    const [currentSeconds, setCurrentSeconds] = useState(0);

    const handleTimeUpdate = (seconds: number) => {
        setCurrentSeconds(seconds);
    };

    const handleFinish = () => {
        onToggle(); // Stop the timer

        // Format the time for storage
        const hours = Math.floor(currentSeconds / 3600);
        const minutes = Math.floor((currentSeconds % 3600) / 60);
        const remainingSeconds = currentSeconds % 60;

        // Format with colons (HH:MM:SS or MM:SS)
        const formattedTime =
            hours > 0
                ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
                      remainingSeconds
                  ).padStart(2, "0")}`
                : `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;

        // Determine case type and ID
        let finalCaseType = caseType;
        let finalCaseId = caseId;

        if (!finalCaseType || !finalCaseId) {
            // Try to extract from pathname
            const pathParts = pathname.split("/");
            finalCaseType = pathParts[pathParts.length - 2];
            finalCaseId = Number.parseInt(pathParts[pathParts.length - 1]);
        }

        if (finalCaseType && finalCaseId) {
            // Save the time to localStorage
            localStorage.setItem(`caseTime_${finalCaseType}_${finalCaseId}`, formattedTime);
            localStorage.setItem(`caseTimeSeconds_${finalCaseType}_${finalCaseId}`, currentSeconds.toString());

            // Navigate to results page
            router.push(`/user/simulation/my-case-results/${finalCaseType}/${finalCaseId}`);
        } else {
            // Fallback to just toggling if we can't determine the case
            console.warn("Could not determine case type and ID for navigation");
        }
    };

    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-lg shadow-sm">
                <span className="text-blue-900 font-semibold">Waktu : </span>
                <TimerDisplay isRunning={isRunning} onTimeUpdate={handleTimeUpdate} />
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
