"use client";

import {useState} from "react";
import {ChevronDown, Check} from "lucide-react";
import {Button} from "@/components/atoms/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/atoms/dropdown-menu";

export interface FilterOption {
    id: string;
    label: string;
}

interface CaseFilterProps {
    options: FilterOption[];
    onFilterChange: (selectedFilters: string[]) => void;
}

export function CaseFilter({options, onFilterChange}: CaseFilterProps) {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const toggleFilter = (filterId: string) => {
        let newFilters: string[];

        // If selecting "Semua Kasus" option
        if (filterId === "all") {
            newFilters = [];
        } else {
            // Toggle the selected filter
            if (selectedFilters.includes(filterId)) {
                // Remove the filter if it's already selected
                newFilters = selectedFilters.filter((id) => id !== filterId);
            } else {
                // Add the filter if it's not selected
                newFilters = [...selectedFilters, filterId];
            }
        }

        setSelectedFilters(newFilters);
        onFilterChange(newFilters);
    };

    // Determine if "Semua Kasus" is effectively selected (when no filters are selected)
    const isAllCasesSelected = selectedFilters.length === 0;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="w-full sm:w-60 justify-between h-10 px-4 font-normal text-base">
                    {isAllCasesSelected ? "Semua Kasus" : `${selectedFilters.length} kasus dipilih`}
                    <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60">
                {/* "Semua Kasus" option */}
                <div
                    className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                    onClick={() => toggleFilter("all")}
                >
                    <div className="mr-2 h-4 w-4 flex items-center justify-center border rounded">
                        {isAllCasesSelected && <Check className="h-3 w-3" />}
                    </div>
                    <span>Semua Kasus</span>
                </div>

                {/* Divider */}
                <div className="h-px bg-muted my-1" />

                {/* Other filter options */}
                {options.map((option) => (
                    <div
                        key={option.id}
                        className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                        onClick={() => toggleFilter(option.id)}
                    >
                        <div className="mr-2 h-4 w-4 flex items-center justify-center border rounded">
                            {selectedFilters.includes(option.id) && <Check className="h-3 w-3" />}
                        </div>
                        <span>{option.label}</span>
                    </div>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
