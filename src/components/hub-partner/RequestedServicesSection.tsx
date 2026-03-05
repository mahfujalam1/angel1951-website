"use client";

import { OutPartnerFormData } from "@/types/hubPartner.types";
import { useFormContext } from "react-hook-form";
import SectionCard from "../common/SectionCard";
import FormTextarea from "../common/FormTextarea";
import FormInput from "../common/FormInput";

export default function RequestedServicesSection() {
    const { register, watch, setValue, formState: { errors } } =
        useFormContext<OutPartnerFormData>();

    const handledDelivery = watch("handledDelivery");
    const willingToCommit = watch("willingToCommit");

    return (
        <SectionCard number={4} title="Requested Overseas Services:">
            <div className="flex flex-col gap-5">
                {/* Q1 */}
                <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-gray-700">
                        Have you handled delivery or logistics services before?
                    </p>
                    <div className="flex gap-5">
                        {["Yes", "No"].map((opt) => (
                            <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    value={opt}
                                    checked={handledDelivery === opt}
                                    onChange={() => setValue("handledDelivery", opt as "Yes" | "No")}
                                    className="w-4 h-4 accent-primary"
                                />
                                <span className="text-sm text-gray-600">{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Q2 */}
                <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-gray-700">
                        Are you willing to commit to being pickup hub for at least 6 months?
                    </p>
                    <div className="flex gap-5">
                        {["Yes", "No"].map((opt) => (
                            <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    value={opt}
                                    checked={willingToCommit === opt}
                                    onChange={() => setValue("willingToCommit", opt as "Yes" | "No")}
                                    className="w-4 h-4 accent-primary"
                                />
                                <span className="text-sm text-gray-600">{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <FormTextarea
                    label="Services You Require Us to Provide:"
                    placeholder="Describe the services you need..."
                    rows={3}
                    error={errors.servicesRequired?.message}
                    {...register("servicesRequired")}
                />

                <FormInput
                    label="Countries You Ship To:"
                    placeholder="e.g. USA, UK, Australia"
                    error={errors.countriesShipToService?.message}
                    {...register("countriesShipToService")}
                />
            </div>
        </SectionCard>
    );
}