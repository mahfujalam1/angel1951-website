"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Link from "next/link";
import { OutPartnerFormData } from "@/types/hubPartner.types";
import OutPartnerViewDetails from "./OutPartnerViewDetails";
import PartnerShopDetailsSection from "./PartnerShopDetailsSection";
import AuthorizedContactSection from "./AuthorizedContactSection";
import BusinessCargoSection from "./BusinessCargoSection";
import RequestedServicesSection from "./RequestedServicesSection";
import PartnerSpaceImageSection from "./PartnerSpaceImageSection";

export default function OutPartnerPage({ role }: { role?: string }) {
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

  const getRoleTitle = () => {
    switch (role) {
      case "corporate":
        return "Become a Corporate Partner";
      case "personalizedCargo":
        return "Become a Personalized Cargo Customer (T-3)";
      case "business":
        return "Become a Business Customer (T-2)";
      default:
        return "Become a Business Partner";
    }
  };

  const getRoleDescription = () => {
    switch (role) {
      case "corporate":
        return "Become a Corporate Partner to integrate our logistics solutions into your supply chain. Please fill out the information below accurately.";
      case "personalizedCargo":
        return "Apply for Personalized Cargo status to manage large scale imports and FCL shipments. Please fill out the information below accurately.";
      case "business":
        return "Apply for Business Customer status for volume discounts and dedicated support. Please fill out the information below accurately.";
      default:
        return "Sign up your shop to become pickup hub partner. Please fill out the information below accurately.";
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen font-inter py-10">
        <div className="max-w-6xl mx-auto px-4 ">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-inter">
              {getRoleTitle()}
            </h1>
            <p className="text-sm sm:text-base text-gray-500 mt-2 max-w-md mx-auto leading-relaxed">
              {getRoleDescription()}
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
              <Link
                href="/login"
                className="text-primary font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </FormProvider>
  );
}
