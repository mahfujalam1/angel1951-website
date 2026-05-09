"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { MapPin, Search, Globe, ChevronDown, ExternalLink } from "lucide-react";

export default function TopBar() {
  const [applyForOpen, setApplyForOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    setUserRole(localStorage.getItem("role") || "");
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setApplyForOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const allApplyForOptions = [
    { label: "Become Hub User", href: "/apply-for/become-hub", role: "hubProvider" },
    { label: "Business User", href: "/apply-for/business", role: "business" },
    { label: "Container User", href: "/apply-for/container", role: "container" },
    { label: "Corporate Partner", href: "/apply-for/corporate", role: "partner" },
  ];
  
  const applyForOptions = allApplyForOptions.filter((opt) => opt.role !== userRole);

  return (
    <div className="bg-[#18319b] w-full z-[60] relative">
      <div className="max-w-[1800px] mx-auto px-6 h-[72px] flex items-center justify-between gap-6">
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center shrink-0 no-underline gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-white/10">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16.5 9.4l-9-5.19A2 2 0 0 0 4.5 6v12a2 2 0 0 0 1.5 1.73l9-5.19a2 2 0 0 0 0-3.46z"></path>
          </svg>
        </div>
        <span className="font-inter font-bold text-xl text-white tracking-tight">
          Buan Logistics
        </span>
      </Link>

      <div className="flex items-center gap-6 text-sm font-medium text-white">
        <Link
          href="/service-points"
          className="flex items-center gap-1.5 hover:text-white/80 transition-colors cursor-pointer"
        >
          <MapPin size={16} />
          <span>Find a Service Point</span>
          <ExternalLink size={14} className="text-white/60" />
        </Link>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setApplyForOpen(!applyForOpen)}
            className="flex items-center gap-1.5 hover:text-white/80 transition-colors cursor-pointer"
          >
            <span>Apply For</span>
            <ChevronDown
              size={14}
              className={`transition-transform ${applyForOpen ? "rotate-180" : ""}`}
            />
          </button>

          {applyForOpen && (
            <div className="absolute top-[calc(100%+16px)] right-0 w-[320px] bg-white rounded-md shadow-2xl flex flex-col z-50 p-6 border border-gray-200">
              <h3 className="text-2xl font-black text-black mb-4">Apply For</h3>
              <div className="flex flex-col">
                {applyForOptions.map((opt) => (
                  <Link
                    key={opt.href}
                    href={opt.href}
                    onClick={() => setApplyForOpen(false)}
                    className="flex items-center justify-between py-3.5 border-b border-gray-200 hover:bg-gray-50 transition-colors text-black text-[15px] group"
                  >
                    <span className="group-hover:text-primary transition-colors">
                      {opt.label}
                    </span>
                    <ExternalLink size={16} className="text-primary" />
                  </Link>
                ))}
              </div>
              <Link
                href="/apply-for"
                onClick={() => setApplyForOpen(false)}
                className="mt-6 w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded text-[15px] transition-colors cursor-pointer text-center block"
              >
                Learn About Roles
              </Link>
            </div>
          )}
        </div>
        <button className="flex items-center gap-1.5 hover:text-white/80 transition-colors cursor-pointer">
          <Globe size={16} />
          <span>Bangladesh</span>
        </button>
      </div>
      </div>
    </div>
  );
}
