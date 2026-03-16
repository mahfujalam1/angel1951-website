"use client";

import { useRef } from "react";
import { X, Plus } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { OutPartnerFormData } from "@/types/hubPartner.types";
import SectionCard from "../common/SectionCard";

export default function PartnerSpaceImageSection() {
    const { watch, setValue } = useFormContext<OutPartnerFormData>();
    const previews = watch("imagePreviews") ?? [];
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setValue("imagePreviews", [...previews, ...newPreviews]);
        if (inputRef.current) inputRef.current.value = "";
    };

    const removeImage = (index: number) => {
        setValue("imagePreviews", previews.filter((_, i) => i !== index));
    };

    return (
        // <SectionCard number={5} title="Space Image:">
        //     {/* <div className="flex flex-wrap gap-3">
        //         {previews.map((src, i) => (
        //             <div
        //                 key={i}
        //                 className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden border border-gray-200 shadow-sm group"
        //             >
        //                 <img src={src} alt={`Upload ${i + 1}`} className="w-full h-full object-cover" />
        //                 <button
        //                     type="button"
        //                     onClick={() => removeImage(i)}
        //                     className="absolute top-1.5 right-1.5 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow"
        //                 >
        //                     <X size={12} />
        //                 </button>
        //             </div>
        //         ))}
        //         <button
        //             type="button"
        //             onClick={() => inputRef.current?.click()}
        //             className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center gap-1.5 hover:border-primary hover:bg-primary/5 transition-colors"
        //         >
        //             <Plus size={22} className="text-gray-400" />
        //             <span className="text-xs text-gray-500 font-medium">Upload Picture</span>
        //         </button>
        //         <input
        //             ref={inputRef}
        //             type="file"
        //             accept="image/*"
        //             multiple
        //             className="hidden"
        //             onChange={handleFiles}
        //         />
        //     </div> */}
        // </SectionCard>
        <div></div>
    );
}