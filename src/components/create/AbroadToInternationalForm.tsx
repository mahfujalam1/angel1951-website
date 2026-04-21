// AbroadToInternational.tsx
"use client";

import { useForm } from "react-hook-form";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

type AbroadToInternationalData = {
    shipmentType: "air_cargo" | "sea_cargo";
    serviceType: "warehouse" | "drop_off";
    senderCountry: string;
    senderCity: string;
    senderState: string;
    pickUpServices: "yes" | "no" | "";
    senderFullName: string;
    senderPhone: string;
    senderAddress: string;
    whatPickingUp: string;
    senderEmail: string;
    shippingType: string;
    packageUnit: string;
    packageValue: string;
    uploadImage: FileList;
    receiverCountry: string;
    receiverCity: string;
    receiverState: string;
    receiverFullName: string;
    receiverPhone: string;
    receiverEmail: string;
    receiverAddress: string;
};

// Country → unit mapping
const COUNTRY_UNIT_MAP: Record<string, string> = {
    "United Kingdom": "KG",
    "China": "CBM",
    "United States": "Pound",
};

function getUnitForCountry(country: string): string {
    return COUNTRY_UNIT_MAP[country] ?? "KG"; // default KG
}

export default function AbroadToInternational() {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<AbroadToInternationalData>({
        defaultValues: {
            shipmentType: "air_cargo",
            serviceType: "warehouse",
            pickUpServices: "",
        },
    });

    const [countries, setCountries] = useState<string[]>([]);
    const [loadingCountries, setLoadingCountries] = useState(true);

    useEffect(() => {
        fetch("https://countriesnow.space/api/v0.1/countries/positions")
            .then((res) => res.json())
            .then((data) => {
                if (!data.error) {
                    const names: string[] = data.data
                        .map((c: { name: string }) => c.name)
                        .sort((a: string, b: string) => a.localeCompare(b));
                    setCountries(names);
                }
            })
            .catch(() => toast.error("Failed to load countries"))
            .finally(() => setLoadingCountries(false));
    }, []);

    const selectedSenderCountry = watch("senderCountry");
    const isUK = selectedSenderCountry === "United Kingdom";
    const packageUnit = getUnitForCountry(selectedSenderCountry);

    useEffect(() => {
        if (!isUK) setValue("pickUpServices", "");
        setValue("packageValue", ""); // reset value on country change
    }, [selectedSenderCountry, isUK, setValue]);

    const onSubmit = (data: AbroadToInternationalData) => {
        console.log("=== Abroad to International Form Data ===");
        console.log("--- Sender Info ---");
        console.log("Shipment Type:", data.shipmentType);
        console.log("Service Type:", data.serviceType);
        console.log("Sender Country:", data.senderCountry);
        console.log("Pickup Services:", data.pickUpServices || "N/A (not UK)");
        console.log("Full Name:", data.senderFullName);
        console.log("Phone:", data.senderPhone);
        console.log("Address:", data.senderAddress);
        console.log("What Picking Up:", data.whatPickingUp);
        console.log("Email:", data.senderEmail);
        console.log("Shipping Type:", data.shippingType);
        console.log(`Package (${data.packageUnit}):`, data.packageValue);
        console.log("Uploaded File:", data.uploadImage?.[0]?.name ?? "No file");
        console.log("--- Receiver Info ---");
        console.log("Receiver Country:", data.receiverCountry);
        console.log("Receiver Full Name:", data.receiverFullName);
        console.log("Receiver Phone:", data.receiverPhone);
        console.log("Receiver Email:", data.receiverEmail);
        console.log("Receiver Address:", data.receiverAddress);
        console.log("=== Full Data Object ===", data);
        toast.success("Form submitted! Check console for data.");
    };

    const inputClass =
        "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";
    const disabledInputClass =
        "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-400 bg-gray-50 cursor-not-allowed transition";
    const labelClass = "block text-sm font-medium text-gray-700 mb-1";
    const errorClass = "text-xs text-red-500 mt-1";
    const sectionTitle = "text-base font-semibold text-gray-800 mb-4";

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* ── Sender Information ── */}
            <div>
                <h2 className={sectionTitle}>Sender Information:</h2>

                {/* Shipment type + Service type */}
                <div className="flex flex-wrap gap-x-8 gap-y-3 mb-4">
                    <div>
                        <p className={labelClass}>Choose your Shipment type</p>
                        <div className="flex gap-4">
                            {(["air_cargo", "sea_cargo"] as const).map((v) => (
                                <label key={v} className="flex items-center gap-1.5 text-sm cursor-pointer">
                                    <input type="radio" value={v} {...register("shipmentType")} className="accent-blue-600" />
                                    {v === "air_cargo" ? "Air cargo" : "Sea cargo"}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className={labelClass}>Choose Your Service</p>
                        <div className="flex gap-4">
                            {(["warehouse", "drop_off"] as const).map((v) => (
                                <label key={v} className="flex items-center gap-1.5 text-sm cursor-pointer">
                                    <input type="radio" value={v} {...register("serviceType")} className="accent-blue-600" />
                                    {v === "warehouse" ? "Ware House" : "Drop off"}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Country */}
                <div className="mb-3">
                    <label className={labelClass}>Country</label>
                    <select
                        {...register("senderCountry", { required: "Required" })}
                        className={inputClass}
                        disabled={loadingCountries}
                    >
                        <option value="">{loadingCountries ? "Loading countries..." : "Select country"}</option>
                        {countries.map((name) => (
                            <option key={name} value={name}>{name}</option>
                        ))}
                    </select>
                    {errors.senderCountry && <p className={errorClass}>{errors.senderCountry.message}</p>}
                </div>

                {/* Pickup Services — UK only */}
                <div className="mb-3">
                    <label className={`${labelClass} ${!isUK ? "text-gray-400" : ""}`}>
                        Pickup Services
                        {!isUK && (
                            <span className="ml-2 text-xs font-normal text-gray-400">
                                (Available only for United Kingdom)
                            </span>
                        )}
                    </label>
                    {isUK ? (
                        <div className="flex gap-6 mt-1">
                            {(["yes", "no"] as const).map((v) => (
                                <label key={v} className="flex items-center gap-1.5 text-sm cursor-pointer">
                                    <input
                                        type="radio"
                                        value={v}
                                        {...register("pickUpServices", { required: isUK ? "Required" : false })}
                                        className="accent-blue-600"
                                    />
                                    {v === "yes" ? "Yes" : "No"}
                                </label>
                            ))}
                        </div>
                    ) : (
                        <div className={`${disabledInputClass} flex items-center`}>
                            <span className="text-gray-400 text-sm">Select United Kingdom to enable</span>
                        </div>
                    )}
                    {errors.pickUpServices && <p className={errorClass}>{errors.pickUpServices.message}</p>}
                </div>

                {/* Full name */}
                <div className="mb-3">
                    <label className={labelClass}>Full name</label>
                    <input {...register("senderFullName", { required: "Required" })} placeholder="Type here..." className={inputClass} />
                    {errors.senderFullName && <p className={errorClass}>{errors.senderFullName.message}</p>}
                </div>

                {/* Phone */}
                <div className="mb-3">
                    <label className={labelClass}>Phone</label>
                    <input {...register("senderPhone", { required: "Required" })} placeholder="Type here..." className={inputClass} />
                    {errors.senderPhone && <p className={errorClass}>{errors.senderPhone.message}</p>}
                </div>

                {/* Address */}
                <div className="mb-3">
                    <label className={labelClass}>Address</label>
                    <input {...register("senderAddress", { required: "Required" })} placeholder="Type here..." className={inputClass} />
                    {errors.senderAddress && <p className={errorClass}>{errors.senderAddress.message}</p>}
                </div>

                {/* What we are picking up */}
                <div className="mb-3">
                    <label className={labelClass}>What we are picking up</label>
                    <select {...register("whatPickingUp", { required: "Required" })} className={inputClass}>
                        <option value="">Select</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="documents">Documents</option>
                        <option value="others">Others</option>
                    </select>
                    {errors.whatPickingUp && <p className={errorClass}>{errors.whatPickingUp.message}</p>}
                </div>

                {/* Email */}
                <div className="mb-3">
                    <label className={labelClass}>Email</label>
                    <input
                        type="email"
                        {...register("senderEmail", { required: "Required" })}
                        placeholder="Type here..."
                        className={inputClass}
                    />
                    {errors.senderEmail && <p className={errorClass}>{errors.senderEmail.message}</p>}
                </div>

                {/* Shipping Type */}
                <div className="mb-3">
                    <label className={labelClass}>Shipping Type</label>
                    <select {...register("shippingType", { required: "Required" })} className={inputClass}>
                        <option value="">Select</option>
                        <option value="standard">Standard</option>
                        <option value="express">Express</option>
                        <option value="overnight">Overnight</option>
                    </select>
                    {errors.shippingType && <p className={errorClass}>{errors.shippingType.message}</p>}
                </div>

                {/* ── Package Information ── */}
                <div className="mb-3">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Package Information</h3>
                    <label className={labelClass}>
                        {selectedSenderCountry
                            ? `Weight / Volume (${packageUnit})`
                            : "Weight / Volume"}
                        {selectedSenderCountry && (
                            <span className="ml-2 text-xs font-normal text-blue-500">
                                Unit: {packageUnit}
                            </span>
                        )}
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            {...register("packageValue", { required: "Required" })}
                            placeholder={selectedSenderCountry ? `Enter value in ${packageUnit}` : "Select country first"}
                            className={`${inputClass} ${!selectedSenderCountry ? "bg-gray-50 cursor-not-allowed" : ""}`}
                            disabled={!selectedSenderCountry}
                        />
                        <div className="flex items-center justify-center px-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-600 text-sm font-semibold min-w-[70px]">
                            {selectedSenderCountry ? packageUnit : "—"}
                        </div>
                    </div>
                    {/* hidden field to submit unit */}
                    <input type="hidden" {...register("packageUnit")} value={packageUnit} />
                    {errors.packageValue && <p className={errorClass}>{errors.packageValue.message}</p>}
                    {selectedSenderCountry && (
                        <p className="text-xs text-gray-400 mt-1">
                            {packageUnit === "KG" && "Kilograms — standard unit"}
                            {packageUnit === "CBM" && "Cubic Meter — used for China shipments"}
                            {packageUnit === "Pound" && "Pounds — used for USA shipments"}
                        </p>
                    )}
                </div>

                {/* Upload Image */}
                <div className="mb-3">
                    <label className={labelClass}>Upload Image</label>
                    <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition">
                        <Upload className="w-6 h-6 text-gray-400 mb-1" />
                        <span className="text-xs text-gray-400">Upload</span>
                        <input type="file" accept="image/*" {...register("uploadImage")} className="hidden" />
                    </label>
                </div>
            </div>

            <hr className="border-gray-100" />

            {/* ── Receiver Information ── */}
            <div>
                <h2 className={sectionTitle}>Receiver Information:</h2>

                <div className="mb-3">
                    <label className={labelClass}>Country</label>
                    <select
                        {...register("receiverCountry", { required: "Required" })}
                        className={inputClass}
                        disabled={loadingCountries}
                    >
                        <option value="">{loadingCountries ? "Loading countries..." : "Select country"}</option>
                        {countries.map((name) => (
                            <option key={name} value={name}>{name}</option>
                        ))}
                    </select>
                    {errors.receiverCountry && <p className={errorClass}>{errors.receiverCountry.message}</p>}
                </div>

                <div className="mb-3">
                    <label className={labelClass}>Full name</label>
                    <input {...register("receiverFullName", { required: "Required" })} placeholder="Type here..." className={inputClass} />
                    {errors.receiverFullName && <p className={errorClass}>{errors.receiverFullName.message}</p>}
                </div>

                <div className="mb-3">
                    <label className={labelClass}>Phone</label>
                    <input {...register("receiverPhone", { required: "Required" })} placeholder="Type here..." className={inputClass} />
                    {errors.receiverPhone && <p className={errorClass}>{errors.receiverPhone.message}</p>}
                </div>

                <div className="mb-3">
                    <label className={labelClass}>Email</label>
                    <input
                        type="email"
                        {...register("receiverEmail", { required: "Required" })}
                        placeholder="Type here..."
                        className={inputClass}
                    />
                    {errors.receiverEmail && <p className={errorClass}>{errors.receiverEmail.message}</p>}
                </div>

                <div className="mb-3">
                    <label className={labelClass}>Address</label>
                    <input {...register("receiverAddress", { required: "Required" })} placeholder="Type here..." className={inputClass} />
                    {errors.receiverAddress && <p className={errorClass}>{errors.receiverAddress.message}</p>}
                </div>
            </div>

            {/* Submit */}
            <div className="flex justify-center pt-2">
                <button
                    type="submit"
                    className="w-48 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full transition"
                >
                    Get Quote
                </button>
            </div>
        </form>
    );
}