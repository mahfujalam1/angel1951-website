"use client";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ── Profile Dropdown ── */
interface ProfileDropdownProps {
  handleLogout: () => void;
  scrolled: boolean;
}

export default function ProfileDropdown({
  handleLogout,
  scrolled,
}: ProfileDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onLogout = () => {
    setOpen(false);
    handleLogout();
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`
          w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 bg-transparent cursor-pointer
          ${scrolled ? "border-white/20 text-white hover:border-white hover:bg-white/10" : "border-gray-200 text-gray-600 hover:text-black hover:border-gray-300 hover:bg-gray-50"}
        `}
      >
        <User size={16} />
      </button>

      {open && (
        <div
          className="
            absolute right-0 top-[calc(100%+10px)]
            w-48 rounded-xl overflow-hidden
            bg-white
            border border-gray-100
            shadow-xl
            animate-in fade-in slide-in-from-top-2 duration-200
          "
        >
          <div className="absolute -top-1.5 right-3 w-3 h-3 rotate-45 bg-white border-l border-t border-gray-100" />

          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="
              flex items-center gap-2.5 px-4 py-3
              text-gray-700 hover:text-primary hover:bg-primary/5
              text-sm font-medium transition-all duration-150
              no-underline border-b border-gray-100
            "
          >
            <User size={14} className="shrink-0" />
            Profile
          </Link>

          <button
            onClick={onLogout}
            className="
              w-full flex items-center gap-2.5 px-4 py-3
              text-gray-700 hover:text-primary hover:bg-primary/5
              text-sm font-medium transition-all duration-150
              bg-transparent cursor-pointer text-left
            "
          >
            <LogOut size={14} className="shrink-0" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
