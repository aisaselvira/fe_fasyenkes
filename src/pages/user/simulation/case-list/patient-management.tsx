"use client";

import {PatientManagementTemplate} from "@/components/template/user/simulation/patient-management";
import patientData from "@/lib/patient-data";
import type {TPPRJCase} from "@/components/organism/tpprj-case-list";
import type {TPPRICase} from "@/components/organism/tppri-case-list";
import type {TPPGDCase} from "@/components/organism/tppgd-case-list";

export default function Home() {
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

    // Cast the patient data to the expected types
    const typedPatientData = {
        tpprj: patientData.tpprj.map((caseItem) => ({
            ...caseItem,
            caseComponent: caseItem.caseComponent.map((comp) => ({
                ...comp,
                formType: comp.formType as "search" | "select" | "info" | "registration",
            })),
        })) as TPPRJCase[],

        tppri: patientData.tppri.map((caseItem) => ({
            ...caseItem,
            caseComponent: caseItem.caseComponent.map((comp) => ({
                ...comp,
                formType: comp.formType as "search" | "select" | "info" | "registration",
            })),
        })) as TPPRICase[],

        tppgd: patientData.tppgd.map((caseItem) => ({
            ...caseItem,
            caseComponent: caseItem.caseComponent.map((comp) => ({
                ...comp,
                formType: comp.formType as "search" | "select" | "info" | "registration",
            })),
        })) as TPPGDCase[],
    };

    return <PatientManagementTemplate tabs={tabs} filterOptions={filterOptions} patientCases={typedPatientData} />;
}
