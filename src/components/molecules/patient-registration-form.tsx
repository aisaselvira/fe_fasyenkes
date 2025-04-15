import {Search, Calendar} from "lucide-react";
import {useState} from "react";
import {format} from "date-fns";
import {id} from "date-fns/locale";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/atoms/popover";
import {Calendar as CalendarComponent} from "@/components/atoms/calendar";
import {Input} from "@/components/atoms/input";
import {RadioGroup, RadioGroupItem} from "@/components/atoms/radio-group";
import {Checkbox} from "@/components/atoms/checkbox";
import {Label} from "@/components/atoms/label";
import {Button} from "@/components/atoms/button";

export function PatientRegistrationForm() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

    const handleReset = () => {
        // Get all form elements
        const form = document.querySelector("form") as HTMLFormElement;
        if (form) {
            form.reset();
        }

        // Reset the date picker state
        setSelectedDate(undefined);

        // Reset all checkboxes
        const checkboxes = document.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });

        // Reset all radio buttons
        const radioGroups = document.querySelectorAll('[role="radiogroup"]') as NodeListOf<HTMLElement>;
        radioGroups.forEach((group) => {
            const radios = group.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
            if (radios.length > 0) {
                radios.forEach((radio) => {
                    radio.checked = false;
                });
            }
        });

        // Reset textarea
        const textareas = document.querySelectorAll("textarea") as NodeListOf<HTMLTextAreaElement>;
        textareas.forEach((textarea) => {
            textarea.value = "";
        });
    };

    return (
        <div>
            <form>
                <div className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4 flex items-center">
                    <Search className="w-5 h-5 mr-2" />
                    <h3 className="font-medium">FORM REGISTRASI PASIEN BARU</h3>
                </div>

                <div className="bg-blue-100 p-4 rounded-md">
                    <h4 className="font-semibold text-blue-800 mb-4">DATA PRIBADI</h4>

                    <div className="grid grid-cols-[100px,1fr] sm:grid-cols-[150px,1fr] gap-y-4 items-center">
                        <Label htmlFor="nik" className="pr-4">
                            NIK/No KTP/No KIA
                        </Label>
                        <div className="relative">
                            <Input
                                id="nik"
                                type="text"
                                className="bg-white pr-10"
                                placeholder="Masukkan NIK/No KTP/No KIA"
                            />
                            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        </div>

                        <Label htmlFor="nama" className="pr-4">
                            Nama Lengkap <span className="text-red-500">*</span>
                        </Label>
                        <Input id="nama" type="text" placeholder="Nama Lengkap" className="bg-white" />

                        <Label htmlFor="tempat-lahir" className="pr-4">
                            Tempat Lahir <span className="text-red-500">*</span>
                        </Label>
                        <Input id="tempat-lahir" type="text" placeholder="Tempat Lahir" className="bg-white" />

                        <Label htmlFor="tanggal-lahir" className="pr-4">
                            Tanggal Lahir <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal bg-white"
                                        id="tanggal-lahir"
                                    >
                                        <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                                        <span className="placeholder:text-muted-foreground">
                                            {selectedDate
                                                ? format(selectedDate, "dd MMMM yyyy", {locale: id})
                                                : "Pilih Tanggal Lahir"}
                                        </span>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <CalendarComponent
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={setSelectedDate}
                                        initialFocus
                                        locale={id}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <Label className="pr-4">
                            Jenis Kelamin <span className="text-red-500">*</span>
                        </Label>
                        <div className="bg-white p-2 sm:p-4 rounded-md">
                            <RadioGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                        <Label className="pr-4">
                            Kebangsaan <span className="text-red-500">*</span>
                        </Label>
                        <div className="bg-white p-2 sm:p-4 rounded-md">
                            <RadioGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                        <Label htmlFor="alamat" className="pr-4">
                            Alamat
                        </Label>
                        <textarea
                            id="alamat"
                            placeholder="Alamat (Jalan/Desa)"
                            className="flex w-full rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px] resize-y"
                            rows={3}
                        />

                        <Label htmlFor="provinsi" className="pr-4">
                            Provinsi <span className="text-red-500">*</span>
                        </Label>
                        <Input id="provinsi" type="text" placeholder="Provinsi" className="bg-white" />

                        <Label htmlFor="kabupaten" className="pr-4">
                            Kabupaten/Kota <span className="text-red-500">*</span>
                        </Label>
                        <Input id="kabupaten" type="text" placeholder="Kabupaten/Kota" className="bg-white" />

                        <Label htmlFor="kecamatan" className="pr-4">
                            Kecamatan <span className="text-red-500">*</span>
                        </Label>
                        <Input id="kecamatan" type="text" placeholder="Kecamatan" className="bg-white" />

                        <Label htmlFor="no-hp" className="pr-4 flex items-center">
                            <span className="text-red-500 mr-1 relative group">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-48 bg-primary text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    Isi nomor HP yang aktif untuk komunikasi
                                </span>
                            </span>
                            No HP
                        </Label>
                        <Input id="no-hp" type="text" placeholder="No HP" className="bg-white" />

                        {/* Tingkat Pendidikan */}
                        <Label className="pr-4 flex items-center">
                            <span className="text-red-500 mr-1 relative group">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-48 bg-primary text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    Pilih tingkat pendidikan terakhir pasien
                                </span>
                            </span>
                            Tingkat Pendidikan
                        </Label>
                        <div className="bg-white p-2 sm:p-4 rounded-md">
                            <RadioGroup className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="tidak-sekolah" id="tidak-sekolah" />
                                    <Label htmlFor="tidak-sekolah">TIDAK SEKOLAH</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="slta-sederajat" id="slta-sederajat" />
                                    <Label htmlFor="slta-sederajat">SLTA SEDERAJAT</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="s1" id="s1" />
                                    <Label htmlFor="s1">S1</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="sd" id="sd" />
                                    <Label htmlFor="sd">SD</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="d1-d3-sederajat" id="d1-d3-sederajat" />
                                    <Label htmlFor="d1-d3-sederajat">D1-D3 SEDERAJAT</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="s2" id="s2" />
                                    <Label htmlFor="s2">S2</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="sltp-sederajat" id="sltp-sederajat" />
                                    <Label htmlFor="sltp-sederajat">SLTP SEDERAJAT</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="d4" id="d4" />
                                    <Label htmlFor="d4">D4</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="s3" id="s3" />
                                    <Label htmlFor="s3">S3</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Golongan Darah */}
                        <Label className="pr-4">Golongan Darah</Label>
                        <div className="bg-white p-2 sm:p-4 rounded-md">
                            <RadioGroup className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="a" id="a" />
                                    <Label htmlFor="a">A</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="ab" id="ab" />
                                    <Label htmlFor="ab">AB</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="unknown1" id="unknown1" />
                                    <Label htmlFor="unknown1">-</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="b" id="b" />
                                    <Label htmlFor="b">B</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="o" id="o" />
                                    <Label htmlFor="o">O</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Agama */}
                        <Label className="pr-4">Agama</Label>
                        <div className="bg-white p-2 sm:p-4 rounded-md">
                            <RadioGroup className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="islam" id="islam" />
                                    <Label htmlFor="islam">ISLAM</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="hindu" id="hindu" />
                                    <Label htmlFor="hindu">HINDU</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="penghayat" id="penghayat" />
                                    <Label htmlFor="penghayat">PENGHAYAT</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="kristen" id="kristen" />
                                    <Label htmlFor="kristen">KRISTEN</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="budha" id="budha" />
                                    <Label htmlFor="budha">BUDHA</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="lain-lain1" id="lain-lain1" />
                                    <Label htmlFor="lain-lain1">LAIN-LAIN ........</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="katholik" id="katholik" />
                                    <Label htmlFor="katholik">KATHOLIK</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="khong-hucu" id="khong-hucu" />
                                    <Label htmlFor="khong-hucu">KHONG HUCU</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Status Perkawinan */}
                        <Label className="pr-4 flex items-center">
                            <span className="text-red-500 mr-1 relative group">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-48 bg-primary text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    Pilih status perkawinan pasien saat ini
                                </span>
                            </span>
                            Status Perkawinan
                        </Label>
                        <div className="bg-white p-2 sm:p-4 rounded-md">
                            <RadioGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="belum-kawin" id="belum-kawin" />
                                    <Label htmlFor="belum-kawin">BELUM KAWIN</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="cerai-hidup" id="cerai-hidup" />
                                    <Label htmlFor="cerai-hidup">CERAI HIDUP</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="kawin" id="kawin" />
                                    <Label htmlFor="kawin">KAWIN</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="cerai-mati" id="cerai-mati" />
                                    <Label htmlFor="cerai-mati">CERAI MATI</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Pekerjaan */}
                        <Label className="pr-4 flex items-center">
                            <span className="text-red-500 mr-1 relative group">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-48 bg-primary text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    Pilih pekerjaan utama pasien saat ini
                                </span>
                            </span>
                            Pekerjaan
                        </Label>
                        <div className="bg-white p-2 sm:p-4 rounded-md">
                            <RadioGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="tidak-bekerja" id="tidak-bekerja" />
                                    <Label htmlFor="tidak-bekerja">TIDAK BEKERJA</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="bumn" id="bumn" />
                                    <Label htmlFor="bumn">BUMN</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="pns" id="pns" />
                                    <Label htmlFor="pns">PNS</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="pegawai-swasta" id="pegawai-swasta" />
                                    <Label htmlFor="pegawai-swasta">PEGAWAI SWASTA/ WIRAUSAHA</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="tni-polri" id="tni-polri" />
                                    <Label htmlFor="tni-polri">TNI/POLRI</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="lain-lain2" id="lain-lain2" />
                                    <Label htmlFor="lain-lain2">LAIN-LAIN ........</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Suku */}
                        <Label htmlFor="suku" className="pr-4 flex items-center">
                            <span className="text-red-500 mr-1 relative group">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-48 bg-primary text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    Isi suku/etnis pasien
                                </span>
                            </span>
                            Suku
                        </Label>
                        <Input id="suku" type="text" placeholder="Suku" className="bg-white" />

                        {/* Bahasa */}
                        <Label htmlFor="bahasa" className="pr-4 flex items-center">
                            <span className="text-red-500 mr-1 relative group">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-48 bg-primary text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    Isi bahasa yang dikuasai pasien
                                </span>
                            </span>
                            Bahasa
                        </Label>
                        <Input id="bahasa" type="text" placeholder="Bahasa yang dikuasai" className="bg-white" />

                        {/* Hambatan */}
                        <Label className="pr-4 flex items-center">
                            <span className="text-red-500 mr-1 relative group">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-48 bg-primary text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    Pilih hambatan yang dialami pasien
                                </span>
                            </span>
                            Hambatan
                        </Label>
                        <div className="bg-white p-2 sm:p-4 rounded-md">
                            <RadioGroup className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="tidak-ada" id="tidak-ada" />
                                    <Label htmlFor="tidak-ada">TIDAK ADA</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="g-penglihatan" id="g-penglihatan" />
                                    <Label htmlFor="g-penglihatan">G. PENGLIHATAN</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="g-bicara" id="g-bicara" />
                                    <Label htmlFor="g-bicara">G. BICARA</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="g-pendengaran" id="g-pendengaran" />
                                    <Label htmlFor="g-pendengaran">G. PENDENGARAN</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="g-emosi" id="g-emosi" />
                                    <Label htmlFor="g-emosi">G. EMOSI</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="lain-lain3" id="lain-lain3" />
                                    <Label htmlFor="lain-lain3">LAIN-LAIN ........</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Cara Pembayaran */}
                        <Label className="pr-4 flex items-center">
                            <span className="text-red-500 mr-1 relative group">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-48 bg-primary text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    Pilih metode pembayaran pasien
                                </span>
                            </span>
                            Cara Pembayaran
                        </Label>
                        <div className="bg-white p-2 sm:p-4 rounded-md">
                            <RadioGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="jkn" id="jkn" />
                                    <Label htmlFor="jkn">JKN</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="asuransi-lainnya" id="asuransi-lainnya" />
                                    <Label htmlFor="asuransi-lainnya">ASURANSI LAINNYA ......</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="mandiri" id="mandiri" />
                                    <Label htmlFor="mandiri">MANDIRI</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* No Jaminan */}
                        <Label htmlFor="no-jaminan" className="pr-4">
                            No Jaminan
                        </Label>
                        <Input id="no-jaminan" type="text" placeholder="No Jaminan" className="bg-white" />
                    </div>

                    {/* NILAI DAN KEYAKINAN */}
                    <h4 className="font-semibold text-blue-800 mt-8 mb-4">NILAI DAN KEYAKINAN</h4>
                    <div className="grid grid-cols-[100px,1fr] sm:grid-cols-[150px,1fr] gap-y-4 items-start">
                        <Label className="pr-4 flex items-center pt-2">
                            <span className="text-red-500 mr-1 relative group">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-48 bg-primary text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    Pilih nilai dan keyakinan pasien
                                </span>
                            </span>
                            Nilai dan Keyakinan
                        </Label>
                        <div className="bg-white p-2 sm:p-4 rounded-md">
                            <div className="grid grid-cols-1 gap-2">
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="tidak-ada-keyakinan" />
                                    <Label htmlFor="tidak-ada-keyakinan" className="text-sm">
                                        TIDAK ADA
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="tidak-mau-pulang" />
                                    <Label htmlFor="tidak-mau-pulang" className="text-sm">
                                        TIDAK MAU PULANG DI HARI TERTENTU
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="vegetarian" />
                                    <Label htmlFor="vegetarian" className="text-sm">
                                        VEGETARIAN
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="pola-diet" />
                                    <Label htmlFor="pola-diet" className="text-sm">
                                        POLA DIET TERTENTU
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="tidak-konsumsi" />
                                    <Label htmlFor="tidak-konsumsi" className="text-sm">
                                        TIDAK MENGKONSUMSI MAKANAN TERTENTU
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="menolak-transfusi" />
                                    <Label htmlFor="menolak-transfusi" className="text-sm">
                                        MENOLAK TRANFUSI DARAH
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="menolak-obat" />
                                    <Label htmlFor="menolak-obat" className="text-sm">
                                        MENOLAK OBAT DENGAN KEKHAWATIRAN MENGANDUNG UNSUR BABI
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="menolak-imunisasi" />
                                    <Label htmlFor="menolak-imunisasi" className="text-sm">
                                        MENOLAK IMUNISASI PADA BAYI BARU LAHIR
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="dilakukan-khitan" />
                                    <Label htmlFor="dilakukan-khitan" className="text-sm">
                                        DILAKUKAN ASUAHAN OLEH LAKI-LAKI/ PEREMPUAN
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="menolak-tindakan" />
                                    <Label htmlFor="menolak-tindakan" className="text-sm">
                                        MENOLAK TINDAKAN DI HARI TERTENTU
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PERMINTAAN PRIVACY */}
                    <h4 className="font-semibold text-blue-800 mt-8 mb-4">PERMINTAAN PRIVACY</h4>
                    <div className="grid grid-cols-[100px,1fr] sm:grid-cols-[150px,1fr] gap-y-4 items-start">
                        <Label className="pr-4 flex items-center pt-2">
                            <span className="text-red-500 mr-1 relative group">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-48 bg-primary text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    Pilih permintaan privasi pasien
                                </span>
                            </span>
                            Permintaan Privacy
                        </Label>
                        <div className="bg-white p-2 sm:p-4 rounded-md">
                            <div className="grid grid-cols-1 gap-2">
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="tidak-ada-privacy" />
                                    <Label htmlFor="tidak-ada-privacy" className="text-sm">
                                        TIDAK ADA
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="tidak-mau-diketahui" />
                                    <Label htmlFor="tidak-mau-diketahui" className="text-sm">
                                        TIDAK MAU DIKETAHUI JIKA DIRAWAT DI RS
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="menolak-dikunjungi" />
                                    <Label htmlFor="menolak-dikunjungi" className="text-sm">
                                        MENOLAK DIKUNJUNGI
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="tidak-mau-telepon" />
                                    <Label htmlFor="tidak-mau-telepon" className="text-sm">
                                        TIDAK MAU MENERIMA TELEPON DARI JARINGAN RS
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="tidak-mau-informasi" />
                                    <Label htmlFor="tidak-mau-informasi" className="text-sm">
                                        TIDAK MENGIZINKAN INFORMASI TENTANG KONDISI KESEHATAN
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Catatan */}
                    <div className="grid grid-cols-[100px,1fr] sm:grid-cols-[150px,1fr] gap-y-4 items-center mt-4">
                        <Label htmlFor="catatan" className="pr-4">
                            Catatan
                        </Label>
                        <Input id="catatan" type="text" placeholder="Catatan pasien" className="bg-white w-full" />
                    </div>

                    {/* PENERIMA INFORMASI KESEHATAN PASIEN */}
                    <h4 className="font-semibold text-blue-800 mt-8 mb-4">PENERIMA INFORMASI KESEHATAN PASIEN</h4>

                    {/* Penerima 1 */}
                    <div className="grid grid-cols-[100px,1fr] sm:grid-cols-[150px,1fr] gap-y-4 items-start">
                        <Label className="pr-4 flex items-center pt-2">
                            <span className="text-red-500 mr-1 relative group">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-48 bg-primary text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    Isi data penerima informasi kesehatan pasien
                                </span>
                            </span>
                            Penerima 1
                        </Label>
                        <div className="space-y-2">
                            <Input type="text" placeholder="Nama Keluarga" className="bg-white w-full" />
                            <Input type="text" placeholder="Hubungan Keluarga" className="bg-white w-full" />
                            <Input type="text" placeholder="No HP Keluarga" className="bg-white w-full" />
                        </div>
                    </div>

                    {/* Penerima 2 */}
                    <div className="grid grid-cols-[100px,1fr] sm:grid-cols-[150px,1fr] gap-y-4 items-start mt-4">
                        <Label className="pt-2 pr-4">Penerima 2</Label>
                        <div className="space-y-2">
                            <Input type="text" placeholder="Nama Keluarga" className="bg-white w-full" />
                            <Input type="text" placeholder="Hubungan Keluarga" className="bg-white w-full" />
                            <Input type="text" placeholder="No HP Keluarga" className="bg-white w-full" />
                        </div>
                    </div>

                    {/* Penerima 3 */}
                    <div className="grid grid-cols-[100px,1fr] sm:grid-cols-[150px,1fr] gap-y-4 items-start mt-4">
                        <Label className="pr-4 pt-2">Penerima 3</Label>
                        <div className="space-y-2">
                            <Input type="text" placeholder="Nama Keluarga" className="bg-white w-full" />
                            <Input type="text" placeholder="Hubungan Keluarga" className="bg-white w-full" />
                            <Input type="text" placeholder="No HP Keluarga" className="bg-white w-full" />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <Button type="button" className="bg-red-600 hover:bg-red-700 text-white" onClick={handleReset}>
                            Batal
                        </Button>
                        <Button type="submit" className="bg-blue-800 hover:bg-blue-900 text-white">
                            Simpan
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
