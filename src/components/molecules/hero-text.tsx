import {Button} from "@/components/atoms/button";
import Link from "next/link";


export default function HeroText() {
    return (
        <div className="w-full">
            <h3 className="text-yellow-400 text-2xl font-bold">Hallo! Selamat datang...</h3>
            <h1 className="text-white text-4xl md:text-5xl font-extrabold mt-2">
                Let You Know More About <br /> Patient Registrations
            </h1>
            <p className="text-white text-lg mt-4">
                Open Medical Record Installation ~ OpenMRI ~ Solusi terbaik belajar Sistem Registrasi Pasien di
                Fasyankes jadi lebih mudah dan seru. Temukan materi menarik, latihan soal dan simulasi berbagai kasus
                registrasi pasien di fasyankes hanya di OpenMRI.
            </p>

            {/* Button Group */}
            <div className="flex space-x-4 mt-6">
                <Button variant="default" className="bg-[#646FD4] text-white hover:bg-[#4a4fc4] px-6 py-3 text-lg">
                    <Link href="/login/page" className="">
                        Masuk
                    </Link>
                </Button>
                <Button
                    variant="outline"
                    className="bg-white text-[#646FD4] border border-[#646FD4] hover:bg-gray-100 px-6 py-3 text-lg"
                >
                    <Link href="/register/page" className="">
                        Daftar
                    </Link>
                </Button>
            </div>
        </div>
    );
}
