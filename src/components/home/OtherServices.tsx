import ServicesSection from "@/components/services/ServicesSection";
import { otherServices } from "@/constants/services";

export default function OtherServices() {
    return (
        <ServicesSection
            tag="Services"
            title="Our Others Services"
            subtitle="Comprehensive Solution for all your shipping and logistics needs."
            services={otherServices}
            bgColor="#FAFBFF"
        />
    );
}