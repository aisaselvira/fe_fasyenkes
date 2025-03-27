import type { PatientInfo } from "@/components/molecules/patient-info-table"

// Define the type for simulation data items
export interface SimulationDataItem {
  id: number
  question: string
  answer: string
  scenarios: string[]
  patientInfo: PatientInfo
  formType: "search" | "registration"
}

// Dummy data for simulation
export const simulationData: SimulationDataItem[] = [
  {
    id: 1,
    question: "Selamat pagi Bu, ada yang bisa kami bantu?",
    answer:
      "Iya selamat pagi, saya mau periksa ke poliklinik kebetulan kemaren sudah ke puskesmas dan diberi rujukan ke rumah sakit ini.",
    scenarios: ["Petugas menerima pasien dengan mengucapkan salam"],
    patientInfo: {
      jenisPasien: "Pasien Lama",
      jenisKunjungan: "Rawat Jalan",
      diagnosis: "Diabetes Millitus",
      judulKasus: "Pasien dengan SKDP",
      deskripsiKasus: "Pasien datang dengan membawa Surat Keterangan Dalam Pemeriksaan",
      metodePembayaran: "BPJS Kesehatan",
    },
    formType: "search",
  },
  {
    id: 2,
    question: "Boleh saya lihat kartu BPJS dan surat rujukannya?",
    answer: "Ini kartu BPJS dan surat rujukannya, saya sudah bawa semua dokumen yang diperlukan.",
    scenarios: ["Petugas meminta dokumen pasien"],
    patientInfo: {
      jenisPasien: "Pasien Lama",
      jenisKunjungan: "Rawat Jalan",
      diagnosis: "Nasal Polip",
      judulKasus: "Pemeriksaan Nasal Polip dengan Rujukan Baru",
      deskripsiKasus:
        "Pasien datang ingin periksa terkait penyakitnya yaitu Nasal Polip sudah datang dengan menggunakan rujukan baru",
      metodePembayaran: "BPJS",
    },
    formType: "search",
  },
  {
    id: 3,
    question: "Sudah berapa lama Ibu merasakan keluhan ini?",
    answer:
      "Sudah sekitar dua minggu, awalnya tidak terlalu sakit tapi lama-lama semakin parah sehingga saya pergi ke puskesmas.",
    scenarios: ["Petugas menanyakan riwayat keluhan pasien"],
    patientInfo: {
      jenisPasien: "Pasien Baru",
      jenisKunjungan: "Rawat Jalan",
      diagnosis: "Epistaksis",
      judulKasus: "Mimisan Berulang",
      deskripsiKasus: "Pasien datang karena sering mengalami mimisan tanpa sebab yang jelas.",
      metodePembayaran: "Asuransi",
    },
    formType: "search",
  },
  {
    id: 4,
    question: "Apakah Ibu sudah pernah berobat di rumah sakit ini sebelumnya?",
    answer: "Belum pernah, ini pertama kalinya saya berobat di rumah sakit ini.",
    scenarios: ["Petugas memeriksa status pasien di sistem"],
    patientInfo: {
      jenisPasien: "Pasien Baru",
      jenisKunjungan: "Rawat Jalan",
      diagnosis: "Otitis Media",
      judulKasus: "Infeksi Telinga Tengah",
      deskripsiKasus: "Pasien datang dengan keluhan nyeri telinga dan kehilangan pendengaran sementara.",
      metodePembayaran: "Mandiri",
    },
    formType: "search",
  },
  {
    id: 5,
    question:
      "Baik, karena ini kunjungan pertama Ibu, saya perlu mendaftarkan data Ibu. Boleh saya minta nama lengkap Ibu?",
    answer: "Nama saya Maharani Putri Wijaya.",
    scenarios: ["Petugas melakukan pendaftaran pasien baru"],
    patientInfo: {
      jenisPasien: "Pasien Baru",
      jenisKunjungan: "Rawat Jalan",
      diagnosis: "Rhinitis Alergi",
      judulKasus: "Gangguan Pernapasan karena Alergi",
      deskripsiKasus: "Pasien memiliki riwayat alergi dan mengalami gangguan pernapasan setiap pagi.",
      metodePembayaran: "BPJS",
    },
    formType: "registration",
  },
  {
    id: 6,
    question: "Boleh saya minta nomor KTP dan tanggal lahir Ibu?",
    answer: "Nomor KTP saya 3471234567890001, tanggal lahir 15 Mei 1985.",
    scenarios: ["Petugas mengambil data lengkap pasien"],
    patientInfo: {
      jenisPasien: "Pasien Baru",
      jenisKunjungan: "Rawat Jalan",
      diagnosis: "Laringitis",
      judulKasus: "Suara Serak dan Nyeri Tenggorokan",
      deskripsiKasus: "Pasien mengalami suara serak dan nyeri tenggorokan selama seminggu terakhir.",
      metodePembayaran: "BPJS",
    },
    formType: "registration",
  },
  {
    id: 7,
    question: "Alamat lengkap dan nomor telepon yang bisa dihubungi?",
    answer:
      "Alamat saya di Jalan Mawar No. 45, Kelurahan Caturtunggal, Kecamatan Depok, Kabupaten Sleman, DIY. Nomor HP saya 081234567890.",
    scenarios: ["Petugas menginput data pasien ke sistem"],
    patientInfo: {
      jenisPasien: "Pasien Baru",
      jenisKunjungan: "Rawat Jalan",
      diagnosis: "Tonsilitis",
      judulKasus: "Radang Amandel",
      deskripsiKasus: "Pasien baru mengalami radang amandel yang menyebabkan kesulitan menelan.",
      metodePembayaran: "Mandiri",
    },
    formType: "registration",
  },
]

