import { useRouter } from "next/router";
import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
// import { Checkbox } from "@/components/atoms/checkbox";
// import { Label } from "@/components/atoms/label"

type pendaftaran = {
    patient: {
        simulation_id: number;
        name: string;
        nik: string;
        gender: string;
        date_of_birth: string;
        place_of_birth: string;
        address: string;
        phone_number: string;
        nationality: string;
        city: string;
        district: string;
    };
    patient_detail: {
        patient_identity_number: string;
        insurance_number: string;
        type_of_insurance: string;
        marriage_status: string;
        blood_type: string;
        educational_level: string;
        profession: string;
        religion: string;
        ethnic: string;
        language: string;
        disability: string;
    };
    value_belief: {
        value_belief: string;
    };
    privacy_request: {
        privacy_request: string;
    };
    family_members: {
        name: string;
        family_relationship: string;
        phone_number: string;
    }[];
};

interface pendaftaranProps {
    initialData?: Partial<pendaftaran> & {
    };
}

export interface showPendaftaranRef {
    getFormData: () => pendaftaran;
}

const ShowPendaftaran = forwardRef<showPendaftaranRef, pendaftaranProps>(({ initialData }, ref) => {
    const router = useRouter();
    const { id } = router.query;
    const [formData, setFormData] = useState<pendaftaran>({
        patient: {
            simulation_id: initialData?.patient?.simulation_id || 0,
            name: initialData?.patient?.name || "",
            nik: initialData?.patient?.nik || "",
            gender: initialData?.patient?.gender || "L",
            date_of_birth: initialData?.patient?.date_of_birth || "",
            place_of_birth: initialData?.patient?.place_of_birth || "",
            address: initialData?.patient?.address || "",
            phone_number: initialData?.patient?.phone_number || "",
            nationality: initialData?.patient?.nationality || "",
            city: initialData?.patient?.city || "",
            district: initialData?.patient?.district || "",
        },
        patient_detail: {
            patient_identity_number: initialData?.patient_detail?.patient_identity_number || "",
            insurance_number: initialData?.patient_detail?.insurance_number || "",
            type_of_insurance: initialData?.patient_detail?.type_of_insurance || "",
            marriage_status: initialData?.patient_detail?.marriage_status || "",
            blood_type: initialData?.patient_detail?.blood_type || "",
            educational_level: initialData?.patient_detail?.educational_level || "",
            profession: initialData?.patient_detail?.profession || "",
            religion: initialData?.patient_detail?.religion || "",
            ethnic: initialData?.patient_detail?.ethnic || "",
            language: initialData?.patient_detail?.language || "",
            disability: initialData?.patient_detail?.disability || "",
        },
        value_belief: {
            value_belief: initialData?.value_belief?.value_belief || "",
        },
        privacy_request: {
            privacy_request: initialData?.privacy_request?.privacy_request || "",
        },
        family_members: initialData?.family_members || [{
            name: "",
            family_relationship: "",
            phone_number: ""
        }],
    });

    useEffect(() => {
        if (id) {
            setFormData((prev) => ({
                ...prev,
                patient: {
                    ...prev.patient,
                    simulation_id: Number(id),
                },
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

ShowPendaftaran.displayName = "ShowPendaftaran";
export default ShowPendaftaran;