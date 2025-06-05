import { forwardRef, useState, useEffect, useImperativeHandle } from "react"
import { Input } from "@/components/atoms/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/select"
// import { User } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/atoms/radio-group"
import { Label } from "@/components/atoms/label"
import { Checkbox } from "@/components/atoms/checkbox";
import { useRouter } from "next/router";

type AdmisiTPPRIFormData = {
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

interface AdmisiTPPRIFormProps {
    initialData?: Partial<AdmisiTPPRIFormData>
}


export interface AdmisiTPPRIFormDataRef {
    getFormData: () => AdmisiTPPRIFormData;
};

const PatientAdmissionTPPRIForm = forwardRef<AdmisiTPPRIFormDataRef, AdmisiTPPRIFormProps>(({ initialData }, ref) => {
    const router = useRouter();
    const { id } = router.query;
    const [formData, setFormData] = useState<AdmisiTPPRIFormData>({
        simulation_id: initialData?.simulation_id || 0,
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
                ...prev,
                ...initialData,
                inpatientRecord: {
                    ...prev.inpatientRecord,
                    ...initialData.inpatientRecord,
                },
                responsiblePerson: {
                    ...prev.responsiblePerson,
                    ...initialData.responsiblePerson,
                },
                valueBelief: {
                    ...prev.valueBelief,
                    ...initialData.valueBelief,
                },
                privacyRequest: {
                    ...prev.privacyRequest,
                    ...initialData.privacyRequest,
                },
                documentPatient: {
                    ...prev.documentPatient,
                    ...initialData.documentPatient,
                },
                healthInformation: initialData.healthInformation || prev.healthInformation,
            }));
        }
    }, [initialData]);
    console.log("initialData dari parent:", initialData);

    const handleCheck = (key: keyof AdmisiTPPRIFormData["documentPatient"]) => {
        setFormData((prev) => ({
            ...prev,
            documentPatient: {
                ...prev.documentPatient,
                [key]: !prev.documentPatient[key]
            }
        }));
    };

    const handleFormDataChange = <
        T extends keyof AdmisiTPPRIFormData,
        K extends keyof AdmisiTPPRIFormData[T]
    >(
        section: T,
        field: K,
        value: AdmisiTPPRIFormData[T][K] extends boolean ? boolean | "toggle" : string | boolean
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

    const addFamilyMember = () => {
        setFormData((prev) => ({
            ...prev,
            healthInformation: [
                ...prev.healthInformation,
                { name: "", family_relationship: "", phone_number: "" },
            ],
        }));
    };

    const updateFamilyMember = (index: number, field: keyof AdmisiTPPRIFormData["healthInformation"][number], value: string) => {
        const updatedMembers = [...formData.healthInformation];
        updatedMembers[index] = {
            ...updatedMembers[index],
            [field]: value,
        };
        setFormData((prev) => ({
            ...prev,
            healthInformation: updatedMembers,
        }));
    };

    const removeFamilyMember = (index: number) => {
        const updatedMembers = formData.healthInformation.filter((_, i) => i !== index);
        setFormData((prev) => ({
            ...prev,
            healthInformation: updatedMembers,
        }));
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
                    <h3 className="font-semibold mb-3 sm:mb-4 ">Data  Rawat Inap</h3>
                    {/* Waktu Admisi */}
                    <div className="mt-4 max-h-[500px] border border-gray-100 rounded-md p-4 shadow-inner">
                        <div className="grid gap-3 sm:gap-4">
                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="" className="sm:mb-0 mb-1">
                                    Ruang Perawatan <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={formData.inpatientRecord.treatment_room}
                                    onValueChange={(val) => handleFormDataChange("inpatientRecord", "treatment_room", val)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Ruang Perawatan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="IGD">IGD</SelectItem>
                                        <SelectItem value="Kelas 1">Kelas 1</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="" className="sm:mb-0 mb-1">
                                    Tarif <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="treatment_rate"
                                    type="string"
                                    value={formData.inpatientRecord.treatment_rate}
                                    onChange={(e) => handleFormDataChange("inpatientRecord", "treatment_rate", e.target.value)}
                                    placeholder="Masukkan tarif"
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="" className="sm:mb-0 mb-1">
                                    Kelas <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={formData.inpatientRecord.treatment_class}
                                    onValueChange={(val) => handleFormDataChange("inpatientRecord", "treatment_class", val)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Kelas" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Kelas 1">Kelas 1</SelectItem>
                                        <SelectItem value="Kelas 2">Kelas 2</SelectItem>
                                        <SelectItem value="Kelas 3">Kelas 3</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="booking" className="sm:mb-0 mb-1">
                                    Booking Perawatan <span className="text-red-500">*</span>
                                </Label>
                                <RadioGroup
                                    id="booking"
                                    value={formData.inpatientRecord.isBooking ? "ya" : "tidak"}
                                    onValueChange={(val) => handleFormDataChange("inpatientRecord", "isBooking", val === "ya")}
                                    className="flex gap-4"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="ya" id="booking-ya" />
                                        <Label htmlFor="booking-ya" className="text-sm">Ya</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="tidak" id="booking-tidak" />
                                        <Label htmlFor="booking-tidak" className="text-sm">Tidak</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="naikKelas" className="sm:mb-0 mb-1">
                                    Naik Kelas <span className="text-red-500">*</span>
                                </Label>
                                <RadioGroup
                                    id="naikKelas"
                                    value={formData.inpatientRecord.isUpgradingClass ? "ya" : "tidak"}
                                    onValueChange={(val) => handleFormDataChange("inpatientRecord", "isUpgradingClass", val === "ya")}
                                    className="flex gap-4"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="ya" id="naik-ya" />
                                        <Label htmlFor="naik-ya" className="text-sm">Ya</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="tidak" id="naik-tidak" />
                                        <Label htmlFor="naik-tidak" className="text-sm">Tidak</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="klinik" className="sm:mb-0 mb-1">
                                    Dokter <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="dokter"
                                    placeholder="Masukkan Nama Dokter"
                                    value={formData.inpatientRecord.doctor}
                                    onChange={(e) => handleFormDataChange("inpatientRecord", "doctor", e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="waktuAdmisi" className="sm:mb-0 mb-1">
                                    Tanggal Masuk <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="waktuAdmisi"
                                    type="date"
                                    value={formData.inpatientRecord.entry_date}
                                    onChange={(e) => handleFormDataChange("inpatientRecord", "entry_date", e.target.value)}
                                    className="sm:max-w-[200px]"
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="entry_type" className="sm:mb-0 mb-1">
                                    Cara Masuk <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={formData.inpatientRecord.entry_type}
                                    onValueChange={(val) => handleFormDataChange("inpatientRecord", "entry_type", val)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Cara Masuk" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="rujukan">Rujukan</SelectItem>
                                        <SelectItem value="mandiri">Mandiri</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="klinik" className="sm:mb-0 mb-1">
                                    Cara Bayar <span className="text-red-500">*</span>
                                </Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="umum">.....</SelectItem>
                                        <SelectItem value="gigi">.....</SelectItem>
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

                    <div className="p-5 sm:p-4">
                        <h3 className="font-semibold mb-3 sm:mb-4 ">Penangung Jawab</h3>
                        <div className="mt-4 max-h-[500px] border-gray-100 rounded-md p-4 shadow-inner">
                            <div className="grid gap-3 sm:gap-4">
                                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                    <Label className="font-medium">Nama PJ<span className="text-red-500">*</span></Label>
                                    <Input id="nik" placeholder="Masukkan NIK/No KTP/No KIA"
                                        value={formData.responsiblePerson.name}
                                        onChange={(e) =>
                                            handleFormDataChange("responsiblePerson", "name", e.target.value)
                                        } />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                    <Label htmlFor="waktuAdmisi" className="sm:mb-0 mb-1">
                                        Jenis Kelamin<span className="text-red-500">*</span>
                                    </Label>
                                    <RadioGroup
                                        id="jeniskelamin"
                                        value={formData.responsiblePerson.gender}
                                        onValueChange={(val) => handleFormDataChange("responsiblePerson", "gender", val)}
                                        className="flex gap-4"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="laki-laki"
                                                id="laki-laki"
                                                className="border-green-500 data-[state=checked]:bg-green-500"
                                            />
                                            <Label htmlFor="laki-laki" className="text-sm">
                                                Laki-laki
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="perempuan"
                                                id="perempuan"
                                                className="border-red-500 data-[state=checked]:bg-red-500"
                                            />
                                            <Label htmlFor="perempuan" className="text-sm">
                                                Perempuan
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                    <Label htmlFor="waktuAdmisi" className="sm:mb-0 mb-1">
                                        Tanggal Lahir <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
                                        <Input
                                            id="tanggal-lahir"
                                            type="date"
                                            value={formData.responsiblePerson.date_of_birth}
                                            onChange={(e) => handleFormDataChange("responsiblePerson", "date_of_birth", e.target.value)}
                                            className="sm:max-w-[200px]"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                    <Label className="font-medium">Nomor Identitas <span className="text-red-500">*</span></Label>
                                    <Input className="" placeholder="Masukkan Nomor Indentitas"
                                        type="string"
                                        value={formData.responsiblePerson.identity_number}
                                        onChange={(e) => handleFormDataChange("responsiblePerson", "identity_number", e.target.value)} />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                    <Label className="font-medium">Telepon <span className="text-red-500">*</span></Label>
                                    <Input className="" placeholder="Masukkan Nomer Telepon"
                                        type="string"
                                        value={formData.responsiblePerson.number_telphone}
                                        onChange={(e) => handleFormDataChange("responsiblePerson", "number_telphone", e.target.value)} />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                    <Label htmlFor="" className="sm:mb-0 mb-1">
                                        Alamat <span className="text-red-500">*</span>
                                    </Label>
                                    <Input className="" placeholder="Masukkan Alamat anda"
                                        type="string"
                                        value={formData.responsiblePerson.address}
                                        onChange={(e) => handleFormDataChange("responsiblePerson", "address", e.target.value)} />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                    <Label className="font-medium">Hubungan<span className="text-red-500">*</span></Label>
                                    <Input className="" placeholder="Masukkan Hubungan"
                                        type="string"
                                        value={formData.responsiblePerson.relationship}
                                        onChange={(e) => handleFormDataChange("responsiblePerson", "relationship", e.target.value)} />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                    <Label className="font-medium">
                                        Hambatan<span className="text-red-500">*</span>
                                    </Label>
                                    <div className="w-full max-w-md justify-center grid grid-rows-3 grid-flow-col gap-1 bg-blue-50 ">
                                        {[
                                            { id: "has_no_impairment", label: "Tidak ada gangguan" },
                                            { id: "has_hearing_impairment", label: "Gangguan Pendengaran" },
                                            { id: "has_emotion_impairment", label: "Gangguan Emosi" },
                                            { id: "has_visual_impairment", label: "Gangguan Penglihatan" },
                                            { id: "has_speech_impairment", label: "Gangguan Bicara" },
                                        ].map((item) => (
                                            <div key={item.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={item.id}
                                                    checked={formData.responsiblePerson[item.id as keyof typeof formData.responsiblePerson] as boolean}
                                                    onCheckedChange={() =>
                                                        handleFormDataChange("responsiblePerson", item.id as keyof typeof formData.responsiblePerson, "toggle")
                                                    }
                                                />
                                                <Label htmlFor={item.id} className="text-sm">
                                                    {item.label}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                    <Label htmlFor="waktuAdmisi" className="sm:mb-0 mb-1">
                                        Baca Tulis <span className="text-red-500">*</span>
                                    </Label>
                                    <RadioGroup
                                        id="bacatulis"
                                        value={formData.responsiblePerson.isLiterate ? "bisa" : "tidak"}
                                        onValueChange={(val) => handleFormDataChange("responsiblePerson", "isLiterate", val === "bisa")}
                                        className="flex gap-4"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="bisa"
                                                id="bisa"
                                                className="border-green-500 data-[state=checked]:bg-green-500"
                                            />
                                            <Label htmlFor="naik-ya" className="text-sm">
                                                Bisa
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="tidak"
                                                id="bisa"
                                                className="border-red-500 data-[state=checked]:bg-red-500"
                                            />
                                            <Label htmlFor="naik-tidak" className="text-sm">
                                                Tidak
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                    <Label htmlFor="waktuAdmisi" className="sm:mb-0 mb-1">
                                        Penerjemah<span className="text-red-500">*</span>
                                    </Label>
                                    <RadioGroup
                                        id="Penerjemah"
                                        value={formData.inpatientRecord.isUpgradingClass ? "butuh" : "tidak"}
                                        onValueChange={(val) => handleFormDataChange("inpatientRecord", "isUpgradingClass", val === "butuh")}
                                        className="flex gap-4"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="butuh"
                                                id="butuh"
                                                className="border-green-500 data-[state=checked]:bg-green-500"
                                            />
                                            <Label htmlFor="butuh" className="text-sm">
                                                Butuh
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="tidak"
                                                id="tidak"
                                                className="border-red-500 data-[state=checked]:bg-red-500"
                                            />
                                            <Label htmlFor="tidak" className="text-sm">
                                                Tidak
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                        </div >
                    </div>
                    <div className="p-5 sm:p-4">
                        <h3 className="font-semibold mb-3 sm:mb-4 ">PENERIMA INFORMASI KESEHATAN PASIEN</h3>
                        <div className="mt-4 max-h-[520px] border-gray-100 rounded-md p-4">
                            <div className="space-y-6">
                                {formData.healthInformation.map((member, index) => (
                                    <div
                                        key={index}
                                        className="border p-4 rounded-md bg-gray-50 space-y-2 relative"
                                    >
                                        <p className="text-sm font-medium mb-2">Penerima {index + 1}</p>
                                        <div className="grid gap-2 sm:grid-cols-3">
                                            <Input
                                                placeholder="Nama Keluarga"
                                                value={member.name}
                                                onChange={(e) =>
                                                    updateFamilyMember(index, "name", e.target.value)
                                                }
                                            />
                                            <Input
                                                placeholder="Hubungan Keluarga"
                                                value={member.family_relationship}
                                                onChange={(e) =>
                                                    updateFamilyMember(index, "family_relationship", e.target.value)
                                                }
                                            />
                                            <Input
                                                placeholder="No HP Keluarga"
                                                value={member.phone_number}
                                                onChange={(e) =>
                                                    updateFamilyMember(index, "phone_number", e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="text-right mt-2">
                                            <button
                                                type="button"
                                                onClick={() => removeFamilyMember(index)}
                                                className="text-sm text-red-600 hover:underline"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addFamilyMember}
                                    className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
                                >
                                    + Tambah Anggota Keluarga
                                </button>
                            </div>
                            {/* <div className="grid gap-3 sm:gap-4">
                                <div className="space-y-4 sm:space-y-6 ">
                                    <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                        <p className="mb-2 text-sm sm:text-base">Penerima 1</p>
                                        <div className="grid gap-2">
                                            <Input placeholder="Nama Keluarga" />
                                            <Input placeholder="Hubungan Keluarga" />
                                            <Input placeholder="No HP Keluarga" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                        <p className="mb-2 text-sm sm:text-base">Penerima 2</p>
                                        <div className="grid gap-2">
                                            <Input placeholder="Nama Keluarga" />
                                            <Input placeholder="Hubungan Keluarga" />
                                            <Input placeholder="No HP Keluarga" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                        <p className="mb-2 text-sm sm:text-base">Penerima 3</p>
                                        <div className="grid gap-2">
                                            <Input placeholder="Nama Keluarga" />
                                            <Input placeholder="Hubungan Keluarga" />
                                            <Input placeholder="No HP Keluarga" />
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div >
                    </div >
                    <div className="p-5 sm:p-4">
                        <h3 className="font-semibold mb-3 sm:mb-4 ">NILAI DAN KEYAKINAN</h3>
                        <div className="mt-4 max-h-[400px] border-gray-100 rounded-md p-4">
                            <div className="grid gap-3 sm:gap-4">
                                <div className="grid gap-2 ">
                                    <div className="flex items-start space-x-2">
                                        <Checkbox id="nilai-1" />
                                        <Label htmlFor="nilai-1" className="text-xs sm:text-sm">
                                            TIDAK ADA
                                        </Label>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <Checkbox id="nilai-2" />
                                        <Label htmlFor="nilai-2" className="text-xs sm:text-sm">
                                            TIDAK MAU PULANG DI HARI TERTENTU
                                        </Label>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <Checkbox id="nilai-3" />
                                        <Label htmlFor="nilai-3" className="text-xs sm:text-sm">
                                            VEGETARIAN
                                        </Label>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <Checkbox id="nilai-4" />
                                        <Label htmlFor="nilai-4" className="text-xs sm:text-sm">
                                            POLA DIET TERTENTU
                                        </Label>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <Checkbox id="nilai-5" />
                                        <Label htmlFor="nilai-5" className="text-xs sm:text-sm">
                                            TIDAK MENGKONSUMSI MAKANAN TERTENTU
                                        </Label>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <Checkbox id="nilai-6" />
                                        <Label htmlFor="nilai-6" className="text-xs sm:text-sm">
                                            MENOLAK TRANSFUSI DARAH
                                        </Label>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <Checkbox id="nilai-7" />
                                        <Label htmlFor="nilai-7" className="text-xs sm:text-sm">
                                            MENOLAK OBAT DENGAN KEGUNAAN MENGANDUNG UNSUR BABI
                                        </Label>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <Checkbox id="nilai-8" />
                                        <Label htmlFor="nilai-8" className="text-xs sm:text-sm">
                                            MENOLAK MUNGKIN PADA HARI BARU LAHIR
                                        </Label>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <Checkbox id="nilai-9" />
                                        <Label htmlFor="nilai-9" className="text-xs sm:text-sm">
                                            DILAKUKAN KHITAN OLEH LAKI-LAKI/ PEREMPUAN
                                        </Label>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <Checkbox id="nilai-10" />
                                        <Label htmlFor="nilai-10" className="text-xs sm:text-sm">
                                            MENOLAK TINDAKAN ITU HARI TERTENTU
                                        </Label>
                                    </div>
                                </div>
                            </div >
                        </div >
                    </div >
                    <div className="p-5 sm:p-4">
                        <h3 className="font-semibold mb-3 sm:mb-4 ">PERMINTAAN PRIVACY</h3>
                        <div className="mt-4 max-h-[400px] border-gray-100 rounded-md p-4">
                            <div className="grid gap-3 sm:gap-4">
                                <div className="grid gap-2">
                                    <div className="flex items-start space-x-2">
                                        <Checkbox id="privacy-1" />
                                        <Label htmlFor="privacy-1" className="text-xs sm:text-sm">
                                            TIDAK ADA
                                        </Label>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <Checkbox id="privacy-2" />
                                        <Label htmlFor="privacy-2" className="text-xs sm:text-sm">
                                            TIDAK MAU DIKETAHUI JIKA DIRAWAT DI RS
                                        </Label>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <Checkbox id="privacy-3" />
                                        <Label htmlFor="privacy-3" className="text-xs sm:text-sm">
                                            MENOLAK DIKUNJUNGI
                                        </Label>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <Checkbox id="privacy-4" />
                                        <Label htmlFor="privacy-4" className="text-xs sm:text-sm">
                                            TIDAK MAU MENERIMA TELEPON DARI JARINGAN RS
                                        </Label>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <Checkbox id="privacy-5" />
                                        <Label htmlFor="privacy-5" className="text-xs sm:text-sm">
                                            TIDAK MENGIZINKAN INFORMASI TENTANG KONDISI KESEHATAN
                                        </Label>
                                    </div>
                                </div >
                            </div >
                        </div >
                    </div >
                    {/* <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                        <Label htmlFor="Catatan" className="sm:mb-0 mb-1">
                            Catatan
                        </Label>
                        <div className="flex gap-2">
                            <Input id="Catatan" placeholder="Catatan" />
                        </div>
                    </div> */}
                    <div className="flex justify-center px-4">
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
                                            checked={formData.documentPatient[item.id as keyof AdmisiTPPRIFormData["documentPatient"]]}
                                            onCheckedChange={() => handleCheck(item.id as keyof AdmisiTPPRIFormData["documentPatient"])}
                                        />
                                        <Label htmlFor={item.id} className="text-sm">{item.label}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </div >
    );
});

PatientAdmissionTPPRIForm.displayName = "PatientAdmissionTPPRIForm";
export default PatientAdmissionTPPRIForm;
