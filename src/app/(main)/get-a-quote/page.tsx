"use client";

import AbroadToInternational from "@/components/create/InternationalForm";

export default function ShippingInformationPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Section */}
            <div className="bg-primary pt-24 pb-32 px-6 rounded-b-[3rem] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Request a Quote</h1>
                    <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
                        Fill out the details below to get an accurate estimate for your shipment. Our team will get back to you with the best rates.
                    </p>
                </div>
            </div>

            {/* Form Container */}
            <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-20 animate-fadeIn">
                <div className="bg-white rounded-3xl shadow-xl shadow-black/5 p-8 md:p-12 border border-gray-100">
                    <AbroadToInternational />
                </div>
            </div>
        </div>
    );
}
