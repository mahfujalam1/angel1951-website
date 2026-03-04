import { ReferralHistoryItem } from "@/types/referralHistory.types";


export const referralHistory: ReferralHistoryItem[] = [
    { date: "Feb 15", activity: "Air Cargo Shipment +1", points: "+1", status: "Reset" },
    { date: "Feb 16", activity: "Free Shipment Reward +1", points: "13", status: "Used" },
    { date: "Feb 17", activity: "Air Cargo Shipment +1", points: "15", status: "Active" },
    { date: "Feb 18", activity: "Sea Cargo Shipment +1", points: "+1", status: "Active" },
    { date: "Feb 19", activity: "Referral Signup", points: "+1", status: "Active" },
];

export const bonusRules: string[] = [
    "Points reset after reward is used",
    "Loyalty rewards auto applied at checkout",
    "10% discount applies to one air cargo shipment",
    "Free shipment applies to one sea cargo shipment",
];