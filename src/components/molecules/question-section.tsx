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
                <SectionTitle title="Pertanyaan" className="bg-transparent" />
            </div>
            <div className="p-4 min-h-[200px] flex flex-col justify-between">
                {isSimulationActive ? (
                    <>
                        <p className="text-gray-700">{question}</p>

                        <div className="flex items-center mt-4">
                            <VoiceRecorder isActive={true} />
                            <p className="ml-4 text-sm text-gray-500">*Rekam kalimat yang anda ucapkan</p>
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

                        <div className="flex items-center mt-4">
                            <VoiceRecorder isActive={false} />
                            <p className="ml-4 text-sm text-gray-500">*Rekam kalimat yang anda ucapkan</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
