"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Toast from "@/components/common/Toast";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const isHome = pathname === "/";

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className={`${!isHome ? "mt-24" : ""} flex-1`}>
                {children}
            </main>
            <Footer />
            <Toast />
        </div>
    );
}