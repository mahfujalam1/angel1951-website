"use client";

import { forwardRef } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    ({ label, error, className = "", ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1.5 w-full">
                <label className="text-sm font-semibold text-gray-700 font-inter">
                    {label}
                </label>
                <input
                    ref={ref}
                    {...props}
                    className={`w-full border rounded-lg px-4 py-3 text-sm text-gray-800 
            placeholder-gray-400 bg-white transition-all outline-none
            focus:ring-2 focus:ring-primary/30 focus:border-primary
            ${error ? "border-red-400 focus:ring-red-200" : "border-gray-200"}
            ${className}`}
                />
                {error && (
                    <p className="text-xs text-red-500 mt-0.5">{error}</p>
                )}
            </div>
        );
    }
);

FormInput.displayName = "FormInput";
export default FormInput;