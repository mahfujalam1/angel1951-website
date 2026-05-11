"use client";

import { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { getParcels } from "@/lib/api/hubProvider"; // We'll add an addParcel function there
import { Parcel } from "@/types/hubProvider.types";
import { useRouter } from "next/navigation";

// Local helper since we'll add it to the API file next
const addParcel = async (parcelData: Partial<Parcel>) => {
  // We'll update the API file after this
  const all = await getParcels();
  const newParcel: Parcel = {
    id: `P${all.length + 1}`,
    reference: `REF${1000 + all.length + 1}`,
    status: "Awaiting Pickup", // New parcels start as Awaiting Pickup
    paymentStatus: "Unpaid",
    amount: 150, // Default or calculated
    date: new Date().toISOString(),
    description: parcelData.description || "",
    ...parcelData
  };
  // In a real app we'd post to server. Here we'll just push to the in-memory array if we can.
  // Actually, I'll update the lib/api/hubProvider.ts first to include an addParcel export.
  return newParcel;
};

export default function PackageIntakePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    description: ""
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Logic to add to our mock API
      // I'll call a dedicated function in hubProvider.ts
      const { addParcelToStore } = await import("@/lib/api/hubProvider");
      await addParcelToStore({
        description: formData.description,
        reference: `INT-${Math.floor(1000 + Math.random() * 9000)}`,
        status: "Awaiting Pickup",
        date: new Date().toISOString(),
      });

      toast.success("Package intake successful!");
      router.push("/hub-dashboard");
    } catch (err) {
      toast.error("Failed to process intake");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-fadeIn">
      <h1 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">
        Package intake form
      </h1>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Customer Details */}
        <div>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
            Customer details
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full name
              </label>
              <input
                type="text"
                placeholder="Enter customer name"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-[#18319b] focus:ring-4 focus:ring-[#18319b]/5 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="+234 ..."
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-[#18319b] focus:ring-4 focus:ring-[#18319b]/5 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Destination address
                </label>
                <input
                  type="text"
                  placeholder="Street, City, State"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-[#18319b] focus:ring-4 focus:ring-[#18319b]/5 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Package Info */}
        <div>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
            Package Info
          </h2>

          <div className="space-y-5">
            <textarea
              placeholder="Describe the items in the parcel..."
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-[#18319b] focus:ring-4 focus:ring-[#18319b]/5 transition-all resize-none"
            />
          </div>
        </div>

        {/* Product Image Intake */}
        <div>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
            Parcel Image
          </h2>

          {!imagePreview ? (
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer bg-gray-50/50 hover:bg-gray-50 hover:border-[#18319b]/30 transition-all group">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <div className="p-3 bg-white rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-gray-400" />
                </div>
                <p className="mb-1 text-sm text-gray-600 font-semibold">
                  Click to upload Parcel Image
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG or JPEG (MAX. 5MB)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </label>
          ) : (
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-gray-100 shadow-md">
              <img
                src={imagePreview}
                alt="Product preview"
                className="w-full h-56 object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-sm hover:bg-red-50 hover:text-red-600 transition-all"
              >
                <X size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-8 py-3.5 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-10 py-3.5 bg-[#18319b] hover:bg-[#10247a] text-white font-bold rounded-xl transition-all cursor-pointer shadow-lg shadow-blue-200 disabled:opacity-70"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            Take Parcel
          </button>
        </div>
      </form>
    </div>
  );
}
