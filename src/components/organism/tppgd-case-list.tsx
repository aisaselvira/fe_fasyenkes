"use client";

import {useState, useEffect} from "react";
import {Button} from "@/components/atoms/button";
import {Card} from "@/components/atoms/card";
import {CaseBadge} from "@/components/atoms/case-badge";
import {CaseCheckbox} from "@/components/atoms/case-checkbox";
import {PatientDetailRow} from "@/components/molecules/patient-detail-row";
import {PaginationControl} from "@/components/molecules/pagination-control";
import simulationService from "@/services/simulation/index";
import {mapToTPPGDCase} from "@/services/simulation/index";
import {Loader2} from "lucide-react";
import type {TPPGDCase} from "@/services/simulation/types";
import {isAuthenticated, redirectToLogin} from "@/lib/utils";
import {useRouter} from "next/navigation";
import {ErrorState} from "@/components/atoms/error-state";

export interface CaseComponent {
    id: number;
    question: string;
    answer: string;
    scenarios: string[];
    formType: "pendaftaran" | "admission-rawat-jalan" | "admission-rawat-inap" | "admission-gawat-darurat";
}

interface TPPGDCaseListProps {
    searchQuery?: string;
}

export function TPPGDCaseList({searchQuery = ""}: TPPGDCaseListProps) {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredCases, setFilteredCases] = useState<TPPGDCase[]>([]);
    const [cases, setCases] = useState<TPPGDCase[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const casesPerPage = 10;

    // Handle start button click with authentication check
    const handleStartClick = (caseId: number) => {
        if (isAuthenticated()) {
            router.push(`/user/simulation/simulation-detail-case/tppgd/${caseId}`);
        } else {
            redirectToLogin();
        }
    };

    // Fetch cases from API
    const fetchCases = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await simulationService.tppgd.getAll();

            if (response.error) {
                setError(response.error);
            } else if (response.data) {
                // Map API data to component format
                const mappedCases = response.data.data.map((record) => mapToTPPGDCase(record));
                setCases(mappedCases);
            }
        } catch (err) {
            setError("Failed to fetch cases");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch cases on component mount
    useEffect(() => {
        fetchCases();
    }, []);

    // Filter cases based on search query
    useEffect(() => {
        if (!searchQuery) {
            setFilteredCases(cases);
        } else {
            const lowercasedQuery = searchQuery.toLowerCase();
            const filtered = cases.filter(
                (patientCase) =>
                    patientCase.jenisPasien.toLowerCase().includes(lowercasedQuery) ||
                    patientCase.jenisKunjungan.toLowerCase().includes(lowercasedQuery) ||
                    patientCase.keluhan.toLowerCase().includes(lowercasedQuery) ||
                    patientCase.judulKasus.toLowerCase().includes(lowercasedQuery) ||
                    patientCase.deskripsiKasus.toLowerCase().includes(lowercasedQuery) ||
                    patientCase.metodePembayaran.toLowerCase().includes(lowercasedQuery)
            );
            setFilteredCases(filtered);
        }
        // Reset to first page when search changes
        setCurrentPage(1);
    }, [cases, searchQuery]);

    // Calculate total pages
    const totalPages = Math.max(1, Math.ceil(filteredCases.length / casesPerPage));

    // Get current cases
    const indexOfLastCase = currentPage * casesPerPage;
    const indexOfFirstCase = indexOfLastCase - casesPerPage;
    const currentCases = filteredCases.slice(indexOfFirstCase, indexOfLastCase);

    // Change page
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        );
    }

    if (error) {
        return <ErrorState message="Halaman tidak dapat dimuat" onRetry={fetchCases} />;
    }

    return (
        <div className="px-2 sm:px-4">
            <div className="space-y-6">
                {currentCases.length > 0 ? (
                    currentCases.map((patientCase) => (
                        <Card key={patientCase.id} className="overflow-hidden">
                            <div className="flex flex-col sm:flex-row">
                                {/* Case label - Top on mobile, Left on desktop */}
                                <div className="bg-blue-100 p-4 flex items-center justify-center sm:min-w-32 sm:h-auto">
                                    <CaseBadge number={patientCase.id} />
                                </div>

                                {/* Middle - Patient details table */}
                                <div className="flex-1 px-2 sm:px-0">
                                    <table className="w-full border-collapse">
                                        <tbody>
                                            <PatientDetailRow label="Jenis Pasien" value={patientCase.jenisPasien} />
                                            <PatientDetailRow
                                                label="Jenis Kunjungan"
                                                value={patientCase.jenisKunjungan}
                                            />
                                            <PatientDetailRow label="Keluhan" value={patientCase.keluhan} />
                                            <PatientDetailRow label="Judul Kasus" value={patientCase.judulKasus} />
                                            <PatientDetailRow
                                                label="Deskripsi Kasus"
                                                value={
                                                    patientCase.deskripsiKasus.split(" ").slice(0, 50).join(" ") +
                                                    (patientCase.deskripsiKasus.split(" ").length > 50 ? "..." : "")
                                                }
                                            />
                                            <PatientDetailRow
                                                label="Metode Pembayaran"
                                                value={patientCase.metodePembayaran}
                                            />
                                        </tbody>
                                    </table>
                                </div>

                                {/* Right side - Checkbox and button */}
                                <div className="flex flex-row sm:flex-col justify-between p-4 items-center gap-4 sm:gap-0">
                                    <CaseCheckbox />
                                    <Button
                                        className="bg-blue-800 hover:bg-blue-900 sm:mt-auto text-white"
                                        onClick={() => handleStartClick(patientCase.id)}
                                    >
                                        Mulai
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className="text-center py-8 px-4 text-gray-500">Tidak ada kasus yang ditemukan</div>
                )}
            </div>

            {totalPages > 1 && (
                <PaginationControl currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
        </div>
    );
}
