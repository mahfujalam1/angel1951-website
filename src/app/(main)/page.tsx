import HeroSlider from "@/components/home/HeroSlider";
import CoreServices from "@/components/home/CoreServices";
import OtherServices from "@/components/home/OtherServices";
import WarehouseSection from "@/components/home/WarehouseSection";
import GlobalStats from "@/components/home/GlobalStats";
import Testimonials from "@/components/home/Testimonials";
import TeamSection from "@/components/home/TeamSection";
import FAQSection from "@/components/home/FAQSection";

export default function HomePage() {
    return (
        <>
            <HeroSlider />
            <CoreServices />
            <OtherServices />
            <WarehouseSection />
            <GlobalStats />
            <Testimonials />
            <TeamSection />
            <FAQSection />
        </>
    );
}