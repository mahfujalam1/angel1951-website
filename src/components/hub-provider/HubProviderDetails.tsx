"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, Pencil } from "lucide-react";
import { HubProviderFormData } from "@/types/hubProvider.types";
import SectionCard from "../common/SectionCard";

interface ViewDetailsProps {
    data: HubProviderFormData;
    onEdit: () => void;
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3 py-2 border-b border-gray-50 last:border-0">
            <span className="text-sm font-semibold text-gray-600 sm:w-52 shrink-0">
                {label}
            </span>
            <span className="text-sm text-gray-800">{value}</span>
        </div>
    );
}

export default function HubProviderViewDetails({ data, onEdit }: ViewDetailsProps) {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Back */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-primary transition-colors mb-6"
                >
                    <ChevronLeft size={16} />
                    HUb Details
                </button>

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            {data.shopName || "John's Provision Store"}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">Registered Since Feb 20 2022.</p>
                        <p className="text-sm text-gray-500">
                            Approved by Sophial Tan Admin on Feb 31 2022.
                        </p>
                    </div>
                    <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-indigo-100 rounded-2xl flex items-center justify-center">
                        {/* Store illustration placeholder */}
                        <span className="text-4xl">🏪</span>
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    {/* 1. Shop Details */}
                    <SectionCard number={1} title="Shop Details:">
                        <div className="flex flex-col">
                            <DetailRow label="Shop Name" value={<strong>{data.shopName}</strong>} />
                            <DetailRow
                                label="Business Type"
                                value={data.businessTypes?.join(", ") || "—"}
                            />
                            <DetailRow label="Full Address" value={data.fullAddress} />
                            <DetailRow label="Landmark" value={data.landmark} />
                            <DetailRow label="City State" value={data.cityState} />
                            <DetailRow label="555 Contact Number" value={data.shopContact} />
                            <DetailRow label="Email" value={data.shopEmail} />
                        </div>
                    </SectionCard>

                    {/* 2. Owner Details */}
                    <SectionCard number={2} title="Owner / Manager Details:">
                        <div className="flex flex-col">
                            <DetailRow label="Full Name:" value={data.ownerName} />
                            <DetailRow label="Phone Number:" value={data.shopContact} />
                            <DetailRow label="Email Address:" value={data.ownerEmail} />
                        </div>
                    </SectionCard>

                    {/* 3. Shop Operations */}
                    <SectionCard number={3} title="Shop Operations:">
                        <div className="flex flex-col">
                            <DetailRow
                                label="Opening Days:"
                                value={
                                    <div className="flex flex-wrap gap-2">
                                        {(data.workingDays ?? []).map((d) => (
                                            <span
                                                key={d}
                                                className="inline-flex items-center gap-1 text-xs font-medium text-primary"
                                            >
                                                <span className="w-3.5 h-3.5 rounded-sm border-2 border-primary flex items-center justify-center">
                                                    <span className="w-1.5 h-1.5 bg-primary rounded-sm" />
                                                </span>
                                                {d}
                                            </span>
                                        ))}
                                    </div>
                                }
                            />
                            <DetailRow
                                label="Opening Hours:"
                                value={`${data.operatingFrom || "08:00 AM"} to ${data.operatingTo || "03:00 PM"}`}
                            />
                            <DetailRow
                                label="Number of Staff on Duty Daily:"
                                value={data.staffMin && data.staffMax ? `${data.staffMin}–${data.staffMax}` : data.staffMin || "02"}
                            />
                            <DetailRow label="Secure for Parcels:" value="Yes" />
                            <DetailRow
                                label="Approx. Daily Foot Traffic:"
                                value={data.footTraffic || "50-100"}
                            />
                        </div>
                    </SectionCard>

                    {/* 5. Experience */}
                    <SectionCard number={5} title="Experience & Commitment:">
                        <div className="flex flex-col gap-2">
                            <p className="text-sm text-gray-700">
                                {data.handledDelivery === "Yes"
                                    ? "Used to handle delivery and logistics services."
                                    : "No delivery or logistics experience."}
                            </p>
                            <p className="text-sm text-gray-700">
                                {data.willingToCommit === "Yes"
                                    ? "Willing to commit as pickup hub for at least 6 months."
                                    : "Not willing to commit for 6 months."}
                            </p>
                            {data.comments && (
                                <p className="text-sm text-gray-700">{data.comments}</p>
                            )}
                        </div>
                    </SectionCard>

                    {/* 6. Space Images */}
                    {(data.imagePreviews ?? []).length > 0 && (
                        <SectionCard number={6} title="Space Image:">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {data.imagePreviews.map((src, i) => (
                                    <div
                                        key={i}
                                        className="aspect-square rounded-xl overflow-hidden border border-gray-200 shadow-sm"
                                    >
                                        <img
                                            src={src}
                                            alt={`Space ${i + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </SectionCard>
                    )}
                </div>

                {/* Edit Button */}
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={onEdit}
                        className="flex items-center gap-2 bg-primary text-white text-sm font-semibold px-8 py-3 rounded-full hover:opacity-90 active:scale-95 transition-all shadow-md"
                    >
                        <Pencil size={15} />
                        Edit Details
                    </button>
                </div>
            </div>
        </div>
    );
}