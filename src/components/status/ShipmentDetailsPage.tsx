// app/status/[id]/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import StatusBadge from "../shipping/StatusBadge";
import ShipmentTimeline from "../shipping/ShipmentTimeline";
import { MEDIA_ITEMS, TIMELINE_STEPS } from "@/types/shipping";
import ProofAndMedia from "../shipping/ProofAndMedia";
import ReceiverSignature from "../shipping/ReceiverSignature";

// In real usage: fetch shipment by params.id
export default function ShipmentDetailsPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen px-6 py-5">
            {/* Header */}
            <div className="flex items-center gap-2 mb-5">
                <button
                    onClick={() => router.back()}
                    className="text-gray-400 hover:text-gray-700 transition"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <h1 className="text-sm font-semibold text-gray-800">Shipment Details</h1>
            </div>

            {/* Title row */}
            <div className="flex items-center gap-3 mb-1">
                <StatusBadge status="In Transit" size="md" />
                <h2 className="text-2xl font-bold text-gray-900">#BN123456</h2>
            </div>
            <p className="text-xs text-gray-400 mb-6">
                Last Update: February 15, 2026 | 08:45 M
            </p>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">
                {/* Left: Timeline */}
                <div>
                    <ShipmentTimeline steps={TIMELINE_STEPS} />
                </div>

                {/* Right: Media + Signature */}
                <div className="flex flex-col gap-4">
                    <ProofAndMedia items={MEDIA_ITEMS} />
                    <ReceiverSignature signed={false} />
                </div>
            </div>
        </div>
    );
}