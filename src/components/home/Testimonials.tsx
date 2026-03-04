"use client";

import { useState } from "react";
import { testimonials } from "@/constants/testimonials";
import SectionHeader from "@/components/common/SectionHeader";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
    const [idx, setIdx] = useState(0);
    const current = testimonials[idx];

    const prev = () => setIdx((idx - 1 + testimonials.length) % testimonials.length);
    const next = () => setIdx((idx + 1) % testimonials.length);

    return (
        <section className="py-20 bg-white">
            <div className="max-w-[1200px] mx-auto px-10">
                <SectionHeader
                    tag="Client Testimonials"
                    title="What Our Client Say"
                    subtitle="Discover why industry leaders trust our warehouse management solutions to optimize their operations and drive exceptional results."
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image */}
                    <div className="rounded-2xl overflow-hidden h-[420px]">
                        <img
                            src={current.avatar}
                            alt={current.name}
                            className="w-full h-full object-fit"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <div className="text-[52px] text-[#1A3BDB] font-serif leading-none mb-4">
                            "
                        </div>
                        <p className="text-[17px] text-[#1F2937] leading-[1.8] mb-8 italic">
                            {current.quote}
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-4 pb-6 border-b border-[#E5E7EB]">
                            <div className="
                w-12 h-12 rounded-full overflow-hidden
                border-2 border-[#1A3BDB]
              ">
                                <img
                                    src={current.avatar}
                                    alt={current.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-bold text-[15px] text-[#1F2937] font-sora">
                                    {current.name}
                                </p>
                                <p className="text-[13px] text-[#6B7280]">
                                    {current.role} — {current.company}
                                </p>
                            </div>
                        </div>

                        {/* Nav Buttons */}
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={prev}
                                className="
                  w-11 h-11 rounded-full border-2 border-[#E5E7EB]
                  flex items-center justify-center text-[#1F2937]
                  hover:border-[#1A3BDB] hover:text-[#1A3BDB]
                  transition-all duration-200
                "
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={next}
                                className="
                  w-11 h-11 rounded-full border-2 border-[#E5E7EB]
                  flex items-center justify-center text-[#1F2937]
                  hover:border-[#1A3BDB] hover:text-[#1A3BDB]
                  transition-all duration-200
                "
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}