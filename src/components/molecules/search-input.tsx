"use client";

import {Search} from "lucide-react";
import {Input} from "@/components/atoms/input";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function SearchInput({value, onChange, placeholder = "Cari..."}: SearchInputProps) {
    return (
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 z-10" />
            <Input
                placeholder={placeholder}
                className="pl-10 h-10 w-full bg-white text-gray-800 border-white focus:border-white focus-visible:ring-white"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{backgroundColor: "white"}}
            />
        </div>
    );
}
