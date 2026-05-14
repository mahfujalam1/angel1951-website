"use client";

import React from "react";
import Link from "next/link";
import {
  Truck,
  Wallet,
  CheckCircle,
  ArrowUpRight,
  Package,
  AlertCircle,
  CreditCard,
  ShieldCheck
} from "lucide-react";

const PersonalizedCargoDashboard = () => {
  const stats = [
    {
      title: "ONGOING CONTAINERS",
      value: "14",
      icon: <Truck className="text-blue-900" size={24} />,
      color: "bg-blue-50",
    },
    {
      title: "PENDING PAYMENTS",
      value: "$42,500",
      icon: <CreditCard className="text-orange-500" size={24} />,
      color: "bg-orange-50",
    },
    {
      title: "SAFE ARRIVALS",
      value: "128",
      icon: <ShieldCheck className="text-green-500" size={24} />,
      color: "bg-green-50",
    },
  ];

  const shipments = [
    {
      id: "PC-9921-Z3",
      route: "Guangzhou (CAN) → Manila (MNL)",
      status: "On Departure",
      payment: "1st Installment Paid",
      date: "Feb 12, 2026",
      statusColor: "text-blue-600 bg-blue-50",
    },
    {
      id: "PC-8842-B1",
      route: "Singapore (SIN) → Cebu (CEB)",
      status: "Arrived at Port",
      payment: "Awaiting 2nd Installment",
      date: "Feb 10, 2026",
      statusColor: "text-orange-600 bg-orange-50",
    },
    {
      id: "PC-7719-D8",
      route: "Tokyo (NRT) → Manila (MNL)",
      status: "Delivered",
      payment: "Fully Paid",
      date: "Feb 08, 2026",
      statusColor: "text-green-600 bg-green-50",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-10 animate-fadeIn">
      {/* Personalized Cargo Banner */}
      <div className="bg-[#18319b] rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-blue-200">
        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
             Premium Logistics
          </div>
          <h2 className="text-4xl font-black tracking-tight leading-none">
            Personalized Cargo <br/>Management Portal
          </h2>
          <p className="text-blue-100/70 text-sm font-medium leading-relaxed">
            Track your full container capacity shipments. Remember the strict 2-instalment rule: 
            Full payment must be verified after arrival for shipment release.
          </p>
        </div>
        <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
        <Truck className="absolute -right-10 -bottom-10 text-white/5 w-64 h-64 rotate-12" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all"
          >
            <div className="space-y-1">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                {stat.title}
              </p>
              <h2 className="text-3xl font-black text-gray-900 group-hover:text-blue-900 transition-colors">
                {stat.value}
              </h2>
            </div>
            <div className={`p-4 ${stat.color} rounded-2xl group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Shipments Table */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-10 py-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
          <div className="space-y-1">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">
              Live Container Tracking
            </h3>
            <p className="text-xs text-gray-400 font-medium">Monitoring shipments with installment verification</p>
          </div>
          <button className="px-6 py-3 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center gap-2">
            <AlertCircle size={14} className="text-orange-500" /> Payment Schedule
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] border-b border-gray-100 bg-gray-50/50">
                <th className="px-10 py-5">SHIPMENT ID</th>
                <th className="px-10 py-5">ROUTE / PORT</th>
                <th className="px-10 py-5">STATUS</th>
                <th className="px-10 py-5 text-right">PAYMENT STATE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {shipments.map((shipment, i) => (
                <tr
                  key={i}
                  className="hover:bg-blue-50/10 transition-colors group"
                >
                  <td className="px-10 py-6">
                    <span className="text-sm font-bold text-gray-900">
                      #{shipment.id}
                    </span>
                  </td>
                  <td className="px-10 py-6">
                    <div className="space-y-0.5">
                      <span className="text-sm text-gray-700 font-medium block">
                        {shipment.route}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        {shipment.date}
                      </span>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tight ${shipment.statusColor}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {shipment.status}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <span className={`text-[11px] font-black uppercase tracking-widest ${shipment.payment === 'Fully Paid' ? 'text-green-600' : 'text-slate-400'}`}>
                      {shipment.payment}
                    </span>
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

export default PersonalizedCargoDashboard;
