"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getParcels, updateParcelStatus } from "@/lib/api/hubProvider";
import { Parcel, ParcelStatus } from "@/types/hubProvider.types";
import { Search, Eye, MoreVertical, Loader2, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

export default function HubInventoryPage() {
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [filterStatus, setFilterStatus] = useState<ParcelStatus | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getParcels();
      setParcels(data);
    } catch (err) {
      toast.error("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: ParcelStatus) => {
    setUpdatingId(id);
    try {
      await updateParcelStatus(id, newStatus);
      toast.success(`Status updated to ${newStatus}`);
      await loadData();
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredParcels = parcels.filter((p) => {
    const matchesStatus = filterStatus === "All" || p.status === filterStatus;
    const matchesSearch =
      p.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statuses: (ParcelStatus | "All")[] = [
    "All",
    "Awaiting Pickup",
    "Handed Over",
  ];

  const getStatusColor = (status: ParcelStatus) => {
    switch (status) {
      case "Awaiting Pickup":
        return "bg-yellow-100 text-yellow-700";
      case "Handed Over":
        return "bg-green-100 text-green-700";
      case "Ready for Pickup":
        return "bg-blue-100 text-blue-700";
      case "Delivered":
        return "bg-primary-100 text-primary-700";
      case "Return":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto py-10 px-6 animate-fadeIn min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Inventory Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Track and manage all parcels in your hub facility.
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filterStatus === s
                  ? "bg-[#18319b] text-white shadow-md shadow-blue-100"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-72">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search reference or desc..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#18319b] focus:ring-4 focus:ring-[#18319b]/5 transition-all"
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Reference
                </th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">
                  Status
                </th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center">
                    <Loader2
                      className="animate-spin mx-auto text-gray-300"
                      size={32}
                    />
                  </td>
                </tr>
              ) : filteredParcels.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center">
                    <p className="text-gray-400 text-sm">
                      No parcels found matches your filters.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredParcels.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <span className="text-sm font-bold text-gray-900">
                        {p.reference}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-600 truncate block max-w-[200px]">
                        {p.description || "No description provided"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {new Date(p.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-sm font-bold text-[#18319b]">
                      ₱{p.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`text-[10px] font-black px-2.5 py-1.5 rounded-full uppercase ${getStatusColor(p.status)}`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        {p.status === "Awaiting Pickup" ? (
                          <div className="relative group">
                            <select
                              value={p.status}
                              disabled={updatingId === p.id}
                              onChange={(e) =>
                                handleStatusChange(
                                  p.id,
                                  e.target.value as ParcelStatus,
                                )
                              }
                              className="text-[11px] font-bold bg-[#18319b] text-white px-3 py-1.5 rounded-md focus:outline-none cursor-pointer appearance-none pr-8 disabled:opacity-50"
                            >
                              <option value="Awaiting Pickup">
                                Awaiting Pickup
                              </option>
                              <option value="Handed Over">Hand Over</option>
                            </select>
                            <ChevronDown
                              size={12}
                              className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-white/70"
                            />
                          </div>
                        ) : (
                          <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100">
                            Read Only
                          </span>
                        )}

                        <Link
                          href={`/hub-dashboard/inventory/${p.id}`}
                          className="p-2 text-gray-400 hover:text-[#18319b] hover:bg-blue-50 rounded-lg transition-all"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
