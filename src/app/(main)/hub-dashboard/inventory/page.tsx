"use client";

import { useState } from "react";
import { Search, Filter, Download, ArrowUpRight, MoreVertical } from "lucide-react";

export default function HubInventoryPage() {
  const [search, setSearch] = useState("");

  const inventoryData = [
    {
      id: "INT-2026-0001",
      date: "Oct 24, 2026",
      customer: "Alice Johnson",
      destination: "New York, USA",
      type: "Electronics",
      weight: "2.5 KG",
      status: "Awaiting Pickup",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      id: "INT-2026-0002",
      date: "Oct 24, 2026",
      customer: "Bob Smith",
      destination: "London, UK",
      type: "Documents",
      weight: "0.5 KG",
      status: "Received",
      statusColor: "bg-yellow-100 text-yellow-700",
    },
    {
      id: "INT-2026-0003",
      date: "Oct 23, 2026",
      customer: "Carol White",
      destination: "Sydney, AUS",
      type: "Clothing",
      weight: "1.2 KG",
      status: "Handed Over",
      statusColor: "bg-gray-100 text-gray-700",
    },
    {
      id: "INT-2026-0004",
      date: "Oct 22, 2026",
      customer: "David Lee",
      destination: "Toronto, CAN",
      type: "Others",
      weight: "5.0 KG",
      status: "Handed Over",
      statusColor: "bg-gray-100 text-gray-700",
    },
    {
      id: "INT-2026-0005",
      date: "Oct 21, 2026",
      customer: "Emma Watson",
      destination: "Berlin, GER",
      type: "Electronics",
      weight: "1.8 KG",
      status: "Awaiting Pickup",
      statusColor: "bg-green-100 text-green-700",
    }
  ];

  return (
    <div className="max-w-[1400px] mx-auto py-10 px-6 animate-fadeIn min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Inventory Management</h1>
          <p className="text-sm text-gray-500">Track and manage all your hub's packages</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors cursor-pointer shadow-sm">
            <Filter size={16} /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors cursor-pointer shadow-sm">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by Intake ID or Customer..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Showing <strong className="text-gray-900 font-semibold">{inventoryData.length}</strong> items</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Intake Info</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Customer & Destination</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Package Details</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {inventoryData.map((row) => (
                <tr key={row.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors cursor-pointer flex items-center gap-1">
                        {row.id} <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                      <span className="text-xs text-gray-500 mt-1">{row.date}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-800">{row.customer}</span>
                      <span className="text-xs text-gray-500 mt-1 truncate max-w-[150px]">{row.destination}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-700">{row.type}</span>
                      <span className="text-xs font-medium text-gray-500 mt-1">{row.weight}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center justify-center text-[11px] font-bold px-3 py-1.5 rounded-full ${row.statusColor}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors cursor-pointer">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>Page 1 of 1</span>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>

      </div>
    </div>
  );
}
