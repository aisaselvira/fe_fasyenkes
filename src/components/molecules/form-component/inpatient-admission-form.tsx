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
import {Checkbox} from "@/components/atoms/checkbox";

// Interface for inpatient form state
interface InpatientFormState {
    // Data Rawat Inap
    ruangPerawatan: string;
    tarif: string;
    kelasTarif: string;
    bookingPerawatan: "ya" | "tidak" | "";
    naikKelas: "ya" | "tidak" | "";
    dokterDPJP: string;
    tanggalMasuk: Date | null;
    caraMasuk: string;
    caraBayar: string;
    noAsuransi: string;

    // Penanggung Jawab
    namaPJ: string;
    jenisKelamin: "laki-laki" | "perempuan" | "";
    tanggalLahir: Date | null;
    nomorIdentitas: string;
    telepon: string;
    alamat: string;
    hubungan: string;
    hambatan: {
        tidakAdaGangguan: boolean;
        gangguanPenglihatan: boolean;
        gangguanPendengaran: boolean;
        gangguanBicara: boolean;
        gangguanEmosi: boolean;
    };
    bacaTulis: "bisa" | "tidak" | "";
    penerjemahan: "butuh" | "tidak" | "";

    // Penerima Informasi
    penerima: Array<{
        nama: string;
        hubungan: string;
        noHP: string;
    }>;
}

// Patient data interface
interface PatientData {
    nomorRM: string;
    nama: string;
    nik: string;
    tanggalLahir: string;
    alamat: string;
    noKartuBPJS: string;
}

export function InpatientAdmissionForm() {
    // Initialize form state
    const [formState, setFormState] = useState<InpatientFormState>({
        // Data Rawat Inap
        ruangPerawatan: "",
        tarif: "",
        kelasTarif: "",
        bookingPerawatan: "",
        naikKelas: "",
        dokterDPJP: "",
        tanggalMasuk: null,
        caraMasuk: "",
        caraBayar: "",
        noAsuransi: "",

        // Penanggung Jawab
        namaPJ: "",
        jenisKelamin: "",
        tanggalLahir: null,
        nomorIdentitas: "",
        telepon: "",
        alamat: "",
        hubungan: "",
        hambatan: {
            tidakAdaGangguan: false,
            gangguanPenglihatan: false,
            gangguanPendengaran: false,
            gangguanBicara: false,
            gangguanEmosi: false,
        },
        bacaTulis: "",
        penerjemahan: "",

        // Penerima Informasi
        penerima: [
            {nama: "", hubungan: "", noHP: ""},
            {nama: "", hubungan: "", noHP: ""},
            {nama: "", hubungan: "", noHP: ""},
        ],
    });

    // Sample patient data
    const [patientData] = useState<PatientData>({
        nomorRM: "00000123",
        nama: "DINA",
        nik: "3323071508000008",
        tanggalLahir: "15-07-1985",
        alamat: "POGUNG KIDUL NO 90 RT/RW 001/002, CATURTUNGGAL, DEPOK, SLEMAN, DIY",
        noKartuBPJS: "0000889999899",
    });

    // Helper function to update form state
    const updateFormState = <K extends keyof Omit<InpatientFormState, "hambatan" | "penerima">>(
        field: K,
        value: InpatientFormState[K]
    ) => {
        setFormState((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Helper function to update hambatan checkboxes
    const updateHambatan = (field: keyof InpatientFormState["hambatan"], checked: boolean) => {
        setFormState((prev) => ({
            ...prev,
            hambatan: {
                ...prev.hambatan,
                [field]: checked,
            },
        }));
    };

    // Helper function to update penerima fields
    const updatePenerima = (index: number, field: keyof InpatientFormState["penerima"][0], value: string) => {
        setFormState((prev) => {
            const newPenerima = [...prev.penerima];
            newPenerima[index] = {
                ...newPenerima[index],
                [field]: value,
            };
            return {
                ...prev,
                penerima: newPenerima,
            };
        });
    };

    // Reset form function
    const resetForm = () => {
        setFormState({
            // Data Rawat Inap
            ruangPerawatan: "",
            tarif: "",
            kelasTarif: "",
            bookingPerawatan: "",
            naikKelas: "",
            dokterDPJP: "",
            tanggalMasuk: null,
            caraMasuk: "",
            caraBayar: "",
            noAsuransi: "",

            // Penanggung Jawab
            namaPJ: "",
            jenisKelamin: "",
            tanggalLahir: null,
            nomorIdentitas: "",
            telepon: "",
            alamat: "",
            hubungan: "",
            hambatan: {
                tidakAdaGangguan: false,
                gangguanPenglihatan: false,
                gangguanPendengaran: false,
                gangguanBicara: false,
                gangguanEmosi: false,
            },
            bacaTulis: "",
            penerjemahan: "",

            // Penerima Informasi
            penerima: [
                {nama: "", hubungan: "", noHP: ""},
                {nama: "", hubungan: "", noHP: ""},
                {nama: "", hubungan: "", noHP: ""},
            ],
        });
    };

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

            {/* Data Rawat Inap Section */}
            <div className="mb-4 rounded-md overflow-hidden border border-gray-200">
                <div className="bg-blue-500 text-white py-2 px-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16 2V6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M8 2V6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M3 10H21"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <h2 className="font-medium">DATA RAWAT INAP</h2>
                </div>

                <div className="p-4">
                    <div className="text-center text-red-600 font-medium mb-4 bg-red-50 p-2 rounded-md">
                        BELUM ADA DATA RESERVASI
                    </div>

                    <div className="grid grid-cols-[150px,1fr] gap-y-4 items-center">
                        <div className="text-right pr-4 font-medium">
                            Ruang Perawatan <span className="text-red-500">*</span>
                        </div>
                        <div className="relative">
                            <div className="flex">
                                <div className="relative flex-1">
                                    <select
                                        className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
                                        value={formState.ruangPerawatan}
                                        onChange={(e) => updateFormState("ruangPerawatan", e.target.value)}
                                    >
                                        <option value="">-- Pilih Ruang Perawatan --</option>
                                        <option value="Ruang Melati">Ruang Melati</option>
                                        <option value="Ruang Mawar">Ruang Mawar</option>
                                        <option value="Ruang Anggrek">Ruang Anggrek</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
                                </div>
                            </div>
                        </div>

                        <div className="text-right pr-4 font-medium">
                            Tarif <span className="text-red-500">*</span>
                        </div>
                        <div className="relative">
                            <div className="flex">
                                <div className="relative flex-1">
                                    <select
                                        className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
                                        value={formState.tarif}
                                        onChange={(e) => updateFormState("tarif", e.target.value)}
                                    >
                                        <option value="">-- Pilih Tarif --</option>
                                        <option value="Tarif A">Tarif A</option>
                                        <option value="Tarif B">Tarif B</option>
                                        <option value="Tarif C">Tarif C</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
                                </div>
                            </div>
                        </div>

                        <div className="text-right pr-4 font-medium">
                            Kelas Tarif <span className="text-red-500">*</span>
                        </div>
                        <div className="relative">
                            <div className="flex">
                                <div className="relative flex-1">
                                    <select
                                        className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
                                        value={formState.kelasTarif}
                                        onChange={(e) => updateFormState("kelasTarif", e.target.value)}
                                    >
                                        <option value="">-- Pilih Kelas Tarif --</option>
                                        <option value="Kelas 1">Kelas 1</option>
                                        <option value="Kelas 2">Kelas 2</option>
                                        <option value="Kelas 3">Kelas 3</option>
                                        <option value="VIP">VIP</option>
                                        <option value="VVIP">VVIP</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
                                </div>
                            </div>
                        </div>

                        <div className="text-right pr-4 font-medium">
                            Booking Perawatan <span className="text-red-500">*</span>
                        </div>
                        <RadioGroup
                            value={formState.bookingPerawatan}
                            onValueChange={(value) => updateFormState("bookingPerawatan", value as "ya" | "tidak")}
                            className="flex gap-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="ya" id="booking-ya" />
                                <Label htmlFor="booking-ya">Ya</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="tidak" id="booking-tidak" />
                                <Label htmlFor="booking-tidak">Tidak</Label>
                            </div>
                        </RadioGroup>

                        <div className="text-right pr-4 font-medium">
                            Naik Kelas? <span className="text-red-500">*</span>
                        </div>
                        <RadioGroup
                            value={formState.naikKelas}
                            onValueChange={(value) => updateFormState("naikKelas", value as "ya" | "tidak")}
                            className="flex gap-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="ya" id="naik-kelas-ya" />
                                <Label htmlFor="naik-kelas-ya">Ya</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="tidak" id="naik-kelas-tidak" />
                                <Label htmlFor="naik-kelas-tidak">Tidak</Label>
                            </div>
                        </RadioGroup>

                        <div className="text-right pr-4 font-medium">
                            Dokter DPJP <span className="text-red-500">*</span>
                        </div>
                        <div className="relative">
                            <div className="flex">
                                <div className="relative flex-1">
                                    <select
                                        className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
                                        value={formState.dokterDPJP}
                                        onChange={(e) => updateFormState("dokterDPJP", e.target.value)}
                                    >
                                        <option value="">-- Pilih Dokter DPJP --</option>
                                        <option value="dr. Andi, Sp.PD">dr. Andi, Sp.PD</option>
                                        <option value="dr. Budi, Sp.OG">dr. Budi, Sp.OG</option>
                                        <option value="dr. Citra, Sp.A">dr. Citra, Sp.A</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
                                </div>
                            </div>
                        </div>

                        <div className="text-right pr-4 font-medium">
                            Tanggal Masuk <span className="text-red-500">*</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[240px] justify-start text-left font-normal",
                                            !formState.tanggalMasuk && "text-muted-foreground"
                                        )}
                                    >
                                        {formState.tanggalMasuk ? (
                                            format(formState.tanggalMasuk, "dd MMMM yyyy", {locale: id})
                                        ) : (
                                            <span>Pilih tanggal</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <CalendarComponent
                                        mode="single"
                                        selected={formState.tanggalMasuk || undefined}
                                        onSelect={(date) => updateFormState("tanggalMasuk", date || null)}
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
                                        selected={formState.tanggalMasuk || undefined}
                                        onSelect={(date) => updateFormState("tanggalMasuk", date || null)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="text-right pr-4 font-medium">
                            Cara Masuk <span className="text-red-500">*</span>
                        </div>
                        <div className="relative">
                            <div className="flex">
                                <div className="relative flex-1">
                                    <select
                                        className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
                                        value={formState.caraMasuk}
                                        onChange={(e) => updateFormState("caraMasuk", e.target.value)}
                                    >
                                        <option value="">-- Pilih Cara Masuk --</option>
                                        <option value="Rujukan">Rujukan</option>
                                        <option value="Datang Sendiri">Datang Sendiri</option>
                                        <option value="Transfer Antar Ruang">Transfer Antar Ruang</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
                                </div>
                            </div>
                        </div>

                        <div className="text-right pr-4 font-medium">
                            Cara Bayar <span className="text-red-500">*</span>
                        </div>
                        <div className="relative">
                            <div className="flex">
                                <div className="relative flex-1">
                                    <select
                                        className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
                                        value={formState.caraBayar}
                                        onChange={(e) => updateFormState("caraBayar", e.target.value)}
                                    >
                                        <option value="">-- Pilih Cara Bayar --</option>
                                        <option value="BPJS">BPJS</option>
                                        <option value="Asuransi">Asuransi</option>
                                        <option value="Mandiri">Mandiri</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
                                </div>
                            </div>
                        </div>

                        <div className="text-right pr-4 font-medium">
                            No Asuransi <span className="text-red-500">*</span>
                        </div>
                        <div className="flex gap-2">
                            <Input
                                className="w-full"
                                value={formState.noAsuransi}
                                onChange={(e) => updateFormState("noAsuransi", e.target.value)}
                                placeholder="Masukkan nomor asuransi"
                            />
                            <Button className="bg-blue-500 hover:bg-blue-600 text-white">Cek</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Penanggung Jawab Section */}
            <div className="mb-4 rounded-md overflow-hidden border border-gray-200">
                <div className="bg-blue-500 text-white py-2 px-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <h2 className="font-medium">PENANGGUNG JAWAB</h2>
                </div>

                <div className="p-4">
                    <div className="grid grid-cols-[150px,1fr] gap-y-4 items-center">
                        <div className="text-right pr-4 font-medium">
                            Nama PJ <span className="text-red-500">*</span>
                        </div>
                        <Input
                            className="w-full"
                            value={formState.namaPJ}
                            onChange={(e) => updateFormState("namaPJ", e.target.value)}
                            placeholder="Masukkan nama penanggung jawab"
                        />

                        <div className="text-right pr-4 font-medium">
                            Jenis Kelamin <span className="text-red-500">*</span>
                        </div>
                        <RadioGroup
                            value={formState.jenisKelamin}
                            onValueChange={(value) =>
                                updateFormState("jenisKelamin", value as "laki-laki" | "perempuan")
                            }
                            className="flex gap-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="laki-laki" id="laki-laki" />
                                <Label htmlFor="laki-laki">Laki-laki</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="perempuan" id="perempuan" />
                                <Label htmlFor="perempuan">Perempuan</Label>
                            </div>
                        </RadioGroup>

                        <div className="text-right pr-4 font-medium">
                            Tanggal Lahir <span className="text-red-500">*</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[240px] justify-start text-left font-normal",
                                            !formState.tanggalLahir && "text-muted-foreground"
                                        )}
                                    >
                                        {formState.tanggalLahir ? (
                                            format(formState.tanggalLahir, "dd MMMM yyyy", {locale: id})
                                        ) : (
                                            <span>Pilih tanggal</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <CalendarComponent
                                        mode="single"
                                        selected={formState.tanggalLahir || undefined}
                                        onSelect={(date) => updateFormState("tanggalLahir", date || null)}
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
                                        selected={formState.tanggalLahir || undefined}
                                        onSelect={(date) => updateFormState("tanggalLahir", date || null)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="text-right pr-4 font-medium">
                            Nomor Identitas <span className="text-red-500">*</span>
                        </div>
                        <Input
                            className="w-full"
                            value={formState.nomorIdentitas}
                            onChange={(e) => updateFormState("nomorIdentitas", e.target.value)}
                            placeholder="Masukkan nomor identitas (KTP/SIM/Passport)"
                        />

                        <div className="text-right pr-4 font-medium">
                            Telepon <span className="text-red-500">*</span>
                        </div>
                        <Input
                            className="w-full"
                            value={formState.telepon}
                            onChange={(e) => updateFormState("telepon", e.target.value)}
                            placeholder="Masukkan nomor telepon"
                        />

                        <div className="text-right pr-4 font-medium">
                            Alamat <span className="text-red-500">*</span>
                        </div>
                        <div className="relative">
                            <div className="flex">
                                <div className="relative flex-1">
                                    <select
                                        className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
                                        value={formState.alamat}
                                        onChange={(e) => updateFormState("alamat", e.target.value)}
                                    >
                                        <option value="">-- Pilih Alamat --</option>
                                        <option value="Rumah Sakit">Rumah Sakit</option>
                                        <option value="Alamat Pasien">Alamat Pasien</option>
                                        <option value="Alamat Lain">Alamat Lain</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
                                </div>
                            </div>
                        </div>

                        <div className="text-right pr-4 font-medium">
                            Hubungan <span className="text-red-500">*</span>
                        </div>
                        <Input
                            className="w-full"
                            value={formState.hubungan}
                            onChange={(e) => updateFormState("hubungan", e.target.value)}
                            placeholder="Masukkan hubungan dengan pasien"
                        />

                        <div className="text-right pr-4 font-medium">
                            Hambatan <span className="text-red-500">*</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="tidak-ada-gangguan"
                                    checked={formState.hambatan.tidakAdaGangguan}
                                    onCheckedChange={(checked) => updateHambatan("tidakAdaGangguan", checked === true)}
                                />
                                <label
                                    htmlFor="tidak-ada-gangguan"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Tidak ada gangguan
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="gangguan-penglihatan"
                                    checked={formState.hambatan.gangguanPenglihatan}
                                    onCheckedChange={(checked) =>
                                        updateHambatan("gangguanPenglihatan", checked === true)
                                    }
                                />
                                <label
                                    htmlFor="gangguan-penglihatan"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Gangguan penglihatan
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="gangguan-pendengaran"
                                    checked={formState.hambatan.gangguanPendengaran}
                                    onCheckedChange={(checked) =>
                                        updateHambatan("gangguanPendengaran", checked === true)
                                    }
                                />
                                <label
                                    htmlFor="gangguan-pendengaran"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Gangguan pendengaran
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="gangguan-bicara"
                                    checked={formState.hambatan.gangguanBicara}
                                    onCheckedChange={(checked) => updateHambatan("gangguanBicara", checked === true)}
                                />
                                <label
                                    htmlFor="gangguan-bicara"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Gangguan bicara
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="gangguan-emosi"
                                    checked={formState.hambatan.gangguanEmosi}
                                    onCheckedChange={(checked) => updateHambatan("gangguanEmosi", checked === true)}
                                />
                                <label
                                    htmlFor="gangguan-emosi"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Gangguan emosi
                                </label>
                            </div>
                        </div>

                        <div className="text-right pr-4 font-medium">
                            Baca Tulis <span className="text-red-500">*</span>
                        </div>
                        <RadioGroup
                            value={formState.bacaTulis}
                            onValueChange={(value) => updateFormState("bacaTulis", value as "bisa" | "tidak")}
                            className="flex gap-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="bisa" id="baca-tulis-bisa" />
                                <Label htmlFor="baca-tulis-bisa">Bisa</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="tidak" id="baca-tulis-tidak" />
                                <Label htmlFor="baca-tulis-tidak">Tidak</Label>
                            </div>
                        </RadioGroup>

                        <div className="text-right pr-4 font-medium">
                            Penerjemahan <span className="text-red-500">*</span>
                        </div>
                        <RadioGroup
                            value={formState.penerjemahan}
                            onValueChange={(value) => updateFormState("penerjemahan", value as "butuh" | "tidak")}
                            className="flex gap-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="butuh" id="penerjemahan-butuh" />
                                <Label htmlFor="penerjemahan-butuh">Butuh</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="tidak" id="penerjemahan-tidak" />
                                <Label htmlFor="penerjemahan-tidak">Tidak</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
            </div>

            {/* Penerima Informasi Kesehatan Pasien Section */}
            <div className="mb-4 rounded-md overflow-hidden border border-gray-200">
                <div className="bg-blue-500 text-white py-2 px-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M22 12H16L14 15H10L8 12H2"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M5.45 5.11L2 12V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V12L18.55 5.11C18.3844 4.77679 18.1292 4.49637 17.813 4.30028C17.4967 4.10419 17.1321 4.0002 16.76 4H7.24C6.86792 4.0002 6.50326 4.10419 6.18704 4.30028C5.87083 4.49637 5.61558 4.77679 5.45 5.11Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <h2 className="font-medium">PENERIMA INFORMASI KESEHATAN PASIEN</h2>
                </div>

                <div className="p-4">
                    {/* Penerima 1 */}
                    <div className="mb-6">
                        <h3 className="font-medium mb-3">Penerima 1</h3>
                        <div className="space-y-3">
                            <Input
                                placeholder="Nama Keluarga"
                                value={formState.penerima[0].nama}
                                onChange={(e) => updatePenerima(0, "nama", e.target.value)}
                                className="w-full bg-blue-50"
                            />
                            <Input
                                placeholder="Hubungan Keluarga"
                                value={formState.penerima[0].hubungan}
                                onChange={(e) => updatePenerima(0, "hubungan", e.target.value)}
                                className="w-full bg-blue-50"
                            />
                            <Input
                                placeholder="No HP Keluarga"
                                value={formState.penerima[0].noHP}
                                onChange={(e) => updatePenerima(0, "noHP", e.target.value)}
                                className="w-full bg-blue-50"
                            />
                        </div>
                    </div>

                    {/* Penerima 2 */}
                    <div className="mb-6">
                        <h3 className="font-medium mb-3">Penerima 2</h3>
                        <div className="space-y-3">
                            <Input
                                placeholder="Nama Keluarga"
                                value={formState.penerima[1].nama}
                                onChange={(e) => updatePenerima(1, "nama", e.target.value)}
                                className="w-full bg-blue-50"
                            />
                            <Input
                                placeholder="Hubungan Keluarga"
                                value={formState.penerima[1].hubungan}
                                onChange={(e) => updatePenerima(1, "hubungan", e.target.value)}
                                className="w-full bg-blue-50"
                            />
                            <Input
                                placeholder="No HP Keluarga"
                                value={formState.penerima[1].noHP}
                                onChange={(e) => updatePenerima(1, "noHP", e.target.value)}
                                className="w-full bg-blue-50"
                            />
                        </div>
                    </div>

                    {/* Penerima 3 */}
                    <div>
                        <h3 className="font-medium mb-3">Penerima 3</h3>
                        <div className="space-y-3">
                            <Input
                                placeholder="Nama Keluarga"
                                value={formState.penerima[2].nama}
                                onChange={(e) => updatePenerima(2, "nama", e.target.value)}
                                className="w-full bg-blue-50"
                            />
                            <Input
                                placeholder="Hubungan Keluarga"
                                value={formState.penerima[2].hubungan}
                                onChange={(e) => updatePenerima(2, "hubungan", e.target.value)}
                                className="w-full bg-blue-50"
                            />
                            <Input
                                placeholder="No HP Keluarga"
                                value={formState.penerima[2].noHP}
                                onChange={(e) => updatePenerima(2, "noHP", e.target.value)}
                                className="w-full bg-blue-50"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mt-6 space-x-4">
                <Button
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={resetForm}
                >
                    Batal
                </Button>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">Simpan</Button>
            </div>
        </div>
    );
}
