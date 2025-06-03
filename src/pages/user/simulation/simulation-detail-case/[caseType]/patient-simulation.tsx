"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {PatientSimulationTemplate} from "@/components/template/user/simulation/patient-simulation";
import simulationService from "@/services/simulation/index";
import {mapScenarioToCaseComponent} from "@/services/simulation/index";
import {Loader2} from "lucide-react";
import {isAuthenticated, redirectToLogin} from "@/lib/utils";
import type {Scenario} from "@/services/simulation/types";

// Define the CaseComponent interface to match what's expected in PatientSimulationTemplate
interface CaseComponent {
    id: number;
    question: string;
    answer: string;
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
    const router = useRouter();
    const {caseType, caseId} = router.query;
    const [selectedCase, setSelectedCase] = useState<Case | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [scenarios, setScenarios] = useState<Scenario[]>([]);

    useEffect(() => {
        // Check if user is authenticated
        if (!isAuthenticated()) {
            redirectToLogin();
            return;
        }

        // Wait for router to be ready and params to be available
        if (!router.isReady || !caseType || !caseId) {
            return;
        }

        const fetchSimulationDetail = async () => {
            setLoading(true);
            setError(null);

            try {
                let response;
                let scenarioResponse;

                switch (caseType) {
                    case "tpprj":
                        response = await simulationService.tpprj.getById(Number(caseId));
                        if (response.data) {
                            scenarioResponse = await simulationService.tpprj.getAllScenarios(response.data.data.id);
                        }
                        break;
                    case "tppri":
                        response = await simulationService.tppri.getById(Number(caseId));
                        if (response.data) {
                            scenarioResponse = await simulationService.tppri.getAllScenarios(response.data.data.id);
                        }
                        break;
                    case "tppgd":
                        response = await simulationService.tppgd.getById(Number(caseId));
                        if (response.data) {
                            scenarioResponse = await simulationService.tppgd.getAllScenarios(response.data.data.id);
                        }
                        break;
                    default:
                        throw new Error("Invalid case type");
                }

                if (response.error) {
                    setError(response.error);
                } else if (response.data) {
                    // Handle scenarios
                    if (scenarioResponse?.error) {
                        console.error("Error fetching scenarios:", scenarioResponse.error);
                    } else if (scenarioResponse?.data?.data && Array.isArray(scenarioResponse.data.data)) {
                        console.log("Scenarios fetched:", scenarioResponse.data.data);
                        const sortedScenarios = scenarioResponse.data.data.sort((a, b) => a.order - b.order);
                        setScenarios(sortedScenarios);
                    } else {
                        console.warn("Scenarios data is not available or not an array", scenarioResponse);
                    }

                    // Map API data to component format
                    const simulation = response.data.data;

                    // Create a case object based on the case type
                    let caseData: Case;

                    if (caseType === "tpprj") {
                        caseData = {
                            id: simulation.id,
                            jenisPasien: simulation.patient_type === "pasien_baru" ? "Pasien Baru" : "Pasien Lama",
                            jenisKunjungan: "Rawat Jalan",
                            diagnosis: simulation.diagnose,
                            judulKasus: simulation.case_type,
                            deskripsiKasus: simulation.case_description,
                            metodePembayaran: simulation.payment_method.toUpperCase(),
                            caseComponent: [], // Will be populated with scenarios
                        } as Case;
                    } else if (caseType === "tppri") {
                        caseData = {
                            id: simulation.id,
                            perujuk: simulation.perujuk || "Tidak ada",
                            jenisKunjungan: "Rawat Inap",
                            diagnosis: simulation.diagnose,
                            judulKasus: simulation.case_type,
                            deskripsiKasus: simulation.case_description,
                            metodePembayaran: simulation.payment_method.toUpperCase(),
                            caseComponent: [], // Will be populated with scenarios
                        } as Case;
                    } else {
                        caseData = {
                            id: simulation.id,
                            jenisPasien: simulation.patient_type === "pasien_baru" ? "Pasien Baru" : "Pasien Lama",
                            jenisKunjungan: "Gawat Darurat",
                            keluhan: simulation.diagnose, // Using diagnose as keluhan
                            judulKasus: simulation.case_type,
                            deskripsiKasus: simulation.case_description,
                            metodePembayaran: simulation.payment_method.toUpperCase(),
                            caseComponent: [], // Will be populated with scenarios
                        } as Case;
                    }

                    setSelectedCase(caseData);
                }
            } catch (err) {
                setError("Failed to fetch simulation details");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSimulationDetail();
    }, [router.isReady, caseType, caseId]);

    // Map scenarios to case components when scenarios or selectedCase changes
    useEffect(() => {
        if (selectedCase && scenarios.length > 0 && caseType) {
            console.log("Mapping scenarios to case components:", scenarios);
            const caseComponents = scenarios.map((scenario) =>
                mapScenarioToCaseComponent(scenario, caseType as string)
            );
            console.log("Mapped case components:", caseComponents);

            setSelectedCase((prevCase) => {
                if (!prevCase) return null;
                return {
                    ...prevCase,
                    caseComponent: caseComponents,
                };
            });
        }
    }, [selectedCase, scenarios, caseType]);

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
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto py-8 px-4 text-center">
                <div className="text-red-500 text-xl">{error}</div>
                <p className="mt-4">Please try again later or contact support.</p>
            </div>
        );
    }

    if (!selectedCase) {
        return (
            <div className="container mx-auto py-8 px-4 text-center">
                <div className="text-gray-500 text-xl">Case not found</div>
            </div>
        );
    }

    return <PatientSimulationTemplate selectedCase={selectedCase} registrationData={registrationData} />;
}
