"use client";

import { HubProviderFormData } from "@/types/hubProvider.types";
import { useFormContext } from "react-hook-form";
import SectionCard from "../common/SectionCard";
import FormInput from "../common/FormInput";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TRAFFIC_OPTIONS = ["50+", "90+", "50-100", "100+"];

export default function ShopOperationsSection() {
    const {
        register,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext<HubProviderFormData>();

    const selectedDays = watch("workingDays") ?? [];
    const selectedTraffic = watch("footTraffic");

    const toggleDay = (day: string) => {
        if (selectedDays.includes(day)) {
            setValue("workingDays", selectedDays.filter((d) => d !== day));
        } else {
            setValue("workingDays", [...selectedDays, day]);
        }
    };

    return (
        <SectionCard number={4} title="Shop Operations:">
            <div className="flex flex-col gap-5">
                {/* Working Days */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                        Working Day:
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {DAYS.map((day) => (
                            <label key={day} className="flex items-center gap-1.5 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedDays.includes(day)}
                                    onChange={() => toggleDay(day)}
                                    className="w-4 h-4 accent-primary rounded"
                                />
                                <span className="text-sm text-gray-600">{day}</span>
                            </label>
                        ))}
                    </div>
                    {errors.workingDays && (
                        <p className="text-xs text-red-500">{errors.workingDays.message}</p>
                    )}
                </div>

                {/* Email Address (operating hours) */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                        Email Address (Operating Hours):
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-gray-500">From</label>
                            <input
                                type="time"
                                {...register("operatingFrom")}
                                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-gray-500">To</label>
                            <input
                                type="time"
                                {...register("operatingTo")}
                                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                            />
                        </div>
                    </div>
                </div>

                {/* Staff on Duty */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                        Number of Staff on Duty Daily:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        <FormInput
                            label="Minimum Members"
                            placeholder="e.g. 1"
                            type="number"
                            error={errors.staffMin?.message}
                            {...register("staffMin")}
                        />
                        <FormInput
                            label="Maximum Members"
                            placeholder="e.g. 5"
                            type="number"
                            error={errors.staffMax?.message}
                            {...register("staffMax")}
                        />
                    </div>
                </div>

                {/* Foot Traffic */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                        Approximate Daily Foot Traffic:
                    </label>
                    <div className="flex flex-wrap gap-4">
                        {TRAFFIC_OPTIONS.map((opt) => (
                            <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    value={opt}
                                    checked={selectedTraffic === opt}
                                    onChange={() => setValue("footTraffic", opt)}
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