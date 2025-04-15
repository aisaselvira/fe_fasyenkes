import { useRouter } from "next/router";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/atoms/table";
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
    const rows = [
        { label: "Jenis Pasien", value: simulasi.judulKasus },
        { label: "Jenis Kunjungan", value: simulasi.jenisKunjungan },
        { label: "Keluhan", value: simulasi.keluhan },
        { label: "Kasus", value: simulasi.judulKasus },
        { label: "Deskirpsi Kasus", value: simulasi.deskripsiKasus },
        { label: "Metode Pembayaran", value: simulasi.metodePembayaran },
    ];

    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mt-20">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="py-4 px-6 font-medium text-gray-900 border-b border-dotted border-gray-300 w-1/3">
                            Isi
                        </TableHead>
                        <TableHead className="py-4 px-6 font-medium text-gray-900 border-b border-dotted border-gray-300">
                            Penjelasan
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index} className="border-b border-dotted border-gray-300 last:border-b-0">
                            <TableCell className="py-4 px-6 font-medium text-gray-900 border-r border-dotted border-gray-300 w-1/3">
                                {row.label}
                            </TableCell>
                            <TableCell className="py-4 px-6 text-gray-700">{row.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}