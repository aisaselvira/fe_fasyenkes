"use client";

import {useState, useEffect} from "react";

interface TimerDisplayProps {
    isRunning: boolean;
}

export function TimerDisplay({isRunning}: TimerDisplayProps) {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        } else if (!isRunning && seconds !== 0) {
            // Reset timer when stopped
            setSeconds(0);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRunning, seconds]);

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return (
        <div className="text-4xl font-bold text-blue-900">
            {String(minutes).padStart(2, "0")}.{String(remainingSeconds).padStart(2, "0")}
        </div>
    );
}
