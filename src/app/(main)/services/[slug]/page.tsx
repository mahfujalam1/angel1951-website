"use client";

import { useParams, useRouter } from "next/navigation";
import { coreServices, otherServices, serviceDetailsMap } from "@/constants/services";
import { ChevronLeft, ArrowRight, CheckCircle2, Zap, Shield, Clock, Globe } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export default function ServiceDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    // Combined services to find the current one
    const allServices = [...coreServices, ...otherServices];
    const serviceBase = allServices.find(s => s.slug === slug);
    const details = serviceDetailsMap[slug] || serviceDetailsMap["air-cargo"]; // Fallback to air-cargo if not found

    if (!serviceBase) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Service Not Found</h1>
                    <Link href="/" className="text-primary hover:underline flex items-center justify-center gap-2">
                        <ChevronLeft size={20} /> Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const Icon = serviceBase.icon;

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden -mt-4">
                <img
                    src={details.image}
                    alt={serviceBase.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

                <div className="relative max-w-7xl mx-auto px-6 md:px-10 w-full pt-20">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors group"
                    >
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Services</span>
                    </button>

                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 backdrop-blur-md rounded-full border border-primary/30 text-primary-light text-[10px] font-bold uppercase tracking-widest mb-4">
                        <Icon size={14} />
                        {serviceBase.tag}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                        {details.fullTitle}
                    </h1>

                    <p className="text-lg text-white/80 max-w-2xl leading-relaxed mb-8">
                        {serviceBase.desc}
                    </p>

                    <Link
                        href="/create"
                        className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold transition-all shadow-xl shadow-primary/20 hover:-translate-y-1 active:scale-95"
                    >
                        Ship Now <ArrowRight size={20} />
                    </Link>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Left: Detailed Info */}
                    <div className="lg:col-span-8">
                        <section className="mb-16">
                            <h2 className="text-3xl font-bold text-gray-800 mb-6 tracking-tight">Service Overview</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                {details.detailedDesc}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                                {details.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-primary/30 transition-colors">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-transform group-hover:scale-110">
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <span className="text-gray-700 font-semibold">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-2xl font-bold text-gray-800 mb-8 border-l-4 border-primary pl-4">How it Works</h3>
                            <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-gray-100">
                                {details.process.map((step, i) => (
                                    <div key={i} className="relative pl-12">
                                        <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold text-gray-400 z-10 transition-colors group hover:border-primary hover:text-primary">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h4>
                                            <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right: Sidebar / Why Us */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32 space-y-8">
                            <div className="bg-[#1A3BDB] rounded-3xl p-8 text-white shadow-2xl overflow-hidden relative group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 transform scale-150 group-hover:rotate-12 transition-transform">
                                    <Globe size={120} />
                                </div>
                                <h3 className="text-xl font-bold mb-6 relative z-10">Why Choose Buan Logistics?</h3>
                                <ul className="space-y-6 relative z-10">
                                    <li className="flex gap-4">
                                        <div className="mt-1 w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                                            <Shield size={16} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">Secure Handling</p>
                                            <p className="text-xs text-white/60 mt-1">Your goods are insured and handled by professionals.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="mt-1 w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                                            <Clock size={16} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">Timely Arrivals</p>
                                            <p className="text-xs text-white/60 mt-1">We respect timelines and ensure consistent schedules.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="mt-1 w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                                            <Zap size={16} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">Swift Support</p>
                                            <p className="text-xs text-white/60 mt-1">24/7 dedicated support for all your queries.</p>
                                        </div>
                                    </li>
                                </ul>

                                <Link
                                    href="/contact"
                                    className="block mt-10 text-center py-4 bg-white text-primary font-bold rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    Talk to an Expert
                                </Link>
                            </div>

                            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">Other Services</h3>
                                <div className="space-y-3">
                                    {allServices.slice(0, 5).filter(s => s.slug !== slug).map((s, i) => (
                                        <Link
                                            key={i}
                                            href={`/services/${s.slug}`}
                                            className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 hover:border-primary/50 transition-all group"
                                        >
                                            <span className="text-sm font-semibold text-gray-600 group-hover:text-primary transition-colors">{s.title}</span>
                                            <ArrowRight size={14} className="text-gray-300 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* CTA Banner */}
            <section className="bg-gray-50 py-20 mt-10">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">Ready to expand your business?</h2>
                    <p className="text-gray-500 text-lg mb-10">Get a custom quote today or start your shipment in minutes.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/create"
                            className="w-full sm:w-auto bg-primary text-white px-10 py-4 rounded-xl font-bold shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all"
                        >
                            Start Shipping
                        </Link>
                        <Link
                            href="/create"
                            className="w-full sm:w-auto bg-white border border-gray-200 text-gray-700 px-10 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all"
                        >
                            Get a Quote
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
