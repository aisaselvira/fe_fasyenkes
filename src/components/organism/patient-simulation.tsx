"use client";

import {useState} from "react";
import {PatientInfoTable, type PatientInfo} from "../molecules/patient-info-table";
import {TimerControl} from "../molecules/timer-control";
import {QuestionSection} from "../molecules/question-section";
import {ScenarioSection} from "../molecules/scenario-section";
import {AnswerSection} from "../molecules/answer-section";
import {RegistrationSection} from "./registration-section";
import {Button} from "@/components/atoms/button";
import {ChevronLeft, ChevronRight} from "lucide-react";

interface PatientSimulationProps {
    simulationData: {
        id: number;
        question: string;
        answer: string;
        scenarios: string[];
        patientInfo: PatientInfo;
        formType: "search" | "registration";
    }[];
    registrationData: {
        id: string;
        waktuAdmisi: string;
        nama: string;
        noHP: string;
        alamat: string;
        admisiKe: string;
        jenisAsuransi: string;
    }[];
}

export function PatientSimulation({simulationData, registrationData}: PatientSimulationProps) {
    const [isSimulationActive, setIsSimulationActive] = useState(false);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [currentSimulationIndex, setCurrentSimulationIndex] = useState(0);

    const currentSimulation = simulationData[currentSimulationIndex];
    // Always use the first scenario for each simulation case
    const currentScenario = currentSimulation.scenarios[0];

    const handlePrevious = () => {
        if (currentSimulationIndex > 0) {
            setCurrentSimulationIndex(currentSimulationIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentSimulationIndex < simulationData.length - 1) {
            setCurrentSimulationIndex(currentSimulationIndex + 1);
        }
    };

    const handleTimerToggle = () => {
        if (!isTimerRunning) {
            // Start timer and simulation
            setIsTimerRunning(true);
            setIsSimulationActive(true);
        } else {
            // Stop timer but keep simulation active
            setIsTimerRunning(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-blue-500 via-blue-300 to-white rounded-lg p-6 mb-6 shadow-lg">
                <div className="mb-6">
                    <PatientInfoTable patientInfo={currentSimulation.patientInfo} />
                </div>
                <div className="flex justify-end">
                    <TimerControl isRunning={isTimerRunning} onToggle={handleTimerToggle} />
                </div>
            </div>

            {isSimulationActive && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-1">
                    <div className="flex justify-start">
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-800 text-blue-800 hover:bg-blue-50 bg-white/90 shadow-sm mb-4"
                            onClick={handlePrevious}
                            disabled={currentSimulationIndex === 0}
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" /> Sebelumnya
                        </Button>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-800 text-blue-800 hover:bg-blue-50 bg-white/90 shadow-sm mb-4"
                            onClick={handleNext}
                            disabled={currentSimulationIndex === simulationData.length - 1}
                        >
                            Selanjutnya <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <QuestionSection question={currentSimulation.question} isSimulationActive={isSimulationActive} />
                <ScenarioSection scenario={currentScenario} isSimulationActive={isSimulationActive} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-6">
                <div className="w-full">
                    <AnswerSection answer={currentSimulation.answer} isSimulationActive={isSimulationActive} />
                </div>
                <div className="w-full">
                    <RegistrationSection
                        patients={registrationData}
                        isSimulationActive={isSimulationActive}
                        formType={currentSimulation.formType}
                    />
                </div>
            </div>
        </div>
    );
}
