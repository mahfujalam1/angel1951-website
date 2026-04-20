// NigeriaToAbroad.tsx
"use client";

import { useForm } from "react-hook-form";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

type NigeriaToAbroadFormData = {
    shipmentType: string;
    senderCountry: string; // always "Nigeria" internally
    senderFullName: string;
    senderPhone: string;
    senderEmail: string;
    senderAddress: string;
    insurance: "Yes" | "No";
    valuesOfGoods: string;
    kilosOfGoods: string;
    packageKg: string;
    selectHub: string;
    receiverCountry: string;
    receiverFullName: string;
    receiverPhone: string;
    receiverEmail: string;
    receiverAddressLine1: string;
    receiverPostalCode: string;
    pickupAddress: string;
    pickupSelectHub: string;
    uploadImage: FileList;
};

const SHIPMENT_TYPES = ["Air Cargo", "Sea Cargo"];

export default function NigeriaToAbroadForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NigeriaToAbroadFormData>({
        defaultValues: {
            shipmentType: "Air Cargo",
            senderCountry: "Nigeria", // always fixed
            insurance: "No",
        },
    });

    const [countries, setCountries] = useState<string[]>([]);
    const [loadingCountries, setLoadingCountries] = useState(true);

    // Fetch all countries for receiver
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

    const onSubmit = (data: NigeriaToAbroadFormData) => {
        // Always override senderCountry to Nigeria
        const finalData = { ...data, senderCountry: "Nigeria" };
        console.log("=== Nigeria to Abroad Form Data ===");
        console.log("--- Shipment Info ---");
        console.log("Shipment Type:", finalData.shipmentType);
        console.log("--- Sender Info ---");
        console.log("Sender Country:", finalData.senderCountry); // Nigeria
        console.log("Full Name:", finalData.senderFullName);
        console.log("Phone:", finalData.senderPhone);
        console.log("Email:", finalData.senderEmail);
        console.log("Address:", finalData.senderAddress);
        console.log("Insurance:", finalData.insurance);
        console.log("Values of Goods:", finalData.valuesOfGoods);
        // console.log("Kilos of Goods:", finalData.kilosOfGoods);
        console.log("Package (KG):", finalData.packageKg);
        console.log("Selected Hub:", finalData.selectHub);
        console.log("--- Receiver Info ---");
        console.log("Receiver Country:", finalData.receiverCountry);
        console.log("Receiver Full Name:", finalData.receiverFullName);
        console.log("Receiver Phone:", finalData.receiverPhone);
        console.log("Receiver Email:", finalData.receiverEmail);
        console.log("Receiver Address:", finalData.receiverAddressLine1);
        console.log("Postal/Zip Code:", finalData.receiverPostalCode);
        console.log("--- Pickup Info ---");
        console.log("Pickup Address:", finalData.pickupAddress);
        console.log("Pickup Hub:", finalData.pickupSelectHub);
        console.log("Uploaded File:", finalData.uploadImage?.[0]?.name ?? "No file");
        console.log("=== Full Data Object ===", finalData);
        toast.success("Form submitted! Check console for data.");
    };

    const inputClass =
        "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";
    const labelClass = "block text-sm font-medium text-gray-700 mb-1";
    const errorClass = "text-xs text-red-500 mt-1";
    const sectionTitle = "text-base font-semibold text-gray-800 mb-4";

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* ── Shipment Information ── */}
            <div>
                <h2 className={sectionTitle}>Shipment Information:</h2>

                {/* Shipment type */}
                <div className="mb-4">
                    <p className={labelClass}>Choose your Shipment type</p>
                    <div className="flex flex-wrap gap-4">
                        {SHIPMENT_TYPES.map((v) => (
                            <label key={v} className="flex items-center gap-1.5 text-sm cursor-pointer">
                                <input type="radio" value={v} {...register("shipmentType")} className="accent-blue-600" />
                                {v}
                            </label>
                        ))}
                    </div>
                </div>


            </div>

            <hr className="border-gray-100" />

            {/* ── Sender Information ── */}
            <div>
                <h2 className={sectionTitle}>Sender Information:</h2>

                <div className="mb-3">
                    <label className={labelClass}>Full name</label>
                    <input {...register("senderFullName", { required: "Required" })} placeholder="Type here..." className={inputClass} />
                    {errors.senderFullName && <p className={errorClass}>{errors.senderFullName.message}</p>}
                </div>

                <div className="mb-3">
                    <label className={labelClass}>Phone</label>
                    <input {...register("senderPhone", { required: "Required" })} placeholder="Type here..." className={inputClass} />
                    {errors.senderPhone && <p className={errorClass}>{errors.senderPhone.message}</p>}
                </div>

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

                <div className="mb-3">
                    <label className={labelClass}>Address</label>
                    <input {...register("senderAddress", { required: "Required" })} placeholder="Type here..." className={inputClass} />
                    {errors.senderAddress && <p className={errorClass}>{errors.senderAddress.message}</p>}
                </div>

                {/* Sender Country — fixed Nigeria, shown as read-only */}
                <div className="mb-3">
                    <label className={labelClass}>Sender Country</label>
                    <div className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-500 bg-gray-50 flex items-center gap-2">
                        <span>🇳🇬</span>
                        <span className="font-medium text-gray-700">Nigeria</span>
                        <span className="ml-auto text-xs text-gray-400">Fixed</span>
                    </div>
                    {/* Hidden field to include in form data */}
                    <input type="hidden" {...register("senderCountry")} value="Nigeria" />
                </div>

                {/* Insurance */}
                <div className="mb-4">
                    <p className={labelClass}>Insurance</p>
                    <div className="flex gap-4">
                        {(["Yes", "No"] as const).map((v) => (
                            <label key={v} className="flex items-center gap-1.5 text-sm cursor-pointer">
                                <input type="radio" value={v} {...register("insurance")} className="accent-blue-600" />
                                {v}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mb-3">
                    <label className={labelClass}>Values of Goods</label>
                    <input {...register("valuesOfGoods", { required: "Required" })} placeholder="Type here..." className={inputClass} />
                    {errors.valuesOfGoods && <p className={errorClass}>{errors.valuesOfGoods.message}</p>}
                </div>

                {/* <div className="mb-3">
                    <label className={labelClass}>Kilos of Goods</label>
                    <input type="number" min="0" step="0.01" {...register("kilosOfGoods", { required: "Required" })} placeholder="Type here..." className={inputClass} />
                    {errors.kilosOfGoods && <p className={errorClass}>{errors.kilosOfGoods.message}</p>}
                </div> */}

                {/* ── Package Information (KG only) ── */}
                <div className="mb-3">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Package Information</h3>
                    <label className={labelClass}>
                        Weight
                        <span className="ml-2 text-xs font-normal text-blue-500">Unit: KG</span>
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            {...register("packageKg", { required: "Required" })}
                            placeholder="Enter weight in KG"
                            className={inputClass}
                        />
                        <div className="flex items-center justify-center px-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-600 text-sm font-semibold min-w-[70px]">
                            KG
                        </div>
                    </div>
                    {errors.packageKg && <p className={errorClass}>{errors.packageKg.message}</p>}
                </div>

                {/* Select Hub */}
                <div className="mb-3">
                    <label className={labelClass}>Select</label>
                    <select {...register("selectHub", { required: "Required" })} className={inputClass}>
                        <option value="">Select</option>
                        <option value="lagos">Lagos</option>
                        <option value="abuja">Abuja</option>
                        <option value="port_harcourt">Port Harcourt</option>
                        <option value="benin">Benin</option>
                        <option value="ibadan">Ibadan</option>
                    </select>
                    {errors.selectHub && <p className={errorClass}>{errors.selectHub.message}</p>}
                </div>
            </div>

            <hr className="border-gray-100" />

            {/* ── Receiver Information ── */}
            <div>
                <h2 className={sectionTitle}>Receiver Information:</h2>

                {/* Receiver Country — from API */}
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
                    <label className={labelClass}>Address line 1</label>
                    <input {...register("receiverAddressLine1", { required: "Required" })} placeholder="Type here..." className={inputClass} />
                    {errors.receiverAddressLine1 && <p className={errorClass}>{errors.receiverAddressLine1.message}</p>}
                </div>

                <div className="mb-3">
                    <label className={labelClass}>Postal / Zip Code</label>
                    <input {...register("receiverPostalCode", { required: "Required" })} placeholder="Type here..." className={inputClass} />
                    {errors.receiverPostalCode && <p className={errorClass}>{errors.receiverPostalCode.message}</p>}
                </div>
            </div>

            <hr className="border-gray-100" />

            {/* ── Pickup Information ── */}
            <div>
                <h2 className={sectionTitle}>Pickup Information:</h2>

                {/* <div className="mb-3">
                    <label className={labelClass}>Address</label>
                    <input {...register("pickupAddress", { required: "Required" })} placeholder="Type here..." className={inputClass} />
                    {errors.pickupAddress && <p className={errorClass}>{errors.pickupAddress.message}</p>}
                </div> */}

                <div className="mb-3">
                    <label className={labelClass}>Choose your pickup type</label>
                    <select {...register("pickupSelectHub", { required: "Required" })} className={inputClass}>
                        <option value="">Select</option>
                        <option value="doorstepdelivery">Doorstep delivery</option>
                        <option value="warehousepickup">Warehouse pickup</option>
                    </select>
                    {errors.pickupSelectHub && <p className={errorClass}>{errors.pickupSelectHub.message}</p>}
                </div>

                {/* Upload Image */}
                <div className="mb-3">
                    <label className={labelClass}>Upload Image</label>
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition">
                        <Upload className="w-5 h-5 text-gray-400 mb-1" />
                        <span className="text-xs text-gray-400">Upload</span>
                        <input type="file" accept="image/*" {...register("uploadImage")} className="hidden" />
                    </label>
                </div>
            </div>


            <div>
                <h2 className={sectionTitle}>Payment Information:</h2>

                {/* <div className="mb-3">
                    <label className={labelClass}>Address</label>
                    <input {...register("pickupAddress", { required: "Required" })} placeholder="Type here..." className={inputClass} />
                    {errors.pickupAddress && <p className={errorClass}>{errors.pickupAddress.message}</p>}
                </div> */}
                <div className="mb-3">
                    <label className={labelClass}>Service Type</label>
                    <select {...register("pickupSelectHub", { required: "Required" })} className={inputClass}>
                        <option value="">Select</option>
                        <option value="doorstepdelivery">Air Cargo</option>
                        {/* <option value="warehousepickup">November Alpha Indigo</option> */}
                        <option value="warehousepickup">Sea Cargo</option>
                        <option value="warehousepickup">Frozen Cargo</option>
                        <option value="warehousepickup">Fresh Cargo</option>
                        <option value="warehousepickup">Express Cargo</option>
                        <option value="warehousepickup">Packaging</option>
                    </select>
                    {errors.pickupSelectHub && <p className={errorClass}>{errors.pickupSelectHub.message}</p>}
                </div>


                <div className="mb-3">
                    <label className={labelClass}>Currency Type</label>
                    <select {...register("pickupSelectHub", { required: "Required" })} className={inputClass}>
                        <option value="">Select</option>
                        <option value="doorstepdelivery">Naira</option>
                        {/* <option value="warehousepickup">November Alpha Indigo</option> */}
                        <option value="warehousepickup">USD dollar</option>
                        <option value="warehousepickup">CAD</option>
                        <option value="warehousepickup">AUD</option>
                        <option value="warehousepickup">EURO</option>
                        <option value="warehousepickup">GBP</option>
                    </select>
                    {errors.pickupSelectHub && <p className={errorClass}>{errors.pickupSelectHub.message}</p>}
                </div>

                <div className="mb-3">
                    <label className={labelClass}>Amount Payable:</label>
                    <input {...register("receiverPostalCode", { required: "Required" })} placeholder="Enter amount" className={inputClass} />
                    {errors.receiverPostalCode && <p className={errorClass}>{errors.receiverPostalCode.message}</p>}
                </div>

            </div>
            {/* Submit */}
            <div className="flex justify-center pt-2">
                <button
                    type="submit"
                    className="w-48 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full transition"
                >
                    Send Invoice
                </button>
            </div>
        </form>
    );
}