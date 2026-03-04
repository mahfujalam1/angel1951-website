// components/shipping/ShipmentTable.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Shipment } from "@/types/shipping";
import StatusBadge from "./StatusBadge";

type Props = {
    shipments: Shipment[];
};

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

export default function ShipmentTable({ shipments }: Props) {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const totalPages = Math.max(1, Math.ceil(shipments.length / pageSize));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * pageSize;
    const paginated = shipments.slice(start, start + pageSize);

    const handlePageSize = (val: string) => {
        setPageSize(Number(val));
        setPage(1);
    };

    return (
        <div className="flex flex-col gap-0">
            {/* ── Table ── */}
            <div className="overflow-x-auto rounded-t-2xl">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50 hover:bg-gray-50 border-b border-gray-100">
                            <TableHead className="text-xs font-semibold text-gray-500 whitespace-nowrap py-3 px-4">
                                Order No
                            </TableHead>
                            <TableHead className="text-xs font-semibold text-gray-500 whitespace-nowrap py-3 px-4">
                                User
                            </TableHead>
                            <TableHead className="text-xs font-semibold text-gray-500 whitespace-nowrap py-3 px-4 hidden md:table-cell">
                                Email
                            </TableHead>
                            <TableHead className="text-xs font-semibold text-gray-500 whitespace-nowrap py-3 px-4 hidden lg:table-cell">
                                Receiver Address
                            </TableHead>
                            <TableHead className="text-xs font-semibold text-gray-500 whitespace-nowrap py-3 px-4 hidden sm:table-cell">
                                Phone Number
                            </TableHead>
                            <TableHead className="text-xs font-semibold text-gray-500 whitespace-nowrap py-3 px-4">
                                Status
                            </TableHead>
                            <TableHead className="text-xs font-semibold text-gray-500 whitespace-nowrap py-3 px-4 text-right">
                                Details
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginated.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center text-sm text-gray-400 py-12">
                                    No shipments found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginated.map((s) => (
                                <TableRow
                                    key={s.id}
                                    className="border-b border-gray-50 hover:bg-gray-50 transition group"
                                >
                                    {/* Order No */}
                                    <TableCell className="py-3.5 px-4 text-gray-700 font-medium text-xs whitespace-nowrap">
                                        {s.orderNo}
                                    </TableCell>

                                    {/* User */}
                                    <TableCell className="py-3.5 px-4">
                                        <div className="flex items-center gap-2.5 min-w-[140px]">
                                            <img
                                                src={s.user.avatar}
                                                alt={s.user.name}
                                                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                                            />
                                            <div className="min-w-0">
                                                <p className="text-gray-800 font-medium text-xs leading-tight truncate max-w-[120px]">
                                                    {s.user.name}
                                                </p>
                                                <p className="text-gray-400 text-[11px] leading-tight truncate max-w-[120px]">
                                                    {s.user.addressShort}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* Email — hidden on mobile */}
                                    <TableCell className="py-3.5 px-4 text-gray-500 text-xs whitespace-nowrap hidden md:table-cell">
                                        {s.email}
                                    </TableCell>

                                    {/* Receiver Address — hidden on tablet */}
                                    <TableCell className="py-3.5 px-4 text-gray-500 text-xs max-w-[180px] hidden lg:table-cell">
                                        <span className="line-clamp-2">{s.receiverAddress}</span>
                                    </TableCell>

                                    {/* Phone — hidden on mobile */}
                                    <TableCell className="py-3.5 px-4 text-gray-600 text-xs whitespace-nowrap hidden sm:table-cell">
                                        {s.phoneNumber}
                                    </TableCell>

                                    {/* Status */}
                                    <TableCell className="py-3.5 px-4">
                                        <StatusBadge status={s.status} />
                                    </TableCell>

                                    {/* Details */}
                                    <TableCell className="py-3.5 px-4 text-right">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="w-8 h-8 border-gray-200 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-500 transition"
                                            onClick={() => router.push(`/status/${s.id}`)}
                                        >
                                            <ArrowUpRight className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* ── Pagination footer ── */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-gray-100 bg-white rounded-b-2xl">
                {/* Left: rows info + page size selector */}
                <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>
                        Showing{" "}
                        <span className="font-semibold text-gray-700">
                            {shipments.length === 0 ? 0 : start + 1}–{Math.min(start + pageSize, shipments.length)}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-gray-700">{shipments.length}</span> results
                    </span>

                    <div className="flex items-center gap-1.5">
                        <span className="text-gray-400">Rows:</span>
                        <Select value={String(pageSize)} onValueChange={handlePageSize}>
                            <SelectTrigger className="h-7 w-14 text-xs border-gray-200 rounded-lg focus:ring-blue-400">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {PAGE_SIZE_OPTIONS.map((n) => (
                                    <SelectItem key={n} value={String(n)} className="text-xs">
                                        {n}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Right: page controls */}
                <div className="flex items-center gap-1">
                    {/* First */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="w-7 h-7 border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-300 disabled:opacity-30"
                        onClick={() => setPage(1)}
                        disabled={safePage === 1}
                    >
                        <ChevronsLeft className="w-3.5 h-3.5" />
                    </Button>

                    {/* Prev */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="w-7 h-7 border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-300 disabled:opacity-30"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={safePage === 1}
                    >
                        <ChevronLeft className="w-3.5 h-3.5" />
                    </Button>

                    {/* Page numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter((p) => p === 1 || p === totalPages || Math.abs(p - safePage) <= 1)
                        .reduce<(number | "...")[]>((acc, p, idx, arr) => {
                            if (idx > 0 && (arr[idx - 1] as number) + 1 !== p) acc.push("...");
                            acc.push(p);
                            return acc;
                        }, [])
                        .map((item, idx) =>
                            item === "..." ? (
                                <span key={`ellipsis-${idx}`} className="w-7 h-7 flex items-center justify-center text-xs text-gray-400">
                                    …
                                </span>
                            ) : (
                                <Button
                                    key={item}
                                    variant={safePage === item ? "default" : "outline"}
                                    size="icon"
                                    className={`w-7 h-7 text-xs font-medium transition
                    ${safePage === item
                                            ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                                            : "border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600"
                                        }`}
                                    onClick={() => setPage(item as number)}
                                >
                                    {item}
                                </Button>
                            )
                        )}

                    {/* Next */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="w-7 h-7 border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-300 disabled:opacity-30"
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={safePage === totalPages}
                    >
                        <ChevronRight className="w-3.5 h-3.5" />
                    </Button>

                    {/* Last */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="w-7 h-7 border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-300 disabled:opacity-30"
                        onClick={() => setPage(totalPages)}
                        disabled={safePage === totalPages}
                    >
                        <ChevronsRight className="w-3.5 h-3.5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}