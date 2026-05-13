"use client";

import Link from "next/link";
import {
  Briefcase,
  PackageOpen,
  Building2,
  Store,
  CheckCircle2,
  AlertCircle,
  Coins,
} from "lucide-react";

import { useState, useEffect } from "react";

export default function LearnAboutRolesPage() {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    setUserRole(localStorage.getItem("role"));
  }, []);

  const allRoles = [
    {
      id: "businessCustomer",
      tier: 2,
      title: "Business Customer (Tier 2)",
      icon: <Briefcase size={32} className="text-primary" />,
      whoTheyAre: "A small business owner who regularly sends multiple packages.",
      whatTheyDo: [
        "Fill up business information for admin verification.",
        "Send multiple packages at once (but not a full container).",
        "Use hub providers for local collection convenience.",
        "Pay per shipment with specialized business rates.",
        "Use the dashboard to track shipments and manage history.",
      ],
      applyLink: "/apply-for/business",
      applyText: "Apply as Business User",
    },
    {
      id: "containerCustomer",
      tier: 3,
      title: "Container Customer (Tier 3)",
      icon: <PackageOpen size={32} className="text-primary" />,
      whoTheyAre: "Large-scale shippers requiring full container capacity.",
      whatTheyDo: [
        "Dedicated container for your goods only (no sharing).",
        "Direct-to-branch shipment processing.",
        "Handle large volume shipments with maximum security.",
        "Custom large-scale shipment pricing.",
        "Full dashboard management for container logistics.",
      ],
      applyLink: "/apply-for/container",
      applyText: "Apply as Container User",
    },
  ];

  // Logic: 
  // - If user is 'customer' (Tier 1), show Tier 2 & 3
  // - If user is 'businessCustomer' (Tier 2), show Tier 3
  // - If user is 'containerCustomer' (Tier 3), show none
  
  const getCurrentTier = (role: string | null) => {
    if (role === "businessCustomer") return 2;
    if (role === "containerCustomer") return 3;
    return 1; // Default/Tier 1
  };

  const currentTier = getCurrentTier(userRole);
  const availableRoles = allRoles.filter(r => r.tier > currentTier);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <div className="bg-primary pt-24 pb-32 px-6 rounded-b-[3rem] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Understanding Our Roles
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Whether you're a small business owner, a large enterprise, or a
            local shop looking to partner with us, we have a tailored role to
            fit your logistics needs. Explore our partnership tiers below.
          </p>
        </div>
      </div>

      {/* Roles Grid */}
      <div className="max-w-[1400px] mx-auto px-6 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {availableRoles.length > 0 ? (
            availableRoles.map((role) => (
              <div
                key={role.id}
                className="bg-white rounded-xl shadow-xl shadow-black/5 border border-gray-100 flex flex-col overflow-hidden hover:border-primary/30 transition-all group"
              >
                <div className="p-8 md:p-10 flex-1">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {role.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {role.title}
                  </h2>

                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Who they are
                    </h3>
                    <p className="text-gray-700 text-[15px] leading-relaxed">
                      {role.whoTheyAre}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                      What they do
                    </h3>
                    <ul className="space-y-3">
                      {role.whatTheyDo.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2
                            size={18}
                            className="text-green-500 shrink-0 mt-0.5"
                          />
                          <span className="text-gray-600 text-[15px]">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <Link
                    href={role.applyLink}
                    className="w-full flex items-center justify-center py-4 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold rounded-xl transition-colors text-[15px]"
                  >
                    {role.applyText}
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 bg-white p-12 rounded-3xl border border-gray-100 text-center">
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                 <CheckCircle2 size={40} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">You are at the Highest Tier</h2>
              <p className="text-gray-500 max-w-md mx-auto">
                You have already unlocked all available partnership tiers. 
                Thank you for being a valuable partner of BUAN Logistics.
              </p>
              <div className="mt-8">
                <Link href="/dashboard" className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-blue-100">
                  Go to Dashboard
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
