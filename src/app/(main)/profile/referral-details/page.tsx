"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, Gift, Calendar, ArrowRight, User, Hash, Info, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Suspense, useState, useEffect } from "react";

function ReferralDetailsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const date = searchParams.get("date") || "N/A";
    const activity = searchParams.get("activity") || "Referral Activity";
    const points = searchParams.get("points") || "0";
    const status = searchParams.get("status") || "Unknown";

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20 font-sans">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
                <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center gap-4">
                    <button 
                        onClick={() => router.back()}
                        className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                    >
                        <ChevronLeft size={20} className="text-gray-600" />
                    </button>
                    <h1 className="text-base font-bold text-gray-800 tracking-tight">Referral Transaction Details</h1>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 mt-8">
                {/* Main Detail Card */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-6">
                    <div className="bg-primary p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-10">
                            <Gift size={120} />
                        </div>
                        <div className="relative z-10">
                            <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">Benefit Earned</p>
                            <h2 className="text-4xl font-black mb-1">{points} Points</h2>
                            <p className="text-white/80 font-medium">{activity}</p>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                                    <Calendar size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-0.5 tracking-wider">Transaction Date</p>
                                    <p className="text-sm font-semibold text-gray-800">{date}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                                    <ShieldCheck size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-0.5 tracking-wider">Verification Status</p>
                                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                        status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                    }`}>
                                        {status}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                                    <User size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-0.5 tracking-wider">Account Involved</p>
                                    <p className="text-sm font-semibold text-gray-800">Verified Client</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                                    <Hash size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-0.5 tracking-wider">Reference ID</p>
                                    <p className="text-sm font-semibold text-gray-800">
                                        {mounted ? `#REF-${Math.floor(Math.random() * 100000)}` : "Loading..."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-50 pt-8 mt-4">
                            <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <Info size={16} className="text-primary" />
                                Transaction Notes
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                This reward was processed on <strong>{date}</strong> following a successful <strong>{activity}</strong>. 
                                The points have been credited to your loyalty balance and are currently <strong>{status}</strong>. 
                                Points categorized as 'Active' can be redeemed against your future shipments. 
                                For any discrepancies, please reach out via our support channel.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center px-2">
                    <button 
                        onClick={() => router.back()}
                        className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        Back to List
                    </button>
                    <Link 
                        href="/profile"
                        className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline group"
                    >
                        My Profile 
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function ReferralDetailsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-sans">Loading details...</div>}>
            <ReferralDetailsContent />
        </Suspense>
    );
}
