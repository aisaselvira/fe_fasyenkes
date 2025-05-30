import { useState, useRef, useMemo, useEffect } from "react"
import { Button } from "@/components/atoms/button"
import { Input } from "@/components/atoms/input"
import Image from "next/image";
import { Label } from "@/components/atoms/label"
import { Textarea } from "@/components/atoms/textarea"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Upload, X } from "lucide-react"
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

            // Urutan pengecekan yang lebih baik
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
        };

        fetchExistingComponents();
    }, [id, token, API_BASE_URL]);

    const availableOptions = useMemo(() => {
        const baseOptions = allOptions[tipeUnit] || [];

        if (existingComponents.length > 0) {
            return baseOptions.filter(option =>
                existingComponents.includes(option.value)
            );
        }

        return [];
    }, [tipeUnit, existingComponents]);

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

            const scenarioResponse = await axios.post(
                `${API_BASE_URL}/admin/scenario/post-scenario`,
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("scenarioResponse.data:", scenarioResponse.data);
            const componentExists = existingComponents.includes(jenisForm);
            if (!componentExists) {
                if (jenisForm === "pendaftaran" && pendaftaranRef.current) {
                    const pendaftaranData = pendaftaranRef.current.getFormData();
                    pendaftaranData.patient.simulation_id = simulationId;
                    console.log("simulation_id yang dipakai:", pendaftaranData.patient.simulation_id);
                    await axios.post(
                        `${API_BASE_URL}/admin/component/post-component/pendaftaran`,
                        pendaftaranData,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                } else if (jenisForm === "admission-rawat-inap" && admisiTPPRIRef.current) {
                    const admisiTPPGD = admisiTPPRIRef.current.getFormData();
                    admisiTPPGD.simulation_id = simulationId;
                    console.log("simulation_id yang dipakai:", admisiTPPGD.simulation_id);
                    await axios.post(
                        `${API_BASE_URL}/admin/component/post-component/admission-rawat-inap`,
                        admisiTPPGD,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                } else if (jenisForm === "admission-rawat-jalan" && admisiTPPRJRef.current) {
                    const admisiTPPRJ = admisiTPPRJRef.current.getFormData();
                    admisiTPPRJ.simulation_id = simulationId;
                    console.log("simulation_id yang dipakai:", admisiTPPRJ.simulation_id);
                    await axios.post(
                        `${API_BASE_URL}/admin/component/post-component/admission-rawat-jalan`,
                        admisiTPPRJ,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                } else if (jenisForm === "admission-gawat-darurat" && admisiTPPGDRef.current) {
                    const admisiTPPRI = admisiTPPGDRef.current.getFormData();
                    admisiTPPRI.simulation_id = simulationId;
                    console.log("simulation_id yang dipakai:", admisiTPPRI.simulation_id);
                    await axios.post(
                        `${API_BASE_URL}/admin/component/post-component/admission-gawat-darurat`,
                        admisiTPPRI,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                }
            } else {
                console.log(`Form ${jenisForm} already exists in database, skipping push`);
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
        if (options.length > 0) {
            const selectedOption = options.find(opt => opt.value === value) || options[0];

            return (
                <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] items-center gap-3">
                    <Label className="text-gray-800 font-medium">{label}</Label>
                    <div className="bg-gray-100 text-gray-600 rounded-md py-2.5 px-4 border border-gray-200">
                        {selectedOption.label}
                    </div>
                    <input
                        type="hidden"
                        value={selectedOption.value}
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
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Tambah Skenario
                </h1>
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
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex items-center gap-2 border-dashed border-gray-300"
                                    >
                                        <Upload size={16} />
                                        Unggah Gambar
                                    </Button>
                                    {image && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={handleRemoveImage}
                                            className="flex items-center gap-2 text-red-500 border-red-200 hover:bg-red-50"
                                        >
                                            <X size={16} />
                                            Hapus
                                        </Button>
                                    )}
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
                            <PendaftaranForm ref={pendaftaranRef} />
                        )}
                        {jenisForm === "admission-rawat-jalan" && (
                            <AdmisiFormTPPRJ ref={admisiTPPRJRef} />
                        )}
                        {jenisForm === "admission-rawat-inap" && (
                            <AdmisiFormTPPRI ref={admisiTPPRIRef} />
                        )}
                        {jenisForm === "admission-gawat-darurat" && (
                            <AdmisiFormTPPGD ref={admisiTPPGDRef} />
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
    )
}