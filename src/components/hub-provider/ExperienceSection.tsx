"use client";

import { HubProviderFormData } from "@/types/hubProvider.types";
import { useFormContext } from "react-hook-form";
import SectionCard from "../common/SectionCard";
import FormTextarea from "../common/FormTextarea";

export default function ExperienceSection() {
    const { register, watch, setValue, formState: { errors } } =
        useFormContext<HubProviderFormData>();

    const handledDelivery = watch("handledDelivery");
    const willingToCommit = watch("willingToCommit");

    return (
        <SectionCard number={5} title="Experience & Commitment:">
            <div className="flex flex-col gap-5">
                {/* Q1 */}
                <div className="flex flex-col gap-2">
                    <p className="text-sm text-gray-700 font-medium">
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
                    <p className="text-sm text-gray-700 font-medium">
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

                {/* Comments */}
                <FormTextarea
                    label="Any comments or special considerations:"
                    placeholder="Write any special notes or requirements..."
                    rows={4}
                    error={errors.comments?.message}
                    {...register("comments")}
                />
            </div>
        </SectionCard>
    );
}