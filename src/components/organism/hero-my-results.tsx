import Image from "next/image";
import HeroTextMyResults from "../molecules/hero-text-my-results";

export default function HeroMyResults() {
    return (
        <section className="relative w-full flex items-center justify-center">
            <div className="absolute top-0 left-0 w-full min-h-[700px] h-full -z-10 overflow-hidden">
                <Image src="/assets/bg.png" fill alt="Background" className="object-cover" />
            </div>

            <div className="container mx-auto px-8 md:px-6 lg:px-8 max-w-7xl flex flex-col md:flex-row items-center gap-16 py-16 md:py-24 lg:py-24">
                <div className="w-full md:w-1/2 flex justify-center">
                    <Image
                        src="/assets/hero-myresults.svg"
                        alt="Hero Illustration"
                        width={300}
                        height={300}
                        className="mx-auto md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px]"
                    />
                </div>
                <div className="w-full md:w-2/2 text-left space-y-6">
                    <HeroTextMyResults />
                </div>
            </div>
        </section>
    );
}
