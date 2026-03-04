import { IMAGES } from "@/constants/index.image";
import { warehouseFeatures } from "@/constants/stats";
import { CheckCircle } from "lucide-react";

export default function WarehouseSection() {
    return (
        <section className="relative w-full h-[600px] flex items-center ">

            {/* Background Image */}
            <img
                src={IMAGES.warehouse.src}
                alt="Warehouse"
                className="absolute inset-0 w-full h-full object-cover pt-10"
            />

            {/* Left Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/55 to-white/0 "></div>

            {/* Content Wrapper */}
            <div className="relative z-10 max-w-[1200px] mx-auto w-full px-10">
                <div className="max-w-[550px]">

                    <h2 className="text-[clamp(28px,3vw,38px)] font-extrabold text-[#1F2937] font-sora leading-[1.2] mb-4">
                        Leading the Feature of <br />
                        <span className="text-[#1A3BDB]">
                            Warehouse Technology
                        </span>
                    </h2>

                    <p className="text-[15px] text-[#6B7280] leading-relaxed mb-8">
                        Comprehensive solutions for all your shipping and logistics needs.
                    </p>

                    <ul className="flex flex-col gap-4">
                        {warehouseFeatures.map((feature, i) => (
                            <li
                                key={i}
                                className="flex items-center gap-3 text-[15px] text-[#1F2937]"
                            >
                                <span className="w-5 h-5 min-w-[20px] rounded-full bg-[#1A3BDB] flex items-center justify-center">
                                    <CheckCircle size={12} color="white" />
                                </span>
                                {feature}
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
        </section>
    );
}