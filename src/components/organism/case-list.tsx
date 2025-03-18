import {type PatientCase, PatientCaseCard} from "@/components/organism/patient-case-card";

interface CaseListProps {
    cases: PatientCase[];
}

export function CaseList({cases}: CaseListProps) {
    return (
        <div className="mt-6 space-y-4">
            {cases.map((patientCase) => (
                <PatientCaseCard key={patientCase.id} patientCase={patientCase} />
            ))}
        </div>
    );
}
