"use client";

import { OutPartnerFormData } from "@/types/hubPartner.types";
import { useFormContext } from "react-hook-form";
import SectionCard from "../common/SectionCard";
import FormInput from "../common/FormInput";


const YEARS_OPTIONS = [
    "Less than 1 year",
    "1–3 years",
    "3–5 years",
    "Over 5 years",
];

export default function PartnerShopDetailsSection() {
    const {
        register,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext<OutPartnerFormData>();

    const selected = watch("yearsInOperation");

    return (
        <SectionCard number={1} title="Shop Details:">
            <div className="flex flex-col gap-4">
                <FormInput
                    label="Legal Name of Company / Business:"
                    placeholder="Enter legal company name"
                    error={errors.legalName?.message}
                    {...register("legalName")}
                />
                <FormInput
                    label="Trading Name (if different):"
                    placeholder="Enter trading name"
                    error={errors.tradingName?.message}
                    {...register("tradingName")}
                />
                <FormInput
                    label="Business Registration Number:"
                    placeholder="Enter registration number"
                    error={errors.registrationNumber?.message}
                    {...register("registrationNumber")}
                />
                <FormInput
                    label="Country of Registration:"
                    placeholder="Enter country"
                    error={errors.countryOfRegistration?.message}
                    {...register("countryOfRegistration")}
                />
                <FormInput
                    label="Registered Business Address:"
                    placeholder="Enter full address"
                    error={errors.registeredAddress?.message}
                    {...register("registeredAddress")}
                />

                {/* Years in Operation */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                        Years in Operation:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {YEARS_OPTIONS.map((opt) => (
                            <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    value={opt}
                                    checked={selected === opt}
                                    onChange={() => setValue("yearsInOperation", opt)}
                                    className="w-4 h-4 accent-primary"
                                />
                                <span className="text-sm text-gray-600">{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </SectionCard>
    );
}