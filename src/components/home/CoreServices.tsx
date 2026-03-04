import ServicesSection from "@/components/services/ServicesSection";
import { coreServices } from "@/constants/services";

export default function CoreServices() {
    return (
        <ServicesSection
            tag="Services"
            title="Our Core Services"
            subtitle="Comprehensive Solution for all your shipping and logistics needs."
            services={coreServices}
            bgColor="#ffffff"
        />
    );
}