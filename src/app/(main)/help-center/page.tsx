"use client";

import React, { useState } from "react";
import { 
  Search, 
  HelpCircle, 
  MessageCircle, 
  AlertTriangle, 
  Package, 
  ChevronRight,
  Send,
  MessageSquare,
  LifeBuoy,
  ArrowLeft,
  CheckCircle2
} from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import FormInput from "@/components/common/FormInput";
import toast from "react-hot-toast";

const FAQS = [
  {
    q: "How do I track my shipment?",
    a: "You can track your shipment by entering your Tracking ID in the 'Track' section of your dashboard or on our homepage."
  },
  {
    q: "What is Personalized Cargo?",
    a: "Personalized Cargo (Tier 3) is a specialized service for large-scale imports and full container capacity shipments with flexible payment plans."
  },
  {
    q: "What are the payment options?",
    a: "We accept credit/debit cards via Stripe. For Tier 2 and 3 customers, instalment plans are available."
  },
  {
    q: "How can I find a Buan Branch?",
    a: "Use our 'Find a Buan Branch' tool in the navigation bar to locate the nearest service point."
  }
];

const HelpCenterPage = () => {
  const [activeTab, setActiveTab] = useState<"faq" | "complaint" | "support" | "shipment">("faq");
  const [complaintText, setComplaintText] = useState("");
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [issueSubmitted, setIssueSubmitted] = useState(false);

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your complaint has been logged. Our team will investigate.");
    setComplaintText("");
  };

  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIssueSubmitted(true);
    toast.success("Shipment issue reported successfully.");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest">
            <LifeBuoy size={14} /> Help & Support
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">How can we help you today?</h1>
          <div className="max-w-xl mx-auto relative group">
            <input 
              type="text" 
              placeholder="Search for articles, guides..." 
              className="w-full h-14 pl-14 pr-6 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-blue-100/20 outline-none focus:ring-2 focus:ring-blue-600/20 transition-all group-hover:border-blue-200"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { id: "faq", label: "FAQ", icon: <HelpCircle size={20} /> },
            { id: "complaint", label: "Complaint", icon: <MessageSquare size={20} /> },
            { id: "support", label: "Live Support", icon: <MessageCircle size={20} /> },
            { id: "shipment", label: "Shipment Issues", icon: <AlertTriangle size={20} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setSelectedIssue(null);
                setIssueSubmitted(false);
              }}
              className={`
                flex flex-col items-center justify-center gap-3 p-6 rounded-3xl transition-all border-2
                ${activeTab === tab.id 
                  ? "bg-white border-blue-600 shadow-xl shadow-blue-100 text-blue-600" 
                  : "bg-white border-transparent text-gray-400 hover:border-gray-100 hover:text-gray-600 shadow-sm"}
              `}
            >
              {tab.icon}
              <span className="text-[11px] font-black uppercase tracking-widest">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl shadow-blue-50 border border-gray-50 min-h-[450px] animate-fadeIn">
          {activeTab === "faq" && (
            <div className="space-y-8">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><HelpCircle size={20} /></div>
                Frequently Asked Questions
              </h2>
              <div className="grid gap-4">
                {FAQS.map((faq, i) => (
                  <details key={i} className="group border border-gray-100 rounded-2xl overflow-hidden hover:border-blue-100 transition-colors">
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none bg-white group-open:bg-blue-50/30">
                      <span className="text-sm font-bold text-gray-900">{faq.q}</span>
                      <ChevronRight size={18} className="text-gray-400 group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="p-6 pt-0 text-sm text-gray-500 leading-relaxed bg-white">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}

          {activeTab === "complaint" && (
            <div className="space-y-8 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Drop a Complaint</h2>
                <p className="text-sm text-gray-500">We value your feedback and aim to resolve issues quickly.</p>
              </div>
              <form onSubmit={handleComplaintSubmit} className="space-y-4">
                <FormInput label="Full Name" placeholder="Your name" required />
                <FormInput label="Tracking ID (Optional)" placeholder="e.g. BN-2026-X1" />
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Message</label>
                  <textarea 
                    rows={5}
                    value={complaintText}
                    onChange={(e) => setComplaintText(e.target.value)}
                    placeholder="Describe your issue in detail..."
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600/20 focus:bg-white transition-all text-sm"
                    required
                  />
                </div>
                <button type="submit" className="w-full py-4 bg-blue-900 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100">
                  Submit Feedback <Send size={16} />
                </button>
              </form>
            </div>
          )}

          {activeTab === "support" && (
            <div className="space-y-12 text-center py-10">
              <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto shadow-inner shadow-blue-100">
                <MessageCircle size={48} />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-black text-gray-900 uppercase">Live Support</h2>
                <p className="text-gray-500 max-w-sm mx-auto text-sm leading-relaxed">
                  Our agents are available Monday to Friday, 9:00 AM — 6:00 PM to assist you in real-time.
                </p>
              </div>
              <button className="px-10 py-4 bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2 mx-auto">
                Start Live Chat <MessageCircle size={18} />
              </button>
            </div>
          )}

          {activeTab === "shipment" && (
            <div className="space-y-8">
              {!selectedIssue ? (
                <>
                  <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-3">
                    <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Package size={20} /></div>
                    What's wrong with your shipment?
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Delayed Delivery",
                      "Damaged Goods",
                      "Missing Item",
                      "Wrong Recipient",
                      "Customs Issues",
                      "Change of Address"
                    ].map((item) => (
                      <button 
                        key={item} 
                        onClick={() => setSelectedIssue(item)}
                        className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-all group"
                      >
                        <span className="text-sm font-bold">{item}</span>
                        <ChevronRight size={18} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                      </button>
                    ))}
                  </div>
                </>
              ) : issueSubmitted ? (
                <div className="text-center py-12 space-y-6 animate-fadeIn">
                   <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={40} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Issue Reported</h3>
                    <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
                      We've received your report regarding <span className="font-bold text-blue-600">"{selectedIssue}"</span>. A support specialist will contact you at your registered email within 4 hours.
                    </p>
                  </div>
                  <button 
                    onClick={() => { setSelectedIssue(null); setIssueSubmitted(false); }}
                    className="px-8 py-3 bg-gray-100 text-gray-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
                  >
                    Back to Help Center
                  </button>
                </div>
              ) : (
                <div className="space-y-8 animate-slideUp">
                  <button 
                    onClick={() => setSelectedIssue(null)}
                    className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-blue-600 transition-colors"
                  >
                    <ArrowLeft size={14} /> Back to options
                  </button>
                  <div className="space-y-2">
                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Report: {selectedIssue}</h2>
                    <p className="text-sm text-gray-500">Provide shipment details so we can track it down.</p>
                  </div>
                  <form onSubmit={handleIssueSubmit} className="max-w-2xl space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormInput label="Tracking ID" placeholder="BN-2026-X1" required />
                      <FormInput label="Associated Phone" placeholder="+63 XXX XXX XXXX" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Additional Details</label>
                      <textarea 
                        rows={4}
                        placeholder="Please describe the situation..."
                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600/20 focus:bg-white transition-all text-sm"
                        required
                      />
                    </div>
                    <button type="submit" className="w-full py-4 bg-blue-900 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-800 transition-all shadow-xl shadow-blue-100">
                      Submit Report
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;
