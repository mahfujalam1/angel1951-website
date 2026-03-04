import { referralHistory } from "@/constants/profile";
import { Pencil } from "lucide-react";

function ReferralStatusBadge({ status }: { status: string }) {
    const statusStyles: Record<string, { bg: string; text: string }> = {
        Active: { bg: "bg-green-100", text: "text-green-700" },
        Used: { bg: "bg-blue-100", text: "text-blue-700" },
        Reset: { bg: "bg-gray-100", text: "text-gray-700" },
    };
    
    const style = statusStyles[status] || { bg: "bg-gray-100", text: "text-gray-700" };
    
    return (
        <span className={`${style.bg} ${style.text} text-xs font-medium px-2.5 py-1 rounded-full`}>
            {status}
        </span>
    );
}

export default function ReferralHistory() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
                <Pencil size={16} className="text-primary" />
                <h2 className="text-base font-bold text-gray-800">Referral History</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="text-left text-xs font-semibold text-gray-500 px-3 py-2.5 rounded-l-lg">
                                Date
                            </th>
                            <th className="text-left text-xs font-semibold text-gray-500 px-3 py-2.5">
                                Activity
                            </th>
                            <th className="text-left text-xs font-semibold text-gray-500 px-3 py-2.5">
                                Points Status
                            </th>
                            <th className="text-left text-xs font-semibold text-gray-500 px-3 py-2.5 rounded-r-lg">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {referralHistory.map((row, i) => (
                            <tr
                                key={i}
                                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
                            >
                                <td className="px-3 py-3 text-gray-600 text-xs whitespace-nowrap">
                                    {row.date}
                                </td>
                                <td className="px-3 py-3 text-gray-700 text-xs">{row.activity}</td>
                                <td className="px-3 py-3 text-gray-700 text-xs font-medium">
                                    {row.points}
                                </td>
                                <td className="px-3 py-3">
                                    <ReferralStatusBadge status={row.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}