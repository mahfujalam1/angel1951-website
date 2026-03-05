"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { Bell, User, Package } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MobileDrawer from "./MobileDrawer";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shipment Create", href: "/create" },
  { label: "Order Status", href: "/status" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);

  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isHeroPage = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const isTransparent = isHeroPage && !scrolled;

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 h-20
          transition-all duration-500 ease-in-out
          ${
            isTransparent
              ? "bg-transparent border-transparent"
              : "bg-primary/95 backdrop-blur-xl border-white/8 shadow-[0_2px_20px_rgba(0,0,0,0.3)]"
          }
        `}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between gap-6">
          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 no-underline"
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0">
              <Package size={24} color="white" />
            </div>
            <span className="font-inter font-bold text-[15px] text-white tracking-tight hidden sm:block">
              Buan Enterprise
            </span>
          </Link>

          {/* ── Center Nav — desktop only ── */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium
                    transition-all duration-200 no-underline
                    ${
                      active
                        ? "text-white bg-white/12"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }
                  `}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ── Right Side — desktop only ── */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <button
              onClick={() => router.push("/become-hub")}
              className="
                px-3 py-1.5 border border-white/20 rounded-lg
                text-white/75 text-[13px] font-medium whitespace-nowrap
                hover:border-white/50 hover:text-white hover:bg-white/8
                transition-all duration-200 bg-transparent cursor-pointer
              "
            >
              Become a Hub Provider
            </button>

            <button
              onClick={() => router.push("/become-partner")}
              className="
                px-3 py-1.5 border border-white/20 rounded-lg
                text-white/75 text-[13px] font-medium whitespace-nowrap
                hover:border-white/50 hover:text-white hover:bg-white/8
                transition-all duration-200 bg-transparent cursor-pointer
              "
            >
              Become a Partner
            </button>

            {isAuthenticated ? (
              <>
                {/* Bell */}
                <button
                  onClick={() => router.push("/notifications")}
                  className="
                    relative w-9 h-9 rounded-full border border-white/20
                    flex items-center justify-center text-white/70
                    hover:text-white hover:border-white/50 hover:bg-white/10
                    transition-all duration-200 bg-transparent cursor-pointer
                  "
                >
                  <Bell size={16} />
                  <span
                    className="
                    absolute -top-0.5 -right-0.5 w-4 h-4
                    bg-[#F5A623] rounded-full text-[9px] font-bold
                    flex items-center justify-center text-white
                  "
                  >
                    3
                  </span>
                </button>

                {/* Profile Dropdown */}
                  <Link href={'/profile'}
                    className="
                      w-9 h-9 rounded-full border border-white/20
                      flex items-center justify-center text-white/70
                      hover:text-white hover:border-white/50 hover:bg-white/10
                      transition-all duration-200 bg-transparent cursor-pointer
                    "
                  >
                    <User size={16} />
                  </Link>
              </>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="
                  px-5 py-2 bg-white/10 hover:bg-white/18
                  border border-white/20 hover:border-white/40
                  rounded-lg text-white text-sm font-semibold
                  transition-all duration-200 cursor-pointer
                  font-sora
                "
              >
                Sign In
              </button>
            )}
          </div>

          {/* ── Mobile Right: icons + hamburger ── */}
          <div className="flex lg:hidden items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => router.push("/notifications")}
                className="
                  relative w-9 h-9 rounded-full border border-white/20
                  flex items-center justify-center text-white/70
                  hover:text-white hover:bg-white/10
                  transition-all duration-200 bg-transparent cursor-pointer
                "
              >
                <Bell size={16} />
                <span
                  className="
                  absolute -top-0.5 -right-0.5 w-4 h-4
                  bg-[#F5A623] rounded-full text-[9px] font-bold
                  flex items-center justify-center text-white
                "
                >
                  3
                </span>
              </button>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="
                w-9 h-9 rounded-lg border border-white/20
                flex flex-col items-center justify-center gap-1.5
                hover:bg-white/10 hover:border-white/40
                transition-all duration-200 bg-transparent cursor-pointer
              "
              aria-label="Open menu"
            >
              <span className="w-4.5 h-0.5 bg-white/80 rounded-full block w-[18px]" />
              <span className="w-4.5 h-0.5 bg-white/80 rounded-full block w-[14px]" />
              <span className="w-4.5 h-0.5 bg-white/80 rounded-full block w-[18px]" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        navLinks={navLinks}
        pathname={pathname}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
      />
    </>
  );
}
