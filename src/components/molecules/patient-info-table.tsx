import {PatientInfoRow} from "../atoms/patient-info-row";

export interface PatientInfo {
    jenisPasien: string;
    jenisKunjungan: string;
    diagnosis: string;
    judulKasus: string;
    deskripsiKasus: string;
    metodePembayaran: string;
}

interface PatientInfoTableProps {
    patientInfo: PatientInfo;
}

export function PatientInfoTable({patientInfo}: PatientInfoTableProps) {
    return (
        <div className="w-full border-t border-gray-300 rounded-md overflow-hidden shadow-lg bg-white/80 backdrop-blur-md p-4">
            <h2 className="text-lg font-semibold border-b pb-2 mb-4 bg-orange-500 text-white p-2 rounded-md">
                {patientInfo.judulKasus}
            </h2>
            <PatientInfoRow label="Jenis Pasien" value={patientInfo.jenisPasien} />
            <PatientInfoRow label="Jenis Kunjungan" value={patientInfo.jenisKunjungan} />
            <PatientInfoRow label="Diagnosis" value={patientInfo.diagnosis} />
            <PatientInfoRow label="Deskripsi Kasus" value={patientInfo.deskripsiKasus} />
            <PatientInfoRow label="Metode Pembayaran" value={patientInfo.metodePembayaran} />
        </div>
    );
}
