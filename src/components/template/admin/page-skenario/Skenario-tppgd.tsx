import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import { Search, Eye, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import Sidebar from "../../../organism/sidebar-admin";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/atoms/table";
import Link from "next/link";
import Breadcrumb from "@/components/organism/breadcrumd"
import DashboardHeader from "../../../organism/DashboardHeader";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationLink,
} from "@/components/atoms/pagination";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export default function KelolaSkenarioTppgd() {
    const router = useRouter();
    const { id } = router.query;
    const [searchQuery, setSearchQuery] = useState("");
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<
        {
            id: number;
            simulation_id: number;
            scenario: string;
            order: number;
            question: string;
            component: string;
            createdAt: string;
            updatedAt: string;
        }[]
    >([]);

    const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const token = Cookies.get("token");

    const fetchData = useCallback(async () => {
        try {
            const res = await axios.get(
                `${API_BASE_URL}/tppgd/get-All-Scenario/${id}`,
            );
            if (res.data && res.data.data) {
                const sorted = res.data.data.sort((a: { order: number }, b: { order: number }) => a.order - b.order);
                setData(sorted);
            }
        } catch (error) {
            console.error("Gagal fetch data:", error);

        } finally {
            setLoading(false);
        }
    }, [API_BASE_URL, id,]);

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id, fetchData]);

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
                axios.delete(`${API_BASE_URL}/admin/scenario/delete-scenario/${id}`, {
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

    const filteredData = data.filter((item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.scenario.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];
    const totalPages = Math.ceil(filteredData.length / recordsPerPage);
    const displayedData = filteredData.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

    if (loading) return <div className="p-4">Memuat data skenario...</div>;
    return (
        <>
            <div className="flex flex-col md:flex-row">
                {/* Sidebar */}
                <Sidebar />
                {/* Main Content Wrapper - Added pl-16 for mobile spacing */}
                <div className="flex-1 flex flex-col min-h-screen pl-16 md:ml-64 md:pl-0">
                    <DashboardHeader />
                    <main className="flex-1 p-4 md:p-6 bg-gray-100">
                        {/* Header Section */}
                        <div className="w-full mx-auto mb-6">
                            <Breadcrumb
                                customMap={{
                                    "simulasi-tppgd": "Kelola Simulasi TPPGD",
                                    [id as string]: "Kelola Skenario TPPGD"
                                }}
                                pageTitle="Kelola Skenario"
                            />
                            <h1 className="text-2xl text-gray-800">
                                Kelola Skenario TPPGD
                            </h1>
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
                            <Link href={`/admin/simulasi-tppgd/${id}/form-skenario`}>
                                <Button className="bg-[#2E3192] hover:bg-[#252880] text-white w-full md:w-auto">
                                    Tambah Skenario
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
                                            <TableHead className="whitespace-nowrap">Pertanyaan</TableHead>
                                            <TableHead className="whitespace-nowrap">Skenario</TableHead>
                                            <TableHead className="whitespace-nowrap">Jawaban</TableHead>
                                            <TableHead className="whitespace-nowrap">Jenis Form</TableHead>
                                            <TableHead className="text-center whitespace-nowrap">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {displayedData.map((item, index) => (
                                            <TableRow key={item.id || `skenario-${index}`} className="border-b text-xs md:text-sm">
                                                <TableCell title={`${item.order}`} className="text-center font-semibold">  {item.order}</TableCell>
                                                <TableCell title={item.question} className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                                                    {item.question}
                                                </TableCell>
                                                <TableCell title={item.scenario} className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                                                    {item.scenario}
                                                </TableCell>
                                                <TableCell title={""} className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">

                                                </TableCell>
                                                <TableCell title={item.component} className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                                                    {item.component}
                                                </TableCell>
                                                <TableCell className="whitespace-nowrap">
                                                    <div className="flex justify-center space-x-2">
                                                        <Link href={`/admin/simulasi-tppgd/${id}/show/${item.id}`}>
                                                            <button className="p-1 hover:text-yellow-600" aria-label="Lihat Detail">
                                                                <Eye className="h-4 w-4 md:h-5 md:w-5" />
                                                            </button>
                                                        </Link>
                                                        <button className="p-1 hover:text-blue-800" aria-label="Edit">
                                                            <Edit className="h-4 w-4 md:h-5 md:w-5" />
                                                        </button>
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
                </div >
            </div >
        </>
    );
}
