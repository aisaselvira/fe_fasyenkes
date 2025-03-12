import Image from "next/image";
import HeroText from "../molecules/HeroText";

export default function Hero() {
    return (
        <section className="relative w-full h-auto flex items-center justify-center">
            {/* Background Full Width */}
            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <Image src="/assets/bg.png" fill alt="Background" objectFit="cover" className="rounded-b-[70px]" />
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl flex flex-col md:flex-row items-center gap-10 py-16">
                {/* Left: Text Section (Lebih Lebar) */}
                <div className="w-full md:w-3/5 text-left space-y-6">
                    <HeroText />
                </div>

                {/* Right: Hero Image (Lebih Kecil) */}
                <div className="w-full md:w-2/5 flex justify-center">
                    <Image
                        src="/assets/hero-bg.svg"
                        alt="Hero Ilustration"
                        width={450}
                        height={450}
                        className="mx-auto"
                    />
                </div>
            </div>
        </section>
    );
}
