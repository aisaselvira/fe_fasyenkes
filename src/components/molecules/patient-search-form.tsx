"use client";

import {useState} from "react";
import {Search, Plus, RotateCcw, Calendar} from "lucide-react";
import {Button} from "@/components/atoms/button";
import {Input} from "@/components/atoms/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/atoms/popover";
import {Calendar as CalendarComponent} from "@/components/atoms/calendar";
import {format} from "date-fns";
import {cn} from "@/lib/utils";
import type {DateRange} from "react-day-picker";

interface PatientSearchFormProps {
    onSearch: (query: string, birthDateRange: DateRange | undefined) => void;
    onRegisterNew: () => void;
}

export function PatientSearchForm({onSearch, onRegisterNew}: PatientSearchFormProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

    const handleSearch = () => {
        onSearch(searchQuery, dateRange);
    };

    const handleReset = () => {
        setSearchQuery("");
        setDateRange(undefined);
        onSearch("", undefined);
    };

    return (
        <div className="bg-blue-100 p-4 rounded-md">
            <div className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4 flex items-center">
                <Search className="w-5 h-5 mr-2" />
                <h3 className="font-medium">FORM PENCARIAN PASIEN</h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="flex-1">
                    <Input
                        type="text"
                        placeholder="Masukkan Data Pasien (NIK/No RM/Nama Pasien)"
                        className="w-full bg-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="w-full sm:w-auto">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full sm:w-[240px] justify-start text-left font-normal bg-white",
                                    !dateRange && "text-muted-foreground"
                                )}
                            >
                                <Calendar className="mr-2 h-4 w-4" />
                                {dateRange?.from ? (
                                    dateRange.to ? (
                                        <>
                                            {format(dateRange.from, "dd/MM/yyyy")} -{" "}
                                            {format(dateRange.to, "dd/MM/yyyy")}
                                        </>
                                    ) : (
                                        format(dateRange.from, "dd/MM/yyyy")
                                    )
                                ) : (
                                    <span>Tanggal Lahir</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                                initialFocus
                                mode="range"
                                defaultMonth={dateRange?.from}
                                selected={dateRange}
                                onSelect={setDateRange}
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className="flex flex-wrap gap-3">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white" onClick={handleSearch}>
                    <Search className="w-4 h-4 mr-2" />
                    Cari
                </Button>

                <Button variant="destructive" className="bg-red-600 hover:bg-red-700" onClick={handleReset}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                </Button>

                <div className="flex-grow sm:flex-grow-0 order-last sm:order-none"></div>

                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white ml-auto" onClick={onRegisterNew}>
                    <Plus className="w-4 h-4 mr-2" />
                    Registrasi Pasien Baru
                </Button>
            </div>
        </div>
    );
}
