import { Service } from "@/types/service.types";

interface ServiceCardProps {
    service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
    return (
        <div
            className="
      flex items-stretch
      bg-[#F3F4F6]
      shadow-md
      transition-all duration-300
      hover:shadow-lg
      cursor-pointer
    "
        >
            {/* Left Icon Box */}
            <div
                className="
        w-[90px] min-w-[90px]
        bg-[#0083D3]
        flex items-center justify-center
        text-white text-4xl
      "
            >
                {service.icon}
            </div>

            {/* Right Content */}
            <div className="p-3">
                <h3
                    className="
          text-[12px] font-semibold
          text-[#0083D3]
          mb-1
        "
                >
                    {service.title}
                </h3>

                <p
                    className="
          text-[11px] uppercase
          text-[#6B7280]
          tracking-wider
          font-semibold
          mb-2
        "
                >
                    {service.tag}
                </p>

                <p
                    className="
          text-[13px]
          text-[#4B5563]
          leading-relaxed
          max-w-[420px]
        "
                >
                    {service.desc}
                </p>
            </div>
        </div>
    );
}