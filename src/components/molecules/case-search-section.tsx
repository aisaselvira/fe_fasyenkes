"use client";

import {useState, useEffect} from "react";
import {Search} from "lucide-react";
import {Input} from "@/components/atoms/input";
import {Label} from "@/components/atoms/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/atoms/select";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/atoms/card";
import {CaseResultCard} from "@/components/atoms/case-results-card";
import patientData from "@/lib/patient-data-user";

type CaseType = "tpprj" | "tppri" | "tppgd";

interface CaseData {
    id: number;
    judulKasus: string;
    jenisPasien?: string;
    jenisKunjungan?: string;
    diagnosis?: string;
    deskripsiKasus?: string;
    metodePembayaran?: string;
    perujuk?: string;
    keluhan?: string;
    caseComponent?: Array<{
        id: number;
        question: string;
        answer: string;
        scenarios: string[];
        formType: string;
        answerImage?: string;
        answerImages?: string[];
    }>;
}

interface CategoryInfo {
    id: string;
    name: string;
    totalCases: number;
    completedCases: number;
}

export function CaseSearchSection() {
    const [selectedCategory, setSelectedCategory] = useState<CaseType | "">("");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCases, setFilteredCases] = useState<CaseData[]>([]);

    // Define category information
    const categories: CategoryInfo[] = [
        {id: "tpprj", name: "Tempat Pendaftaran Rawat Jalan", totalCases: patientData.tpprj.length, completedCases: 3},
        {id: "tppri", name: "Tempat Pendaftaran Rawat Inap", totalCases: patientData.tppri.length, completedCases: 2},
        {
            id: "tppgd",
            name: "Tempat Pendaftaran Gawat Darurat",
            totalCases: patientData.tppgd.length,
            completedCases: 1,
        },
    ];

    // Mock data for case completion times and scores
    const caseResults = {
        tpprj: [
            {actualDuration: "04:39", idealDuration: "05:00", isUnderIdealTime: true, pronunciationScore: 50},
            {actualDuration: "06:12", idealDuration: "05:30", isUnderIdealTime: false, pronunciationScore: 75},
            {actualDuration: "04:55", idealDuration: "05:15", isUnderIdealTime: true, pronunciationScore: 60},
        ],
        tppri: [
            {actualDuration: "07:22", idealDuration: "08:00", isUnderIdealTime: true, pronunciationScore: 65},
            {actualDuration: "09:10", idealDuration: "08:30", isUnderIdealTime: false, pronunciationScore: 45},
        ],
        tppgd: [{actualDuration: "03:15", idealDuration: "03:30", isUnderIdealTime: true, pronunciationScore: 80}],
    };

    // Effect to filter cases based on search query and selected category
    useEffect(() => {
        if (selectedCategory) {
            const cases = patientData[selectedCategory] as CaseData[];
            const filtered = cases.filter((caseItem) =>
                caseItem.judulKasus.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredCases(filtered);
        } else {
            setFilteredCases([]);
        }
    }, [searchQuery, selectedCategory]);

    // Handle category selection
    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value as CaseType | "");
        setSearchQuery("");
    };

    // Get result data for a case
    const getCaseResult = (categoryId: CaseType, caseIndex: number) => {
        const categoryResults = caseResults[categoryId];
        return (
            categoryResults[caseIndex] || {
                actualDuration: "05:00",
                idealDuration: "05:00",
                isUnderIdealTime: true,
                pronunciationScore: 50,
            }
        );
    };

    return (
        <Card className="shadow-md rounded-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
                <CardTitle className="text-lg font-semibold text-blue-800">
                    Cari kasus yang sudah dikerjakan :
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
                <div className="space-y-6">
                    {/* Search and Filter Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="category" className="font-medium mb-1.5 block">
                                Kategori Kasus
                            </Label>
                            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                                <SelectTrigger
                                    id="category"
                                    className=" border-blue-600 hover:bg-blue-200 transition-colors focus:ring-blue-500 rounded-lg"
                                >
                                    <SelectValue placeholder="Pilih Kategori" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border border-blue-400 shadow-lg rounded-lg overflow-hidden ">
                                    {categories.map((category) => (
                                        <SelectItem
                                            key={category.id}
                                            value={category.id}
                                            className="hover:bg-blue-50 focus:bg-blue-50 cursor-pointer"
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="md:col-span-2">
                            <Label htmlFor="search" className="text-gray-700 font-medium mb-1.5 block">
                                Cari Judul Kasus
                            </Label>
                            <div className="relative">
                                <Input
                                    id="search"
                                    placeholder="Ketik untuk mencari..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 focus:border-blue-500 focus:ring-blue-500 rounded-lg border-blue-600"
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Case List */}
                    {selectedCategory && filteredCases.length > 0 ? (
                        <div className="space-y-4 mt-4">
                            {filteredCases.map((caseItem, index) => {
                                // Only show cases that are "completed" based on our mock data
                                const categoryResults = caseResults[selectedCategory as CaseType];
                                if (index >= (categoryResults?.length || 0)) {
                                    return null;
                                }

                                const result = getCaseResult(selectedCategory as CaseType, index);

                                return (
                                    <CaseResultCard
                                        key={caseItem.id}
                                        caseNumber={caseItem.id}
                                        caseTitle={caseItem.judulKasus}
                                        actualDuration={result.actualDuration}
                                        idealDuration={result.idealDuration}
                                        isUnderIdealTime={result.isUnderIdealTime}
                                        pronunciationScore={result.pronunciationScore}
                                    />
                                );
                            })}
                        </div>
                    ) : selectedCategory ? (
                        <div className="text-center py-8 text-gray-500">Tidak ada kasus yang ditemukan</div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            Silakan pilih kategori kasus terlebih dahulu
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
