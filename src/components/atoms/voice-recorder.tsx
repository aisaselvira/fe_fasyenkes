"use client";

import {useState, useEffect, useCallback, useRef} from "react";
import {Mic, Square, Save, Trash2, Play, Pause} from "lucide-react";

interface VoiceRecorderProps {
    isActive?: boolean;
}

// Define browser-specific speech recognition
declare global {
    interface Window {
        SpeechRecognition: typeof SpeechRecognition;
        webkitSpeechRecognition: typeof SpeechRecognition;
    }
}

// Define SpeechRecognition interface
interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onend: ((this: SpeechRecognition, ev: Event) => void) | null;
    start: () => void;
    stop: () => void;
    abort: () => void;
}

// Define SpeechRecognition constructor
declare global {
    // Use interface declaration merging instead of 'var'
    interface SpeechRecognitionConstructor {
        new (): SpeechRecognition;
        prototype: SpeechRecognition;
    }

    // Declare the global constructor
    const SpeechRecognition: SpeechRecognitionConstructor;
    const webkitSpeechRecognition: SpeechRecognitionConstructor;
}

export function VoiceRecorder({isActive = false}: VoiceRecorderProps) {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [recordingComplete, setRecordingComplete] = useState(false);
    const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
    const [waveformBars, setWaveformBars] = useState<number[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const waveformRef = useRef<NodeJS.Timeout | null>(null);
    const barCount = 125;
    const [notification, setNotification] = useState<{
        show: boolean;
        message: string;
        type: "success" | "error" | "info";
    } | null>(null);

    // Initialize speech recognition
    useEffect(() => {
        if (typeof window !== "undefined") {
            // Browser compatibility check
            const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

            if (SpeechRecognitionAPI) {
                const recognitionInstance = new SpeechRecognitionAPI();
                recognitionInstance.continuous = true;
                recognitionInstance.interimResults = true;
                recognitionInstance.lang = "id-ID"; // Indonesian language

                recognitionInstance.onend = () => {
                    if (isRecording && !isPaused) {
                        // Auto-restart if not manually stopped
                        recognitionInstance.start();
                    }
                };

                setRecognition(recognitionInstance);
            }
        }

        return () => {
            if (recognition) {
                recognition.abort();
            }
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            if (waveformRef.current) {
                clearInterval(waveformRef.current);
            }
        };
    }, []); // Empty dependency array - only run once on mount

    // Handle timer
    useEffect(() => {
        if (isRecording && !isPaused) {
            timerRef.current = setInterval(() => {
                setRecordingTime((prevTime) => prevTime + 1);
            }, 1000);
        } else if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isRecording, isPaused]);

    useEffect(() => {
        // Initialize waveform
        setWaveformBars(Array.from({length: barCount}, () => Math.floor(Math.random() * 10) + 1));

        if (isRecording && !isPaused) {
            waveformRef.current = setInterval(() => {
                setWaveformBars(Array.from({length: barCount}, () => Math.floor(Math.random() * 20) + 1));
            }, 150);
        } else if (waveformRef.current) {
            clearInterval(waveformRef.current);

            if (isPaused) {
                setWaveformBars(Array.from({length: barCount}, () => 2));
            }
        }

        return () => {
            if (waveformRef.current) {
                clearInterval(waveformRef.current);
            }
        };
    }, [isRecording, isPaused, barCount]);

    // Format time as MM:SS
    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    // Start recording
    const startRecording = useCallback(() => {
        if (!recognition) return;

        recognition.start();
        setIsRecording(true);
        setIsPaused(false);
        setRecordingComplete(false);
    }, [recognition]);

    // Pause recording
    const pauseRecording = useCallback(() => {
        if (!recognition) return;

        recognition.stop();
        setIsPaused(true);
    }, [recognition]);

    // Resume recording
    const resumeRecording = useCallback(() => {
        if (!recognition) return;

        recognition.start();
        setIsPaused(false);
    }, [recognition]);

    // Stop recording
    const stopRecording = useCallback(() => {
        if (!recognition) return;

        recognition.stop();
        setIsRecording(false);
        setIsPaused(false);
        setRecordingComplete(true);
    }, [recognition]);

    // Auto-hide notification after 3 seconds
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    // Show notification
    const showNotification = (message: string, type: "success" | "error" | "info") => {
        setNotification({
            show: true,
            message,
            type,
        });
    };

    // Save recording (dummy function)
    const saveRecording = useCallback(() => {
        showNotification("Rekaman berhasil disimpan ke sistem (simulasi).", "success");
        setRecordingComplete(false);
        setRecordingTime(0);
    }, []);

    // Cancel recording
    const cancelRecording = useCallback(() => {
        if (!recognition) return;

        recognition.stop();
        setIsRecording(false);
        setIsPaused(false);
        setRecordingComplete(false);
        setRecordingTime(0);

        showNotification("Rekaman telah dihapus.", "error");
    }, [recognition]);

    return (
        <div className="flex flex-col items-start w-full">
            {/* Notification */}
            {notification && (
                <div
                    className={`mb-3 p-2 rounded-md w-full text-sm ${
                        notification.type === "success"
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : notification.type === "error"
                            ? "bg-red-100 text-red-800 border border-red-200"
                            : "bg-blue-100 text-blue-800 border border-blue-200"
                    }`}
                >
                    {notification.message}
                </div>
            )}
            <div className="flex items-center gap-3 mb-2 w-full">
                {/* Recording controls */}
                <div className="flex items-center gap-2">
                    {!isRecording && !recordingComplete ? (
                        // Start recording button
                        <button
                            onClick={startRecording}
                            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-blue-800 hover:bg-blue-700"
                            disabled={!isActive}
                            title="Mulai merekam"
                        >
                            <Mic className="text-white w-5 h-5" />
                        </button>
                    ) : isRecording ? (
                        // Recording controls
                        <>
                            {isPaused ? (
                                // Resume button
                                <button
                                    onClick={resumeRecording}
                                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-green-600 hover:bg-green-500"
                                    title="Lanjutkan merekam"
                                >
                                    <Play className="text-white w-5 h-5" />
                                </button>
                            ) : (
                                // Pause button
                                <button
                                    onClick={pauseRecording}
                                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-yellow-500 hover:bg-yellow-400"
                                    title="Jeda merekam"
                                >
                                    <Pause className="text-white w-5 h-5" />
                                </button>
                            )}

                            {/* Stop button */}
                            <button
                                onClick={stopRecording}
                                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-red-600 hover:bg-red-500"
                                title="Berhenti merekam"
                            >
                                <Square className="text-white w-4 h-4" />
                            </button>
                        </>
                    ) : recordingComplete ? (
                        // Playback controls
                        <>
                            <button
                                onClick={saveRecording}
                                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-green-600 hover:bg-green-500"
                                title="Simpan rekaman"
                            >
                                <Save className="text-white w-4 h-4" />
                            </button>
                            <button
                                onClick={cancelRecording}
                                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-red-600 hover:bg-red-500"
                                title="Hapus rekaman"
                            >
                                <Trash2 className="text-white w-4 h-4" />
                            </button>
                        </>
                    ) : null}
                </div>

                {/* Timer display */}
                {recordingTime > 0 && (
                    <div
                        className={`text-base font-mono font-bold ${
                            isRecording && !isPaused ? "text-red-500" : "text-gray-700"
                        }`}
                    >
                        {formatTime(recordingTime)}
                    </div>
                )}

                {/* Status text */}
                <div className="text-sm text-gray-500">
                    {isRecording
                        ? isPaused
                            ? "Rekaman dijeda"
                            : "Merekam..."
                        : recordingComplete
                        ? "Rekaman selesai"
                        : ""}
                </div>
            </div>
            {/* Audio waveform visualization */}
            {(isRecording || recordingComplete) && (
                <div className="h-12 bg-gray-50 rounded-md border border-gray-200 p-1 flex items-center overflow-hidden">
                    <div className="flex items-end h-8 w-full gap-[1px]">
                        {waveformBars.map((height, index) => (
                            <div
                                key={index}
                                className={`rounded-sm ${
                                    isRecording && !isPaused
                                        ? "bg-blue-500 animate-pulse"
                                        : isPaused
                                        ? "bg-gray-400"
                                        : "bg-green-500"
                                }`}
                                style={{
                                    width: "2px", // Lebar batang lebih kecil
                                    height: `${Math.min(height * 4, 32)}px`,
                                    minHeight: "2px",
                                    transition: "height 0.1s ease-in-out",
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
