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
        <div className="border-t border-gray-300 rounded-md overflow-hidden shadow-md bg-white/70 backdrop-blur-sm">
            <PatientInfoRow label="Jenis Pasien" value={patientInfo.jenisPasien} />
            <PatientInfoRow label="Jenis Kunjungan" value={patientInfo.jenisKunjungan} />
            <PatientInfoRow label="Diagnosis" value={patientInfo.diagnosis} />
            <PatientInfoRow label="Judul Kasus" value={patientInfo.judulKasus} />
            <PatientInfoRow label="Deskripsi Kasus" value={patientInfo.deskripsiKasus} />
            <PatientInfoRow label="Metode Pembayaran" value={patientInfo.metodePembayaran} />
        </div>
    );
}
