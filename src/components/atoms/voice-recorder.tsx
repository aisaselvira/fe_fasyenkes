"use client";

import {useState, useEffect, useCallback, useRef} from "react";
import {Mic, Square, Save, Trash2, Play, Pause} from "lucide-react";
import {getAuthToken} from "@/lib/utils";

interface VoiceRecorderProps {
    isActive?: boolean;
    question?: string;
    scenarioId?: number;
    simulationId?: number;
    onAnswerChange?: (answer: string) => void;
}

// Define browser-specific speech recognition
declare global {
    interface Window {
        SpeechRecognition: typeof SpeechRecognition;
        webkitSpeechRecognition: typeof SpeechRecognition;
    }
}

// Define proper interfaces for speech recognition events
interface SpeechRecognitionEvent extends Event {
    resultIndex: number;
    results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
    length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
    length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
    isFinal: boolean;
}

interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message: string;
}

// Define SpeechRecognition interface with proper event types
interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onend: ((this: SpeechRecognition, ev: Event) => void) | null;
    onstart: ((this: SpeechRecognition, ev: Event) => void) | null;
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null;
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

export function VoiceRecorder({
    isActive = false,
    question = "",
    scenarioId = 1,
    simulationId = 1,
    onAnswerChange,
}: VoiceRecorderProps) {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [recordingComplete, setRecordingComplete] = useState(false);
    const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
    const [waveformBars, setWaveformBars] = useState<number[]>([]);
    const [transcript, setTranscript] = useState("");
    const [similarityScore, setSimilarityScore] = useState<number | null>(null);
    const [isCheckingSimilarity, setIsCheckingSimilarity] = useState(false);

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

                recognitionInstance.onstart = () => {
                    console.log("Speech recognition started");
                };

                recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
                    let finalTranscript = "";
                    let interimTranscript = "";

                    for (let i = event.resultIndex; i < event.results.length; i++) {
                        const transcript = event.results[i][0].transcript;
                        if (event.results[i].isFinal) {
                            finalTranscript += transcript;
                        } else {
                            interimTranscript += transcript;
                        }
                    }

                    const fullTranscript = finalTranscript || interimTranscript;
                    setTranscript(fullTranscript);

                    // Call onAnswerChange callback if provided
                    if (onAnswerChange) {
                        onAnswerChange(fullTranscript);
                    }
                };

                recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
                    console.error("Speech recognition error:", event.error);
                    showNotification("Terjadi kesalahan pada pengenalan suara", "error");
                };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        setTranscript(""); // Clear previous transcript
        setSimilarityScore(null); // Clear previous similarity score
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

    // Save recording and check similarity
    const saveRecording = useCallback(async () => {
        if (!transcript.trim()) {
            showNotification("Tidak ada teks yang direkam", "error");
            return;
        }

        // Check if user is authenticated
        const token = getAuthToken();
        if (!token) {
            showNotification("Anda perlu login untuk menggunakan fitur ini", "error");
            return;
        }

        setIsCheckingSimilarity(true);

        try {
            // Get API URL from environment variables
            const API_URL =
                process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:19200";

            // Send transcript to similarity API with authentication
            const response = await fetch(`${API_URL}/get-score-similarity/${scenarioId}/${simulationId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    answer: transcript,
                    question: question,
                }),
            });

            if (!response.ok) {
                // Handle different error status codes
                if (response.status === 401) {
                    showNotification("Sesi Anda telah berakhir. Silakan login kembali.", "error");
                    return;
                } else if (response.status === 403) {
                    showNotification("Anda tidak memiliki akses untuk fitur ini", "error");
                    return;
                } else if (response.status === 404) {
                    showNotification("Endpoint similarity tidak ditemukan", "error");
                    return;
                } else if (response.status >= 500) {
                    showNotification("Terjadi kesalahan pada server. Silakan coba lagi nanti.", "error");
                    return;
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            }

            const data = await response.json();
            const score = data.similarity_score || data.score || 0;

            setSimilarityScore(score);

            // Show notification with score
            const scorePercentage = (score * 100).toFixed(1);
            showNotification(`Similarity score: ${scorePercentage}%`, "success");

            // Reset recording state but keep transcript
            setRecordingComplete(false);
            setRecordingTime(0);
        } catch (error) {
            console.error("Error checking similarity:", error);

            // Handle network errors
            if (error instanceof TypeError && error.message.includes("fetch")) {
                showNotification("Tidak dapat terhubung ke server. Periksa koneksi internet Anda.", "error");
            } else {
                showNotification("Gagal mengecek similarity. Silakan coba lagi.", "error");
            }
        } finally {
            setIsCheckingSimilarity(false);
        }
    }, [transcript, scenarioId, simulationId, question]);

    // Cancel recording
    const cancelRecording = useCallback(() => {
        if (!recognition) return;

        recognition.stop();
        setIsRecording(false);
        setIsPaused(false);
        setRecordingComplete(false);
        setRecordingTime(0);
        setTranscript("");
        setSimilarityScore(null);

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
                                disabled={isCheckingSimilarity}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                    isCheckingSimilarity
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-green-600 hover:bg-green-500"
                                }`}
                                title="Simpan rekaman dan cek similarity"
                            >
                                {isCheckingSimilarity ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <Save className="text-white w-4 h-4" />
                                )}
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
                <div className="h-12 bg-gray-50 rounded-md border border-gray-200 p-1 flex items-center overflow-hidden w-full">
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

            {/* Transcript Display */}
            {transcript && (
                <div className="mt-3 p-3 bg-gray-50 rounded-md border border-gray-200 w-full">
                    <p className="text-sm font-medium text-gray-700 mb-1">Text yang ditangkap:</p>
                    <p className="text-sm text-gray-800">{transcript}</p>
                </div>
            )}

            {/* Similarity Score Display */}
            {similarityScore !== null && (
                <div
                    className={`mt-3 p-3 rounded-md border w-full ${
                        similarityScore > 0.7
                            ? "bg-green-50 border-green-200 text-green-800"
                            : similarityScore > 0.5
                            ? "bg-yellow-50 border-yellow-200 text-yellow-800"
                            : "bg-red-50 border-red-200 text-red-800"
                    }`}
                >
                    <p className="text-sm font-medium">Skor Similarity: {(similarityScore * 100).toFixed(1)}%</p>
                    <p className="text-xs mt-1">
                        {similarityScore > 0.7
                            ? "Sangat baik!"
                            : similarityScore > 0.5
                            ? "Cukup baik"
                            : "Perlu diperbaiki"}
                    </p>
                </div>
            )}
        </div>
    );
}
