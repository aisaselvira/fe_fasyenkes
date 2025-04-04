import {PatientManagementTemplate} from "@/components/template/user/simulation/patient-management";
import patientData from "@/lib/patient-data";

const caseFilters = [
    {id: "pasien-lama", label: "Pasien lama"},
    {id: "pasien-baru", label: "Pasien baru"},
    {id: "asuransi", label: "Asuransi"},
    {id: "pembayaran-mandiri", label: "Pembayaran Mandiri"},
];

export default function PatientManagementPage() {
    return (
        <PatientManagementTemplate
            tabs={["TPPRJ", "TPPRI", "TPPGD"]}
            filterOptions={caseFilters}
            patientCases={{
                tpprj: patientData.tpprj,
                tppri: patientData.tppri,
                tppgd: patientData.tppgd,
            }}
        />
    );
}
