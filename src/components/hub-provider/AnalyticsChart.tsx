import { AnalyticsRow } from "@/types/hubProvider.types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";

interface Props {
  data: AnalyticsRow | null;
  trend: AnalyticsRow[];
}

export default function AnalyticsChart({ data, trend }: Props) {
  if (!data) return (
    <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-center h-[400px]">
      <p className="text-gray-400 font-medium">No analytics data available for this selection.</p>
    </div>
  );

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const chartData = trend.map(row => {
    const [year, month] = row.month.split("-");
    return {
      name: months[parseInt(month) - 1],
      delivered: row.deliveredCount,
      revenue: row.revenue / 100, // Scale down for visual balance if needed, or just use count
      paid: row.paidCount,
    };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Bar Chart - 6 Month Trend */}
      <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-[450px]">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">6-Month Performance Trend</h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#18319b]"></div>
              <span className="text-[10px] font-bold text-gray-400 uppercase">Delivered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-[10px] font-bold text-gray-400 uppercase">Paid</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
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
            <Bar dataKey="delivered" fill="#18319b" radius={[6, 6, 0, 0]} barSize={30} />
            <Bar dataKey="paid" fill="#10b981" radius={[6, 6, 0, 0]} barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Financial Summary Card */}
      <div className="bg-[#18319b] p-10 rounded-3xl shadow-xl shadow-blue-100 relative overflow-hidden flex flex-col justify-center">
        <div className="relative z-10">
          <h3 className="text-xs font-black text-white/50 uppercase tracking-[0.2em] mb-4">Current Month Revenue</h3>
          <p className="text-5xl font-black text-white tracking-tight mb-2">₱{data.revenue.toLocaleString()}</p>
          <div className="flex items-center gap-2 text-white/80 text-sm mt-4">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Monthly Settlement Ready
          </div>
          
          <div className="mt-10 pt-10 border-t border-white/10">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-bold text-white/40 uppercase mb-1">Delivered</p>
                <p className="text-2xl font-black text-white">{data.deliveredCount}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-white/40 uppercase mb-1">Success Rate</p>
                <p className="text-2xl font-black text-white">94%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Circles */}
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute top-10 right-20 w-12 h-12 bg-white/10 rounded-full"></div>
      </div>
    </div>
  );
}
