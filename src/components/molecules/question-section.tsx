"use client";

import {SectionTitle} from "../atoms/section-title";
import {VoiceRecorder} from "../atoms/voice-recorder";
import {AlertCircle} from "lucide-react";

interface QuestionSectionProps {
    question: string;
    isSimulationActive: boolean;
}

export function QuestionSection({question, isSimulationActive}: QuestionSectionProps) {
    return (
        <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm">
            <div className="bg-blue-800">
                <SectionTitle className="bg-blue-800 text-white font-semibold py-2 px-4 rounded-t-md">
                    Pertanyaan
                </SectionTitle>
            </div>
            <div className="p-4 min-h-[200px] flex flex-col justify-between">
                {isSimulationActive ? (
                    <>
                        <div className="mb-6">
                            <p className="text-gray-700 font-medium mb-2">Pertanyaan:</p>
                            <p className="text-gray-700 bg-blue-50 p-3 rounded-md border border-blue-100">{question}</p>
                        </div>

                        <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-100">
                            <p className="text-sm text-gray-600 mb-3">
                                Rekam jawaban Anda sebagai petugas pendaftaran:
                            </p>
                            <VoiceRecorder isActive={true} />
                        </div>
                    </>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-start gap-2">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                                <AlertCircle className="w-4 h-4 text-white" />
                            </div>
                            <p className="text-red-500 text-sm">
                                Bagian pertanyaan yang diajukan kamu sebagai petugas pendaftaran
                            </p>
                        </div>

                        <div className="flex items-start gap-2 mt-4">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                                <AlertCircle className="w-4 h-4 text-white" />
                            </div>
                            <p className="text-red-500 text-sm">
                                Rekam suara kamu untuk menilai kualitas komunikasi yang kamu lakukan
                            </p>
                        </div>

                        <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-100">
                            <p className="text-sm text-gray-500 mb-3">Rekam kalimat yang anda ucapkan:</p>
                            <VoiceRecorder isActive={false} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
