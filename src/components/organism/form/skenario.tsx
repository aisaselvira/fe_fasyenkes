import { useState, useRef, useMemo, useEffect } from "react"
import { Button } from "@/components/atoms/button"
import { Input } from "@/components/atoms/input"
import Image from "next/image";
import { Label } from "@/components/atoms/label"
import { Textarea } from "@/components/atoms/textarea"
import { ChevronDown, ChevronUp } from "lucide-react"
import { X } from "lucide-react"
import PendaftaranForm, { PendaftaranFormRef } from "@/components/organism/form/pendaftaran";
import AdmisiFormTPPRJ, { AdmisiTPPRJFormDataRef } from "@/components/organism/form/admisi/tpprj";
import AdmisiFormTPPRI, { AdmisiTPPRIFormDataRef } from "@/components/organism/form/admisi/tppri";
import AdmisiFormTPPGD, { PatientAdmissionFormRef } from "@/components/organism/form/admisi/tppgd";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu"
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export type PendaftaranData = {
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

export type AdmisiTPPGDFormData = {
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

export type AdmisiTPPRIFormData = {
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

export type AdmisiTPPRJFormData = {
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
    "pendaftaran"?: PendaftaranData
    "admission-rawat-jalan"?: AdmisiTPPRJFormData
    "admission-rawat-inap"?: AdmisiTPPRIFormData
    "admission-gawat-darurat"?: AdmisiTPPGDFormData
}

interface ComponentOption {
    label: string;
    value: string;
    disabled?: boolean;
}

const allOptions: { [key: string]: ComponentOption[] } = {
    tpprj: [
        { label: "Form Pendaftaran", value: "pendaftaran" },
        { label: "Form Admisi Rawat Jalan", value: "admission-rawat-jalan" },
    ],
    tppri: [
        { label: "Form Pendaftaran", value: "pendaftaran" },
        { label: "Form Admisi Rawat Inap", value: "admission-rawat-inap" },
    ],
    tppgd: [
        { label: "Form Pendaftaran", value: "pendaftaran" },
        { label: "Form Admisi Gawat Darurat", value: "admission-gawat-darurat" },
    ],
};

export default function SkenarioForm() {
    const [order, setOrder] = useState("");
    const [question, setQuestion] = useState("");
    const [scenario, setScenario] = useState("");
    const [answertext, setAnswertext] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [jenisForm, setJenisForm] = useState<string>("");
    const [existingComponents, setExistingComponents] = useState<string[]>([]);
    const [componentData, setComponentData] = useState<ComponentData>({});
    const pendaftaranRef = useRef<PendaftaranFormRef | null>(null);
    const admisiTPPRJRef = useRef<AdmisiTPPRJFormDataRef>(null);
    const admisiTPPRIRef = useRef<AdmisiTPPRIFormDataRef>(null);
    const admisiTPPGDRef = useRef<PatientAdmissionFormRef | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const { id } = router.query;

    const [openMenu, setOpenMenu] = useState({
        jenisForm: false,
    })
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setImage(files[0]);
        }
    };
    const handleRemoveImage = () => {
        setImage(null);
    };
    const tipeUnit = useMemo(() => {
        const match = router.pathname.match(/simulasi-(\w+)/);
        return match ? match[1] : "";
    }, [router.pathname]);

    const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const token = Cookies.get("token");
    useEffect(() => {
        if (!id || !token) return;

        const fetchExistingComponents = async () => {
            const headers = { headers: { Authorization: `Bearer ${token}` } };
            const components = [];
            let foundForm = null;
            const data: ComponentData = {};
            const endpointsToCheck = [
                "pendaftaran",
                "admission-rawat-jalan",
                "admission-rawat-inap",
                "admission-gawat-darurat"
            ];

            for (const endpoint of endpointsToCheck) {
                try {
                    const res = await axios.get(
                        `${API_BASE_URL}/admin/component/get-component/${endpoint}/${id}`,
                        headers
                    );

                    if (res.data.data) {
                        const componentType = endpoint === "pendaftaran" ?
                            "pendaftaran" :
                            endpoint;

                        components.push(componentType);
                        data[componentType as keyof ComponentData] = res.data.data;

                        if (!foundForm) {
                            foundForm = componentType;
                            setJenisForm(componentType);
                        }
                    }
                } catch (error) {
                    console.error(`Error checking ${endpoint}:`, error);
                }
            }

            setExistingComponents(components);
            setComponentData(data);
        };

        fetchExistingComponents();
    }, [id, token, API_BASE_URL]);

    const availableOptions = useMemo(() => {
        return allOptions[tipeUnit] || [];
    }, [tipeUnit]);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const simulationId = id ? parseInt(id as string, 10) : 0;
        try {
            const formData = new FormData();
            formData.append("simulation_id", simulationId.toString());
            formData.append("order", order);
            formData.append("scenario", scenario);
            formData.append("question", question);
            formData.append("answer_text", answertext);
            formData.append("component", jenisForm);
            if (image) {
                formData.append("answer_image", image);
            }

            const scenarioResponse = await axios.post(
                `${API_BASE_URL}/admin/scenario/post-scenario`,
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("scenarioResponse.data:", scenarioResponse.data);
            const componentExists = existingComponents.includes(jenisForm);
            if (!componentExists) {
                let componentDataToSend;
                let endpoint = "";

                switch (jenisForm) {
                    case "pendaftaran":
                        if (pendaftaranRef.current) {
                            componentDataToSend = pendaftaranRef.current.getFormData();
                            componentDataToSend.patient.simulation_id = simulationId;
                            endpoint = "pendaftaran";
                        }
                        break;

                    case "admission-rawat-inap":
                        if (admisiTPPRIRef.current) {
                            componentDataToSend = admisiTPPRIRef.current.getFormData();
                            componentDataToSend.simulation_id = simulationId;
                            endpoint = "admission-rawat-inap";
                        }
                        break;

                    case "admission-rawat-jalan":
                        if (admisiTPPRJRef.current) {
                            componentDataToSend = admisiTPPRJRef.current.getFormData();
                            componentDataToSend.simulation_id = simulationId;
                            endpoint = "admission-rawat-jalan";
                        }
                        break;

                    case "admission-gawat-darurat":
                        if (admisiTPPGDRef.current) {
                            componentDataToSend = admisiTPPGDRef.current.getFormData();
                            componentDataToSend.simulation_id = simulationId;
                            endpoint = "admission-gawat-darurat";
                        }
                        break;

                    default:
                        console.warn(`Jenis form "${jenisForm}" tidak dikenal.`);
                }

                if (componentDataToSend && endpoint) {
                    await axios.post(
                        `${API_BASE_URL}/admin/component/post-component/${endpoint}`,
                        componentDataToSend,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                }
            }

            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Data Skenario berhasil ditambahkan",
                timer: 1000,
                showConfirmButton: false,
                timerProgressBar: true,
            });
            console.log("Data berhasil dikirim:", scenarioResponse.data);
            router.push(`/admin/simulasi-${tipeUnit}/${id}`);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Gagal mengirim data:", error.message);
                console.error("Response status:", error.response?.status);
                console.error("Response data:", error.response?.data);
            } else {
                console.error("Error tidak terduga:", error);
            }
        }
    };

    const renderDropdown = (
        label: string,
        value: string,
        options: ComponentOption[],
        onChange: (value: string) => void,
        key: "jenisForm"
    ) => {
        if (options.length === 1) {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] items-center gap-3">
                    <Label className="text-gray-800 font-medium">{label}</Label>
                    <div className="bg-gray-100 text-gray-600 rounded-md py-2.5 px-4 border border-gray-200">
                        {options[0].label}
                    </div>
                    <input
                        type="hidden"
                        value={options[0].value}
                    />
                </div>
            );
        }
        return (
            <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] items-center gap-3">
                <Label className="text-gray-800 font-medium">{label}</Label>
                <DropdownMenu
                    open={openMenu[key]}
                    onOpenChange={(open) => setOpenMenu({ ...openMenu, [key]: open })}
                >
                    <DropdownMenuTrigger asChild>
                        <button
                            type="button"
                            className="w-full flex items-center justify-between bg-gray-100 text-gray-600 rounded-md py-2.5 px-4 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {options.find(opt => opt.value === value)?.label || `Pilih ${label}`}
                            {openMenu[key] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full min-w-[var(--radix-dropdown-menu-trigger-width)]">
                        {options.map((opt, i) => (
                            <DropdownMenuItem key={i} onSelect={() => onChange(opt.value)}>
                                {opt.label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4">
            <div className="flex justify-between items-center w-full max-w-4xl mx-auto ">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Tambah Skenario</h1>
            </div>
            <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8">
                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] items-start gap-3">
                            <Label htmlFor="No_Urut" className="text-gray-800 font-medium pt-2">
                                No Urut
                            </Label>
                            <Input
                                id="order"
                                placeholder="No Urut"
                                value={order}
                                onChange={(e) => setOrder(e.target.value)}
                                className=" border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] items-start gap-3">
                            <Label htmlFor="case-description" className="text-gray-800 font-medium pt-2">
                                Pertanyaan
                            </Label>
                            <Textarea
                                id="question"
                                placeholder="Pertanyaan"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                className="min-h-[120px] border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] items-start gap-3 mt-4">
                            <Label htmlFor="case-description" className="text-gray-800 font-medium pt-2">
                                Skenario
                            </Label>
                            <Textarea
                                id="scenario"
                                placeholder="Skenario"
                                value={scenario}
                                onChange={(e) => setScenario(e.target.value)}
                                className="min-h-[120px] border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] items-start gap-3 mt-4">
                            <Label htmlFor="case-description" className="text-gray-800 font-medium pt-2">
                                Jawaban
                            </Label>
                            <Textarea
                                id="answertext"
                                placeholder="Jawaban"
                                value={answertext}
                                onChange={(e) => setAnswertext(e.target.value)}
                                className="min-h-[120px] border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] items-start gap-3 mt-4 mb-4">
                            <Label htmlFor="case-image" className="text-gray-800 font-medium pt-2">
                                Gambar
                            </Label>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Input
                                        type="file"
                                        id="case-image"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        ref={fileInputRef}
                                        className="hidden"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleRemoveImage}
                                        className="flex items-center gap-2 text-red-500 border-red-200 hover:bg-red-50"
                                    >
                                        <X size={16} />
                                        Hapus
                                    </Button>
                                </div>

                                {image && (
                                    <div className="relative mt-3 border border-gray-200 rounded-md p-2">
                                        <div className="aspect-video relative overflow-hidden rounded-md">
                                            {image && (
                                                <Image
                                                    src={URL.createObjectURL(image)}
                                                    alt="Preview gambar"
                                                    width={200}
                                                    height={200}
                                                    className="w-full h-full object-contain"
                                                />
                                            )}
                                        </div>
                                    </div>
                                )}

                                {!image && (
                                    <div className="border border-dashed border-gray-300 rounded-md p-6 text-center text-gray-500">
                                        <p>Belum ada gambar yang diunggah</p>
                                        <p className="text-sm mt-1">Format yang didukung: JPG, PNG, GIF</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        {renderDropdown(
                            "Jenis Form",
                            jenisForm,
                            availableOptions,
                            (val) => setJenisForm(val),
                            "jenisForm"
                        )}
                        {jenisForm === "pendaftaran" && (
                            <PendaftaranForm
                                ref={pendaftaranRef}
                                initialData={componentData.pendaftaran}
                            />
                        )}
                        {jenisForm === "admission-rawat-jalan" && (
                            <AdmisiFormTPPRJ
                                ref={admisiTPPRJRef}
                                initialData={componentData["admission-rawat-jalan"]}
                            />
                        )}
                        {jenisForm === "admission-rawat-inap" && (
                            <AdmisiFormTPPRI
                                ref={admisiTPPRIRef}
                                initialData={componentData["admission-rawat-inap"]}
                            />
                        )}
                        {jenisForm === "admission-gawat-darurat" && (
                            <AdmisiFormTPPGD
                                ref={admisiTPPGDRef}
                                initialData={componentData["admission-gawat-darurat"]}
                            />
                        )}
                        <div className="flex justify-center gap-4 pt-4">
                            <Button
                                type="submit"
                                className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-8 py-2 rounded-md min-w-[120px]"
                            >
                                Simpan
                            </Button>
                            <Button
                                type="button"
                                onClick={() => router.back()}
                                className="bg-red-600 hover:bg-red-700 text-white font-medium px-8 py-2 rounded-md min-w-[120px]"
                            >
                                Batal
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
