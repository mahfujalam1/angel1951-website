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

export default function LearnAboutRolesPage() {
  const roles = [
    {
      id: "business",
      title: "Business Customer (Tier 2)",
      icon: <Briefcase size={32} className="text-primary" />,
      whoTheyAre:
        "A small business owner who regularly sends multiple packages.",
      whatTheyDo: [
        "Fills up their business information from the website/app for admin verification.",
        "Send multiple packages at once (but not a full container).",
        "Usually use hub providers for convenience.",
        "Pay per shipment.",
        "Use the app to track shipments and manage history.",
        "Can earn rewards through frequent use and do referrals.",
      ],
      applyLink: "/apply-for/business",
      applyText: "Apply as Business User",
    },
    {
      id: "container",
      title: "Container Customer (Tier 3)",
      icon: <PackageOpen size={32} className="text-primary" />,
      whoTheyAre: "A large customer sending very big shipments.",
      whatTheyDo: [
        "Fills up their business information from the website/app for admin verification.",
        "Send a full container (all goods belong to them only).",
        "Do not share the container with others.",
        "Must go directly to the branch.",
        "Cannot use hub providers.",
        "Pay the large shipment cost.",
      ],
      applyLink: "/apply-for/container",
      applyText: "Apply as Container User",
    },
    {
      id: "corporate",
      title: "Corporate Users (Business Partners)",
      icon: <Building2 size={32} className="text-primary" />,
      whoTheyAre: "Verified logistics companies working as partners with Buan.",
      whatTheyDo: [
        "Collect shipments from their own customers (offline).",
        "Send those shipments to Buan in bulk.",
        "Use pre-agreed pricing (rate card).",
        "Pay Buan periodically (not per shipment).",
      ],
      rules: [
        "Must be a verified business.",
        "Cannot use hub providers.",
        "Pricing is agreed manually, not through the app.",
      ],
      applyLink: "/apply-for/corporate",
      applyText: "Become a Corporate Partner",
    },
    {
      id: "hub",
      title: "Hub Providers (Drop-off Points)",
      icon: <Store size={32} className="text-primary" />,
      whoTheyAre:
        "Local businesses acting as collection points (e.g. Supermarket, Shop, Small business location).",
      whatTheyDo: [
        "Accept packages from customers.",
        "Give a form to the customer to fill out.",
        "Check what items are inside the package.",
        "Sign the form to confirm items.",
        "Keep packages safe until pickup.",
        "Hand over packages to Buan when the truck arrives (offline).",
      ],
      earnings: ["Paid per package handled.", "No package means no payment."],
      applyLink: "/apply-for/become-hub",
      applyText: "Become a Hub Provider",
    },
  ];

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
          {roles.map((role) => (
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

                {role.rules && (
                  <div className="mb-6 bg-orange-50 p-5 rounded-2xl border border-orange-100">
                    <h3 className="text-sm font-bold text-orange-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <AlertCircle size={16} /> Important Rules
                    </h3>
                    <ul className="space-y-2">
                      {role.rules.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full shrink-0 mt-2" />
                          <span className="text-orange-900 text-[14px]">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {role.earnings && (
                  <div className="mb-6 bg-blue-50 p-5 rounded-2xl border border-blue-100">
                    <h3 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Coins size={16} /> How they earn
                    </h3>
                    <ul className="space-y-2">
                      {role.earnings.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full shrink-0 mt-2" />
                          <span className="text-blue-900 text-[14px]">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
          ))}
        </div>
      </div>
    </div>
  );
}
