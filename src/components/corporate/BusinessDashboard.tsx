"use client";

import React from "react";
import Link from "next/link";
import {
  Truck,
  Wallet,
  CheckCircle,
  ArrowUpRight,
  Package,
  Award,
} from "lucide-react";

const BusinessDashboard = () => {
  const stats = [
    {
      title: "ACTIVE SHIPMENTS",
      value: "1,284",
      change: "+12%",
      icon: <Truck className="text-blue-900" size={24} />,
      progress: 60,
      color: "bg-blue-900",
    },
    {
      title: "PENDING INVOICES",
      value: "$42,900",
      status: "In Review",
      icon: <Wallet className="text-orange-500" size={24} />,
      progress: 40,
      color: "bg-orange-500",
    },
    {
      title: "DELIVERED SHIPMENTS",
      value: "8,432",
      badge: "Real-time",
      icon: <CheckCircle className="text-green-500" size={24} />,
      today: "+24 today",
      color: "bg-green-500",
    },
  ];

  const recentShipments = [
    {
      id: "LG-9021-X3",
      route: "Berlin (BER) → Tokyo (NRT)",
      status: "In Transit",
      date: "Oct 24, 2023",
      statusColor: "text-blue-600 bg-blue-50",
    },
    {
      id: "LG-8842-A1",
      route: "San Francisco (SFO) → London (LHR)",
      status: "Draft",
      date: "Oct 22, 2023",
      statusColor: "text-gray-600 bg-gray-100",
    },
    {
      id: "LG-7719-C8",
      route: "Dubai (DXB) → Mumbai (BOM)",
      status: "Delivered",
      date: "Oct 23, 2023",
      statusColor: "text-green-600 bg-green-50",
    },
    {
      id: "LG-6650-M4",
      route: "Singapore (SIN) → Sydney (SYD)",
      status: "Delayed",
      date: "Oct 21, 2023",
      statusColor: "text-orange-600 bg-orange-50",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-10 animate-fadeIn">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-1">
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                  {stat.title}
                </p>
                <h2 className="text-3xl font-black text-gray-900">
                  {stat.value}
                </h2>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Rewards Banner */}
      <div className="bg-[#0081C9] rounded-2xl p-8 text-white relative overflow-hidden group shadow-lg shadow-blue-200">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Award size={24} className="text-white" />
              <h3 className="text-sm font-black uppercase tracking-[0.2em]">
                LOGISYS REWARDS
              </h3>
            </div>
            <p className="text-blue-50 text-sm max-w-md">
              You have accumulated 14,250 points. Unlock premium customs
              clearance and priority scheduling now.
            </p>
          </div>
          <Link
            href="/profile/reward"
            className="px-8 py-3 bg-white text-[#0081C9] font-black text-sm rounded-xl hover:bg-blue-50 transition-all shadow-sm"
          >
            Redeem Points
          </Link>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
      </div>

      {/* Recent Shipments Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">
            Recent Shipments
          </h3>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Package size={18} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] border-b border-gray-100 bg-gray-50/30">
                <th className="px-8 py-4">TRACKING ID</th>
                <th className="px-8 py-4">ROUTE</th>
                <th className="px-8 py-4 text-center">STATUS</th>
                <th className="px-8 py-4 text-right">DATE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentShipments.map((shipment, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-8 py-5">
                    <span className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      #{shipment.id}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm text-gray-600">
                      {shipment.route}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${shipment.statusColor}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {shipment.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className="text-sm text-gray-400 font-medium">
                      {shipment.date}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-4 border-t border-gray-50 flex justify-end bg-gray-50/10">
          <Link
            href="/shipments"
            className="text-[11px] font-black text-[#18319b] uppercase tracking-widest hover:underline flex items-center gap-1 group"
          >
            View All Shipments{" "}
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
