"use client";

import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import AbroadToNigeriaForm from "@/components/create/AbroadToInternationalForm";
import NigeriaToAbroadForm from "@/components/create/NigeriaToAbroadForm";
import AbroadToInternational from "@/components/create/AbroadToInternationalForm";

type Tab = "abroad_to_international" | "nigeria_to_abroad";

export default function ShippingInformationPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<Tab>("nigeria_to_abroad");
    const [role, setRole] = useState<string>("");
    useEffect(() => {
        const role = localStorage.getItem("role");
        setRole(role as string);

    }, [])

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-4 border-b border-gray-100">
                <button
                    onClick={() => router.back()}
                    className="text-gray-500 hover:text-gray-800 transition"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <h1 className="text-sm font-semibold text-gray-800">Shipping Information</h1>
            </div>

            {/* Tab switcher */}
            <div className="flex justify-center gap-2 py-4 px-4">
                {
                    role === "hubProvider" || role === "partner" ? <button
                        className={`px-5 py-2 rounded-full text-sm font-medium transition ${role === "hubProvider" || role === "partner"
                            ? "bg-gray-900 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                    >
                        Nigeria to abroad
                    </button> :
                        <button
                            className={`px-5 py-2 rounded-full text-sm font-medium transition ${role === ""
                                ? "bg-gray-900 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            Shipment from abroad to International
                        </button>
                }


            </div>

            {/* Form area */}
            <div className="max-w-3xl mx-auto px-4 pb-16">
                {role === "" ? (
                    <AbroadToInternational />
                ) : (
                    <NigeriaToAbroadForm />
                )}
            </div>
        </div>
    );
}