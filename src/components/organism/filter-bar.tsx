"use client";

import {useState} from "react";
import {Search} from "lucide-react";
import {Input} from "@/components/atoms/input";

interface FilterOption {
    id: string;
    label: string;
}

interface FilterBarProps {
    filterOptions: FilterOption[];
    onFilterChange: (filters: string[]) => void;
    searchValue: string;
    onSearchChange: (value: string) => void;
}

export function FilterBar({filterOptions, onFilterChange, searchValue, onSearchChange}: FilterBarProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const handleFilterChange = (filterId: string) => {
        const newFilters = selectedFilters.includes(filterId)
            ? selectedFilters.filter((id) => id !== filterId)
            : [...selectedFilters, filterId];

        setSelectedFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <div className="bg-blue-900 p-4 flex gap-4">
            <div className="relative">
                <button
                    className="bg-white w-48 h-10 px-4 rounded-md text-left flex items-center justify-between"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    {selectedFilters.length === 0 ? "Semua Kasus" : `${selectedFilters.length} filter dipilih`}
                    <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-2"
                    >
                        <path
                            d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>

                {isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        {filterOptions.map((option) => (
                            <div key={option.id} className="p-2 hover:bg-gray-100 cursor-pointer">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedFilters.includes(option.id)}
                                        onChange={() => handleFilterChange(option.id)}
                                        className="rounded border-gray-300"
                                    />
                                    <span>{option.label}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                    placeholder="Cari..."
                    className="pl-10 bg-white w-full"
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
        </div>
    );
}
