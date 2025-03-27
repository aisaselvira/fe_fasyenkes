"use client";

import {useState, useEffect, useCallback} from "react";
import {Mic} from "lucide-react";

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
    const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

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
                    setIsRecording(false);
                };

                setRecognition(recognitionInstance);
            }
        }

        return () => {
            if (recognition) {
                recognition.abort();
            }
        };
    }, [recognition]);

    // Toggle recording
    const toggleRecording = useCallback(() => {
        if (!recognition) return;

        if (isRecording) {
            recognition.stop();
            setIsRecording(false);
        } else {
            recognition.start();
            setIsRecording(true);
        }
    }, [isRecording, recognition]);

    return (
        <button
            onClick={toggleRecording}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                isRecording ? "bg-red-600 animate-pulse" : "bg-blue-800 hover:bg-blue-700"
            }`}
            disabled={!isActive}
            title={isRecording ? "Berhenti merekam" : "Mulai merekam"}
        >
            <Mic className="text-white w-6 h-6" />
        </button>
    );
}
