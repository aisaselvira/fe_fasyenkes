"use client";

import type React from "react";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/atoms/pagination";

interface PaginationControlProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function PaginationControl({currentPage, totalPages, onPageChange}: PaginationControlProps) {
    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            // If we have 5 or fewer pages, show all of them
            for (let i = 1; i <= totalPages; i++) {
                pages.push({type: "page", value: i});
            }
        } else {
            // Always include first page
            pages.push({type: "page", value: 1});

            // Calculate start and end of page numbers to show
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            // Adjust if we're at the beginning or end
            if (currentPage <= 2) {
                end = 4;
            } else if (currentPage >= totalPages - 1) {
                start = totalPages - 3;
            }

            // Add ellipsis if needed
            if (start > 2) {
                pages.push({type: "ellipsis", value: -1});
            }

            // Add middle pages
            for (let i = start; i <= end; i++) {
                pages.push({type: "page", value: i});
            }

            // Add ellipsis if needed
            if (end < totalPages - 1) {
                pages.push({type: "ellipsis", value: -2});
            }

            // Always include last page
            if (totalPages > 1) {
                pages.push({type: "page", value: totalPages});
            }
        }

        return pages;
    };

    // Handle previous page click with disabled state
    const handlePreviousClick = (e: React.MouseEvent) => {
        if (currentPage === 1) {
            e.preventDefault();
            return;
        }
        onPageChange(currentPage - 1);
    };

    // Handle next page click with disabled state
    const handleNextClick = (e: React.MouseEvent) => {
        if (currentPage === totalPages) {
            e.preventDefault();
            return;
        }
        onPageChange(currentPage + 1);
    };

    return (
        <Pagination className="mt-6">
            <PaginationContent className="flex-wrap justify-center gap-2">
                <PaginationItem>
                    <PaginationPrevious
                        onClick={handlePreviousClick}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        href="#"
                    />
                </PaginationItem>

                {getPageNumbers().map((page, index) =>
                    page.type === "ellipsis" ? (
                        <PaginationItem key={`ellipsis-${index}`}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={page.value}>
                            <PaginationLink
                                isActive={currentPage === page.value}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onPageChange(page.value);
                                }}
                                href="#"
                                className={
                                    currentPage === page.value
                                        ? "bg-blue-800 hover:bg-blue-900 text-white border-blue-800"
                                        : ""
                                }
                            >
                                {page.value}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}

                <PaginationItem>
                    <PaginationNext
                        onClick={handleNextClick}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        href="#"
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
