import { useState } from "react"
import { Input } from "@/components/atoms/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/select"
import { User } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/atoms/radio-group"
import { Label } from "@/components/atoms/label"
import { Checkbox } from "@/components/atoms/checkbox";

export default function PatientAdmissionForm() {
    const [date, setDate] = useState<string>("")
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const handleCheck = (value: string) => {
        setSelectedItems((prev) =>
            prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
        );
    };
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)
    const [Penerjemah, setPenerjemah] = useState<string>("")
    const [Bacatulis, setBacatulis] = useState<string>("")
    const [Jeniskelamin, setJeniskelamin] = useState<string>("")
    const [booking, setBooking] = useState("");
    const [naikKelas, setNaikKelas] = useState("");

    return (
        <div className="w-full  max-w-6xl mx-auto bg-white rounded-2xl border shadow-lg my-10">
            <div className="p-6 border-b  rounded-t-2xl">
                <h1 className="text-3xl font-bold text-black">ADMISI RAWAT INAP</h1>
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
                    <h3 className="font-semibold mb-3 sm:mb-4 ">Data  Rawat Inap</h3>
                    {/* Waktu Admisi */}
                    <div className="mt-4 max-h-[500px] border border-gray-100 rounded-md p-4 shadow-inner">
                        <div className="grid gap-3 sm:gap-4">
                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="jenis_perujuk" className="sm:mb-0 mb-1">
                                    Ruang Perawatan <span className="text-red-500">*</span>
                                </Label>
                                <Select>
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
                                <Label htmlFor="jenis_perujuk" className="sm:mb-0 mb-1">
                                    Tarif <span className="text-red-500">*</span>
                                </Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Tarif" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="rumah sakit">10000000</SelectItem>
                                        <SelectItem value="puskesmas">200000000</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="jenis_perujuk" className="sm:mb-0 mb-1">
                                    Kelas Tarif <span className="text-red-500">*</span>
                                </Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Kelas Tarif" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="rumah sakit">BPJS</SelectItem>
                                        <SelectItem value="puskesmas">Swasta</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="booking" className="sm:mb-0 mb-1">
                                    Boking Perawatan <span className="text-red-500">*</span>
                                </Label>
                                <RadioGroup
                                    id="booking"
                                    value={booking}
                                    onValueChange={(val) => setBooking(val)}
                                    className="flex gap-4"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="baru" id="booking-ya" />
                                        <Label htmlFor="booking-ya" className="text-sm">
                                            Ya
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="lama" id="booking-tidak" />
                                        <Label htmlFor="booking-tidak" className="text-sm">
                                            Tidak
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="naikKelas" className="sm:mb-0 mb-1">
                                    Naik Kelas <span className="text-red-500">*</span>
                                </Label>
                                <RadioGroup
                                    id="naikKelas"
                                    value={naikKelas}
                                    onValueChange={(val) => setNaikKelas(val)}
                                    className="flex gap-4"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="baru"
                                            id="naik-ya"
                                            className="border-green-500 data-[state=checked]:bg-green-500"
                                        />
                                        <Label htmlFor="naik-ya" className="text-sm">
                                            Ya
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="lama"
                                            id="naik-tidak"
                                            className="border-red-500 data-[state=checked]:bg-red-500"
                                        />
                                        <Label htmlFor="naik-tidak" className="text-sm">
                                            Tidak
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="klinik" className="sm:mb-0 mb-1">
                                    Dokter DPJP <span className="text-red-500">*</span>
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
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="waktuAdmisi" className="sm:mb-0 mb-1">
                                    Tanggal Masuk <span className="text-red-500">*</span>
                                </Label>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
                                    <Input
                                        id="waktuAdmisi"
                                        type="date"
                                        value={date}
                                        onChange={handleDateChange}
                                        className="sm:max-w-[200px]"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <Label htmlFor="klinik" className="sm:mb-0 mb-1">
                                    Cara Masuk <span className="text-red-500">*</span>
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
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
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

                    <div className="p-5 sm:p-4">
                        <h3 className="font-semibold mb-3 sm:mb-4 ">Penangung Jawab</h3>
                        <div className="mt-4 max-h-[500px] border-gray-100 rounded-md p-4 shadow-inner">
                            <div className="grid gap-3 sm:gap-4">
                                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                    <Label className="font-medium">Nama PJ<span className="text-red-500">*</span></Label>
                                    <Input className="" placeholder="" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                    <Label htmlFor="waktuAdmisi" className="sm:mb-0 mb-1">
                                        Jenis Kelamin<span className="text-red-500">*</span>
                                    </Label>
                                    <RadioGroup
                                        id="jeniskelamin"
                                        value={Jeniskelamin}
                                        onValueChange={(val) => setJeniskelamin(val)}
                                        className="flex gap-4"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="baru"
                                                id="naik-ya"
                                                className="border-green-500 data-[state=checked]:bg-green-500"
                                            />
                                            <Label htmlFor="naik-ya" className="text-sm">
                                                Laki-laki
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="lama"
                                                id="naik-tidak"
                                                className="border-red-500 data-[state=checked]:bg-red-500"
                                            />
                                            <Label htmlFor="naik-tidak" className="text-sm">
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
                                            id="tanggal_rujukan"
                                            type="date"
                                            value={date}
                                            onChange={handleDateChange}
                                            className="sm:max-w-[200px]"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                    <Label className="font-medium">Nomor Identitas <span className="text-red-500">*</span></Label>
                                    <Input className="" placeholder="" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                    <Label className="font-medium">Telepon <span className="text-red-500">*</span></Label>
                                    <Input className="" placeholder="" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                    <Label htmlFor="jenis_perujuk" className="sm:mb-0 mb-1">
                                        Alamat <span className="text-red-500">*</span>
                                    </Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Alamat Rumah Sakit" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="rumah sakit">.....</SelectItem>
                                            <SelectItem value="puskesmas">....</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                    <Label className="font-medium">Hubungan<span className="text-red-500">*</span></Label>
                                    <Input className="" placeholder="Masukkan Catatan Kunjungan" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                    <Label className="font-medium">Hambatan<span className="text-red-500">*</span></Label>
                                    <div className="w-full max-w-md justify-center grid grid-rows-3 grid-flow-col gap-1 bg-blue-50 ">
                                        {[
                                            { id: "KARTU_PASIEN", label: "Tidak ada ganguan" },
                                            { id: "POLIKLINIK", label: "ganguan Pendengaran" },
                                            { id: "LABEL_KECIL", label: "Ganguan Emosi" },
                                            { id: "LABEL_BESAR", label: "Gangguan Penglihatan" },
                                            { id: "TRACER", label: "Ganguan Bicara" },
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
                                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                    <Label htmlFor="waktuAdmisi" className="sm:mb-0 mb-1">
                                        Baca Tulis <span className="text-red-500">*</span>
                                    </Label>
                                    <RadioGroup
                                        id="bacatulis"
                                        value={Bacatulis}
                                        onValueChange={(val) => setBacatulis(val)}
                                        className="flex gap-4"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="baru"
                                                id="naik-ya"
                                                className="border-green-500 data-[state=checked]:bg-green-500"
                                            />
                                            <Label htmlFor="naik-ya" className="text-sm">
                                                Bisa
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="lama"
                                                id="naik-tidak"
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
                                        value={Penerjemah}
                                        onValueChange={(val) => setPenerjemah(val)}
                                        className="flex gap-4"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="baru"
                                                id="naik-ya"
                                                className="border-green-500 data-[state=checked]:bg-green-500"
                                            />
                                            <Label htmlFor="naik-ya" className="text-sm">
                                                Butuh
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="lama"
                                                id="naik-tidak"
                                                className="border-red-500 data-[state=checked]:bg-red-500"
                                            />
                                            <Label htmlFor="naik-tidak" className="text-sm">
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
                            <div className="grid gap-3 sm:gap-4">
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
                            </div>
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
                    <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                        <Label htmlFor="Catatan" className="sm:mb-0 mb-1">
                            Catatan
                        </Label>
                        <div className="flex gap-2">
                            <Input id="Catatan" placeholder="Catatan" />
                        </div>
                    </div>
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
