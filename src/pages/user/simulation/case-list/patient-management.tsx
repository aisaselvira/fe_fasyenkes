"use client";

import {PatientManagementTemplate} from "@/components/template/user/simulation/patient-management";

export default function CaseListPage() {
    // Define tabs
    const tabs = ["TPPRJ", "TPPRI", "TPPGD"];

    // Define filter options
    const filterOptions = [
        {id: "semua-kasus", label: "Semua Kasus"},
        {id: "pasien-lama", label: "Pasien lama"},
        {id: "pasien-baru", label: "Pasien baru"},
        {id: "asuransi", label: "Asuransi"},
        {id: "bpjs", label: "BPJS"},
        {id: "pembayaran-mandiri", label: "Pembayaran Mandiri"},
    ];

    return <PatientManagementTemplate tabs={tabs} filterOptions={filterOptions} />;
}
