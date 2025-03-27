import {Search, Calendar} from "lucide-react";
import {Input} from "@/components/atoms/input";
import {RadioGroup, RadioGroupItem} from "@/components/atoms/radio-group";
import {Label} from "@/components/atoms/label";

export function PatientRegistrationForm() {
    return (
        <div>
            <div className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4 flex items-center">
                <Search className="w-5 h-5 mr-2" />
                <h3 className="font-medium">FORM REGISTRASI PASIEN BARU</h3>
            </div>

            <div className="bg-blue-100 p-4 rounded-md">
                <h4 className="font-semibold text-blue-800 mb-4">DATA PRIBADI</h4>

                <div className="grid grid-cols-[150px,1fr] gap-y-4 items-center">
                    <Label htmlFor="nik" className="text-right pr-4">
                        NIK/No KTP/No KIA
                    </Label>
                    <div className="relative">
                        <Input id="nik" type="text" className="bg-white pr-10" />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>

                    <Label htmlFor="nama" className="text-right pr-4">
                        Nama Lengkap <span className="text-red-500">*</span>
                    </Label>
                    <Input id="nama" type="text" placeholder="Nama Lengkap" className="bg-white" />

                    <Label htmlFor="tempat-lahir" className="text-right pr-4">
                        Tempat Lahir <span className="text-red-500">*</span>
                    </Label>
                    <Input id="tempat-lahir" type="text" placeholder="Tempat Lahir" className="bg-white" />

                    <Label htmlFor="tanggal-lahir" className="text-right pr-4">
                        Tanggal Lahir <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                        <Input id="tanggal-lahir" type="text" placeholder="Tanggal Lahir" className="bg-white pr-10" />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>

                    <Label className="text-right pr-4">
                        Jenis Kelamin <span className="text-red-500">*</span>
                    </Label>
                    <div className="bg-blue-50 p-2 rounded-md">
                        <RadioGroup defaultValue="laki-laki" className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="laki-laki" id="laki-laki" />
                                <Label htmlFor="laki-laki">LAKI-LAKI</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="tidak-dapat-ditentukan" id="tidak-dapat-ditentukan" />
                                <Label htmlFor="tidak-dapat-ditentukan">TIDAK DAPAT DITENTUKAN</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="perempuan" id="perempuan" />
                                <Label htmlFor="perempuan">PEREMPUAN</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="tidak-mengisi" id="tidak-mengisi" />
                                <Label htmlFor="tidak-mengisi">TIDAK MENGISI</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="tidak-diketahui" id="tidak-diketahui" />
                                <Label htmlFor="tidak-diketahui">TIDAK DIKETAHUI</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <Label className="text-right pr-4">
                        Kebangsaan <span className="text-red-500">*</span>
                    </Label>
                    <div className="bg-blue-50 p-2 rounded-md">
                        <RadioGroup defaultValue="wni" className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="wni" id="wni" />
                                <Label htmlFor="wni">WNI</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="wna" id="wna" />
                                <Label htmlFor="wna">WNA</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <Label htmlFor="alamat" className="text-right pr-4">
                        Alamat
                    </Label>
                    <Input id="alamat" type="text" placeholder="Alamat (Jalan/Desa)" className="bg-white" />

                    <Label htmlFor="provinsi" className="text-right pr-4">
                        Provinsi <span className="text-red-500">*</span>
                    </Label>
                    <Input id="provinsi" type="text" placeholder="Provinsi" className="bg-white" />

                    <Label htmlFor="kabupaten" className="text-right pr-4">
                        Kabupaten/Kota <span className="text-red-500">*</span>
                    </Label>
                    <Input id="kabupaten" type="text" placeholder="Kabupaten/Kota" className="bg-white" />

                    <Label htmlFor="kecamatan" className="text-right pr-4">
                        Kecamatan <span className="text-red-500">*</span>
                    </Label>
                    <Input id="kecamatan" type="text" placeholder="Kecamatan" className="bg-white" />

                    <Label htmlFor="no-hp" className="text-right pr-4 flex items-center">
                        <span className="text-red-500 mr-1">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                        No HP
                    </Label>
                    <Input id="no-hp" type="text" placeholder="No HP" className="bg-white" />
                </div>
            </div>
        </div>
    );
}
