"use client";

import { useRef, useState } from "react";
import { X, Plus } from "lucide-react";

interface PhotoItem {
    url: string;
    label: string;
}

interface Props {
    trackingId: string;
    onClose: () => void;
    onSave: (photos: PhotoItem[]) => void;
}

const REQUIRED_PHOTOS = 3;

export default function UploadPhotosModal({ trackingId, onClose, onSave }: Props) {
    const [photos, setPhotos] = useState<PhotoItem[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        const newPhotos = files.map((file, i) => ({
            url: URL.createObjectURL(file),
            label: photos.length + i === 0 ? "Outer View" : photos.length + i === 1 ? "Label" : `Photo ${photos.length + i + 1}`,
        }));
        setPhotos((prev) => [...prev, ...newPhotos]);
        if (inputRef.current) inputRef.current.value = "";
    };

    const removePhoto = (index: number) => {
        setPhotos((prev) => prev.filter((_, i) => i !== index));
    };

    const progress = Math.min(photos.length, REQUIRED_PHOTOS);
    const progressPct = (progress / REQUIRED_PHOTOS) * 100;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={18} />
                </button>

                <h2 className="text-xl font-bold text-gray-900 mb-2 font-inter">
                    Upload Photos
                </h2>
                <p className="text-sm text-gray-500 mb-5">
                    Tracking ID : {trackingId}
                </p>

                {/* Photo Grid */}
                <div className="flex flex-wrap gap-3 mb-5">
                    {photos.map((photo, i) => (
                        <div key={i} className="flex flex-col gap-1 items-center">
                            <div className="relative w-28 h-24 rounded-xl overflow-hidden border border-gray-200 group">
                                <img
                                    src={photo.url}
                                    alt={photo.label}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => removePhoto(i)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={10} />
                                </button>
                            </div>
                            <span className="text-xs text-gray-500">{photo.label}</span>
                        </div>
                    ))}

                    {/* Add button */}
                    <div className="flex flex-col gap-1 items-center">
                        <button
                            type="button"
                            onClick={() => inputRef.current?.click()}
                            className="w-28 h-24 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-1 hover:border-primary hover:bg-primary/5 transition-colors"
                        >
                            <Plus size={20} className="text-gray-400" />
                            <span className="text-xs text-gray-500 font-medium">Add Photos</span>
                        </button>
                    </div>
                </div>

                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFiles}
                />

                {/* Progress */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-gray-700">Update Progress</span>
                        <span className="text-sm font-bold text-primary">
                            {progress}/{REQUIRED_PHOTOS} Photos
                        </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                            className="bg-emerald-400 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${progressPct}%` }}
                        />
                    </div>
                </div>

                {/* Save */}
                <button
                    onClick={() => onSave(photos)}
                    className="w-full bg-primary text-white text-sm font-semibold py-3 rounded-full hover:opacity-90 active:scale-95 transition-all shadow-sm"
                >
                    Update & Save
                </button>
            </div>
        </div>
    );
}