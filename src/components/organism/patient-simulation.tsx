"use client";

import {useState} from "react";
import Link from "next/link";
import {PatientInfoTable} from "../molecules/patient-info-table";
import {TimerControl} from "../molecules/timer-control";
import {QuestionSection} from "../molecules/question-section";
import {ScenarioSection} from "../molecules/scenario-section";
import {AnswerSection} from "../molecules/answer-section";
import {RegistrationSection} from "./registration-section";
import {Button} from "@/components/atoms/button";
import {ChevronLeft, ChevronRight, ArrowLeft} from "lucide-react";
import type {Case, RegistrationData} from "@/components/template/user/simulation/patient-simulation";
import {useParams} from "next/navigation";
import {DebugInfo} from "../atoms/debug-info";

interface PatientSimulationProps {
    selectedCase: Case;
    registrationData: RegistrationData[];
}

export function PatientSimulation({selectedCase, registrationData}: PatientSimulationProps) {
    const [isSimulationActive, setIsSimulationActive] = useState(false);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
    const params = useParams();

    // Get case type from URL params
    const caseType = (params?.caseType as string) || "";

    // Ensure selectedCase and its properties exist
    if (!selectedCase || !selectedCase.caseComponent || !Array.isArray(selectedCase.caseComponent)) {
        return <div>Error: Invalid case data</div>;
    }

    // Get the current case component with safety check
    const currentCaseComponent = selectedCase.caseComponent[currentComponentIndex] || {};

    // Create patient info object from selected case with safety checks
    const patientInfo = {
        jenisPasien: selectedCase.jenisPasien || "",
        jenisKunjungan: selectedCase.jenisKunjungan || "",
        diagnosis: selectedCase.diagnosis || "",
        keluhan: selectedCase.keluhan || "",
        judulKasus: selectedCase.judulKasus || "",
        deskripsiKasus: selectedCase.deskripsiKasus || "",
        metodePembayaran: selectedCase.metodePembayaran || "",
        perujuk: selectedCase.perujuk || "",
        caseType: caseType as "tpprj" | "tppri" | "tppgd",
    };

    // Make sure we're using the correct form type from the current component
    const formType = currentCaseComponent.formType || "search";

    // Log the current component and form type for debugging
    console.log("Current component:", currentComponentIndex, "Form type:", formType);

    const handlePrevious = () => {
        if (currentComponentIndex > 0) {
            setCurrentComponentIndex(currentComponentIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentComponentIndex < selectedCase.caseComponent.length - 1) {
            setCurrentComponentIndex(currentComponentIndex + 1);
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
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-blue-800">Kasus {selectedCase.id}</h1>
                <Link href="/user/simulation/case-list">
                    <Button variant="outline" className="border-blue-800 text-blue-800 hover:bg-blue-50">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
                    </Button>
                </Link>
            </div>

            <div className="bg-gradient-to-br from-blue-500 via-blue-300 to-white rounded-lg p-6 mb-6 shadow-lg">
                <div className="mb-6">
                    <PatientInfoTable patientInfo={patientInfo} />
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
                            className="border-blue-800 text-blue-800 hover:bg-blue-50 bg-white/90 shadow-sm"
                            onClick={handlePrevious}
                            disabled={currentComponentIndex === 0}
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" /> Sebelumnya
                        </Button>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-800 text-blue-800 hover:bg-blue-50 bg-white/90 shadow-sm"
                            onClick={handleNext}
                            disabled={currentComponentIndex === selectedCase.caseComponent.length - 1}
                        >
                            Selanjutnya <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <QuestionSection
                    question={currentCaseComponent.question || ""}
                    isSimulationActive={isSimulationActive}
                />
                <ScenarioSection
                    scenario={
                        currentCaseComponent.scenarios && currentCaseComponent.scenarios[0]
                            ? currentCaseComponent.scenarios[0]
                            : ""
                    }
                    isSimulationActive={isSimulationActive}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-6">
                <div className="w-full">
                    <AnswerSection
                        answer={currentCaseComponent.answer || ""}
                        answerImage={currentCaseComponent.answerImage}
                        answerImages={currentCaseComponent.answerImages}
                        isSimulationActive={isSimulationActive}
                    />
                </div>
                <div className="w-full">
                    <RegistrationSection
                        patients={registrationData}
                        isSimulationActive={isSimulationActive}
                        formType={
                            formType as
                                | "search"
                                | "select"
                                | "info"
                                | "registration"
                                | "admission"
                                | "admission-rawat-inap"
                                | "admission-gawat-darurat"
                        }
                    />
                </div>
            </div>
            <DebugInfo currentComponentIndex={currentComponentIndex} formType={formType} isVisible={true} />
        </div>
    );
}
