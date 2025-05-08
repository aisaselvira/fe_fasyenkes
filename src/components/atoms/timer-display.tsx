"use client";

import {useState, useEffect, useRef} from "react";

interface TimerDisplayProps {
    isRunning: boolean;
    onTimeUpdate?: (seconds: number) => void;
}

export function TimerDisplay({isRunning, onTimeUpdate}: TimerDisplayProps) {
    const [seconds, setSeconds] = useState(0);
    const secondsRef = useRef(seconds);

    useEffect(() => {
        secondsRef.current = seconds;
        if (onTimeUpdate) {
            onTimeUpdate(seconds);
        }
    }, [seconds, onTimeUpdate]);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        } else if (!isRunning && seconds !== 0) {
            // Don't reset timer when stopped - we'll handle reset elsewhere
            if (interval) clearInterval(interval);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRunning, seconds]);

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    // Format the display based on whether hours are present
    const timeDisplay =
        hours > 0
            ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
                  remainingSeconds
              ).padStart(2, "0")}`
            : `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;

    return <div className="text-4xl font-bold text-blue-900">{timeDisplay}</div>;
}
