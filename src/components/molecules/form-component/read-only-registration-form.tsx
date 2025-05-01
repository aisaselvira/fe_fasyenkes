import {Search, Calendar} from "lucide-react";
import {Label} from "@/components/atoms/label";

export function ReadOnlyRegistrationForm() {
    return (
        <div>
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
                    <div className="bg-white border border-gray-300 rounded-md px-3 py-2">3276051908000003</div>

                    <Label htmlFor="nama" className="pr-4">
                        Nama Lengkap <span className="text-red-500">*</span>
                    </Label>
                    <div className="bg-white border border-gray-300 rounded-md px-3 py-2">DINA</div>

                    <Label htmlFor="tempat-lahir" className="pr-4">
                        Tempat Lahir <span className="text-red-500">*</span>
                    </Label>
                    <div className="bg-white border border-gray-300 rounded-md px-3 py-2">JAKARTA</div>

                    <Label htmlFor="tanggal-lahir" className="pr-4">
                        Tanggal Lahir <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                        <div className="flex w-full justify-start text-left font-normal bg-white border border-gray-300 rounded-md px-3 py-2">
                            <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                            <span>11 JULI 1990</span>
                        </div>
                    </div>

                    <Label className="pr-4">
                        Jenis Kelamin <span className="text-red-500">*</span>
                    </Label>
                    <div className="bg-white p-2 sm:p-4 rounded-md">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>LAKI-LAKI</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>TIDAK DAPAT DITENTUKAN</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                </div>
                                <Label>PEREMPUAN</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>TIDAK MENGISI</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>TIDAK DIKETAHUI</Label>
                            </div>
                        </div>
                    </div>

                    <Label className="pr-4">
                        Kebangsaan <span className="text-red-500">*</span>
                    </Label>
                    <div className="bg-white p-2 sm:p-4 rounded-md">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                </div>
                                <Label>WNI</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>WNA</Label>
                            </div>
                        </div>
                    </div>

                    <Label htmlFor="alamat" className="pr-4">
                        Alamat
                    </Label>
                    <div className="bg-white border border-gray-300 rounded-md px-3 py-2 min-h-[80px]">
                        JL. MERDEKA NO 10 RT/RW 001/002 CALUNG TUNGGAL, DEPOK, JAWA BARAT
                    </div>

                    <Label htmlFor="provinsi" className="pr-4">
                        Provinsi <span className="text-red-500">*</span>
                    </Label>
                    <div className="bg-white border border-gray-300 rounded-md px-3 py-2">
                        DAERAH ISTIMEWA YOGYAKARTA
                    </div>

                    <Label htmlFor="kabupaten" className="pr-4">
                        Kabupaten/Kota <span className="text-red-500">*</span>
                    </Label>
                    <div className="bg-white border border-gray-300 rounded-md px-3 py-2">SLEMAN</div>

                    <Label htmlFor="kecamatan" className="pr-4">
                        Kecamatan <span className="text-red-500">*</span>
                    </Label>
                    <div className="bg-white border border-gray-300 rounded-md px-3 py-2">DEPOK</div>

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
                    <div className="bg-white border border-gray-300 rounded-md px-3 py-2">081234567890</div>

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
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>TIDAK SEKOLAH</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>SLTA SEDERAJAT</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                </div>
                                <Label>S1</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>SD</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>D1-D3 SEDERAJAT</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>S2</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>SLTP SEDERAJAT</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>D4</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>S3</Label>
                            </div>
                        </div>
                    </div>

                    {/* Golongan Darah */}
                    <Label className="pr-4">Golongan Darah</Label>
                    <div className="bg-white p-2 sm:p-4 rounded-md">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>A</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>AB</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>-</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                </div>
                                <Label>B</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>O</Label>
                            </div>
                        </div>
                    </div>

                    {/* Agama */}
                    <Label className="pr-4">Agama</Label>
                    <div className="bg-white p-2 sm:p-4 rounded-md">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                </div>
                                <Label>ISLAM</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>HINDU</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>PENGHAYAT</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>KRISTEN</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>BUDHA</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>LAIN-LAIN ........</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>KATHOLIK</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>KHONG HUCU</Label>
                            </div>
                        </div>
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>BELUM KAWIN</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>CERAI HIDUP</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                </div>
                                <Label>KAWIN</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>CERAI MATI</Label>
                            </div>
                        </div>
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>TIDAK BEKERJA</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>BUMN</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                </div>
                                <Label>PNS</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>PEGAWAI SWASTA/ WIRAUSAHA</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>TNI/POLRI</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>LAIN-LAIN ........</Label>
                            </div>
                        </div>
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
                    <div className="bg-white border border-gray-300 rounded-md px-3 py-2">JAWA</div>

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
                    <div className="bg-white border border-gray-300 rounded-md px-3 py-2">INDONESIA</div>

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
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                </div>
                                <Label>TIDAK ADA</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>G. PENGLIHATAN</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>G. BICARA</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>G. PENDENGARAN</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>G. EMOSI</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>LAIN-LAIN ........</Label>
                            </div>
                        </div>
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                </div>
                                <Label>JKN</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>ASURANSI LAINNYA ......</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <Label>MANDIRI</Label>
                            </div>
                        </div>
                    </div>

                    {/* No Jaminan */}
                    <Label htmlFor="no-jaminan" className="pr-4">
                        No Jaminan
                    </Label>
                    <div className="bg-white border border-gray-300 rounded-md px-3 py-2">0000000000000000</div>
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
                                <div className="mt-1 w-4 h-4 rounded border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white"></div>
                                </div>
                                <Label>TIDAK ADA</Label>
                            </div>
                            <div className="flex items-start space-x-2">
                                <div className="mt-1 w-4 h-4 rounded border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white"></div>
                                </div>
                                <Label>TIDAK MAU PULANG DI HARI TERTENTU</Label>
                            </div>
                            <div className="flex items-start space-x-2">
                                <div className="mt-1 w-4 h-4 rounded border border-gray-400 flex items-center justify-center">
                                    <svg
                                        className="w-3 h-3 text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="3"
                                            d="M5 13l4 4L19 7"
                                        ></path>
                                    </svg>
                                </div>
                                <Label>VEGETARIAN</Label>
                            </div>
                            <div className="flex items-start space-x-2">
                                <div className="mt-1 w-4 h-4 rounded border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white"></div>
                                </div>
                                <Label>POLA DIET TERTENTU</Label>
                            </div>
                            <div className="flex items-start space-x-2">
                                <div className="mt-1 w-4 h-4 rounded border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white"></div>
                                </div>
                                <Label>TIDAK MENGKONSUMSI MAKANAN TERTENTU</Label>
                            </div>
                            <div className="flex items-start space-x-2">
                                <div className="mt-1 w-4 h-4 rounded border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white"></div>
                                </div>
                                <Label>MENOLAK TRANFUSI DARAH</Label>
                            </div>
                            <div className="flex items-start space-x-2">
                                <div className="mt-1 w-4 h-4 rounded border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white"></div>
                                </div>
                                <Label>MENOLAK OBAT DENGAN KEKHAWATIRAN MENGANDUNG UNSUR BABI</Label>
                            </div>
                            <div className="flex items-start space-x-2">
                                <div className="mt-1 w-4 h-4 rounded border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white"></div>
                                </div>
                                <Label>MENOLAK IMUNISASI PADA BAYI BARU LAHIR</Label>
                            </div>
                            <div className="flex items-start space-x-2">
                                <div className="mt-1 w-4 h-4 rounded border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white"></div>
                                </div>
                                <Label>DILAKUKAN ASUAHAN OLEH LAKI-LAKI/ PEREMPUAN</Label>
                            </div>
                            <div className="flex items-start space-x-2">
                                <div className="mt-1 w-4 h-4 rounded border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white"></div>
                                </div>
                                <Label>MENOLAK TINDAKAN DI HARI TERTENTU</Label>
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
                                <div className="mt-1 w-4 h-4 rounded border border-gray-400 flex items-center justify-center">
                                    <svg
                                        className="w-3 h-3 text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="3"
                                            d="M5 13l4 4L19 7"
                                        ></path>
                                    </svg>
                                </div>
                                <Label>TIDAK ADA</Label>
                            </div>
                            <div className="flex items-start space-x-2">
                                <div className="mt-1 w-4 h-4 rounded border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white"></div>
                                </div>
                                <Label>TIDAK MAU DIKETAHUI JIKA DIRAWAT DI RS</Label>
                            </div>
                            <div className="flex items-start space-x-2">
                                <div className="mt-1 w-4 h-4 rounded border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white"></div>
                                </div>
                                <Label>MENOLAK DIKUNJUNGI</Label>
                            </div>
                            <div className="flex items-start space-x-2">
                                <div className="mt-1 w-4 h-4 rounded border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white"></div>
                                </div>
                                <Label>TIDAK MAU MENERIMA TELEPON DARI JARINGAN RS</Label>
                            </div>
                            <div className="flex items-start space-x-2">
                                <div className="mt-1 w-4 h-4 rounded border border-gray-400 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white"></div>
                                </div>
                                <Label>TIDAK MENGIZINKAN INFORMASI TENTANG KONDISI KESEHATAN</Label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Catatan */}
                <div className="grid grid-cols-[100px,1fr] sm:grid-cols-[150px,1fr] gap-y-4 items-center mt-4">
                    <Label htmlFor="catatan" className="pr-4">
                        Catatan
                    </Label>
                    <div className="bg-white border border-gray-300 rounded-md px-3 py-2">
                        Pasien memiliki alergi terhadap seafood
                    </div>
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
                        <div className="bg-white border border-gray-300 rounded-md px-3 py-2">BUDI SANTOSO</div>
                        <div className="bg-white border border-gray-300 rounded-md px-3 py-2">SUAMI</div>
                        <div className="bg-white border border-gray-300 rounded-md px-3 py-2">081234567890</div>
                    </div>
                </div>

                {/* Penerima 2 */}
                <div className="grid grid-cols-[100px,1fr] sm:grid-cols-[150px,1fr] gap-y-4 items-start mt-4">
                    <Label className="pr-4 pt-2">Penerima 2</Label>
                    <div className="space-y-2">
                        <div className="bg-white border border-gray-300 rounded-md px-3 py-2">SITI RAHAYU</div>
                        <div className="bg-white border border-gray-300 rounded-md px-3 py-2">ANAK</div>
                        <div className="bg-white border border-gray-300 rounded-md px-3 py-2">082345678901</div>
                    </div>
                </div>

                {/* Penerima 3 */}
                <div className="grid grid-cols-[100px,1fr] sm:grid-cols-[150px,1fr] gap-y-4 items-start mt-4">
                    <Label className="pr-4 pt-2">Penerima 3</Label>
                    <div className="space-y-2">
                        <div className="bg-white border border-gray-300 rounded-md px-3 py-2">-</div>
                        <div className="bg-white border border-gray-300 rounded-md px-3 py-2">-</div>
                        <div className="bg-white border border-gray-300 rounded-md px-3 py-2">-</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
