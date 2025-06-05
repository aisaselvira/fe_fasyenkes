import { useRouter } from "next/router";
import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { Checkbox } from "@/components/atoms/checkbox";
import { Label } from "@/components/atoms/label"

type AdmisiTPPGD = {
    simulation_id: number,
    visitIGD: {
        admission_time: string;
        doctor: string;
        procedure_case: string;
        is_accident: boolean;
        entry_method: string;
        insurance_number: string;
    },
    document: {
        has_patient_card: boolean;
        has_polyclinic_form: boolean;
        has_small_label: boolean;
        has_big_label: boolean;
        has_tracer_RM_document: boolean;
        has_proof_of_service: boolean;
        has_SEP: boolean;
        has_queue_number: boolean;
        has_patient__bracelet: boolean;
        has_general_consent: boolean;
        has_control_card: boolean;
    };
};

interface AdmisiTPPGDProps {
    initialData?: Partial<AdmisiTPPGD>;
}

export interface ShowTPPGDRef {
    getFormData: () => AdmisiTPPGD;
};


const ShowTPPGDAdmission = forwardRef<ShowTPPGDRef, AdmisiTPPGDProps>(({ initialData }, ref) => {
    const router = useRouter();
    const { id: simulationId } = router.query;
    const [formData, setFormData] = useState<AdmisiTPPGD>({
        simulation_id: Number(simulationId),
        visitIGD: {
            admission_time: initialData?.visitIGD?.admission_time || "",
            doctor: initialData?.visitIGD?.doctor || "",
            procedure_case: initialData?.visitIGD?.procedure_case || "",
            is_accident: initialData?.visitIGD?.is_accident || false,
            entry_method: initialData?.visitIGD?.entry_method || "",
            insurance_number: initialData?.visitIGD?.insurance_number || "",
        },
        document: {
            has_patient_card: initialData?.document?.has_patient_card || false,
            has_polyclinic_form: initialData?.document?.has_polyclinic_form || false,
            has_small_label: initialData?.document?.has_small_label || false,
            has_big_label: initialData?.document?.has_big_label || false,
            has_tracer_RM_document: initialData?.document?.has_tracer_RM_document || false,
            has_proof_of_service: initialData?.document?.has_proof_of_service || false,
            has_SEP: initialData?.document?.has_SEP || false,
            has_queue_number: initialData?.document?.has_queue_number || false,
            has_patient__bracelet: initialData?.document?.has_patient__bracelet || false,
            has_general_consent: initialData?.document?.has_general_consent || false,
            has_control_card: initialData?.document?.has_control_card || false,
        },
    });

    const handleCheck = (key: keyof AdmisiTPPGD["document"]) => {
        setFormData((prev) => ({
            ...prev,
            document: {
                ...prev.document,
                [key]: !prev.document[key]
            }
        }));
    };

    useEffect(() => {
        if (simulationId) {
            setFormData((prev) => ({
                ...prev,
                simulation_id: Number(simulationId),
            }));
        }
    }, [simulationId]);

    useImperativeHandle(ref, () => ({
        getFormData: () => formData,
    }));

    return (
        <div className="space-y-4 text-sm md:text-base">
            <div className="flex py-1">
                <div className="w-1/3 font-bold">Dokter</div>
                <div className="w-2/3">{formData.visitIGD.doctor}</div>
            </div>

            <div className="flex py-1">
                <div className="w-1/3 font-bold">Waktu Masuk</div>
                <div className="w-2/3">{formData.visitIGD.admission_time}</div>
            </div>

            <div className="flex py-1">
                <div className="w-1/3 font-bold">Kasus Tindakan</div>
                <div className="w-2/3">{formData.visitIGD.procedure_case}</div>
            </div>

            <div className="flex py-1">
                <div className="w-1/3 font-bold">Kecelakaan</div>
                <div className="w-2/3">{formData.visitIGD.is_accident ? "Ya" : "Tidak"}</div>
            </div>

            <div className="flex py-1">
                <div className="w-1/3 font-bold">No Asuransi</div>
                <div className="w-2/3">{formData.visitIGD.insurance_number}</div>
            </div>

            <div className="flex py-1">
                <div className="w-1/3 font-bold">Cara Masuk</div>
                <div className="w-2/3">{formData.visitIGD.entry_method}</div>
            </div>
            <div className="flex justify-center">
                <div className="grid grid-cols-2 gap-2">
                    {Object.entries(formData.document).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-3 py-1 px-2 rounded hover:bg-gray-100">
                            <Checkbox id={key} checked={value} onCheckedChange={() => handleCheck(key as keyof AdmisiTPPGD["document"])} disabled />
                            <Label htmlFor={key}>{key.replace(/_/g, " ")}</Label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

ShowTPPGDAdmission.displayName = "ShowTPPGDAdmission";
export default ShowTPPGDAdmission;

