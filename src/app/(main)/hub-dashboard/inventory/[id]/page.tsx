"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { getParcelById, updateParcelStatus } from "@/lib/api/hubProvider";
import { Parcel, ParcelStatus } from "@/types/hubProvider.types";
import { ArrowLeft, Package, User, MapPin, Calendar, CreditCard, Tag, Clock, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ParcelDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [parcel, setParcel] = useState<Parcel | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchParcel = async () => {
      const data = await getParcelById(id);
      if (data) {
        setParcel(data);
      } else {
        toast.error("Parcel not found");
        router.push("/hub-dashboard/inventory");
      }
      setLoading(false);
    };
    fetchParcel();
  }, [id, router]);

  const handleStatusChange = async (newStatus: ParcelStatus) => {
    if (!parcel) return;
    setUpdating(true);
    try {
      await updateParcelStatus(parcel.id, newStatus);
      setParcel({ ...parcel, status: newStatus });
      toast.success("Status updated");
    } catch (err) {
      toast.error("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#18319b]"></div>
      </div>
    );
  }

  if (!parcel) return null;

  return (
    <div className="max-w-[1200px] mx-auto py-10 px-6 animate-fadeIn min-h-screen">
      <Link 
        href="/hub-dashboard/inventory" 
        className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors mb-8 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Inventory
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Image & Status */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="aspect-square bg-gray-100 relative group">
              {/* In a real app, parcel.imageUrl would be used */}
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800" 
                alt="Parcel Preview" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-4 py-2 rounded-full text-xs font-black uppercase shadow-lg ${
                  parcel.status === "Delivered" ? "bg-green-500 text-white" : "bg-[#18319b] text-white"
                }`}>
                  {parcel.status}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Status Management</h3>
              {parcel.status === "Awaiting Pickup" ? (
                <div className="space-y-2">
                  <button
                    disabled={updating}
                    onClick={() => handleStatusChange("Handed Over")}
                    className="w-full py-3 bg-[#18319b] text-white rounded-xl text-xs font-bold hover:bg-[#10247a] transition-all"
                  >
                    Hand Over to Branch
                  </button>
                  <button
                    disabled={updating}
                    onClick={() => handleStatusChange("Cancelled")}
                    className="w-full py-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 transition-all"
                  >
                    Cancel Shipment
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status is Locked</p>
                  <p className="text-[9px] text-gray-400 mt-1 italic">Only Admin can modify this status after handover.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Information Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-10 border-b border-gray-50">
              <div>
                <span className="text-[11px] font-black text-primary-500 uppercase tracking-[0.2em] mb-2 block">Shipment Reference</span>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">{parcel.reference}</h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1 block">Payment</span>
                  <span className={`text-sm font-bold ${parcel.paymentStatus === "Paid" ? "text-green-600" : "text-amber-500"}`}>
                    {parcel.paymentStatus === "Paid" ? "Fully Paid" : "Payment Pending"}
                  </span>
                </div>
                <div className={`p-3 rounded-2xl ${parcel.paymentStatus === "Paid" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-500"}`}>
                  {parcel.paymentStatus === "Paid" ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              
              {/* Section: Basic Info */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 text-gray-400 rounded-xl">
                    <Package size={20} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Description</span>
                    <p className="text-sm text-gray-800 font-medium leading-relaxed">
                      {parcel.description || "No specific items listed for this shipment."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 text-gray-400 rounded-xl">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Created At</span>
                    <p className="text-sm text-gray-800 font-medium">
                      {new Date(parcel.date).toLocaleDateString(undefined, { dateStyle: 'full' })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Section: Financials */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 text-gray-400 rounded-xl">
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Service Fee</span>
                    <p className="text-xl font-black text-[#18319b]">
                      ₱{parcel.amount.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 text-gray-400 rounded-xl">
                    <Tag size={20} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Inventory ID</span>
                    <p className="text-sm text-gray-800 font-mono font-medium">
                      {parcel.id}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Note Area */}
            <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-100 flex gap-4">
              <MapPin size={20} className="text-[#18319b] shrink-0" />
              <div>
                <span className="text-[11px] font-bold text-[#18319b] uppercase tracking-wider block mb-1">Handling Facility</span>
                <p className="text-sm text-gray-600 leading-relaxed italic">
                  This parcel is currently stored in your hub facility. Please ensure proper handling instructions are followed for fragile items as noted in the shipment details.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
