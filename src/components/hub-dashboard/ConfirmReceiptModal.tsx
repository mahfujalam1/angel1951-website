"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { ConditionType } from "@/types/hubDashboard.types";

interface Props {
    trackingId: string;
    origin: string;
    destination: string;
    arrivalTime: string;
    onClose: () => void;
    onConfirm: (condition: ConditionType, note: string) => void;
}

export default function ConfirmReceiptModal({
    trackingId,
    origin,
    destination,
    arrivalTime,
    onClose,
    onConfirm,
}: Props) {
    const [condition, setCondition] = useState<ConditionType>("Good");
    const [note, setNote] = useState("");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in-95 duration-200">
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={18} />
                </button>

                <h2 className="text-xl font-bold text-gray-900 mb-5 font-inter">
                    Confirm receipt
                </h2>

                {/* Info rows */}
                <div className="flex flex-col gap-3 mb-5">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="font-semibold w-32 shrink-0">Tracking ID :</span>
                        <span>{trackingId}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="font-semibold w-32 shrink-0">Origin:</span>
                        <span className="flex items-center gap-2">
                            {origin}
                            <span className="text-lg">→</span>
                            {destination}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="font-semibold w-32 shrink-0">Arrival time:</span>
                        <span>{arrivalTime}</span>
                    </div>
                </div>

                {/* Condition */}
                <div className="mb-5">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Condition:</p>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => setCondition("Good")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 text-sm font-semibold transition-all ${condition === "Good"
                                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                                }`}
                        >
                            <span
                                className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${condition === "Good"
                                        ? "border-emerald-500"
                                        : "border-gray-300"
                                    }`}
                            >
                                {condition === "Good" && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                )}
                            </span>
                            Good
                        </button>
                        <button
                            type="button"
                            onClick={() => setCondition("Damage")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 text-sm font-semibold transition-all ${condition === "Damage"
                                    ? "border-amber-500 bg-amber-50 text-amber-700"
                                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                                }`}
                        >
                            <span
                                className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${condition === "Damage"
                                        ? "border-amber-500"
                                        : "border-gray-300"
                                    }`}
                            >
                                {condition === "Damage" && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                )}
                            </span>
                            Damage
                        </button>
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
                        onClick={() => onConfirm(condition, note)}
                        className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:opacity-90 active:scale-95 transition-all shadow-sm"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}