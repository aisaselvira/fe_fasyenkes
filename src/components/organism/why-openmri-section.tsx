import type {FC} from "react";
import {SectionTitle} from "../atoms/section-title";
import {FeatureCard} from "../molecules/feature-card";

interface FeatureItem {
    id: string;
    iconSrc: string;
    iconAlt: string;
    text: string;
}

const features: FeatureItem[] = [
    {
        id: "feature-1",
        iconSrc: "/assets/card-pict-1.svg",
        iconAlt: "Registration icon",
        text: "Banyak materi seputar registrasi pasien di Puskesmas yang relevan dan menarik",
    },
    {
        id: "feature-2",
        iconSrc: "/assets/card-pict-2.svg",
        iconAlt: "Document icon",
        text: "Latihan soal + pembahasan seputar registrasi pasien di Puskesmas yang mendalam",
    },
    {
        id: "feature-3",
        iconSrc: "/assets/card-pict-3.svg",
        iconAlt: "Community icon",
        text: "Simulasi langsung seputar registrasi pasien di Puskesmas lebih siap praktik",
    },
    {
        id: "feature-4",
        iconSrc: "/assets/card-pict-4.svg",
        iconAlt: "Certificate icon",
        text: "Bisa memperoleh progress belajar di OpenMRI secara realtime",
    },
    {
        id: "feature-5",
        iconSrc: "/assets/card-pict-5.svg",
        iconAlt: "Mobile icon",
        text: "Jadi lebih siap buat mulai PKL, Magang/ kerja di Puskesmas",
    },
];

export const WhyOpenMRISection: FC = () => {
    return (
        <section className="bg-gradient-to-b bg-[#646FD4] py-16">
            <div className="mx-auto max-w-7xl px-4">
                <SectionTitle className="mb-12 text-center text-white text-2xl md:text-3xl">
                    Kenapa harus OpenMRI?
                </SectionTitle>

                {/* Desktop view: Original layout (hidden on smaller screens) */}
                <div className="hidden lg:block">
                    {/* Baris Pertama - 3 cards */}
                    <div className="mb-10 grid grid-cols-3 gap-6 justify-items-center">
                        {features.slice(0, 3).map((feature) => (
                            <FeatureCard
                                key={feature.id}
                                iconSrc={feature.iconSrc}
                                iconAlt={feature.iconAlt}
                                text={feature.text}
                            />
                        ))}
                    </div>

                    {/* Baris Kedua - 2 cards */}
                    <div className="grid grid-cols-2 gap-6 mx-auto w-2/3 justify-items-center">
                        {features.slice(3, 5).map((feature) => (
                            <FeatureCard
                                key={feature.id}
                                iconSrc={feature.iconSrc}
                                iconAlt={feature.iconAlt}
                                text={feature.text}
                            />
                        ))}
                    </div>
                </div>

                {/* Mobile/Tablet view: 2-2-1 layout (hidden on desktop) */}
                <div className="lg:hidden">
                    {/* Baris Pertama - 2 cards */}
                    <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
                        <FeatureCard
                            iconSrc={features[0].iconSrc}
                            iconAlt={features[0].iconAlt}
                            text={features[0].text}
                        />
                        <FeatureCard
                            iconSrc={features[1].iconSrc}
                            iconAlt={features[1].iconAlt}
                            text={features[1].text}
                        />
                    </div>

                    {/* Baris Kedua - 2 cards */}
                    <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
                        <FeatureCard
                            iconSrc={features[2].iconSrc}
                            iconAlt={features[2].iconAlt}
                            text={features[2].text}
                        />
                        <FeatureCard
                            iconSrc={features[3].iconSrc}
                            iconAlt={features[3].iconAlt}
                            text={features[3].text}
                        />
                    </div>

                    {/* Baris Ketiga - 1 card (centered) */}
                    <div className="flex justify-center">
                        <FeatureCard
                            iconSrc={features[4].iconSrc}
                            iconAlt={features[4].iconAlt}
                            text={features[4].text}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
