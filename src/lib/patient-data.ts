const patientData = {
  tpprj: [
    {
      id: 1,
      jenisPasien: "Pasien Lama",
      jenisKunjungan: "Rawat Jalan",
      diagnosis: "Nasal Polip",
      judulKasus: "Pemeriksaan Nasal Polip dengan Rujukan Baru",
      deskripsiKasus:
        "Pasien datang ingin periksa terkait penyakitnya yaitu Nasal Polip sudah datang dengan menggunakan rujukan baru",
      metodePembayaran: "BPJS",
      skenario: [
        {
          id: 1,
            pertanyaan: "Apakah alat pelindung diri (APD) telah digunakan dengan benar?",
            skenario: "Keselamatan Kerja",
            jawaban: "Ya, telah digunakan dengan benar",
            jenisForm: "Pilihan Ganda"
        },
        {
          id: 2,
            pertanyaan: "Apakah pasien memiliki riwayat penyakit terkait?",
            skenario: "Riwayat Kesehatan",
            jawaban: "Pasien memiliki riwayat sinusitis kronis",
            jenisForm: "Isian Singkat"
        }
    ]
    },

    {
      id: 2,
      jenisPasien: "Pasien Baru",
      jenisKunjungan: "Rawat Jalan",
      diagnosis: "Epistaksis",
      judulKasus: "Mimisan Berulang",
      deskripsiKasus: "Pasien datang karena sering mengalami mimisan tanpa sebab yang jelas.",
      metodePembayaran: "Asuransi",
      skenario: [
        {
          id: 1,
            pertanyaan: "Apakah alat pelindung diri (APD) telah digunakan dengan benar?",
            skenario: "Keselamatan Kerja",
            jawaban: "Ya, telah digunakan dengan benar",
            jenisForm: "Pilihan Ganda"
        },
        {
          id: 2,
            pertanyaan: "Apakah pasien memiliki riwayat penyakit terkait?",
            skenario: "Riwayat Kesehatan",
            jawaban: "Pasien memiliki riwayat sinusitis kronis",
            jenisForm: "Isian Singkat"
        }
    ]
    },
    {
      id: 3,
      jenisPasien: "Pasien Lama",
      jenisKunjungan: "Rawat Jalan",
      diagnosis: "Vertigo",
      judulKasus: "Serangan Pusing Mendadak",
      deskripsiKasus: "Pasien mengeluhkan pusing mendadak yang berlangsung selama beberapa menit.",
      metodePembayaran: "BPJS",
    },
    {
      id: 4,
      jenisPasien: "Pasien Lama",
      jenisKunjungan: "Rawat Jalan",
      diagnosis: "Sinusitis Kronis",
      judulKasus: "Keluhan Sinusitis Berulang",
      deskripsiKasus: "Pasien mengalami keluhan sinusitis kronis dan datang untuk konsultasi lebih lanjut.",
      metodePembayaran: "BPJS",
    },
    {
      id: 5,
      jenisPasien: "Pasien Baru",
      jenisKunjungan: "Rawat Jalan",
      diagnosis: "Otitis Media",
      judulKasus: "Infeksi Telinga Tengah",
      deskripsiKasus: "Pasien datang dengan keluhan nyeri telinga dan kehilangan pendengaran sementara.",
      metodePembayaran: "Mandiri",
    },
    {
      id: 6,
      jenisPasien: "Pasien Lama",
      jenisKunjungan: "Rawat Jalan",
      diagnosis: "Rhinitis Alergi",
      judulKasus: "Gangguan Pernapasan karena Alergi",
      deskripsiKasus: "Pasien memiliki riwayat alergi dan mengalami gangguan pernapasan setiap pagi.",
      metodePembayaran: "BPJS",
    },
    {
      id: 7,
      jenisPasien: "Pasien Lama",
      jenisKunjungan: "Rawat Jalan",
      diagnosis: "Laringitis",
      judulKasus: "Suara Serak dan Nyeri Tenggorokan",
      deskripsiKasus: "Pasien mengalami suara serak dan nyeri tenggorokan selama seminggu terakhir.",
      metodePembayaran: "BPJS",
    },
    {
      id: 8,
      jenisPasien: "Pasien Baru",
      jenisKunjungan: "Rawat Jalan",
      diagnosis: "Tonsilitis",
      judulKasus: "Radang Amandel",
      deskripsiKasus: "Pasien baru mengalami radang amandel yang menyebabkan kesulitan menelan.",
      metodePembayaran: "Mandiri",
    },
    {
      id: 9,
      jenisPasien: "Pasien Lama",
      jenisKunjungan: "Rawat Jalan",
      diagnosis: "Faringitis Akut",
      judulKasus: "Tenggorokan Gatal dan Nyeri",
      deskripsiKasus: "Pasien mengeluhkan tenggorokan gatal dan nyeri selama tiga hari terakhir.",
      metodePembayaran: "BPJS",
    },
    {
      id: 10,
      jenisPasien: "Pasien Baru",
      jenisKunjungan: "Rawat Jalan",
      diagnosis: "Bronkitis",
      judulKasus: "Batuk Berkepanjangan",
      deskripsiKasus: "Pasien mengalami batuk yang tidak kunjung sembuh selama dua minggu.",
      metodePembayaran: "Asuransi",
    },
    {
      id: 11,
      jenisPasien: "Pasien Lama",
      jenisKunjungan: "Rawat Jalan",
      diagnosis: "Otitis Eksterna",
      judulKasus: "Infeksi Saluran Telinga Luar",
      deskripsiKasus: "Pasien mengalami nyeri dan gatal pada telinga luar.",
      metodePembayaran: "Mandiri",
    },
    {
      id: 12,
      jenisPasien: "Pasien Baru",
      jenisKunjungan: "Rawat Jalan",
      diagnosis: "Asma",
      judulKasus: "Sesak Napas Berulang",
      deskripsiKasus: "Pasien datang dengan keluhan sesak napas yang kambuh setiap malam.",
      metodePembayaran: "BPJS",
    },
  ],
  tppri: [
    {
      id: 1,
      perujuk: "Puskesmas A",
      jenisKunjungan: "Rawat Inap",
      diagnosis: "Tonsilitis",
      judulKasus: "Pembengkakan Amandel yang Parah",
      deskripsiKasus: "Pasien mengalami tonsilitis berat dan direkomendasikan untuk rawat inap.",
      metodePembayaran: "BPJS",
      skenario: [
        {
          id: 1,
            pertanyaan: "Apakah alat pelindung diri (APD) telah digunakan dengan benar?",
            skenario: "Keselamatan Kerja",
            jawaban: "Ya, telah digunakan dengan benar",
            jenisForm: "Pilihan Ganda"
        },
        {
          id: 2,
            pertanyaan: "Apakah pasien memiliki riwayat penyakit terkait?",
            skenario: "Riwayat Kesehatan",
            jawaban: "Pasien memiliki riwayat sinusitis kronis",
            jenisForm: "Isian Singkat"
        }
    ]
    },
    {
      id: 2,
      perujuk: "Puskesmas B",
      jenisKunjungan: "Rawat Inap",
      diagnosis: "Otitis Media",
      judulKasus: "Infeksi Telinga Tengah",
      deskripsiKasus: "Pasien datang dengan keluhan nyeri telinga dan kehilangan pendengaran sementara.",
      metodePembayaran: "Mandiri",
    },
    {
      id: 3,
      perujuk: "Rumah Sakit X",
      jenisKunjungan: "Rawat Inap",
      diagnosis: "Faringitis Akut",
      judulKasus: "Nyeri Tenggorokan Mendadak",
      deskripsiKasus: "Pasien baru mengeluhkan sakit tenggorokan yang tidak kunjung membaik.",
      metodePembayaran: "BPJS",
    },
    {
      id: 4,
      perujuk: "Puskesmas C",
      jenisKunjungan: "Rawat Inap",
      diagnosis: "Bronkitis Akut",
      judulKasus: "Batuk Berdarah",
      deskripsiKasus: "Pasien mengalami batuk berdarah selama tiga hari terakhir.",
      metodePembayaran: "Asuransi",
    },
    {
      id: 5,
      perujuk: "RSUD Kota",
      jenisKunjungan: "Rawat Inap",
      diagnosis: "Pneumonia",
      judulKasus: "Infeksi Paru",
      deskripsiKasus: "Pasien didiagnosis mengalami pneumonia berat dan membutuhkan perawatan intensif.",
      metodePembayaran: "BPJS",
    },
  ],
  tppgd: [
    {
      id: 1,
      jenisPasien: "Pasien Baru",
      jenisKunjungan: "Gawat Darurat",
      keluhan: "Nyeri dada hebat",
      judulKasus: "Serangan Jantung",
      deskripsiKasus: "Pasien mengalami nyeri dada tiba-tiba disertai sesak napas dan keringat dingin.",
      metodePembayaran: "BPJS",
      skenario: [
        {
          id: 1,
            pertanyaan: "Apakah alat pelindung diri (APD) telah digunakan dengan benar?",
            skenario: "Keselamatan Kerja",
            jawaban: "Ya, telah digunakan dengan benar",
            jenisForm: "Pilihan Ganda"
        },
        {
          id: 2,
            pertanyaan: "Apakah pasien memiliki riwayat penyakit terkait?",
            skenario: "Riwayat Kesehatan",
            jawaban: "Pasien memiliki riwayat sinusitis kronis",
            jenisForm: "Isian Singkat"
        }
    ]
    },
    {
      id: 2,
      jenisPasien: "Pasien Lama",
      jenisKunjungan: "Gawat Darurat",
      keluhan: "Sesak napas mendadak",
      judulKasus: "Serangan Asma Akut",
      deskripsiKasus: "Pasien dengan riwayat asma mengalami kesulitan bernapas yang tidak membaik dengan inhaler.",
      metodePembayaran: "Asuransi",
      skenario: [
        {
          id: 1,
            pertanyaan: "Apakah alat pelindung diri (APD) telah digunakan dengan benar?",
            skenario: "Keselamatan Kerja",
            jawaban: "Ya, telah digunakan dengan benar",
            jenisForm: "Pilihan Ganda"
        },
        {
          id: 2,
            pertanyaan: "Apakah pasien memiliki riwayat penyakit terkait?",
            skenario: "Riwayat Kesehatan",
            jawaban: "Pasien memiliki riwayat sinusitis kronis",
            jenisForm: "Isian Singkat"
        }
    ]
    },
    {
      id: 3,
      jenisPasien: "Pasien Baru",
      jenisKunjungan: "Gawat Darurat",
      keluhan: "Demam tinggi dan kejang",
      judulKasus: "Kejang Demam",
      deskripsiKasus: "Pasien anak mengalami kejang setelah demam tinggi lebih dari 39°C.",
      metodePembayaran: "Mandiri",
    },
    {
      id: 4,
      jenisPasien: "Pasien Baru",
      jenisKunjungan: "Gawat Darurat",
      keluhan: "Pendarahan akibat kecelakaan",
      judulKasus: "Cedera Kepala Berat",
      deskripsiKasus: "Pasien mengalami kecelakaan lalu lintas dengan pendarahan aktif di kepala.",
      metodePembayaran: "BPJS",
    },
    {
      id: 5,
      jenisPasien: "Pasien Lama",
      jenisKunjungan: "Gawat Darurat",
      keluhan: "Pusing dan muntah terus-menerus",
      judulKasus: "Vertigo Akut",
      deskripsiKasus: "Pasien mengalami pusing berat yang membuatnya tidak bisa berdiri tegak.",
      metodePembayaran: "Asuransi",
    },
  ],
}

export default patientData

