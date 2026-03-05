"use client";

import { useState } from "react";
import { X, ChevronDown, ArrowRight } from "lucide-react";
import { TransportType } from "@/types/hubDashboard.types";

interface StaffOption {
    name: string;
    avatar?: string;
}

interface Props {
    trackingId: string;
    onClose: () => void;
    onConfirm: (data: {
        nextHub: string;
        dispatchDateTime: string;
        assignedStaff: string;
        transportType: TransportType;
    }) => void;
}

const HUB_OPTIONS = ["London Hub", "Singapore Hub", "Australia Hub", "Dubai Hub", "New York Hub"];
const STAFF_OPTIONS: StaffOption[] = [
    { name: "Ahamed Khan" },
    { name: "Sarah Johnson" },
    { name: "Mike Chen" },
    { name: "Priya Sharma" },
];
const TRANSPORT_TYPES: TransportType[] = ["Air", "Sea", "Road"];

export default function MarkInTransitModal({ trackingId, onClose, onConfirm }: Props) {
    const [nextHub, setNextHub] = useState("London Hub");
    const [dispatchDateTime, setDispatchDateTime] = useState("2026-02-18T16:30");
    const [assignedStaff, setAssignedStaff] = useState("Ahamed Khan");
    const [transportType, setTransportType] = useState<TransportType>("Air");
    const [hubOpen, setHubOpen] = useState(false);
    const [staffOpen, setStaffOpen] = useState(false);

    const formatDateTime = (val: string) => {
        if (!val) return "";
        const d = new Date(val);
        return d.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };

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
                    Make As In Transit
                </h2>
                <p className="text-sm text-gray-500 mb-5">
                    Tracking ID : {trackingId}
                </p>

                <div className="flex flex-col gap-5">
                    {/* Next Hub */}
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-gray-700 w-36 shrink-0">
                            Next Hub
                        </span>
                        <div className="relative flex-1">
                            <button
                                type="button"
                                onClick={() => { setHubOpen(!hubOpen); setStaffOpen(false); }}
                                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 flex items-center justify-between focus:outline-none hover:border-primary transition-all bg-white"
                            >
                                {nextHub}
                                <ChevronDown size={15} className={`text-gray-400 transition-transform ${hubOpen ? "rotate-180" : ""}`} />
                            </button>
                            {hubOpen && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                                    {HUB_OPTIONS.map((hub) => (
                                        <button
                                            key={hub}
                                            type="button"
                                            onClick={() => { setNextHub(hub); setHubOpen(false); }}
                                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${nextHub === hub ? "bg-primary/10 text-primary font-semibold" : "text-gray-700 hover:bg-gray-50"
                                                }`}
                                        >
                                            {hub}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Dispatch D & T */}
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-gray-700 w-36 shrink-0">
                            Dispatch D & T
                        </span>
                        <div className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 bg-white">
                            <input
                                type="datetime-local"
                                value={dispatchDateTime}
                                onChange={(e) => setDispatchDateTime(e.target.value)}
                                className="w-full text-sm text-gray-800 focus:outline-none bg-transparent"
                            />
                        </div>
                    </div>

                    {/* Assigned Staff */}
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-gray-700 w-36 shrink-0">
                            Assigned Staff
                        </span>
                        <div className="relative flex-1">
                            <button
                                type="button"
                                onClick={() => { setStaffOpen(!staffOpen); setHubOpen(false); }}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 flex items-center justify-between focus:outline-none hover:border-primary transition-all bg-sky-50"
                            >
                                <span className="flex items-center gap-2">
                                    <span className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-600 shrink-0 overflow-hidden">
                                        {assignedStaff.charAt(0)}
                                    </span>
                                    {assignedStaff}
                                </span>
                                <ChevronDown size={15} className={`text-gray-400 transition-transform ${staffOpen ? "rotate-180" : ""}`} />
                            </button>
                            {staffOpen && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                                    {STAFF_OPTIONS.map((s) => (
                                        <button
                                            key={s.name}
                                            type="button"
                                            onClick={() => { setAssignedStaff(s.name); setStaffOpen(false); }}
                                            className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-colors ${assignedStaff === s.name ? "bg-primary/10 text-primary font-semibold" : "text-gray-700 hover:bg-gray-50"
                                                }`}
                                        >
                                            <span className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                                {s.name.charAt(0)}
                                            </span>
                                            {s.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Transport Type */}
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-gray-700 w-36 shrink-0">
                            Transport Type:
                        </span>
                        <div className="flex gap-2">
                            {TRANSPORT_TYPES.map((t) => (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => setTransportType(t)}
                                    className={`px-5 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${transportType === t
                                            ? "border-primary bg-primary/5 text-primary"
                                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-full border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() =>
                            onConfirm({ nextHub, dispatchDateTime, assignedStaff, transportType })
                        }
                        className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:opacity-90 active:scale-95 transition-all shadow-sm flex items-center gap-2"
                    >
                        Confirm Dispatch
                        <ArrowRight size={15} />
                    </button>
                </div>
            </div>
        </div>
    );
}