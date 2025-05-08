"use client";

import {useState} from "react";
import {ChevronDown, ChevronUp} from "lucide-react";
import {Progress} from "@/components/atoms/progress";

interface CaseResultCardProps {
    caseNumber: number;
    caseTitle: string;
    actualDuration: string;
    idealDuration: string;
    isUnderIdealTime: boolean;
    pronunciationScore: number;
}

export function CaseResultCard({
    caseNumber,
    caseTitle,
    actualDuration,
    idealDuration,
    pronunciationScore,
}: CaseResultCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="overflow-hidden rounded-xl border border-blue-100 shadow-sm">
            {/* Header - Always visible */}
            <div
                className="flex items-center justify-between p-4 cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-20 h-10 rounded-lg bg-blue-600 text-white font-semibold">
                        Kasus {caseNumber}
                    </div>
                    <div className="font-medium">{caseTitle}</div>
                </div>
                <div>
                    {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-blue-600" />
                    ) : (
                        <ChevronDown className="h-5 w-5 text-blue-600" />
                    )}
                </div>
            </div>

            {/* Expandable content */}
            {isExpanded && (
                <div className="p-4 bg-white border-t border-blue-100">
                    <div className="space-y-6">
                        {/* Waktu Penyelesaian Kasus */}
                        <div className="space-y-4">
                            <h3 className="text-center font-semibold text-gray-700">Waktu Penyelesaian Kasus</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-yellow-300 rounded-lg p-4 text-center">
                                    <div className="text-sm font-medium mb-2">Durasi Penyelesaian Kasus :</div>
                                    <div className="text-2xl font-bold">{actualDuration}</div>
                                </div>
                                <div className="bg-yellow-300 rounded-lg p-4 text-center">
                                    <div className="text-sm font-medium mb-2">Durasi Ideal :</div>
                                    <div className="text-2xl font-bold">{idealDuration}</div>
                                </div>
                            </div>
                        </div>

                        {/* Komunikasi */}
                        <div className="space-y-4">
                            <h3 className="text-center font-semibold text-gray-700">Komunikasi</h3>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Pronunciation</span>
                                    <span className="text-sm font-medium">{pronunciationScore}%</span>
                                </div>
                                <Progress
                                    value={pronunciationScore}
                                    className="h-2.5 rounded-full"
                                    indicatorClassName={`rounded-full ${
                                        pronunciationScore < 50
                                            ? "bg-red-500"
                                            : pronunciationScore < 75
                                            ? "bg-yellow-500"
                                            : "bg-green-500"
                                    }`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
