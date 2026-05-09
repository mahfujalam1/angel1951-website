"use client";

import { useState } from "react";
import { Search, MapPin } from "lucide-react";

export default function ServicePointsPage() {
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger a search for nearby points
    console.log("Searching for", country, location);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 flex flex-col gap-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find a Service Point</h1>
          <p className="text-gray-600">Locate our nearest service points to drop off or collect your shipments.</p>
        </div>

        {/* Map Section */}
        <div className="w-full h-[500px] bg-gray-200 rounded-2xl overflow-hidden shadow-sm relative border border-gray-200">
          {/* Placeholder for Google Map */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902442430139!2d90.38975731543136!3d23.75085809468165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8a34b225965%3A0x6b7724213190b411!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1625000000000!5m2!1sen!2sbd" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Service Points Map"
          />
          <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow-md font-medium text-sm text-gray-800 flex items-center gap-2">
            <MapPin size={16} className="text-primary" />
            Showing points in your area
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mt-4">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Search Nearby Locations</h2>
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <select 
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white"
              >
                <option value="">Select Country</option>
                <option value="BD">Bangladesh</option>
                <option value="CN">China</option>
                <option value="NG">Nigeria</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
              </select>
            </div>
            
            <div className="flex-[2]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Location (City, Zip Code, or Address)</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Dhaka, 1212"
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-end">
              <button 
                type="submit"
                className="h-12 px-8 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-all shadow-lg shadow-primary/25 whitespace-nowrap"
              >
                Find Now
              </button>
            </div>
          </form>
          
          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Example results */}
              {[1, 2, 3].map((item) => (
                <div key={item} className="p-5 rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all group cursor-pointer">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">Buan Hub #{item}</h3>
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-md font-medium">Open</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">123 Logistics Ave, Central District</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1.5 mb-4">
                    <MapPin size={14} /> 2.4 km away
                  </p>
                  <button className="text-primary text-sm font-medium hover:underline">Get Directions</button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
