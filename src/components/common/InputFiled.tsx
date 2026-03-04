"use client";

interface InputFieldProps {
    label: string;
    value: string;
    type?: string;
    placeholder?: string;
    onChange: (value: string) => void;
    rightIcon?: React.ReactNode;
    error?: string;
    success?: string;
}

export default function InputField({
    label,
    value,
    type = "text",
    placeholder,
    onChange,
    rightIcon,
    error,
    success,
}: InputFieldProps) {
    const borderClass = error
        ? "border-red-300 focus:border-red-400"
        : success
            ? "border-emerald-300 focus:border-emerald-400"
            : "border-gray-200 focus:border-primary";

    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-600">{label}</label>
            <div className="relative">
                <input
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    className={`w-full border rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all bg-white
            ${rightIcon ? "pr-10" : ""} ${borderClass}`}
                />
                {rightIcon && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {rightIcon}
                    </span>
                )}
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
            {success && <p className="text-xs text-emerald-500">{success}</p>}
        </div>
    );
}