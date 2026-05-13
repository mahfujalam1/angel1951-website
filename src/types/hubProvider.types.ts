export interface Parcel {
  id: string;
  reference: string;
  status: "Awaiting Pickup" | "Handed Over" | "Ready for Pickup" | "Delivered" | "Return";
  paymentStatus: "Paid" | "Unpaid";
  amount: number; // in local currency
  date: string; // ISO date string
  description?: string;
}

export type ParcelStatus =
  | "Awaiting Pickup"
  | "Handed Over"
  | "Ready for Pickup"
  | "Delivered"
  | "Return";

export interface AnalyticsRow {
  month: string; // e.g. "2026-05"
  deliveredCount: number;
  paidCount: number;
  unpaidCount: number;
  revenue: number; // sum of paid amounts
}

export interface HubProviderFormData {
  shopName: string;
  businessTypes: string[];
  fullAddress: string;
  landmark: string;
  cityState: string;
  shopContact: string;
  shopEmail: string;
  ownerName: string;
  ownerEmail: string;
  preferredContact: string[];
  workingDays: string[];
  operatingFrom: string;
  operatingTo: string;
  staffMin: string;
  staffMax: string;
  cctvAvailable: "Yes" | "No";
  footTraffic: string;
  handledDelivery: "Yes" | "No";
  willingToCommit: "Yes" | "No";
  comments: string;
  imagePreviews: string[];
}
