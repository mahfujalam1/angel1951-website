import SectionHeader from "@/components/common/SectionHeader";
import ServiceCard from "./ServiceCard";
import { Service } from "@/types/service.types";

interface ServicesSectionProps {
    tag: string;
    title: string;
    subtitle: string;
    services: Service[];
    bgColor?: string;
}

export default function ServicesSection({
    tag,
    title,
    subtitle,
    services,
    bgColor = "#ffffff",
}: ServicesSectionProps) {
    return (
        <section style={{ background: bgColor }} className="py-20 mt-10">
            <div className="max-w-[1200px] mx-auto px-10">
                <SectionHeader
                    tag={tag}
                    tagIcon="🚚"
                    title={title}
                    subtitle={subtitle}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, i) => (
                        <ServiceCard key={i} service={service} />
                    ))}
                </div>
            </div>
        </section>
    );
}