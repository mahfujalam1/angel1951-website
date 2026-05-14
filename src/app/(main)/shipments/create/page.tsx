"use client";

import React, { useEffect, useState } from "react";
import InternationalForm from "@/components/create/InternationalForm";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CreateShipmentPage = () => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
    setLoading(false);
  }, []);

  if (loading) return null;

  // Block Corporate Partners from creating shipments
  if (role === "corporatePartner") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 animate-fadeIn">
        <div className="max-w-md w-full bg-white rounded-[3rem] p-10 border border-gray-100 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto">
            <ShieldAlert size={40} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-gray-900 uppercase">Access Restricted</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Corporate Partners cannot create shipments directly. Please contact your dedicated Buan account manager or local branch staff to initiate a new shipment.
            </p>
          </div>
          <div className="pt-4">
             <Link 
              href="/dashboard"
              className="block w-full py-4 bg-blue-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-800 transition-all shadow-xl shadow-blue-100"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-8 animate-fadeIn min-h-screen">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link
            href="/shipments"
            className="inline-flex items-center gap-2 text-xs font-black text-gray-400 hover:text-[#18319b] uppercase tracking-widest transition-colors group mb-4"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />{" "}
            Back to Management
          </Link>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
            New International Shipment
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            Register a new global shipment. Provide accurate dimensions and destination details.
          </p>
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
