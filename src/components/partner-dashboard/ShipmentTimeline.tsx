"use client";

import { Download, Phone, User } from "lucide-react";
import { ShipmentDetail, ShipmentStatus, STATUS_STYLES, TIMELINE_STEPS } from "@/types/shipment.types";

function TimelineDot({ active, completed, status }: { active?: boolean; completed?: boolean; status?: ShipmentStatus }) {
    if (active) {
        return (
            <div className="w-5 h-5 rounded-full border-2 border-primary bg-primary flex items-center justify-center shrink-0 z-10">
                <div className="w-2 h-2 rounded-full bg-white" />
            </div>
        );
    }
    if (completed) {
        return (
            <div className="w-5 h-5 rounded-full border-2 border-emerald-400 bg-emerald-50 flex items-center justify-center shrink-0 z-10">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
        );
    }
    return (
        <div className="w-5 h-5 rounded-full border-2 border-gray-200 bg-white shrink-0 z-10" />
    );
}

export default function ShipmentTimeline({ data }: { data: ShipmentDetail }) {
    const currentStatusIndex = TIMELINE_STEPS.indexOf(data.status as ShipmentStatus);

    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            {/* Timeline */}
            <div className="xl:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-base font-bold text-gray-800 mb-6">Shipment timeline</h3>

                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-2.5 top-2.5 bottom-2.5 w-px bg-gray-100" />

                    <div className="flex flex-col gap-0">
                        {data.timeline.map((event, i) => {
                            const isActive = event.highlight;
                            const isCompleted = !event.highlight && i < data.timeline.findIndex((e) => e.highlight);
                            const isPending = !isActive && !isCompleted && !event.label.startsWith("Estimated");
                            const isEstimate = event.label.startsWith("Estimated");

                            return (
                                <div key={i} className="relative pl-9">
                                    {/* Dot */}
                                    <div className="absolute left-0 top-1">
                                        <TimelineDot active={isActive} completed={isCompleted} />
                                    </div>

                                    {/* Content */}
                                    {isActive ? (
                                        <div className="mb-4 bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                            <div className="flex items-center gap-3">
                                                <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${STATUS_STYLES["In Transit"]}`}>
                                                    In Transit
                                                </span>
                                                {event.toHub && (
                                                    <span className="text-sm font-semibold text-gray-700">{event.toHub}</span>
                                                )}
                                                {event.time && (
                                                    <span className="text-xs text-gray-400">01:00 PM</span>
                                                )}
                                            </div>
                                            {event.time && (
                                                <span className="text-xs text-gray-500 whitespace-nowrap">{event.time}</span>
                                            )}
                                        </div>
                                    ) : isEstimate ? (
                                        <div className="mb-4 py-2">
                                            <p className="text-sm font-semibold text-gray-500 italic">{event.label}</p>
                                        </div>
                                    ) : (
                                        <div className="mb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-1 py-1">
                                            <p className={`text-sm ${isCompleted ? "text-gray-700 font-medium" : "text-gray-400"}`}>
                                                {event.label.includes("Ahmed Khan") ? (
                                                    <>
                                                        Picked up by{" "}
                                                        <span className="text-primary font-semibold">Ahmed Khan</span>
                                                    </>
                                                ) : (
                                                    event.label
                                                )}
                                            </p>
                                            <div className="flex gap-4 shrink-0">
                                                {event.timestamp && (
                                                    <span className="text-xs text-gray-400 whitespace-nowrap">{event.timestamp}</span>
                                                )}
                                                {event.time && !isActive && (
                                                    <span className="text-xs text-gray-400 whitespace-nowrap">{event.time}</span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Proof of Delivery Tabs */}
                <div className="mt-4 border-t border-gray-100 pt-5">
                    <div className="flex gap-0 border-b border-gray-200 mb-4 overflow-x-auto">
                        {["Proof of Delivery", "Notes", "Payment", "Email"].map((tab, i) => (
                            <button
                                key={tab}
                                className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 -mb-px ${i === 0
                                        ? "border-primary text-primary"
                                        : "border-transparent text-gray-400 hover:text-gray-600"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-4">
                        {data.proofPhotos.map((photo, i) => (
                            <div key={i} className="flex flex-col gap-1.5">
                                <div
                                    className={`w-28 h-24 sm:w-32 sm:h-28 rounded-xl border-2 overflow-hidden flex items-center justify-center ${photo.url ? "border-gray-200" : "border-dashed border-gray-200 bg-gray-50"
                                        }`}
                                >
                                    {photo.url ? (
                                        <img src={photo.url} alt={photo.label} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-2xl text-gray-300">+</span>
                                    )}
                                </div>
                                <p className="text-xs font-semibold text-gray-700">{photo.label}</p>
                                <p className="text-xs text-gray-400">{photo.timestamp}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="flex flex-col gap-4">
                {/* Assigned Hub & Staff */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                    <h3 className="text-sm font-bold text-gray-800 mb-4">Assigned Hub & Staff</h3>
                    <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                            {data.assignedHub.staffName.charAt(0)}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <p className="text-sm font-bold text-gray-800">{data.assignedHub.hubName}</p>
                            <p className="text-sm font-semibold text-primary">{data.assignedHub.staffName}</p>
                            <a
                                href={`tel:${data.assignedHub.staffPhone}`}
                                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary transition-colors"
                            >
                                <Phone size={12} />
                                {data.assignedHub.staffPhone}
                            </a>
                            <button className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
                                <User size={12} />
                                View Profile
                            </button>
                        </div>
                    </div>
                </div>

                {/* Payment Info */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                    <h3 className="text-sm font-bold text-gray-800 mb-4">Payment Info</h3>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Status:</span>
                            <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${STATUS_STYLES["In Transit"]}`}>
                                {data.payment.status}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Amount:</span>
                            <span className="text-base font-bold text-gray-900">{data.payment.amount}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Invoice:</span>
                            <span className="text-sm text-gray-700 font-medium">{data.payment.invoice}</span>
                        </div>
                        <button className="mt-1 w-full flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold py-2.5 rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-sm">
                            <Download size={14} />
                            Download Invoice
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}