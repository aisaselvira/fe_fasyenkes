"use client"

import { useState, forwardRef, useEffect, useImperativeHandle } from "react"
import { Input } from "@/components/atoms/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/select"
import { Label } from "@/components/atoms/label"
import { Checkbox } from "@/components/atoms/checkbox";
import { useRouter } from "next/router";

type AdmisiTPPRJFormData = {
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

export interface AdmisiTPPRJFormDataRef {
    getFormData: () => AdmisiTPPRJFormData;
};


const PatientAdmissionTPPRJForm = forwardRef<AdmisiTPPRJFormDataRef>((_, ref) => {
    const router = useRouter();
    const { id } = router.query;
    const [formData, setFormData] = useState<AdmisiTPPRJFormData>({
        simulation_id: 0,
        visit: {
            admission_time: "",
            clinic: "",
            doctor: "",
        },
        referral: {
            referral_number: 0,
            referral_date: "",
            referrer: "",
            PPK_code: "",
            referrer_type: "",
            admission_note: "",
        },
        sep: {
            sep_number: "",
            reason_for_visit: "",
            procedure: "",
            assesment: "",
            note: "",
            accident: "",
        },
        document: {
            has_patient_card: false,
            has_polyclinic_form: false,
            has_small_label: false,
            has_big_label: false,
            has_tracer_RM_document: false,
            has_proof_of_service: false,
            has_SEP: false,
            has_queue_number: false,
            has_patient__bracelet: false,
            has_general_consent: false,
            has_control_card: false,
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

    const handleCheck = (key: keyof AdmisiTPPRJFormData["document"]) => {
        setFormData((prev) => ({
            ...prev,
            document: {
                ...prev.document,
                [key]: !prev.document[key]
            }
        }));
    };

    const handleFormDataChange = <
        T extends keyof AdmisiTPPRJFormData,
        K extends keyof AdmisiTPPRJFormData[T]
    >(
        section: T,
        field: K,
        value: AdmisiTPPRJFormData[T][K] extends boolean ? boolean | "toggle" : string | boolean
    ) => {
        setFormData((prev) => {
            const sectionData = prev[section];

            if (typeof sectionData === "object" && sectionData !== null && !Array.isArray(sectionData)) {
                const currentValue = sectionData[field];

                const updatedValue =
                    value === "toggle" && typeof currentValue === "boolean"
                        ? !currentValue
                        : value;

                return {
                    ...prev,
                    [section]: {
                        ...sectionData,
                        [field]: updatedValue,
                    },
                };
            }
            return prev;
        });
    };

    useImperativeHandle(ref, () => ({
        getFormData: () => formData
    }));

    return (
        <div className="w-full  max-w-6xl mx-auto bg-white rounded-2xl border shadow-lg my-10">
            {/* Formulir */}
            <div className="w-full max-w-6xl mx-auto bg-gray-50 shadow-sm my-8 ">
                <div className="bg-blue-600 text-white p-3 sm:p-4 border-b">
                    <h2 className="text-lg font-semibold tracking-wide">FORMULIR ADMISI</h2>
                </div>
                <div className="p-3 sm:p-4 max-h-[400px] overflow-y-auto">
                    <h3 className="font-semibold mb-3 sm:mb-4 ">Data Kunjungan</h3>
                    {/* Waktu Admisi */}
                    <div className="mt-4 max-h-[400px] border border-gray-100 rounded-md p-4 shadow-inner">
                        <div className="grid gap-3 sm:gap-4">
                            <div className="grid gap-3 sm:gap-4">
                                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                    <Label htmlFor="waktuAdmisi" className="sm:mb-0 mb-1">
                                        Waktu Admisi <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
                                        <Input
                                            id="waktuAdmisi"
                                            type="date"
                                            value={formData.visit.admission_time}
                                            onChange={(e) => handleFormDataChange("visit", "admission_time", e.target.value)}
                                            className="sm:max-w-[200px]"
                                        />
                                        <div className="flex gap-2">
                                            {/* Checkbox Baru */}
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                />
                                                <div className="h-4 w-4 rounded-full border-2 border-green-500 peer-checked:bg-green-500 transition"></div>
                                                <span className="">
                                                    Baru
                                                </span>
                                            </label>

                                            {/* Checkbox Lama */}
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                />
                                                <div className="h-4 w-4 rounded-full border-2 border-blue-500 peer-checked:bg-blue-500 transition"></div>
                                                <span className="">
                                                    Lama
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Klinik */}
                                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                    <Label htmlFor="klinik" className="sm:mb-0 mb-1">
                                        Klinik <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={formData.visit.clinic}
                                        onValueChange={(val) => handleFormDataChange("visit", "clinic", val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Klinik" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Poliklinik Mata">Poliklinik Mata</SelectItem>
                                            <SelectItem value="Poliklinik Jantung">Poliklinik Jantung</SelectItem>
                                            <SelectItem value="Poliklinik Dalam">Poliklinik Dalam</SelectItem>
                                            <SelectItem value="Poliklinik Saraf">Poliklinik Saraf</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Dokter Klinik */}
                                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                    <Label htmlFor="dokter" className="sm:mb-0 mb-1">
                                        Dokter Klinik <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="dokter"
                                        placeholder="Masukkan Nama Dokter"
                                        value={formData.visit.doctor}
                                        onChange={(e) => handleFormDataChange("visit", "doctor", e.target.value)}
                                    />
                                </div>

                                {/* Cara Masuk */}
                                {/* <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                    <Label htmlFor="caraMasuk" className="sm:mb-0 mb-1">
                                        Cara Masuk <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Cara Masuk" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="rujukan">Rujukan</SelectItem>
                                            <SelectItem value="sendiri">Datang Sendiri</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div> */}

                                {/* Cara Pembayaran */}
                                {/* <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                    <Label htmlFor="pembayaran" className="sm:mb-0 mb-1">
                                        Cara Pembayaran <span className="text-red-500">*</span>
                                    </Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Pembayaran" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="bpjs">BPJS</SelectItem>
                                            <SelectItem value="tunai">Tunai</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div> */}

                                {/* No Asuransi */}
                                {/* <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                    <Label htmlFor="asuransi" className="sm:mb-0 mb-1">
                                        No Asuransi
                                    </Label>
                                    <div className="flex gap-2">
                                        <Input id="asuransi" placeholder="Masukkan No Asuransi" />
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    {/* Data Rujukan */}
                    <div className="p-3 sm:p-4">
                        <h3 className="font-semibold mb-3 sm:mb-4 ">Data Rujukan</h3>
                        <div className="mt-4 max-h-[400px] overflow-y-auto border border-gray-100 rounded-md p-4 shadow-inner">
                            <div className="grid gap-3 sm:gap-4">
                                <div className="grid gap-3 sm:gap-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                        <Label className="font-medium">Nomor Rujukan <span className="text-red-500">*</span></Label>
                                        <Input className="" placeholder="Masukkan Nomor Rujukan"
                                            value={formData.referral.referral_number}
                                            onChange={(e) => handleFormDataChange("referral", "referral_number", e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                        <Label htmlFor="waktuAdmisi" className="sm:mb-0 mb-1">
                                            Tanggal Rujukan <span className="text-red-500">*</span>
                                        </Label>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
                                            <Input
                                                id="tanggal_rujukan"
                                                type="date"
                                                value={formData.referral.referral_date}
                                                onChange={(e) => handleFormDataChange("referral", "referral_date", e.target.value)}
                                                className="sm:max-w-[200px]"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                        <Label className="font-medium">Perujuk <span className="text-red-500">*</span></Label>
                                        <Input className="" placeholder="Masukkan Perujuk"
                                            value={formData.referral.referrer}
                                            onChange={(e) => handleFormDataChange("referral", "referrer", e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                        <Label className="font-medium">Kode PPK(BPJS) <span className="text-red-500">*</span></Label>
                                        <Input className="" placeholder="Masukkan kode PPK"
                                            value={formData.referral.PPK_code}
                                            onChange={(e) => handleFormDataChange("referral", "PPK_code", e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                        <Label htmlFor="jenis_perujuk" className="sm:mb-0 mb-1">
                                            Jenis Perujuk <span className="text-red-500">*</span>
                                        </Label>
                                        <Select
                                            value={formData.referral.referrer_type}
                                            onValueChange={(val) => handleFormDataChange("referral", "referrer_type", val)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih Jenis Perujuk" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="rumah sakit">Rumah Sakit</SelectItem>
                                                <SelectItem value="puskesmas">Puskesmas</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                        <Label className="font-medium">Catatan Kunjungan <span className="text-red-500">*</span></Label>
                                        <Input className="" placeholder="Masukkan Catatan Kunjungan"
                                            value={formData.referral.admission_note}
                                            onChange={(e) => handleFormDataChange("referral", "admission_note", e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div >
                        </div>
                    </div >
                    {/* Data SEP */}
                    <div className="p-3 sm:p-4">
                        <h3 className="font-semibold mb-3 sm:mb-4 ">Data SEP</h3>
                        <div className="mt-4 max-h-[400px] border border-gray-100 rounded-md p-4 shadow-inner">
                            <div className="grid gap-3 sm:gap-4">
                                <div className="grid gap-3 sm:gap-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                        <Label className="font-medium">Nomor SEP <span className="text-red-500">*</span></Label>
                                        <Input className="" placeholder="Masukkan Nomor SEP"
                                            value={formData.sep.sep_number}
                                            onChange={(e) => handleFormDataChange("sep", "sep_number", e.target.value)} />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                        <Label className="font-medium">Tujuan Kunjungan <span className="text-red-500">*</span></Label>
                                        <Input className="" placeholder="Masukkan Tujuan Rujukan"
                                            value={formData.sep.reason_for_visit}
                                            onChange={(e) => handleFormDataChange("sep", "reason_for_visit", e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                        <Label className="font-medium">Prosedur <span className="text-red-500">*</span></Label>
                                        <Input className="" placeholder="Masukkan Prosedur"
                                            value={formData.sep.procedure}
                                            onChange={(e) => handleFormDataChange("sep", "procedure", e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                        <Label className="font-medium">Assesmendt <span className="text-red-500">*</span></Label>
                                        <Input className="" placeholder="Masukkan Assesmendt"
                                            value={formData.sep.assesment}
                                            onChange={(e) => handleFormDataChange("sep", "assesment", e.target.value)}
                                        />
                                    </div>
                                    {/* <div className="flex gap-2 ml-40 items-center">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                            />
                                            <div className="h-4 w-4 rounded-full border-2 border-green-500 peer-checked:bg-green-500 transition"></div>
                                            <span className="">
                                                Katarak
                                            </span>
                                        </label>
                                    </div> */}
                                    {/* <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                        <Label className="font-medium">Diagnosis awal <span className="text-red-500">*</span></Label>
                                        <Input className="" placeholder="Masukkan Dagnosis awal" />
                                    </div> */}
                                    <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                        <Label className="font-medium">Catatan<span className="text-red-500">*</span></Label>
                                        <Input className="" placeholder="Masukkan Catatan"
                                            value={formData.sep.note}
                                            onChange={(e) => handleFormDataChange("sep", "note", e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                        <Label htmlFor="jenis_perujuk" className="sm:mb-0 mb-1">
                                            Kecelakaan <span className="text-red-500">*</span>
                                        </Label>
                                        <Select
                                            value={formData.sep.accident}
                                            onValueChange={(val) => handleFormDataChange("sep", "accident", val)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih Kecelakaan" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="rumah sakit">Tabrak lari</SelectItem>
                                                <SelectItem value="puskesmas">Tabrak jatuh</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div >
                        </div>
                    </div >
                    <div className="flex justify-center px-4">
                        <div className="w-full max-w-md grid grid-rows-4 grid-flow-col gap-1">
                            {[
                                { id: "KARTU_PASIEN", label: "Kartu Pasien" },
                                { id: "POLIKLINIK", label: "Lembar Poliklinik" },
                                { id: "LABEL_KECIL", label: "Label Kecil" },
                                { id: "LABEL_BESAR", label: "Label Besar" },
                                { id: "TRACER", label: "Tracer Berkas RM" },
                                { id: "BUKTI_PELAYANAN", label: "Surat Bukti Pelayanan" },
                                { id: "SEP", label: "SEP" },
                                { id: "ANTRIAN", label: "No Antrian" },
                                { id: "GELANG", label: "Gelang Pasien" },
                                { id: "GENERAL_CONSENT", label: "General Consent" },
                                { id: "KENDALI", label: "Kartu Kendali" },
                            ].map((item) => (
                                <div key={item.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={item.id}
                                        checked={formData.document[item.id as keyof AdmisiTPPRJFormData["document"]]}
                                        onCheckedChange={() => handleCheck(item.id as keyof AdmisiTPPRJFormData["document"])}
                                    />
                                    <Label htmlFor={item.id} className="text-sm">{item.label}</Label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div >
            </div >
        </div >
    );
});

PatientAdmissionTPPRJForm.displayName = "PatientAdmissionTPPRJForm";
export default PatientAdmissionTPPRJForm;
