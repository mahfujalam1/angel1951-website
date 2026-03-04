"use client";

import { useState } from "react";
import EditProfileForm from "./EditProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";
import { ProfileSubTab } from "@/types/referralHistory.types";

const subTabs: { key: ProfileSubTab; label: string }[] = [
    { key: "edit", label: "Edit Profile" },
    { key: "password", label: "Change Password" },
];

export default function ProfileTab() {
    const [subTab, setSubTab] = useState<ProfileSubTab>("edit");

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            {/* Sub-tabs */}
            <div className="flex gap-6 mb-6 border-b border-gray-100">
                {subTabs.map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => setSubTab(key)}
                        className={`pb-3 text-sm font-semibold transition-all border-b-2 -mb-px ${subTab === key
                                ? "border-primary text-primary"
                                : "border-transparent text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {subTab === "edit" && <EditProfileForm />}
            {subTab === "password" && <ChangePasswordForm />}
        </div>
    );
}