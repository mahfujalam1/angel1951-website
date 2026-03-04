"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/button";

export default function OTPInput() {
    const router = useRouter();
    const resetEmail = useAppSelector((s) => s.auth.resetEmail);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const refs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));

    const handleChange = (i: number, val: string) => {
        if (!/^\d?$/.test(val)) return;
        const next = [...otp];
        next[i] = val;
        setOtp(next);
        if (val && i < 5) refs[i + 1].current?.focus();
    };

    const handleKey = (i: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[i] && i > 0) refs[i - 1].current?.focus();
    };

    const handleContinue = () => {
        const code = otp.join("");
        if (code.length === 6) router.push("/new-password");
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center">
                <h2 className="text-[28px] font-extrabold text-[#1F2937] font-sora mb-1">Password reset</h2>
                <p className="text-sm text-[#6B7280] mb-8">
                    We sent a code to <strong>{resetEmail || "your email"}</strong>
                </p>
            </div>

            {/* OTP Boxes */}
            <div className="flex gap-3 mb-7 justify-center">
                {otp.map((v, i) => (
                    <input
                        key={i}
                        ref={refs[i]}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={v}
                        onChange={(e) => handleChange(i, e.target.value)}
                        onKeyDown={(e) => handleKey(i, e)}
                        className={`
              w-12 h-14 text-center text-xl font-bold border-2 rounded-xl outline-none
              transition-all duration-200 font-sora
              ${v
                                ? "border-[#1A3BDB] bg-[#1A3BDB]/5 text-[#1A3BDB]"
                                : "border-[#E5E7EB] text-[#1F2937]"
                            }
              focus:border-[#1A3BDB] focus:ring-2 focus:ring-[#1A3BDB]/10
            `}
                    />
                ))}
            </div>

            <div className="flex justify-center">
                <Button onClick={handleContinue}
                    className="w-80 h-12 bg-primary hover:bg-[#1230B3] text-white font-bold text-[15px] rounded-xl">
                    Continue
                </Button>
            </div>

            <p className="text-center text-sm text-[#6B7280] mt-4">
                Don't receive the email?{" "}
                <button onClick={() => router.push("/forgot-password")}
                    className="text-[#1A3BDB] font-semibold hover:underline">
                    Resend
                </button>
            </p>
        </div>
    );
}