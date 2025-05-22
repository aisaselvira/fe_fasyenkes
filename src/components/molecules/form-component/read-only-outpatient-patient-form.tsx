import {AlertCircle} from "lucide-react";

export function ReadOnlyOutpatientAdmissionForm() {
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
                        <div>: 000222</div>

                        <div className="text-right pr-4 font-medium">Nama</div>
                        <div>: DINA</div>

                        <div className="text-right pr-4 font-medium">NIK</div>
                        <div>: 3323071508000008</div>

                        <div className="text-right pr-4 font-medium">Tanggal Lahir</div>
                        <div>: 14-07-1990</div>

                        <div className="text-right pr-4 font-medium">Alamat</div>
                        <div>: JL. MERDEKA NO. 50 RT/RW 001/002, CATURTUNGGAL, DEPOK, SLEMAN, DIY</div>

                        <div className="text-right pr-4 font-medium">No. Kartu BPJS</div>
                        <div>: 0000889999899</div>
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

                    {/* Visit Data */}
                    <div className="mb-6 border border-gray-200 rounded-md p-4 shadow-md">
                        <h3 className="font-semibold mb-3">Data Kunjungan</h3>
                        <div className="grid grid-cols-[150px,1fr] gap-y-4 items-center">
                            <div className="text-right pr-4 font-medium">Waktu Admisi</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">20 Jul 2023</div>

                            <div className="text-right pr-4 font-medium">Tipe Pasien</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">Lama</div>

                            <div className="text-right pr-4 font-medium">Klinik</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">Poli Gigi dan Mulut</div>

                            <div className="text-right pr-4 font-medium">Dokter Klinik</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">dr. Cahaya</div>

                            <div className="text-right pr-4 font-medium">Cara Masuk</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">Rujukan/ Datang Sendiri</div>

                            <div className="text-right pr-4 font-medium">Cara Pembayaran</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">BPJS</div>

                            <div className="text-right pr-4 font-medium">No Asuransi</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50 w-full">0000889999899</div>
                        </div>
                    </div>

                    {/* Referral Data */}
                    <div className="mb-6 border border-gray-200 rounded-md p-4 shadow-md">
                        <h3 className="font-semibold mb-3">Data Rujukan</h3>
                        <div className="grid grid-cols-[150px,1fr] gap-y-4 items-center">
                            <div className="text-right pr-4 font-medium">Nomor Rujukan</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50 w-full">
                                0220/13003/1/0000445
                            </div>

                            <div className="text-right pr-4 font-medium">Tanggal Rujukan</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">22 Jun 2023</div>

                            <div className="text-right pr-4 font-medium">Perujuk</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50 w-full">PUSKESMAS DEPOK</div>

                            <div className="text-right pr-4 font-medium">Kode PPK (BPJS)</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50 w-full">1000002</div>

                            <div className="text-right pr-4 font-medium">Jenis Perujuk</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">PUSKESMAS</div>

                            <div className="text-right pr-4 font-medium">Catatan Kunjungan</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50 w-full">
                                Pasien rujukan dari Puskesmas
                            </div>
                        </div>
                    </div>

                    {/* SEP Data */}
                    <div className="border border-gray-200 rounded-md p-4 shadow-md">
                        <h3 className="font-semibold mb-3">Data SEP</h3>
                        <div className="grid grid-cols-[150px,1fr] gap-y-4 items-center">
                            <div className="text-right pr-4 font-medium">No SEP</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50 w-full">0001234567890</div>

                            <div className="text-right pr-4 font-medium">Tujuan Kunjungan</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50 w-full">Kontrol</div>

                            <div className="text-right pr-4 font-medium">Prosedur</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50 w-full">Prosedur 1</div>

                            <div className="text-right pr-4 font-medium">Assessment</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50 w-full">Assessment 1</div>

                            <div className="text-right pr-4 font-medium">Diagnosis Awal</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50 w-full">Gingivitis Acute</div>

                            <div className="text-right pr-4 font-medium">Katarak</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50 w-full">Tidak</div>

                            <div className="text-right pr-4 font-medium">Follow Up</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50 w-full">7 hari</div>

                            <div className="text-right pr-4 font-medium">Catatan</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50 w-full">
                                Pasien rujukan dari Puskesmas
                            </div>

                            <div className="text-right pr-4 font-medium">Kecelakaan</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50 w-full">Bukan Kecelakaan</div>
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
                                        checked={true}
                                        disabled
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
                                        checked={true}
                                        disabled
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
                                        checked={false}
                                        disabled
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
                                        checked={false}
                                        disabled
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
                                        checked={true}
                                        disabled
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
                                        checked={true}
                                        disabled
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
                                        checked={true}
                                        disabled
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
                                        checked={true}
                                        disabled
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
                                        checked={false}
                                        disabled
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
                                        checked={false}
                                        disabled
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
                                        checked={false}
                                        disabled
                                    />
                                    <label htmlFor="kartu-kendali" className="text-sm font-medium">
                                        Kartu Kendali
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Queue Number Display */}
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
                        <div className="flex items-center gap-2 text-green-700">
                            <AlertCircle className="h-5 w-5" />
                            <p className="font-medium">
                                Nomor antrian klinik Gigi dan Mulut{" "}
                                <span className="text-red-600 font-bold text-xl">G011</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
