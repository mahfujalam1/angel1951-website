"use client";

import { useState } from "react";
import { Search, ChevronLeft, ChevronDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    MOCK_SHIPMENTS,
    ShipmentStatus,
    STATUS_STYLES,
} from "@/types/shipment.types";

const STATUSES: ShipmentStatus[] = [
    "Created", "Processing", "Received", "In Transit",
    "Arrived on destination Country", "Custom Cleared",
    "Arrived at Hub", "Out of delivery", "Delivered",
];

function StatusDropdown({
    value,
    onChange,
}: {
    value: ShipmentStatus;
    onChange: (s: ShipmentStatus) => void;
}) {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative">
            <button
                onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold min-w-[100px] justify-between transition-all ${STATUS_STYLES[value]}`}
            >
                <span className="truncate max-w-[90px]">{value}</span>
                <ChevronDown size={11} className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
                <div className="absolute right-0 z-20 mt-1 w-56 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                    {STATUSES.map((s) => (
                        <button
                            key={s}
                            onClick={(e) => { e.stopPropagation(); onChange(s); setOpen(false); }}
                            className="w-full text-left px-3 py-2 text-xs font-medium transition-colors hover:bg-gray-50"
                        >
                            <span className={`inline-block px-2 py-0.5 rounded-md border ${STATUS_STYLES[s]}`}>{s}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function AllShippingStatus() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [statuses, setStatuses] = useState<Record<string, ShipmentStatus>>(
        Object.fromEntries(MOCK_SHIPMENTS.map((s) => [s.id, s.status]))
    );

    const rows = MOCK_SHIPMENTS.filter(
        (s) =>
            s.trackingNumber.toLowerCase().includes(search.toLowerCase()) ||
            s.customer.name.toLowerCase().includes(search.toLowerCase()) ||
            s.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-primary transition-colors"
                    >
                        <ChevronLeft size={16} />
                        All Shipping Status
                    </button>
                    <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search here..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white w-56 sm:w-72 transition-all shadow-sm"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/60">
                                    <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3.5 whitespace-nowrap">Order No</th>
                                    <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3.5 whitespace-nowrap">User</th>
                                    <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3.5 whitespace-nowrap">Email</th>
                                    <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3.5 whitespace-nowrap">Origin</th>
                                    <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3.5 whitespace-nowrap">Phone Number</th>
                                    <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3.5 whitespace-nowrap">Status</th>
                                    <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3.5 whitespace-nowrap">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, i) => (
                                    <tr
                                        key={row.id}
                                        className="border-b border-gray-50 last:border-0 hover:bg-blue-50/20 transition-colors cursor-pointer"
                                        onClick={() => router.push(`/shipments/${row.trackingNumber.replace("#", "")}`)}
                                    >
                                        {/* Order No */}
                                        <td className="px-5 py-4">
                                            <span className="text-sm font-semibold text-gray-800">{row.trackingNumber}</span>
                                        </td>

                                        {/* User */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                                                    {row.customer.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">{row.customer.name}</p>
                                                    <p className="text-xs text-gray-400 truncate max-w-[130px]">{row.customer.address}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Email */}
                                        <td className="px-5 py-4">
                                            <span className="text-sm text-gray-600">{row.email}</span>
                                        </td>

                                        {/* Origin */}
                                        <td className="px-5 py-4">
                                            <span className="text-sm text-gray-700 flex items-center gap-1.5 whitespace-nowrap">
                                                {row.origin}
                                                <span className="text-gray-400">→</span>
                                                {row.destination}
                                            </span>
                                        </td>

                                        {/* Phone */}
                                        <td className="px-5 py-4">
                                            <span className="text-sm text-gray-600 whitespace-nowrap">{row.phone}</span>
                                        </td>

                                        {/* Status */}
                                        <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                                            <StatusDropdown
                                                value={statuses[row.id] ?? row.status}
                                                onChange={(s) => setStatuses((prev) => ({ ...prev, [row.id]: s }))}
                                            />
                                        </td>

                                        {/* Details link */}
                                        <td className="px-5 py-4">
                                            <Link
                                                href={`/agent-shipment/${row.trackingNumber.replace("#", "")}`}
                                                onClick={(e) => e.stopPropagation()}
                                                className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-all"
                                            >
                                                <ArrowUpRight size={14} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}