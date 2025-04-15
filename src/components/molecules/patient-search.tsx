import {Search, Plus} from "lucide-react";
import {Button} from "@/components/atoms/button";
import {Input} from "@/components/atoms/input";

export function PatientSearch() {
    return (
        <div className="bg-blue-100 p-4 rounded-md">
            <div className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4">
                <h3 className="font-medium">FORM PENCARIAN PASIEN</h3>
            </div>

            <div className="flex flex-col md:flex-row gap-3 mb-4">
                <div className="flex-1">
                    <Input
                        type="text"
                        placeholder="Masukkan Data Pasien (NIK/No RM/Nama Pasien)"
                        className="w-full bg-white"
                    />
                </div>
                <div className="w-full md:w-40">
                    <Input type="date" placeholder="Tanggal Lahir" className="w-full bg-white" />
                </div>
                <div>
                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                        <Search className="w-4 h-4 mr-2" />
                        Cari
                    </Button>
                </div>
            </div>

            <div className="flex justify-start">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Registrasi Pasien Baru
                </Button>
            </div>
        </div>
    );
}
