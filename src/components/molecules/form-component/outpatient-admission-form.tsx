"use client";

import {useState} from "react";
import {Calendar, ChevronDown} from "lucide-react";
import {Input} from "@/components/atoms/input";
import {Button} from "@/components/atoms/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/atoms/popover";
import {Calendar as CalendarComponent} from "@/components/atoms/calendar";
import {format} from "date-fns";
import {id} from "date-fns/locale";
import {cn} from "@/lib/utils";
import {RadioGroup, RadioGroupItem} from "@/components/atoms/radio-group";
import {Label} from "@/components/atoms/label";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/atoms/dialog";
import {AlertCircle} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/atoms/tabs";
import Image from "next/image";

// Replace the current interface and add new interfaces for form state
interface PatientData {
    nomorRM: string;
    nama: string;
    nik: string;
    tanggalLahir: string;
    alamat: string;
    noKartuBPJS: string;
}

// Add these new interfaces
interface DocumentSelectionState {
    kartuPasien: boolean;
    lembarPoliklinik: boolean;
    labelKecil: boolean;
    labelBesar: boolean;
    tracerBerkasRM: boolean;
    suratBuktiPelayanan: boolean;
    sep: boolean;
    noAntrian: boolean;
    gelangPasien: boolean;
    generalConsent: boolean;
    kartuKendali: boolean;
}

interface FormState {
    // Visit Data
    admissionDate: Date | null;
    patientType: string;
    clinic: string;
    doctor: string;
    entryMethod: string;
    paymentMethod: string;
    insuranceNumber: string;

    // Referral Data
    referralNumber: string;
    referralDate: Date | null;
    referrer: string;
    ppkCode: string;
    referrerType: string;
    visitNotes: string;

    // SEP Data
    sepNumber: string;
    visitPurpose: string;
    procedure: string;
    assessment: string;
    diagnosis: string;
    isKatarak: string;
    followUpExamination: string;
    notes: string;
    accident: string;

    // Document Selection
    documents: DocumentSelectionState;

    // Add these new properties
    isSubmitted: boolean;
    isSepFilled: boolean;
}

export function OutpatientAdmissionForm() {
    // Replace the current useState imports and state declarations at the top of the component with this more comprehensive state management:

    const [formState, setFormState] = useState<FormState>({
        // Visit Data
        admissionDate: null,
        patientType: "", // For radio buttons (baru/lama)
        clinic: "",
        doctor: "",
        entryMethod: "",
        paymentMethod: "",
        insuranceNumber: "",

        // Referral Data
        referralNumber: "",
        referralDate: null,
        referrer: "",
        ppkCode: "",
        referrerType: "",
        visitNotes: "",

        // SEP Data
        sepNumber: "Automatic",
        visitPurpose: "",
        procedure: "",
        assessment: "",
        diagnosis: "",
        isKatarak: "",
        followUpExamination: "",
        notes: "",
        accident: "",

        // Document Selection
        documents: {
            kartuPasien: false,
            lembarPoliklinik: false,
            labelKecil: false,
            labelBesar: false,
            tracerBerkasRM: false,
            suratBuktiPelayanan: false,
            sep: false,
            noAntrian: false,
            gelangPasien: false,
            generalConsent: false,
            kartuKendali: false,
        },

        // Add these new properties
        isSubmitted: false,
        isSepFilled: false,
    });

    // Add these new states after the existing useState declarations
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [queueNumber, setQueueNumber] = useState("G011");
    const [selectedClinicName, setSelectedClinicName] = useState("Gigi dan Mulut");
    const [showFingerprintModal, setShowFingerprintModal] = useState(false);
    const [showReferralModal, setShowReferralModal] = useState(false);
    const [fingerprintHover, setFingerprintHover] = useState(false);
    const [showFingerprintSuccess, setShowFingerprintSuccess] = useState(false);

    // Add a reset function that will be called when the Batal button is clicked
    const resetForm = () => {
        setFormState({
            // Visit Data
            admissionDate: null,
            patientType: "",
            clinic: "",
            doctor: "",
            entryMethod: "",
            paymentMethod: "",
            insuranceNumber: "",

            // Referral Data
            referralNumber: "",
            referralDate: null,
            referrer: "",
            ppkCode: "",
            referrerType: "",
            visitNotes: "",

            // SEP Data
            sepNumber: "Automatic",
            visitPurpose: "",
            procedure: "",
            assessment: "",
            diagnosis: "",
            isKatarak: "",
            followUpExamination: "",
            notes: "",
            accident: "",

            // Document Selection
            documents: {
                kartuPasien: false,
                lembarPoliklinik: false,
                labelKecil: false,
                labelBesar: false,
                tracerBerkasRM: false,
                suratBuktiPelayanan: false,
                sep: false,
                noAntrian: false,
                gelangPasien: false,
                generalConsent: false,
                kartuKendali: false,
            },
            isSubmitted: false,
            isSepFilled: false,
        });
    };

    // Helper function to update form state - Fix the TypeScript errors here
    const updateFormState = (field: keyof Omit<FormState, "documents">, value: string | Date | null) => {
        setFormState((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Helper function to update document selection - Fix the TypeScript errors here
    const updateDocumentSelection = (document: keyof DocumentSelectionState, checked: boolean) => {
        setFormState((prev) => ({
            ...prev,
            documents: {
                ...prev.documents,
                [document]: checked,
            },
        }));
    };

    const [patientData] = useState<PatientData>({
        nomorRM: "00000123",
        nama: "DINA",
        nik: "3323071508000008",
        tanggalLahir: "15-07-1985",
        alamat: "POGUNG KIDUL NO 90 RT/RW 001/002, CATURTUNGGAL, DEPOK, SLEMAN, DIY",
        noKartuBPJS: "0000889999899",
    });

    // Add this function after the existing state declarations but before the return statement
    const areAllRequiredFieldsFilled = () => {
        // Check all required fields
        return (
            formState.admissionDate !== null &&
            formState.patientType !== "" &&
            formState.clinic !== "" &&
            formState.doctor !== "" &&
            formState.entryMethod !== "" &&
            formState.paymentMethod !== "" &&
            formState.insuranceNumber !== "" &&
            formState.referralNumber !== "" &&
            formState.referralDate !== null &&
            formState.referrer !== "" &&
            formState.ppkCode !== "" &&
            formState.referrerType !== "" &&
            formState.visitNotes !== "" &&
            formState.isSepFilled &&
            formState.diagnosis !== "" &&
            formState.isKatarak !== "" &&
            formState.followUpExamination !== "" &&
            formState.notes !== "" &&
            formState.accident !== ""
        );
    };

    // Replace the handleSubmit function with this updated version
    const handleSubmit = () => {
        // Check if all required fields are filled
        if (!areAllRequiredFieldsFilled()) {
            // Show an alert or handle the validation error
            alert("Mohon lengkapi semua field yang wajib diisi (bertanda *)");
            return;
        }

        // For now, we'll just show the success modal
        setShowSuccessModal(true);

        // Update the clinic name based on the selected clinic
        if (formState.clinic === "gigi") {
            setSelectedClinicName("Gigi dan Mulut");
            setQueueNumber("G011");
        } else if (formState.clinic === "mata") {
            setSelectedClinicName("Mata");
            setQueueNumber("M007");
        } else if (formState.clinic === "umum") {
            setSelectedClinicName("Umum");
            setQueueNumber("U023");
        }
    };

    // Add this function before the return statement
    const handleModalClose = () => {
        setShowSuccessModal(false);
        setFormState((prev) => ({
            ...prev,
            isSubmitted: true,
        }));
    };

    // Add this function to handle the SEP check button click
    const handleSepCheck = () => {
        setShowFingerprintModal(true);
    };

    // Add this function to handle fingerprint click
    const handleFingerprintClick = () => {
        setShowFingerprintSuccess(true);
        setTimeout(() => {
            setShowFingerprintSuccess(false);
            setShowFingerprintModal(false);
            setShowReferralModal(true);
        }, 1500);
    };

    // Add this function to handle referral selection
    const handleReferralSelect = () => {
        setShowReferralModal(false);
        setFormState((prev) => ({
            ...prev,
            sepNumber: "0001234567890",
            visitPurpose: "Kontrol",
            procedure: "prosedur1",
            assessment: "assessment1",
            diagnosis: "Gingivitis Acute",
            isKatarak: "tidak",
            followUpExamination: "7 hari",
            notes: "Pasien rujukan dari Puskesmas",
            accident: "Bukan Kecelakaan",
            isSepFilled: true,
        }));
    };

    const [tabValue, setTabValue] = useState("pcare");

    return (
        <div className="w-full">
            {/* Patient Data Section */}
            <div className="mb-4 rounded-md overflow-hidden">
                <div className="bg-blue-500 text-white py-2 px-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <h2 className="font-medium">DATA PASIEN</h2>
                </div>

                <div className="bg-blue-100 p-4">
                    <div className="grid grid-cols-[120px,1fr] sm:grid-cols-[150px,1fr] gap-y-2 items-center">
                        <div className="text-right pr-4 font-medium">Nomor RM</div>
                        <div>: {patientData.nomorRM}</div>

                        <div className="text-right pr-4 font-medium">Nama</div>
                        <div>: {patientData.nama}</div>

                        <div className="text-right pr-4 font-medium">NIK</div>
                        <div>: {patientData.nik}</div>

                        <div className="text-right pr-4 font-medium">Tanggal Lahir</div>
                        <div>: {patientData.tanggalLahir}</div>

                        <div className="text-right pr-4 font-medium">Alamat</div>
                        <div>: {patientData.alamat}</div>

                        <div className="text-right pr-4 font-medium">No. Kartu BPJS</div>
                        <div>: {patientData.noKartuBPJS}</div>
                    </div>
                </div>
            </div>

            {/* Admission Form Section */}
            <div className="mb-4 rounded-md overflow-hidden">
                <div className="bg-blue-500 text-white py-2 px-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H15"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5C15 5.53043 14.7893 6.03914 14.4142 6.41421C14.0391 6.78929 13.5304 7 13 7H11C10.4696 7 9.96086 6.78929 9.58579 6.41421C9.21071 6.03914 9 5.53043 9 5Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12 11H12.01"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12 15H12.01"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <h2 className="font-medium">FORMULIR ADMISI</h2>
                </div>

                <div className="bg-white p-4 border border-gray-200">
                    <div className="bg-red-100 text-red-600 p-2 mb-4 text-sm text-center">
                        <div className="font-bold">TANGGAL TERAKHIR BERKUNJUNG: 16 JULI 2022</div>
                        <div>BELUM ADA DATA RESEP/LAB</div>
                    </div>

                    {/* Visit Data - Added border and shadow */}
                    <div className="mb-6 border border-gray-200 rounded-md p-4 shadow-md">
                        <h3 className="font-semibold mb-3">Data Kunjungan</h3>
                        <div className="grid grid-cols-[150px,1fr] gap-y-4 items-center">
                            <div className="text-right pr-4 font-medium">
                                Waktu Admisi <span className="text-red-500">*</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                {!formState.isSubmitted ? (
                                    <>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] justify-start text-left font-normal",
                                                        !formState.admissionDate && "text-muted-foreground"
                                                    )}
                                                >
                                                    {formState.admissionDate ? (
                                                        format(formState.admissionDate, "dd/MM/yy", {locale: id})
                                                    ) : (
                                                        <span>dd/mm/yy</span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <CalendarComponent
                                                    mode="single"
                                                    selected={formState.admissionDate || undefined}
                                                    onSelect={(date) => updateFormState("admissionDate", date || null)}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" size="icon" className="h-9 w-9">
                                                    <Calendar className="h-4 w-4" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <CalendarComponent
                                                    mode="single"
                                                    selected={formState.admissionDate || undefined}
                                                    onSelect={(date) => updateFormState("admissionDate", date || null)}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </>
                                ) : (
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">
                                        {formState.admissionDate
                                            ? format(formState.admissionDate, "dd/MM/yy", {locale: id})
                                            : "-"}
                                    </div>
                                )}
                                <div className="flex items-center gap-2 ml-2">
                                    {!formState.isSubmitted ? (
                                        <RadioGroup
                                            className="flex gap-4"
                                            value={formState.patientType}
                                            onValueChange={(value) => updateFormState("patientType", value)}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="baru" id="baru" />
                                                <Label htmlFor="baru">Baru</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="lama" id="lama" />
                                                <Label htmlFor="lama">Lama</Label>
                                            </div>
                                        </RadioGroup>
                                    ) : (
                                        <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">
                                            {formState.patientType === "baru" ? "Baru" : "Lama"}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="text-right pr-4 font-medium">
                                Klinik <span className="text-red-500">*</span>
                            </div>
                            <div className="relative">
                                {!formState.isSubmitted ? (
                                    <div className="flex">
                                        <div className="relative flex-1">
                                            <select
                                                className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
                                                value={formState.clinic}
                                                onChange={(e) => updateFormState("clinic", e.target.value)}
                                            >
                                                <option value="">-- Pilih Klinik --</option>
                                                <option value="umum">Poli Umum</option>
                                                <option value="gigi">Poli Gigi</option>
                                                <option value="mata">Poli Mata</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">
                                        {formState.clinic === "umum"
                                            ? "Poli Umum"
                                            : formState.clinic === "gigi"
                                            ? "Poli Gigi"
                                            : formState.clinic === "mata"
                                            ? "Poli Mata"
                                            : "-"}
                                    </div>
                                )}
                            </div>

                            <div className="text-right pr-4 font-medium">
                                Dokter Klinik <span className="text-red-500">*</span>
                            </div>
                            <div className="relative">
                                {!formState.isSubmitted ? (
                                    <div className="flex">
                                        <div className="relative flex-1">
                                            <select
                                                className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
                                                value={formState.doctor}
                                                onChange={(e) => updateFormState("doctor", e.target.value)}
                                            >
                                                <option value="">-- Pilih Dokter Klinik --</option>
                                                <option value="dr1">dr. Andi</option>
                                                <option value="dr2">dr. Budi</option>
                                                <option value="dr3">dr. Citra</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">
                                        {formState.doctor === "dr1"
                                            ? "dr. Andi"
                                            : formState.doctor === "dr2"
                                            ? "dr. Budi"
                                            : formState.doctor === "dr3"
                                            ? "dr. Citra"
                                            : "-"}
                                    </div>
                                )}
                            </div>

                            <div className="text-right pr-4 font-medium">
                                Cara Masuk <span className="text-red-500">*</span>
                            </div>
                            <div className="relative">
                                {!formState.isSubmitted ? (
                                    <div className="flex">
                                        <div className="relative flex-1">
                                            <select
                                                className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
                                                value={formState.entryMethod}
                                                onChange={(e) => updateFormState("entryMethod", e.target.value)}
                                            >
                                                <option value="">-- Pilih Cara Masuk --</option>
                                                <option value="Rujukan/ Datang Sendiri">Rujukan/ Datang Sendiri</option>
                                                <option value="Rujukan">Rujukan</option>
                                                <option value="Datang Sendiri">Datang Sendiri</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">
                                        {formState.entryMethod || "-"}
                                    </div>
                                )}
                            </div>

                            <div className="text-right pr-4 font-medium">
                                Cara Pembayaran <span className="text-red-500">*</span>
                            </div>
                            <div className="relative">
                                {!formState.isSubmitted ? (
                                    <div className="flex">
                                        <div className="relative flex-1">
                                            <select
                                                className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
                                                value={formState.paymentMethod}
                                                onChange={(e) => updateFormState("paymentMethod", e.target.value)}
                                            >
                                                <option value="">-- Pilih Cara Pembayaran --</option>
                                                <option value="BPJS">BPJS</option>
                                                <option value="Asuransi">Asuransi</option>
                                                <option value="Mandiri">Mandiri</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">
                                        {formState.paymentMethod || "-"}
                                    </div>
                                )}
                            </div>

                            <div className="text-right pr-4 font-medium">
                                No Asuransi <span className="text-red-500">*</span>
                            </div>
                            <div className="flex gap-2">
                                {!formState.isSubmitted ? (
                                    <>
                                        <Input
                                            className="w-full"
                                            value={formState.insuranceNumber}
                                            onChange={(e) => updateFormState("insuranceNumber", e.target.value)}
                                            placeholder="Masukkan nomor asuransi"
                                        />
                                        <Button className="bg-blue-500 hover:bg-blue-600 text-white">Cek</Button>
                                    </>
                                ) : (
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50 w-full">
                                        {formState.insuranceNumber || "-"}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Referral Data - Added border and shadow */}
                    <div className="mb-6 border border-gray-200 rounded-md p-4 shadow-md">
                        <h3 className="font-semibold mb-3">Data Rujukan</h3>
                        {!formState.isSubmitted && (
                            <div className="border border-gray-300 p-4 rounded-md mb-4 bg-blue-50">
                                <div className="text-center font-semibold mb-2">Ambil Rujukan Pasien/ RS</div>
                                <div className="flex gap-2 justify-center">
                                    <Input
                                        className="max-w-[300px]"
                                        placeholder="Nomor Rujukan"
                                        value={formState.referralNumber}
                                        onChange={(e) => updateFormState("referralNumber", e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-[150px,1fr] gap-y-4 items-center">
                            <div className="text-right pr-4 font-medium">
                                Nomor Rujukan <span className="text-red-500">*</span>
                            </div>
                            <div className="flex gap-2">
                                {!formState.isSubmitted ? (
                                    <>
                                        <Input
                                            className="w-full"
                                            value={formState.referralNumber}
                                            onChange={(e) => updateFormState("referralNumber", e.target.value)}
                                            placeholder="Masukkan nomor rujukan"
                                        />
                                        <Button className="bg-blue-500 hover:bg-blue-600 text-white">Cek</Button>
                                    </>
                                ) : (
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50 w-full">
                                        {formState.referralNumber || "-"}
                                    </div>
                                )}
                            </div>

                            <div className="text-right pr-4 font-medium">
                                Tanggal Rujukan <span className="text-red-500">*</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                {!formState.isSubmitted ? (
                                    <>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] justify-start text-left font-normal",
                                                        !formState.referralDate && "text-muted-foreground"
                                                    )}
                                                >
                                                    {formState.referralDate ? (
                                                        format(formState.referralDate, "dd/MM/yy", {locale: id})
                                                    ) : (
                                                        <span>dd/mm/yy</span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <CalendarComponent
                                                    mode="single"
                                                    selected={formState.referralDate || undefined}
                                                    onSelect={(date) => updateFormState("referralDate", date || null)}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" size="icon" className="h-9 w-9">
                                                    <Calendar className="h-4 w-4" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <CalendarComponent
                                                    mode="single"
                                                    selected={formState.referralDate || undefined}
                                                    onSelect={(date) => updateFormState("referralDate", date || null)}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </>
                                ) : (
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">
                                        {formState.referralDate
                                            ? format(formState.referralDate, "dd/MM/yy", {locale: id})
                                            : "-"}
                                    </div>
                                )}
                            </div>

                            <div className="text-right pr-4 font-medium">
                                Perujuk <span className="text-red-500">*</span>
                            </div>
                            {!formState.isSubmitted ? (
                                <Input
                                    className="w-full"
                                    placeholder="Masukkan perujuk"
                                    value={formState.referrer}
                                    onChange={(e) => updateFormState("referrer", e.target.value)}
                                />
                            ) : (
                                <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50 w-full">
                                    {formState.referrer || "-"}
                                </div>
                            )}

                            <div className="text-right pr-4 font-medium">
                                Kode PPK (BPJS) <span className="text-red-500">*</span>
                            </div>
                            {!formState.isSubmitted ? (
                                <Input
                                    className="w-full"
                                    placeholder="Masukkan kode PPK"
                                    value={formState.ppkCode}
                                    onChange={(e) => updateFormState("ppkCode", e.target.value)}
                                />
                            ) : (
                                <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50 w-full">
                                    {formState.ppkCode || "-"}
                                </div>
                            )}

                            <div className="text-right pr-4 font-medium">
                                Jenis Perujuk <span className="text-red-500">*</span>
                            </div>
                            <div className="relative">
                                {!formState.isSubmitted ? (
                                    <div className="flex">
                                        <div className="relative flex-1">
                                            <select
                                                className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
                                                value={formState.referrerType}
                                                onChange={(e) => updateFormState("referrerType", e.target.value)}
                                            >
                                                <option value="">-- Pilih Jenis Perujuk --</option>
                                                <option value="Rumah Sakit">Rumah Sakit</option>
                                                <option value="Puskesmas">Puskesmas</option>
                                                <option value="Klinik">Klinik</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">
                                        {formState.referrerType || "-"}
                                    </div>
                                )}
                            </div>

                            <div className="text-right pr-4 font-medium">
                                Catatan Kunjungan <span className="text-red-500">*</span>
                            </div>
                            {!formState.isSubmitted ? (
                                <Input
                                    className="w-full"
                                    value={formState.visitNotes}
                                    onChange={(e) => updateFormState("visitNotes", e.target.value)}
                                    placeholder="Masukkan catatan kunjungan"
                                />
                            ) : (
                                <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50 w-full">
                                    {formState.visitNotes || "-"}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* SEP Data - Added border and shadow */}
                    <div className="border border-gray-200 rounded-md p-4 shadow-md">
                        <h3 className="font-semibold mb-3">Data SEP</h3>
                        <div className="grid grid-cols-[150px,1fr] gap-y-4 items-center">
                            <div className="text-right pr-4 font-medium">
                                No SEP <span className="text-red-500">*</span>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-full h-9 rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm text-muted-foreground">
                                    {formState.sepNumber}
                                </div>
                                {!formState.isSubmitted && !formState.isSepFilled && (
                                    <Button
                                        className="bg-blue-500 hover:bg-blue-600 text-white"
                                        onClick={handleSepCheck}
                                    >
                                        Cek
                                    </Button>
                                )}
                            </div>

                            {formState.isSepFilled || formState.isSubmitted ? (
                                <>
                                    <div className="text-right pr-4 font-medium">
                                        Tujuan Kunjungan <span className="text-red-500">*</span>
                                    </div>
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50 w-full">
                                        {formState.visitPurpose}
                                    </div>

                                    <div className="text-right pr-4 font-medium">
                                        Prosedur <span className="text-red-500">*</span>
                                    </div>
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50 w-full">
                                        {formState.procedure === "prosedur1"
                                            ? "Prosedur 1"
                                            : formState.procedure === "prosedur2"
                                            ? "Prosedur 2"
                                            : "-"}
                                    </div>

                                    <div className="text-right pr-4 font-medium">
                                        Assessment <span className="text-red-500">*</span>
                                    </div>
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50 w-full">
                                        {formState.assessment === "assessment1"
                                            ? "Assessment 1"
                                            : formState.assessment === "assessment2"
                                            ? "Assessment 2"
                                            : "-"}
                                    </div>

                                    <div className="text-right pr-4 font-medium">
                                        Diagnosis Awal <span className="text-red-500">*</span>
                                    </div>
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50 w-full">
                                        {formState.diagnosis}
                                    </div>

                                    <div className="text-right pr-4 font-medium">
                                        Katarak <span className="text-red-500">*</span>
                                    </div>
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50 w-full">
                                        {formState.isKatarak === "ya" ? "Ya" : "Tidak"}
                                    </div>

                                    <div className="text-right pr-4 font-medium">
                                        Follow Up <span className="text-red-500">*</span>
                                    </div>
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50 w-full">
                                        {formState.followUpExamination}
                                    </div>

                                    <div className="text-right pr-4 font-medium">
                                        Catatan <span className="text-red-500">*</span>
                                    </div>
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50 w-full">
                                        {formState.notes}
                                    </div>

                                    <div className="text-right pr-4 font-medium">
                                        Kecelakaan <span className="text-red-500">*</span>
                                    </div>
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50 w-full">
                                        {formState.accident}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="text-right pr-4 font-medium">
                                        Tujuan Kunjungan <span className="text-red-500">*</span>
                                    </div>
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-100 text-gray-400 w-full">
                                        Data akan terisi otomatis setelah verifikasi
                                    </div>

                                    <div className="text-right pr-4 font-medium">
                                        Prosedur <span className="text-red-500">*</span>
                                    </div>
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-100 text-gray-400 w-full">
                                        Data akan terisi otomatis setelah verifikasi
                                    </div>

                                    <div className="text-right pr-4 font-medium">
                                        Assessment <span className="text-red-500">*</span>
                                    </div>
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-100 text-gray-400 w-full">
                                        Data akan terisi otomatis setelah verifikasi
                                    </div>

                                    <div className="text-right pr-4 font-medium">
                                        Diagnosis Awal <span className="text-red-500">*</span>
                                    </div>
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-100 text-gray-400 w-full">
                                        Data akan terisi otomatis setelah verifikasi
                                    </div>

                                    <div className="text-right pr-4 font-medium">
                                        Katarak <span className="text-red-500">*</span>
                                    </div>
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-100 text-gray-400 w-full">
                                        Data akan terisi otomatis setelah verifikasi
                                    </div>

                                    <div className="text-right pr-4 font-medium">
                                        Follow Up <span className="text-red-500">*</span>
                                    </div>
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-100 text-gray-400 w-full">
                                        Data akan terisi otomatis setelah verifikasi
                                    </div>

                                    <div className="text-right pr-4 font-medium">
                                        Catatan <span className="text-red-500">*</span>
                                    </div>
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-100 text-gray-400 w-full">
                                        Data akan terisi otomatis setelah verifikasi
                                    </div>

                                    <div className="text-right pr-4 font-medium">
                                        Kecelakaan <span className="text-red-500">*</span>
                                    </div>
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-100 text-gray-400 w-full">
                                        Data akan terisi otomatis setelah verifikasi
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    {/* Document Selection Section */}
                    <div className="border border-gray-200 rounded-md p-4 shadow-md mt-6 bg-blue-50">
                        <h3 className="font-semibold mb-3">Cetak Dokumen</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* Column 1 */}
                            <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="kartu-pasien"
                                        className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                        checked={formState.documents.kartuPasien}
                                        onChange={(e) => updateDocumentSelection("kartuPasien", e.target.checked)}
                                        disabled={formState.isSubmitted}
                                    />
                                    <label htmlFor="kartu-pasien" className="text-sm font-medium">
                                        Kartu Pasien
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="lembar-poliklinik"
                                        className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                        checked={formState.documents.lembarPoliklinik}
                                        onChange={(e) => updateDocumentSelection("lembarPoliklinik", e.target.checked)}
                                        disabled={formState.isSubmitted}
                                    />
                                    <label htmlFor="lembar-poliklinik" className="text-sm font-medium">
                                        Lembar Poliklinik
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="label-kecil"
                                        className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                        checked={formState.documents.labelKecil}
                                        onChange={(e) => updateDocumentSelection("labelKecil", e.target.checked)}
                                        disabled={formState.isSubmitted}
                                    />
                                    <label htmlFor="label-kecil" className="text-sm font-medium">
                                        Label Kecil
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="label-besar"
                                        className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                        checked={formState.documents.labelBesar}
                                        onChange={(e) => updateDocumentSelection("labelBesar", e.target.checked)}
                                        disabled={formState.isSubmitted}
                                    />
                                    <label htmlFor="label-besar" className="text-sm font-medium">
                                        Label Besar
                                    </label>
                                </div>
                            </div>

                            {/* Column 2 */}
                            <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="tracer-berkas"
                                        className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                        checked={formState.documents.tracerBerkasRM}
                                        onChange={(e) => updateDocumentSelection("tracerBerkasRM", e.target.checked)}
                                        disabled={formState.isSubmitted}
                                    />
                                    <label htmlFor="tracer-berkas" className="text-sm font-medium">
                                        Tracer Berkas RM
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="surat-bukti"
                                        className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                        checked={formState.documents.suratBuktiPelayanan}
                                        onChange={(e) =>
                                            updateDocumentSelection("suratBuktiPelayanan", e.target.checked)
                                        }
                                        disabled={formState.isSubmitted}
                                    />
                                    <label htmlFor="surat-bukti" className="text-sm font-medium">
                                        Surat Bukti Pelayanan
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="sep"
                                        className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                        checked={formState.documents.sep}
                                        onChange={(e) => updateDocumentSelection("sep", e.target.checked)}
                                        disabled={formState.isSubmitted}
                                    />
                                    <label htmlFor="sep" className="text-sm font-medium">
                                        SEP
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="no-antrian"
                                        className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                        checked={formState.documents.noAntrian}
                                        onChange={(e) => updateDocumentSelection("noAntrian", e.target.checked)}
                                        disabled={formState.isSubmitted}
                                    />
                                    <label htmlFor="no-antrian" className="text-sm font-medium">
                                        No Antrian
                                    </label>
                                </div>
                            </div>

                            {/* Column 3 */}
                            <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="gelang-pasien"
                                        className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                        checked={formState.documents.gelangPasien}
                                        onChange={(e) => updateDocumentSelection("gelangPasien", e.target.checked)}
                                        disabled={formState.isSubmitted}
                                    />
                                    <label htmlFor="gelang-pasien" className="text-sm font-medium">
                                        Gelang Pasien
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="general-consent"
                                        className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                        checked={formState.documents.generalConsent}
                                        onChange={(e) => updateDocumentSelection("generalConsent", e.target.checked)}
                                        disabled={formState.isSubmitted}
                                    />
                                    <label htmlFor="general-consent" className="text-sm font-medium">
                                        General Consent
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="kartu-kendali"
                                        className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                        checked={formState.documents.kartuKendali}
                                        onChange={(e) => updateDocumentSelection("kartuKendali", e.target.checked)}
                                        disabled={formState.isSubmitted}
                                    />
                                    <label htmlFor="kartu-kendali" className="text-sm font-medium">
                                        Kartu Kendali
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Action Buttons */}
                    {!formState.isSubmitted ? (
                        <div className="flex justify-end mt-6 space-x-4">
                            <Button
                                variant="outline"
                                className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                                onClick={resetForm}
                            >
                                Batal
                            </Button>
                            <Button
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                                onClick={handleSubmit}
                                disabled={!areAllRequiredFieldsFilled()}
                            >
                                Simpan
                            </Button>
                        </div>
                    ) : (
                        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
                            <div className="flex items-center gap-2 text-green-700">
                                <AlertCircle className="h-5 w-5" />
                                <p className="font-medium">
                                    Nomor antrian klinik {selectedClinicName}{" "}
                                    <span className="text-red-600 font-bold text-xl">{queueNumber}</span>
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Fingerprint Modal */}
                    <Dialog open={showFingerprintModal} onOpenChange={setShowFingerprintModal}>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle className="text-center">BUKTI KEHADIRAN PESERTA BPJS</DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                                <div className="flex flex-col items-center">
                                    <div className="grid grid-cols-[100px,1fr] gap-y-1 mb-4 w-full">
                                        <div className="text-right pr-2">Nomor BPJS</div>
                                        <div className="bg-blue-100 px-2 py-1 rounded">0000088899989</div>
                                    </div>

                                    {showFingerprintSuccess ? (
                                        <div className="bg-green-100 text-green-700 p-4 rounded-md text-center font-medium mb-4 w-full">
                                            Fingerprint berhasil
                                        </div>
                                    ) : null}

                                    <div className="flex gap-8 items-center">
                                        <div
                                            className={`cursor-pointer transition-colors duration-200 ${
                                                fingerprintHover ? "bg-blue-100 rounded-lg p-2" : ""
                                            }`}
                                            onClick={handleFingerprintClick}
                                            onMouseEnter={() => setFingerprintHover(true)}
                                            onMouseLeave={() => setFingerprintHover(false)}
                                        >
                                            <Image
                                                src="/assets/sidik-jari.png"
                                                alt="Fingerprint"
                                                width={128}
                                                height={128}
                                                className="object-contain"
                                            />
                                        </div>

                                        <div className="grid grid-cols-[80px,1fr] gap-y-1 text-sm">
                                            <div>Nama</div>
                                            <div>: DINA</div>
                                            <div>Alamat</div>
                                            <div>: JL. MERDEKA NO. 50 1/2 CATUR TUNGGAL, DEPOK, KAB. SLEMAN</div>
                                            <div>Tanggal</div>
                                            <div>: 14-07-1990</div>
                                            <div>NIK</div>
                                            <div>: 3323071508000008</div>
                                            <div>Faskes</div>
                                            <div>: DEPOK</div>
                                        </div>
                                    </div>

                                    <div className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md text-center font-medium">
                                        Klik sidik jari
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* Referral Selection Modal */}
                    <Dialog open={showReferralModal} onOpenChange={setShowReferralModal}>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle className="text-center">Pilih Rujukan</DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                                <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger
                                            value="pcare"
                                            className="bg-blue-500 text-white data-[state=active]:bg-blue-700"
                                        >
                                            Pcare
                                        </TabsTrigger>
                                        <TabsTrigger value="rs" className="bg-blue-100 data-[state=active]:bg-blue-300">
                                            Rumah Sakit Lain
                                        </TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="pcare" className="mt-4 border rounded-md p-4">
                                        <div className="font-semibold mb-2">Rujukan ke Klinik Gigi dan MULUT</div>
                                        <div className="grid grid-cols-[80px,1fr] gap-y-1 text-sm mb-4">
                                            <div>Nama</div>
                                            <div>: Dina</div>
                                            <div>Alamat</div>
                                            <div>: Jl. Merdeka No. 50 1/2 Catur Tunggal, Depok, Sleman, DIY</div>
                                            <div>Tanggal</div>
                                            <div>: 14-07-1990</div>
                                            <div>NIK</div>
                                            <div>: 3323071508000008</div>
                                            <div>Faskes 1</div>
                                            <div>: Depok</div>
                                            <div>Diagnosis</div>
                                            <div>: Gingivitis Acute</div>
                                            <div>Kode ICD</div>
                                            <div>: K05.0</div>
                                        </div>
                                        <div className="flex justify-end">
                                            <Button
                                                className="bg-blue-500 hover:bg-blue-600 text-white"
                                                onClick={handleReferralSelect}
                                            >
                                                Pilih
                                            </Button>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="rs" className="mt-4 border rounded-md p-4">
                                        <div className="font-semibold mb-2">Rujukan ke Klinik Gigi dan MULUT</div>
                                        <div className="grid grid-cols-[80px,1fr] gap-y-1 text-sm mb-4">
                                            <div>Nama</div>
                                            <div>: Dina</div>
                                            <div>Alamat</div>
                                            <div>: Jl. Merdeka No. 50 1/2 Catur Tunggal, Depok, Sleman, DIY</div>
                                            <div>Tanggal</div>
                                            <div>: 14-07-1990</div>
                                            <div>NIK</div>
                                            <div>: 3323071508000008</div>
                                            <div>Faskes 1</div>
                                            <div>: Depok</div>
                                            <div>Diagnosis</div>
                                            <div>: Gingivitis Acute</div>
                                            <div>Kode ICD</div>
                                            <div>: K05.0</div>
                                        </div>
                                        <div className="flex justify-end">
                                            <Button
                                                className="bg-blue-500 hover:bg-blue-600 text-white"
                                                onClick={handleReferralSelect}
                                            >
                                                Pilih
                                            </Button>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* Success Modal */}
                    <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle className="text-center">Pendaftaran berhasil disimpan</DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                                <p className="text-center">
                                    Nomor antrian klinik {selectedClinicName}{" "}
                                    <span className="text-red-600 font-bold text-xl">{queueNumber}</span>
                                </p>
                            </div>
                            <DialogFooter className="sm:justify-center">
                                <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleModalClose}>
                                    OK
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
