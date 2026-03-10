"use client";

import { HubProviderFormData } from "@/types/hubProvider.types";
import { useFormContext } from "react-hook-form";
import SectionCard from "../common/SectionCard";
import FormInput from "../common/FormInput";

const BUSINESS_TYPES = [
    "Personalized container",
    "Sourcing and branding services",
    "Procurement services",
    "Frozen shipment from abroad",
    "Fulfillment services",
    "Handling of special goods",
    "Extra equipments",
    "Other business",
];

export default function ShopDetailsSection() {
    const {
        register,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext<HubProviderFormData>();

    const selectedTypes = watch("businessTypes") ?? [];

    const toggleType = (type: string) => {
        if (selectedTypes.includes(type)) {
            setValue(
                "businessTypes",
                selectedTypes.filter((t) => t !== type)
            );
        } else {
            setValue("businessTypes", [...selectedTypes, type]);
        }
    };

    return (
        <SectionCard number={1} title="Shop Details:">
            <div className="flex flex-col gap-4">
                <FormInput
                    label="Shop Name:"
                    placeholder="Enter shop name"
                    error={errors.shopName?.message}
                    {...register("shopName")}
                />

                {/* Business Type */}
                {/* <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                        Business Type:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {BUSINESS_TYPES.map((type) => (
                            <label
                                key={type}
                                className="flex items-center gap-2 cursor-pointer group"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedTypes.includes(type)}
                                    onChange={() => toggleType(type)}
                                    className="w-4 h-4 accent-primary rounded"
                                />
                                <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                                    {type}
                                </span>
                            </label>
                        ))}
                    </div>
                    {errors.businessTypes && (
                        <p className="text-xs text-red-500">
                            {errors.businessTypes.message}
                        </p>
                    )}
                </div> */}

                <FormInput
                    label="Full Address:"
                    placeholder="Enter full address"
                    error={errors.fullAddress?.message}
                    {...register("fullAddress")}
                />
                <FormInput
                    label="Landmark:"
                    placeholder="Enter landmark"
                    error={errors.landmark?.message}
                    {...register("landmark")}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput
                        label="City / State:"
                        placeholder="Enter city / state"
                        error={errors.cityState?.message}
                        {...register("cityState")}
                    />
                    <FormInput
                        label="Shop Contact Number:"
                        placeholder="+1 000 000 0000"
                        error={errors.shopContact?.message}
                        {...register("shopContact")}
                    />
                </div>

                <FormInput
                    label="Email:"
                    type="email"
                    placeholder="shop@email.com"
                    error={errors.shopEmail?.message}
                    {...register("shopEmail")}
                />
            </div>
        </SectionCard>
    );
}