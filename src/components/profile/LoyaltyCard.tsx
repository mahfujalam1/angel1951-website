"use client";

import { ChevronDown } from "lucide-react";

interface LoyaltyCardProps {
    label: string;
    current: number;
    total: number;
    reward: string;
}

export default function LoyaltyCard({ label, current, total, reward }: LoyaltyCardProps) {
    const percentage = Math.round((current / total) * 100);

    return (
        <div className="flex-1 min-w-0 bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                <span>Current Loyalty Points:</span>
                <span className="font-semibold text-gray-700">
                    {current}/{total}
                </span>
            </div>

            <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
                <div
                    className="bg-primary h-2 rounded-full transition-all duration-700"
                    style={{ width: `${percentage}%` }}
                />
            </div>

            <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Next Reward:</span>
                <button className="flex items-center gap-1 text-xs font-medium text-gray-700 hover:text-primary transition-colors">
                    {label} <ChevronDown size={12} />
                </button>
            </div>

            <div className="mt-1 text-right">
                <span className="text-xs font-semibold text-primary">{reward}</span>
            </div>
        </div>
    );
}