"use client";

import { HubProviderFormData } from "@/types/hubProvider.types";
import { useFormContext } from "react-hook-form";
import SectionCard from "../common/SectionCard";
import FormInput from "../common/FormInput";

const CONTACT_METHODS = ["Phone call", "WhatsApp", "Email"];

export default function OwnerDetailsSection() {
    const {
        register,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext<HubProviderFormData>();

    const selected = watch("preferredContact") ?? [];

    const toggle = (method: string) => {
        if (selected.includes(method)) {
            setValue(
                "preferredContact",
                selected.filter((m) => m !== method)
            );
        } else {
            setValue("preferredContact", [...selected, method]);
        }
    };

    return (
        <SectionCard number={2} title="Owner / Manager Details:">
            <div className="flex flex-col gap-4">
                <FormInput
                    label="Full Name:"
                    placeholder="Enter full name"
                    error={errors.ownerName?.message}
                    {...register("ownerName")}
                />
                <FormInput
                    label="Email Address:"
                    type="email"
                    placeholder="owner@email.com"
                    error={errors.ownerEmail?.message}
                    {...register("ownerEmail")}
                />

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                        Preferred Contact Method:
                    </label>
                    <div className="flex flex-wrap gap-4">
                        {CONTACT_METHODS.map((method) => (
                            <label
                                key={method}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={selected.includes(method)}
                                    onChange={() => toggle(method)}
                                    className="w-4 h-4 accent-primary rounded"
                                />
                                <span className="text-sm text-gray-600">{method}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </SectionCard>
    );
}