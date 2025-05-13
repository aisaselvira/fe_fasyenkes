"use client"

import { useState } from "react"
import { Input } from "@/components/atoms/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/select"
import { User } from "lucide-react"
import { Label } from "@/components/atoms/label"
import { Checkbox } from "@/components/atoms/checkbox";

export default function PatientAdmissionForm() {
    const [date, setDate] = useState<string>("")
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)
    const [selected, setSelected] = useState<string>("")
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const handleCheck = (value: string) => {
        setSelectedItems((prev) =>
            prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
        );
    };

    return (
        <div className="w-full  max-w-6xl mx-auto bg-white rounded-2xl border shadow-lg my-10">
            <div className="p-6 border-b  rounded-t-2xl">
                <h1 className="text-3xl font-bold text-black">ADMISI RAWAT JALAN</h1>
                <p className="text-sm ">Manajemen Data Pasien</p>
            </div>

            {/* Data Pasien */}
            <div className="bg-blue-100 border rounded-lg overflow-hidden mb-6">
                <div className="bg-blue-600 text-white p-4 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <h2 className="text-lg font-semibold tracking-wide">DATA PASIEN</h2>
                </div>
                <div className="p-4 space-y-2 text-sm">
                    <p><span className="font-medium">Nomor RM</span>: 000222</p>
                    <p><span className="font-medium">Nama</span>: DINA</p>
                    <p><span className="font-medium">NIK</span>: 3323075108000008</p>
                    <p><span className="font-medium">Tanggal Lahir</span>: 14-07-1990</p>
                    <p><span className="font-medium">Alamat</span>: JL. MERDEKA NO. 50 RT/RW 001/002, CATURTUNGGAL, DEPOK, SLEMAN, DIY</p>
                    <p><span className="font-medium">No. Kartu BPJS</span>: 0000088999899</p>
                </div>
            </div>

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
                                            value={date}
                                            onChange={handleDateChange}
                                            className="sm:max-w-[200px]"
                                        />
                                        <div className="flex gap-2">
                                            {/* Checkbox Baru */}
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={selected === "baru"}
                                                    onChange={() => setSelected("baru")}
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
                                                    checked={selected === "lama"}
                                                    onChange={() => setSelected("lama")}
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
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Klinik" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="umum">Umum</SelectItem>
                                            <SelectItem value="gigi">Gigi</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Dokter Klinik */}
                                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                    <Label htmlFor="dokter" className="sm:mb-0 mb-1">
                                        Dokter Klinik <span className="text-red-500">*</span>
                                    </Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Dokter" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="andi">Dr. Andi</SelectItem>
                                            <SelectItem value="budi">Dr. Budi</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Cara Masuk */}
                                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                    <Label htmlFor="caraMasuk" className="sm:mb-0 mb-1">
                                        Cara Masuk <span className="text-red-500">*</span>
                                    </Label>
                                    <Select defaultValue="rujukan">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Cara Masuk" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="rujukan">Rujukan</SelectItem>
                                            <SelectItem value="sendiri">Datang Sendiri</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Cara Pembayaran */}
                                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                    <Label htmlFor="pembayaran" className="sm:mb-0 mb-1">
                                        Cara Pembayaran <span className="text-red-500">*</span>
                                    </Label>
                                    <Select defaultValue="bpjs">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Pembayaran" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="bpjs">BPJS</SelectItem>
                                            <SelectItem value="tunai">Tunai</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* No Asuransi */}
                                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                    <Label htmlFor="asuransi" className="sm:mb-0 mb-1">
                                        No Asuransi
                                    </Label>
                                    <div className="flex gap-2">
                                        <Input id="asuransi" placeholder="Masukkan No Asuransi" />
                                    </div>
                                </div>
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
                                        <Input className="" placeholder="Masukkan Nomor Rujukan" />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                        <Label htmlFor="waktuAdmisi" className="sm:mb-0 mb-1">
                                            Tanggal Rujukan <span className="text-red-500">*</span>
                                        </Label>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
                                            <Input
                                                id="tanggal_rujukan"
                                                type="date"
                                                value={date}
                                                onChange={handleDateChange}
                                                className="sm:max-w-[200px]"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                        <Label className="font-medium">Perujuk <span className="text-red-500">*</span></Label>
                                        <Input className="" placeholder="Masukkan Perujuk" />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                        <Label className="font-medium">Kode PPK(BPJS) <span className="text-red-500">*</span></Label>
                                        <Input className="" placeholder="Masukkan kode PPK" />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                        <Label htmlFor="jenis_perujuk" className="sm:mb-0 mb-1">
                                            Jenis Perujuk <span className="text-red-500">*</span>
                                        </Label>
                                        <Select>
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
                                        <Input className="" placeholder="Masukkan Catatan Kunjungan" />
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
                                        <Input className="" placeholder="Masukkan Nomor SEP" />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                        <Label className="font-medium">Tujuan Kunjungan <span className="text-red-500">*</span></Label>
                                        <Input className="" placeholder="Masukkan Tujuan Rujukan" />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                        <Label className="font-medium">Prosedur <span className="text-red-500">*</span></Label>
                                        <Input className="" placeholder="Masukkan Prosedur" />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                        <Label className="font-medium">Assesmendt <span className="text-red-500">*</span></Label>
                                        <Input className="" placeholder="Masukkan Assesmendt" />
                                    </div>
                                    <div className="flex gap-2 ml-40 items-center">
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
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                        <Label className="font-medium">Diagnosis awal <span className="text-red-500">*</span></Label>
                                        <Input className="" placeholder="Masukkan Dagnosis awal" />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                        <Label className="font-medium">Catatan<span className="text-red-500">*</span></Label>
                                        <Input className="" placeholder="Masukkan Catatan" />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                        <Label htmlFor="jenis_perujuk" className="sm:mb-0 mb-1">
                                            Kecelakaan <span className="text-red-500">*</span>
                                        </Label>
                                        <Select>
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
                                        checked={selectedItems.includes(item.id)}
                                        onCheckedChange={() => handleCheck(item.id)}
                                    />
                                    <Label htmlFor={item.id} className="text-sm">{item.label}</Label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div >
            </div >
        </div >
    )
}
