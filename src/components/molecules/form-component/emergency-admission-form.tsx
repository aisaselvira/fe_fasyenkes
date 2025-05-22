"use client";

import {useState} from "react";
import {Calendar, ChevronDown} from "lucide-react";
import {Button} from "@/components/atoms/button";
import {Input} from "@/components/atoms/input";
import {Label} from "@/components/atoms/label";
import {RadioGroup, RadioGroupItem} from "@/components/atoms/radio-group";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/atoms/popover";
import {Calendar as CalendarComponent} from "@/components/atoms/calendar";
import {format} from "date-fns";
import {id} from "date-fns/locale";

interface EmergencyAdmissionFormState {
    waktuAdmisi: Date | undefined;
    tipeKunjungan: "baru" | "lama";
    dokter: string;
    kasusTindakan: string;
    kecelakaan: string;
    caraMasuk: string;
    caraPembayaran: string;
    noAsuransi: string;
    catatanKunjungan: string;
    documents: {
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
    };
}

export function EmergencyAdmissionForm() {
    const [formState, setFormState] = useState<EmergencyAdmissionFormState>({
        waktuAdmisi: new Date(),
        tipeKunjungan: "baru",
        dokter: "",
        kasusTindakan: "",
        kecelakaan: "",
        caraMasuk: "",
        caraPembayaran: "",
        noAsuransi: "",
        catatanKunjungan: "",
        documents: {
            kartuPasien: true,
            lembarPoliklinik: true,
            labelKecil: false,
            labelBesar: false,
            tracerBerkasRM: true,
            suratBuktiPelayanan: true,
            sep: false,
            noAntrian: false,
            gelangPasien: false,
            generalConsent: false,
            kartuKendali: false,
        },
    });

    // Mock patient data
    const patientData = {
        nomorRM: "RM-12345",
        nama: "JOHN DOE",
        nik: "3201234567890001",
        tanggalLahir: "15-05-1985",
        alamat: "Jl. Contoh No. 123, Jakarta",
        noKartuBPJS: "0001234567890",
    };

    const updateDocumentSelection = (
        documentName: keyof EmergencyAdmissionFormState["documents"],
        checked: boolean
    ) => {
        setFormState((prev) => ({
            ...prev,
            documents: {
                ...prev.documents,
                [documentName]: checked,
            },
        }));
    };

    const resetForm = () => {
        setFormState({
            waktuAdmisi: new Date(),
            tipeKunjungan: "baru",
            dokter: "",
            kasusTindakan: "",
            kecelakaan: "",
            caraMasuk: "",
            caraPembayaran: "",
            noAsuransi: "",
            catatanKunjungan: "",
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
        });
    };

    const handleSave = () => {
        console.log("Form data saved:", formState);
        // Here you would typically send the data to an API
        alert("Data berhasil disimpan!");
    };

    return (
        <div className="space-y-6">
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
                    <h2 className="text-sm">DATA PASIEN</h2>
                </div>

                <div className="bg-blue-100 p-4">
                    <div className="grid grid-cols-[120px,1fr] sm:grid-cols-[150px,1fr] gap-y-2 items-center text-sm">
                        <div className="pr-4 text-sm">Nomor RM</div>
                        <div>: {patientData.nomorRM}</div>

                        <div className="pr-4 text-sm">Nama</div>
                        <div>: {patientData.nama}</div>

                        <div className="pr-4 text-sm">NIK</div>
                        <div>: {patientData.nik}</div>

                        <div className="pr-4 text-sm">Tanggal Lahir</div>
                        <div>: {patientData.tanggalLahir}</div>

                        <div className="pr-4 text-sm">Alamat</div>
                        <div>: {patientData.alamat}</div>

                        <div className="pr-4 text-sm">No. Kartu BPJS</div>
                        <div>: {patientData.noKartuBPJS}</div>
                    </div>
                </div>
            </div>

            {/* Admission Form Section */}
            <div className="mb-4 rounded-md overflow-hidden">
                <div className="bg-blue-500 text-white py-2 px-4 flex items-center text-sm">
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
                    <h2 className="text-sm">FORMULIR ADMISI</h2>
                </div>

                <div className="bg-white p-4 border border-gray-200">
                    <div className="bg-red-100 text-red-600 p-2 mb-4 text-sm text-center">
                        <div className="font-bold">TANGGAL TERAKHIR BERKUNJUNG: 16 JULI 2022</div>
                        <div>BELUM ADA DATA RESEP/LAB</div>
                    </div>

                    {/* Visit Data - Added border and shadow */}
                    <div className="mb-6 border border-gray-200 rounded-md p-4 shadow-md">
                        <h3 className="font-semibold mb-3">Data Kunjungan</h3>

                        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center mb-4">
                            <Label htmlFor="waktuAdmisi" className="flex items-center">
                                Waktu Admisi <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <div className="flex items-center">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start text-left font-normal bg-blue-50 border-blue-200"
                                        >
                                            <Calendar className="mr-2 h-4 w-4" />
                                            {formState.waktuAdmisi ? (
                                                format(formState.waktuAdmisi, "dd MMMM yyyy", {locale: id})
                                            ) : (
                                                <span>Pilih tanggal</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <CalendarComponent
                                            mode="single"
                                            selected={formState.waktuAdmisi}
                                            onSelect={(date) => setFormState((prev) => ({...prev, waktuAdmisi: date}))}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <div className="ml-4">
                                    <RadioGroup
                                        value={formState.tipeKunjungan}
                                        onValueChange={(value) =>
                                            setFormState((prev) => ({...prev, tipeKunjungan: value as "baru" | "lama"}))
                                        }
                                        className="flex items-center space-x-4"
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
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center mb-4">
                            <Label htmlFor="dokter" className="flex items-center">
                                Dokter <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <div className="relative">
                                <div className="flex">
                                    <div className="relative flex-1">
                                        <select
                                            id="dokter"
                                            className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
                                            value={formState.dokter}
                                            onChange={(e) =>
                                                setFormState((prev) => ({...prev, dokter: e.target.value}))
                                            }
                                        >
                                            <option value="">-- Pilih Dokter --</option>
                                            <option value="dr-ahmad">Dr. Ahmad</option>
                                            <option value="dr-budi">Dr. Budi</option>
                                            <option value="dr-citra">Dr. Citra</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center mb-4">
                            <Label htmlFor="kasusTindakan" className="flex items-center">
                                Kasus Tindakan <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <div className="relative">
                                <div className="flex">
                                    <div className="relative flex-1">
                                        <select
                                            id="kasusTindakan"
                                            className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
                                            value={formState.kasusTindakan}
                                            onChange={(e) =>
                                                setFormState((prev) => ({...prev, kasusTindakan: e.target.value}))
                                            }
                                        >
                                            <option value="">-- Pilih Kasus Tindakan --</option>
                                            <option value="bedah">Bedah</option>
                                            <option value="non-bedah">Non Bedah</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center mb-4">
                            <Label htmlFor="kecelakaan" className="flex items-center">
                                Kecelakaan <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <div className="relative">
                                <div className="flex">
                                    <div className="relative flex-1">
                                        <select
                                            id="kecelakaan"
                                            className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
                                            value={formState.kecelakaan}
                                            onChange={(e) =>
                                                setFormState((prev) => ({...prev, kecelakaan: e.target.value}))
                                            }
                                        >
                                            <option value="">-- Pilih Jenis Kecelakaan --</option>
                                            <option value="kecelakaan-kerja">Kecelakaan Kerja</option>
                                            <option value="kecelakaan-lalu-lintas">Kecelakaan Lalu Lintas</option>
                                            <option value="bukan-kecelakaan">Bukan Kecelakaan</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center mb-4">
                            <Label htmlFor="caraMasuk" className="flex items-center">
                                Cara Masuk <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <div className="relative">
                                <div className="flex">
                                    <div className="relative flex-1">
                                        <select
                                            id="caraMasuk"
                                            className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
                                            value={formState.caraMasuk}
                                            onChange={(e) =>
                                                setFormState((prev) => ({...prev, caraMasuk: e.target.value}))
                                            }
                                        >
                                            <option value="">-- Pilih Cara Masuk --</option>
                                            <option value="sendiri">Sendiri</option>
                                            <option value="rujukan">Rujukan</option>
                                            <option value="ambulans">Ambulans</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center mb-4">
                            <Label htmlFor="caraPembayaran" className="flex items-center">
                                Cara Pembayaran <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <div className="relative">
                                <div className="flex">
                                    <div className="relative flex-1">
                                        <select
                                            id="caraPembayaran"
                                            className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
                                            value={formState.caraPembayaran}
                                            onChange={(e) =>
                                                setFormState((prev) => ({...prev, caraPembayaran: e.target.value}))
                                            }
                                        >
                                            <option value="">-- Pilih Cara Pembayaran --</option>
                                            <option value="mandiri">Mandiri</option>
                                            <option value="bpjs">BPJS</option>
                                            <option value="asuransi">Asuransi</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center mb-4">
                            <Label htmlFor="noAsuransi" className="flex items-center">
                                No Asuransi <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <div className="flex">
                                <Input
                                    id="noAsuransi"
                                    placeholder="Nomor Asuransi"
                                    className="bg-blue-50 border-blue-200"
                                    value={formState.noAsuransi}
                                    onChange={(e) => setFormState((prev) => ({...prev, noAsuransi: e.target.value}))}
                                />
                                <Button className="ml-2 bg-blue-500 hover:bg-blue-600">Cek</Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center mb-4">
                            <Label htmlFor="catatanKunjungan">Catatan Kunjungan</Label>
                            <Input
                                id="catatanKunjungan"
                                placeholder="Masukkan catatan kunjungan"
                                className="bg-blue-50 border-blue-200"
                                value={formState.catatanKunjungan}
                                onChange={(e) => setFormState((prev) => ({...prev, catatanKunjungan: e.target.value}))}
                            />
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
                                    />
                                    <label htmlFor="kartu-pasien" className="text-sm">
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
                                    />
                                    <label htmlFor="lembar-poliklinik" className="text-sm">
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
                                    />
                                    <label htmlFor="label-kecil" className="text-sm">
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
                                    />
                                    <label htmlFor="label-besar" className="text-sm">
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
                                    />
                                    <label htmlFor="tracer-berkas" className="text-sm">
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
                                    />
                                    <label htmlFor="surat-bukti" className="text-sm">
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
                                    />
                                    <label htmlFor="sep" className="text-sm">
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
                                    />
                                    <label htmlFor="no-antrian" className="text-sm">
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
                                    />
                                    <label htmlFor="gelang-pasien" className="text-sm">
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
                                    />
                                    <label htmlFor="general-consent" className="text-sm">
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
                                    />
                                    <label htmlFor="kartu-kendali" className="text-sm">
                                        Kartu Kendali
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end mt-6 space-x-4">
                        <Button
                            variant="outline"
                            className="bg-red-600 hover:bg-red-700 text-white hover:text-white"
                            onClick={resetForm}
                        >
                            Batal
                        </Button>
                        <Button className="bg-blue-800 hover:bg-blue-900 text-white" onClick={handleSave}>
                            Simpan
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
