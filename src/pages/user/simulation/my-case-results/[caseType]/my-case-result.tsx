"use client";

import {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {ArrowLeft} from "lucide-react";
import {Button} from "@/components/atoms/button";
import {PatientInfoTable} from "@/components/molecules/patient-info-table";
import {PatientSearchForm} from "@/components/molecules/form-component/patient-search-form";
import {PatientList} from "@/components/molecules/patient-list";
import {ReadOnlyRegistrationForm} from "@/components/molecules/form-component/read-only-registration-form";
import {ReadOnlyOutpatientAdmissionForm} from "@/components/molecules/form-component/read-only-outpatient-patient-form";
import {ReadOnlyInpatientAdmissionForm} from "@/components/molecules/form-component/read-only-inpatient-patient-form";
import {ReadOnlyEmergencyAdmissionForm} from "@/components/molecules/form-component/read-only-emergency-patient-form";
import {RegistrationEvaluationBox} from "@/components/atoms/regitration-evaluation-box";
import {CaseCompletionTime} from "@/components/atoms/case-completion-time";
import {PerformanceIndicator} from "@/components/atoms/performance-indikator";
import patientData from "@/lib/patient-data-user";
import type {DateRange} from "react-day-picker";
import Link from "next/link";

// Define the CaseComponent interface
interface CaseComponent {
    id: number;
    question: string;
    answer: string;
    answerImage?: string;
    answerImages?: string[];
    scenarios: string[];
    formType: "search" | "pendaftaran" | "admission-rawat-jalan" | "admission-rawat-inap" | "admission-gawat-darurat";
}

// Define a union type for all possible case types
type Case = {
    id: number;
    jenisKunjungan: string;
    judulKasus: string;
    deskripsiKasus: string;
    metodePembayaran: string;
    caseComponent: CaseComponent[];
    // caseType?: string;
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

export default function MyCaseResults() {
    const params = useParams();
    const router = useRouter();
    const [selectedCase, setSelectedCase] = useState<Case | null>(null);
    const [loading, setLoading] = useState(true);
    const [, setSearchQuery] = useState("");
    const [, setDateRange] = useState<DateRange | undefined>(undefined);
    const [admissionType, setAdmissionType] = useState<string>("outpatient"); // Default to outpatient

    // For case completion time
    const [completionTime, setCompletionTime] = useState("00:00");
    const [, setCompletionSeconds] = useState(0);
    const idealTime = "10:00";
    const idealSeconds = 600; // 10 minutes in seconds
    const [isUnderIdealTime, setIsUnderIdealTime] = useState(false);

    // Performance indicators
    const communicationIndicators = [{name: "Pronunciation", value: 75}];

    // Sample registration data
    const registrationData = [
        {
            id: "1",
            waktuAdmisi: "20 Feb 2023 07:31",
            nama: "BAGAS KIKI, SDR I.I. | 09/09/13 | 13-05-2007",
            noHP: "087234567876",
            alamat: "NGADISURYAN KP 2 RT 6 RW 10, KRATON, YOGYAKARTA, DIY",
            admisiKe: "Poliklinik Saraf",
            jenisAsuransi: "BPJS",
        },
    ];

    useEffect(() => {
        if (params) {
            const caseType = params.caseType as string;
            const caseId = params.caseId as string;

            const findCase = () => {
                if (!caseType || !caseId) return null;

                const caseIdNum = Number.parseInt(caseId);

                if (caseType in patientData) {
                    const cases = patientData[caseType as keyof typeof patientData];
                    // Type assertion to Case since we know the structure matches
                    return (cases.find((c: {id: number}) => c.id === caseIdNum) as Case) || null;
                }
                return null;
            };

            const caseData = findCase();
            setSelectedCase(caseData);

            // Determine admission type based on case data
            if (caseData) {
                // Look for admission form types in the case components
                const admissionComponent = caseData.caseComponent.find((comp) =>
                    comp.formType.startsWith("admission-rawat-jalan")
                );

                if (admissionComponent) {
                    if (admissionComponent.formType === "admission-rawat-inap") {
                        setAdmissionType("inpatient");
                    } else if (admissionComponent.formType === "admission-gawat-darurat") {
                        setAdmissionType("emergency");
                    } else {
                        setAdmissionType("outpatient");
                    }
                } else {
                    setAdmissionType("outpatient"); // Default if no admission component found
                }

                // Retrieve the saved completion time from localStorage
                if (typeof window !== "undefined") {
                    const savedTime = localStorage.getItem(`caseTime_${caseType}_${caseId}`) || "00:00";
                    const savedSeconds = Number.parseInt(
                        localStorage.getItem(`caseTimeSeconds_${caseType}_${caseId}`) || "0"
                    );

                    setCompletionTime(savedTime);
                    setCompletionSeconds(savedSeconds);

                    // Determine if the completion time is under the ideal time
                    setIsUnderIdealTime(savedSeconds < idealSeconds);
                }
            }

            setLoading(false);

            if (!caseData) {
                router.push("/");
            }
        }
    }, [params, router, idealSeconds]);

    const handleSearch = (query: string, birthDateRange: DateRange | undefined) => {
        setSearchQuery(query);
        setDateRange(birthDateRange);
    };

    const handleRegisterNew = () => {
        // Handle new patient registration
        console.log("Register new patient");
    };

    // Function to render the appropriate admission form based on type
    const renderAdmissionForm = () => {
        switch (admissionType) {
            case "inpatient":
                return (
                    <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm">
                        <div className="p-3 sm:p-4 md:p-5">
                            <ReadOnlyInpatientAdmissionForm />
                        </div>
                    </div>
                );
            case "emergency":
                return (
                    <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm">
                        <div className="p-3 sm:p-4 md:p-5">
                            <ReadOnlyEmergencyAdmissionForm />
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm">
                        <div className="p-3 sm:p-4 md:p-5">
                            <ReadOnlyOutpatientAdmissionForm />
                        </div>
                    </div>
                );
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center">Loading...</div>
            </div>
        );
    }

    if (!selectedCase) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center">Case not found</div>
            </div>
        );
    }

    return (
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto mt-6 mb-12">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-blue-800">Kasus {selectedCase.id}</h1>
                <Link href="/user/simulation/case-list">
                    <Button variant="outline" className="border-blue-800 text-blue-800 hover:bg-blue-50">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
                    </Button>
                </Link>
            </div>

            <div className="bg-gradient-to-br from-blue-500 via-blue-300 to-white rounded-lg p-4 sm:p-6 mb-8 shadow-lg">
                <div className="mb-4 sm:mb-6">
                    <PatientInfoTable patientInfo={selectedCase} />
                </div>
            </div>

            <div className="space-y-8">
                {/* Search Form Section */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-6">
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Jawabanmu</h2>
                        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-md shadow-sm">
                            <h3 className="font-bold text-yellow-800 mb-2">Evaluasi Pencarian</h3>
                            <p className="text-yellow-700">
                                Kamu telah berhasil melakukan pencarian pasien dengan benar menggunakan kriteria yang
                                tepat.
                            </p>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm">
                        <div className="p-3 sm:p-4 md:p-5">
                            <div className="space-y-4">
                                <div className="mb-4">
                                    <h2 className="text-xl font-bold">PENDAFTARAN</h2>
                                    <p className="text-sm text-gray-500">Manajemen Data Pasien</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Menu Utama &gt;&gt; Pendaftaran &gt;&gt; Pendaftaran Pasien
                                    </p>
                                </div>

                                <PatientSearchForm onSearch={handleSearch} onRegisterNew={handleRegisterNew} />

                                <div className="mt-4">
                                    <PatientList patients={registrationData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Registration Form Section */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-6">
                    <div>
                        <RegistrationEvaluationBox />
                    </div>

                    <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm">
                        <div className="p-3 sm:p-4 md:p-5">
                            <ReadOnlyRegistrationForm />
                        </div>
                    </div>
                </div>

                {/* Admission Form Section */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-6">
                    <div>
                        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-md shadow-sm">
                            <h3 className="font-bold text-yellow-800 mb-2">Evaluasi Pengisian Admisi</h3>
                            <p className="text-yellow-700">
                                Selamat kamu sudah melakukan pengisian dengan lengkap pada form admisi{" "}
                                {admissionType === "inpatient"
                                    ? "rawat inap"
                                    : admissionType === "emergency"
                                    ? "gawat darurat"
                                    : "rawat jalan"}{" "}
                                dengan benar.
                            </p>
                        </div>
                    </div>

                    {renderAdmissionForm()}
                </div>

                {/* Case Completion Time Section */}
                <div className="mt-10">
                    <CaseCompletionTime
                        actualDuration={completionTime}
                        idealDuration={idealTime}
                        isUnderIdealTime={isUnderIdealTime}
                    />
                </div>

                {/* Performance Indicator Section */}
                <div className="mt-8">
                    <PerformanceIndicator title="Komunikasi" indicators={communicationIndicators} />
                </div>
            </div>
        </div>
    );
}
