"use client";

import { useState } from "react";
import { X, ChevronDown } from "lucide-react";

interface Props {
    trackingId: string;
    currentStatus: string;
    onClose: () => void;
    onUpdate: (newStatus: string, note: string) => void;
}

const STATUS_OPTIONS = [
    "In Transit",
    "Arrived",
    "Processing",
    "Ready to Dispatch",
    "Dispatched",
    "Delivered",
    "On Hold",
];

export default function UpdateStatusModal({
    trackingId,
    currentStatus,
    onClose,
    onUpdate,
}: Props) {
    const [newStatus, setNewStatus] = useState(currentStatus);
    const [note, setNote] = useState("");
    const [open, setOpen] = useState(false);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={18} />
                </button>

                <h2 className="text-xl font-bold text-gray-900 mb-2 font-inter">
                    Update Status
                </h2>
                <p className="text-sm text-gray-500 mb-5">
                    Tracking ID : {trackingId}
                </p>

                {/* Current Status badge */}
                <div className="flex items-center gap-3 mb-5">
                    <span className="text-sm font-semibold text-gray-700 w-36 shrink-0">
                        Current Status:
                    </span>
                    <span className="bg-orange-100 text-orange-600 text-sm font-semibold px-4 py-1.5 rounded-lg flex items-center gap-2">
                        {currentStatus}
                        <ChevronDown size={14} />
                    </span>
                </div>

                {/* Change Status dropdown */}
                <div className="mb-5">
                    <label className="text-sm font-semibold text-gray-700 block mb-2">
                        Change Status:
                    </label>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setOpen(!open)}
                            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-white"
                        >
                            {newStatus}
                            <ChevronDown
                                size={16}
                                className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
                            />
                        </button>
                        {open && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                                {STATUS_OPTIONS.map((opt) => (
                                    <button
                                        key={opt}
                                        type="button"
                                        onClick={() => { setNewStatus(opt); setOpen(false); }}
                                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${newStatus === opt
                                                ? "bg-primary/10 text-primary font-semibold"
                                                : "text-gray-700 hover:bg-gray-50"
                                            }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Note */}
                <div className="mb-6">
                    <label className="text-sm font-semibold text-gray-700 block mb-2">
                        Note (Optional)
                    </label>
                    <input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Package intact, No damage"
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                </div>

                {/* Actions */}
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-full border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onUpdate(newStatus, note)}
                        className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:opacity-90 active:scale-95 transition-all shadow-sm"
                    >
                        Update Status
                    </button>
                </div>
            </div>
        </div>
    );
}