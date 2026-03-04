"use client";

import { MainTab } from "@/types/referralHistory.types";

interface MainTabsProps {
    activeTab: MainTab;
    onChange: (tab: MainTab) => void;
}

const tabs: { key: MainTab; label: string }[] = [
    { key: "profile", label: "Profile" },
    { key: "bonus", label: "Bonus" },
];

export default function MainTabs({ activeTab, onChange }: MainTabsProps) {
    return (
        <div className="flex gap-6 border-b border-gray-200 mb-6">
            {tabs.map(({ key, label }) => (
                <button
                    key={key}
                    onClick={() => onChange(key)}
                    className={`pb-3 text-sm font-semibold capitalize transition-all border-b-2 -mb-px ${activeTab === key
                            ? "border-primary text-primary"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}