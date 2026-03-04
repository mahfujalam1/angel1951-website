export type MainTab = "profile" | "bonus";
export type ProfileSubTab = "edit" | "password";

export interface ReferralHistoryItem {
    date: string;
    activity: string;
    points: string;
    status: "Reset" | "Used" | "Active";
}