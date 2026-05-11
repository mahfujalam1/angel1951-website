"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Link from "next/link";

import { OutPartnerFormData } from "@/types/hubPartner.types";
import OutPartnerViewDetails from "./OutPartnerViewDetails";
import PartnerShopDetailsSection from "./PartnerShopDetailsSection";
import AuthorizedContactSection from "./AuthorizedContactSection";
import RequestedServicesSection from "./RequestedServicesSection";
import PartnerSpaceImageSection from "./PartnerSpaceImageSection";

export default function CorporatePartnerPage({ role }: { role?: string }) {
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
    console.log("Corporate Partner FormData:", data);
    if (typeof window !== "undefined") {
      localStorage.setItem("role", "corporatePartner");
    }
    setSavedData(data);
    setSubmitted(true);
  };

  const handleEdit = () => setSubmitted(false);

  if (submitted && savedData) {
    return <OutPartnerViewDetails data={savedData} onEdit={handleEdit} />;
  }

  const getTitle = () => "Become a Corporate Partner (Local Logistics)";
  const getDescription = () =>
    "Your local logistics company drops parcels to Buan, which ships them internationally. Payment is handled off‑platform via your own agreement with Buan. Please provide your business details below.";

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen font-inter py-10">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{getTitle()}</h1>
            <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">{getDescription()}</p>
          </div>

          <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <PartnerShopDetailsSection />
            <AuthorizedContactSection />
            <RequestedServicesSection />
            <PartnerSpaceImageSection />

            {/* Register button */}
            <div className="flex justify-center mt-2">
              <button
                type="submit"
                className="bg-primary text-white text-sm sm:text-base font-semibold px-12 py-3 rounded-full hover:opacity-90 active:scale-95 transition-all shadow-md w-full sm:w-auto min-w-[200px]"
              >
                Register
              </button>
            </div>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{' '}
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
