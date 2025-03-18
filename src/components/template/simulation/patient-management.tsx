"use client";

import {useState} from "react";
import {Tabs} from "@/components/atoms/tabs";
import {FilterBar} from "@/components/organism/filter-bar";
import {TPPRJCaseList} from "@/components/organism/tpprj-case-list";
import {TPPRICaseList} from "@/components/organism/tppri-case-list";
import {TPPGDCaseList} from "@/components/organism/tppgd-case-list";

interface FilterOption {
    id: string;
    label: string;
}

// Define different case types
export interface TPPRJCase {
    id: number;
    jenisPasien: string;
    jenisKunjungan: string;
    diagnosis: string;
    kasus: string;
    metodePembayaran: string;
}

export interface TPPRICase {
    id: number;
    perujuk: string;
    jenisKunjungan: string;
    diagnosis: string;
    kasus: string;
    metodePembayaran: string;
}

export interface TPPGDCase {
    id: number;
    jenisPasien: string;
    jenisKunjungan: string;
    keluhan: string;
    kasus: string;
    metodePembayaran: string;
}

interface PatientManagementTemplateProps {
    tabs: string[];
    filterOptions: FilterOption[];
    patientCases: {
        tpprj: TPPRJCase[];
        tppri: TPPRICase[];
        tppgd: TPPGDCase[];
    };
}

export function PatientManagementTemplate({tabs, filterOptions, patientCases}: PatientManagementTemplateProps) {
    const [activeTab, setActiveTab] = useState(tabs[0].toLowerCase());
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Filter cases based on selected filters
    const filteredCases = {
        tpprj: patientCases.tpprj.filter((patientCase) => {
            if (selectedFilters.length === 0) return true;
            return selectedFilters.some((filter) => {
                if (filter === "pasien-lama") return patientCase.jenisPasien.toLowerCase().includes("lama");
                if (filter === "pasien-baru") return patientCase.jenisPasien.toLowerCase().includes("baru");
                if (filter === "asuransi") return patientCase.metodePembayaran.toLowerCase().includes("bpjs kesehatan");
                if (filter === "pembayaran-mandiri")
                    return patientCase.metodePembayaran.toLowerCase().includes("mandiri");
                return false;
            });
        }),
        tppri: patientCases.tppri.filter((patientCase) => {
            if (selectedFilters.length === 0) return true;
            return selectedFilters.some((filter) => {
                if (filter === "asuransi") return patientCase.metodePembayaran.toLowerCase().includes("bpjs kesehatan");
                if (filter === "pembayaran-mandiri")
                    return patientCase.metodePembayaran.toLowerCase().includes("mandiri");
                return false;
            });
        }),
        tppgd: patientCases.tppgd.filter((patientCase) => {
            if (selectedFilters.length === 0) return true;
            return selectedFilters.some((filter) => {
                if (filter === "pasien-lama") return patientCase.jenisPasien.toLowerCase().includes("lama");
                if (filter === "pasien-baru") return patientCase.jenisPasien.toLowerCase().includes("baru");
                if (filter === "asuransi") return patientCase.metodePembayaran.toLowerCase().includes("bpjs kesehatan");
                if (filter === "pembayaran-mandiri")
                    return patientCase.metodePembayaran.toLowerCase().includes("mandiri");
                return false;
            });
        }),
    };

    return (
        <section className="bg-white">
            <div className="w-full max-w-7xl mx-auto py-4 sm:py-8 px-4 sm:px-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="w-full px-2 sm:px-4">
                        <div className="grid grid-cols-3 w-full">
                            {tabs.map((tab, index) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab.toLowerCase())}
                                    className={`
                  py-3 sm:py-4 text-base sm:text-lg font-bold
                  ${index === 0 ? "rounded-tl-lg" : ""}
                  ${index === tabs.length - 1 ? "rounded-tr-lg" : ""}
                  ${activeTab === tab.toLowerCase() ? "bg-primary text-white" : "bg-gray-200 hover:bg-gray-300"}
                `}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="px-2 sm:px-4">
                        <FilterBar
                            filterOptions={filterOptions}
                            onFilterChange={setSelectedFilters}
                            searchValue={searchQuery}
                            onSearchChange={setSearchQuery}
                        />
                    </div>

                    <div className="mt-4 sm:mt-6">
                        {activeTab === "tpprj" && (
                            <TPPRJCaseList cases={filteredCases.tpprj} searchQuery={searchQuery} />
                        )}

                        {activeTab === "tppri" && (
                            <TPPRICaseList cases={filteredCases.tppri} searchQuery={searchQuery} />
                        )}

                        {activeTab === "tppgd" && (
                            <TPPGDCaseList cases={filteredCases.tppgd} searchQuery={searchQuery} />
                        )}
                    </div>
                </Tabs>
            </div>
        </section>
    );
}
