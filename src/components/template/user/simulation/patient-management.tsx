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

interface PatientManagementTemplateProps {
    tabs: string[];
    filterOptions: FilterOption[];
}

export function PatientManagementTemplate({tabs, filterOptions}: PatientManagementTemplateProps) {
    const [activeTab, setActiveTab] = useState(tabs[0].toLowerCase());
    const [, setSelectedFilters] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

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
                    ${activeTab === tab.toLowerCase() ? "bg-blue-900 text-white" : "bg-blue-50 hover:bg-gray-300"}
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
                        {activeTab === "tpprj" && <TPPRJCaseList searchQuery={searchQuery} />}

                        {activeTab === "tppri" && <TPPRICaseList searchQuery={searchQuery} />}

                        {activeTab === "tppgd" && <TPPGDCaseList searchQuery={searchQuery} />}
                    </div>
                </Tabs>
            </div>
        </section>
    );
}
