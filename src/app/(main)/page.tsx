'use client'
import CoreServices from "@/components/home/CoreServices";
import FAQSection from "@/components/home/FAQSection";
import GlobalStats from "@/components/home/GlobalStats";
import HeroSlider from "@/components/home/HeroSlider";
import OtherServices from "@/components/home/OtherServices";
import TeamSection from "@/components/home/TeamSection";
import Testimonials from "@/components/home/Testimonials";
import WarehouseSection from "@/components/home/WarehouseSection";
import HubDashboardPage from "@/components/hub-dashboard/HubDashboardPage";
import PartnerDashboard from "@/components/partner-dashboard/PartnerDashboard";
import { useEffect, useState } from "react";

export default function HomePage() {
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const role = localStorage.getItem("role");
        setUserRole(role); // no fallback ""
    }, []);

    // Loading state (first render)
    if (userRole === null) {
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

    if (userRole === "hubProvider")
        return <div className="mt-16"><HubDashboardPage /></div>;

    if (userRole === "partner")
        return <div className="mt-16"><PartnerDashboard /></div>;

    // ✅ If role not found in localStorage
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