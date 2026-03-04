import { CheckCircle } from "lucide-react";
import Link from "next/link";

const benefits = [
    "Earn commission on every shipment processed at your hub",
    "Full training and onboarding support from our team",
    "Access to our logistics management dashboard",
    "Marketing support to grow your hub's client base",
    "Priority access to new features and services",
    "Dedicated account manager assigned to your hub",
];

const steps = [
    { step: "01", title: "Apply Online", desc: "Fill out the hub provider application form with your location details." },
    { step: "02", title: "Verification", desc: "Our team reviews your application and verifies your facilities." },
    { step: "03", title: "Onboarding", desc: "Complete training and get access to our systems and tools." },
    { step: "04", title: "Go Live", desc: "Start receiving shipments and earning commissions." },
];

export default function BecomeHubPage() {
    return (
        <div className="animate-fadeIn">

            {/* Hero */}
            <section className="bg-gradient-to-br from-[#1A3BDB] to-[#1230B3] py-24 px-6 text-white text-center">
                <div className="max-w-[640px] mx-auto">
                    <span className="
            inline-block px-4 py-1.5 bg-white/15 border border-white/25
            rounded-full text-[13px] font-semibold mb-5
          ">
                        🏗️ Hub Provider Program
                    </span>
                    <h1 className="text-[clamp(32px,4vw,52px)] font-extrabold font-sora leading-[1.1] mb-5">
                        Become a Hub Provider
                    </h1>
                    <p className="text-[16px] text-white/75 leading-relaxed mb-8">
                        Join our growing network of hub providers across Africa and earn by
                        hosting Buan Enterprise logistics operations in your city.
                    </p>
                    <Link
                        href="#apply"
                        className="
              inline-flex items-center gap-2 px-8 py-3.5
              bg-[#F5A623] hover:bg-[#D4891A] text-white
              rounded-xl font-bold text-[15px] font-sora
              transition-all duration-200
              hover:shadow-[0_8px_24px_rgba(245,166,35,0.4)]
            "
                    >
                        Apply Now →
                    </Link>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-20 bg-white">
                <div className="max-w-[1100px] mx-auto px-10">
                    <div className="text-center mb-14">
                        <h2 className="text-[32px] font-extrabold text-[#1F2937] font-sora mb-3">
                            Why Become a Hub Provider?
                        </h2>
                        <p className="text-[15px] text-[#6B7280] max-w-[500px] mx-auto">
                            Join hundreds of partners already earning with Buan Enterprise.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {benefits.map((b, i) => (
                            <div key={i} className="
                flex items-start gap-3 p-5
                border border-[#E5E7EB] rounded-xl
                hover:border-[#1A3BDB]/40 hover:bg-[#F3F6FF]
                transition-all duration-200
              ">
                                <CheckCircle size={20} className="text-[#1A3BDB] mt-0.5 flex-shrink-0" />
                                <p className="text-[14px] text-[#1F2937] leading-relaxed">{b}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Steps */}
            <section className="py-20 bg-[#F3F6FF]">
                <div className="max-w-[1100px] mx-auto px-10">
                    <div className="text-center mb-14">
                        <h2 className="text-[32px] font-extrabold text-[#1F2937] font-sora mb-3">
                            How It Works
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((s, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 border border-[#E5E7EB] text-center">
                                <div className="
                  text-[36px] font-extrabold text-[#1A3BDB]/15
                  font-sora mb-3
                ">
                                    {s.step}
                                </div>
                                <h3 className="text-[16px] font-bold text-[#1F2937] font-sora mb-2">
                                    {s.title}
                                </h3>
                                <p className="text-[13px] text-[#6B7280] leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Apply Form */}
            <section id="apply" className="py-20 bg-white">
                <div className="max-w-[560px] mx-auto px-6">
                    <div className="text-center mb-10">
                        <h2 className="text-[28px] font-extrabold text-[#1F2937] font-sora mb-2">
                            Apply to Become a Hub
                        </h2>
                        <p className="text-[14px] text-[#6B7280]">
                            We'll get back to you within 2–3 business days.
                        </p>
                    </div>
                    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm">
                        {["Full Name", "Email Address", "Phone Number", "City / Country", "Facility Size (sqm)"].map((label) => (
                            <div key={label} className="mb-5">
                                <label className="text-sm font-semibold text-[#1F2937] mb-2 block">{label}</label>
                                <input
                                    className="
                    w-full h-11 px-4 border-[1.5px] border-[#E5E7EB] rounded-xl
                    text-sm outline-none focus:border-[#1A3BDB]
                    transition-colors placeholder:text-[#9CA3AF]
                  "
                                    placeholder={`Enter your ${label.toLowerCase()}`}
                                />
                            </div>
                        ))}
                        <button className="
              w-full h-12 bg-[#1A3BDB] hover:bg-[#1230B3]
              text-white font-bold rounded-xl text-[15px]
              transition-all duration-200
            ">
                            Submit Application
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}