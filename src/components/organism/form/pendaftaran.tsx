import React, {
    forwardRef,
    useImperativeHandle,
    useState,
    useEffect,
} from "react";
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import { RadioGroup, RadioGroupItem } from "@/components/atoms/radio-group"
// import { Textarea } from "@/components/atoms/textarea"
// import axios from "axios";
// import Cookies from "js-cookie";
import { useRouter } from "next/router";

type PatientRegistrationData = {
    patient: {
        simulation_id: number;
        name: string;
        nik: string;
        gender: string;
        date_of_birth: string;
        place_of_birth: string;
        address: string;
        phone_number: string;
        nationality: string;
        city: string;
        district: string;
    };
    patient_detail: {
        patient_identity_number: string;
        insurance_number: string;
        type_of_insurance: string;
        marriage_status: string;
        blood_type: string;
        educational_level: string;
        profession: string;
        religion: string;
        ethnic: string;
        language: string;
        disability: string;
    };
    value_belief: {
        value_belief: string;
    };
    privacy_request: {
        privacy_request: string;
    };
    family_members: {
        name: string;
        family_relationship: string;
        phone_number: string;
    }[];
};

interface pendaftaranData {
    initialData?: Partial<PatientRegistrationData> & {
    };
}

export interface PendaftaranFormRef {
    getFormData: () => PatientRegistrationData;
}
const PendaftaranForm = forwardRef<PendaftaranFormRef, pendaftaranData>(({ initialData }, ref) => {
    const router = useRouter();
    const { id } = router.query;
    const [formData, setFormData] = useState<PatientRegistrationData>({
        patient: {
            simulation_id: initialData?.patient?.simulation_id || 0,
            name: initialData?.patient?.name || "",
            nik: initialData?.patient?.nik || "",
            gender: initialData?.patient?.gender || "L",
            date_of_birth: initialData?.patient?.date_of_birth || "",
            place_of_birth: initialData?.patient?.place_of_birth || "",
            address: initialData?.patient?.address || "",
            phone_number: initialData?.patient?.phone_number || "",
            nationality: initialData?.patient?.nationality || "",
            city: initialData?.patient?.city || "",
            district: initialData?.patient?.district || "",
        },
        patient_detail: {
            patient_identity_number: initialData?.patient_detail?.patient_identity_number || "",
            insurance_number: initialData?.patient_detail?.insurance_number || "",
            type_of_insurance: initialData?.patient_detail?.type_of_insurance || "",
            marriage_status: initialData?.patient_detail?.marriage_status || "",
            blood_type: initialData?.patient_detail?.blood_type || "",
            educational_level: initialData?.patient_detail?.educational_level || "",
            profession: initialData?.patient_detail?.profession || "",
            religion: initialData?.patient_detail?.religion || "",
            ethnic: initialData?.patient_detail?.ethnic || "",
            language: initialData?.patient_detail?.language || "",
            disability: initialData?.patient_detail?.disability || "",
        },
        value_belief: {
            value_belief: initialData?.value_belief?.value_belief || "",
        },
        privacy_request: {
            privacy_request: initialData?.privacy_request?.privacy_request || "",
        },
        family_members: initialData?.family_members || [{
            name: "",
            family_relationship: "",
            phone_number: ""
        }],
    });

    useEffect(() => {
        if (id) {
            setFormData((prev) => ({
                ...prev,
                patient: {
                    ...prev.patient,
                    simulation_id: Number(id),
                },
            }));
        }
    }, [id]);
    useEffect(() => {
        if (initialData) {
            setFormData((prev) => ({
                ...prev,
                patient: {
                    ...prev.patient,
                    simulation_id: initialData.patient?.simulation_id ?? prev.patient.simulation_id,
                    name: initialData.patient?.name || prev.patient.name,
                    nik: initialData.patient?.nik || prev.patient.nik,
                    gender: initialData.patient?.gender || prev.patient.gender,
                    date_of_birth: initialData.patient?.date_of_birth || prev.patient.date_of_birth,
                    place_of_birth: initialData.patient?.place_of_birth || prev.patient.place_of_birth,
                    address: initialData.patient?.address || prev.patient.address,
                    phone_number: initialData.patient?.phone_number || prev.patient.phone_number,
                    // nationality: initialData.patient?.nationality || prev.patient.nationality,
                    city: initialData.patient?.city || prev.patient.city,
                    district: initialData.patient?.district || prev.patient.district,
                },
                patient_detail: {
                    ...prev.patient_detail,
                    ...initialData.patient_detail,
                },
                value_belief: {
                    ...prev.value_belief,
                    ...initialData.value_belief,
                },
                privacy_request: {
                    ...prev.privacy_request,
                    ...initialData.privacy_request,
                },
                family_members: initialData.family_members?.length
                    ? initialData.family_members
                    : prev.family_members,
            }));
        }
    }, [initialData]);
    console.log("initialData dari parent:", initialData);


    useImperativeHandle(ref, () => ({
        getFormData: () => formData
    }));

    const handleInputChange = (
        section: string,
        field: string,
        value: string
    ) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section as keyof typeof formData],
                [field]: value,
            },
        }));
    };

    const nilaiOptions = [
        "TIDAK ADA",
        "TIDAK MAU PULANG DI HARI TERTENTU",
        "VEGETARIAN",
        "POLA DIET TERTENTU",
        "TIDAK MENGKONSUMSI MAKANAN TERTENTU",
        "MENOLAK TRANSFUSI DARAH",
        "MENOLAK OBAT DENGAN KEGUNAAN MENGANDUNG UNSUR BABI",
        "MENOLAK MUNGKIN PADA HARI BARU LAHIR",
        "DILAKUKAN KHITAN OLEH LAKI-LAKI/ PEREMPUAN",
        "MENOLAK TINDAKAN ITU HARI TERTENTU",
    ];

    const privacyOptions = [
        "TIDAK ADA",
        "TIDAK MAU DIKETAHUI JIKA DIRAWAT DI RS",
        "MENOLAK DIKUNJUNGI",
        "TIDAK MAU MENERIMA TELEPON DARI JARINGAN RS",
        "TIDAK MENGIZINKAN INFORMASI TENTANG KONDISI KESEHATAN",
    ];

    const addFamilyMember = () => {
        setFormData((prev) => ({
            ...prev,
            family_members: [
                ...prev.family_members,
                { name: "", family_relationship: "", phone_number: "" },
            ],
        }));
    };

    const updateFamilyMember = (index: number, field: string, value: string) => {
        const updatedMembers = [...formData.family_members];
        updatedMembers[index] = {
            ...updatedMembers[index],
            [field]: value,
        };
        setFormData({ ...formData, family_members: updatedMembers });
    };

    const removeFamilyMember = (index: number) => {
        const updatedMembers = formData.family_members.filter((_, i) => i !== index);
        setFormData({ ...formData, family_members: updatedMembers });
    };


    // const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    // const token = Cookies.get("token");

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     try {
    //         const res = await axios.post(
    //             `${API_BASE_URL}/admin/component/post-component/pendaftaran`,
    //             formData,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                     "Content-Type": "application/json",
    //                 },
    //             }
    //         );

    //         console.log("Success:", res.data);
    // Redirect or show success message here
    //     } catch (error) {
    //         console.error("Error submitting form:", error);
    //     }
    // };

    return (
        <div className="w-full max-w-6xl mx-auto bg-white rounded-lg border border-gray-200 shadow-sm my-8">
            <div className="p-3 sm:p-4 border-b">
                <h1 className="text-3xl font-bold ">FORM INPUTAN PASIEN</h1>
            </div>

            <div className="p-3 sm:p-4 max-h-[400px] overflow-y-auto border">
                <h3 className="font-semibold mb-3 sm:mb-4">DATA PRIBADI</h3>
                <div className="mt-4 border-gray-100 rounded-md p-4 shadow-inner">
                    <div className="grid gap-1 sm:gap-5">
                        {/* Grid layout that changes based on screen size */}
                        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                            <Label htmlFor="nik" className="sm:mb-0 mb-1">
                                NIK/No KTP/No KIA:
                            </Label>
                            <div className="flex">
                                <Input id="nik" placeholder="Masukkan NIK/No KTP/No KIA"
                                    value={formData.patient.nik}
                                    onChange={(e) =>
                                        handleInputChange("patient", "nik", e.target.value)
                                    } />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                            <Label htmlFor="nama" className="sm:mb-0 mb-1">
                                Nama Lengkap <span className="text-red-500">*</span>
                            </Label>
                            <Input id="nama" placeholder="Masukkan nama lengkap"
                                value={formData.patient.name}
                                onChange={(e) =>
                                    handleInputChange("patient", "name", e.target.value)
                                } />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                            <Label htmlFor="tempat-lahir" className="sm:mb-0 mb-1">
                                Tempat Lahir <span className="text-red-500">*</span>
                            </Label>
                            <Input id="tempat-lahir" placeholder="Masukkan Tempat Lahir"
                                value={formData.patient.place_of_birth}
                                onChange={(e) =>
                                    handleInputChange("patient", "place_of_birth", e.target.value)
                                } />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                            <Label htmlFor="tanggal-lahir" className="sm:mb-0 mb-1">
                                Tanggal Lahir <span className="text-red-500">*</span>
                            </Label>
                            <Input id="tanggal-lahir" type="date" value={formData.patient.date_of_birth}
                                onChange={(e) =>
                                    handleInputChange("patient", "date_of_birth", e.target.value)
                                } className="w-full" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start gap-1 sm:gap-2">
                            <Label className="sm:mb-0 mb-1">
                                Jenis Kelamin <span className="text-red-500">*</span>
                            </Label>
                            <RadioGroup
                                value={formData.patient.gender}
                                onValueChange={(value) =>
                                    handleInputChange("patient", "gender", value)
                                }
                                className="flex flex-wrap gap-2"
                            >
                                {["L", "P", "TIDAK DAPAT DITENTUKAN", "TIDAK MENGISI", "TIDAK DIKETAHUI"].map(
                                    (value) => (
                                        <div key={value} className="flex items-center space-x-2">
                                            <RadioGroupItem value={value} id={value} />
                                            <Label htmlFor={value}>{value}</Label>
                                        </div>
                                    )
                                )}
                            </RadioGroup>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start gap-1 sm:gap-2">
                            <Label className="sm:mb-0 mb-1">
                                Kebangsaan <span className="text-red-500">*</span>
                            </Label>
                            <RadioGroup
                                value={formData.patient.nationality}
                                onValueChange={(value) =>
                                    handleInputChange("patient", "nationality", value)
                                }
                                className="flex flex-wrap gap-2"
                            >
                                {["WNI", "WNA"].map(
                                    (value) => (
                                        <div key={value} className="flex items-center space-x-2">
                                            <RadioGroupItem value={value} id={value} />
                                            <Label htmlFor={value}>{value}</Label>
                                        </div>
                                    )
                                )}
                            </RadioGroup>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                            <Label htmlFor="alamat" className="sm:mb-0 mb-1">
                                Alamat
                            </Label>
                            <Input id="alamat" placeholder="Masukkan alamat"
                                value={formData.patient.address}
                                onChange={(e) =>
                                    handleInputChange("patient", "address", e.target.value)
                                } />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                            <Label htmlFor="provinsi" className="sm:mb-0 mb-1">
                                Provinsi <span className="text-red-500">*</span>
                            </Label>
                            <Input id="provinsi" placeholder="Masukkan nama Provinsi"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                            <Label htmlFor="kabupaten" className="sm:mb-0 mb-1">
                                Kabupaten/Kota <span className="text-red-500">*</span>
                            </Label>
                            <Input id="kabupaten" placeholder="Masukkan nama Kabupaten/Kota"
                                value={formData.patient.city}
                                onChange={(e) =>
                                    handleInputChange("patient", "city", e.target.value)
                                }
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                            <Label htmlFor="kecamatan" className="sm:mb-0 mb-1">
                                Kecamatan <span className="text-red-500">*</span>
                            </Label>
                            <Input id="kecamatan" placeholder="Masukkan nama Kecamatan"
                                value={formData.patient.district}
                                onChange={(e) =>
                                    handleInputChange("patient", "district", e.target.value)
                                }
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                            <Label htmlFor="no-hp" className="sm:mb-0 mb-1">
                                No HP
                            </Label>
                            <Input id="no-hp" placeholder="Masukkan No HP"
                                value={formData.patient.phone_number}
                                onChange={(e) =>
                                    handleInputChange("patient", "phone_number", e.target.value)
                                }
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start gap-1 sm:gap-2">
                            <Label className="sm:mb-0 mb-1">Tingkat Pendidikan</Label>
                            <RadioGroup
                                name="pendidikan"
                                value={formData.patient_detail.educational_level || ""}
                                onValueChange={(value) =>
                                    handleInputChange("patient_detail", "educational_level", value)
                                }
                                className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2"
                            >
                                {[
                                    "TIDAK SEKOLAH", "SD/SEDERAJAT", "SD", "SLTP SEDERAJAT",
                                    "D1/D3 SEDERAJAT", "D4", "S1", "S2", "S3"
                                ].map((item) => (
                                    <div key={item} className="flex items-center space-x-2">
                                        <RadioGroupItem value={item} id={`edu-${item}`} />
                                        <Label htmlFor={`edu-${item}`}>{item}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start gap-1 sm:gap-2">
                            <Label className="sm:mb-0 mb-1">Golongan Darah</Label>
                            <RadioGroup
                                name="golongan-darah"
                                value={formData.patient_detail.blood_type}
                                onValueChange={(value) =>
                                    handleInputChange("patient_detail", "blood_type", value)
                                }
                                className="grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2"
                            >
                                {["A", "B", "AB", "O", "-"].map((value) => (
                                    <div key={value} className="flex items-center space-x-2">
                                        <RadioGroupItem value={value} id={`blood-${value}`} />
                                        <Label htmlFor={`blood-${value}`}>{value}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start gap-1 sm:gap-2">
                            <Label className="sm:mb-0 mb-1">Agama</Label>
                            <RadioGroup
                                value={formData.patient_detail.religion}
                                onValueChange={(value) =>
                                    handleInputChange("patient_detail", "religion", value)
                                }
                                className="flex flex-wrap gap-2"
                            >
                                {[
                                    "ISLAM", "KRISTEN", "KATOLIK", "HINDU",
                                    "BUDHA", "KHONG HUCU", "PENGHAYAT", "LAIN-LAIN"
                                ].map((value) => (
                                    <div key={value} className="flex items-center space-x-2">
                                        <RadioGroupItem value={value} id={`religion-${value}`} />
                                        <Label htmlFor={`religion-${value}`}>{value}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start gap-1 sm:gap-2">
                            <Label className="sm:mb-0 mb-1">Status Perkawinan</Label>
                            <RadioGroup
                                name="status-perkawinan"
                                value={formData.patient_detail.marriage_status}
                                onValueChange={(value) => handleInputChange("patient_detail", "marriage_status", value)}
                                className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2"
                            >
                                {["BELUM KAWIN", "KAWIN", "CERAI HIDUP", "CERAI MATI"].map((value) => (
                                    <div key={value} className="flex items-center space-x-2">
                                        <RadioGroupItem value={value} id={`marriage-${value}`} />
                                        <Label htmlFor={`marriage-${value}`}>{value}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start gap-1 sm:gap-2">
                            <Label className="sm:mb-0 mb-1">Pekerjaan</Label>
                            <RadioGroup
                                name="pekerjaan"
                                value={formData.patient_detail.profession || ""}
                                onValueChange={(value) => handleInputChange("patient_detail", "profession", value)}
                                className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2"
                            >
                                {[
                                    "TIDAK BEKERJA", "PNS", "BUMN", "TNI/POLRI",
                                    "PEGAWAI SWASTA/ WIRASWASTA", "LAIN-LAIN"
                                ].map((value) => (
                                    <div key={value} className="flex items-center space-x-2">
                                        <RadioGroupItem value={value} id={`work-${value}`} />
                                        <Label htmlFor={`work-${value}`}>{value}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                            <Label htmlFor="suku" className="sm:mb-0 mb-1">
                                Suku
                            </Label>
                            <Input id="suku" placeholder="Masukkan nama suku"
                                value={formData.patient_detail.ethnic}
                                onChange={(e) =>
                                    handleInputChange("patient_detail", "ethnic", e.target.value)
                                }
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start gap-1 sm:gap-2">
                            <Label htmlFor="bahasa" className="sm:mb-0 mb-1">
                                Bahasa
                            </Label>
                            <Input id="bahasa" placeholder="Masukkan bahasa "
                                value={formData.patient_detail.language}
                                onChange={(e) =>
                                    handleInputChange("patient_detail", "language", e.target.value)
                                }
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start gap-1 sm:gap-2">
                            <Label className="sm:mb-0 mb-1">Hambatan</Label>
                            <RadioGroup
                                name="hambatan"
                                value={formData.patient_detail.disability}
                                onValueChange={(value) => handleInputChange("patient_detail", "disability", value)}
                                className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2"
                            >
                                {[
                                    "TIDAK ADA", "B. PENGLIHATAN", "B. PENDENGARAN",
                                    "B. BICARA", "B. EMOSI", "LAIN-LAIN"
                                ].map((value) => (
                                    <div key={value} className="flex items-center space-x-2">
                                        <RadioGroupItem value={value} id={`disability-${value}`} />
                                        <Label htmlFor={`disability-${value}`}>{value}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start gap-1 sm:gap-2">
                            <Label className="sm:mb-0 mb-1">
                                Cara Pembayaran <span className="text-red-500">*</span>
                            </Label>
                            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2">
                                <RadioGroup
                                    value={formData.patient_detail.type_of_insurance}
                                    onValueChange={(value) =>
                                        handleInputChange("patient_detail", "type_of_insurance", value)
                                    }
                                    className="flex flex-wrap gap-2"
                                >
                                    {["JKN", "ASURANSI LAINNYA", "MANDIRI"].map((value) => (
                                        <div key={value} className="flex items-center space-x-2">
                                            <RadioGroupItem value={value} id={`pay-${value}`} />
                                            <Label htmlFor={`pay-${value}`}>{value}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                            <Label htmlFor="no-jaminan" className="sm:mb-0 mb-1">
                                No Jaminan
                            </Label>
                            <div className="flex">
                                <Input id="no-jaminan" placeholder="Masukkan No Jaminan"
                                    value={formData.patient_detail.insurance_number}
                                    onChange={(e) =>
                                        handleInputChange("patient_detail", "insurance_number", e.target.value)
                                    } />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 sm:mt-8">
                        <h3 className="font-semibold mb-3 sm:mb-4 text-blue-600">NILAI DAN KEYAKINAN</h3>
                        <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                            <div className="grid gap-2">
                                <RadioGroup
                                    value={formData.value_belief.value_belief}
                                    onValueChange={(val) =>
                                        handleInputChange("value_belief", "value_belief", val)
                                    }
                                >
                                    {nilaiOptions.map((option) => (
                                        <div key={option} className="flex items-center space-x-2">
                                            <RadioGroupItem value={option} id={`belief-${option}`} />
                                            <Label htmlFor={`belief-${option}`} className="text-xs sm:text-sm">
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 sm:mt-8">
                        <h3 className="font-semibold mb-3 sm:mb-4 text-blue-600">PERMINTAAN PRIVACY</h3>
                        <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                            <div className="grid gap-2">
                                <RadioGroup
                                    value={formData.privacy_request.privacy_request}
                                    onValueChange={(val) =>
                                        handleInputChange("privacy_request", "privacy_request", val)
                                    }
                                >
                                    {privacyOptions.map((option) => (
                                        <div key={option} className="flex items-center space-x-2">
                                            <RadioGroupItem value={option} id={`privacy-${option}`} />
                                            <Label htmlFor={`privacy-${option}`} className="text-xs sm:text-sm">
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        </div>
                    </div>
                    {/* 
                            <div className="mt-4">
                                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-start gap-1 sm:gap-2">
                                    <Label htmlFor="catatan" className="sm:mb-0 mb-1">
                                        Catatan
                                    </Label>
                                    <Textarea id="catatan" placeholder="Catatan pasien" />
                                </div>
                            </div> */}

                    <div className="mt-6 sm:mt-8">
                        <h3 className="font-semibold mb-3 sm:mb-4 text-blue-600">
                            PENERIMA INFORMASI KESEHATAN PASIEN
                        </h3>
                        <div className="space-y-6">
                            {formData.family_members.map((member, index) => (
                                <div
                                    key={index}
                                    className="border p-4 rounded-md bg-gray-50 space-y-2 relative"
                                >
                                    <p className="text-sm font-medium mb-2">Penerima {index + 1}</p>
                                    <div className="grid gap-2 sm:grid-cols-3">
                                        <Input
                                            placeholder="Nama Keluarga"
                                            value={member.name}
                                            onChange={(e) =>
                                                updateFamilyMember(index, "name", e.target.value)
                                            }
                                        />
                                        <Input
                                            placeholder="Hubungan Keluarga"
                                            value={member.family_relationship}
                                            onChange={(e) =>
                                                updateFamilyMember(index, "family_relationship", e.target.value)
                                            }
                                        />
                                        <Input
                                            placeholder="No HP Keluarga"
                                            value={member.phone_number}
                                            onChange={(e) =>
                                                updateFamilyMember(index, "phone_number", e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="text-right mt-2">
                                        <button
                                            type="button"
                                            onClick={() => removeFamilyMember(index)}
                                            className="text-sm text-red-600 hover:underline"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={addFamilyMember}
                                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
                            >
                                + Tambah Anggota Keluarga
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
});

PendaftaranForm.displayName = "PendaftaranForm";
export default PendaftaranForm;
