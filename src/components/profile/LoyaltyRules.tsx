import { bonusRules } from "@/constants/profile";
import { CheckCircle2 } from "lucide-react";

export default function LoyaltyRules() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-bold text-gray-800 mb-3">Loyalty Referral History</h2>

            <ul className="flex flex-col gap-2">
                {bonusRules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                        <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
                        {rule}
                    </li>
                ))}
            </ul>
        </div>
    );
}