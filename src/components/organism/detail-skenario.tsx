import { useRouter } from "next/router";
import patientData from "@/lib/patient-data";

export default function Detailskenario() {
    const router = useRouter();
    const { scenarioid } = router.query;
    if (!scenarioid) return null;

    // Cari semua skenario dari semua pasien
    const allScenarios = patientData.tppgd.flatMap(pasien => pasien.skenario);

    // Cari skenario yang sesuai
    const scenario = allScenarios.find(
        (item) => item?.id === Number(scenarioid)
    );
    if (!scenario) {
        return <div>Data tidak ditemukan</div>;
    }

    return (
        <div className="w-full max-w-4xl mx-auto mt-10">
            <h1 className="text-2xl font-bold">Detail skenario</h1>
            <div className="w-full max-w-4xl mx-auto bg-white rounded-[20px] border border-gray-200 shadow-sm overflow-hidden mt-10 p-10">
                <div className="space-y-6">
                    <div className="flex">
                        <div className="w-1/3 font-bold text-lg">Pertanyaan</div>
                        <div className="w-2/3 text-lg">{scenario.pertanyaan}</div>
                    </div>

                    <div className="flex">
                        <div className="w-1/3 font-bold text-lg">skenario</div>
                        <div className="w-2/3 text-lg">{scenario.skenario}</div>
                    </div>

                    <div className="flex">
                        <div className="w-1/3 font-bold text-lg">Jawaban</div>
                        <div className="w-2/3 text-lg">{scenario.jawaban}</div>
                    </div>

                    <div className="flex">
                        <div className="w-1/3 font-bold text-lg">JenisForm</div>
                        <div className="w-2/3 text-lg">{scenario.jenisForm}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}