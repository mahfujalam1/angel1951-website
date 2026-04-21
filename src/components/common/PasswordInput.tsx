"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
}

export default function PasswordInput({ placeholder = "••••••••", value, onChange, name }: PasswordInputProps) {
    const [show, setShow] = useState(false);

    return (
        <div className="relative">
            <input
                type={show ? "text" : "password"}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
                className="w-full pr-11 h-12 px-4 rounded-xl border border-[#E5E7EB] outline-none focus:border-[#1A3BDB] focus:ring-4 focus:ring-[#1A3BDB]/5 transition-all text-sm"
            />
            <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-50 cursor-pointer p-1"
            >
                {show ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>
    );
}