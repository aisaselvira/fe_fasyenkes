"use client";

import {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {PatientSimulationTemplate} from "@/components/template/user/simulation/patient-simulation";
import patientData from "@/lib/patient-data-user";

// Define the CaseComponent interface to match what's expected in PatientSimulationTemplate
interface CaseComponent {
    id: number;
    question: string;
    answer: string;
    scenarios: string[];
    formType: "search" | "select" | "info" | "registration";
}

// Define a union type for all possible case types
type Case = {
    id: number;
    jenisKunjungan: string;
    judulKasus: string;
    deskripsiKasus: string;
    metodePembayaran: string;
    caseComponent: CaseComponent[];
} & (
    | {
          jenisPasien: string;
          diagnosis: string;
          keluhan?: never;
          perujuk?: never;
      }
    | {
          perujuk: string;
          diagnosis: string;
          jenisPasien?: never;
          keluhan?: never;
      }
    | {
          jenisPasien: string;
          keluhan: string;
          diagnosis?: never;
          perujuk?: never;
      }
);

// Define the registration data interface
interface RegistrationData {
    id: string;
    waktuAdmisi: string;
    nama: string;
    noHP: string;
    alamat: string;
    admisiKe: string;
    jenisAsuransi: string;
}

export default function SimulationDetailCase() {
    const params = useParams();
    const router = useRouter();
    const [selectedCase, setSelectedCase] = useState<Case | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Only run this on the client side
        if (params) {
            const caseType = params.caseType as string;
            const caseId = params.caseId as string;

            // Find the case based on caseType and caseId with proper type checking
            const findCase = (): Case | null => {
                if (!caseType || !caseId) return null;

                const caseIdNum = Number.parseInt(caseId);

                if (caseType in patientData) {
                    const cases = patientData[caseType as keyof typeof patientData];
                    const foundCase = cases.find((c) => c.id === caseIdNum);

                    if (foundCase) {
                        // Ensure formType is one of the allowed values
                        const typedCase = {
                            ...foundCase,
                            caseComponent: foundCase.caseComponent.map((comp) => ({
                                ...comp,
                                // Cast formType to the correct union type
                                formType: comp.formType as "search" | "select" | "info" | "registration" | "admission",
                            })),
                        } as Case;

                        return typedCase;
                    }
                }
                return null;
            };

            const caseData = findCase();
            setSelectedCase(caseData);
            setLoading(false);

            // If case not found, redirect to home
            if (!caseData) {
                router.push("/");
            }
        }
    }, [params, router]);

    // Define the registration data
    const registrationData: RegistrationData[] = [
        {
            id: "1",
            waktuAdmisi: "20 Feb 2023 07:31",
            nama: "BAGAS KIKI, SDR I.I. | 09/09/13 | 13-05-2007",
            noHP: "087234567876",
            alamat: "NGADISURYAN KP 2 RT 6 RW 10, KRATON, YOGYAKARTA, DIY",
            admisiKe: "Poliklinik Saraf",
            jenisAsuransi: "BPJS",
        },
        {
            id: "2",
            waktuAdmisi: "20 Feb 2023 07:31",
            nama: "BAGAS ADI MARUF, SDR I.I. | 09/09/13 | 13-05-2007",
            noHP: "089876789876",
            alamat: "SENDOWO, SINDUADI, CATURTUNGGAL, DEPOK, SLEMAN, DIY",
            admisiKe: "Poliklinik Mata",
            jenisAsuransi: "BPJS",
        },
        {
            id: "3",
            waktuAdmisi: "20 Feb 2023 07:32",
            nama: "HANA FIKRI, RP I.I. | 09/09/13 | 13-05-2007",
            noHP: "081345643345",
            alamat: "POGUNG LOR RT 3 RW 7, CATURTUNGGAL, DEPOK, SLEMAN, DIY",
            admisiKe: "Poliklinik Jantung",
            jenisAsuransi: "BPJS",
        },
        {
            id: "4",
            waktuAdmisi: "20 Feb 2023 07:32",
            nama: "INSANIYAH MAHARANI, NN I.I. | 09/09/13 | 13-05-2007",
            noHP: "087675456782",
            alamat: "POGUNG KIDUL RT 2 RW 5, CATURTUNGGAL, DEPOK, SLEMAN, DIY",
            admisiKe: "Poliklinik Dalam",
            jenisAsuransi: "BPJS",
        },
    ];

    if (loading) {
        return <div className="container mx-auto py-8 px-4">Loading...</div>;
    }

    if (!selectedCase) {
        return <div className="container mx-auto py-8 px-4">Case not found</div>;
    }

    return <PatientSimulationTemplate selectedCase={selectedCase} registrationData={registrationData} />;
}
