import { teamMembers } from "@/constants/team";
import SectionHeader from "@/components/common/SectionHeader";

const socialIcons = ["f", "𝕏", "⊙"];

export default function TeamSection() {
    return (
        <section className="py-20 bg-[#F3F6FF]">
            <div className="max-w-[1200px] mx-auto px-10">
                <SectionHeader tag="Teams" title="Meet Our Team" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teamMembers.map((member, i) => (
                        <div
                            key={i}
                            className="
                bg-white rounded-2xl px-5 py-7 text-center
                border border-[#E5E7EB]
                transition-all duration-250
                hover:shadow-[0_12px_40px_rgba(26,59,219,0.1)]
                hover:-translate-y-1
              "
                        >
                            <p className="
                text-[11px] font-bold text-[#1A3BDB]
                uppercase tracking-[1px] mb-3
              ">
                                {member.role}
                            </p>
                            <div className="
                w-18 h-18 rounded-full overflow-hidden
                border-[3px] border-[#1A3BDB]
                mx-auto mb-4
                w-[72px] h-[72px]
              ">
                                <img
                                    src={member.avatar}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="
                text-[17px] font-bold text-[#1F2937]
                font-sora mb-2.5
              ">
                                {member.name}
                            </h3>
                            <p className="text-[13px] text-[#6B7280] leading-relaxed mb-5">
                                Simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever
                                since the 1500s.
                            </p>
                            <div className="flex justify-center gap-2.5">
                                {socialIcons.map((icon, si) => (
                                    <button
                                        key={si}
                                        className="
                      w-8 h-8 rounded-lg
                      bg-[#F3F6FF] border border-[#E5E7EB]
                      flex items-center justify-center
                      text-[12px] text-[#6B7280]
                      hover:bg-[#1A3BDB] hover:text-white hover:border-[#1A3BDB]
                      transition-all duration-200
                    "
                                    >
                                        {icon}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}