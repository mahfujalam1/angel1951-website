import { Parcel, AnalyticsRow } from "@/types/hubProvider.types";

// In‑memory store (will reset on server restart)
let parcels: Parcel[] = [];

/** Seed some example parcels for demo purposes */
export const seedParcels = () => {
  if (parcels.length) return;
  const now = new Date();

  // Seed a variety of parcels for different statuses and months
  for (let i = 1; i <= 60; i++) {
    // Distribute parcels over the last 6 months
    const monthOffset = i % 6;
    const day = ((i * 7) % 28) + 1;
    const date = new Date(now.getFullYear(), now.getMonth() - monthOffset, day);

    // Cycle through statuses - ensure some are Delivered for analytics
    let status: Parcel["status"] = "Awaiting Pickup";
    if (i % 4 === 0) status = "Delivered";
    else if (i % 4 === 1) status = "Handed Over";
    else if (i % 4 === 2) status = "Return";

    // Cycle through payment statuses
    let paymentStatus: Parcel["paymentStatus"] = "Unpaid";
    if (status === "Delivered" && i % 2 === 0) paymentStatus = "Paid";
    if (status === "Handed Over" && i % 3 === 0) paymentStatus = "Paid";

    parcels.push({
      id: `P${i}`,
      reference: `TRK${1000 + i}`,
      status,
      paymentStatus,
      amount: 150 + i * 10,
      date: date.toISOString(),
    });
  }
};

/** Get all parcels */
export const getParcels = async (): Promise<Parcel[]> => {
  seedParcels();
  // Return a copy to avoid external mutation
  return [...parcels];
};

/** Update status of a parcel (and optionally payment status) */
export const updateParcelStatus = async (
  id: string,
  newStatus: Parcel["status"],
): Promise<Parcel> => {
  const idx = parcels.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error("Parcel not found");
  parcels[idx] = {
    ...parcels[idx],
    status: newStatus,
    date:
      newStatus === "Handed Over"
        ? new Date().toISOString()
        : parcels[idx].date,
  };
  return parcels[idx];
};

/** Get analytics for a specific month/year */
export const getAnalytics = async (
  month: number,
  year: number,
): Promise<AnalyticsRow> => {
  const filtered = parcels.filter((p) => {
    const d = new Date(p.date);
    return (
      d.getMonth() + 1 === month &&
      d.getFullYear() === year &&
      p.status === "Delivered"
    );
  });
  const paid = filtered.filter((p) => p.paymentStatus === "Paid");
  const unpaid = filtered.filter((p) => p.paymentStatus === "Unpaid");
  const revenue = paid.reduce((sum, p) => sum + p.amount, 0);
  return {
    month: `${year}-${String(month).padStart(2, "0")}`,
    deliveredCount: filtered.length,
    paidCount: paid.length,
    unpaidCount: unpaid.length,
    revenue,
  };
};

/** Get analytics trend for the last 6 months */
export const getAnalyticsTrend = async (): Promise<AnalyticsRow[]> => {
  seedParcels();
  const now = new Date();
  const trend: AnalyticsRow[] = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const m = d.getMonth() + 1;
    const y = d.getFullYear();
    const row = await getAnalytics(m, y);
    trend.push(row);
  }

  return trend;
};

/** Admin marks a month as paid – sets paymentStatus of all delivered parcels in that month to Paid */
export const markMonthPaid = async (
  month: number,
  year: number,
): Promise<void> => {
  parcels = parcels.map((p) => {
    const d = new Date(p.date);
    if (
      d.getMonth() + 1 === month &&
      d.getFullYear() === year &&
      p.status === "Delivered"
    ) {
      return { ...p, paymentStatus: "Paid" };
    }
    return p;
  });
};

/** Add a new parcel to the store */
export const addParcelToStore = async (
  data: Partial<Parcel>,
): Promise<Parcel> => {
  const newParcel: Parcel = {
    id: `P${parcels.length + 1}`,
    reference: data.reference || `REF${1000 + parcels.length + 1}`,
    status: data.status || "Awaiting Pickup",
    paymentStatus: "Unpaid",
    amount: data.amount || 150,
    date: data.date || new Date().toISOString(),
    description: data.description || "",
  };
  parcels.push(newParcel);
  return newParcel;
};

/** Get a single parcel by ID */
export const getParcelById = async (id: string): Promise<Parcel | null> => {
  seedParcels();
  return parcels.find((p) => p.id === id) || null;
};
