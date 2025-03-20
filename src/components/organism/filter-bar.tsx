"use client";

import {CaseFilter, type FilterOption} from "@/components/molecules/case-filter";
import {SearchInput} from "@/components/molecules/search-input";

interface FilterBarProps {
    filterOptions: FilterOption[];
    onFilterChange: (selectedFilters: string[]) => void;
    searchValue: string;
    onSearchChange: (value: string) => void;
}

export function FilterBar({filterOptions, onFilterChange, searchValue, onSearchChange}: FilterBarProps) {
    return (
        <div className="bg-primary p-4 sm:p-6 py-6 sm:py-8 rounded-b-lg flex flex-col sm:flex-row gap-4 items-center">
            <div className="w-full sm:w-auto">
                <CaseFilter options={filterOptions} onFilterChange={onFilterChange} />
            </div>
            <div className="flex-1 w-full">
                <SearchInput value={searchValue} onChange={onSearchChange} />
            </div>
        </div>
    );
}
