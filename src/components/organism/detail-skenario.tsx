import { useRouter } from "next/router";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

interface Scenario {
    id: number;
    simulation_id: number;
    scenario: string;
    order: number;
    question: string;
    component: string;
    createdAt: string;
    updatedAt: string;
}
export default function Detailskenario() {
    const router = useRouter();
    const { skenarioid } = router.query;
    const [loading, setLoading] = useState(false);
    const [scenario, setScenario] = useState<Scenario | null>(null);
    const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    const tipeUnit = useMemo(() => {
        const match = router.asPath.match(/simulasi-(tppri|tppgd|tpprj)/);
        return match ? match[1] : "";
    }, [router.asPath]);

    useEffect(() => {
        const fetchData = async () => {
            if (!skenarioid) return;

            try {
                const res = await axios.get(`${API_BASE_URL}/${tipeUnit}/get-Scenario/${skenarioid}`);
                if (res.data && res.data.data) {
                    setScenario(res.data.data);
                } else {
                    console.warn("Data tidak ditemukan.");
                }
                console.log("🔥 response:", res.data);
            } catch (error) {
                console.error("Gagal fetch data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (router.isReady) {
            fetchData();
        }
    }, [router.isReady, skenarioid, API_BASE_URL, tipeUnit]);

    if (loading) return <div className="p-4">Memuat data skenario...</div>;
    if (!scenario) return <div className="p-4">Skenario tidak ditemukan.</div>;

    return (
        <div className="w-full max-w-4xl mx-auto mt-10">
            <h1 className="text-2xl font-bold">Detail skenario</h1>
            <div className="w-full max-w-4xl mx-auto bg-white rounded-[20px] border border-gray-200 shadow-sm overflow-hidden mt-10 p-10">
                <div className="space-y-6">
                    <div className="flex">
                        <div className="w-1/3 font-bold text-lg">Pertanyaan</div>
                        <div className="w-2/3 text-lg">{scenario.question}</div>
                    </div>

                    <div className="flex">
                        <div className="w-1/3 font-bold text-lg">skenario</div>
                        <div className="w-2/3 text-lg">{scenario.scenario}</div>
                    </div>

                    <div className="flex">
                        <div className="w-1/3 font-bold text-lg">Jawaban</div>
                        <div className="w-2/3 text-lg">{""}</div>
                    </div>

                    <div className="flex">
                        <div className="w-1/3 font-bold text-lg">JenisForm</div>
                        <div className="w-2/3 text-lg">{scenario.component}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}