"use client";

import { useState } from "react";
import { faqs } from "@/constants/faq";
import SectionHeader from "@/components/common/SectionHeader";

export default function FAQSection() {
    const [openIdx, setOpenIdx] = useState<number | null>(null);

    return (
        <section className="py-20 bg-white">
            <div className="max-w-[1200px] mx-auto px-10">
                <SectionHeader
                    tag="FAQs"
                    title="Frequently Asked Questions"
                    subtitle="Find answers to common questions about our warehouse management solutions. Can't find what you're looking for? Our support team is here to help."
                />

                <div className="max-w-[720px] mx-auto flex flex-col gap-3">
                    {faqs.map((faq, i) => {
                        const isOpen = openIdx === i;
                        return (
                            <div
                                key={i}
                                className={`
                  border rounded-xl overflow-hidden transition-all duration-200
                  ${isOpen
                                        ? "border-[#1A3BDB]"
                                        : "border-[#E5E7EB] hover:border-[#1A3BDB]/40"
                                    }
                `}
                            >
                                {/* Question */}
                                <button
                                    onClick={() => setOpenIdx(isOpen ? null : i)}
                                    className={`
                    w-full flex items-center justify-between
                    px-5 py-4 text-left transition-colors duration-200
                    font-sora font-semibold text-[15px]
                    ${isOpen
                                            ? "bg-[#F3F6FF] text-[#1A3BDB]"
                                            : "bg-white text-[#1F2937] hover:bg-[#F3F6FF]"
                                        }
                  `}
                                >
                                    {faq.q}
                                    <span className={`
                    w-7 h-7 rounded-full border-2 flex-shrink-0
                    flex items-center justify-center
                    text-base font-bold ml-4
                    transition-all duration-300
                    ${isOpen
                                            ? "bg-[#1A3BDB] border-[#1A3BDB] text-white rotate-45"
                                            : "border-[#E5E7EB] text-[#6B7280]"
                                        }
                  `}>
                                        +
                                    </span>
                                </button>

                                {/* Answer */}
                                <div className={`
                  overflow-hidden transition-all duration-400
                  ${isOpen ? "max-h-[200px]" : "max-h-0"}
                `}>
                                    <p className="px-5 pb-5 text-[14px] text-[#6B7280] leading-relaxed">
                                        {faq.a}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}