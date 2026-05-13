"use client";

import React, { useState } from "react";
import {
  Search,
  ArrowUpRight,
  X,
  CheckCircle2,
  CreditCard,
  Gift,
  Tag,
  Package,
  Calendar,
  Download,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const InvoicesPage = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const router = useRouter();

  // Mock data
  const invoices = [
    { 
      id: "INV-2026-00123",
      invoiceNo: "INV-2026-00123", 
      amount: 125.5,
      service: "Air Cargo", 
      trackingId: "BN-782134",
      date: "May 1, 2026", 
      status: "PAID",
    },
    { 
      id: "INV-2026-00124",
      invoiceNo: "INV-2026-00124", 
      amount: 450.0,
      service: "Sea Freight", 
      trackingId: "BN-782135",
      date: "May 10, 2026", 
      status: "PENDING",
    },
    { 
      id: "INV-2026-00125",
      invoiceNo: "INV-2026-00125", 
      amount: 210.0,
      service: "Local Delivery", 
      trackingId: "BN-782136",
      date: "May 12, 2026", 
      status: "PAID",
    },
  ];

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv.invoiceNo.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "All" || inv.status === filterStatus.toUpperCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 space-y-8 animate-fadeIn min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">
            Invoice Management
          </h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">
            Manage your individual shipment invoices and payment history.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex bg-gray-100 p-1 rounded-xl shadow-inner">
            {["All", "Pending", "Paid"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-5 py-2 text-[10px] font-black rounded-lg transition-all uppercase tracking-widest ${
                  filterStatus === status
                    ? "bg-white text-[#18319b] shadow-sm"
                    : "text-gray-500 hover:bg-gray-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"
          size={20}
        />
        <input
          type="text"
          placeholder="Search invoices by number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-400 transition-all shadow-sm"
        />
      </div>

      {/* Invoice Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] border-b border-gray-100 bg-gray-50/30">
                <th className="px-8 py-5">Invoice Number</th>
                <th className="px-8 py-5">Shipment Type</th>
                <th className="px-8 py-5">Tracking ID</th>
                <th className="px-8 py-5">Amount</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5 text-center">Status</th>
                <th className="px-8 py-5 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredInvoices.map((inv, i) => (
                <tr
                  key={i}
                  className="hover:bg-blue-50/20 transition-colors group"
                >
                  <td className="px-8 py-6">
                    <span className="text-sm font-bold text-gray-900">
                      {inv.invoiceNo}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span
                      className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight ${
                        inv.service === "Container"
                          ? "bg-purple-50 text-purple-600"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {inv.service}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm text-gray-600 font-bold">
                      {inv.trackingId}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-[#18319b]">
                      ${inv.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm text-gray-500 font-medium">
                      {inv.date}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        inv.status === "PAID"
                          ? "bg-green-500 text-white shadow-lg shadow-green-100"
                          : "bg-orange-500 text-white shadow-lg shadow-orange-100"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <Link
                      href={`/invoices/${inv.id}`}
                      className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-[#18319b] hover:bg-blue-50 rounded-lg transition-all group-hover:scale-110"
                    >
                      <ArrowUpRight size={20} />
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-20 text-center text-gray-400 font-medium italic">
                    No invoices found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvoicesPage;
