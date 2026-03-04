import { Star, TrendingUp, Globe, HeadphonesIcon } from "lucide-react";
import Link from "next/link";

const partnerTypes = [
    {
        icon: <Globe size={28} className="text-[#1A3BDB]" />,
        title: "Freight Partner",
        desc: "Connect your freight business with our network. Co-handle shipments and earn on every delivery.",
    },
    {
        icon: <TrendingUp size={28} className="text-[#1A3BDB]" />,
        title: "Referral Partner",
        desc: "Refer clients to Buan Enterprise and earn a commission for every successful shipment booked.",
    },
    {
        icon: <Star size={28} className="text-[#1A3BDB]" />,
        title: "Technology Partner",
        desc: "Integrate your logistics tech with our platform. Build on our API and grow together.",
    },
    {
        icon: <HeadphonesIcon size={28} className="text-[#1A3BDB]" />,
        title: "Support Partner",
        desc: "Provide last-mile delivery and customer support services in your local market.",
    },
];

export default function BecomePartnerPage() {
    return (
        <div className="animate-fadeIn">

            {/* Hero */}
            <section className="bg-gradient-to-br from-[#0D1117] to-[#1A3BDB] py-24 px-6 text-white text-center">
                <div className="max-w-[640px] mx-auto">
                    <span className="
            inline-block px-4 py-1.5 bg-white/15 border border-white/25
            rounded-full text-[13px] font-semibold mb-5
          ">
                        🤝 Partnership Program
                    </span>
                    <h1 className="text-[clamp(32px,4vw,52px)] font-extrabold font-sora leading-[1.1] mb-5">
                        Become a Partner
                    </h1>
                    <p className="text-[16px] text-white/75 leading-relaxed mb-8">
                        Partner with Buan Enterprise and grow your business by connecting
                        your clients to our global logistics network spanning 100+ countries.
                    </p>
                    <Link
                        href="#partner-apply"
                        className="
              inline-flex items-center gap-2 px-8 py-3.5
              bg-[#F5A623] hover:bg-[#D4891A] text-white
              rounded-xl font-bold text-[15px] font-sora
              transition-all duration-200
            "
                    >
                        Partner With Us →
                    </Link>
                </div>
            </section>

            {/* Partner Types */}
            <section className="py-20 bg-white">
                <div className="max-w-[1100px] mx-auto px-10">
                    <div className="text-center mb-14">
                        <h2 className="text-[32px] font-extrabold text-[#1F2937] font-sora mb-3">
                            Types of Partnerships
                        </h2>
                        <p className="text-[15px] text-[#6B7280] max-w-[480px] mx-auto">
                            Choose the partnership model that works best for your business.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {partnerTypes.map((p, i) => (
                            <div key={i} className="
                p-7 border border-[#E5E7EB] rounded-2xl
                hover:border-[#1A3BDB] hover:shadow-[0_8px_32px_rgba(26,59,219,0.1)]
                hover:-translate-y-1 transition-all duration-250
              ">
                                <div className="w-14 h-14 bg-[#F3F6FF] rounded-xl flex items-center justify-center mb-4">
                                    {p.icon}
                                </div>
                                <h3 className="text-[18px] font-bold text-[#1F2937] font-sora mb-2">
                                    {p.title}
                                </h3>
                                <p className="text-[14px] text-[#6B7280] leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Apply Form */}
            <section id="partner-apply" className="py-20 bg-[#F3F6FF]">
                <div className="max-w-[560px] mx-auto px-6">
                    <div className="text-center mb-10">
                        <h2 className="text-[28px] font-extrabold text-[#1F2937] font-sora mb-2">
                            Start Your Partnership
                        </h2>
                        <p className="text-[14px] text-[#6B7280]">
                            Tell us about yourself and we'll find the right partnership model.
                        </p>
                    </div>
                    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm">
                        {["Full Name", "Company Name", "Email Address", "Website (optional)"].map((label) => (
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
                        <div className="mb-6">
                            <label className="text-sm font-semibold text-[#1F2937] mb-2 block">
                                Partnership Type
                            </label>
                            <select className="
                w-full h-11 px-4 border-[1.5px] border-[#E5E7EB] rounded-xl
                text-sm outline-none focus:border-[#1A3BDB]
                text-[#1F2937] bg-white transition-colors
              ">
                                {partnerTypes.map((p) => (
                                    <option key={p.title}>{p.title}</option>
                                ))}
                            </select>
                        </div>
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