import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import api from "@/config/api";
import { config } from "@/config";

type SimulationData = {
    id: number;
    patient_type: string;
    category: string;
    perujuk: string;
    diagnose: string;
    case_type: string;
    payment_method: string;
    case_description: string;
};

type DetailRowProps = {
    label: string;
    value: string;
};

function formatLabel(value: string | null | undefined) {
    if (!value) return "-";
    return value.replace(/_/g, " ");
}


function DetailRow({ label, value }: DetailRowProps) {
    return (
        <div className="flex">
            <div className="w-1/3 font-bold text-lg">{label}</div>
            <div className="w-2/3 text-lg">{value ?? "-"}</div>
        </div>
    );
}

export default function DetailSimulasi() {
    const router = useRouter();
    const { id } = router.query;
    const [data, setData] = useState<SimulationData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;

            try {
                const res = await api.get(config.endpoints.adminSimulation.getSimulation(id as string));

                if (res.data && res.data.data) {
                    setData(res.data.data);
                } else {
                    console.warn("Data tidak ditemukan dalam response.");
                }
            } catch (error) {
                console.error("Gagal fetch data:", error);
            }
        };

        if (router.isReady) {
            fetchData();
        }
    }, [router.isReady, id]);

    if (!data) {
        return <div className="text-center mt-10">Memuat data...</div>;
    }

    return (
        <div className="w-full max-w-4xl mx-auto mt-10">
            <h1 className="text-2xl font-bold">Detail Kasus</h1>
            <div className="w-full bg-white rounded-[20px] border border-gray-200 shadow-sm overflow-hidden mt-10 p-10">
                <div className="space-y-6">
                    <DetailRow label="Jenis Kunjungan" value={formatLabel(data.patient_type)} />
                    <DetailRow label="Perujuk" value={data.perujuk} />
                    <DetailRow label="Diagnosis" value={data.diagnose} />
                    <DetailRow label="Judul Kasus" value={data.case_type} />
                    <DetailRow label="Kasus" value={data.case_description} />
                    <DetailRow label="Metode Pembayaran" value={data.payment_method} />
                </div>
            </div>
        </div>
    );
}
