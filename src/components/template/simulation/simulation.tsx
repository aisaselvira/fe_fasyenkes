import {PatientManagementTemplate} from "@/components/template/simulation/patient-management";

// Define case filter options
const caseFilters = [
    {id: "pasien-lama", label: "Pasien lama"},
    {id: "pasien-baru", label: "Pasien baru"},
    {id: "asuransi", label: "Asuransi"},
    {id: "pembayaran-mandiri", label: "Pembayaran Mandiri"},
];

// Sample patient data for TPPRJ
const tpprjCases = [
    {
        id: 1,
        jenisPasien: "Pasien lama",
        jenisKunjungan: "Rawat jalan",
        diagnosis: "Diabetes Militus",
        kasus: "Pasien dengan SKDP (Surat Keterangan Dalam Pemeriksaan)",
        metodePembayaran: "BPJS Kesehatan",
    },
    {
        id: 2,
        jenisPasien: "Pasien lama",
        jenisKunjungan: "Rawat jalan",
        diagnosis: "Aterosklerosis",
        kasus: "Pasien dengan SKDP (Surat Keterangan Dalam Pemeriksaan)",
        metodePembayaran: "BPJS Kesehatan",
    },
    {
        id: 3,
        jenisPasien: "Pasien lama",
        jenisKunjungan: "Rawat jalan",
        diagnosis: "Blefaritis",
        kasus: "Pasien dengan SKDP (Surat Keterangan Dalam Pemeriksaan)",
        metodePembayaran: "BPJS Kesehatan",
    },
    {
        id: 4,
        jenisPasien: "Pasien baru",
        jenisKunjungan: "Rawat jalan",
        diagnosis: "Gingitivis akut",
        kasus: "Pasien dengan rujukan baru",
        metodePembayaran: "BPJS Kesehatan",
    },
    {
        id: 5,
        jenisPasien: "Pasien lama",
        jenisKunjungan: "Rawat jalan",
        diagnosis: "Periodontitis",
        kasus: "Mengaku pasien baru dengan membawa surat rujukan baru",
        metodePembayaran: "BPJS Kesehatan",
    },
    {
        id: 6,
        jenisPasien: "Pasien baru",
        jenisKunjungan: "Rawat jalan",
        diagnosis: "Obsessive Compulsive Disorder",
        kasus: "Pasien baru ingin konsultasi ke klinik jiwa dengan biaya sendiri",
        metodePembayaran: "Mandiri",
    },
    {
        id: 7,
        jenisPasien: "Pasien lama",
        jenisKunjungan: "Rawat jalan",
        diagnosis: "-",
        kasus: "Pasien yang mengaku pasien baru dan ingin meminta surat keterangan sehat dan bebas NAPZA",
        metodePembayaran: "Mandiri",
    },
    {
        id: 8,
        jenisPasien: "Pasien lama",
        jenisKunjungan: "Rawat jalan",
        diagnosis: "-",
        kasus: "Pasien yang mengaku pasien baru, ingin meminta surat keterangan sehat cek mata, cek THT, Cek kulit dan kelamin, gigi serta psikologi",
        metodePembayaran: "Mandiri",
    },
    {
        id: 9,
        jenisPasien: "Pasien lama",
        jenisKunjungan: "Rawat jalan",
        diagnosis: "Infeksi saluran kemih",
        kasus: "Pasien lama ingin konsultasi ke Klinik Anak dengan biaya sendiri",
        metodePembayaran: "Mandiri",
    },
    {
        id: 10,
        jenisPasien: "Pasien baru",
        jenisKunjungan: "Rawat jalan",
        diagnosis: "Blefaritis",
        kasus: "Pasien yang mengaku pasien baru dan dan ingin meminta surat keterangan sehat dan bebas NAPZA",
        metodePembayaran: "Mandiri",
    },
    {
        id: 11,
        jenisPasien: "Pasien baru",
        jenisKunjungan: "Rawat jalan",
        diagnosis: "Jari bengkak diduga mengalami patah tulang",
        kasus: "Pasien kecelakaan dengan jari patah karena terjepit lemari saat mencoba memindahkan lemari di dalam rumah serta sudah membawa surat rujukan dari puskesmas",
        metodePembayaran: "BPJS Kesehatan",
    },
    {
        id: 12,
        jenisPasien: "Pasien lama",
        jenisKunjungan: "Rawat jalan",
        diagnosis: "Skizofrenia paranoid",
        kasus: "Pasien Klinik Jiwa rutin ingin meminta obat karena obat sudah habis dari bulan kemaren karena tidak datang. Tetapi pasien tidak ikut datang sehingga tidak bisa dilakukan pendaftaran",
        metodePembayaran: "BPJS Kesehatan",
    },
    {
        id: 13,
        jenisPasien: "Pasien lama",
        jenisKunjungan: "Rawat jalan",
        diagnosis: "Low back pain",
        kasus: "Pasien dengan rujukan dari rumah sakit lain ke Klinik Saraf tetapi masa rujukannya sudah habis maka harus memperbaharui rujukan terlebih dahulu ke Faskes tingkat 1",
        metodePembayaran: "BPJS Kesehatan",
    },
    {
        id: 14,
        jenisPasien: "Pasien lama",
        jenisKunjungan: "Rawat jalan",
        diagnosis: "Hypertensive heart disease with congestive heart failure",
        kasus: "Pasien yang mempunya 2 rujukan aktif yaitu ke Klinik Saraf dan Klinik Jantung dan pembuluh darah. Akan tetapi, dokter yang memeriksa sebelumnya cuti.",
        metodePembayaran: "BPJS Kesehatan",
    },
    {
        id: 15,
        jenisPasien: "Pasien lama",
        jenisKunjungan: "Rawat jalan",
        diagnosis: "Follow up setelah oprasi kanker payudara",
        kasus: "Pasien post ranap yang ingin kontrol pertama kali ",
        metodePembayaran: "BPJS Kesehatan",
    },
    {
        id: 16,
        jenisPasien: "Pasien baru",
        jenisKunjungan: "Rawat jalan",
        diagnosis: "Hernia inguinalis",
        kasus: "Pasien yang ingin periksa di Klinik tapi di pemeriksaan sebelumnya meminta untuk USG terlebih dahulu",
        metodePembayaran: "BPJS Kesehatan",
    },
    {
        id: 17,
        jenisPasien: "Pasien lama",
        jenisKunjungan: "Rawat jalan",
        diagnosis: "Stroke",
        kasus: "Pasien datang ingin rehabilitasi medis ke 2 dari 8 yang dijadwalkan",
        metodePembayaran: "BPJS Kesehatan",
    },
    {
        id: 18,
        jenisPasien: "Pasien baru",
        jenisKunjungan: "Rawat jalan",
        diagnosis: "Nasal polip",
        kasus: "Pasein datang ingin periksa terkait penyakitnya yaitu Nasal Polip sudah datang dengan menggunakan rujukan baru",
        metodePembayaran: "BPJS Kesehatan",
    },
    {
        id: 19,
        jenisPasien: "Pasien lama",
        jenisKunjungan: "Rawat jalan",
        diagnosis: "Angina pektoris",
        kasus: "Pasein rujuk balik dari RSUP datang ingin periksa terkait penyakitnya",
        metodePembayaran: "BPJS Kesehatan",
    },
];

// Sample patient data for TPPRI
const tppriCases = [
    {
        id: 1,
        perujuk: "Dr. Andi Wijaya",
        jenisKunjungan: "Rawat inap",
        diagnosis: "Pneumonia",
        kasus: "Pasien dengan rujukan dari puskesmas",
        metodePembayaran: "BPJS Kesehatan",
    },
    {
        id: 2,
        perujuk: "Dr. Siti Rahayu",
        jenisKunjungan: "Rawat inap",
        diagnosis: "Demam Berdarah",
        kasus: "Pasien dengan rujukan dari dokter keluarga",
        metodePembayaran: "Asuransi Swasta",
    },
    {
        id: 3,
        perujuk: "Dr. Budi Santoso",
        jenisKunjungan: "Rawat inap",
        diagnosis: "Gagal Ginjal Akut",
        kasus: "Pasien dengan rujukan dari rumah sakit lain",
        metodePembayaran: "BPJS Kesehatan",
    },
];

// Sample patient data for TPPGD
const tppgdCases = [
    {
        id: 1,
        jenisPasien: "Pasien baru",
        jenisKunjungan: "Gawat darurat",
        keluhan: "Sesak napas akut",
        kasus: "Pasien datang sendiri ke IGD",
        metodePembayaran: "BPJS Kesehatan",
    },
    {
        id: 2,
        jenisPasien: "Pasien lama",
        jenisKunjungan: "Gawat darurat",
        keluhan: "Nyeri dada",
        kasus: "Pasien dibawa ambulans",
        metodePembayaran: "Pembayaran Mandiri",
    },
    {
        id: 3,
        jenisPasien: "Pasien baru",
        jenisKunjungan: "Gawat darurat",
        keluhan: "Cedera kepala",
        kasus: "Pasien korban kecelakaan",
        metodePembayaran: "Asuransi Swasta",
    },
];

export function PatientManagementPage() {
    return (
        <PatientManagementTemplate
            tabs={["TPPRJ", "TPPRI", "TPPGD"]}
            filterOptions={caseFilters}
            patientCases={{
                tpprj: tpprjCases,
                tppri: tppriCases,
                tppgd: tppgdCases,
            }}
        />
    );
}
