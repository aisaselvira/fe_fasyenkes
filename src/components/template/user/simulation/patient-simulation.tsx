import {PatientSimulation} from "@/components/organism/patient-simulation";

export interface CaseComponent {
    id: number;
    question: string;
    answer: string;
    answerImage?: string;
    answerImages?: string[];
    scenarios: string[];
    formType: "search" | "pendaftaran" | "admission-rawat-jalan" | "admission-rawat-inap" | "admission-gawat-darurat";
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
    caseType?: string;
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
        <div className="container mx-auto py-8 px-4">
            <PatientSimulation selectedCase={selectedCase} registrationData={registrationData} />
        </div>
    );
}
