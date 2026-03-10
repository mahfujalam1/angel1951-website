"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    X, Home, Plus, Radio, Building2,
    Handshake, User, LogOut, Bell,
    Package,
} from "lucide-react";

interface NavLink {
    label: string;
    href: string;
}

interface MobileDrawerProps {
    open: boolean;
    onClose: () => void;
    navLinks: NavLink[];
    pathname: string;
    isAuthenticated: boolean;
    user: { name?: string; email?: string } | null;
    onLogout: () => void;
}

const navIcons: Record<string, React.ReactNode> = {
    Home: <Home size={17} />,
    Create: <Plus size={17} />,
    Status: <Radio size={17} />,
};

export default function MobileDrawer({
    open,
    onClose,
    navLinks,
    pathname,
    isAuthenticated,
    user,
    onLogout,
}: MobileDrawerProps) {
    const router = useRouter();

    // close on outside scroll lock
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    const navigate = (href: string) => {
        router.push(href);
        onClose();
    };

    return (
        <>
            {/* ── Backdrop ── */}
            <div
                onClick={onClose}
                className={`
          fixed inset-0 z-[998] bg-black/60 backdrop-blur-sm
          transition-opacity duration-300
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
            />

            {/* ── Drawer Panel ── */}
            <div
                className={`
          fixed top-0 left-0 bottom-0 z-[999]
          w-[280px] bg-[#0A0E1A]
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                            <Package size={24} color="white" />
                        </div>
                        <span className="font-sora font-bold text-[14px] text-white">
                            Buan Logistics
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="
              w-8 h-8 rounded-lg border border-white/15
              flex items-center justify-center
              text-white/60 hover:text-white hover:bg-white/10
              transition-all duration-200 bg-transparent cursor-pointer
            "
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* User Info — if logged in */}
                {isAuthenticated && user && (
                    <div className="px-5 py-4 border-b border-white/8">
                        <div className="flex items-center gap-3">
                            <div className="
                w-10 h-10 rounded-full bg-[#1A3BDB]
                flex items-center justify-center text-white
              ">
                                <User size={18} />
                            </div>
                            <div>
                                <p className="text-[14px] font-semibold text-white font-sora">
                                    {user.name}
                                </p>
                                <p className="text-[12px] text-white/50 mt-0.5">{user.email}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Nav Links */}
                <div className="flex-1 overflow-y-auto py-3 px-3">

                    {/* Main nav */}
                    <p className="text-[11px] font-semibold text-white/30 uppercase tracking-widest px-3 mb-2">
                        Navigation
                    </p>
                    {navLinks.map((link) => {
                        const active = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={onClose}
                                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl
                  text-sm font-medium transition-all duration-200
                  mb-1 no-underline
                  ${active
                                        ? "bg-[#1A3BDB] text-white"
                                        : "text-white/65 hover:text-white hover:bg-white/8"
                                    }
                `}
                            >
                                <span className={active ? "text-white" : "text-white/50"}>
                                    {navIcons[link.label]}
                                </span>
                                {link.label}
                                {active && (
                                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
                                )}
                            </Link>
                        );
                    })}

                    {/* Divider */}
                    <div className="border-t border-white/8 my-4" />

                    {/* Partner Links */}
                    <p className="text-[11px] font-semibold text-white/30 uppercase tracking-widest px-3 mb-2">
                        Partnership
                    </p>

                    <button
                        onClick={() => navigate("/become-hub")}
                        className="
              w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
              text-sm font-medium text-white/65
              hover:text-white hover:bg-white/8
              transition-all duration-200 bg-transparent cursor-pointer
              mb-1 text-left
            "
                    >
                        <span className="text-white/50"><Building2 size={17} /></span>
                        Become a Hub Provider
                    </button>

                    <button
                        onClick={() => navigate("/become-partner")}
                        className="
              w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
              text-sm font-medium text-white/65
              hover:text-white hover:bg-white/8
              transition-all duration-200 bg-transparent cursor-pointer
              mb-1 text-left
            "
                    >
                        <span className="text-white/50"><Handshake size={17} /></span>
                        Become a Partner
                    </button>

                    {/* Account Links — if logged in */}
                    {isAuthenticated && (
                        <>
                            <div className="border-t border-white/8 my-4" />
                            <p className="text-[11px] font-semibold text-white/30 uppercase tracking-widest px-3 mb-2">
                                Account
                            </p>

                            <button
                                onClick={() => navigate("/profile")}
                                className="
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                  text-sm font-medium text-white/65
                  hover:text-white hover:bg-white/8
                  transition-all duration-200 bg-transparent cursor-pointer
                  mb-1 text-left
                "
                            >
                                <span className="text-white/50"><User size={17} /></span>
                                My Profile
                            </button>

                            <button
                                onClick={() => navigate("/notifications")}
                                className="
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                  text-sm font-medium text-white/65
                  hover:text-white hover:bg-white/8
                  transition-all duration-200 bg-transparent cursor-pointer
                  mb-1 text-left
                "
                            >
                                <span className="text-white/50 relative">
                                    <Bell size={17} />
                                    <span className="
                    absolute -top-1 -right-1 w-3.5 h-3.5
                    bg-[#F5A623] rounded-full text-[8px] font-bold
                    flex items-center justify-center text-white
                  ">3</span>
                                </span>
                                Notifications
                            </button>
                        </>
                    )}
                </div>

                {/* Bottom — Login / Logout */}
                <div className="px-4 py-4 border-t border-white/8">
                    {isAuthenticated ? (
                        <button
                            onClick={() => { onLogout(); onClose(); }}
                            className="
                w-full flex items-center justify-center gap-2
                py-2.5 rounded-xl border border-red-500/30
                text-red-400 text-sm font-semibold
                hover:bg-red-500/10 hover:border-red-500/60
                transition-all duration-200 bg-transparent cursor-pointer
              "
                        >
                            <LogOut size={16} /> Sign Out
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate("/login")}
                            className="
                w-full py-3 rounded-xl bg-[#1A3BDB] hover:bg-[#1230B3]
                text-white text-sm font-bold
                transition-all duration-200 cursor-pointer
                font-sora
              "
                        >
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}