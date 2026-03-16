"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, Pencil } from "lucide-react";
import { OutPartnerFormData } from "@/types/hubPartner.types";
import SectionCard from "../common/SectionCard";

interface ViewDetailsProps {
    data: OutPartnerFormData;
    onEdit: () => void;
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3 py-2 border-b border-gray-50 last:border-0">
            <span className="text-sm font-semibold text-gray-600 sm:w-56 shrink-0">{label}</span>
            <span className="text-sm text-gray-800">{value}</span>
        </div>
    );
}

export default function OutPartnerViewDetails({ data, onEdit }: ViewDetailsProps) {
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
                            {data.legalName || "Company Name"}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">Registered Since Feb 20 2022.</p>
                        <p className="text-sm text-gray-500">
                            Approved by Sophial Tan Admin on Feb 31 2022.
                        </p>
                    </div>
                    <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-indigo-100 rounded-2xl flex items-center justify-center">
                        <span className="text-4xl">🏢</span>
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    {/* 1. Shop Details */}
                    <SectionCard number={1} title="Business Details:">
                        <div className="flex flex-col">
                            <DetailRow label="Legal Name" value={<strong>{data.legalName}</strong>} />
                            <DetailRow label="Trading Name" value={data.tradingName || "—"} />
                            <DetailRow label="Registration Number" value={data.registrationNumber} />
                            <DetailRow label="Country of Registration" value={data.countryOfRegistration} />
                            <DetailRow label="Registered Address" value={data.registeredAddress} />
                            <DetailRow label="Years in Operation" value={data.yearsInOperation || "—"} />
                        </div>
                    </SectionCard>

                    {/* 2. Authorized Contact */}
                    <SectionCard number={2} title="Authorized Contact Person:">
                        <div className="flex flex-col">
                            <DetailRow label="Full Name:" value={data.contactFullName} />
                            <DetailRow label="Position / Title:" value={data.contactPosition} />
                            <DetailRow label="Phone Number:" value={data.contactPhone} />
                            <DetailRow label="Email Address:" value={data.contactEmail} />
                            <DetailRow label="Website / Social:" value={data.companyWebsite || "—"} />
                        </div>
                    </SectionCard>

                    {/* 3. Business & Cargo */}
                    <SectionCard number={3} title="Business & Cargo Profile:">
                        <div className="flex flex-col">
                            <DetailRow
                                label="Nature of Business:"
                                value={data.natureOfBusiness?.join(", ") || "—"}
                            />
                            <DetailRow label="Countries Operate From:" value={data.countriesOperateFrom} />
                            <DetailRow label="Countries Ship To:" value={data.countriesShipTo} />
                            <DetailRow
                                label="Primary Cargo Types:"
                                value={data.primaryCargoTypes?.join(", ") || "—"}
                            />
                            <DetailRow label="Monthly Volume:" value={data.estimatedMonthlyVolume || "—"} />
                        </div>
                    </SectionCard>

                    {/* 4. Requested Services */}
                    {/* <SectionCard number={4} title="Requested Overseas Services:">
                        <div className="flex flex-col">
                            <DetailRow
                                label="Handled Delivery Before:"
                                value={data.handledDelivery || "—"}
                            />
                            <DetailRow
                                label="Willing to Commit 6 months:"
                                value={data.willingToCommit || "—"}
                            />
                            <DetailRow label="Services Required:" value={data.servicesRequired || "—"} />
                            <DetailRow label="Countries Ship To:" value={data.countriesShipToService || "—"} />
                        </div>
                    </SectionCard> */}

                    {/* 5. Space Images */}
                    {(data.imagePreviews ?? []).length > 0 && (
                        <SectionCard number={5} title="Space Image:">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {data.imagePreviews.map((src, i) => (
                                    <div
                                        key={i}
                                        className="aspect-square rounded-xl overflow-hidden border border-gray-200 shadow-sm"
                                    >
                                        <img src={src} alt={`Space ${i + 1}`} className="w-full h-full object-cover" />
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