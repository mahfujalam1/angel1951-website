"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { Bell, User, Package, LogOut } from "lucide-react";
import MobileDrawer from "./MobileDrawer";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Create My Shipment", href: "/create" },
  { label: "Track My Shipment", href: "/status" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);

  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role || "");
  }, []);

  const isHeroPage = pathname === "/";
  const hasRole = !!userRole;

  console.log(hasRole, isAuthenticated, user)

  // ── 3 clear conditions ──
  const noRoleAuthenticated = !hasRole && isAuthenticated; // Become buttons + Bell + Profile
  const roleAuthenticated = hasRole && isAuthenticated; // Bell + Profile only
  const noRoleNotAuthenticated = !hasRole; // Sign In only

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("role");
    setUserRole("");
    router.push("/login");
  };

  const isTransparent = noRoleNotAuthenticated && isHeroPage && !scrolled;

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
          <Link href="/" className="flex items-center shrink-0 no-underline">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0">
              <Package size={32} color="white" />
            </div>
            <span className="font-inter font-bold text-lg text-white tracking-tight hidden sm:block">
              Buan Logistics
            </span>
          </Link>

          {/* ── Center Nav — only when no role ── */}
          {!hasRole && (
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
          )}

          {/* ── Spacer when role exists ── */}
          {hasRole && <div className="flex-1" />}

          {/* ── Right Side — desktop ── */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {/* CASE 1: No role + Authenticated → Become buttons + Bell + Profile */}
            {noRoleAuthenticated && (
              <>
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
                <BellButton router={router} />
                <ProfileDropdown handleLogout={handleLogout} />
              </>
            )}

            {/* CASE 2: Role + Authenticated → Bell + Profile only */}
            {roleAuthenticated && (
              <>
                <BellButton router={router} />
                <ProfileDropdown handleLogout={handleLogout} />
              </>
            )}

            {/* CASE 3: No role + Not Authenticated → Sign In only */}
            {noRoleNotAuthenticated && !isAuthenticated  && (
              <button
                onClick={() => router.push("/login")}
                className="
                  px-5 py-2 bg-white/10 hover:bg-white/18
                  border border-white/20 hover:border-white/40
                  rounded-lg text-white text-sm font-semibold
                  transition-all duration-200 cursor-pointer font-sora
                "
              >
                Sign In
              </button>
            )}
          </div>

          {/* ── Mobile Right ── */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Bell — shown when authenticated */}
            {isAuthenticated && <BellButton router={router} />}

            {/* Hamburger — only when no role */}
            {!hasRole && (
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
                <span className="h-0.5 bg-white/80 rounded-full block w-[18px]" />
                <span className="h-0.5 bg-white/80 rounded-full block w-[14px]" />
                <span className="h-0.5 bg-white/80 rounded-full block w-[18px]" />
              </button>
            )}

            {/* Mobile Profile — only when role + authenticated */}
            {roleAuthenticated && (
              <ProfileDropdown handleLogout={handleLogout} />
            )}
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer — only when no role ── */}
      {!hasRole && (
        <MobileDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          navLinks={navLinks}
          pathname={pathname}
          isAuthenticated={isAuthenticated}
          user={user}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}

/* ── Bell Button ── */
function BellButton({ router }) {
  return (
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
      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#F5A623] rounded-full text-[9px] font-bold flex items-center justify-center text-white">
        3
      </span>
    </button>
  );
}

/* ── Profile Dropdown — manages its OWN state and ref ── */
function ProfileDropdown({ handleLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Each instance has its own outside-click listener
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
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
        className="
          w-9 h-9 rounded-full border border-white/20
          flex items-center justify-center text-white/70
          hover:text-white hover:border-white/50 hover:bg-white/10
          transition-all duration-200 bg-transparent cursor-pointer
        "
      >
        <User size={16} />
      </button>

      {open && (
        <div
          className="
            absolute right-0 top-[calc(100%+10px)]
            w-44 rounded-xl overflow-hidden
            bg-white/10 backdrop-blur-2xl
            border border-white/15
            shadow-[0_8px_32px_rgba(0,0,0,0.4)]
            animate-in fade-in slide-in-from-top-2 duration-200
          "
        >
          {/* Arrow pointer */}
          <div className="absolute -top-1.5 right-3 w-3 h-3 rotate-45 bg-white/10 border-l border-t border-white/15" />

          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="
              flex items-center gap-2.5 px-4 py-3
              text-white/80 hover:text-white hover:bg-white/10
              text-sm font-medium transition-all duration-150
              no-underline border-b border-white/10
            "
          >
            <User size={14} className="shrink-0" />
            Profile
          </Link>

          <button
            onClick={onLogout}
            className="
              w-full flex items-center gap-2.5 px-4 py-3
              text-red-300 hover:text-red-200 hover:bg-red-500/15
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
