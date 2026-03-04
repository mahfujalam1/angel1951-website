"use client";

import { MainTab } from "@/types/referralHistory.types";
import { Pencil, User } from "lucide-react";

interface ProfileHeaderProps {
    mainTab: MainTab;
}

export default function ProfileHeader({ mainTab }: ProfileHeaderProps) {
    return (
        <div className="bg-sky-50 rounded-2xl p-5 flex items-center justify-between mb-6 shadow-sm">
            <div className="flex items-center gap-4">
                <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-200 to-rose-300 flex items-center justify-center overflow-hidden ring-2 ring-white shadow-md">
                        <User size={32} className="text-white/80" />
                    </div>
                    <button className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow border border-gray-100 hover:bg-gray-50 transition-colors">
                        <Pencil size={10} className="text-gray-500" />
                    </button>
                </div>

                <div>
                    {mainTab === "profile" ? (
                        <>
                            <p className="text-xs text-primary font-medium">Hello</p>
                            <p className="text-lg font-bold text-gray-800">Rudaba jaman</p>
                        </>
                    ) : (
                        <>
                            <p className="text-base font-bold text-gray-800">Sarah Zhang</p>
                            <p className="text-xs font-semibold text-amber-500">Points: 115</p>
                            <p className="text-xs text-gray-500">Total Earned</p>
                        </>
                    )}
                </div>
            </div>

            <button className="text-sm font-medium text-primary hover:underline transition-colors">
                User Account
            </button>
        </div>
    );
}