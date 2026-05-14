"use client";

import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const HelpCenterPage = () => {
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      subject: "other",
      message: "something",
      status: "Pending"
    }
  ]);

  const handleSendMessage = () => {
    if (!subject || !message) return;
    
    const newMsg = {
      id: Date.now(),
      subject: subject,
      message: message,
      status: "Pending"
    };
    
    setMessages([newMsg, ...messages]);
    setSubject("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Help Center</h1>
          <p className="text-sm text-gray-500">
            Feel free to reach out if you need help or have questions about your shipments!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
          
          {/* Left Form */}
          <div className="space-y-6">
            <button 
              onClick={() => router.back()}
              className="text-gray-800 hover:text-gray-600 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select 
                  className="w-full h-12 px-4 rounded-md border border-gray-200 outline-none focus:border-blue-500 text-sm bg-white text-gray-600"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="">Select a subject</option>
                  <option value="tracking">Shipment Tracking</option>
                  <option value="billing">Billing & Payments</option>
                  <option value="complaint">Complaint</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea 
                  rows={4}
                  placeholder="Enter Message"
                  className="w-full p-4 rounded-md border border-gray-200 outline-none focus:border-blue-500 text-sm resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <button 
                onClick={handleSendMessage}
                className={`px-6 py-3 rounded-md text-sm font-bold uppercase transition-all ${
                  subject && message 
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md" 
                  : "bg-gray-200 text-white cursor-not-allowed"
                }`}
                disabled={!subject || !message}
              >
                Send Message
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-6">Past Messages</h3>
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="p-4 rounded-md border border-gray-100 shadow-sm bg-white">
                  <h4 className="font-bold text-gray-800 text-sm mb-1">{msg.subject}</h4>
                  <p className="text-gray-500 text-sm mb-3">{msg.message}</p>
                  <span className="text-red-500 text-xs font-medium">{msg.status}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;
