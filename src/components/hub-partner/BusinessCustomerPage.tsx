"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Link from "next/link";
import { OutPartnerFormData } from "@/types/hubPartner.types";
import SectionCard from "../common/SectionCard";
import FormInput from "../common/FormInput";
import OutPartnerViewDetails from "./OutPartnerViewDetails";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

export default function BusinessCustomerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [savedData, setSavedData] = useState<OutPartnerFormData | null>(null);

  const methods = useForm<OutPartnerFormData>({
    defaultValues: {
      contactFullName: "",
      legalName: "",
      tradingName: "",
      registrationNumber: "",
      countryOfRegistration: "",
      registeredAddress: "",
      contactEmail: "",
      contactPhone: "",
      socialMediaHandles: "",
      businessType: "",
      onlineOffline: "Online",
    },
  });

  const onSubmit = (data: OutPartnerFormData) => {
    console.log("Business Customer FormData:", data);
    setSavedData(data);
    setSubmitted(true);
  };

  const handleEdit = () => {
    setSubmitted(false);
  };

  if (submitted && savedData) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 animate-fadeIn">
        <div className="max-w-md w-full bg-white rounded-[3rem] p-10 border border-gray-100 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 size={40} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-gray-900 uppercase">Application Sent!</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Your Business Customer (Tier 2) application has been submitted successfully. Our compliance team will review your documents within 24-48 hours.
            </p>
          </div>
          <div className="pt-4 space-y-3">
             <Link 
              href="/dashboard"
              className="block w-full py-4 bg-blue-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-800 transition-all shadow-xl shadow-blue-100"
            >
              Go to Dashboard
            </Link>
            <button 
              onClick={handleEdit}
              className="block w-full py-4 bg-gray-50 text-gray-400 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-all"
            >
              Review My Submission
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen font-inter py-10">
        <div className="max-w-6xl mx-auto px-4 ">
          {/* Header */}
          <div className="text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest">
               <ShieldCheck size={14} /> Tier 2 Enrollment
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 font-inter tracking-tight">
              Become a Business Customer
            </h1>
            <p className="text-sm sm:text-base text-gray-500 max-w-lg mx-auto leading-relaxed">
              Unlock volume discounts, dedicated logistics support, and advanced shipment management tools.
            </p>
          </div>

          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <SectionCard number={1} title="Corporate & Identity Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
                <FormInput
                  label="Full Name of Authorized Person:"
                  placeholder="Enter full name"
                  error={methods.formState.errors.contactFullName?.message}
                  {...methods.register("contactFullName", { required: "Authorized person's name is required" })}
                />
                <FormInput
                  label="Legal Business / Company Name:"
                  placeholder="Enter legal company name"
                  error={methods.formState.errors.legalName?.message}
                  {...methods.register("legalName", { required: "Legal name is required" })}
                />
                <FormInput
                  label="Trading Name (if different):"
                  placeholder="Enter trading name"
                  {...methods.register("tradingName")}
                />
                <FormInput
                  label="Business Registration Number:"
                  placeholder="e.g. REG-12345678"
                  error={methods.formState.errors.registrationNumber?.message}
                  {...methods.register("registrationNumber", { required: "Registration number is required" })}
                />
                <FormInput
                  label="Country of Registration:"
                  placeholder="e.g. Philippines"
                  error={methods.formState.errors.countryOfRegistration?.message}
                  {...methods.register("countryOfRegistration", { required: "Country is required" })}
                />
                <FormInput
                  label="Registered Business Address:"
                  placeholder="Full physical address"
                  error={methods.formState.errors.registeredAddress?.message}
                  {...methods.register("registeredAddress", { required: "Business address is required" })}
                />
                <FormInput
                  label="Corporate Email Address:"
                  placeholder="name@company.com"
                  type="email"
                  error={methods.formState.errors.contactEmail?.message}
                  {...methods.register("contactEmail", { 
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                  })}
                />
                <FormInput
                  label="Business Phone Number:"
                  placeholder="+63 XXX XXX XXXX"
                  error={methods.formState.errors.contactPhone?.message}
                  {...methods.register("contactPhone", { required: "Phone number is required" })}
                />
                <FormInput
                  label="Social Media Handles / Website:"
                  placeholder="e.g. facebook.com/company"
                  {...methods.register("socialMediaHandles")}
                />
                <FormInput
                  label="Business Type (e.g. Retail, Wholesale):"
                  placeholder="Enter industry/type"
                  error={methods.formState.errors.businessType?.message}
                  {...methods.register("businessType", { required: "Business type is required" })}
                />
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
                  Operating Model:
                </label>
                <div className="flex flex-wrap gap-6">
                  {["Online", "Offline", "Both"].map((opt) => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        value={opt}
                        {...methods.register("onlineOffline")}
                        className="w-5 h-5 accent-blue-900 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm font-bold text-gray-700 group-hover:text-blue-900 transition-colors">{opt} Business</span>
                    </label>
                  ))}
                </div>
              </div>
            </SectionCard>

            {/* Terms & Submit */}
            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm space-y-6">
               <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  required
                  className="mt-1 w-5 h-5 accent-blue-900 rounded border-gray-300"
                />
                <span className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors">
                  I hereby certify that the information provided is true and accurate. I understand that Buan Logistics may request additional documentation for verification purposes. I agree to the <Link href="/terms-condition" className="text-blue-600 font-bold hover:underline">Business Terms of Service</Link>.
                </span>
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <button
                  type="submit"
                  className="bg-blue-900 text-white text-[11px] font-black uppercase tracking-[0.2em] px-12 py-4 rounded-2xl hover:bg-blue-800 active:scale-95 transition-all shadow-xl shadow-blue-100 w-full sm:w-auto min-w-[250px]"
                >
                  Submit Application
                </button>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  Process takes 2-3 business days
                </p>
              </div>
            </div>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-900 font-black hover:underline uppercase tracking-widest text-xs"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </FormProvider>
  );
}
