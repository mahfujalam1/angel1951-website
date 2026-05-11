import { Parcel, AnalyticsRow } from '@/types/hubProvider.types';

// In‑memory store (will reset on server restart)
let parcels: Parcel[] = [];

/** Seed some example parcels for demo purposes */
export const seedParcels = () => {
  if (parcels.length) return;
  const now = new Date();
  for (let i = 1; i <= 12; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - (i % 3), 5 + i);
    parcels.push({
      id: `P${i}`,
      reference: `TRK${1000 + i}`,
      status: 'Awaiting Pickup',
      paymentStatus: 'Unpaid',
      amount: 120 + i * 15,
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
  newStatus: Parcel['status']
): Promise<Parcel> => {
  const idx = parcels.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error('Parcel not found');
  parcels[idx] = { ...parcels[idx], status: newStatus };
  return parcels[idx];
};

/** Get analytics for a specific month/year */
export const getAnalytics = async (
  month: number,
  year: number
): Promise<AnalyticsRow> => {
  const filtered = parcels.filter((p) => {
    const d = new Date(p.date);
    return d.getMonth() + 1 === month && d.getFullYear() === year && p.status === 'Delivered';
  });
  const paid = filtered.filter((p) => p.paymentStatus === 'Paid');
  const unpaid = filtered.filter((p) => p.paymentStatus === 'Unpaid');
  const revenue = paid.reduce((sum, p) => sum + p.amount, 0);
  return {
    month: `${year}-${String(month).padStart(2, '0')}`,
    deliveredCount: filtered.length,
    paidCount: paid.length,
    unpaidCount: unpaid.length,
    revenue,
  };
};

/** Admin marks a month as paid – sets paymentStatus of all delivered parcels in that month to Paid */
export const markMonthPaid = async (month: number, year: number): Promise<void> => {
  parcels = parcels.map((p) => {
    const d = new Date(p.date);
    if (d.getMonth() + 1 === month && d.getFullYear() === year && p.status === 'Delivered') {
      return { ...p, paymentStatus: 'Paid' };
    }
    return p;
  });
};

/** Add a new parcel to the store */
export const addParcelToStore = async (data: Partial<Parcel>): Promise<Parcel> => {
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
  return parcels.find(p => p.id === id) || null;
};
