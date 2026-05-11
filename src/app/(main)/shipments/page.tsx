"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const ShipmentsPage = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [userRole, setUserRole] = useState<string | null>(null);

  React.useEffect(() => {
    setUserRole(localStorage.getItem("role"));
  }, []);

  const shipments = [
    {
      orderNo: "#1258415256",
      route: "Berlin (BER) → Tokyo (NRT)",
      receiver: "6391 Elgin St. Celina, Delaware 10299",
      phone: "(208) 555-0112",
      status: "Shipment Created",
      statusColor: "bg-orange-50 text-orange-600",
      date: "Oct 24, 2023",
    },
    {
      orderNo: "#1258415257",
      route: "San Francisco (SFO) → London (LHR)",
      receiver: "3517 W. Gray St. Utica, Pennsylvania 57867",
      phone: "(671) 555-0110",
      status: "At Hub",
      statusColor: "bg-green-50 text-green-600",
      date: "Oct 22, 2023",
    },
    {
      orderNo: "#1258415258",
      route: "Dubai (DXB) → Mumbai (BOM)",
      receiver: "4140 Parker Rd. Allentown, New Mexico 31134",
      phone: "(205) 555-0100",
      status: "In Transit",
      statusColor: "bg-blue-50 text-blue-600",
      date: "Oct 23, 2023",
    },
    {
      orderNo: "#1258415259",
      route: "Richardson (CA) → Allentown (NM)",
      receiver: "3891 Ranchview Dr. Richardson, California 62639",
      phone: "(319) 555-0115",
      status: "Custom Processing",
      statusColor: "bg-purple-50 text-purple-600",
      date: "Oct 22, 2023",
    },
    {
      orderNo: "#1258415260",
      route: "Santa Ana (IL) → Chicago (IL)",
      receiver: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
      phone: "(303) 555-0105",
      status: "Out of Delivery",
      statusColor: "bg-gray-50 text-gray-600",
      date: "Oct 21, 2023",
    },
    {
      orderNo: "#1258415261",
      route: "San Jose (SC) → Maine (ME)",
      receiver: "8502 Preston Rd. Inglewood, Maine 98380",
      phone: "(480) 555-0103",
      status: "Delivered",
      statusColor: "bg-yellow-50 text-yellow-600",
      date: "Oct 20, 2023",
    },
  ];

  const statuses = [
    "All",
    "Shipment Created",
    "At Hub",
    "In Transit",
    "Custom Processing",
    "Out of Delivery",
    "Delivered",
  ];

  const filteredShipments = shipments.filter((s) => {
    const matchesSearch =
      s.orderNo.toLowerCase().includes(search.toLowerCase()) ||
      s.receiver.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "All" || s.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-[1600px] mx-auto py-10 px-6 space-y-8 animate-fadeIn min-h-screen">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">
            Shipment Management
          </h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">
            Track and monitor your business shipments globally.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${
                  filterStatus === s
                    ? "bg-[#18319b] text-white border-[#18319b] shadow-lg shadow-blue-100"
                    : "bg-white text-gray-400 border-gray-100 hover:border-gray-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="relative flex-1 sm:w-80 w-full">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by Order No, Address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-400 transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">
            Shipment Records
          </h3>
          <div className="flex items-center gap-4">
            {userRole === "corporatePartner" && (
              <Link
                href="/shipments/create"
                className="px-5 py-2 bg-[#18319b] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#12247a] transition-all shadow-lg shadow-blue-50"
              >
                + Create Shipment
              </Link>
            )}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-5 px-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                  Order No
                </th>
                <th className="py-5 px-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                  Route
                </th>
                <th className="py-5 px-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                  Receiver Address
                </th>
                <th className="py-5 px-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                  Phone Number
                </th>
                <th className="py-5 px-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] text-center">
                  Status
                </th>
                <th className="py-5 px-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] text-right">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredShipments.map((shipment, i) => (
                <tr
                  key={i}
                  className="hover:bg-blue-50/30 transition-colors group"
                >
                  <td className="py-6 px-6">
                    <span className="text-sm font-bold text-gray-900">
                      {shipment.orderNo}
                    </span>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {shipment.date}
                    </p>
                  </td>
                  <td className="py-6 px-6">
                    <span className="text-sm text-gray-600 font-medium">
                      {shipment.route}
                    </span>
                  </td>
                  <td className="py-6 px-6">
                    <span className="text-sm text-gray-600 font-medium truncate block max-w-[200px]">
                      {shipment.receiver}
                    </span>
                  </td>
                  <td className="py-6 px-6">
                    <span className="text-sm text-gray-600 font-medium">
                      {shipment.phone}
                    </span>
                  </td>
                  <td className="py-6 px-6 text-center">
                    <span
                      className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tight ${shipment.statusColor} shadow-sm border border-current opacity-80`}
                    >
                      {shipment.status}
                    </span>
                  </td>
                  <td className="py-6 px-6 text-right">
                    <Link
                      href={`/shipments/${shipment.orderNo.replace("#", "")}`}
                      className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all group-hover:scale-110"
                    >
                      <ArrowUpRight size={20} />
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredShipments.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-20 text-center">
                    <p className="text-gray-400 font-medium italic">
                      No shipments found matching your search.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-8 py-5 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Showing 1-8 of 124 shipments
          </p>
          <div className="flex items-center gap-2">
            <button
              className="p-2 bg-white border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 disabled:opacity-30 cursor-not-allowed"
              disabled
            >
              <ChevronLeft size={18} />
            </button>
            <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentsPage;
