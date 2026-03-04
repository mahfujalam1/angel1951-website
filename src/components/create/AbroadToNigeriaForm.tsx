"use client";

import { useForm } from "react-hook-form";
import { Upload } from "lucide-react";

type AbroadToNigeriaFormData = {
    // Sender
    shipmentType: "air_cargo" | "sea_cargo";
    serviceType: "pick_up" | "drop_off";
    senderCountry: string;
    senderCity: string;
    senderState: string;
    pickUpServices: string;
    senderFullName: string;
    senderPhone: string;
    senderAddress: string;
    whatPickingUp: string;
    senderEmail: string;
    shippingType: string;
    uploadImageOrVideo: FileList;
    // Receiver
    receiverCountry: string;
    receiverCity: string;
    receiverState: string;
    receiverFullName: string;
    receiverPhone: string;
    receiverEmail: string;
    receiverAddress: string;
};

export default function AbroadToNigeriaForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<AbroadToNigeriaFormData>({
        defaultValues: {
            shipmentType: "air_cargo",
            serviceType: "pick_up",
        },
    });

    const onSubmit = (data: AbroadToNigeriaFormData) => {
        console.log("=== Abroad to Nigeria Form Data ===", data);
    };

    const inputClass =
        "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";
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
                                    <input
                                        type="radio"
                                        value={v}
                                        {...register("shipmentType")}
                                        className="accent-blue-600"
                                    />
                                    {v === "air_cargo" ? "Air cargo" : "Sea cargo"}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className={labelClass}>Choose Your Service</p>
                        <div className="flex gap-4">
                            {(["pick_up", "drop_off"] as const).map((v) => (
                                <label key={v} className="flex items-center gap-1.5 text-sm cursor-pointer">
                                    <input
                                        type="radio"
                                        value={v}
                                        {...register("serviceType")}
                                        className="accent-blue-600"
                                    />
                                    {v === "pick_up" ? "Pick up" : "Drop up"}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Country / City / State */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                    <div>
                        <label className={labelClass}>Country</label>
                        <select {...register("senderCountry", { required: "Required" })} className={inputClass}>
                            <option value="">Select</option>
                            <option value="us">United States</option>
                            <option value="uk">United Kingdom</option>
                            <option value="ca">Canada</option>
                            <option value="de">Germany</option>
                            <option value="ng">Nigeria</option>
                        </select>
                        {errors.senderCountry && <p className={errorClass}>{errors.senderCountry.message}</p>}
                    </div>
                    <div>
                        <label className={labelClass}>City</label>
                        <input {...register("senderCity", { required: "Required" })} placeholder="Type here..." className={inputClass} />
                        {errors.senderCity && <p className={errorClass}>{errors.senderCity.message}</p>}
                    </div>
                    <div>
                        <label className={labelClass}>State</label>
                        <input {...register("senderState", { required: "Required" })} placeholder="Type here..." className={inputClass} />
                        {errors.senderState && <p className={errorClass}>{errors.senderState.message}</p>}
                    </div>
                </div>

                {/* Pick up Services */}
                <div className="mb-3">
                    <label className={labelClass}>Pick up Services</label>
                    <input {...register("pickUpServices")} placeholder="Type here..." className={inputClass} />
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
                        <option value="food">Food</option>
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

                {/* Upload Image or Video */}
                <div className="mb-3">
                    <label className={labelClass}>Upload Image or Video</label>
                    <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition">
                        <Upload className="w-6 h-6 text-gray-400 mb-1" />
                        <span className="text-xs text-gray-400">Upload</span>
                        <input type="file" accept="image/*,video/*" {...register("uploadImageOrVideo")} className="hidden" />
                    </label>
                </div>
            </div>

            <hr className="border-gray-100" />

            {/* ── Receiver Information ── */}
            <div>
                <h2 className={sectionTitle}>Receiver Information:</h2>

                {/* Country / City / State */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                    <div>
                        <label className={labelClass}>Country</label>
                        <select {...register("receiverCountry", { required: "Required" })} className={inputClass}>
                            <option value="">Select</option>
                            <option value="ng">Nigeria</option>
                            <option value="gh">Ghana</option>
                            <option value="ke">Kenya</option>
                        </select>
                        {errors.receiverCountry && <p className={errorClass}>{errors.receiverCountry.message}</p>}
                    </div>
                    <div>
                        <label className={labelClass}>City</label>
                        <input {...register("receiverCity", { required: "Required" })} placeholder="Type here..." className={inputClass} />
                        {errors.receiverCity && <p className={errorClass}>{errors.receiverCity.message}</p>}
                    </div>
                    <div>
                        <label className={labelClass}>State</label>
                        <input {...register("receiverState", { required: "Required" })} placeholder="Type here..." className={inputClass} />
                        {errors.receiverState && <p className={errorClass}>{errors.receiverState.message}</p>}
                    </div>
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
                    Send
                </button>
            </div>
        </form>
    );
}