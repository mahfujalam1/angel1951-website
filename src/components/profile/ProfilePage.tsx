"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { MainTab } from "@/types/referralHistory.types";
import ProfileHeader from "./ProfileHeader";
import MainTabs from "./MainTabs";
import ProfileTab from "./ProfileTab";
import BonusTab from "./BonusTab";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const [mainTab, setMainTab] = useState<MainTab>("profile");
    const router = useRouter()

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <div className="max-w-6xl mx-auto px-4 py-8">

                {/* Back Nav */}
                <button onClick={()=>router.back()} className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-primary transition-colors mb-6">
                    <ChevronLeft size={16} />
                    Profile
                </button>

                {/* Header */}
                <ProfileHeader mainTab={mainTab} />

                {/* Main Tabs */}
                <MainTabs activeTab={mainTab} onChange={setMainTab} />

                {/* Tab Content */}
                {mainTab === "profile" && <ProfileTab />}
                {mainTab === "bonus" && <BonusTab />}

            </div>
        </div>
    );
}