"use client";

import { useState } from "react";
import { Upload, CheckCircle2, Building, User, Mail, Phone, FileText } from "lucide-react";
import { useParams } from "next/navigation";

export default function ApplyForPage() {
  const params = useParams();
  const role = params?.role as string;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Formatting the role string for display
  const displayRole = role ? role.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") : "Role";

  const getRoleDescription = () => {
    switch (role) {
      case "become-hub":
        return "Apply to become a Buan Logistics Hub Provider and manage shipments in your region.";
      case "business":
        return "Upgrade to a Business Account for volume discounts and dedicated support.";
      case "container":
        return "Apply for Container User status to manage large scale imports and FCL shipments.";
      case "corporate":
        return "Become a Corporate Partner to integrate our logistics solutions into your supply chain.";
      default:
        return "Complete the form below to upgrade your role.";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20 px-6">
        <div className="bg-white max-w-md w-full rounded-2xl p-8 text-center shadow-lg border border-gray-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for applying to be a {displayRole}. Our team will review your documents and get back to you within 24-48 hours.
          </p>
          <button 
            onClick={() => window.location.href = "/"}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary/25"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="max-w-[800px] mx-auto px-6">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Apply for {displayRole}</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {getRoleDescription()}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      required
                      type="text" 
                      placeholder="John Doe"
                      className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name (Optional)</label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="Logistics Corp."
                      className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      required
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      required
                      type="tel" 
                      placeholder="+880 1..."
                      className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea 
                  required
                  rows={3}
                  placeholder="Enter your full address"
                  className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                />
              </div>

              {/* Document Upload */}
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Verification Documents</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Please upload relevant documents (Trade License, NID, or Passport) to verify your identity. Max 5MB per file.
                </p>
                
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 hover:border-primary transition-all cursor-pointer">
                  <div className="w-14 h-14 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload size={24} />
                  </div>
                  <p className="font-medium text-gray-900 mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PDF, JPG, PNG or DOCX</p>
                  
                  {/* Hidden file input */}
                  <input type="file" className="hidden" id="file-upload" multiple />
                  <label htmlFor="file-upload" className="mt-4 inline-block px-6 py-2 bg-white border border-gray-200 shadow-sm rounded-lg text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors">
                    Browse Files
                  </label>
                </div>

                {/* Example of selected file */}
                {/* <div className="mt-4 flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
                  <FileText size={20} className="text-primary" />
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium text-gray-900 truncate">Trade_License_2024.pdf</p>
                    <p className="text-xs text-gray-500">2.4 MB</p>
                  </div>
                  <button type="button" className="text-red-500 text-sm hover:underline">Remove</button>
                </div> */}
              </div>

              {/* Terms and Submit */}
              <div className="pt-6 border-t border-gray-100 mt-8">
                <label className="flex items-start gap-3 mb-6 cursor-pointer">
                  <input required type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                  <span className="text-sm text-gray-600">
                    I agree to the <a href="#" className="text-primary hover:underline">Terms & Conditions</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>. I certify that all information provided is accurate.
                  </span>
                </label>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-primary/25 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
