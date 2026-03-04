"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import InputField from "../common/InputFiled";

function PasswordStrengthBar({ password }: { password: string }) {
    if (!password) return null;

    const getStrength = () => {
        if (password.length < 6) return { level: 1, label: "Weak", color: "bg-red-400" };
        if (password.length < 10) return { level: 2, label: "Fair", color: "bg-amber-400" };
        return { level: 3, label: "Strong", color: "bg-emerald-400" };
    };

    const { level, label, color } = getStrength();

    return (
        <div className="flex items-center gap-1.5 mt-1">
            {[1, 2, 3, 4].map((i) => (
                <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${i <= level ? color : "bg-gray-200"
                        }`}
                />
            ))}
            <span className="text-xs text-gray-400 ml-1">{label}</span>
        </div>
    );
}

export default function ChangePasswordForm() {
    const [currentPw, setCurrentPw] = useState("");
    const [newPw, setNewPw] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const passwordsMatch = confirmPw.length > 0 && confirmPw === newPw;
    const passwordsMismatch = confirmPw.length > 0 && confirmPw !== newPw;
    const isFormValid = currentPw && newPw && passwordsMatch;

    const handleUpdate = () => {
        if (!isFormValid) return;
        // handle password update logic here
        console.log({ currentPw, newPw });
    };

    const toggleIcon = (show: boolean, setShow: (v: boolean) => void) => (
        <button
            type="button"
            onClick={() => setShow(!show)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
        >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
    );

    return (
        <div className="flex flex-col gap-5 max-w-lg">
            {/* Current Password */}
            <InputField
                label="Current Password"
                value={currentPw}
                onChange={setCurrentPw}
                type={showCurrent ? "text" : "password"}
                placeholder="Enter current password"
                rightIcon={toggleIcon(showCurrent, setShowCurrent)}
            />

            {/* New Password */}
            <div className="flex flex-col gap-1.5">
                <InputField
                    label="New Password"
                    value={newPw}
                    onChange={setNewPw}
                    type={showNew ? "text" : "password"}
                    placeholder="Enter new password"
                    rightIcon={toggleIcon(showNew, setShowNew)}
                />
                <PasswordStrengthBar password={newPw} />
            </div>

            {/* Confirm Password */}
            <InputField
                label="Confirm Password"
                value={confirmPw}
                onChange={setConfirmPw}
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter new password"
                rightIcon={toggleIcon(showConfirm, setShowConfirm)}
                error={passwordsMismatch ? "Passwords do not match" : undefined}
                success={
                    passwordsMatch
                        ? "✓ Passwords match"
                        : undefined
                }
            />

            <div className="pt-2 flex justify-center">
                <button
                    onClick={handleUpdate}
                    disabled={!isFormValid}
                    className="bg-primary text-white text-sm font-semibold px-8 py-2.5 rounded-full hover:opacity-90 active:scale-95 transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    Update Password
                </button>
            </div>
        </div>
    );
}