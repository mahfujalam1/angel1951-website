"use client";

import { useState } from "react";
import { Search, Package, Check, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const TRACKING_STEPS = [
  { id: "draft", label: "Draft" },
  { id: "invoice_sent", label: "Invoice Sent" },
  { id: "paid", label: "Paid" },
  { id: "in_transit", label: "In Transit" },
  { id: "delivered", label: "Delivered" },
];

export default function ShippingStatusPage() {
  const router = useRouter();
  const [trackingId, setTrackingId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<{
    id: string;
    status: string;
    date: string;
  } | null>(null);

  const handleTrack = () => {
    if (!trackingId) return;
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setResult({
        id: trackingId,
        status: "in_transit",
        date: "5/1/2026",
      });
      setIsSearching(false);
    }, 600);
  };

  const currentStepIndex = result ? TRACKING_STEPS.findIndex(s => s.id === result.status) : -1;

  return (
    <div className="min-h-screen bg-[#f9fafb] py-12 px-6 font-inter">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-black text-[#18319b] tracking-tight">Track Your Package</h1>
          <p className="text-gray-500 text-sm font-medium">Enter your tracking number for real-time updates</p>
        </div>

        {/* Search Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="NXL-2026-00123"
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#18319b] transition-all"
              />
            </div>
            <button
              onClick={handleTrack}
              disabled={isSearching}
              className="px-8 py-3 bg-[#18319b] text-white text-sm font-bold rounded-xl hover:bg-[#12247a] active:scale-95 transition-all shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSearching ? "Tracking..." : "Track Now"}
            </button>
          </div>
        </div>

        {/* Tracking Result */}
        {result && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-fadeInUp">
            <div className="flex items-center gap-4 mb-10 pb-8 border-b border-gray-50">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <Package className="text-[#18319b]" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-black text-gray-900 tracking-tight uppercase leading-none">{result.id}</h2>
                <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-1">Created on {result.date}</p>
              </div>
              <div className="ml-auto px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black rounded-full uppercase tracking-tighter">
                Active Shipment
              </div>
            </div>

            {/* Stepper */}
            <div className="relative px-2">
              {/* Progress Line */}
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-100 rounded-full">
                <div 
                  className="h-full bg-[#18319b] transition-all duration-700 ease-out" 
                  style={{ width: `${(currentStepIndex / (TRACKING_STEPS.length - 1)) * 100}%` }}
                />
              </div>

              {/* Steps */}
              <div className="relative flex justify-between">
                {TRACKING_STEPS.map((step, index) => {
                  const isCompleted = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;

                  return (
                    <div key={step.id} className="flex flex-col items-center">
                      <div 
                        className={`
                          w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all duration-500 border-2
                          ${isCompleted 
                            ? "bg-[#18319b] border-[#18319b] text-white shadow-sm" 
                            : "bg-white border-gray-100 text-gray-200"
                          }
                          ${isCurrent ? "ring-4 ring-blue-50" : ""}
                        `}
                      >
                        {isCompleted ? <Check size={14} strokeWidth={4} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                      </div>
                      <span 
                        className={`
                          mt-4 text-[9px] font-black uppercase tracking-widest text-center max-w-[60px] leading-tight
                          ${isCompleted ? "text-[#18319b]" : "text-gray-300"}
                        `}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Empty State Footer */}
        {!result && !isSearching && (
          <p className="text-center text-[9px] font-bold text-gray-300 uppercase tracking-[0.4em]">
            Buan Logistics Global Tracking
          </p>
        )}
      </div>
    </div>
  );
}