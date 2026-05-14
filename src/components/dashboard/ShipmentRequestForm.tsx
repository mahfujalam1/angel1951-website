"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SectionCard from "../common/SectionCard";
import FormInput from "../common/FormInput";
import {
  Package,
  Truck,
  ShieldCheck,
  MapPin,
  AlertCircle,
  Clock,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";

interface ShipmentRequestFormData {
  serviceType: "pickup" | "dropoff";
  shipmentType: "Regular" | "Urgent" | "Fragile";
  insuranceNeeded: boolean;
  pickupOption: "Home" | "Office" | "Other";
  pickupAddress: string;
  senderName: string;
  senderPhone: string;
  receiverName: string;
  receiverPhone: string;
  destination: string;
}

const ShipmentRequestForm = () => {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ShipmentRequestFormData>({
    defaultValues: {
      serviceType: "pickup",
      shipmentType: "Regular",
      insuranceNeeded: false,
      pickupOption: "Home",
    },
  });

  const serviceType = watch("serviceType");

  const onSubmit = (data: ShipmentRequestFormData) => {
    console.log("Shipment Request Data:", data);
    toast.success("Shipment request submitted successfully!");
    setStep(3); // Show success state
  };

  if (step === 3) {
    return (
      <div className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-xl shadow-blue-50 text-center space-y-6 animate-fadeIn">
        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto">
          <ShieldCheck size={40} />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-gray-900 uppercase">
            Request Received!
          </h3>
          <p className="text-gray-500 max-w-sm mx-auto text-sm leading-relaxed">
            Our team will review your request and contact you shortly to confirm
            the logistics.
          </p>
        </div>
        <button
          onClick={() => {
            setStep(1);
          }}
          className="px-8 py-3 bg-blue-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-800 transition-all"
        >
          Create Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-50 overflow-hidden animate-fadeIn">
      <div className="bg-blue-900 p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/10 rounded-lg">
            <Package size={20} />
          </div>
          <h3 className="text-sm font-black uppercase tracking-[0.2em]">
            New Shipment Request
          </h3>
        </div>
        <p className="text-blue-100/70 text-xs font-medium">
          Please fill in the details to request a new shipment.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Column: Logistics */}
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Truck size={14} className="text-blue-600" /> Service Option
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["pickup", "dropoff"].map((opt) => (
                  <label
                    key={opt}
                    className={`
                    relative p-4 rounded-2xl border-2 transition-all cursor-pointer text-center
                    ${serviceType === opt ? "border-blue-600 bg-blue-50" : "border-gray-50 hover:border-gray-200 bg-gray-50/50"}
                  `}
                  >
                    <input
                      type="radio"
                      value={opt}
                      {...register("serviceType")}
                      className="sr-only"
                    />
                    <span
                      className={`text-xs font-black uppercase tracking-widest ${serviceType === opt ? "text-blue-600" : "text-gray-400"}`}
                    >
                      {opt}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {serviceType === "pickup" && (
              <div className="space-y-4 animate-slideDown">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <MapPin size={14} className="text-blue-600" /> Pickup Location
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Home", "Office", "Other"].map((opt) => (
                    <label key={opt} className="cursor-pointer">
                      <input
                        type="radio"
                        value={opt}
                        {...register("pickupOption")}
                        className="sr-only peer"
                      />
                      <div className="px-3 py-2 text-[10px] font-black text-gray-400 bg-gray-50 rounded-lg text-center uppercase tracking-widest border border-transparent peer-checked:bg-white peer-checked:border-blue-600 peer-checked:text-blue-600 transition-all">
                        {opt}
                      </div>
                    </label>
                  ))}
                </div>
                <FormInput
                  placeholder="Enter detailed pickup address"
                  {...register("pickupAddress", {
                    required: serviceType === "pickup",
                  })}
                />
              </div>
            )}

            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <AlertCircle size={14} className="text-blue-600" /> Shipment
                Priority
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Regular", "Urgent", "Fragile"].map((opt) => (
                  <label key={opt} className="cursor-pointer">
                    <input
                      type="radio"
                      value={opt}
                      {...register("shipmentType")}
                      className="sr-only peer"
                    />
                    <div className="px-3 py-2 text-[10px] font-black text-gray-400 bg-gray-50 rounded-lg text-center uppercase tracking-widest border border-transparent peer-checked:bg-white peer-checked:border-blue-600 peer-checked:text-blue-600 transition-all">
                      {opt}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-3">
                <ShieldCheck size={20} className="text-blue-600" />
                <span className="text-xs font-black text-gray-700 uppercase tracking-tight">
                  Add Shipping Insurance
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register("insuranceNeeded")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          {/* Right Column: Contact Details */}
          <div className="space-y-6">
            <div className="space-y-4 p-6 bg-gray-50/50 rounded-3xl border border-gray-100">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Sender Information
              </label>
              <div className="grid grid-cols-1 gap-4">
                <FormInput
                  placeholder="Sender Full Name"
                  {...register("senderName", { required: true })}
                />
                <FormInput
                  placeholder="Sender Phone Number"
                  {...register("senderPhone", { required: true })}
                />
              </div>
            </div>

            <div className="space-y-4 p-6 bg-gray-50/50 rounded-3xl border border-gray-100">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Receiver Information
              </label>
              <div className="grid grid-cols-1 gap-4">
                <FormInput
                  placeholder="Receiver Full Name"
                  {...register("receiverName", { required: true })}
                />
                <FormInput
                  placeholder="Receiver Phone Number"
                  {...register("receiverPhone", { required: true })}
                />
                <FormInput
                  placeholder="Destination Address"
                  {...register("destination", { required: true })}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-blue-900 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-800 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2 group"
            >
              Submit Request{" "}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShipmentRequestForm;
