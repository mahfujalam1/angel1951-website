"use client";

import { useState } from "react";
import { ChevronLeft, Search, RefreshCw, Users, Download, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { MOCK_DETAIL, ShipmentStatus, STATUS_STYLES } from "@/types/shipment.types";
import ShipmentInfoCards from "./ShipmentInfoCards";
import ShipmentTimeline from "./ShipmentTimeline";

// ── Update Status mini modal (inline) ─────────────────────────────────────────
const ALL_STATUSES: ShipmentStatus[] = [
    "Created", "Processing", "Received", "In Transit",
    "Arrived on destination Country", "Custom Cleared",
    "Arrived at Hub", "Out of delivery", "Delivered",
];

function UpdateStatusModal({
    current,
    onClose,
    onUpdate,
}: {
    current: ShipmentStatus;
    onClose: () => void;
    onUpdate: (s: ShipmentStatus) => void;
}) {
    const [selected, setSelected] = useState<ShipmentStatus>(current);
    const [open, setOpen] = useState(false);
    const [note, setNote] = useState("");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200">
                <h2 className="text-xl font-bold text-gray-900 mb-1">Update Status</h2>
                <p className="text-sm text-gray-400 mb-5">Tracking ID : {MOCK_DETAIL.trackingNumber}</p>

                <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm font-semibold text-gray-700 w-36 shrink-0">Current Status:</span>
                    <span className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 ${STATUS_STYLES[current]}`}>
                        {current} <ChevronDown size={11} />
                    </span>
                </div>

                <div className="mb-4">
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Change Status:</label>
                    <div className="relative">
                        <button
                            onClick={() => setOpen(!open)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 flex items-center justify-between bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            {selected}
                            <ChevronDown size={15} className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
                        </button>
                        {open && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden max-h-48 overflow-y-auto">
                                {ALL_STATUSES.map((s) => (
                                    <button key={s} onClick={() => { setSelected(s); setOpen(false); }}
                                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors">
                                        <span className={`inline-block px-2 py-0.5 rounded-md border text-xs font-semibold ${STATUS_STYLES[s]}`}>{s}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mb-6">
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Note (Optional)</label>
                    <input type="text" value={note} onChange={(e) => setNote(e.target.value)}
                        placeholder="Package intact, No damage"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                </div>

                <div className="flex gap-3 justify-end">
                    <button onClick={onClose} className="px-6 py-2.5 rounded-full border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all">Cancel</button>
                    <button onClick={() => { onUpdate(selected); onClose(); }}
                        className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:opacity-90 active:scale-95 transition-all shadow-sm">Update Status</button>
                </div>
            </div>
        </div>
    );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ShipmentDetailPage() {
    const router = useRouter();
    const [data, setData] = useState(MOCK_DETAIL);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [search, setSearch] = useState("");

    const handleStatusUpdate = (newStatus: ShipmentStatus) => {
        setData((prev) => ({ ...prev, status: newStatus }));
    };

    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* ── Top Bar ── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-primary transition-colors"
                    >
                        <ChevronLeft size={16} />
                        Shipping Details
                    </button>
                </div>

                {/* ── Shipment ID + Status Badge ── */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">{data.trackingNumber}</h1>
                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${STATUS_STYLES[data.status]}`}>
                        {data.status}
                    </span>
                </div>
                <p className="text-sm text-gray-400 mb-5">Last Update: {data.lastUpdate}</p>

                {/* ── Action Buttons ── */}
                <div className="flex flex-wrap gap-2 mb-7">
                    <button
                        onClick={() => setShowStatusModal(true)}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-primary hover:text-primary transition-all shadow-sm"
                    >
                        <RefreshCw size={14} />
                        Update Status
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-primary hover:text-primary transition-all shadow-sm">
                        <Users size={14} />
                        Assign Hub/ Staff
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-primary hover:text-primary transition-all shadow-sm">
                        <Download size={14} />
                        Download Invoice
                    </button>
                </div>

                {/* ── Info Cards ── */}
                <div className="mb-5">
                    <ShipmentInfoCards data={data} />
                </div>

                {/* ── Timeline + Sidebar ── */}
                <ShipmentTimeline data={data} />
            </div>

            {/* ── Modal ── */}
            {showStatusModal && (
                <UpdateStatusModal
                    current={data.status}
                    onClose={() => setShowStatusModal(false)}
                    onUpdate={handleStatusUpdate}
                />
            )}
        </div>
    );
}