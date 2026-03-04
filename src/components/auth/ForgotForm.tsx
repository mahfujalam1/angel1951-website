"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { setResetEmail } from "@/store/slices/authSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

export default function ForgotForm() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState("");

    const handleSubmit = () => {
        if (!email) return;
        dispatch(setResetEmail(email));
        router.push("/otp-verify");
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center">
                <h2 className="text-[28px] font-extrabold text-[#1F2937] font-sora mb-1">Forgot Password</h2>
                <p className="text-sm text-[#6B7280] mb-8">No worries, we'll send you reset instructions.</p>
            </div>

            <div className="mb-6">
                <Label className="text-sm font-semibold mb-2 block">Your Email</Label>
                <Input type="email" placeholder="johndoe123@gmail.com" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 border-[#E5E7EB] focus:border-[#1A3BDB]" />
            </div>

            <Button onClick={handleSubmit}
                className="w-full h-12 bg-[#1A3BDB] hover:bg-[#1230B3] text-white font-bold text-[15px] rounded-xl">
                Reset Password
            </Button>

            <div className="flex justify-center mt-5">
                <button onClick={() => router.push("/login")}
                    className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#1A3BDB]">
                    <ArrowLeft size={14} /> Back to Login
                </button>
            </div>
        </div>
    );
}