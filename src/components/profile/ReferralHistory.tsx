"use client";

import { referralHistory } from "@/constants/profile";
import { useRouter } from "next/navigation";
import { History, ArrowRight } from "lucide-react";

function ReferralStatusBadge({ status }: { status: string }) {
    const statusStyles: Record<string, { bg: string; text: string }> = {
        Active: { bg: "bg-green-100", text: "text-green-700" },
        Used: { bg: "bg-blue-100", text: "text-blue-700" },
        Reset: { bg: "bg-gray-100", text: "text-gray-700" },
    };
    const style = statusStyles[status] || { bg: "bg-gray-100", text: "text-gray-700" };
    return (
        <span className={`${style.bg} ${style.text} text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tight`}>
            {status}
        </span>
    );
}

export default function ReferralHistory() {
    const router = useRouter();

    const handleRowClick = (item: any) => {
        const params = new URLSearchParams({
            date: item.date,
            activity: item.activity,
            points: item.points,
            status: item.status
        });
        router.push(`/profile/referral-details?${params.toString()}`);
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
                <History size={16} className="text-primary" />
                <h2 className="text-base font-bold text-gray-800 font-sans tracking-tight">Referral History</h2>
            </div>

            <div className="overflow-x-auto -mx-5 sm:mx-0">
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="bg-gray-50/80 border-y border-gray-50 text-[10px] uppercase tracking-widest font-bold text-gray-400">
                            <th className="text-left px-5 py-3">Date</th>
                            <th className="text-left px-5 py-3">Activity</th>
                            <th className="text-left px-5 py-3">Points</th>
                            <th className="text-left px-5 py-3">Status</th>
                            <th className="text-right px-5 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {referralHistory.map((row, i) => (
                            <tr 
                                key={i} 
                                onClick={() => handleRowClick(row)}
                                className="hover:bg-gray-50 transition-all cursor-pointer group border-b border-gray-50 last:border-0"
                            >
                                <td className="px-5 py-4 text-gray-600 text-[13px] font-medium whitespace-nowrap font-sans">
                                    {row.date}
                                </td>
                                <td className="px-5 py-4">
                                    <p className="text-[13px] font-semibold text-gray-800 font-sans">{row.activity}</p>
                                </td>
                                <td className="px-5 py-4 text-[13px] font-bold text-primary font-sans">
                                    {row.points}
                                </td>
                                <td className="px-5 py-4">
                                    <ReferralStatusBadge status={row.status} />
                                </td>
                                <td className="px-5 py-4 text-right">
                                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-all" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
