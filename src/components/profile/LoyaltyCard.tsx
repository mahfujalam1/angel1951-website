"use client";

import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface LoyaltyCardProps {
    label: string;
    current: number;
    total: number;
    reward: string;
    description: string;
}

export default function LoyaltyCard({ label, current, total, reward, description }: LoyaltyCardProps) {
    const percentage = Math.round((current / total) * 100);
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setShowModal(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex-1 min-w-0 bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex flex-col">
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

            <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">Next Reward:</span>
                <button className="flex items-center gap-1 text-xs font-medium text-gray-700 hover:text-primary transition-colors">
                    {label} <ChevronDown size={12} />
                </button>
            </div>

            <div className="mt-auto flex items-center justify-between relative" ref={modalRef}>
                <button 
                    onClick={() => setShowModal(!showModal)}
                    className="text-[11px] font-medium px-2 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-md transition-colors border border-gray-200"
                >
                    Details
                </button>
                
                {showModal && (
                    <div className="absolute bottom-full left-0 mb-2 w-56 p-3 bg-white text-gray-700 text-xs rounded-lg shadow-xl border border-gray-100 z-20 animate-in fade-in zoom-in-95 duration-200">
                        <div className="font-semibold text-gray-900 mb-1">Reward Details</div>
                        <p className="text-gray-500 leading-relaxed">{description}</p>
                        {/* Pointer arrow */}
                        <div className="absolute top-full left-4 -mt-px border-4 border-transparent border-t-gray-100"></div>
                        <div className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-white"></div>
                    </div>
                )}
                
                <span className="text-xs font-semibold text-primary">{reward}</span>
            </div>
        </div>
    );
}