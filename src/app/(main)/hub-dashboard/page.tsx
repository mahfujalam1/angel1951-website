"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Clock,
  Package,
  Truck,
  Banknote,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { getParcels, updateParcelStatus } from "@/lib/api/hubProvider";
import { Parcel } from "@/types/hubProvider.types";
import toast from "react-hot-toast";

export default function HubDashboardPage() {
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getParcels();
      setParcels(data);
    } catch (err) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusUpdate = async (id: string, status: Parcel["status"]) => {
    // Optimistically update local state
    setParcels((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status,
              date:
                status === "Handed Over" ? new Date().toISOString() : p.date,
            }
          : p,
      ),
    );

    setProcessingId(id);
    try {
      await updateParcelStatus(id, status);
      toast.success(`Parcel updated to ${status}`);
      await loadData();
    } catch (err) {
      toast.error("Update failed");
      await loadData();
    } finally {
      setProcessingId(null);
    }
  };

  // Stats calculation
  const awaitingIntake = parcels.filter(
    (p) => p.status === "Awaiting Pickup",
  ).length;
  const readyForPickup = parcels.filter(
    (p) => p.status === "Ready for Pickup",
  ).length;

  const handedOverToday = parcels.filter((p) => {
    const isHandedOver = p.status === "Handed Over";
    const isToday =
      new Date(p.date).toDateString() === new Date().toDateString();
    return isHandedOver && isToday;
  }).length;

  const totalEarnings = parcels
    .filter((p) => p.status === "Delivered" && p.paymentStatus === "Paid")
    .reduce((sum, p) => sum + p.amount, 0);

  // Table Data - Show parcels that are either awaiting pickup or ready for pickup
  // As per prompt: "awaiting for pickup remove this card" -> once it's Handed Over it should leave this view
  const activeParcels = parcels.filter(
    (p) => p.status === "Awaiting Pickup" || p.status === "Ready for Pickup",
  );

  const getStatusStyle = (status: Parcel["status"]) => {
    switch (status) {
      case "Awaiting Pickup":
        return "bg-yellow-100 text-yellow-700";
      case "Ready for Pickup":
        return "bg-blue-100 text-blue-700";
      case "Handed Over":
        return "bg-green-100 text-green-700";
      case "Return":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto py-10 px-6 animate-fadeIn min-h-screen">
      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[11px] font-bold text-gray-500 tracking-wider uppercase">
              Awaiting for Pickup
            </h3>
            <Clock size={18} className="text-red-500" />
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-semibold text-gray-900">
              {awaitingIntake}
            </span>
            {awaitingIntake > 0 && (
              <span className="text-sm font-semibold text-red-500">
                +{awaitingIntake} new
              </span>
            )}
          </div>
        </div>

        {/* Card 2 - Handed over today (Previously Card 3) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[11px] font-bold text-gray-500 tracking-wider uppercase">
              Handed over today
            </h3>
            <Truck size={18} className="text-gray-600" />
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-semibold text-gray-900">
              {handedOverToday}
            </span>
            <span className="text-sm text-gray-500">Real-time</span>
          </div>
        </div>

        {/* Card 3 - Total earnings (Previously Card 4) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[11px] font-bold text-gray-500 tracking-wider uppercase">
              Total earnings
            </h3>
            <Banknote size={18} className="text-[#18319b]" />
          </div>
          <div>
            <span className="text-3xl font-semibold text-gray-900">
              ₱{totalEarnings.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Table Header area */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900">Active Shipments</h2>
        <Link
          href="/hub-dashboard/inventory"
          className="flex items-center gap-1 text-sm font-bold text-[#18319b] hover:underline transition-colors"
        >
          View inventory <ArrowRight size={16} />
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-gray-300" size={32} />
          </div>
        ) : activeParcels.length === 0 ? (
          <div className="py-20 text-center">
            <Package size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-500">No active parcels to process.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Intake #
                  </th>
                  <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">
                    Status
                  </th>
                  <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-right">
                    Shift to branch
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {activeParcels.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-5 px-6">
                      <span className="text-sm font-bold text-gray-900">
                        {row.reference}
                      </span>
                    </td>
                    <td className="py-5 px-6">
                      <span className="text-sm text-gray-700 truncate max-w-[200px] block">
                        {row.description ? row.description : "No description"}
                      </span>
                    </td>
                    <td className="py-5 px-6">
                      <span className="text-sm text-gray-500">
                        {new Date(row.date).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-center">
                      <span
                        className={`text-[11px] font-bold px-3 py-1.5 rounded-full ${getStatusStyle(row.status)}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-right">
                      {row.status === "Awaiting Pickup" ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() =>
                              handleStatusUpdate(row.id, "Cancelled")
                            }
                            disabled={processingId === row.id}
                            className="w-10 h-7 flex items-center justify-center rounded-md bg-red-500 text-white text-[10px] font-bold hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-50"
                          >
                            No
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(row.id, "Handed Over")
                            }
                            disabled={processingId === row.id}
                            className="w-10 h-7 flex items-center justify-center rounded-md bg-green-500 text-white text-[10px] font-bold hover:bg-green-600 transition-colors cursor-pointer disabled:opacity-50"
                          >
                            Yes
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100">
                          Locked
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
