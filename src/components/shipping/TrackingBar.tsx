// components/shipping/TrackingBar.tsx
"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { ShipmentStatus } from "@/types/shipping";

const STEPS: ShipmentStatus[] = [
    "Shipment Created",
    "In Transit",
    "Custom Processing",
    "At Hub",
    "Out of Delivery",
    "Delivered",
];

type Props = {
    activeStatus?: ShipmentStatus;
};

export default function TrackingBar({ activeStatus = "In Transit" }: Props) {
    const [trackingId, setTrackingId] = useState("");

    const activeIndex = STEPS.indexOf(activeStatus);

    return (
        <div className="bg-blue-50 rounded-2xl p-5 mb-6">
            <p className="text-xs font-semibold text-gray-500 mb-3 tracking-wide uppercase">
                Real Time Tracking
            </p>

            {/* Input row */}
            <div className="flex items-center gap-3 mb-5">
                <input
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="Enter tracking (ID) number"
                    className="flex-1 border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition">
                    <Search className="w-4 h-4" />
                    Track Now
                </button>
            </div>

            {/* Progress steps */}
            <div className="relative flex items-center justify-between">
                {/* Track line */}
                <div className="absolute top-[9px] left-0 right-0 h-[2px] bg-gray-200 z-0" />
                {/* Filled line */}
                <div
                    className="absolute top-[9px] left-0 h-[2px] bg-blue-500 z-0 transition-all duration-500"
                    style={{
                        width: activeIndex >= 0
                            ? `${(activeIndex / (STEPS.length - 1)) * 100}%`
                            : "0%",
                    }}
                />

                {STEPS.map((step, i) => {
                    const done = i < activeIndex;
                    const active = i === activeIndex;
                    return (
                        <div key={step} className="relative z-10 flex flex-col items-center gap-1.5">
                            <div
                                className={`w-[18px] h-[18px] rounded-full border-2 transition-all
                  ${done ? "bg-blue-500 border-blue-500"
                                        : active ? "bg-white border-blue-500 ring-4 ring-blue-100"
                                            : "bg-white border-gray-300"}`}
                            />
                            <span className={`text-[10px] font-medium text-center max-w-[70px] leading-tight
                ${active ? "text-blue-600" : done ? "text-gray-500" : "text-gray-400"}`}>
                                {step}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}