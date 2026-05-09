"use client";

import Link from "next/link";
import { Clock, Package, Truck, Banknote, ArrowRight } from "lucide-react";

export default function HubDashboardPage() {
  const tableData = [
    {
      id: "INT-2026-0001",
      customer: "Alice Johnson",
      items: "2 item(s)",
      status: "Awaiting Pickup",
      statusColor: "bg-green-100 text-green-700",
      action: "Ready for truck",
      actionType: "text",
      shiftToBranch: true
    },
    {
      id: "INT-2026-0002",
      customer: "Bob Smith",
      items: "1 item(s)",
      status: "Received",
      statusColor: "bg-yellow-100 text-yellow-700",
      action: "Verify Contents",
      actionType: "link",
      shiftToBranch: true
    },
    {
      id: "INT-2026-0003",
      customer: "Carol White",
      items: "1 item(s)",
      status: "Handed Over",
      statusColor: "bg-gray-100 text-gray-700",
      action: "Completed",
      actionType: "text",
      shiftToBranch: null
    }
  ];

  return (
    <div className="max-w-[1400px] mx-auto py-10 px-6 animate-fadeIn min-h-screen">
      
      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[11px] font-bold text-gray-500 tracking-wider uppercase">Awaiting for intake</h3>
            <Clock size={18} className="text-red-500" />
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-semibold text-gray-900">1</span>
            <span className="text-sm font-semibold text-red-500">+1 new</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[11px] font-bold text-gray-500 tracking-wider uppercase">Ready for pickup</h3>
            <Package size={18} className="text-blue-600" />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-semibold text-gray-900">1</span>
            <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">Stable</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[11px] font-bold text-gray-500 tracking-wider uppercase">Handed over today</h3>
            <Truck size={18} className="text-gray-600" />
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-semibold text-gray-900">0</span>
            <span className="text-sm text-gray-500">Last: 2h ago</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[11px] font-bold text-gray-500 tracking-wider uppercase">Total earnings</h3>
            <Banknote size={18} className="text-[#18319b]" />
          </div>
          <div>
            <span className="text-3xl font-semibold text-gray-900">$2.50</span>
          </div>
        </div>
      </div>

      {/* Table Header area */}
      <div className="flex justify-end mb-4">
        <Link 
          href="/hub-dashboard/inventory" 
          className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
        >
          View inventory <ArrowRight size={16} />
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Intake #</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Items</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Action</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-right">Shift to branch</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {tableData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-5 px-6">
                    <span className="text-sm font-bold text-gray-900">{row.id}</span>
                  </td>
                  <td className="py-5 px-6">
                    <span className="text-sm text-gray-700">{row.customer}</span>
                  </td>
                  <td className="py-5 px-6">
                    <span className="text-sm text-gray-700">{row.items}</span>
                  </td>
                  <td className="py-5 px-6 text-center">
                    <span className={`text-[11px] font-bold px-3 py-1.5 rounded-full ${row.statusColor}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-5 px-6">
                    {row.actionType === "link" ? (
                      <button className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer">
                        {row.action}
                      </button>
                    ) : (
                      <span className="text-sm font-medium text-gray-500">{row.action}</span>
                    )}
                  </td>
                  <td className="py-5 px-6 text-right">
                    {row.shiftToBranch !== null && (
                      <div className="flex items-center justify-end gap-2">
                        <button className="w-8 h-6 flex items-center justify-center rounded-md bg-red-500 text-white text-[10px] font-bold hover:bg-red-600 transition-colors cursor-pointer">
                          No
                        </button>
                        <button className="w-8 h-6 flex items-center justify-center rounded-md bg-green-500 text-white text-[10px] font-bold hover:bg-green-600 transition-colors cursor-pointer">
                          Yes
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}