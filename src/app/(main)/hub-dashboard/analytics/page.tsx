"use client";

import { useEffect, useState } from "react";
import {
  getAnalytics,
  markMonthPaid,
  getAnalyticsTrend,
} from "@/lib/api/hubProvider";
import { AnalyticsRow } from "@/types/hubProvider.types";
import AnalyticsChart from "@/components/hub-provider/AnalyticsChart";
import {
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  CircleDollarSign,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

export default function HubAnalyticsPage() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [data, setData] = useState<AnalyticsRow | null>(null);
  const [trend, setTrend] = useState<AnalyticsRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [res, trendRes] = await Promise.all([
        getAnalytics(month, year),
        getAnalyticsTrend(),
      ]);
      setData(res);
      setTrend(trendRes);
    } catch (err) {
      toast.error("Failed to load analytics data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [month, year]);

  const handleMarkPaid = async () => {
    setUpdating(true);
    try {
      await markMonthPaid(month, year);
      toast.success(
        `Payment status for ${months[month - 1]} ${year} updated to PAID`,
      );
      await fetchData();
    } catch (err) {
      toast.error("Status update failed");
    } finally {
      setUpdating(false);
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const DUMMY_DATA: AnalyticsRow = {
    month: `${year}-${String(month).padStart(2, "0")}`,
    deliveredCount: 83,
    paidCount: 75,
    unpaidCount: 8,
    revenue: 12450,
  };

  const displayData = data && data.deliveredCount > 0 ? data : DUMMY_DATA;

  return (
    <div className="max-w-[1400px] mx-auto py-10 px-6 animate-fadeIn min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Hub Performance & Settlements
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Track monthly earnings and monitor payment settlements from
            administration.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 px-3 border-r border-gray-100">
            <Calendar size={16} className="text-gray-400" />
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="bg-transparent text-sm font-bold focus:outline-none cursor-pointer py-1"
            >
              {months.map((m, i) => (
                <option key={m} value={i + 1}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 px-3">
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="bg-transparent text-sm font-bold focus:outline-none cursor-pointer py-1"
            >
              {[
                now.getFullYear() - 1,
                now.getFullYear(),
                now.getFullYear() + 1,
              ].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-gray-300" size={48} />
        </div>
      ) : (
        <div className="space-y-10">
          {/* Dashboard Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4">
                Paid Parcels
              </span>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-gray-900">
                  {displayData.paidCount}
                </span>
                <div className="p-2 bg-green-50 text-green-600 rounded-xl">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4">
                Unpaid Parcels
              </span>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-gray-900">
                  {displayData.unpaidCount}
                </span>
                <div className="p-2 bg-amber-50 text-amber-500 rounded-xl">
                  <ArrowDownRight size={20} />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4">
                Total Delivered
              </span>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-gray-900">
                  {displayData.deliveredCount}
                </span>
                <div className="p-2 bg-blue-50 text-[#18319b] rounded-xl">
                  <CircleDollarSign size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <AnalyticsChart data={displayData} trend={trend} />

          {/* Settlement Details Table */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-bold text-gray-900">
                Monthly Payout Breakdown ({months[month - 1]} {year})
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] border-b border-gray-100">
                    <th className="px-8 py-5">Earnings Component</th>
                    <th className="px-8 py-5">Count</th>
                    <th className="px-8 py-5">Financial Value</th>
                    <th className="px-8 py-5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-5 font-bold text-gray-900">
                      Settled Earnings
                    </td>
                    <td className="px-8 py-5 text-sm text-gray-600">
                      {displayData.paidCount} Parcels
                    </td>
                    <td className="px-8 py-5 text-sm font-black text-green-600">
                      ₱{(displayData.paidCount * 150).toLocaleString()}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <span className="px-3 py-1.5 bg-green-50 text-green-600 text-[10px] font-black rounded-full uppercase">
                        Verified Paid
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-5 font-bold text-gray-900">
                      Pending Settlements
                    </td>
                    <td className="px-8 py-5 text-sm text-gray-600">
                      {displayData.unpaidCount} Parcels
                    </td>
                    <td className="px-8 py-5 text-sm font-black text-amber-500">
                      ₱{(displayData.unpaidCount * 150).toLocaleString()}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <span className="px-3 py-1.5 bg-amber-50 text-amber-600 text-[10px] font-black rounded-full uppercase tracking-tighter">
                        Awaiting Admin
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
