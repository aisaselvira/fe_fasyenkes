"use client";

import type {TPPRJCase} from "@/components/template/simulation/patient-management";
import {Button} from "@/components/atoms/button";
import {Card} from "@/components/atoms/card";
import {CaseBadge} from "@/components/atoms/case-badge";
import {CaseCheckbox} from "@/components/atoms/case-checkbox";
import {PatientDetailRow} from "@/components/molecules/patient-detail-row";
import {PaginationControl} from "@/components/molecules/pagination-control";
import {useState, useEffect} from "react";
interface TPPRJCaseListProps {
    cases: TPPRJCase[];
    searchQuery?: string;
}

export function TPPRJCaseList({cases, searchQuery = ""}: TPPRJCaseListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredCases, setFilteredCases] = useState<TPPRJCase[]>(cases);
    const casesPerPage = 10;

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
                    patientCase.diagnosis.toLowerCase().includes(lowercasedQuery) ||
                    patientCase.kasus.toLowerCase().includes(lowercasedQuery) ||
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
                                            <PatientDetailRow label="Diagnosis" value={patientCase.diagnosis} />
                                            <PatientDetailRow label="Kasus" value={patientCase.kasus} />
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
                                    <Button className="bg-blue-800 hover:bg-blue-900 sm:mt-auto text-white">
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
