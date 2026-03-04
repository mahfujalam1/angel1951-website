import { Gift } from "lucide-react";
import LoyaltyCard from "./LoyaltyCard";
import ReferralProgram from "./ReferralProgram";
import LoyaltyRules from "./LoyaltyRules";
import ReferralHistory from "./ReferralHistory";

export default function BonusTab() {
    return (
        <div className="flex flex-col gap-5">
            {/* Loyalty & Bonus */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                    <Gift size={18} className="text-primary" />
                    <h2 className="text-base font-bold text-gray-800">Loyalty & Bonus</h2>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <LoyaltyCard label="Air Cargo" current={3} total={5} reward="Get 10% Discount" />
                    <LoyaltyCard label="Sea Cargo" current={3} total={5} reward="Free Shipment" />
                </div>
            </div>

            <ReferralProgram />
            <ReferralHistory />
            <LoyaltyRules />
        </div>
    );
}