"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot, User, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
}

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm currently a demo assistant. In a real integration, I would process your request and provide a helpful response!",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      <div
        className={cn(
          "mb-4 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 origin-bottom-right transform",
          isOpen ? "scale-100 opacity-100 translate-y-0 pointer-events-auto" : "scale-0 opacity-0 translate-y-10 pointer-events-none"
        )}
        style={{ height: isOpen ? "500px" : "0px" }}
      >
        {/* Header */}
        <div className="bg-primary p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-sm">AI Assistant</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-[10px] text-white/80">Online</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/10 p-1.5 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 h-[380px] overflow-y-auto p-4 space-y-4 bg-gray-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex w-full mb-2 animate-fadeIn",
                msg.sender === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] p-3 rounded-2xl text-sm shadow-sm",
                  msg.sender === "user"
                    ? "bg-primary text-white rounded-tr-none"
                    : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                )}
              >
                {msg.text}
                <div
                  className={cn(
                    "text-[10px] mt-1 opacity-70",
                    msg.sender === "user" ? "text-right" : "text-left"
                  )}
                >
                  {mounted && msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start animate-fadeIn">
              <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form
          onSubmit={handleSendMessage}
          className="p-3 bg-white border-t border-gray-100 flex items-center gap-2"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="bg-primary text-white p-2 rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </form>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 group pointer-events-auto",
          isOpen ? "bg-white text-primary border border-primary/10 rotate-90" : "bg-primary text-white animate-signal animate-bounce duration-1200"
        )}
      >
        {isOpen ? (
          <X size={28} />
        ) : (
          <div className="relative">
            <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-primary rounded-full" />
          </div>
        )}
      </button>
    </div>
  );
};

export default ChatAssistant;
