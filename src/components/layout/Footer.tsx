"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Package, Send } from "lucide-react";

const usefulLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/#services" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ's", href: "/#faq" },
];

const serviceLinks = [
    "Air cargo",
    "Sea cargo",
    "Fresh produce cargo",
    "Frozen cargo",
    "Procurement services",
    "Customs clearance",
    "Personalized cargo",
];

export default function Footer() {
    const router = useRouter();
    const [email, setEmail] = useState("");

    const handleSubscribe = () => {
        if (!email) return;
        setEmail("");
        // TODO: connect to API
    };

    return (
        <footer className="bg-[#1A3BDB] text-white">
            {/* ── Main Content ── */}
            <div className="max-w-[1400px] mx-auto px-10 pt-14 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_2fr] gap-12">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-9 h-9 bg-white/15 rounded-[8px] flex items-center justify-center">
                                <Package size={18} color="white" />
                            </div>
                            <span className="font-sora font-bold text-[15px] text-white">
                                Buan Enterprise
                            </span>
                        </div>
                        <p className="text-sm text-white/65 leading-relaxed max-w-[260px]">
                            Quickly supply alternative strategic theme areas vis-à-vis B2C
                            mindshare. Objectively repurpose stand-alone synergy via
                            user-centric architectures.
                        </p>
                    </div>

                    {/* Useful Links */}
                    <div>
                        <h4 className="text-[13px] font-bold uppercase tracking-[1.5px] text-white/50 mb-5 font-sora">
                            Useful Links
                        </h4>
                        <ul className="flex flex-col gap-3">
                            {usefulLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="flex items-center gap-2 text-sm text-white/75 hover:text-[#F5A623] transition-colors duration-200"
                                    >
                                        <span className="text-[#F5A623] text-base leading-none">→</span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Our Services */}
                    <div>
                        <h4 className="text-[13px] font-bold uppercase tracking-[1.5px] text-white/50 mb-5 font-sora">
                            Our Services
                        </h4>
                        <ul className="flex flex-col gap-3">
                            {serviceLinks.map((s) => (
                                <li key={s}>
                                    <button
                                        onClick={() => router.push("/#services")}
                                        className="flex items-center gap-2 text-sm text-white/75 hover:text-[#F5A623] transition-colors duration-200 text-left"
                                    >
                                        <span className="text-[#F5A623] text-base leading-none">→</span>
                                        {s}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Subscribe */}
                    <div>
                        <h4 className="text-[13px] font-bold uppercase tracking-[1.5px] text-white/50 mb-5 font-sora">
                            Subscribe Now
                        </h4>
                        <p className="text-sm text-white/65 leading-relaxed mb-4">
                            Continually evolve worldwide vortals rather than process centric
                            human capital. Subscribe for our latest news & articles, and send
                            message.
                        </p>
                        <div className="flex">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                className="
                  flex-1 px-4 py-3 rounded-l-lg text-sm text-[#1F2937]
                  outline-none border-none bg-white
                  placeholder:text-[#9CA3AF]
                "
                            />
                            <button
                                onClick={handleSubscribe}
                                className="
                  w-12 bg-[#F5A623] hover:bg-[#D4891A] rounded-r-lg
                  flex items-center justify-center text-white
                  transition-colors duration-200
                "
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Bottom Bar ── */}
            <div className="border-t border-white/15">
                <div className="max-w-[1400px] mx-auto px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-sm text-white/50">
                        © 2025 Buan Enterprise. All rights reserved.
                    </p>
                    <div className="flex items-center gap-5">
                        {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((t) => (
                            <button
                                key={t}
                                className="text-xs text-white/45 hover:text-white/80 transition-colors"
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}