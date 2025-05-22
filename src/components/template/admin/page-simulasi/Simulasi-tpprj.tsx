"use client";

import { List, User } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { Search, Eye, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import Sidebar from "../../../organism/sidebar-admin";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/atoms/table";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationLink,
} from "@/components/atoms/pagination";
import Breadcrumb from "@/components/organism/breadcrumd";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";


function formatLabel(value: string | null | undefined) {
    if (!value) return "-";
    return value.replace(/_/g, " ");
}

export default function KelolaTpprjPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<
        {
            id: number;
            patient_type: string;
            category: string;
            perujuk: string;
            diagnose: string;
            case_type: string;
            payment_method: string;
            case_description: string;
            createdAt: string;
            updatedAt: string;
        }[]
    >([]);

    const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const token = Cookies.get("token");
    const fetchData = useCallback(async () => {
        try {
            const res = await axios.get(
                `${API_BASE_URL}/admin/simulation/get-all-simulation/rawat_jalan`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (res.data && res.data.data) {
                setData(res.data.data);
            }
        } catch (error) {
            console.error("Gagal fetch data:", error);
        }
    }, [API_BASE_URL, token]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDelete = (id: number) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Data yang dihapus tidak bisa dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${API_BASE_URL}/admin/simulation/delete-simulation/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                    .then(() => {
                        Swal.fire('Dihapus!', 'Data berhasil dihapus.', 'success');
                        fetchData();
                    })
                    .catch((error) => {
                        console.error('Error hapus:', error.response || error.message);
                        Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus data.', 'error');
                    });
            }
        });
    };

    const filteredData = data.filter(
        (item) =>
            item.case_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.case_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.diagnose.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.patient_type.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const totalPages = Math.ceil(filteredData.length / recordsPerPage);
    const displayedData = filteredData.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

    return (
        <>
            <div className="flex flex-col md:flex-row">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content Wrapper - Added pl-16 for mobile spacing */}
                <div className="flex-1 flex flex-col min-h-screen pl-16 md:ml-64 md:pl-0">
                    <header className="border-b border-gray-200 bg-white shadow-sm">
                        <div className="flex justify-between items-center px-4 md:px-6 py-4">
                            <div className="flex items-center space-x-4 ml-auto">
                                <User className="h-8 w-8 text-blue-400 bg-blue-100 rounded-full p-1" />
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 p-4 md:p-6 bg-gray-100">
                        {/* Header Section */}
                        <div className="w-full mx-auto mb-6">
                            <Breadcrumb
                                customMap={{
                                    "simulasi-tpprj": "Kelola Simulasi TPPRJ",
                                }}
                            />
                            <h1 className="text-2xl text-gray-800">Kelola Simulasi TPPRJ</h1>
                        </div>
                        <div className="flex flex-wrap justify-between items-center mb-4 space-y-2 md:space-y-0">
                            <div className="flex items-center space-x-2">
                                <select
                                    className="h-10 rounded border border-gray-300 px-3 py-2 text-sm"
                                    value={recordsPerPage}
                                    onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                                >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                </select>
                                <span className="text-sm text-gray-500">records</span>
                            </div>
                            <div className="flex w-full md:w-auto gap-2 ml-auto pr-0 md:pr-4">
                                <Input
                                    placeholder="Cari Kasus..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-[#E8EFFF] focus:ring-2 focus:ring-blue-400 w-full md:w-64"
                                />
                                <Button className="bg-[#FFAA33] hover:bg-[#E09A2D] text-white">
                                    <Search className="h-4 w-4 mr-2" />
                                    Cari
                                </Button>
                            </div>
                            <Link href="/admin/simulasi-tpprj/form-simulasi">
                                <Button className="bg-[#2E3192] hover:bg-[#252880] text-white w-full md:w-auto">
                                    Tambah Kasus
                                </Button>
                            </Link>
                        </div>
                        {/* Table Section */}
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            {/* This div ensures the table container has horizontal scrolling */}
                            <div className="overflow-x-auto w-full">
                                <Table className="w-full text-sm">
                                    <TableHeader>
                                        <TableRow className="bg-gray-200 text-gray-700 text-xs md:text-sm">
                                            <TableHead className="text-center whitespace-nowrap">No</TableHead>
                                            <TableHead className="whitespace-nowrap">Jenis Pasien</TableHead>
                                            <TableHead className="whitespace-nowrap">Jenis Kunjungan</TableHead>
                                            <TableHead className="whitespace-nowrap">Diagnosis</TableHead>
                                            <TableHead className="whitespace-nowrap">Judul Kasus</TableHead>
                                            <TableHead className="whitespace-nowrap">Deskripsi Kasus</TableHead>
                                            <TableHead className="whitespace-nowrap">Metode Pembayaran</TableHead>
                                            <TableHead className="text-center whitespace-nowrap">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {displayedData.map((item, index) => (
                                            <TableRow
                                                key={item.id || `patient-${index}`}
                                                className="border-b text-xs md:text-sm"
                                            >
                                                <TableCell className="text-center font-semibold">
                                                    {(currentPage - 1) * recordsPerPage + index + 1}
                                                </TableCell>
                                                <TableCell className="whitespace-nowrap">{formatLabel(item.patient_type)}</TableCell>
                                                <TableCell className="whitespace-nowrap">{formatLabel(item.category)}</TableCell>
                                                <TableCell className="whitespace-nowrap">{item.diagnose}</TableCell>
                                                <TableCell
                                                    className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]"
                                                    title={item.case_type}
                                                >
                                                    {item.case_type}
                                                </TableCell>
                                                <TableCell
                                                    className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]"
                                                    title={item.case_description}
                                                >
                                                    {item.case_description}
                                                </TableCell>
                                                <TableCell className="whitespace-nowrap">{item.payment_method}</TableCell>
                                                <TableCell className="whitespace-nowrap">
                                                    <div className="flex justify-center space-x-2">
                                                        <Link href={`/admin/simulasi-tpprj/show/${item.id}`}>
                                                            <button className="p-1 hover:text-yellow-600" aria-label="Lihat Detail">
                                                                <Eye className="h-4 w-4 md:h-5 md:w-5" />
                                                            </button>
                                                        </Link>
                                                        <button className="p-1 hover:text-blue-800" aria-label="Edit">
                                                            <Edit className="h-4 w-4 md:h-5 md:w-5" />
                                                        </button>
                                                        <Link href={`/admin/simulasi-tpprj/${item.id}`}>
                                                            <button className="p-1 hover:text-blue-500" aria-label="Lihat Detail">
                                                                <List className="h-4 w-4 md:h-5 md:w-5" />
                                                            </button>
                                                        </Link>
                                                        <button className="p-1 hover:text-red-600" aria-label="Hapus" onClick={() => handleDelete(item.id)}>
                                                            <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
                                                        </button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            <Pagination className="mt-4 flex justify-end">
                                <PaginationContent>
                                    <PaginationPrevious
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    />
                                    {[...Array(totalPages)].map((_, index) => (
                                        <PaginationItem key={index}>
                                            <PaginationLink
                                                isActive={currentPage === index + 1}
                                                onClick={() => setCurrentPage(index + 1)}
                                            >
                                                {index + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationNext
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    />
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
