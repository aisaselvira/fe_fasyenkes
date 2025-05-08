export function ReadOnlyInpatientAdmissionForm() {
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
                        <div>: 00000123</div>

                        <div className="text-right pr-4 font-medium">Nama</div>
                        <div>: DINA</div>

                        <div className="text-right pr-4 font-medium">NIK</div>
                        <div>: 3323071508000008</div>

                        <div className="text-right pr-4 font-medium">Tanggal Lahir</div>
                        <div>: 15-07-1985</div>

                        <div className="text-right pr-4 font-medium">Alamat</div>
                        <div>: POGUNG KIDUL NO 90 RT/RW 001/002, CATURTUNGGAL, DEPOK, SLEMAN, DIY</div>

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
                    <div className="text-center text-red-600 font-medium mb-4 bg-red-50 p-2 rounded-md">
                        BELUM ADA DATA RESERVASI
                    </div>

                    {/* Inpatient Data */}
                    <div className="mb-6 border border-gray-200 rounded-md p-4 shadow-md">
                        <h3 className="font-semibold mb-3">Data Rawat Inap</h3>
                        <div className="grid grid-cols-[150px,1fr] gap-y-4 items-center">
                            <div className="text-right pr-4 font-medium">Ruang Perawatan</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">Ruang Mawar</div>

                            <div className="text-right pr-4 font-medium">Tarif</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">Tarif B</div>

                            <div className="text-right pr-4 font-medium">Kelas Tarif</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">Kelas 2</div>

                            <div className="text-right pr-4 font-medium">Booking Perawatan</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">Ya</div>

                            <div className="text-right pr-4 font-medium">Naik Kelas?</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">Tidak</div>

                            <div className="text-right pr-4 font-medium">Dokter DPJP</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">dr. Andi, Sp.PD</div>

                            <div className="text-right pr-4 font-medium">Tanggal Masuk</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">15 Jul 2023</div>

                            <div className="text-right pr-4 font-medium">Cara Masuk</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">Rujukan</div>

                            <div className="text-right pr-4 font-medium">Cara Pembayaran</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">BPJS</div>

                            <div className="text-right pr-4 font-medium">No Asuransi</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50 w-full">0000889999899</div>
                        </div>
                    </div>

                    {/* Penanggung Jawab */}
                    <div className="mb-6 border border-gray-200 rounded-md p-4 shadow-md">
                        <h3 className="font-semibold mb-3">Penanggung Jawab</h3>
                        <div className="grid grid-cols-[150px,1fr] gap-y-4 items-center">
                            <div className="text-right pr-4 font-medium">Nama PJ</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">Budi Santoso</div>

                            <div className="text-right pr-4 font-medium">Jenis Kelamin</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">Laki-laki</div>

                            <div className="text-right pr-4 font-medium">Tanggal Lahir</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">10 Jan 1980</div>

                            <div className="text-right pr-4 font-medium">Nomor Identitas</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">3323071508800001</div>

                            <div className="text-right pr-4 font-medium">Telepon</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">081234567890</div>

                            <div className="text-right pr-4 font-medium">Alamat</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">Alamat Pasien</div>

                            <div className="text-right pr-4 font-medium">Hubungan</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">Suami</div>

                            <div className="text-right pr-4 font-medium">Hambatan</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">Tidak ada gangguan</div>

                            <div className="text-right pr-4 font-medium">Baca Tulis</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">Bisa</div>

                            <div className="text-right pr-4 font-medium">Penerjemahan</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">Tidak</div>
                        </div>
                    </div>

                    {/* Penerima Informasi */}
                    <div className="mb-6 border border-gray-200 rounded-md p-4 shadow-md">
                        <h3 className="font-semibold mb-3">Penerima Informasi Kesehatan Pasien</h3>

                        {/* Penerima 1 */}
                        <div className="mb-4">
                            <div className="grid grid-cols-[150px,1fr] gap-y-2 items-center">
                                <div className="text-right pr-4 font-medium">Penerima 1</div>
                                <div className="space-y-2">
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">Budi Santoso</div>
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">Suami</div>
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">081234567890</div>
                                </div>
                            </div>
                        </div>

                        {/* Penerima 2 */}
                        <div className="mb-4">
                            <div className="grid grid-cols-[150px,1fr] gap-y-2 items-center">
                                <div className="text-right pr-4 font-medium">Penerima 2</div>
                                <div className="space-y-2">
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">Siti Rahayu</div>
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">Anak</div>
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">082345678901</div>
                                </div>
                            </div>
                        </div>

                        {/* Penerima 3 */}
                        <div>
                            <div className="grid grid-cols-[150px,1fr] gap-y-2 items-center">
                                <div className="text-right pr-4 font-medium">Penerima 3</div>
                                <div className="space-y-2">
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">-</div>
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">-</div>
                                    <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">-</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Nilai dan Keyakinan */}
                    <div className="mb-6 border border-gray-200 rounded-md p-4 shadow-md">
                        <h3 className="font-semibold mb-3">Nilai dan Keyakinan</h3>
                        <div className="grid grid-cols-[150px,1fr] gap-y-4 items-start">
                            <div className="text-right pr-4 font-medium pt-2">Nilai dan Keyakinan</div>
                            <div className="bg-gray-50 p-3 border rounded-md">
                                <div className="grid grid-cols-1 gap-2">
                                    <div className="flex items-start space-x-2">
                                        <div className="mt-1 w-4 h-4 rounded border border-gray-400 flex items-center justify-center">
                                            <div className="w-2 h-2 bg-white"></div>
                                        </div>
                                        <span>TIDAK ADA</span>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <div className="mt-1 w-4 h-4 rounded border border-gray-400 flex items-center justify-center">
                                            <div className="w-2 h-2 bg-white"></div>
                                        </div>
                                        <span>TIDAK MAU PULANG DI HARI TERTENTU</span>
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
                                        <span>VEGETARIAN</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Permintaan Privacy */}
                    <div className="mb-6 border border-gray-200 rounded-md p-4 shadow-md">
                        <h3 className="font-semibold mb-3">Permintaan Privacy</h3>
                        <div className="grid grid-cols-[150px,1fr] gap-y-4 items-start">
                            <div className="text-right pr-4 font-medium pt-2">Permintaan Privacy</div>
                            <div className="bg-gray-50 p-3 border rounded-md">
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
                                        <span>TIDAK ADA</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-[150px,1fr] gap-y-4 items-center mt-4">
                            <div className="text-right pr-4 font-medium">Catatan</div>
                            <div className="h-9 py-1.5 px-3 border rounded-md bg-gray-50">
                                Pasien memiliki alergi terhadap seafood
                            </div>
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
                                        id="lembar-ri"
                                        className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                        checked={true}
                                        disabled
                                    />
                                    <label htmlFor="lembar-ri" className="text-sm font-medium">
                                        Lembar RI
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
                            </div>

                            {/* Column 2 */}
                            <div className="space-y-3">
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
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="gelang-pasien"
                                        className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                        checked={true}
                                        disabled
                                    />
                                    <label htmlFor="gelang-pasien" className="text-sm font-medium">
                                        Gelang Pasien
                                    </label>
                                </div>
                            </div>

                            {/* Column 3 */}
                            <div className="space-y-3">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
