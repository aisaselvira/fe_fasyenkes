import { useRouter } from "next/router";
import { useState, useEffect, useMemo, useRef } from "react";
import api from "@/config/api";
import { config } from "@/config";
import Pendaftaran, { showPendaftaranRef } from "@/components/organism/show-skenario/pendaftaran";
import AdmisiTPPRJ, { ShowTPPRJRef } from "@/components/organism/show-skenario/admisitpprj";
import AdmisiTPPRI, { ShowTPPRIRef } from "@/components/organism/show-skenario/admisitppri";
import AdmisiTPPGD, { ShowTPPGDRef } from "@/components/organism/show-skenario/admisitppgd";

export type Pendaftaran = {
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
}

export type AdmisiTPPGD = {
    simulation_id: number
    visitIGD: {
        admission_time: string
        doctor: string
        procedure_case: string
        is_accident: boolean
        entry_method: string
        insurance_number: string
    }
    document: {
        has_patient_card: boolean
        has_polyclinic_form: boolean
        has_small_label: boolean
        has_big_label: boolean
        has_tracer_RM_document: boolean
        has_proof_of_service: boolean
        has_SEP: boolean
        has_queue_number: boolean
        has_patient__bracelet: boolean
        has_general_consent: boolean
        has_control_card: boolean
    }
}

export type AdmisiTPPRI = {
    simulation_id: number
    inpatientRecord: {
        treatment_room: string
        treatment_rate: number
        treatment_class: string
        isBooking: boolean
        isUpgradingClass: boolean
        doctor: string
        entry_date: string
        entry_type: string
    }
    responsiblePerson: {
        name: string
        gender: string
        date_of_birth: string
        identity_number: string
        number_telphone: string
        address: string
        relationship: string
        has_no_impairment: boolean
        has_hearing_impairment: boolean
        has_emotion_impairment: boolean
        has_visual_impairment: boolean
        has_speech_impairment: boolean
        isLiterate: boolean
        needsInterpreter: boolean
    }
    healthInformation: {
        name: string
        family_relationship: string
        phone_number: string
    }[]
    valueBelief: {
        value_belief: string
    }
    privacyRequest: {
        privacy_request: string
    }
    documentPatient: {
        has_patient_card: boolean
        has_polyclinic_form: boolean
        has_small_label: boolean
        has_big_label: boolean
        has_tracer_RM_document: boolean
        has_proof_of_service: boolean
        has_SEP: boolean
        has_queue_number: boolean
        has_patient__bracelet: boolean
        has_general_consent: boolean
        has_control_card: boolean
    }
}

export type AdmisiTPPRJ = {
    simulation_id: number
    visit: {
        admission_time: string
        clinic: string
        doctor: string
    }
    referral: {
        referral_number: number
        referral_date: string
        referrer: string
        PPK_code: string
        referrer_type: string
        admission_note: string
    }
    sep: {
        sep_number: string
        reason_for_visit: string
        procedure: string
        assesment: string
        note: string
        accident: string
    }
    document: {
        has_patient_card: boolean
        has_polyclinic_form: boolean
        has_small_label: boolean
        has_big_label: boolean
        has_tracer_RM_document: boolean
        has_proof_of_service: boolean
        has_SEP: boolean
        has_queue_number: boolean
        has_patient__bracelet: boolean
        has_general_consent: boolean
        has_control_card: boolean
    }
}

interface ComponentData {
    "pendaftaran"?: Pendaftaran
    "admission-rawat-jalan"?: AdmisiTPPRJ
    "admission-rawat-inap"?: AdmisiTPPRI
    "admission-gawat-darurat"?: AdmisiTPPGD
}

interface Scenario {
    id: number;
    simulation_id: number;
    scenario: string;
    order: number;
    question: string;
    component: string;
    createdAt: string;
    updatedAt: string;
}

export default function Detailskenario() {
    const router = useRouter();
    const { id: simulationId, skenarioid: scenarioId } = router.query;

    const pendaftaranRef = useRef<showPendaftaranRef>(null);
    const admisiTPPRJRef = useRef<ShowTPPRJRef>(null);
    const admisiTPPRIRef = useRef<ShowTPPRIRef>(null);
    const admisiTPPGDRef = useRef<ShowTPPGDRef>(null);

    const [loading, setLoading] = useState(false);
    const [scenario, setScenario] = useState<Scenario | null>(null);
    const [componentData, setComponentData] = useState<ComponentData>({});
    const [jenisForm, setJenisForm] = useState<string | null>(null);

    const tipeUnit = useMemo(() => {
        const match = router.asPath.match(/simulasi-(\w+)/);
        return match ? match[1] : "";
    }, [router.asPath]);

    useEffect(() => {
        const fetchScenarioData = async () => {
            if (!scenarioId || !tipeUnit) return;
            try {
                const res = await api.get(`/${tipeUnit}/get-Scenario`, {
                    params: { id: scenarioId }
                });
                if (res.data?.data) {
                    setScenario(res.data.data);
                } else {
                    console.warn("Data tidak ditemukan.");
                }
            } catch (error) {
                console.error("Gagal fetch data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (router.isReady) {
            fetchScenarioData();
        }
    }, [router.isReady, scenarioId, tipeUnit]);

    useEffect(() => {
        if (!simulationId) return;

        const fetchExistingComponents = async () => {
            const endpointsToCheck = [
                "pendaftaran",
                "admission-rawat-jalan",
                "admission-rawat-inap",
                "admission-gawat-darurat"
            ];

            for (const endpoint of endpointsToCheck) {
                try {
                    const res = await api.get(
                        config.endpoints.adminComponent.getComponent(endpoint, simulationId as string)
                    );

                    if (res.data?.data) {
                        const type = endpoint as keyof ComponentData;
                        setComponentData(prev => ({ ...prev, [type]: res.data.data }));
                        if (!jenisForm) setJenisForm(type);
                    }
                } catch {
                    // Component tidak ditemukan, skip
                }
            }
        };
        fetchExistingComponents();
    }, [simulationId, jenisForm]);

    if (loading) return <div className="p-4">Memuat data skenario...</div>;
    if (!scenario) return <div className="p-4">Skenario tidak ditemukan.</div>;

    return (
        <div className="w-full max-w-4xl mx-auto mt-10">
            <h1 className="text-2xl font-bold">Detail skenario</h1>
            <div className="w-full max-w-4xl mx-auto bg-white rounded-[20px] border border-gray-200 shadow-sm overflow-hidden mt-5 p-10">
                <div className="space-y-6">
                    <div className="flex">
                        <div className="w-1/3 font-bold text-lg">Pertanyaan</div>
                        <div className="w-2/3 text-lg">{scenario.question}</div>
                    </div>

                    <div className="flex">
                        <div className="w-1/3 font-bold text-lg">skenario</div>
                        <div className="w-2/3 text-lg">{scenario.scenario}</div>
                    </div>

                    <div className="flex">
                        <div className="w-1/3 font-bold text-lg">Jawaban</div>
                        <div className="w-2/3 text-lg">{""}</div>
                    </div>

                    <div className="flex">
                        <div className="w-1/3 font-bold text-lg">JenisForm</div>
                        <div className="w-2/3 text-lg">{scenario.component}</div>
                    </div>
                </div>
                <div className="mt-8">
                    {jenisForm === "pendaftaran" && componentData.pendaftaran && (
                        <Pendaftaran initialData={componentData.pendaftaran} ref={pendaftaranRef} />
                    )}
                    {jenisForm === "admission-rawat-jalan" && componentData["admission-rawat-jalan"] && (
                        <AdmisiTPPRJ initialData={componentData["admission-rawat-jalan"]} ref={admisiTPPRJRef} />
                    )}
                    {jenisForm === "admission-rawat-inap" && componentData["admission-rawat-inap"] && (
                        <AdmisiTPPRI initialData={componentData["admission-rawat-inap"]} ref={admisiTPPRIRef} />
                    )}
                    {jenisForm === "admission-gawat-darurat" && componentData["admission-gawat-darurat"] && (
                        <AdmisiTPPGD initialData={componentData["admission-gawat-darurat"]} ref={admisiTPPGDRef} />
                    )}
                </div>
            </div>
        </div>
    );
}