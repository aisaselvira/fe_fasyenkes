import type React from "react"
import { useState } from "react"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import { RadioGroup, RadioGroupItem } from "@/components/atoms/radio-group"
import { Checkbox } from "@/components/atoms/checkbox"
import { Textarea } from "@/components/atoms/textarea"

export default function PatientRegistrationForm() {
    const [date, setDate] = useState<string>("")

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value)
    }

    return (
        <div className="w-full max-w-6xl mx-auto bg-white rounded-lg border border-gray-200 shadow-sm my-8">
            <div className="p-3 sm:p-4 border-b">
                <h1 className="text-3xl font-bold ">FORM INPUTAN PASIEN</h1>
            </div>

            <div className="p-3 sm:p-4 max-h-[400px] overflow-y-auto border">
                <h3 className="font-semibold mb-3 sm:mb-4">DATA PRIBADI</h3>
                <div className="mt-4 border-gray-100 rounded-md p-4 shadow-inner">
                    <div className="grid gap-3 sm:gap-4">
                        <div className="grid gap-3 sm:gap-4">
                            {/* Grid layout that changes based on screen size */}
                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="nik" className="sm:mb-0 mb-1">
                                    NIK/No KTP/No KIA:
                                </Label>
                                <div className="flex">
                                    <Input id="nik" placeholder="Masukkan NIK/No KTP/No KIA" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="nama" className="sm:mb-0 mb-1">
                                    Nama Lengkap <span className="text-red-500">*</span>
                                </Label>
                                <Input id="nama" placeholder="Masukkan nama lengkap" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="tempat-lahir" className="sm:mb-0 mb-1">
                                    Tempat Lahir <span className="text-red-500">*</span>
                                </Label>
                                <Input id="tempat-lahir" placeholder="Masukkan Tempat Lahir" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="tanggal-lahir" className="sm:mb-0 mb-1">
                                    Tanggal Lahir <span className="text-red-500">*</span>
                                </Label>
                                <Input id="tanggal-lahir" type="date" value={date} onChange={handleDateChange} className="w-full" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start gap-1 sm:gap-2">
                                <Label className="sm:mb-0 mb-1">
                                    Jenis Kelamin <span className="text-red-500">*</span>
                                </Label>
                                <RadioGroup defaultValue="" className="flex flex-wrap gap-2 sm:gap-4">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="LAKI-LAKI" id="LAKI-LAKI" />
                                        <Label htmlFor="LAKI-LAKI" className="text-sm sm:text-base">
                                            LAKI-LAKI
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="PEREMPUAN" id="PEREMPUAN" />
                                        <Label htmlFor="PEREMPUAN" className="text-sm sm:text-base">
                                            PEREMPUAN
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="TIDAK DAPAT DITENTUKAN" id="TIDAK DAPAT DITENTUKAN" />
                                        <Label htmlFor="TIDAK DAPAT DITENTUKAN" className="text-sm sm:text-base">
                                            TIDAK DAPAT DITENTUKAN
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="TIDAK MENGISI" id="TIDAK MENGISI" />
                                        <Label htmlFor="TIDAK MENGISI" className="text-sm sm:text-base">
                                            TIDAK MENGISI
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="TIDAK DIKETAHUI" id="TIDAK DIKETAHUI" />
                                        <Label htmlFor="TIDAK DIKETAHUI" className="text-sm sm:text-base">
                                            TIDAK DIKETAHUI
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start gap-1 sm:gap-2">
                                <Label className="sm:mb-0 mb-1">
                                    Kebangsaan <span className="text-red-500">*</span>
                                </Label>
                                <RadioGroup defaultValue="" className="flex gap-4">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="WNI" id="WNI" />
                                        <Label htmlFor="WNI" className="text-sm sm:text-base">
                                            WNI
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="WNA" id="WNA" />
                                        <Label htmlFor="WNA" className="text-sm sm:text-base">
                                            WNA
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="alamat" className="sm:mb-0 mb-1">
                                    Alamat
                                </Label>
                                <Input id="alamat" placeholder="Masukkan alamat" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="provinsi" className="sm:mb-0 mb-1">
                                    Provinsi <span className="text-red-500">*</span>
                                </Label>
                                <Input id="provinsi" placeholder="Masukkan nama Provinsi" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="kabupaten" className="sm:mb-0 mb-1">
                                    Kabupaten/Kota <span className="text-red-500">*</span>
                                </Label>
                                <Input id="kabupaten" placeholder="Masukkan nama Kabupaten/Kota" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="kecamatan" className="sm:mb-0 mb-1">
                                    Kecamatan <span className="text-red-500">*</span>
                                </Label>
                                <Input id="kecamatan" placeholder="Masukkan nama Kecamatan" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="no-hp" className="sm:mb-0 mb-1">
                                    No HP
                                </Label>
                                <Input id="no-hp" placeholder="Masukkan No HP" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start gap-1 sm:gap-2">
                                <Label className="sm:mb-0 mb-1">Tingkat Pendidikan</Label>
                                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2">
                                    <RadioGroup name="pendidikan" defaultValue="" className="space-y-1 sm:space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="TIDAK SEKOLAH" id="TIDAK SEKOLAH" />
                                            <Label htmlFor="TIDAK SEKOLAH" className="text-sm sm:text-base">
                                                TIDAK SEKOLAH
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="SD/SEDERAJAT" id="SD/SEDERAJAT" />
                                            <Label htmlFor="SD/SEDERAJAT" className="text-sm sm:text-base">
                                                SD/SEDERAJAT
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="S1" id="S1" />
                                            <Label htmlFor="S1" className="text-sm sm:text-base">
                                                S1
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="SD" id="SD" />
                                            <Label htmlFor="SD" className="text-sm sm:text-base">
                                                SD
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="D1/D3 SEDERAJAT" id="D1/D3 SEDERAJAT" />
                                            <Label htmlFor="D1/D3 SEDERAJAT" className="text-sm sm:text-base">
                                                D1/D3 SEDERAJAT
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="S2" id="S2" />
                                            <Label htmlFor="S2" className="text-sm sm:text-base">
                                                S2
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="SLTP SEDERAJAT" id="SLTP SEDERAJAT" />
                                            <Label htmlFor="SLTP SEDERAJAT" className="text-sm sm:text-base">
                                                SLTP SEDERAJAT
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="D4" id="D4" />
                                            <Label htmlFor="D4" className="text-sm sm:text-base">
                                                D4
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="S3" id="S3" />
                                            <Label htmlFor="S3" className="text-sm sm:text-base">
                                                S3
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start gap-1 sm:gap-2">
                                <Label className="sm:mb-0 mb-1">Golongan Darah</Label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2">
                                    <RadioGroup name="golongan-darah" defaultValue="" className="flex flex-wrap gap-3">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="A" id="A" />
                                            <Label htmlFor="A" className="text-sm sm:text-base">
                                                A
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="AB" id="AB" />
                                            <Label htmlFor="AB" className="text-sm sm:text-base">
                                                AB
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="-" id="-" />
                                            <Label htmlFor="-" className="text-sm sm:text-base">
                                                -
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="B" id="B" />
                                            <Label htmlFor="B" className="text-sm sm:text-base">
                                                B
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="O" id="O" />
                                            <Label htmlFor="O" className="text-sm sm:text-base">
                                                O
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start gap-1 sm:gap-2">
                                <Label className="sm:mb-0 mb-1">Agama</Label>
                                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2">
                                    <RadioGroup name="agama" defaultValue="" className="space-y-1 sm:space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="ISLAM" id="ISLAM" />
                                            <Label htmlFor="ISLAM" className="text-sm sm:text-base">
                                                ISLAM
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="HINDU" id="HINDU" />
                                            <Label htmlFor="HINDU" className="text-sm sm:text-base">
                                                HINDU
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="PENGHAYAT" id="PENGHAYAT" />
                                            <Label htmlFor="PENGHAYAT" className="text-sm sm:text-base">
                                                PENGHAYAT
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="KRISTEN" id="KRISTEN" />
                                            <Label htmlFor="KRISTEN" className="text-sm sm:text-base">
                                                KRISTEN
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="BUDHA" id="BUDHA" />
                                            <Label htmlFor="BUDHA" className="text-sm sm:text-base">
                                                BUDHA
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="LAIN-LAIN" id="LAIN-LAIN-AGAMA" />
                                            <Label htmlFor="LAIN-LAIN-AGAMA" className="text-sm sm:text-base">
                                                LAIN-LAIN
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="KATOLIK" id="KATOLIK" />
                                            <Label htmlFor="KATOLIK" className="text-sm sm:text-base">
                                                KATOLIK
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="KHONG HUCU" id="KHONG HUCU" />
                                            <Label htmlFor="KHONG HUCU" className="text-sm sm:text-base">
                                                KHONG HUCU
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start gap-1 sm:gap-2">
                                <Label className="sm:mb-0 mb-1">Status Perkawinan</Label>
                                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2">
                                    <RadioGroup name="status-perkawinan" defaultValue="" className="space-y-1 sm:space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="BELUM KAWIN" id="BELUM KAWIN" />
                                            <Label htmlFor="BELUM KAWIN" className="text-sm sm:text-base">
                                                BELUM KAWIN
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="CERAI HIDUP" id="CERAI HIDUP" />
                                            <Label htmlFor="CERAI HIDUP" className="text-sm sm:text-base">
                                                CERAI HIDUP
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="KAWIN" id="KAWIN" />
                                            <Label htmlFor="KAWIN" className="text-sm sm:text-base">
                                                KAWIN
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="CERAI MATI" id="CERAI MATI" />
                                            <Label htmlFor="CERAI MATI" className="text-sm sm:text-base">
                                                CERAI MATI
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start gap-1 sm:gap-2">
                                <Label className="sm:mb-0 mb-1">Pekerjaan</Label>
                                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2">
                                    <RadioGroup name="pekerjaan" defaultValue="" className="space-y-1 sm:space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="TIDAK BEKERJA" id="TIDAK BEKERJA" />
                                            <Label htmlFor="TIDAK BEKERJA" className="text-sm sm:text-base">
                                                TIDAK BEKERJA
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="BUMN" id="BUMN" />
                                            <Label htmlFor="BUMN" className="text-sm sm:text-base">
                                                BUMN
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="PNS" id="PNS" />
                                            <Label htmlFor="PNS" className="text-sm sm:text-base">
                                                PNS
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="PEGAWAI SWASTA/ WIRASWASTA" id="PEGAWAI SWASTA/ WIRASWASTA" />
                                            <Label htmlFor="PEGAWAI SWASTA/ WIRASWASTA" className="text-sm sm:text-base">
                                                PEGAWAI SWASTA/ WIRASWASTA
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="TNI/POLRI" id="TNI/POLRI" />
                                            <Label htmlFor="TNI/POLRI" className="text-sm sm:text-base">
                                                TNI/POLRI
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="LAIN-LAIN" id="LAIN-LAIN-PEKERJAAN" />
                                            <Label htmlFor="LAIN-LAIN-PEKERJAAN" className="text-sm sm:text-base">
                                                LAIN-LAIN
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="suku" className="sm:mb-0 mb-1">
                                    Suku
                                </Label>
                                <Input id="suku" placeholder="Masukkan nama suku" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="bahasa" className="sm:mb-0 mb-1">
                                    Bahasa
                                </Label>
                                <Input id="bahasa" placeholder="Masukkan bahasa " />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start gap-1 sm:gap-2">
                                <Label className="sm:mb-0 mb-1">Hambatan</Label>
                                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2">
                                    <RadioGroup name="hambatan" defaultValue="" className="space-y-1 sm:space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="TIDAK ADA" id="TIDAK ADA" />
                                            <Label htmlFor="TIDAK ADA" className="text-sm sm:text-base">
                                                TIDAK ADA
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="B. PENGLIHATAN" id="B. PENGLIHATAN" />
                                            <Label htmlFor="B. PENGLIHATAN" className="text-sm sm:text-base">
                                                B. PENGLIHATAN
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="B. PENDENGARAN" id="B. PENDENGARAN" />
                                            <Label htmlFor="B. PENDENGARAN" className="text-sm sm:text-base">
                                                B. PENDENGARAN
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="B. BICARA" id="B. BICARA" />
                                            <Label htmlFor="B. BICARA" className="text-sm sm:text-base">
                                                B. BICARA
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="B. EMOSI" id="B. EMOSI" />
                                            <Label htmlFor="B. EMOSI" className="text-sm sm:text-base">
                                                B. EMOSI
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="LAIN-LAIN" id="LAIN-LAIN-HAMBATAN" />
                                            <Label htmlFor="LAIN-LAIN-HAMBATAN" className="text-sm sm:text-base">
                                                LAIN-LAIN
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start gap-1 sm:gap-2">
                                <Label className="sm:mb-0 mb-1">
                                    Cara Pembayaran <span className="text-red-500">*</span>
                                </Label>
                                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2">
                                    <RadioGroup name="cara-pembayaran" defaultValue="" className="space-y-1 sm:space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="JKN" id="JKN" />
                                            <Label htmlFor="JKN" className="text-sm sm:text-base">
                                                JKN
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="ASURANSI LAINNYA" id="ASURANSI LAINNYA" />
                                            <Label htmlFor="ASURANSI LAINNYA" className="text-sm sm:text-base">
                                                ASURANSI LAINNYA
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="MANDIRI" id="MANDIRI" />
                                            <Label htmlFor="MANDIRI" className="text-sm sm:text-base">
                                                MANDIRI
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="no-jaminan" className="sm:mb-0 mb-1">
                                    No Jaminan
                                </Label>
                                <Input id="no-jaminan" placeholder="Masukkan No Jaminan" />
                            </div>
                        </div>

                        <div className="mt-6 sm:mt-8">
                            <h3 className="font-semibold mb-3 sm:mb-4 text-blue-600">NILAI DAN KEYAKINAN</h3>
                            <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                                <div className="grid gap-2">
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
                            </div>
                        </div>

                        <div className="mt-6 sm:mt-8">
                            <h3 className="font-semibold mb-3 sm:mb-4 text-blue-600">PERMINTAAN PRIVACY</h3>
                            <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                                <div className="grid gap-2">
                                    <div className="flex items-start space-x-2">
                                        <Checkbox id="privacy-1"  />
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
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start gap-1 sm:gap-2">
                                <Label htmlFor="catatan" className="sm:mb-0 mb-1">
                                    Catatan
                                </Label>
                                <Textarea id="catatan" placeholder="Catatan pasien" />
                            </div>
                        </div>

                        <div className="mt-6 sm:mt-8">
                            <h3 className="font-semibold mb-3 sm:mb-4 text-blue-600">PENERIMA INFORMASI KESEHATAN PASIEN</h3>

                            <div className="space-y-4 sm:space-y-6">
                                <div>
                                    <p className="mb-2 text-sm sm:text-base">Penerima 1</p>
                                    <div className="grid gap-2">
                                        <Input placeholder="Nama Keluarga" />
                                        <Input placeholder="Hubungan Keluarga" />
                                        <Input placeholder="No HP Keluarga" />
                                    </div>
                                </div>

                                <div>
                                    <p className="mb-2 text-sm sm:text-base">Penerima 2</p>
                                    <div className="grid gap-2">
                                        <Input placeholder="Nama Keluarga" />
                                        <Input placeholder="Hubungan Keluarga" />
                                        <Input placeholder="No HP Keluarga" />
                                    </div>
                                </div>

                                <div>
                                    <p className="mb-2 text-sm sm:text-base">Penerima 3</p>
                                    <div className="grid gap-2">
                                        <Input placeholder="Nama Keluarga" />
                                        <Input placeholder="Hubungan Keluarga" />
                                        <Input placeholder="No HP Keluarga" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

