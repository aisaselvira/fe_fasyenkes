"use client";

import {useState, useEffect} from "react";
import {AlertCircle, ArrowLeft} from "lucide-react";
import {PatientSearchForm} from "@/components/molecules/form-component/patient-search-form";
import {PatientList} from "../molecules/patient-list";
import {PatientRegistrationForm} from "@/components/molecules/form-component/patient-registration-form";
import {Button} from "@/components/atoms/button";
import type {RegistrationData} from "@/components/template/user/simulation/patient-simulation";
import type {DateRange} from "react-day-picker";
// Import all admission forms
import {OutpatientAdmissionForm} from "@/components/molecules/form-component/outpatient-admission-form";
import {InpatientAdmissionForm} from "@/components/molecules/form-component/inpatient-admission-form";
import {EmergencyAdmissionForm} from "@/components/molecules/form-component/emergency-admission-form";

interface RegistrationSectionProps {
    patients: RegistrationData[];
    isSimulationActive: boolean;
    formType:
        | "search"
        | "select"
        | "info"
        | "registration"
        | "admission"
        | "admission-rawat-inap"
        | "admission-gawat-darurat";
}

export function RegistrationSection({patients, isSimulationActive, formType}: RegistrationSectionProps) {
    const [filteredPatients, setFilteredPatients] = useState(patients);
    // Set the active form based on the formType prop directly
    // This ensures the form changes when the formType changes
    const [activeForm, setActiveForm] = useState<
        "search" | "registration" | "admission" | "admission-rawat-inap" | "admission-gawat-darurat"
    >(
        formType === "registration"
            ? "registration"
            : formType === "admission"
            ? "admission"
            : formType === "admission-rawat-inap"
            ? "admission-rawat-inap"
            : formType === "admission-gawat-darurat"
            ? "admission-gawat-darurat"
            : "search"
    );

    // Update activeForm when formType prop changes
    useEffect(() => {
        if (formType === "registration") {
            setActiveForm("registration");
        } else if (formType === "admission") {
            setActiveForm("admission");
        } else if (formType === "admission-rawat-inap") {
            setActiveForm("admission-rawat-inap");
        } else if (formType === "admission-gawat-darurat") {
            setActiveForm("admission-gawat-darurat");
        } else if (formType === "search") {
            setActiveForm("search");
        }
        // For debugging
        console.log("formType changed to:", formType);
        console.log(
            "activeForm set to:",
            formType === "registration"
                ? "registration"
                : formType === "admission"
                ? "admission"
                : formType === "admission-rawat-inap"
                ? "admission-rawat-inap"
                : formType === "admission-gawat-darurat"
                ? "admission-gawat-darurat"
                : "search"
        );
    }, [formType]);

    const handleSearch = (query: string, birthDateRange: DateRange | undefined) => {
        if (!query && !birthDateRange) {
            setFilteredPatients(patients);
            return;
        }

        const filtered = patients.filter((patient) => {
            // Check if the query matches
            const matchesQuery =
                !query ||
                patient.nama.toLowerCase().includes(query.toLowerCase()) ||
                patient.noHP.includes(query) ||
                patient.alamat.toLowerCase().includes(query.toLowerCase());

            // Check if date range matches
            let matchesDateRange = true;
            if (birthDateRange && birthDateRange.from) {
                try {
                    // First try to match with Waktu Admisi (format: "DD MMM YYYY HH:MM")
                    const admisiDateParts = patient.waktuAdmisi.split(" ");
                    if (admisiDateParts.length >= 3) {
                        const day = Number.parseInt(admisiDateParts[0], 10);
                        // Convert month name to month number (0-11)
                        const monthMap: {[key: string]: number} = {
                            Jan: 0,
                            Feb: 1,
                            Mar: 2,
                            Apr: 3,
                            May: 4,
                            Jun: 5,
                            Jul: 6,
                            Aug: 7,
                            Sep: 8,
                            Oct: 9,
                            Nov: 10,
                            Dec: 11,
                        };
                        const month = monthMap[admisiDateParts[1]] || 0;
                        const year = Number.parseInt(admisiDateParts[2], 10);

                        const admisiDate = new Date(year, month, day);

                        if (birthDateRange.to) {
                            // Check if date is within range
                            matchesDateRange = admisiDate >= birthDateRange.from && admisiDate <= birthDateRange.to;
                        } else {
                            // Check if date matches single selected date
                            const selectedDay = birthDateRange.from.getDate();
                            const selectedMonth = birthDateRange.from.getMonth();
                            const selectedYear = birthDateRange.from.getFullYear();

                            matchesDateRange =
                                admisiDate.getDate() === selectedDay &&
                                admisiDate.getMonth() === selectedMonth &&
                                admisiDate.getFullYear() === selectedYear;
                        }

                        // If we already found a match, no need to check birth date
                        if (matchesDateRange) {
                            return matchesQuery && matchesDateRange;
                        }
                    }

                    // If no match with Waktu Admisi, try with birth date from nama
                    const parts = patient.nama.split("|");
                    if (parts.length >= 3) {
                        const dateStr = parts[2].trim();
                        // Convert DD-MM-YYYY to Date object
                        const [day, month, year] = dateStr.split("-").map((part: string) => Number.parseInt(part, 10));
                        const birthDate = new Date(year, month - 1, day); // month is 0-indexed in JS Date

                        if (birthDateRange.to) {
                            // Check if date is within range
                            matchesDateRange = birthDate >= birthDateRange.from && birthDate <= birthDateRange.to;
                        } else {
                            // Check if date matches single selected date
                            const selectedDay = birthDateRange.from.getDate();
                            const selectedMonth = birthDateRange.from.getMonth();
                            const selectedYear = birthDateRange.from.getFullYear();

                            matchesDateRange =
                                birthDate.getDate() === selectedDay &&
                                birthDate.getMonth() === selectedMonth &&
                                birthDate.getFullYear() === selectedYear;
                        }
                    }
                } catch {
                    // If date parsing fails, don't filter by date
                    matchesDateRange = true;
                }
            }

            return matchesQuery && matchesDateRange;
        });

        setFilteredPatients(filtered);
    };

    const handleRegisterNew = () => {
        setActiveForm("registration");
    };

    const handleBackToSearch = () => {
        setActiveForm("search");
    };

    return (
        <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm h-full">
            <div className="p-2 sm:p-4">
                {isSimulationActive ? (
                    <div className="space-y-4">
                        {activeForm === "search" ? (
                            <>
                                <div className="mb-4">
                                    <h2 className="text-xl font-bold">PENDAFTARAN</h2>
                                    <p className="text-sm text-gray-500">Manajemen Data Pasien</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Menu Utama &gt;&gt; Pendaftaran &gt;&gt; Pendaftaran Pasien
                                    </p>
                                </div>
                                <PatientSearchForm onSearch={handleSearch} onRegisterNew={handleRegisterNew} />
                                <PatientList patients={filteredPatients} />
                            </>
                        ) : activeForm === "registration" ? (
                            <>
                                <div className="mb-4">
                                    <h2 className="text-xl font-bold">PENDAFTARAN</h2>
                                    <p className="text-sm text-gray-500">Manajemen Data Pasien</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Menu Utama &gt;&gt; Pendaftaran &gt;&gt; Pendaftaran Pasien
                                    </p>
                                </div>
                                <div className="mb-4">
                                    <Button
                                        variant="outline"
                                        className="border-blue-800 text-blue-800 hover:bg-blue-50"
                                        onClick={handleBackToSearch}
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Pencarian
                                    </Button>
                                </div>
                                <PatientRegistrationForm />
                            </>
                        ) : activeForm === "admission" ? (
                            <>
                                <div className="mb-4">
                                    <h2 className="text-xl font-bold">ADMISI RAWAT JALAN</h2>
                                    <p className="text-sm text-gray-500">Manajemen Data Pasien</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Menu Utama &gt;&gt; Pendaftaran &gt;&gt; Pendaftaran Pasien &gt;&gt; Admisi
                                    </p>
                                </div>
                                <OutpatientAdmissionForm />
                            </>
                        ) : activeForm === "admission-rawat-inap" ? (
                            <>
                                <div className="mb-4">
                                    <h2 className="text-xl font-bold">ADMISI RAWAT INAP</h2>
                                    <p className="text-sm text-gray-500">Manajemen Data Pasien</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Menu Utama &gt;&gt; Pendaftaran &gt;&gt; Pendaftaran Pasien &gt;&gt; Admisi
                                        Rawat Inap
                                    </p>
                                </div>
                                <InpatientAdmissionForm />
                            </>
                        ) : activeForm === "admission-gawat-darurat" ? (
                            <>
                                <div className="mb-4">
                                    <h2 className="text-xl font-bold">ADMISI GAWAT DARURAT</h2>
                                    <p className="text-sm text-gray-500">Manajemen Data Pasien</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Menu Utama &gt;&gt; Pendaftaran &gt;&gt; Pendaftaran Pasien &gt;&gt; Admisi
                                        Gawat Darurat
                                    </p>
                                </div>
                                <EmergencyAdmissionForm />
                            </>
                        ) : null}
                    </div>
                ) : (
                    <>
                        <div className="mb-4">
                            <h2 className="text-xl font-bold">SISTEM INFORMASI PENDAFTARAN</h2>
                            <p className="text-sm text-gray-500">Manajemen Data Pasien</p>
                            <p className="text-sm text-gray-500 mt-1">
                                Menu Utama &gt;&gt; Pendaftaran &gt;&gt; Pendaftaran Pasien
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-2">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                                    <AlertCircle className="w-4 h-4 text-white" />
                                </div>
                                <p className="text-red-500 text-sm">
                                    Bagian sistem informasi Pendaftaran untuk mendaftarkan pasien
                                </p>
                            </div>

                            <div className="flex items-start gap-2 mt-8">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="text-white"
                                    >
                                        <path
                                            d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-blue-600 text-sm font-medium">
                                        Klik tombol Selanjutnya pada skenario untuk melakukan wawancara dengan pasien
                                        dan mengetahui jawabannya
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
