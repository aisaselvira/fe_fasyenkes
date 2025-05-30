import { useMemo, useState, useEffect } from "react"
import { Button } from "@/components/atoms/button"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import { Textarea } from "@/components/atoms/textarea"
import { ChevronDown, ChevronUp } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu"
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

interface CaseFormProps {
    defaultPatientType: string;
}

export default function CaseForm({ defaultPatientType }: CaseFormProps) {
    const [category, setCategory] = useState(defaultPatientType);
    const [diagnosis, setDiagnosis] = useState("");
    const [perujuk, setPerujuk] = useState("");
    const [caseTitle, setCaseTitle] = useState("");
    const [caseDescription, setCaseDescription] = useState("");
    const [pasienType, setPasienType] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("")
    const [openMenu, setOpenMenu] = useState({
        patient: false,
        visit: false,
        payment: false,
    })
    const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const token = Cookies.get("token");
    const router = useRouter();
    const { id } = router.query;
    console.log(id)

    const tipeUnit = useMemo(() => {
        const match = router.pathname.match(/simulasi-(\w+)/);
        return match ? match[1] : "";
    }, [router.pathname]);

    const getApiUrl = () => {
        switch (tipeUnit) {
            case "tpprj":
                return `${API_BASE_URL}/admin/tpprj/update-simulation/${id}`;
            case "tppri":
                return `${API_BASE_URL}/admin/tppri/update-simulation/${id}`;
            case "tppgd":
                return `${API_BASE_URL}/admin/tppgd/update-simulation/${id}`;
            default:
                throw new Error("Tipe simulasi tidak dikenali");
        }
    };

    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setter(e.target.value);
        };

    useEffect(() => {
        if (!id) return

        const fetchData = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/admin/simulation/get-simulation/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })

                const { data } = res.data;
                console.log(data)

                setCategory(data.category || defaultPatientType)
                setDiagnosis(data.diagnose || "")
                setPerujuk(data.perujuk || "")
                setCaseTitle(data.case_type || "")
                setCaseDescription(data.case_description || "")
                setPasienType(
                    data.patient_type
                        ? data.patient_type.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())
                        : ""
                )
                setPaymentMethod(data.payment_method || "")
            } catch (error) {
                console.error("Gagal fetch data simulasi:", error)
            }
        }

        fetchData()
    }, [id, API_BASE_URL, defaultPatientType, token])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.put(
                getApiUrl(),
                {
                    patient_type: pasienType.toLowerCase().replace(/\s+/g, "_"),
                    category: category.toLowerCase().replace(/\s+/g, "_"),
                    case_type: caseTitle,
                    perujuk: perujuk,
                    diagnose: diagnosis,
                    payment_method: paymentMethod,
                    case_description: caseDescription,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Data berhasil dikirim:", res.data);
            router.push(`/admin/simulasi-${tipeUnit}`);
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
        options: string[],
        onChange: (value: string) => void,
        key: "patient" | "visit" | "payment"
    ) => (
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
                        {value || `Pilih ${label}`}
                        {openMenu[key] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full min-w-[var(--radix-dropdown-menu-trigger-width)]">
                    {options.map((opt, i) => (
                        <DropdownMenuItem key={i} onSelect={() => onChange(opt)}>
                            {opt}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-50 px-4">
            <div className="flex justify-between items-center w-full max-w-4xl mx-auto ">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Edit Kasus
                </h1>
            </div>
            <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8">
                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] items-center gap-3">
                            <Label className="text-gray-800 font-medium">Jenis Kunjungan</Label>
                            <Input
                                value={category}
                                onChange={handleChange(setCategory)}
                                readOnly
                                className="border-gray-200 rounded-md bg-gray-100 text-gray-600"
                            />
                        </div>
                        {renderDropdown(
                            "Jenis Pasien",
                            pasienType,
                            ["Pasien Baru", "Pasien Lama"],
                            setPasienType,
                            "visit"
                        )}
                        {tipeUnit === "tppri" && (
                            <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] items-center gap-3">
                                <Label htmlFor="perujuk" className="text-gray-800 font-medium">perujuk</Label>
                                <Input
                                    id="perujuk"
                                    value={perujuk}
                                    onChange={handleChange(setPerujuk)}
                                    placeholder="Masukkan perujuk"
                                    className="border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] items-center gap-3">
                            <Label htmlFor="diagnosis" className="text-gray-800 font-medium">
                                Diagnosis
                            </Label>
                            <Input
                                id="diagnosis"
                                value={diagnosis}
                                onChange={handleChange(setDiagnosis)}
                                placeholder="Masukkan diagnosis"
                                className="border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] items-center gap-3">
                            <Label htmlFor="case-title" className="text-gray-800 font-medium">
                                Judul Kasus
                            </Label>
                            <Input
                                id="case-title"
                                value={caseTitle}
                                onChange={handleChange(setCaseTitle)}
                                placeholder="Masukkan judul kasus"
                                className="border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] items-start gap-3">
                            <Label htmlFor="case-description" className="text-gray-800 font-medium pt-2">
                                Kasus
                            </Label>
                            <Textarea
                                id="case-description"
                                value={caseDescription}
                                onChange={handleChange(setCaseDescription)}
                                placeholder="Deskripsi kasus"
                                className="min-h-[120px] border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {renderDropdown(
                            "Metode Pembayaran",
                            paymentMethod,
                            ["BPJS", "Asuransi", "Tunai", "Kartu Kredit"],
                            setPaymentMethod,
                            "payment"
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
