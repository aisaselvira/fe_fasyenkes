import {Check, Plus} from "lucide-react";
import {Button} from "@/components/atoms/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/atoms/table";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/atoms/select";

interface Patient {
    id: string;
    waktuAdmisi: string;
    nama: string;
    noHP: string;
    alamat: string;
    admisiKe: string;
    jenisAsuransi: string;
}

interface PatientListProps {
    patients: Patient[];
}

export function PatientList({patients}: PatientListProps) {
    return (
        <div>
            <div className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4 flex items-center">
                <div className="flex items-center mr-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="5" width="16" height="2" rx="1" fill="white" />
                        <rect x="4" y="11" width="16" height="2" rx="1" fill="white" />
                        <rect x="4" y="17" width="16" height="2" rx="1" fill="white" />
                    </svg>
                </div>
                <h3 className="font-medium">DAFTAR PASIEN</h3>
            </div>

            <div className="flex justify-end mb-2">
                <Select defaultValue="10">
                    <SelectTrigger className="w-20">
                        <SelectValue placeholder="10" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                </Select>
                <span className="ml-2 text-sm text-gray-500 self-center">{patients.length} records</span>
            </div>

            <div className="border rounded-md overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="bg-gray-100 font-medium">Waktu Admisi</TableHead>
                            <TableHead className="bg-gray-100 font-medium">Nama</TableHead>
                            <TableHead className="bg-gray-100 font-medium">No HP</TableHead>
                            <TableHead className="bg-gray-100 font-medium">Alamat</TableHead>
                            <TableHead className="bg-gray-100 font-medium">Admisi Ke</TableHead>
                            <TableHead className="bg-gray-100 font-medium">Jenis Asuransi</TableHead>
                            <TableHead className="bg-gray-100 font-medium">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {patients.map((patient) => (
                            <TableRow key={patient.id}>
                                <TableCell>{patient.waktuAdmisi}</TableCell>
                                <TableCell>{patient.nama}</TableCell>
                                <TableCell>{patient.noHP}</TableCell>
                                <TableCell className="max-w-[200px] truncate">{patient.alamat}</TableCell>
                                <TableCell>{patient.admisiKe}</TableCell>
                                <TableCell>{patient.jenisAsuransi}</TableCell>
                                <TableCell>
                                    <div className="flex space-x-1">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                                        >
                                            <Check className="h-5 w-5" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                                        >
                                            <Plus className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
