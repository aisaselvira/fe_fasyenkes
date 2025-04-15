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
      caseComponent: [
        {
          id: 1,
          question: "Apa keluhan utama pasien?",
          answer: "Pasien mengalami nyeri dada mendadak dan sesak napas.",
          scenarios: ["Petugas menanyakan kondisi pasien"],
          formType: "search",
        },
        {
          id: 2,
          question: "Apakah pasien memiliki riwayat penyakit jantung sebelumnya?",
          answer: "Ya, pasien pernah mengalami serangan jantung satu tahun lalu.",
          scenarios: ["Petugas menggali riwayat medis pasien"],
          formType: "select",
        },
        {
          id: 3,
          question: "Pasien akan segera ditangani oleh tim medis, silakan tunggu sebentar.",
          answer: "Terima kasih, mohon bantuannya.",
          scenarios: ["Petugas mengarahkan pasien ke unit medis"],
          formType: "info",
        },
      ],
    },
    {
      id: 2,
      jenisPasien: "Pasien Baru",
      jenisKunjungan: "Rawat Jalan",
      diagnosis: "Epistaksis",
      judulKasus: "Mimisan Berulang",
      deskripsiKasus: "Pasien datang karena sering mengalami mimisan tanpa sebab yang jelas.",
      metodePembayaran: "Asuransi",
      caseComponent: [
        {
          id: 1,
          question: "Apa keluhan utama pasien?",
          answer: "Pasien mengalami nyeri dada mendadak dan sesak napas.",
          scenarios: ["Petugas menanyakan kondisi pasien"],
          formType: "search",
        },
        {
          id: 2,
          question: "Apakah pasien memiliki riwayat penyakit jantung sebelumnya?",
          answer: "Ya, pasien pernah mengalami serangan jantung satu tahun lalu.",
          scenarios: ["Petugas menggali riwayat medis pasien"],
          formType: "select",
        },
        {
          id: 3,
          question: "Pasien akan segera ditangani oleh tim medis, silakan tunggu sebentar.",
          answer: "Terima kasih, mohon bantuannya.",
          scenarios: ["Petugas mengarahkan pasien ke unit medis"],
          formType: "info",
        },
      ],
    },
    {
      id: 3,
      jenisPasien: "Pasien Lama",
      jenisKunjungan: "Rawat Jalan",
      diagnosis: "Vertigo",
      judulKasus: "Serangan Pusing Mendadak",
      deskripsiKasus: "Pasien mengeluhkan pusing mendadak yang berlangsung selama beberapa menit.",
      metodePembayaran: "BPJS",
      caseComponent: [
        {
          id: 1,
          question: "Selamat pagi, apa keluhan Anda hari ini?",
          answer: "Saya mengalami pusing berputar yang sangat parah sejak tadi pagi.",
          scenarios: ["Petugas menanyakan keluhan pasien"],
          formType: "search",
        },
        {
          id: 2,
          question: "Apakah Anda pernah mengalami hal seperti ini sebelumnya?",
          answer: "Ya, saya memiliki riwayat vertigo, tapi kali ini lebih parah dari biasanya.",
          scenarios: ["Petugas menggali riwayat medis pasien"],
          formType: "select",
        },
        {
          id: 3,
          question: "Apakah Anda membawa kartu BPJS?",
          answer: "Ya, ini kartu BPJS saya.",
          scenarios: ["Petugas memverifikasi metode pembayaran"],
          formType: "info",
        },
      ],
    },
    {
      id: 4,
      jenisPasien: "Pasien Lama",
      jenisKunjungan: "Rawat Jalan",
      diagnosis: "Sinusitis Kronis",
      judulKasus: "Keluhan Sinusitis Berulang",
      deskripsiKasus: "Pasien mengalami keluhan sinusitis kronis dan datang untuk konsultasi lebih lanjut.",
      metodePembayaran: "BPJS",
      caseComponent: [
        {
          id: 1,
          question: "Sudah berapa lama Anda mengalami gejala sinusitis ini?",
          answer: "Sudah hampir 3 bulan, dan semakin parah dalam 2 minggu terakhir.",
          scenarios: ["Petugas menanyakan durasi keluhan"],
          formType: "search",
        },
        {
          id: 2,
          question: "Apakah Anda sudah mencoba pengobatan sebelumnya?",
          answer: "Ya, saya sudah minum obat dari puskesmas tapi tidak ada perubahan.",
          scenarios: ["Petugas menanyakan riwayat pengobatan"],
          formType: "select",
        },
        {
          id: 3,
          question: "Baik, saya akan mendaftarkan Anda ke poli THT. Silakan tunggu panggilan.",
          answer: "Terima kasih, saya akan menunggu.",
          scenarios: ["Petugas mengarahkan pasien"],
          formType: "info",
        },
      ],
    },
    {
      id: 5,
      jenisPasien: "Pasien Baru",
      jenisKunjungan: "Rawat Jalan",
      diagnosis: "Otitis Media",
      judulKasus: "Infeksi Telinga Tengah",
      deskripsiKasus: "Pasien datang dengan keluhan nyeri telinga dan kehilangan pendengaran sementara.",
      metodePembayaran: "Mandiri",
      caseComponent: [
        {
          id: 1,
          question: "Selamat siang, apa keluhan yang Anda alami?",
          answer: "Telinga saya sakit dan terasa tersumbat sejak kemarin.",
          scenarios: ["Petugas menanyakan keluhan pasien"],
          formType: "search",
        },
        {
          id: 2,
          question: "Apakah ini kunjungan pertama Anda ke rumah sakit ini?",
          answer: "Ya, ini pertama kalinya saya berobat di sini.",
          scenarios: ["Petugas mengonfirmasi status pasien"],
          formType: "registration",
        },
        {
          id: 3,
          question: "Saya perlu mendaftarkan data Anda. Boleh saya minta identitas Anda?",
          answer: "Tentu, ini KTP saya.",
          scenarios: ["Petugas meminta dokumen identitas"],
          formType: "registration",
        },
      ],
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
      caseComponent: [
        {
          id: 1,
          question: "Apa keluhan utama pasien?",
          answer: "Pasien mengalami nyeri dada mendadak dan sesak napas.",
          scenarios: ["Petugas menanyakan kondisi pasien"],
          formType: "search",
        },
        {
          id: 2,
          question: "Apakah pasien memiliki riwayat penyakit jantung sebelumnya?",
          answer: "Ya, pasien pernah mengalami serangan jantung satu tahun lalu.",
          scenarios: ["Petugas menggali riwayat medis pasien"],
          formType: "select",
        },
        {
          id: 3,
          question: "Pasien akan segera ditangani oleh tim medis, silakan tunggu sebentar.",
          answer: "Terima kasih, mohon bantuannya.",
          scenarios: ["Petugas mengarahkan pasien ke unit medis"],
          formType: "info",
        },
      ],
    },
    {
      id: 2,
      perujuk: "Puskesmas B",
      jenisKunjungan: "Rawat Inap",
      diagnosis: "Otitis Media",
      judulKasus: "Infeksi Telinga Tengah",
      deskripsiKasus: "Pasien datang dengan keluhan nyeri telinga dan kehilangan pendengaran sementara.",
      metodePembayaran: "Mandiri",
      caseComponent: [
        {
          id: 1,
          question: "Selamat pagi, apa keluhan utama pasien?",
          answer: "Pasien mengeluhkan nyeri telinga yang sangat parah sejak semalam.",
          scenarios: ["Petugas menanyakan keluhan pasien"],
          formType: "search",
        },
        {
          id: 2,
          question: "Apakah pasien memiliki alergi obat tertentu?",
          answer: "Ya, pasien alergi terhadap penisilin.",
          scenarios: ["Petugas menanyakan riwayat alergi"],
          formType: "select",
        },
        {
          id: 3,
          question: "Kami akan menyiapkan kamar rawat inap. Mohon tunggu sebentar.",
          answer: "Baik, terima kasih atas bantuannya.",
          scenarios: ["Petugas memproses administrasi rawat inap"],
          formType: "info",
        },
      ],
    },
    {
      id: 3,
      perujuk: "Rumah Sakit X",
      jenisKunjungan: "Rawat Inap",
      diagnosis: "Faringitis Akut",
      judulKasus: "Nyeri Tenggorokan Mendadak",
      deskripsiKasus: "Pasien baru mengeluhkan sakit tenggorokan yang tidak kunjung membaik.",
      metodePembayaran: "BPJS",
      caseComponent: [
        {
          id: 1,
          question: "Selamat siang, apa keluhan yang dialami pasien?",
          answer: "Pasien mengalami sakit tenggorokan parah dan kesulitan menelan sejak 3 hari yang lalu.",
          scenarios: ["Petugas menanyakan keluhan pasien"],
          formType: "search",
        },
        {
          id: 2,
          question: "Apakah pasien sudah mencoba pengobatan sebelumnya?",
          answer: "Sudah berobat ke dokter umum tapi tidak ada perubahan.",
          scenarios: ["Petugas menanyakan riwayat pengobatan"],
          formType: "select",
        },
        {
          id: 3,
          question: "Baik, dokter merekomendasikan rawat inap. Saya akan proses administrasinya.",
          answer: "Terima kasih, kami setuju untuk rawat inap.",
          scenarios: ["Petugas menjelaskan rekomendasi dokter"],
          formType: "info",
        },
      ],
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
      caseComponent: [
        {
          id: 1,
          question: "Apa yang terjadi dengan pasien?",
          answer: "Pasien tiba-tiba memegang dada dan mengeluh sakit, lalu jatuh.",
          scenarios: ["Petugas IGD menanyakan kondisi pasien"],
          formType: "search",
        },
        {
          id: 2,
          question: "Apakah pasien memiliki riwayat penyakit jantung?",
          answer: "Ya, pasien pernah dirawat karena serangan jantung 2 tahun lalu.",
          scenarios: ["Petugas menanyakan riwayat medis"],
          formType: "select",
        },
        {
          id: 3,
          question: "Tim medis akan segera menangani. Mohon isi formulir ini sambil menunggu.",
          answer: "Baik, saya akan mengisinya sekarang.",
          scenarios: ["Petugas memberikan formulir administrasi"],
          formType: "info",
        },
      ],
    },
    {
      id: 2,
      jenisPasien: "Pasien Lama",
      jenisKunjungan: "Gawat Darurat",
      keluhan: "Sesak napas mendadak",
      judulKasus: "Serangan Asma Akut",
      deskripsiKasus: "Pasien dengan riwayat asma mengalami kesulitan bernapas yang tidak membaik dengan inhaler.",
      metodePembayaran: "Asuransi",
      caseComponent: [
        {
          id: 1,
          question: "Seberapa parah kesulitan bernapas yang dialami?",
          answer: "Sangat parah, inhaler tidak membantu sama sekali.",
          scenarios: ["Petugas menilai tingkat keparahan"],
          formType: "search",
        },
        {
          id: 2,
          question: "Kapan terakhir kali pasien mengalami serangan seperti ini?",
          answer: "Sekitar 6 bulan yang lalu, tapi tidak separah ini.",
          scenarios: ["Petugas menanyakan riwayat serangan sebelumnya"],
          formType: "select",
        },
        {
          id: 3,
          question: "Dokter akan segera menangani. Mohon tunggu sebentar.",
          answer: "Terima kasih, tolong segera ditangani.",
          scenarios: ["Petugas memprioritaskan penanganan"],
          formType: "info",
        },
      ],
    },
    {
      id: 3,
      jenisPasien: "Pasien Baru",
      jenisKunjungan: "Gawat Darurat",
      keluhan: "Demam tinggi dan kejang",
      judulKasus: "Kejang Demam",
      deskripsiKasus: "Pasien anak mengalami kejang setelah demam tinggi lebih dari 39°C.",
      metodePembayaran: "Mandiri",
      caseComponent: [
        {
          id: 1,
          question: "Berapa suhu tubuh anak saat ini?",
          answer: "39,8 derajat Celsius, dan baru saja mengalami kejang.",
          scenarios: ["Petugas menanyakan kondisi pasien"],
          formType: "search",
        },
        {
          id: 2,
          question: "Apakah anak pernah mengalami kejang demam sebelumnya?",
          answer: "Tidak, ini pertama kalinya dia mengalami kejang.",
          scenarios: ["Petugas menanyakan riwayat kejang"],
          formType: "select",
        },
        {
          id: 3,
          question: "Tim medis anak akan segera menangani. Mohon tunggu sebentar.",
          answer: "Baik, terima kasih banyak.",
          scenarios: ["Petugas memprioritaskan penanganan"],
          formType: "info",
        },
      ],
    },
  ],
}

export default patientData

