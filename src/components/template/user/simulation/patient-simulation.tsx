import {PatientSimulation} from "@/components/organism/patient-simulation";
import type {PatientInfo} from "@/components/molecules/patient-info-table";

interface PatientSimulationTemplateProps {
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

export function PatientSimulationTemplate({simulationData, registrationData}: PatientSimulationTemplateProps) {
    return (
        <section className="bg-white">
            <div className="container mx-auto py-8 px-4">
                <PatientSimulation simulationData={simulationData} registrationData={registrationData} />
            </div>
        </section>
    );
}
