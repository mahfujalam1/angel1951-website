"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeToast } from "@/store/slices/uiSlice";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

const toastIcons = {
    success: <CheckCircle size={18} className="text-white" />,
    error: <XCircle size={18} className="text-white" />,
    info: <Info size={18} className="text-white" />,
};

const toastColors = {
    success: "bg-[#10B981]",
    error: "bg-red-500",
    info: "bg-[#1A3BDB]",
};

function ToastItem({ id, message, type }: { id: string; message: string; type: "success" | "error" | "info" }) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const t = setTimeout(() => dispatch(removeToast(id)), 3500);
        return () => clearTimeout(t);
    }, [id, dispatch]);

    return (
        <div className={`
      flex items-center gap-3 px-5 py-3.5 rounded-xl
      shadow-[0_8px_32px_rgba(0,0,0,0.18)]
      ${toastColors[type]} text-white
      min-w-[280px] max-w-[380px]
      animate-[slideUp_0.4s_ease]
    `}>
            {toastIcons[type]}
            <span className="text-[14px] font-medium flex-1">{message}</span>
            <button
                onClick={() => dispatch(removeToast(id))}
                className="text-white/70 hover:text-white transition-colors ml-1"
            >
                <X size={16} />
            </button>
        </div>
    );
}

export default function Toast() {
    const toasts = useAppSelector((s) => s.ui.toasts);

    if (!toasts.length) return null;

    return (
        <div className="fixed bottom-7 right-7 z-[9999] flex flex-col gap-3">
            {toasts.map((t) => (
                <ToastItem key={t.id} {...t} />
            ))}
        </div>
    );
}