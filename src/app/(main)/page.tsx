'use client'
import CoreServices from "@/components/home/CoreServices";
import FAQSection from "@/components/home/FAQSection";
import GlobalStats from "@/components/home/GlobalStats";
import HeroSlider from "@/components/home/HeroSlider";
import OtherServices from "@/components/home/OtherServices";
import TeamSection from "@/components/home/TeamSection";
import Testimonials from "@/components/home/Testimonials";
import WarehouseSection from "@/components/home/WarehouseSection";

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