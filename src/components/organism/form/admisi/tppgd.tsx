"use client"

import { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { Input } from "@/components/atoms/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/select"
// import { RadioGroup, RadioGroupItem } from "@/components/atoms/radio-group"
// import { User } from "lucide-react"
import { Label } from "@/components/atoms/label"
import { Checkbox } from "@/components/atoms/checkbox";
import { useRouter } from "next/router";

type AdmisiTPPGDFormData = {
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

interface AdmisiTPPGDFormProps {
    initialData?: Partial<AdmisiTPPGDFormData>;
}

export interface PatientAdmissionFormRef {
    getFormData: () => AdmisiTPPGDFormData;
};

const PatientAdmissionForm = forwardRef<PatientAdmissionFormRef, AdmisiTPPGDFormProps>(({ initialData }, ref) => {
    const router = useRouter();
    const { id } = router.query;
    
    const [formData, setFormData] = useState<AdmisiTPPGDFormData>({
        simulation_id: initialData?.simulation_id || 0,
        visitIGD: {
            admission_time: initialData?.visitIGD?.admission_time || "",
            doctor: initialData?.visitIGD?.doctor || "",
            procedure_case: initialData?.visitIGD?.procedure_case || "",
            is_accident: initialData?.visitIGD?.is_accident || false,
            entry_method: initialData?.visitIGD?.entry_method || "",
            insurance_number: initialData?.visitIGD?.insurance_number || ""
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
            has_control_card: initialData?.document?.has_control_card || false
        }
    });

    useEffect(() => {
        if (id) {
            setFormData((prev) => ({
                ...prev,
                simulation_id: Number(id),
            }));
        }
    }, [id]);

    useEffect(() => {
        if (initialData) {
            setFormData((prev) => ({
                simulation_id: initialData.simulation_id ?? prev.simulation_id,
                visitIGD: {
                    ...prev.visitIGD,
                    ...initialData.visitIGD,
                },
                document: {
                    ...prev.document,
                    ...initialData.document,
                },
            }))
        }
    }, [initialData])

    console.log("initialData dari parent:", initialData);

    const handleCheck = (key: keyof AdmisiTPPGDFormData["document"]) => {
        setFormData((prev) => ({
            ...prev,
            document: {
                ...prev.document,
                [key]: !prev.document[key]
            }
        }));
    };

    const handleVisitIGDChange = (field: keyof AdmisiTPPGDFormData["visitIGD"], value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            visitIGD: {
                ...prev.visitIGD,
                [field]: value,
            },
        }));
    };
    useImperativeHandle(ref, () => ({
        getFormData: () => formData
    }));

    return (
        <div className="w-full  max-w-6xl mx-auto bg-white rounded-2xl border shadow-lg my-10">
            {/* Formulir */}
            <div className="w-full max-w-6xl mx-auto bg-gray-50 shadow-sm my-8">
                <div className="bg-blue-600 text-white p-3 sm:p-4 border-b">
                    <h2 className="text-lg font-semibold tracking-wide">FORMULIR ADMISI</h2>
                </div>

                <div className="p-3 sm:p-4 max-h-[400px] overflow-y-auto">
                    <h3 className="font-semibold mb-3 sm:mb-4">Data Kunjungan</h3>

                    <div className="mt-4 max-h-[400px] border border-gray-100 rounded-md p-4 shadow-inner">
                        <div className="grid gap-3 sm:gap-4">

                            {/* Waktu Admisi */}
                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="waktuAdmisi" className="sm:mb-0 mb-1">
                                    Waktu Admisi <span className="text-red-500">*</span>
                                </Label>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
                                    <Input
                                        id="waktuAdmisi"
                                        type="date"
                                        value={formData.visitIGD.admission_time}
                                        onChange={(e) => handleVisitIGDChange("admission_time", e.target.value)}
                                        className="sm:max-w-[200px]"
                                    />

                                    {/* <RadioGroup
                                        value={formData.visitIGD.is_accident}
                                        onValueChange={(val) => handleVisitIGDChange("is_accident", val)}
                                        className="flex gap-4"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="baru" id="baru" />
                                            <label htmlFor="baru" className="text-sm font-medium">Baru</label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="lama" id="lama" />
                                            <label htmlFor="lama" className="text-sm font-medium">Lama</label>
                                        </div>
                                    </RadioGroup> */}
                                </div>
                            </div>

                            {/* Dokter Klinik */}
                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="dokter" className="sm:mb-0 mb-1">
                                    Dokter <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="dokter"
                                    placeholder="Masukkan Nama Dokter"
                                    value={formData.visitIGD.doctor}
                                    onChange={(e) => handleVisitIGDChange("doctor", e.target.value)}
                                />
                            </div>

                            {/* Kasus Tindakan */}
                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="kasusTindakan" className="sm:mb-0 mb-1">
                                    Kasus Tindakan <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={formData.visitIGD.procedure_case}
                                    onValueChange={(val) => handleVisitIGDChange("procedure_case", val)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Kasus" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Bedah">Bedah</SelectItem>
                                        <SelectItem value="NonBedah">NonBedah</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Kecelakaan */}
                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="kecelakaan" className="sm:mb-0 mb-1">
                                    Kecelakaan <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={formData.visitIGD.is_accident.toString()} // konversi boolean ke string
                                    onValueChange={(val) => handleVisitIGDChange("is_accident", val === "true")} // ubah string ke boolean
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Kecelakaan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="true">Ya</SelectItem>
                                        <SelectItem value="false">Tidak</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Cara Masuk */}
                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="caraMasuk" className="sm:mb-0 mb-1">
                                    Cara Masuk <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={formData.visitIGD.entry_method}
                                    onValueChange={(val) => handleVisitIGDChange("entry_method", val)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Pembayaran" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sendiri">Sendiri</SelectItem>
                                        <SelectItem value="diantar">Diantar</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* No Asuransi */}
                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="asuransi" className="sm:mb-0 mb-1">
                                    No Asuransi
                                </Label>
                                <Input
                                    id="asuransi"
                                    placeholder="Masukkan No Asuransi"
                                    value={formData.visitIGD.insurance_number}
                                    onChange={(e) => handleVisitIGDChange("insurance_number", e.target.value)}
                                />
                            </div>

                            {/* Catatan Kunjungan */}
                            {/* <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="catatanKunjungan" className="sm:mb-0 mb-1">
                                    Catatan Kunjungan <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={formData.visitIGD.procedure_case} // asumsi catatan kunjungan disimpan di procedure_case, sesuaikan jika perlu
                                    onValueChange={(val) => handleVisitIGDChange("procedure_case", val)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Catatan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="bpjs">BPJS</SelectItem>
                                        <SelectItem value="tunai">Tunai</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div> */}
                        </div>
                    </div>

                    {/* Checkbox Document */}
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
                                        checked={formData.document[item.id as keyof AdmisiTPPGDFormData["document"]]}
                                        onCheckedChange={() => handleCheck(item.id as keyof AdmisiTPPGDFormData["document"])}
                                    />
                                    <Label htmlFor={item.id} className="text-sm">{item.label}</Label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
});

PatientAdmissionForm.displayName = "PatientAdmissionForm";
export default PatientAdmissionForm;