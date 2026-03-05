"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { OutPartnerFormData } from "@/types/hubPartner.types";
import OutPartnerViewDetails from "./OutPartnerViewDetails";
import PartnerShopDetailsSection from "./PartnerShopDetailsSection";
import AuthorizedContactSection from "./AuthorizedContactSection";
import BusinessCargoSection from "./BusinessCargoSection";
import RequestedServicesSection from "./RequestedServicesSection";
import PartnerSpaceImageSection from "./PartnerSpaceImageSection";

export default function OutPartnerPage() {
    const [submitted, setSubmitted] = useState(false);
    const [savedData, setSavedData] = useState<OutPartnerFormData | null>(null);

    const methods = useForm<OutPartnerFormData>({
        defaultValues: {
            legalName: "",
            tradingName: "",
            registrationNumber: "",
            countryOfRegistration: "",
            registeredAddress: "",
            yearsInOperation: "",
            contactFullName: "",
            contactPosition: "",
            contactPhone: "",
            contactEmail: "",
            companyWebsite: "",
            natureOfBusiness: [],
            countriesOperateFrom: "",
            countriesShipTo: "",
            primaryCargoTypes: [],
            estimatedMonthlyVolume: "",
            handledDelivery: "No",
            willingToCommit: "No",
            servicesRequired: "",
            countriesShipToService: "",
            imagePreviews: [],
        },
    });

    const onSubmit = (data: OutPartnerFormData) => {
        console.log("Out Partner FormData:", data);
        if (typeof window !== "undefined") {
            localStorage.setItem("role", "partner");
        }
        setSavedData(data);
        setSubmitted(true);
    };

    const handleEdit = () => {
        setSubmitted(false);
    };

    if (submitted && savedData) {
        return <OutPartnerViewDetails data={savedData} onEdit={handleEdit} />;
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

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-inter">
                            Become a Business Partner
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
                        <PartnerShopDetailsSection />
                        <AuthorizedContactSection />
                        <BusinessCargoSection />
                        <RequestedServicesSection />
                        <PartnerSpaceImageSection />

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