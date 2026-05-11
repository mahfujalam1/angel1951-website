// ContainerCustomerPage.tsx
"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import { ContainerCustomerFormData } from "@/types/customerForms.types";
import PartnerShopDetailsSection from "./PartnerShopDetailsSection";
import AuthorizedContactSection from "./AuthorizedContactSection";
import BusinessCargoSection from "./BusinessCargoSection";
import RequestedServicesSection from "./RequestedServicesSection";
import PartnerSpaceImageSection from "./PartnerSpaceImageSection";
import OutPartnerViewDetails from "./OutPartnerViewDetails";

export default function ContainerCustomerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [savedData, setSavedData] = useState<ContainerCustomerFormData | null>(null);

  const methods = useForm<ContainerCustomerFormData>({
    defaultValues: {
      legalName: "",
      tradingName: "",
      registrationNumber: "",
      countryOfRegistration: "",
      registeredAddress: "",
      contactFullName: "",
      contactPosition: "",
      contactPhone: "",
      contactEmail: "",
      containerSize: [],
      shippingFrequency: "",
      primaryCargoTypes: [],
      originCountry: "",
      destinationCountry: "",
      imagePreviews: [],
    },
  });

  const onSubmit = (data: ContainerCustomerFormData) => {
    console.log("Container Customer FormData:", data);
    if (typeof window !== "undefined") {
      localStorage.setItem("role", "containerCustomer");
    }
    setSavedData(data);
    setSubmitted(true);
  };

  const handleEdit = () => {
    setSubmitted(false);
  };

  if (submitted && savedData) {
    return <OutPartnerViewDetails data={savedData as any} onEdit={handleEdit} />;
  }

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen font-inter py-10">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-inter">
              Become a Container Customer (Tier 3)
            </h1>
            <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto leading-relaxed">
              Apply for Container Customer status to manage large‑scale imports and FCL shipments. Please fill out the information below accurately.
            </p>
          </div>

          <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
              Already have account?{' '}
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
