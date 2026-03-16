"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/authSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import PasswordInput from "@/components/common/PasswordInput";
import type { LoginFormData } from "@/types/auth.types";

type Role = "hubProvider" | "partner" | "customer";

const ROLES: { value: Role; label: string }[] = [
    { value: "hubProvider", label: "Hub Provider" },
    { value: "partner", label: "Partner" },
    { value: "customer", label: "Customer" },
];

export default function LoginForm() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [selectedRole, setSelectedRole] = useState<Role | null>(null);

    const [form, setForm] = useState<LoginFormData>({
        email: "",
        password: "",
        remember: false,
    });

    const handleSubmit = () => {
        if (!form.email || !form.password || !selectedRole) return;

        // customer হলে role empty string, বাকিগুলো role value সেট হবে
        const roleValue = selectedRole === "customer" ? "" : selectedRole;
        localStorage.setItem("role", roleValue);
        localStorage.setItem('email', form.email)

        dispatch(setUser({ id: "1", name: "Demo User", email: form.email }));
        router.push("/");
    };

    const isLoginDisabled = !selectedRole || !form.email || !form.password;

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center">
                <h2 className="text-[28px] font-extrabold text-[#1F2937] font-sora mb-1">
                    Welcome back to Buan Logistics
                </h2>
                <p className="text-sm text-[#6B7280] mb-8">Sign in to your account</p>
            </div>

            {/* Email */}
            <div className="mb-5">
                <Label className="text-sm font-semibold text-[#1F2937] mb-2 block">Your Email</Label>
                <Input
                    type="email"
                    placeholder="johndoe@shipgrace.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="h-11 border-[#E5E7EB] focus:border-[#1A3BDB]"
                />
            </div>

            {/* Password */}
            <div className="mb-4">
                <Label className="text-sm font-semibold text-[#1F2937] mb-2 block">Password</Label>
                <PasswordInput
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="remember"
                        checked={form.remember}
                        onCheckedChange={(v) => setForm({ ...form, remember: !!v })}
                    />
                    <Label htmlFor="remember" className="text-sm text-[#6B7280] cursor-pointer">
                        Remember me
                    </Label>
                </div>
                <button
                    onClick={() => router.push("/forgot-password")}
                    className="text-sm text-[#1A3BDB] font-medium hover:underline"
                >
                    Forgot password
                </button>
            </div>

            {/* Role Selection */}
            <div className="mb-6">
                <Label className="text-sm font-semibold text-[#1F2937] mb-3 block">
                    Select your role
                </Label>
                <div className="flex gap-3">
                    {ROLES.map(({ value, label }) => {
                        const isSelected = selectedRole === value;
                        return (
                            <button
                                key={value}
                                type="button"
                                onClick={() => setSelectedRole(value)}
                                className={`
                                    flex-1 h-11 rounded-xl border-2 text-sm font-semibold transition-all duration-150
                                    ${isSelected
                                        ? "border-[#1A3BDB] bg-[#EEF2FF] text-[#1A3BDB]"
                                        : "border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#1A3BDB] hover:text-[#1A3BDB]"
                                    }
                                `}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Submit */}
            <Button
                onClick={handleSubmit}
                disabled={isLoginDisabled}
                className="w-full h-12 bg-[#1A3BDB] hover:bg-[#1230B3] text-white font-bold text-[15px] rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
            >
                Login
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5 text-sm text-[#6B7280]">
                <div className="flex-1 h-px bg-[#E5E7EB]" />
                Instant login
                <div className="flex-1 h-px bg-[#E5E7EB]" />
            </div>

            {/* Social */}
            <div className="flex gap-3 mb-5">
                <Button variant="outline" className="flex-1 h-11 gap-2 border-[#E5E7EB]">
                    <GoogleIcon /> Sign in with Google
                </Button>
                <Button variant="outline" className="flex-1 h-11 gap-2 border-[#E5E7EB]">
                    <AppleIcon /> Sign in with Apple
                </Button>
            </div>

            <p className="text-center text-sm text-[#6B7280]">
                Don't have account?{" "}
                <button onClick={() => router.push("/register")} className="text-[#1A3BDB] font-semibold hover:underline">
                    Register
                </button>
            </p>
        </div>
    );
}

const GoogleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
);

const AppleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
);