import {PatientSimulation} from "@/components/organism/patient-simulation";

export interface CaseComponent {
    id: number;
    question: string;
    answer: string;
    scenarios: string[];
    formType: "search" | "select" | "info" | "registration";
}

export interface Case {
    id: number;
    jenisPasien?: string;
    jenisKunjungan: string;
    diagnosis?: string;
    keluhan?: string;
    judulKasus: string;
    deskripsiKasus: string;
    metodePembayaran: string;
    perujuk?: string;
    caseComponent: CaseComponent[];
}

export interface RegistrationData {
    id: string;
    waktuAdmisi: string;
    nama: string;
    noHP: string;
    alamat: string;
    admisiKe: string;
    jenisAsuransi: string;
}

export interface PatientSimulationTemplateProps {
    selectedCase: Case;
    registrationData: RegistrationData[];
}

export function PatientSimulationTemplate({selectedCase, registrationData}: PatientSimulationTemplateProps) {
    return (
        <section className="bg-white">
            <div className="container mx-auto py-8 px-4">
                <PatientSimulation selectedCase={selectedCase} registrationData={registrationData} />
            </div>
        </section>
    );
}
