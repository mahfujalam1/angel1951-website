// components/shipping/StatusBadge.tsx

import { ShipmentStatus } from "@/types/shipping";

const statusConfig: Record<ShipmentStatus, { bg: string; text: string }> = {
    "Shipment Created": { bg: "bg-orange-100", text: "text-orange-600" },
    "In Transit": { bg: "bg-blue-100", text: "text-blue-600" },
    "Custom Processing": { bg: "bg-pink-100", text: "text-pink-600" },
    "At Hub": { bg: "bg-green-100", text: "text-green-600" },
    "Out of Delivery": { bg: "bg-purple-100", text: "text-purple-600" },
    "Delivered": { bg: "bg-yellow-100", text: "text-yellow-600" },
    "Arrived at destination": { bg: "bg-teal-100", text: "text-teal-600" },
};

type Props = { status: ShipmentStatus; size?: "sm" | "md" };

export default function StatusBadge({ status, size = "sm" }: Props) {
    const cfg = statusConfig[status] ?? { bg: "bg-gray-100", text: "text-gray-600" };
    return (
        <span className={`inline-flex items-center rounded-full font-medium whitespace-nowrap
      ${cfg.bg} ${cfg.text}
      ${size === "sm" ? "text-xs px-3 py-1" : "text-sm px-4 py-1.5"}`}>
            {status}
        </span>
    );
}