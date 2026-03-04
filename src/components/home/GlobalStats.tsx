import { IMAGES } from "@/constants/index.image";
import { stats, countryFlags } from "@/constants/stats";

export default function GlobalStats() {
    return (
        <section className="relative w-full py-24 flex items-center my-20">

            {/* Background Map */}
            <img
                src={IMAGES.map.src}
                alt="World Map"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100/100 via-[#ffff]/70"></div>

            {/* Content */}
            <div className="relative z-10 max-w-[1200px] mx-auto px-10 w-full">
                <div className="max-w-[650px]">

                    <h2 className="text-[clamp(28px,3vw,38px)] font-extrabold text-[#1F2937] font-sora mb-4">
                        Global Network you Can Trust
                    </h2>

                    <p className="text-[15px] text-[#6B7280] leading-relaxed mb-10">
                        We've built a highly reliable logistics network connecting China to
                        Africa and beyond, ensuring safe and timely delivery.
                    </p>

                    {/* Stats Grid */}
                    <div className="md:flex gap-10 mb-12 bg-gray-100 p-8 rounded-md shadow-md text-center">
                        {stats.map((stat, i) => (
                            <div key={i}>
                                <p className="text-[40px] font-extrabold text-[#1A3BDB] font-sora leading-none">
                                    {stat.number}
                                </p>
                                <p className="text-[13px] text-[#6B7280] mt-2">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Flags */}
                    <div className="flex flex-wrap gap-3">
                        {countryFlags.map((flag, i) => (
                            <div
                                key={i}
                                className="w-24 h-12 rounded overflow-hidden border border-[#E5E7EB] bg-white"
                            >
                                <img
                                    src={flag.url}
                                    alt={flag.code}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}