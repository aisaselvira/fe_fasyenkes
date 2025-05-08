import {PatientInfoRow} from "../atoms/patient-info-row";

export interface PatientInfo {
    jenisPasien?: string;
    jenisKunjungan: string;
    diagnosis?: string;
    keluhan?: string;
    judulKasus: string;
    deskripsiKasus: string;
    metodePembayaran: string;
    perujuk?: string;
    caseType?: "tpprj" | "tppri" | "tppgd";
}

interface PatientInfoTableProps {
    patientInfo: PatientInfo;
}

export function PatientInfoTable({patientInfo}: PatientInfoTableProps) {
    // Determine case type based on properties or explicit caseType
    const caseType = patientInfo.caseType || (patientInfo.perujuk ? "tppri" : patientInfo.keluhan ? "tppgd" : "tpprj");

    return (
        <div className="w-full border-t border-gray-300 rounded-md overflow-hidden shadow-lg bg-white/80 backdrop-blur-md p-4">
            <h2 className="text-lg font-semibold border-b pb-2 mb-4 bg-orange-500 text-white p-2 rounded-md">
                {patientInfo.judulKasus}
            </h2>

            {/* Common fields for all case types */}
            <PatientInfoRow label="Jenis Kunjungan" value={patientInfo.jenisKunjungan} />
            <PatientInfoRow label="Metode Pembayaran" value={patientInfo.metodePembayaran} />

            {/* Fields specific to TPPRJ and TPPGD */}
            {(caseType === "tpprj" || caseType === "tppgd") && patientInfo.jenisPasien && (
                <PatientInfoRow label="Jenis Pasien" value={patientInfo.jenisPasien} />
            )}

            {/* Fields specific to TPPRJ and TPPRI */}
            {(caseType === "tpprj" || caseType === "tppri") && patientInfo.diagnosis && (
                <PatientInfoRow label="Diagnosis" value={patientInfo.diagnosis} />
            )}

            {/* Field specific to TPPRI */}
            {caseType === "tppri" && patientInfo.perujuk && (
                <PatientInfoRow label="Perujuk" value={patientInfo.perujuk} />
            )}

            {/* Field specific to TPPGD */}
            {caseType === "tppgd" && patientInfo.keluhan && (
                <PatientInfoRow label="Keluhan" value={patientInfo.keluhan} />
            )}

            {/* Description field for all case types */}
            <PatientInfoRow label="Deskripsi Kasus" value={patientInfo.deskripsiKasus} />
        </div>
    );
}
