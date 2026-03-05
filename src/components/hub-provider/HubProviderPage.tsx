"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { HubProviderFormData } from "@/types/hubProvider.types";
import HubProviderViewDetails from "./HubProviderDetails";
import ShopDetailsSection from "./ShopDetailsSection";
import OwnerDetailsSection from "./OwnerDetailsSection";
import ShopOperationsSection from "./ShopOperationsSection";
import ExperienceSection from "./ExperienceSection";
import SpaceImageSection from "./SpaceImageSection";
export default function HubProviderPage() {
    const [submitted, setSubmitted] = useState(false);
    const [savedData, setSavedData] = useState<HubProviderFormData | null>(null);

    const methods = useForm<HubProviderFormData>({
        defaultValues: {
            shopName: "",
            businessTypes: [],
            fullAddress: "",
            landmark: "",
            cityState: "",
            shopContact: "",
            shopEmail: "",
            ownerName: "",
            ownerEmail: "",
            preferredContact: [],
            workingDays: [],
            operatingFrom: "",
            operatingTo: "",
            staffMin: "",
            staffMax: "",
            footTraffic: "",
            handledDelivery: "No",
            willingToCommit: "No",
            comments: "",
            imagePreviews: [],
        },
    });

    const onSubmit = (data: HubProviderFormData) => {
        console.log("Hub Provider FormData:", data);
        // Set role in localStorage
        if (typeof window !== "undefined") {
            localStorage.setItem("role", "hubProvider");
        }
        setSavedData(data);
        setSubmitted(true);
    };

    const handleEdit = () => {
        setSubmitted(false);
    };

    // Show View Details after registration
    if (submitted && savedData) {
        return <HubProviderViewDetails data={savedData} onEdit={handleEdit} />;
    }

    return (
        <FormProvider {...methods}>
            <div className="min-h-screen bg-gray-50 font-inter">
                <div className="max-w-6xl mx-auto px-4 py-10">

                    {/* Back */}
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-primary transition-colors mb-6"
                    >
                        <ChevronLeft size={16} />
                        Back
                    </button>

                    {/* Page Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-inter">
                            Become a Out Hub Provider
                        </h1>
                        <p className="text-sm sm:text-base text-gray-500 mt-2 max-w-md mx-auto leading-relaxed">
                            Sign up your shop to become pickup hub partner. Please fill out the
                            information below accurately.
                        </p>
                    </div>

                    <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                        className="flex flex-col gap-5"
                    >
                        <ShopDetailsSection />
                        <OwnerDetailsSection />
                        <ShopOperationsSection />
                        <ExperienceSection />
                        <SpaceImageSection />

                        {/* Register */}
                        <div className="flex justify-center mt-2">
                            <button
                                type="submit"
                                className="bg-primary text-white text-sm sm:text-base font-semibold px-12 py-3 rounded-full hover:opacity-90 active:scale-95 transition-all shadow-md w-full sm:w-auto min-w-[200px]"
                            >
                                Register
                            </button>
                        </div>

                        <p className="text-center text-sm text-gray-500">
                            Already have account?{" "}
                            <Link href="/login" className="text-primary font-semibold hover:underline">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </FormProvider>
    );
}