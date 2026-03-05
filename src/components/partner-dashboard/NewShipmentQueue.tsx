"use client";

import { useState } from "react";
import { Search, ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { MOCK_SHIPMENTS, ShipmentStatus, STATUS_STYLES } from "@/types/shipment.types";

const ALL_STATUSES: ShipmentStatus[] = [
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
                onClick={() => setOpen(!open)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold min-w-[110px] justify-between transition-all ${STATUS_STYLES[value]}`}
            >
                <span className="truncate">{value}</span>
                <ChevronDown size={12} className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
                <div className="absolute right-0 z-20 mt-1 w-52 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                    {ALL_STATUSES.map((s) => (
                        <button
                            key={s}
                            onClick={() => { onChange(s); setOpen(false); }}
                            className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors hover:bg-gray-50 ${value === s ? "font-bold" : ""}`}
                        >
                            <span className={`inline-block px-2 py-0.5 rounded-md border ${STATUS_STYLES[s]}`}>{s}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function NewShipmentQueue() {
    const [search, setSearch] = useState("");
    const [statuses, setStatuses] = useState<Record<string, ShipmentStatus>>(
        Object.fromEntries(MOCK_SHIPMENTS.slice(0, 9).map((s) => [s.id, s.status]))
    );

    const rows = MOCK_SHIPMENTS.slice(0, 9).filter((s) =>
        s.trackingNumber.toLowerCase().includes(search.toLowerCase()) ||
        s.customer.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden font-inter">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">New Shipment Queue</h2>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search here..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50 w-48 sm:w-60 transition-all"
                        />
                    </div>
                    <Link href={'/all-shipments'} className="text-sm font-semibold text-primary hover:underline whitespace-nowrap flex items-center gap-1">
                        View all <ArrowRight size={14} />
                    </Link>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50/50">
                            <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3 whitespace-nowrap">Tracking Number</th>
                            <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3 whitespace-nowrap">Customer</th>
                            <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3 whitespace-nowrap">Email</th>
                            <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3 whitespace-nowrap">Origin</th>
                            <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3 whitespace-nowrap">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, i) => (
                            <tr
                                key={row.id}
                                className={`border-b border-gray-50 last:border-0 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? "" : "bg-gray-50/20"}`}
                            >
                                {/* Tracking */}
                                <td className="px-5 py-4">
                                    <Link
                                        href={`/agent-shipment/${row.trackingNumber.replace("#", "")}`}
                                        className="text-sm font-semibold text-gray-800 hover:text-primary transition-colors"
                                    >
                                        {row.trackingNumber}
                                    </Link>
                                </td>

                                {/* Customer */}
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                                            {row.customer.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">{row.customer.name}</p>
                                            <p className="text-xs text-gray-400 truncate max-w-[140px]">{row.customer.address}</p>
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

                                {/* Status */}
                                <td className="px-5 py-4">
                                    <StatusDropdown
                                        value={statuses[row.id] ?? row.status}
                                        onChange={(s) => setStatuses((prev) => ({ ...prev, [row.id]: s }))}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}