// components/shipping/ProofAndMedia.tsx
"use client";

import { MediaItem } from "@/types/shipping";
import { Eye } from "lucide-react";

type Props = { items: MediaItem[] };

export default function ProofAndMedia({ items }: Props) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Proof & Media</h2>
            <div className="flex gap-4 flex-wrap">
                {items.map((item, i) => (
                    <div key={i} className="flex flex-col gap-1.5">
                        <div className="relative w-[170px] h-[110px] rounded-xl overflow-hidden bg-gray-100">
                            {item.type === "image" && item.src ? (
                                <>
                                    <img
                                        src={item.src}
                                        alt={item.caption}
                                        className="w-full h-full object-cover"
                                    />
                                    <button className="absolute bottom-2 right-2 flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition">
                                        <Eye className="w-3 h-3" />
                                        View
                                    </button>
                                </>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-xs font-semibold text-blue-500 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                                        Coming Soon
                                    </span>
                                </div>
                            )}
                        </div>
                        <p className="text-xs font-medium text-gray-700 leading-tight">{item.caption}</p>
                        {item.subCaption && (
                            <p className="text-xs text-gray-400 leading-tight">{item.subCaption}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}