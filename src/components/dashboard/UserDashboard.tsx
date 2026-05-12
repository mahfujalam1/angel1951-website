"use client";

import React from "react";
import Link from "next/link";
import {
  Package,
  MapPin,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Search,
} from "lucide-react";

const UserDashboard = () => {
  const stats = [
    {
      title: "ONGOING PARCELS",
      value: "03",
      icon: <Package className="text-blue-600" size={24} />,
      color: "bg-blue-50",
    },
    {
      title: "SAVED ADDRESSES",
      value: "08",
      icon: <MapPin className="text-purple-600" size={24} />,
      color: "bg-purple-50",
    },
    {
      title: "DELIVERED TOTAL",
      value: "24",
      icon: <ShieldCheck className="text-green-600" size={24} />,
      color: "bg-green-50",
    },
  ];

  const recentParcels = [
    {
      id: "BN-2026-X1",
      destination: "London, UK",
      status: "In Transit",
      date: "Feb 10, 2026",
      statusColor: "text-blue-600 bg-blue-50",
    },
    {
      id: "BN-2026-A4",
      destination: "Lagos, Nigeria",
      status: "Delivered",
      date: "Feb 05, 2026",
      statusColor: "text-green-600 bg-green-50",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-10 animate-fadeIn">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-6 group hover:border-blue-200 transition-colors"
          >
            <div
              className={`p-4 ${stat.color} rounded-2xl group-hover:scale-110 transition-transform`}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                {stat.title}
              </p>
              <h2 className="text-2xl font-black text-gray-900">
                {stat.value}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/get-a-quote"
          className="p-8 bg-[#18319b] rounded-[2rem] text-white space-y-4 group relative overflow-hidden"
        >
          <h3 className="text-xl font-black uppercase tracking-tight relative z-10">
            Get A Quote
          </h3>
          <p className="text-blue-100 text-sm relative z-10 opacity-80">
            Send parcels globally with our premium logistics network.
          </p>
          <div className="absolute -right-4 -bottom-4 bg-white/10 p-8 rounded-full group-hover:scale-110 transition-transform">
            <ArrowUpRight size={40} />
          </div>
        </Link>
        <Link
          href="/status"
          className="p-8 bg-white border border-gray-100 rounded-[2rem] space-y-4 group relative overflow-hidden shadow-sm hover:shadow-xl transition-all"
        >
          <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight relative z-10">
            Track History
          </h3>
          <p className="text-gray-500 text-sm relative z-10">
            Monitor your past and ongoing shipments in real-time.
          </p>
          <div className="absolute -right-4 -bottom-4 bg-gray-50 p-8 rounded-full group-hover:scale-110 transition-transform">
            <Clock size={40} className="text-gray-300" />
          </div>
        </Link>
      </div>

      {/* Recent Parcels Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">
            Recent Shipments
          </h3>
          <Link
            href="/shipments"
            className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] border-b border-gray-100 bg-gray-50/30">
                <th className="px-8 py-4">PARCEL ID</th>
                <th className="px-8 py-4">DESTINATION</th>
                <th className="px-8 py-4 text-center">STATUS</th>
                <th className="px-8 py-4 text-right">DATE</th>
                <th className="px-8 py-4 text-right">DETAILS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentParcels.map((parcel, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-8 py-5 text-sm font-bold text-gray-900">
                    #{parcel.id}
                  </td>
                  <td className="px-8 py-5 text-sm text-gray-600">
                    {parcel.destination}
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${parcel.statusColor}`}
                    >
                      {parcel.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right text-sm text-gray-400">
                    {parcel.date}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <Link
                      href={`/shipments/${parcel.id}`}
                      className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all group-hover:scale-110"
                    >
                      <ArrowUpRight size={18} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
