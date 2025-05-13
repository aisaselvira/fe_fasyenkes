import {useState, useRef} from "react";
import {Button} from "@/components/atoms/button";
import {Input} from "@/components/atoms/input";
import Image from "next/image";
import {Label} from "@/components/atoms/label";
import {Textarea} from "@/components/atoms/textarea";
import {ChevronDown, ChevronUp} from "lucide-react";
import {Upload, X} from "lucide-react";
import PendaftaranForm from "@/components/organism/form/pendaftaran";
import AdmisiFormTPPRJ from "@/components/organism/form/admisi/tpprj";
import AdmisiFormTPPRI from "@/components/organism/form/admisi/tppri";
import AdmisiFormTPPGD from "@/components/organism/form/admisi/tppgd";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";

interface SkenarioDrop {
    skenariodropdown?: string[];
}

export default function SkenarioForm({skenariodropdown = ["pendaftaran"]}: SkenarioDrop) {
    const [jenisForm, setJenisForm] = useState<string>("");
    const [openMenu, setOpenMenu] = useState({
        jenisForm: false,
    });
    const [image, setImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setImage(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
    };

    const renderDropdown = (
        label: string,
        value: string,
        options: string[],
        onChange: (value: string) => void,
        key: "jenisForm"
    ) => (
        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] items-center gap-3">
            <Label className="text-gray-800 font-medium">{label}</Label>
            <DropdownMenu open={openMenu[key]} onOpenChange={(open) => setOpenMenu({...openMenu, [key]: open})}>
                <DropdownMenuTrigger asChild>
                    <button
                        type="button"
                        className="w-full flex items-center justify-between bg-gray-100 text-gray-600 rounded-md py-2.5 px-4 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {value || `Pilih ${label}`}
                        {openMenu[key] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full min-w-[var(--radix-dropdown-menu-trigger-width)]">
                    {options.map((opt, i) => (
                        <DropdownMenuItem key={i} onSelect={() => onChange(opt)}>
                            {opt}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
    return (
        <div className="min-h-screen bg-gray-50 px-4">
            <div className="flex justify-between items-center w-full max-w-4xl mx-auto ">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Tambah Skenario</h1>
            </div>
            <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8">
                <form>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] items-start gap-3">
                            <Label htmlFor="No_Urut" className="text-gray-800 font-medium pt-2">
                                No Urut
                            </Label>
                            <Input
                                id="case-description"
                                placeholder="No Urut"
                                className=" border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] items-start gap-3">
                            <Label htmlFor="case-description" className="text-gray-800 font-medium pt-2">
                                Pertanyaan
                            </Label>
                            <Textarea
                                id="case-description"
                                placeholder="Deskripsi kasus"
                                className="min-h-[120px] border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] items-start gap-3 mt-4">
                            <Label htmlFor="case-description" className="text-gray-800 font-medium pt-2">
                                Skenario
                            </Label>
                            <Textarea
                                id="case-description"
                                placeholder="Deskripsi kasus"
                                className="min-h-[120px] border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] items-start gap-3 mt-4">
                            <Label htmlFor="case-description" className="text-gray-800 font-medium pt-2">
                                Jawaban
                            </Label>
                            <Textarea
                                id="case-description"
                                placeholder="Deskripsi kasus"
                                className="min-h-[120px] border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] items-start gap-3 mt-4 mb-4">
                            <Label htmlFor="case-image" className="text-gray-800 font-medium pt-2">
                                Gambar
                            </Label>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Input
                                        type="file"
                                        id="case-image"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        ref={fileInputRef}
                                        className="hidden"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex items-center gap-2 border-dashed border-gray-300"
                                    >
                                        <Upload size={16} />
                                        Unggah Gambar
                                    </Button>
                                    {image && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={handleRemoveImage}
                                            className="flex items-center gap-2 text-red-500 border-red-200 hover:bg-red-50"
                                        >
                                            <X size={16} />
                                            Hapus
                                        </Button>
                                    )}
                                </div>

                                {image && (
                                    <div className="relative mt-3 border border-gray-200 rounded-md p-2">
                                        <div className="aspect-video relative overflow-hidden rounded-md">
                                            <Image
                                                src={image || "/placeholder.svg"}
                                                alt="Preview gambar"
                                                width={200}
                                                height={200}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    </div>
                                )}

                            {!image && (
                                <div className="border border-dashed border-gray-300 rounded-md p-6 text-center text-gray-500">
                                    <p>Belum ada gambar yang diunggah</p>
                                    <p className="text-sm mt-1">Format yang didukung: JPG, PNG, GIF</p>
                                </div>
                            )}
                        </div>
                    </div>
                    {renderDropdown(
                        "Jenis Form",
                        jenisForm,
                        skenariodropdown,
                        setJenisForm,
                        "jenisForm"
                    )}
                    {jenisForm === "Pendaftaran" && (
                        <div className="mt-4">
                            <PendaftaranForm />
                        </div>
                    )}
                    <div className="flex justify-center gap-4 pt-4">
                        <Button
                            type="submit"
                            className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-8 py-2 rounded-md min-w-[120px]"
                        >
                            Simpan
                        </Button>
                        <Button
                            type="button"
                            className="bg-red-600 hover:bg-red-700 text-white font-medium px-8 py-2 rounded-md min-w-[120px]"
                        >
                            Batal
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
