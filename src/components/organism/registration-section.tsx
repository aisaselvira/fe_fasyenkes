import {AlertCircle} from "lucide-react";
import {PatientSearchForm} from "../molecules/patient-search-form";
import {PatientList} from "../molecules/patient-list";
import {PatientRegistrationForm} from "../molecules/patient-registration-form";

interface RegistrationSectionProps {
    patients: {
        id: string;
        waktuAdmisi: string;
        nama: string;
        noHP: string;
        alamat: string;
        admisiKe: string;
        jenisAsuransi: string;
    }[];
    isSimulationActive: boolean;
    formType: "search" | "registration";
}

export function RegistrationSection({patients, isSimulationActive, formType}: RegistrationSectionProps) {
    return (
        <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm">
            <div className="p-4">
                {isSimulationActive ? (
                    <>
                        <div className="mb-4">
                            <h2 className="text-xl font-bold">
                                {formType === "search" ? "PENDAFTARAN" : "PENDAFTARAN"}
                            </h2>
                            <p className="text-sm text-gray-500">Manajemen Data Pasien</p>
                            <p className="text-sm text-gray-500 mt-1">
                                Menu Utama &gt;&gt; Pendaftaran &gt;&gt; Pendaftaran Pasien
                            </p>
                        </div>

                        <div className="space-y-4">
                            {formType === "search" ? (
                                <>
                                    <PatientSearchForm />
                                    <PatientList patients={patients} />
                                </>
                            ) : (
                                <PatientRegistrationForm />
                            )}
                        </div>
                    </>
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
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                                    <AlertCircle className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-red-500 text-sm">
                                        simbol{" "}
                                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-xs">
                                            i
                                        </span>{" "}
                                        sebagai petunjuk untuk melakukan wawancara dengan pasien untuk mengetahui
                                        jawabannya dengan klik tombol selanjutnya pada skenario
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
