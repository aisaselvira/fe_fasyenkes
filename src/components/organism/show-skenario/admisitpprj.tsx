import { useRouter } from "next/router";
import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
// import { Checkbox } from "@/components/atoms/checkbox";
// import { Label } from "@/components/atoms/label"

type AdmisiTPPRJ = {
    simulation_id: number;
    visit: {
        admission_time: string;
        clinic: string;
        doctor: string;
    };
    referral: {
        referral_number: number;
        referral_date: string;
        referrer: string;
        PPK_code: string;
        referrer_type: string;
        admission_note: string;
    };
    sep: {
        sep_number: string;
        reason_for_visit: string;
        procedure: string;
        assesment: string;
        note: string;
        accident: string;
    };
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
    initialData?: Partial<AdmisiTPPRJ>;
}

export interface ShowTPPRJRef {
    getFormData: () => AdmisiTPPRJ;
};

const ShowAdmissionTPPRJ = forwardRef<ShowTPPRJRef, AdmisiTPPGDProps>(({ initialData }, ref) => {
    const router = useRouter();
    const { id } = router.query;
    const [formData, setFormData] = useState<AdmisiTPPRJ>({
        simulation_id: initialData?.simulation_id || 0,
        visit: {
            admission_time: initialData?.visit?.admission_time || "",
            clinic: initialData?.visit?.clinic || "",
            doctor: initialData?.visit?.doctor || "",
        },
        referral: {
            referral_number: initialData?.referral?.referral_number || 0,
            referral_date: initialData?.referral?.referral_date || "",
            referrer: initialData?.referral?.referrer || "",
            PPK_code: initialData?.referral?.PPK_code || "",
            referrer_type: initialData?.referral?.referrer_type || "",
            admission_note: initialData?.referral?.admission_note || "",
        },
        sep: {
            sep_number: initialData?.sep?.sep_number || "",
            reason_for_visit: initialData?.sep?.reason_for_visit || "",
            procedure: initialData?.sep?.procedure || "",
            assesment: initialData?.sep?.assesment || "",
            note: initialData?.sep?.note || "",
            accident: initialData?.sep?.accident || "",
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

    useEffect(() => {
        if (id) {
            setFormData((prev) => ({
                ...prev,
                simulation_id: Number(id),
            }));
        }
    }, [id]);

    useImperativeHandle(ref, () => ({
        getFormData: () => formData
    }));
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">Data Kunjungan</h2>
        </div>
    );
});

ShowAdmissionTPPRJ.displayName = "ShowAdmissionTPPRJ";
export default ShowAdmissionTPPRJ;