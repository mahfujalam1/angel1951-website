"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell, PieChart, Pie } from "recharts";

interface Props {
  data: {
    month: string;
    deliveredCount: number;
    revenue: number;
    paidCount: number;
    unpaidCount: number;
  } | null;
}

export default function AnalyticsChart({ data }: Props) {
  if (!data) return (
    <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-center h-[400px]">
      <p className="text-gray-400 font-medium">No analytics data available for this selection.</p>
    </div>
  );

  const barData = [
    { name: "Paid", value: data.paidCount, color: "#10b981" },
    { name: "Unpaid", value: data.unpaidCount, color: "#f59e0b" },
    { name: "Total Delivered", value: data.deliveredCount, color: "#18319b" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-[450px]">
        <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Parcel Distribution</h3>
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }}
            />
            <Tooltip 
              cursor={{ fill: '#f9fafb' }}
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={50}>
              {barData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Financial Summary Card */}
      <div className="bg-[#18319b] p-8 rounded-3xl shadow-xl shadow-blue-100 relative overflow-hidden flex flex-col justify-center">
        <div className="relative z-10">
          <h3 className="text-xs font-black text-white/50 uppercase tracking-[0.2em] mb-4">Total Revenue Generated</h3>
          <p className="text-5xl font-black text-white tracking-tight mb-2">₱{data.revenue.toLocaleString()}</p>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Monthly Settlement Ready
          </div>
        </div>

        {/* Decorative Circles */}
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute top-10 right-20 w-12 h-12 bg-white/10 rounded-full"></div>
      </div>
    </div>
  );
}
