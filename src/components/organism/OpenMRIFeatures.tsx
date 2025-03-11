import {FeaturesList} from "./FeaturesList";

export const OpenMRIFeatures = () => {
    const features = [
        {
            id: "feature-1",
            title: "Belajar fleksibel berbagai materi terkait registrasi pasien",
            description:
                "Pelajari berbagai materi terkait registrasi pasien di OpenMRI dengan metode belajar yang fleksibel.",
            subDescription:
                "Dapatkan banyak materi terbaru seputar registrasi pasien di fasilitas pelayanan kesehatan.",
            imageSrc: "/assets/pict_1.svg",
        },
        {
            id: "feature-2",
            title: "Uji kemampuan dengan berbagai Latian Soal terkait registrasi pasien",
            description:
                "Kembangkan pemahaman dengan latihan soal menarik dan hasilkan evaluasi registrasi pasien di fasilitas pelayanan kesehatan.",
            subDescription: "Dapatkan pembahasan soal untuk meningkatkan pemahamanmu!",
            imageSrc: "/assets/pict_2.svg",
        },
        {
            id: "feature-3",
            title: "Simulasi registrasi pasien secara langsung",
            description:
                "Praktik langsung registrasi pasien dengan sistem informasi kesehatan yang mirip dengan berbagai fasyankes.",
            subDescription: "Temukan berbagai kasus real yang berguna untuk pengalamanmu!",
            imageSrc: "/assets/pict_3.svg",
        },
        {
            id: "feature-4",
            title: "Pantau progres belajarmu di menu MyResult",
            description:
                "Pantau seluruh progres belajarmu di OpenMRI untuk melihat perkembangan kinerja belajar pada setiap progress simulasi berbasis AI.",
            subDescription: "Temukan dan terus tingkatkan!",
            imageSrc: "/assets/pict_4.svg",
        },
    ];

    return (
        <section className="bg-gray-50 py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <FeaturesList heading="Dapet Apa Aja di OpenMRI?" features={features} />
            </div>
        </section>
    );
};
