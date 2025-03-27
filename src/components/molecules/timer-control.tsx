"use client";

import {Button} from "@/components/atoms/button";
import {TimerDisplay} from "../atoms/timer-display";

interface TimerControlProps {
    isRunning: boolean;
    onToggle: () => void;
}

export function TimerControl({isRunning, onToggle}: TimerControlProps) {
    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-lg shadow-sm">
                <span className="text-blue-900 font-semibold">Waktu : </span>
                <TimerDisplay isRunning={isRunning} />
            </div>
            <Button
                variant="outline"
                className="border-blue-800 text-blue-800 hover:bg-blue-50 bg-white/90 shadow-sm"
                onClick={onToggle}
            >
                {isRunning ? "Selesai" : "Mulai"}
            </Button>
        </div>
    );
}
