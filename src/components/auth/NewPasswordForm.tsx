"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import PasswordInput from "@/components/common/PasswordInput";
import type { NewPasswordFormData } from "@/types/auth.types";

export default function NewPasswordForm() {
    const router = useRouter();
    const [form, setForm] = useState<NewPasswordFormData>({ password: "", confirmPassword: "" });
    const [error, setError] = useState("");

    const handleSubmit = () => {
        if (form.password.length < 8) { setError("Must be at least 8 characters."); return; }
        if (form.password !== form.confirmPassword) { setError("Passwords do not match."); return; }
        router.push("/login");
    };

    return (
        <div className="max-w-2xl mx-auto font-inter">
            <div className="text-center">
                <h2 className="text-[28px] font-extrabold text-[#1F2937] font-sora mb-1">Set new password</h2>
                <p className="text-sm text-[#6B7280] mb-8">Must be at least 8 characters.</p>
            </div>

            <div className="max-w-md mx-auto">
                <div className="mb-5">
                    <Label className="text-sm font-semibold mb-2 block">Password</Label>
                    <PasswordInput value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })} />
                </div>

                <div className="mb-5">
                    <Label className="text-sm font-semibold mb-2 block">Confirm Password</Label>
                    <PasswordInput value={form.confirmPassword}
                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
                </div>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <Button onClick={handleSubmit}
                    className="w-full h-12 bg-[#1A3BDB] hover:bg-[#1230B3] text-white font-bold text-[15px] rounded-xl">
                    Reset Password
                </Button>
            </div>
        </div>
    );
}