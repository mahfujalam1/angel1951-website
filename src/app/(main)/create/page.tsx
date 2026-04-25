"use client";

import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import NigeriaToAbroadForm from "@/components/create/NigeriaToAbroadForm";
import AbroadToInternational from "@/components/create/InternationalForm";

export default function ShippingInformationPage() {
    const router = useRouter();
    const [role, setRole] = useState<string | null>(null); // Initial null for hydration

    useEffect(() => {
        const storedRole = localStorage.getItem("role");
        setRole(storedRole || "");
    }, []);

    // Hydration রক্ষায় ইনিশিয়াল লোডিংয়ের সময় কিছু দেখাবে না
    if (role === null) return null;

    const isInternational = !role;

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-4 border-b border-gray-100">
                <button
                    onClick={() => router.back()}
                    className="text-gray-500 hover:text-gray-800 transition p-1 hover:bg-gray-100 rounded-full"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <h1 className="text-sm font-semibold text-gray-800">
                    Shipping Information
                </h1>
            </div>

            {/* Title Based on Role */}
            <div className="flex justify-center py-8">
                <h2 className="px-6 py-2.5 rounded-full bg-gray-900 text-white text-sm font-semibold shadow-md tracking-wide">
                    {isInternational
                        ? "Create International Shipment"
                        : "Nigeria to abroad"}
                </h2>
            </div>

            {/* Form area */}
            <div className="max-w-3xl mx-auto px-4 pb-16 animate-fadeIn transition-all duration-300">
                {isInternational ? (
                    <AbroadToInternational />
                ) : (
                    <NigeriaToAbroadForm />
                )}
            </div>
        </div>
    );
}
