"use client";

import { Users, Gift, UserPlus } from "lucide-react";

export default function ReferralProgram() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
                <Users size={18} className="text-primary" />
                <h2 className="text-base font-bold text-gray-800">Referral Program</h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                {/* Available Bonus */}
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 sm:w-52 shrink-0">
                    <p className="text-sm text-gray-600 mb-1">
                        Avail Able Bonus:{" "}
                        <span className="font-bold text-amber-600">45</span>
                    </p>
                    <div className="h-px bg-amber-100 my-2" />
                    <p className="text-xs text-gray-500">5 Pending Bonus</p>
                    <p className="text-xs text-gray-500">20 (Total Earned)</p>
                </div>

                {/* Stats + CTA */}
                <div className="flex-1 flex flex-col justify-between gap-3">
                    <div className="grid grid-cols-3 gap-2 text-center">
                        {[
                            { icon: <Users size={14} />, label: "Total Referrals", value: "12" },
                            { icon: <Gift size={14} />, label: "Successful", value: "08" },
                            { icon: <Gift size={14} />, label: "Rewards Earned", value: "08" },
                        ].map(({ icon, label, value }) => (
                            <div key={label} className="bg-gray-50 rounded-lg p-2.5">
                                <div className="flex items-center justify-center gap-1 text-primary mb-1">
                                    {icon}
                                </div>
                                <p className="text-lg font-bold text-gray-800">{value}</p>
                                <p className="text-xs text-gray-500 leading-tight">{label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <button className="bg-primary text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:opacity-90 active:scale-95 transition-all shadow-sm inline-flex items-center gap-2">
                            <UserPlus size={14} />
                            Refer a friend and earn bonus
                        </button>
                        <p className="text-xs text-gray-400 mt-1.5">
                            + point earned per successful referral
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}