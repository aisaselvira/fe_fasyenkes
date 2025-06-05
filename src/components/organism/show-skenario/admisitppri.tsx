import { useRouter } from "next/router";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Checkbox } from "@/components/atoms/checkbox";
import { Label } from "@/components/atoms/label"

type AdmisiTPPRI = {
    simulation_id: number;
    inpatientRecord: {
        treatment_room: string;
        treatment_rate: number;
        treatment_class: string;
        isBooking: boolean;
        isUpgradingClass: boolean;
        doctor: string;
        entry_date: string;
        entry_type: string;
    };
    responsiblePerson: {
        name: string;
        gender: string;
        date_of_birth: string;
        identity_number: string;
        number_telphone: string;
        address: string;
        relationship: string;
        has_no_impairment: boolean;
        has_hearing_impairment: boolean;
        has_emotion_impairment: boolean;
        has_visual_impairment: boolean;
        has_speech_impairment: boolean;
        isLiterate: boolean;
        needsInterpreter: boolean;
    };
    healthInformation: {
        name: string;
        family_relationship: string;
        phone_number: string;
    }[];
    valueBelief: {
        value_belief: string;
    };
    privacyRequest: {
        privacy_request: string;
    };
    documentPatient: {
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

interface AdmisiTPPRIProps {
    initialData?: Partial<AdmisiTPPRI>
}


export interface ShowTPPRIRef {
    getFormData: () => AdmisiTPPRI;
};

const ShowAdmissionTPPRI = forwardRef<ShowTPPRIRef, AdmisiTPPRIProps>(({ initialData }, ref) => {
    const router = useRouter();
    const { id: simulationId } = router.query;
    const [formData, setFormData] = useState<AdmisiTPPRI>({
        simulation_id: Number(simulationId) || 0,
        inpatientRecord: {
            treatment_room: initialData?.inpatientRecord?.treatment_room || "",
            treatment_rate: initialData?.inpatientRecord?.treatment_rate || 0,
            treatment_class: initialData?.inpatientRecord?.treatment_class || "",
            isBooking: initialData?.inpatientRecord?.isBooking || false,
            isUpgradingClass: initialData?.inpatientRecord?.isUpgradingClass || false,
            doctor: initialData?.inpatientRecord?.doctor || "",
            entry_date: initialData?.inpatientRecord?.entry_date || "",
            entry_type: initialData?.inpatientRecord?.entry_type || ""
        },
        responsiblePerson: {
            name: initialData?.responsiblePerson?.name || "",
            gender: initialData?.responsiblePerson?.gender || "",
            date_of_birth: initialData?.responsiblePerson?.date_of_birth || "",
            identity_number: initialData?.responsiblePerson?.identity_number || "",
            number_telphone: initialData?.responsiblePerson?.number_telphone || "",
            address: initialData?.responsiblePerson?.address || "",
            relationship: initialData?.responsiblePerson?.relationship || "",
            has_no_impairment: initialData?.responsiblePerson?.has_no_impairment || false,
            has_hearing_impairment: initialData?.responsiblePerson?.has_hearing_impairment || false,
            has_emotion_impairment: initialData?.responsiblePerson?.has_emotion_impairment || false,
            has_visual_impairment: initialData?.responsiblePerson?.has_visual_impairment || false,
            has_speech_impairment: initialData?.responsiblePerson?.has_speech_impairment || false,
            isLiterate: initialData?.responsiblePerson?.isLiterate || false,
            needsInterpreter: initialData?.responsiblePerson?.needsInterpreter || false
        },
        healthInformation: initialData?.healthInformation || [{
            name: "",
            family_relationship: "",
            phone_number: ""
        }],
        valueBelief: {
            value_belief: initialData?.valueBelief?.value_belief || ""
        },
        privacyRequest: {
            privacy_request: initialData?.privacyRequest?.privacy_request || ""
        },
        documentPatient: {
            has_patient_card: initialData?.documentPatient?.has_patient_card || false,
            has_polyclinic_form: initialData?.documentPatient?.has_polyclinic_form || false,
            has_small_label: initialData?.documentPatient?.has_small_label || false,
            has_big_label: initialData?.documentPatient?.has_big_label || false,
            has_tracer_RM_document: initialData?.documentPatient?.has_tracer_RM_document || false,
            has_proof_of_service: initialData?.documentPatient?.has_proof_of_service || false,
            has_SEP: initialData?.documentPatient?.has_SEP || false,
            has_queue_number: initialData?.documentPatient?.has_queue_number || false,
            has_patient__bracelet: initialData?.documentPatient?.has_patient__bracelet || false,
            has_general_consent: initialData?.documentPatient?.has_general_consent || false,
            has_control_card: initialData?.documentPatient?.has_control_card || false
        }
    })

    const handleCheck = (key: keyof AdmisiTPPRI["documentPatient"]) => {
        setFormData((prev) => ({
            ...prev,
            documentPatient: {
                ...prev.documentPatient,
                [key]: !prev.documentPatient[key]
            }
        }));
    };


    useImperativeHandle(ref, () => ({
        getFormData: () => formData,
    }));

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">Data Kunjungan</h2>

            <div className="flex">
                <div className="w-1/3 font-bold">Dokter</div>
                <div className="w-2/3">{formData.inpatientRecord.treatment_room}</div>
            </div>

            <div className="flex">
                <div className="w-1/3 font-bold">Waktu Masuk</div>
                <div className="w-2/3">{formData.inpatientRecord.treatment_rate}</div>
            </div>

            <div className="flex">
                <div className="w-1/3 font-bold">Kasus Tindakan</div>
                <div className="w-2/3">{formData.inpatientRecord.treatment_class}</div>
            </div>

            <div className="flex">
                <div className="w-1/3 font-bold">Kecelakaan</div>
                <div className="w-2/3">{formData.inpatientRecord.isBooking}</div>
            </div>
            <div className="flex">
                <div className="w-1/3 font-bold">No Asuransi</div>
                <div className="w-2/3">{formData.inpatientRecord.isUpgradingClass}</div>
            </div>
            <div className="flex">
                <div className="w-1/3 font-bold">Cara Masuk</div>
                <div className="w-2/3">{formData.inpatientRecord.isUpgradingClass}</div>
            </div>
            <div className="flex justify-center px-4 mt-4">
                <div className="w-full max-w-md grid grid-rows-4 grid-flow-col gap-1">
                    {[
                        { id: "has_patient_card", label: "Kartu Pasien" },
                        { id: "has_polyclinic_form", label: "Lembar Poliklinik" },
                        { id: "has_small_label", label: "Label Kecil" },
                        { id: "has_big_label", label: "Label Besar" },
                        { id: "has_tracer_RM_document", label: "Tracer Berkas RM" },
                        { id: "has_proof_of_service", label: "Surat Bukti Pelayanan" },
                        { id: "has_SEP", label: "SEP" },
                        { id: "has_queue_number", label: "No Antrian" },
                        { id: "has_patient__bracelet", label: "Gelang Pasien" },
                        { id: "has_general_consent", label: "General Consent" },
                        { id: "has_control_card", label: "Kartu Kendali" },
                    ].map((item) => (
                        <div key={item.id} className="flex items-center space-x-2">
                            <Checkbox
                                id={item.id}
                                checked={formData.documentPatient[item.id as keyof AdmisiTPPRI["documentPatient"]]}
                                onCheckedChange={() => handleCheck(item.id as keyof AdmisiTPPRI["documentPatient"])}
                            />
                            <Label htmlFor={item.id} className="text-sm">{item.label}</Label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

ShowAdmissionTPPRI.displayName = "ShowAdmissionTPPRI";
export default ShowAdmissionTPPRI;