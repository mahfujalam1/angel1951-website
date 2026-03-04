// app/status/page.tsx  (or wherever you route to)
"use client";

import { useState } from "react";
import { ChevronLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { SHIPMENTS } from "@/types/shipping";
import TrackingBar from "@/components/shipping/TrackingBar";
import ShipmentTable from "@/components/shipping/ShipmentTable";

export default function ShippingStatusPage() {
    const router = useRouter();
    const [search, setSearch] = useState("");

    const filtered = SHIPMENTS.filter(
        (s) =>
            s.user.name.toLowerCase().includes(search.toLowerCase()) ||
            s.orderNo.includes(search) ||
            s.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen max-w-7xl mx-auto bg-white px-6 py-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => router.back()}
                        className="text-gray-400 hover:text-gray-700 transition"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-base font-semibold text-gray-800">Shipping Status</h1>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search here..."
                        className="pl-9 pr-4 py-2.5 bg-blue-50 rounded-2xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 w-64 transition"
                    />
                </div>
            </div>

            {/* Tracking bar */}
            <TrackingBar activeStatus="In Transit" />

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <ShipmentTable shipments={filtered} />
            </div>
        </div>
    );
}