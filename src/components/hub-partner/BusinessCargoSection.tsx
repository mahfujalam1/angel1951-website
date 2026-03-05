"use client";

import { OutPartnerFormData } from "@/types/hubPartner.types";
import { useFormContext } from "react-hook-form";
import SectionCard from "../common/SectionCard";
import FormInput from "../common/FormInput";

const NATURE_OPTIONS = [
    "Freight Forwarding",
    "Cargo Consolidation",
    "Agent / Import Trading",
    "E-commerce Logistics",
    "Courier Services",
    "Manufacturer / Exporter",
    "Other (please specify)",
];

const CARGO_TYPES = [
    "General Cargo",
    "Commercial Goods",
    "Foods / Fe",
    "Cosmetics",
    "Electronics",
    "Personal Effects",
    "Machinery",
    "Other",
];

const VOLUME_OPTIONS = [
    "Less than 500kg",
    "500kg – 2 tons",
    "2 – 10 tons",
    "Over 10 tons",
];

export default function BusinessCargoSection() {
    const {
        register,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext<OutPartnerFormData>();

    const selectedNature = watch("natureOfBusiness") ?? [];
    const selectedCargo = watch("primaryCargoTypes") ?? [];
    const selectedVolume = watch("estimatedMonthlyVolume");

    const toggleNature = (val: string) =>
        selectedNature.includes(val)
            ? setValue("natureOfBusiness", selectedNature.filter((v) => v !== val))
            : setValue("natureOfBusiness", [...selectedNature, val]);

    const toggleCargo = (val: string) =>
        selectedCargo.includes(val)
            ? setValue("primaryCargoTypes", selectedCargo.filter((v) => v !== val))
            : setValue("primaryCargoTypes", [...selectedCargo, val]);

    return (
        <SectionCard number={3} title="Business & Cargo Profile:">
            <div className="flex flex-col gap-5">
                {/* Nature of Business */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                        Nature of Your Business (Select all that apply):
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {NATURE_OPTIONS.map((opt) => (
                            <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedNature.includes(opt)}
                                    onChange={() => toggleNature(opt)}
                                    className="w-4 h-4 accent-primary rounded"
                                />
                                <span className="text-sm text-gray-600">{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <FormInput
                    label="Countries You Operate From:"
                    placeholder="e.g. Singapore, Malaysia"
                    error={errors.countriesOperateFrom?.message}
                    {...register("countriesOperateFrom")}
                />
                <FormInput
                    label="Countries You Ship To:"
                    placeholder="e.g. USA, UK, Australia"
                    error={errors.countriesShipTo?.message}
                    {...register("countriesShipTo")}
                />

                {/* Primary Cargo Types */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                        Primary Cargo Types:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {CARGO_TYPES.map((opt) => (
                            <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedCargo.includes(opt)}
                                    onChange={() => toggleCargo(opt)}
                                    className="w-4 h-4 accent-primary rounded"
                                />
                                <span className="text-sm text-gray-600">{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Monthly Volume */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                        Estimated Monthly Cargo Volume:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {VOLUME_OPTIONS.map((opt) => (
                            <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    value={opt}
                                    checked={selectedVolume === opt}
                                    onChange={() => setValue("estimatedMonthlyVolume", opt)}
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