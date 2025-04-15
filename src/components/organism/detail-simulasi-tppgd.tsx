import { useRouter } from "next/router";
import patientData from "@/lib/patient-data";

export default function DetailSimulasi() {
    const router = useRouter();
    const { simulasiid } = router.query;
    const simulasi = patientData.tppgd.find(
        (item) => item.id === Number(simulasiid)
    );
    if (!simulasi) {
        return <div>Data tidak ditemukan</div>;
    }

    return (
        <div className="w-full max-w-4xl mx-auto mt-10">
            <h1 className="text-2xl font-bold">Detail Kasus</h1>
            <div className="w-full max-w-4xl mx-auto bg-white rounded-[20px] border border-gray-200 shadow-sm overflow-hidden mt-10 p-10">
                <div className="space-y-6">
                    <div className="flex">
                        <div className="w-1/3 font-bold text-lg">Jenis Kunjungan</div>
                        <div className="w-2/3 text-lg">{simulasi.jenisKunjungan}</div>
                    </div>

                    <div className="flex">
                        <div className="w-1/3 font-bold text-lg">Jenis Pasien</div>
                        <div className="w-2/3 text-lg">{simulasi.jenisPasien}</div>
                    </div>

                    <div className="flex">
                        <div className="w-1/3 font-bold text-lg">Keluhan</div>
                        <div className="w-2/3 text-lg">{simulasi.keluhan}</div>
                    </div>

                    <div className="flex">
                        <div className="w-1/3 font-bold text-lg">Judul Kasus</div>
                        <div className="w-2/3 text-lg">{simulasi.judulKasus}</div>
                    </div>

                    <div className="flex">
                        <div className="w-1/3 font-bold text-lg">Kasus</div>
                        <div className="w-2/3 text-lg">{simulasi.deskripsiKasus}</div>
                    </div>

                    <div className="flex">
                        <div className="w-1/3 font-bold text-lg">Metode Pembayaran</div>
                        <div className="w-2/3 text-lg">{simulasi.metodePembayaran}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}