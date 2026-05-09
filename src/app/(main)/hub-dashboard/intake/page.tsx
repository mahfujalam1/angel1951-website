"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import toast from "react-hot-toast";

export default function PackageIntakePage() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Package intake successful!");
    // Handle submission logic here
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-fadeIn">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Package intake form</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Customer Details */}
        <div>
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Customer details:</h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-[15px] text-gray-700 mb-2">Full name</label>
              <input 
                type="text" 
                placeholder="Type here..." 
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-[15px] text-gray-700 mb-2">Phone</label>
              <input 
                type="tel" 
                placeholder="Type here..." 
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-[15px] text-gray-700 mb-2">Destination address</label>
              <input 
                type="text" 
                placeholder="Type here..." 
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Package Info */}
        <div>
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Package Info</h2>
          
          <div className="space-y-5">
            <input 
              type="text" 
              placeholder="Item 1 description" 
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>
        </div>

        {/* Product Image Intake */}
        <div>
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Product Image</h2>
          
          {!imagePreview ? (
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-primary/50 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 text-gray-400 mb-3" />
                <p className="mb-2 text-sm text-gray-500 font-medium">Click to upload product image</p>
                <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF (MAX. 5MB)</p>
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} required />
            </label>
          ) : (
            <div className="relative w-full max-w-sm rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <img src={imagePreview} alt="Product preview" className="w-full h-48 object-cover" />
              <button 
                type="button" 
                onClick={removeImage}
                className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4 pt-6">
          <button 
            type="button"
            className="px-8 py-3 bg-white border border-gray-200 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="px-8 py-3 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-medium rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            Take Parcel
          </button>
        </div>

      </form>
    </div>
  );
}
