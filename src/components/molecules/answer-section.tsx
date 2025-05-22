"use client";

import {useState, useEffect} from "react";
import {SectionTitle} from "../atoms/section-title";
import {Volume2, AlertCircle} from "lucide-react";
import {ClickableImage} from "@/components/atoms/clickable-image";
import {ImageModal} from "../atoms/image-modal";

interface AnswerSectionProps {
    answer: string;
    answerImage?: string;
    answerImages?: string[];
    isSimulationActive: boolean;
}

export function AnswerSection({answer, answerImage, answerImages, isSimulationActive}: AnswerSectionProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Load available voices
    useEffect(() => {
        if ("speechSynthesis" in window) {
            // Get initial list of voices
            const availableVoices = window.speechSynthesis.getVoices();
            if (availableVoices.length > 0) {
                setVoices(availableVoices);
            }

            // Chrome loads voices asynchronously, so we need this event
            const voicesChangedHandler = () => {
                const updatedVoices = window.speechSynthesis.getVoices();
                setVoices(updatedVoices);
            };

            window.speechSynthesis.addEventListener("voiceschanged", voicesChangedHandler);

            return () => {
                window.speechSynthesis.removeEventListener("voiceschanged", voicesChangedHandler);
            };
        }
    }, []);

    const toggleAudio = () => {
        if ("speechSynthesis" in window) {
            if (isPlaying) {
                // Stop audio
                speechSynthesis.cancel();
                setIsPlaying(false);
            } else if (isSimulationActive) {
                // Play audio
                const utterance = new SpeechSynthesisUtterance(answer);
                utterance.lang = "id-ID";

                // Try to find an Indonesian female voice
                const indonesianVoice = voices.find(
                    (voice) => voice.lang.includes("id") && voice.name.includes("Female")
                );

                // If no specific Indonesian female voice, try any Indonesian voice
                const anyIndonesianVoice = voices.find((voice) => voice.lang.includes("id"));

                // Set the voice if found
                if (indonesianVoice) {
                    utterance.voice = indonesianVoice;
                } else if (anyIndonesianVoice) {
                    utterance.voice = anyIndonesianVoice;
                }

                // Adjust pitch and rate for more natural Indonesian speech
                utterance.pitch = 1.2; // Slightly higher pitch for female voice
                utterance.rate = 0.9; // Slightly slower for clearer pronunciation

                utterance.onend = () => setIsPlaying(false);
                utterance.onerror = () => setIsPlaying(false);

                speechSynthesis.speak(utterance);
                setIsPlaying(true);
            }
        }
    };

    // Open image in modal
    const openImageModal = (imgSrc: string) => {
        setSelectedImage(imgSrc);
    };

    // Close image modal
    const closeImageModal = () => {
        setSelectedImage(null);
    };

    return (
        <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm">
            <div className="flex justify-between items-center bg-blue-800">
                <SectionTitle className="bg-blue-800 text-white font-semibold py-2 px-4 rounded-t-md">
                    Jawaban
                </SectionTitle>
                <button
                    onClick={toggleAudio}
                    className={`p-2 mr-2 rounded-full hover:bg-blue-700 transition-colors ${
                        isPlaying ? "animate-pulse" : ""
                    }`}
                    title={isPlaying ? "Hentikan audio" : "Putar audio"}
                    disabled={!isSimulationActive}
                >
                    <Volume2 className="text-white w-5 h-5" />
                </button>
            </div>
            <div className="p-4 min-h-[200px]">
                {isSimulationActive ? (
                    <>
                        <p className="text-sm text-blue-600 mb-4">
                            *Putar jawaban pasien dan isi formulir berdasarkan jawaban pasien
                        </p>

                        {/* Display text answer */}
                        {answer && <p className="text-gray-700 mb-4">{answer}</p>}

                        {/* Display image answer if available (legacy support) */}
                        {answerImage && !answerImages && (
                            <div className="mt-4">
                                <ClickableImage
                                    src={answerImage}
                                    alt="Jawaban pasien"
                                    onClick={() => openImageModal(answerImage)}
                                />
                            </div>
                        )}

                        {/* Display multiple images if available */}
                        {answerImages && answerImages.length > 0 && (
                            <div className="mt-4 space-y-4">
                                {answerImages.map((imgSrc, index) => (
                                    <ClickableImage
                                        key={index}
                                        src={imgSrc}
                                        alt={`Jawaban pasien ${index + 1}`}
                                        onClick={() => openImageModal(imgSrc)}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="space-y-6">
                        <p className="text-sm text-blue-600 mb-4">
                            *Putar jawaban pasien dan isi formulir berdasarkan jawaban pasien
                        </p>

                        <div className="flex items-start gap-2">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                                <AlertCircle className="w-4 h-4 text-white" />
                            </div>
                            <p className="text-red-500 text-sm">Jawaban pasien dari pertanyaan yang kamu ajukan</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Image Modal from Atoms */}
            <ImageModal
                isOpen={!!selectedImage}
                imageSrc={selectedImage}
                alt="Detail jawaban pasien"
                onClose={closeImageModal}
            />
        </div>
    );
}
