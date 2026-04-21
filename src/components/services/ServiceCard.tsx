import { Service } from "@/types/service.types";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ServiceCardProps {
    service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
    const router = useRouter();
    const Icon = service.icon;

    return (
        <Link
            href={`/services/${service.slug || "#"}`}
            className="flex no-underline group"
        >
            <div
                className="
                    flex items-stretch
                    w-full
                    bg-[#F3F4F6]
                    shadow-md
                    transition-all duration-300
                    hover:shadow-2xl
                    hover:-translate-y-1
                    cursor-pointer
                    group
                "
            >
            {/* Left Icon Box */}
            <div
                className="
                    w-[90px] min-w-[90px]
                    bg-[#0083D3]
                    flex items-center justify-center
                    text-white
                "
            >
                <Icon size={36} strokeWidth={1.5} />
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
        </Link>
    );
}