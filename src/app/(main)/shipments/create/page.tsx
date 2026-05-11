"use client";

import React from "react";
import InternationalForm from "@/components/create/InternationalForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const CreateShipmentPage = () => {
  return (
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-8 animate-fadeIn min-h-screen">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link 
            href="/shipments" 
            className="inline-flex items-center gap-2 text-xs font-black text-gray-400 hover:text-[#18319b] uppercase tracking-widest transition-colors group mb-4"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Management
          </Link>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">New International Shipment</h1>
          <p className="text-gray-500 text-sm font-medium">Register a new global shipment under your corporate partner account.</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-50 border border-gray-100 overflow-hidden">
        <div className="p-8 md:p-12">
          <InternationalForm />
        </div>
      </div>
    </div>
  );
};

export default CreateShipmentPage;
